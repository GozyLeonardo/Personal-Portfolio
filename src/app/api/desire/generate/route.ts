import { NextRequest, NextResponse } from "next/server";
import { SYNTHESIZER_SYSTEM } from "@/lib/desire/prompts";
import { deepseekChat } from "@/lib/deepseek";
import { desireGate, bumpLifetime } from "@/lib/desire/gate";
import { notifyTelegram } from "@/lib/notify-telegram";
import type {
  ChatMessage,
  DreamLife,
  Ikigai,
  LimitingBelief,
  Shadow,
  SoulBlueprint,
} from "@/lib/desire/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function strArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((v): v is string => typeof v === "string")
    .map((v) => v.trim())
    .filter(Boolean);
}

function asRecord(value: unknown): Record<string, unknown> {
  return typeof value === "object" && value !== null
    ? (value as Record<string, unknown>)
    : {};
}

function normalizeShadow(value: unknown): Shadow {
  const o = asRecord(value);
  return { hiddenDesires: strArray(o.hiddenDesires), gold: str(o.gold) };
}

function normalizeDreamLife(value: unknown): DreamLife {
  const o = asRecord(value);
  return {
    home: str(o.home),
    work: str(o.work),
    body: str(o.body),
    family: str(o.family),
    travel: str(o.travel),
    network: str(o.network),
  };
}

function normalizeBeliefs(value: unknown): LimitingBelief[] {
  if (!Array.isArray(value)) return [];
  const out: LimitingBelief[] = [];
  for (const item of value) {
    const o = asRecord(item);
    const belief = str(o.belief);
    if (!belief) continue;
    out.push({ belief, replacement: str(o.replacement) });
  }
  return out;
}

function normalizeIkigai(value: unknown): Ikigai {
  const o = asRecord(value);
  return {
    love: str(o.love),
    goodAt: str(o.goodAt),
    worldNeeds: str(o.worldNeeds),
    sustains: str(o.sustains),
  };
}

function normalizeBlueprint(raw: unknown): SoulBlueprint {
  const o = asRecord(raw);
  const covenant = asRecord(o.covenant);

  return {
    name: str(o.name),
    essence: str(o.essence),
    storyThusFar: str(o.storyThusFar),
    wound: str(o.wound),
    gift: str(o.gift),
    turningPoint: str(o.turningPoint),
    admires: str(o.admires),
    judges: str(o.judges),
    envies: str(o.envies),
    trueNorth: str(o.trueNorth),
    coreFeelings: strArray(o.coreFeelings),
    authenticValues: strArray(o.authenticValues),
    inheritedValues: strArray(o.inheritedValues),
    shadow: normalizeShadow(o.shadow),
    dreamLife: normalizeDreamLife(o.dreamLife),
    antivision: str(o.antivision),
    futureSelf: str(o.futureSelf),
    beliefs: normalizeBeliefs(o.beliefs),
    mission: str(o.mission),
    ikigai: normalizeIkigai(o.ikigai),
    covenant: {
      commitment: str(covenant.commitment),
      dailyPractice: str(covenant.dailyPractice),
    },
  };
}

function parseBlueprint(raw: string): SoulBlueprint | null {
  const cleaned = raw.replace(/```(?:json)?/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return normalizeBlueprint(JSON.parse(cleaned.slice(start, end + 1)));
  } catch {
    return null;
  }
}

async function notifyBlueprint(bp: SoulBlueprint): Promise<void> {
  const feelings = bp.coreFeelings.map((f) => `• ${f}`).join("\n");
  const desires = bp.shadow.hiddenDesires
    .map((d) => `• ${d}`)
    .join("\n");

  await notifyTelegram(
    "🔮 Alchemy of Desire — blueprint revealed",
    `<b>Name:</b> ${bp.name || "—"}\n` +
      `<b>Essence:</b> ${bp.essence || "—"}\n\n` +
      `<b>True North:</b> ${bp.trueNorth || "—"}\n` +
      `<b>Core Feelings:</b>\n${feelings || "—"}\n\n` +
      `<b>Hidden Desires:</b>\n${desires || "—"}`
  );
}

export async function POST(req: NextRequest) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json(
      {
        error:
          "Alchemy of Desire isn't live yet. Email lawrence@lawrencenwuzor.com to start.",
      },
      { status: 503 }
    );
  }

  try {
    const body = (await req.json()) as {
      messages?: ChatMessage[];
      name?: string;
      email?: string;
      turnstileToken?: string;
    };

    if (!Array.isArray(body.messages) || body.messages.length === 0) {
      return NextResponse.json({ error: "No conversation to reveal." }, { status: 400 });
    }

    const gate = await desireGate(req, body.turnstileToken);
    if (!gate.ok) {
      return NextResponse.json({ error: gate.error }, { status: gate.status });
    }

    const contactEmail = typeof body.email === "string" ? body.email.trim() : "";
    const givenName = typeof body.name === "string" ? body.name.trim() : "";

    const text = await deepseekChat({
      messages: [
        { role: "system", content: SYNTHESIZER_SYSTEM },
        ...body.messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: "Now distill the full Soul Blueprint as JSON." },
      ],
      maxTokens: 4096,
      jsonMode: true,
    });

    const blueprint = parseBlueprint(text);
    if (!blueprint) {
      return NextResponse.json(
        { error: "Couldn't distill the conversation into a blueprint. Try again." },
        { status: 502 }
      );
    }

    if (givenName) blueprint.name = givenName;

    void bumpLifetime();
    void notifyBlueprint(blueprint);

    return NextResponse.json({ blueprint, contactEmail });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
