import { NextRequest, NextResponse } from "next/server";
import { SYNTHESIZER_SYSTEM } from "@/lib/brief/prompts";
import { deepseekChat } from "@/lib/deepseek";
import { briefGate, bumpLifetime } from "@/lib/brief/gate";
import { notifyTelegram } from "@/lib/notify-telegram";
import type { BriefData, ChatMessage, Desire, Priority } from "@/lib/brief/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function normalizePriority(value: unknown): Priority {
  return value === "must" || value === "want" || value === "nice"
    ? value
    : "want";
}

function normalizeDesires(value: unknown): Desire[] {
  if (!Array.isArray(value)) return [];
  const out: Desire[] = [];
  for (const item of value) {
    if (typeof item !== "object" || item === null) continue;
    const rec = item as Record<string, unknown>;
    const label = str(rec.label);
    if (!label) continue;
    out.push({
      label,
      detail: str(rec.detail),
      priority: normalizePriority(rec.priority),
    });
  }
  return out;
}

function normalizeBrief(raw: unknown): BriefData {
  const o = (typeof raw === "object" && raw !== null ? raw : {}) as Record<
    string,
    unknown
  >;
  const refs = (
    typeof o.references === "object" && o.references !== null ? o.references : {}
  ) as Record<string, unknown>;
  const cons = (
    typeof o.constraints === "object" && o.constraints !== null
      ? o.constraints
      : {}
  ) as Record<string, unknown>;

  return {
    projectName: str(o.projectName) || "Untitled project",
    clientName: str(o.clientName),
    contactEmail: "",
    oneLiner: str(o.oneLiner),
    vision: str(o.vision),
    audience: str(o.audience),
    desires: normalizeDesires(o.desires),
    references: {
      loves: str(refs.loves),
      hates: str(refs.hates),
      inspirations: str(refs.inspirations),
    },
    constraints: {
      budget: str(cons.budget),
      timeline: str(cons.timeline),
      offLimits: str(cons.offLimits),
    },
    successMetrics: str(o.successMetrics),
  };
}

function parseBrief(raw: string): BriefData | null {
  const cleaned = raw.replace(/```(?:json)?/gi, "").trim();
  const start = cleaned.indexOf("{");
  const end = cleaned.lastIndexOf("}");
  if (start === -1 || end === -1 || end <= start) return null;
  try {
    return normalizeBrief(JSON.parse(cleaned.slice(start, end + 1)));
  } catch {
    return null;
  }
}

async function captureLead(brief: BriefData): Promise<void> {
  const baseId = process.env.AIRTABLE_BASE_ID;
  const table = process.env.AIRTABLE_LEADS_TABLE || "LEADS";
  const key = process.env.AIRTABLE_API_KEY;

  if (!baseId || !key || !brief.contactEmail) return;

  try {
    await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Email: brief.contactEmail,
            Tool: "Brief",
            Source: "Brief Tool",
            Captured: new Date().toISOString(),
          },
        }),
      }
    );
  } catch {
    /* lead capture must never block the client */
  }
}

async function notifyBrief(brief: BriefData): Promise<void> {
  const desires = brief.desires
    .map(
      (d) =>
        `• [${d.priority.toUpperCase()}] ${d.label}${d.detail ? ` — ${d.detail}` : ""}`
    )
    .join("\n");

  await notifyTelegram(
    "📋 New Client Brief",
    `<b>Client:</b> ${brief.clientName || "—"}\n` +
      `<b>Email:</b> ${brief.contactEmail || "—"}\n` +
      `<b>Project:</b> ${brief.projectName}\n` +
      `<b>One-liner:</b> ${brief.oneLiner || "—"}\n\n` +
      `<b>Desires:</b>\n${desires || "—"}\n\n` +
      `<b>Budget:</b> ${brief.constraints.budget || "—"} · <b>Timeline:</b> ${brief.constraints.timeline || "—"}`
  );
}

export async function POST(req: NextRequest) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json(
      {
        error:
          "The Brief isn't live yet. Email lawrence@lawrencenwuzor.com to start.",
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
      return NextResponse.json({ error: "No conversation to synthesize." }, { status: 400 });
    }

    const gate = await briefGate(req, body.turnstileToken);
    if (!gate.ok) {
      return NextResponse.json({ error: gate.error }, { status: gate.status });
    }

    const contactEmail = typeof body.email === "string" ? body.email.trim() : "";
    const clientName = typeof body.name === "string" ? body.name.trim() : "";

    const text = await deepseekChat({
      messages: [
        { role: "system", content: SYNTHESIZER_SYSTEM },
        ...body.messages.map((m) => ({ role: m.role, content: m.content })),
        { role: "user", content: "Now synthesize the full brief as JSON." },
      ],
      maxTokens: 2000,
      jsonMode: true,
    });

    const brief = parseBrief(text);
    if (!brief) {
      return NextResponse.json(
        { error: "Couldn't read the conversation into a brief. Try again." },
        { status: 502 }
      );
    }

    if (clientName) brief.clientName = clientName;
    if (contactEmail && EMAIL_RE.test(contactEmail)) {
      brief.contactEmail = contactEmail;
    }

    void bumpLifetime();
    void captureLead(brief);
    void notifyBrief(brief);

    return NextResponse.json({ brief });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
