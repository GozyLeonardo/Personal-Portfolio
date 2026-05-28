import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Now",
  description: "What Lawrence Nwuzor is focused on right now.",
};

export default function NowPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Now — May 2026</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          Currently building.
        </h1>

        <ul className="mt-16 space-y-6 text-lg text-[color:var(--color-warm-off-white)]">
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">01</span>
            <span>
              Building <strong>Chi</strong> — a WhatsApp-native AI system for
              people who feel lost. The first product under The Signal. Architecture
              locked, build in progress.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">02</span>
            <span>
              Running <strong>The 7-Day Lead Engine</strong> — production-grade
              websites shipped in 7 days for founders. Taking clients now.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">03</span>
            <span>
              Holding the <strong>SQC community</strong> on WhatsApp — Nigerian
              builders moving from zero to first paying client. The work speaks.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">04</span>
            <span>
              Writing and publishing — articles on building from Nigeria, AI
              orchestration, and what infrastructure actually means when the
              ground shifts.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">05</span>
            <span>
              Daily — <strong>A Course in Miracles</strong>. Deep blocks. Running.
              The body and the spirit are infrastructure.
            </span>
          </li>
        </ul>

        <p className="mt-16 text-sm text-[color:var(--color-mute)] italic">
          Last updated May 2026.
        </p>
      </div>
    </section>
  );
}
