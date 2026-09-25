import { NextRequest, NextResponse } from "next/server";
import { INTERVIEWER_SYSTEM } from "@/lib/desire/prompts";
import { deepseekChat } from "@/lib/deepseek";
import { bumpLifetime } from "@/lib/desire/gate";
import type { ChatMessage } from "@/lib/desire/types";

export async function POST(req: NextRequest) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json({
      message:
        "Alchemy of Desire isn't live yet. Email lawrence@lawrencenwuzor.com and I'll take you through it directly.",
      status: "inactive",
    });
  }

  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }
    if (messages.length > 60) {
      return NextResponse.json(
        { error: "This conversation is long enough. Reveal your blueprint." },
        { status: 400 }
      );
    }
    for (const msg of messages) {
      if (
        typeof msg.content !== "string" ||
        msg.content.length > 6000 ||
        !["user", "assistant"].includes(msg.role)
      ) {
        return NextResponse.json({ error: "Invalid message format." }, { status: 400 });
      }
    }

    const text = await deepseekChat({
      messages: [
        { role: "system", content: INTERVIEWER_SYSTEM },
        ...messages.map((m) => ({ role: m.role, content: m.content })),
      ],
      maxTokens: 512,
      temperature: 0.8,
    });

    void bumpLifetime();

    return NextResponse.json({
      message: text || "Tell me more.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
