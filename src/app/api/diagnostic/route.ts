import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { notifyTelegram } from "@/lib/notify-telegram";
import { BANDS } from "@/lib/diagnostic/bands";
import { SECTION_LABELS } from "@/lib/diagnostic/questions";
import type { BandKey, SectionKey } from "@/lib/diagnostic/types";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface Body {
  email: string;
  answers: Record<number, number>;
  totalScore: number;
  band: BandKey;
  sectionScores: { business: number; aiSkills: number; readiness: number };
  weakestSection: SectionKey;
}

const FROM = process.env.RESEND_FROM ?? "Lawrence Nwuzor <lawrence@lawrencenwuzor.com>";

function resultsEmailHtml(body: Body): string {
  const band = BANDS[body.band];
  const weakestLabel = SECTION_LABELS[body.weakestSection];
  const interpretation = band.sectionInterpretation[body.weakestSection];

  return `
  <div style="background:#080808;color:#F2EDE4;font-family:Inter,Arial,sans-serif;padding:32px 24px;max-width:560px;margin:0 auto;">
    <p style="font-family:monospace;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#00BFA6;margin:0 0 16px;">AI Readiness Diagnostic</p>
    <h1 style="font-size:28px;line-height:1.2;color:#F2EDE4;margin:0 0 8px;">You scored ${body.totalScore} / 56 — ${band.label}</h1>
    <p style="font-size:15px;color:#8A8581;line-height:1.6;margin:0 0 24px;">Here's what that means.</p>

    <div style="background:#0F0F10;border:1px solid #1F1E1B;border-radius:12px;padding:20px;margin:0 0 24px;">
      <p style="font-family:monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#00BFA6;margin:0 0 12px;">Your breakdown</p>
      <p style="font-size:15px;color:#F2EDE4;margin:0 0 6px;">Business Clarity: <strong>${body.sectionScores.business}%</strong></p>
      <p style="font-size:15px;color:#F2EDE4;margin:0 0 6px;">AI Skill Level: <strong>${body.sectionScores.aiSkills}%</strong></p>
      <p style="font-size:15px;color:#F2EDE4;margin:0;">Execution Readiness: <strong>${body.sectionScores.readiness}%</strong></p>
    </div>

    <p style="font-family:monospace;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#C47A00;margin:0 0 8px;">Your biggest gap: ${weakestLabel}</p>
    <p style="font-size:15px;color:#F2EDE4;line-height:1.6;margin:0 0 24px;">${interpretation}</p>

    <p style="font-size:16px;color:#F2EDE4;font-weight:600;margin:0 0 8px;">The #1 thing to focus on right now:</p>
    <p style="font-size:15px;color:#8A8581;line-height:1.7;margin:0 0 28px;">${band.focus}</p>

    <a href="${band.cta.primaryHref}" style="display:inline-block;background:#C47A00;color:#080808;text-decoration:none;font-family:monospace;font-size:13px;letter-spacing:1px;text-transform:uppercase;font-weight:600;padding:14px 24px;border-radius:12px;">${band.cta.primaryLabel}</a>

    <p style="font-size:15px;color:#8A8581;margin:32px 0 0;">— Lawrence</p>
    <p style="font-size:13px;color:#8A8581;margin:4px 0 0;"><a href="https://lawrencenwuzor.com" style="color:#C47A00;">lawrencenwuzor.com</a></p>
  </div>`;
}

export async function POST(req: NextRequest) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ success: false, error: "Invalid request body" }, { status: 400 });
  }

  if (!body.email || !EMAIL_RE.test(body.email)) {
    return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
  }
  if (!BANDS[body.band]) {
    return NextResponse.json({ success: false, error: "Invalid band" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;

  // No key configured yet: don't block the user. Results render client-side.
  if (!apiKey) {
    console.warn("[diagnostic] RESEND_API_KEY not set — skipping email send.");
    return NextResponse.json({ success: true });
  }

  const resend = new Resend(apiKey);

  try {
    if (audienceId) {
      await resend.contacts.create({
        email: body.email,
        audienceId,
        unsubscribed: false,
      });
    }

    await resend.emails.send({
      from: FROM,
      to: body.email,
      subject: `Your diagnostic: ${body.totalScore}/56 — ${BANDS[body.band].label}`,
      html: resultsEmailHtml(body),
      tags: [
        { name: "source", value: "diagnostic" },
        { name: "band", value: body.band },
        { name: "weakest_section", value: body.weakestSection },
      ],
    });
  } catch (err) {
    // Don't gate results on a send failure — log and move on (spec §5.4).
    console.error("[diagnostic] Resend error:", err);
  }

  // Notify Lawrence with full diagnostic breakdown
  const band = BANDS[body.band];
  await notifyTelegram(
    "🧠 Diagnostic Completed",
    `<b>Email:</b> ${body.email}\n<b>Score:</b> ${body.totalScore}/56 — ${band.label}\n<b>Weakest:</b> ${SECTION_LABELS[body.weakestSection]}\n<b>Business:</b> ${body.sectionScores.business}% | <b>AI:</b> ${body.sectionScores.aiSkills}% | <b>Ready:</b> ${body.sectionScores.readiness}%`
  );

  return NextResponse.json({ success: true });
}
