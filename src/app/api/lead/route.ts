import { NextRequest, NextResponse } from "next/server";

/* Captures an email from the "out of free runs" upgrade nudge and writes it to
   Airtable EMPIRE OS (the single CRM). Graceful no-op if Airtable env unset. */

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: NextRequest) {
  try {
    const { email, tool, source } = await req.json();
    if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
      return NextResponse.json({ error: "Enter a valid email." }, { status: 400 });
    }

    const baseId = process.env.AIRTABLE_BASE_ID;
    const table = process.env.AIRTABLE_LEADS_TABLE || "LEADS";
    const key = process.env.AIRTABLE_API_KEY;

    // Unconfigured → accept gracefully so the UX never breaks in dev.
    if (!baseId || !key) {
      return NextResponse.json({ ok: true, stored: false });
    }

    const r = await fetch(
      `https://api.airtable.com/v0/${baseId}/${encodeURIComponent(table)}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fields: {
            Email: email.trim(),
            Tool: typeof tool === "string" ? tool : "",
            Source: typeof source === "string" && source ? source : "Signal Tools",
            Captured: new Date().toISOString(),
          },
        }),
      }
    );

    if (!r.ok) {
      return NextResponse.json({ error: "Could not save. Try again." }, { status: 502 });
    }
    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
