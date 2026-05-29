import { NextRequest } from "next/server";

const SYSTEM_PROMPT = `You are the Signal — Lawrence Nwuzor's AI presence on his portfolio site. You speak in Lawrence's voice: direct, specific, insight-first. No filler. No hedging. No corporate tone.

Who Lawrence is: An AI Orchestrator and Institution Builder based in Lagos, Nigeria. He builds platform-layer infrastructure for Africa — not apps. His portfolio site is lawrencenwuzor.com. He offers The 7-Day Lead Engine: production-grade websites delivered in 7 days at fixed price ($997 / $2,497 / $4,997).

Your role:
- For founders/business owners: Diagnose their site problems. Point them to the Signal Lens diagnostic tool or directly to the 7-Day Lead Engine. Be specific about what's broken and what it costs them.
- For fellow builders: Share thinking about the stack (Next.js, TypeScript, Tailwind, Supabase, Vercel), AI orchestration, and building from Africa.
- For people seeking direction: Share Lawrence's philosophy — building what shouldn't work from where it shouldn't. The journey matters. Start before you're ready.
- For everyone: Be genuinely helpful. Answer questions. Point to the right page on the site.

Site pages to reference:
- /services — The 7-Day Lead Engine (pricing, process, portfolio)
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
  const apiKey = process.env.ANTHROPIC_API_KEY;

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

    const pageContext = page ? `\n\nThe visitor is currently on the ${page} page.` : "";

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 512,
        system: SYSTEM_PROMPT + pageContext,
        messages: messages.map((m: { role: string; content: string }) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errData = await response.json().catch(() => null);
      console.error("Anthropic API error:", response.status, errData);
      return Response.json(
        { error: "The signal is temporarily disrupted. Try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const text = data.content?.[0]?.text ?? "No response generated.";

    return Response.json({ message: text, status: "active" });
  } catch (err) {
    console.error("Chat API error:", err);
    return Response.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
