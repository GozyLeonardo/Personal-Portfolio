import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Empire",
  description: "The four directions and the long-horizon vision behind the work.",
};

export default function EmpirePage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Empire</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          A long-arc empire.
        </h1>

        <div className="mt-12 space-y-6 text-lg leading-relaxed text-[color:var(--color-warm-off-white)]">
          <p>
            Trust infrastructure. Direction systems. Coordination tools for
            Africa and humanity. Spiritually grounded. Technically unassailable.
            Built to outlast me.
          </p>
          <p>
            What was buried did not die. The ground itself remembered. Every
            line of code I write is a small act of return.
          </p>
        </div>

        <p className="mt-16 text-sm text-[color:var(--color-mute)] italic">
          The four directions live on the homepage. The work speaks before the
          vision does.
        </p>
      </div>
    </section>
  );
}
