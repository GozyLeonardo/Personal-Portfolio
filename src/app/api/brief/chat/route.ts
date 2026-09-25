import { NextRequest, NextResponse } from "next/server";
import { INTERVIEWER_SYSTEM } from "@/lib/brief/prompts";
import { deepseekChat } from "@/lib/deepseek";
import { bumpLifetime } from "@/lib/brief/gate";
import type { ChatMessage } from "@/lib/brief/types";

export async function POST(req: NextRequest) {
  if (!process.env.DEEPSEEK_API_KEY) {
    return NextResponse.json({
      message:
        "The Brief isn't live yet. Email lawrence@lawrencenwuzor.com and I'll take your brief directly.",
      status: "inactive",
    });
  }

  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: "No messages provided." }, { status: 400 });
    }
    if (messages.length > 40) {
      return NextResponse.json(
        { error: "Conversation too long. Generate your brief to continue." },
        { status: 400 }
      );
    }
    for (const msg of messages) {
      if (
        typeof msg.content !== "string" ||
        msg.content.length > 4000 ||
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
      temperature: 0.7,
    });

    void bumpLifetime();

    return NextResponse.json({
      message: text || "Tell me more about what you want to build.",
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
