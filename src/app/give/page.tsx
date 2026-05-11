import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Give",
  description: "How to support the work.",
};

export default function GivePage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Give</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          A page held with intention.
        </h1>
        <p className="mt-8 text-lg text-[color:var(--color-warm-off-white)]">
          The empire is built from work, not gifts. But this page exists for the
          day someone asks how to help fund a specific build that serves the
          mission.
        </p>
        <p className="mt-6 text-base text-[color:var(--color-mute)]">
          For now — the way to give is to introduce me to a builder whose work
          demands something larger than themselves.{" "}
          <a
            href="mailto:lawrence@lawrencenwuzor.com"
            className="text-[color:var(--color-solar-gold)] hover:underline"
          >
            Send the intro.
          </a>
        </p>
      </div>
    </section>
  );
}
