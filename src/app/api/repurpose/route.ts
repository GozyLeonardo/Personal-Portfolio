import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { gate } from "@/lib/signal-tools";

const anthropic = new Anthropic();

export async function POST(req: NextRequest) {
  try {
    const { content, turnstileToken } = await req.json();
    if (!content || typeof content !== "string" || content.trim().length < 50) {
      return NextResponse.json(
        { error: "Paste at least 50 characters of content to repurpose." },
        { status: 400 }
      );
    }

    // Abuse + budget gate (Turnstile → device cap → lifetime cap)
    const g = await gate(req, "rp", turnstileToken);
    if (!g.ok) {
      return NextResponse.json(
        { error: g.error, limitReached: g.limitReached },
        { status: g.status }
      );
    }

    const message = await anthropic.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 2048,
      messages: [
        {
          role: "user",
          content: `You are a content repurposing expert. Take the following long-form content and create 6 social media posts formatted for different platforms.

SOURCE CONTENT:
${content.slice(0, 5000)}

Create exactly 6 posts:
1. X/Twitter post (under 280 characters, punchy, hook-first)
2. X/Twitter thread opener (under 280 chars, makes reader want the next tweet)
3. LinkedIn post (under 1300 characters, professional but human, uses line breaks for readability)
4. Instagram caption (under 2200 characters, storytelling format, ends with CTA, include 3-5 relevant hashtags)
5. TikTok caption (under 150 characters, casual, trend-aware, include 2-3 hashtags)
6. WhatsApp Status (under 700 characters, conversational, feels like a voice note turned text)

Rules:
- Each post must stand alone — a reader with no context should understand it
- Extract the single most compelling insight for each platform, not a summary
- Match the native tone of each platform
- No emojis unless natural for the platform (IG/TikTok yes, LinkedIn sparingly)
- No "In this article I discussed..." framing

Return in this exact format:
---X POST---
[content]
---X THREAD---
[content]
---LINKEDIN---
[content]
---INSTAGRAM---
[content]
---TIKTOK---
[content]
---WHATSAPP---
[content]`,
        },
      ],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const platforms = [
      { key: "X POST", label: "X / Twitter", platform: "twitter" },
      { key: "X THREAD", label: "X Thread Opener", platform: "twitter_thread" },
      { key: "LINKEDIN", label: "LinkedIn", platform: "linkedin" },
      { key: "INSTAGRAM", label: "Instagram", platform: "instagram" },
      { key: "TIKTOK", label: "TikTok", platform: "tiktok" },
      { key: "WHATSAPP", label: "WhatsApp Status", platform: "whatsapp" },
    ];

    const posts = platforms.map((p) => {
      const regex = new RegExp(`---${p.key}---\\s*([\\s\\S]*?)(?=---[A-Z]|$)`);
      const match = text.match(regex);
      return {
        platform: p.platform,
        label: p.label,
        content: match ? match[1].trim() : "",
      };
    });

    const res = NextResponse.json({ posts, remaining: g.remaining });
    g.commit(res);
    return res;
  } catch (err) {
    const errorMessage =
      err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
