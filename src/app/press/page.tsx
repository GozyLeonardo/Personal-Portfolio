import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Press",
  description: "Press kit and bio for Lawrence Chigozie Nwuzor.",
};

export default function PressPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Press</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          For journalists.
        </h1>

        <div className="mt-16 space-y-6 text-base text-[color:var(--color-warm-off-white)] leading-relaxed">
          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)]">
            Short bio (50 words)
          </h2>
          <p>
            Lawrence Chigozie Nwuzor is a software engineer and founder from Lagos,
            Nigeria. He builds full-stack systems for African builders who carry a
            line, not just a startup. He is the founder of the SQC community and
            the builder of Benlaz.com.
          </p>

          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] pt-6">
            Long bio (110 words)
          </h2>
          <p>
            Lawrence Chigozie Nwuzor is a Nigerian software engineer and founder
            building infrastructure for the next generation of African builders.
            Born December 2001 in Ebonyi, an Izzi indigene of Abarigwe, Ishieke, he
            graduated in Computer Engineering. He is the founder of the SQC
            community — peer infrastructure for Nigerian builders moving from zero
            to first paying client — and the builder of Benlaz.com, his first
            production Next.js platform. His work fuses Africanfuturist visual
            philosophy with production engineering. Tagline: building what
            shouldn&apos;t work, from where it shouldn&apos;t.
          </p>

          <h2 className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] pt-6">
            Contact
          </h2>
          <p>
            <a
              href="mailto:lawrence@lawrencenwuzor.com"
              className="text-[color:var(--color-solar-gold)] hover:underline"
            >
              lawrence@lawrencenwuzor.com
            </a>
          </p>

          <p className="text-sm text-[color:var(--color-mute)] italic pt-8">
            For institutional inquiries, please contact directly. This press kit
            covers public-facing work.
          </p>
        </div>
      </div>
    </section>
  );
}
