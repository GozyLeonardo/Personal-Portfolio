import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work by Lawrence Nwuzor.",
};

export default function ProjectsPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Projects</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          The full archive
          <br />
          <span className="text-[color:var(--color-solar-gold)]">is being built.</span>
        </h1>
        <p className="mt-8 text-lg text-[color:var(--color-warm-off-white)]">
          For now — the homepage carries the live three. Case studies follow as
          each one ships.
        </p>
      </div>
    </section>
  );
}
