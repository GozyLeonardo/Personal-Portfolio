import type { Metadata } from "next";
import { readBuildLog } from "@/lib/changelog";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";

export const metadata: Metadata = {
  title: "The Build Log — Proof of Velocity",
  description:
    "The living record of what Lawrence Nwuzor has shipped from Lagos. Every commit, logged. No fake case studies.",
  alternates: { canonical: "/log" },
};

export default function LogPage() {
  const entries = readBuildLog();

  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <div className="flex items-center justify-between">
            <TerminalLabel>The Build Log</TerminalLabel>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mute)]">
              {entries.length} entries
            </span>
          </div>

          <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
            Proof of velocity.
          </h1>

          <p className="mt-8 text-lg text-[color:var(--color-mute)] max-w-[52ch] leading-relaxed">
            Every commit is logged here, automatically, by the hook that runs on
            every push. No fake case studies. No mocked dashboards. Just the
            line, drawn in public.
          </p>
        </SectionReveal>

        <div className="mt-16 relative">
          {/* Timeline spine */}
          <div
            className="absolute left-2 top-2 bottom-2 w-px bg-[color:var(--color-line)]"
            aria-hidden="true"
          />

          <div className="space-y-10">
            {entries.length === 0 ? (
              <p className="pl-10 text-[color:var(--color-mute)]">
                The log is empty. The first entry will appear with the next
                commit.
              </p>
            ) : (
              entries.map((entry, i) => (
                <SectionReveal key={`${entry.hash}-${i}`} delay={i * 0.04}>
                  <div className="relative pl-10">
                    <span
                      className="absolute left-0 top-2 w-[17px] h-[17px] flex items-center justify-center rounded-full border border-[color:var(--color-solar-gold)] bg-[color:var(--color-foundation)]"
                      aria-hidden="true"
                    >
                      <NsibidiGlyph variant="dot" size={8} />
                    </span>

                    <time className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)]">
                      {entry.date}
                    </time>

                    <h2 className="mt-2 font-display text-xl md:text-2xl text-[color:var(--color-warm-off-white)]">
                      {entry.message}
                    </h2>

                    {entry.hash && (
                      <code className="mt-2 inline-block font-mono text-xs text-[color:var(--color-electric-teal)] bg-[color:var(--color-surface)] px-2 py-0.5 rounded border border-[color:var(--color-line)]">
                        {entry.hash}
                      </code>
                    )}

                    {entry.files.length > 0 && (
                      <ul className="mt-3 space-y-1">
                        {entry.files.map((file) => (
                          <li
                            key={file}
                            className="font-mono text-xs text-[color:var(--color-mute)]"
                          >
                            <span className="text-[color:var(--color-line)]">
                              ·
                            </span>{" "}
                            {file}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </SectionReveal>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
