import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { gate, isSafeHttpUrl } from "@/lib/signal-tools";

const anthropic = new Anthropic();

async function fetchSiteContent(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; SignalTools/1.0; +https://lawrencenwuzor.com)",
      },
    });
    const html = await res.text();
    return html
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 4000);
  } catch {
    return "";
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { url, turnstileToken } = await req.json();
    if (!url || typeof url !== "string") {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    let targetUrl = url.trim();
    if (!targetUrl.startsWith("http")) targetUrl = "https://" + targetUrl;
    if (!isSafeHttpUrl(targetUrl)) {
      return NextResponse.json({ error: "That URL isn't allowed." }, { status: 400 });
    }

    // Abuse + budget gate (Turnstile → device cap → lifetime cap)
    const g = await gate(req, "fl", turnstileToken);
    if (!g.ok) {
      return NextResponse.json(
        { error: g.error, limitReached: g.limitReached },
        { status: g.status }
      );
    }

    const siteContent = await fetchSiteContent(targetUrl);
    if (!siteContent) {
      return NextResponse.json(
        { error: "Could not fetch site content. Check the URL and try again." },
        { status: 422 }
      );
    }

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      messages: [
        {
          role: "user",
          content: `You are a cold email expert who writes prospect-specific opening lines. You use the SPIN framework: identify the Situation, name a specific Problem visible on their site, push to the Implication (what it costs them in revenue, time, or risk), then hint at the Need-Payoff.

Here is the text content from ${targetUrl}:

${siteContent}

Write exactly 3 cold email opening lines for this prospect. Each line must:
1. Reference something SPECIFIC from their actual website (a feature, claim, metric, or UX issue)
2. Name a concrete problem or missed opportunity
3. Push to the implication — what that problem COSTS them (lost conversions, wasted spend, missed revenue, trust erosion)
4. Be 2-3 sentences max
5. Sound like a real human who spent 10 minutes studying their site, not a template

Do NOT use generic phrases like "I noticed your website could use improvement" or "as a fellow entrepreneur." Be specific or be silent.

Return ONLY the 3 lines, numbered 1-3. No preamble, no explanation.`,
        },
      ],
    });

    const content =
      message.content[0].type === "text" ? message.content[0].text : "";
    const lines = content
      .split(/\n\d+\.\s+/)
      .map((l) => l.trim())
      .filter(Boolean);

    const res = NextResponse.json({
      url: targetUrl,
      lines: lines.slice(0, 3),
      remaining: g.remaining,
    });
    g.commit(res);
    return res;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
