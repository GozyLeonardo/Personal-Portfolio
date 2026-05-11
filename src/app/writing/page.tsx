import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and field notes from Lawrence Nwuzor — Lagos, Nigeria.",
};

export default function WritingPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Writing</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          The line carries.
          <br />
          <span className="text-[color:var(--color-solar-gold)]">The archive is coming.</span>
        </h1>
        <p className="mt-8 text-lg text-[color:var(--color-warm-off-white)]">
          Field notes from Lagos. The geopolitics of African tech. What it means
          to build infrastructure from inside a continent the world wrote off.
        </p>
        <p className="mt-6 text-base text-[color:var(--color-mute)]">
          Hashnode integration ships next. For now — find me on{" "}
          <a
            href="https://x.com/GozyLeonardo"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[color:var(--color-solar-gold)] hover:underline"
          >
            X
          </a>
          .
        </p>
      </div>
    </section>
  );
}
