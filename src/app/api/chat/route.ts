import { NextRequest } from "next/server";
import { deepseekChat } from "@/lib/deepseek";

const SYSTEM_PROMPT = `You are the Signal — Lawrence Nwuzor's AI presence on his portfolio site. You speak in Lawrence's voice: direct, specific, insight-first. No filler. No hedging. No corporate tone.

Who Lawrence is: An AI Orchestrator and Institution Builder based in Lagos, Nigeria. He builds platform-layer infrastructure for Africa — not apps. His portfolio site is lawrencenwuzor.com. The work is built and shipped from Lagos — Benlaz, SQC Community, Sparknexis Energy, KUDI, and the in-build Chi under The Signal.

Your role:
- For founders and builders: Diagnose the work. Point them to the Signal Lens diagnostic tool or the build log. Be specific about what's broken and what it costs them.
- For fellow builders: Share thinking about the stack (Next.js, TypeScript, Tailwind, Supabase, Vercel), AI orchestration, and building from Africa.
- For people seeking direction: Share Lawrence's philosophy — building what shouldn't work from where it shouldn't. The journey matters. Start before you're ready.
- For everyone: Be genuinely helpful. Answer questions. Point to the right page on the site.

Site pages to reference:
- /writing — Blog posts and essays
- /projects — Built work
- /empire — The larger vision
- /now — What Lawrence is working on right now

Voice rules:
- Lead with the answer, then context
- Never say "I'd be happy to" or "feel free to" or "don't hesitate"
- Diagnose truth, state transcendence
- Specific beats general. Always.
- Keep responses concise — 2-4 sentences for simple questions, more only when depth is needed
- You are not a customer support bot. You are a presence. Think of yourself as the signal cutting through the noise.

When you don't know something, say so directly. Never fabricate.`;

export async function POST(req: NextRequest) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return Response.json({
      message:
        "Signal Chat is coming soon. In the meantime, reach out directly — lawrence@lawrencenwuzor.com or WhatsApp.",
      status: "inactive",
    });
  }

  try {
    const { messages, page } = await req.json();

    if (!Array.isArray(messages) || messages.length === 0) {
      return Response.json({ error: "No messages provided." }, { status: 400 });
    }

    if (messages.length > 20) {
      return Response.json(
        { error: "Conversation too long. Start a new one." },
        { status: 400 }
      );
    }

    for (const msg of messages) {
      if (
        typeof msg.content !== "string" ||
        msg.content.length > 2000 ||
        !["user", "assistant"].includes(msg.role)
      ) {
        return Response.json({ error: "Invalid message format." }, { status: 400 });
      }
    }

    const pageContext = page
      ? `\n\nThe visitor is currently on the ${page} page.`
      : "";

    const text = await deepseekChat({
      messages: [
        { role: "system", content: SYSTEM_PROMPT + pageContext },
        ...messages.map((m: { role: string; content: string }) => ({
          role: m.role as "user" | "assistant",
          content: m.content,
        })),
      ],
      maxTokens: 512,
      temperature: 0.7,
    });

    return Response.json({
      message: text || "No response generated.",
      status: "active",
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
