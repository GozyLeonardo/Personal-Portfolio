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
              Shipping <strong>lawrencenwuzor.com</strong> — the front of the empire.
              Foundation Black, Solar Gold, every line of code a small return.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">02</span>
            <span>
              Holding the <strong>SQC community</strong> on WhatsApp — Nigerian
              builders moving from zero to first paying client. Quietly. The work
              speaks.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">03</span>
            <span>
              Preparing for a civic role I&apos;ll name when it&apos;s time.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">04</span>
            <span>
              Daily — <strong>A Course in Miracles</strong>. Deep blocks. Running.
              The body and the spirit are infrastructure.
            </span>
          </li>
        </ul>

        <p className="mt-16 text-sm text-[color:var(--color-mute)] italic">
          Last updated when the work asks me to.
        </p>
      </div>
    </section>
  );
}
