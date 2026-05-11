import { SectionReveal } from "@/components/motion/SectionReveal";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { SectionIndex } from "@/components/ui/SectionIndex";

const directions = [
  {
    n: "01",
    code: "CONSUMER",
    title: "Personal Operating System",
    audience: "For those whose chi has been confused.",
    body:
      "A direction engine. Not productivity. Direction — the question that comes before the task list. What does your chi require of you? That question, answered honestly.",
    role: "Founder · Design · Engineering",
    year: "2026 — In build",
    status: "Private build",
    statusKind: "lock" as const,
    glyph: "spiral" as const,
  },
  {
    n: "02",
    code: "FINTECH",
    title: "Trust Infrastructure",
    audience: "Structural solutions for African commerce.",
    body:
      "The verification and trust layer beneath African transactions. Ala holds what we build on her. The infrastructure must remember that.",
    role: "Founder · Engineering",
    year: "Mapped",
    status: "Mapped",
    statusKind: "idle" as const,
    glyph: "interlace" as const,
  },
  {
    n: "03",
    code: "CIVIC",
    title: "Coordination OS",
    audience: "For informal African communities.",
    body:
      "How groups hold a direction together. Ndichie knew this. We forgot. We are remembering. Coordination is the missing layer beneath every African institution that almost worked.",
    role: "Founder · Operations",
    year: "Mapped",
    status: "Mapped",
    statusKind: "idle" as const,
    glyph: "cross" as const,
  },
  {
    n: "04",
    code: "TOOLS",
    title: "Direction Engine",
    audience: "Navigation for people without a clear path.",
    body:
      "A system that asks the right questions and surfaces the right next step. Not advice — direction. The line that runs under every life, made visible.",
    role: "Founder · Design",
    year: "Mapped",
    status: "Mapped",
    statusKind: "idle" as const,
    glyph: "wave" as const,
  },
];

export function Empire() {
  return (
    <section id="empire" className="py-24 md:py-32 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <SectionIndex current={5} total={6} label="Empire" bearing="180°" />
          <h2 className="mt-6 font-display text-3xl md:text-5xl text-[color:var(--color-warm-off-white)]">
            Four directions.{" "}
            <span className="text-[color:var(--color-solar-gold)]">One line.</span>
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-mute)] max-w-[58ch]">
            The empire is not a company. It is a portfolio of systems that share
            one thesis — Africa is a continuation, not a catch-up. What was
            buried still moves.
          </p>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {directions.map((d, idx) => {
            const dotColor =
              d.statusKind === "lock"
                ? "var(--color-solar-gold)"
                : "var(--color-mute)";

            return (
              <SectionReveal key={d.n} delay={idx * 0.06}>
                <div className="h-full p-8 rounded-[var(--radius-soft)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)]/60 hover:bg-[color:var(--color-surface)] hover:border-[color:var(--color-electric-teal)] transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-quint)]">
                  <div className="flex items-center justify-between mb-6 gap-4">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-electric-teal)]">
                      Dir {d.n} / 04 · {d.code}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: dotColor }}
                      />
                      {d.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-6">
                    <NsibidiGlyph variant={d.glyph} size={32} color="teal" />
                    <div className="flex-1">
                      <h3 className="font-display text-2xl text-[color:var(--color-warm-off-white)]">
                        {d.title}
                      </h3>
                      <p className="mt-2 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-mute)]">
                        {d.audience}
                      </p>
                      <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-warm-off-white)] opacity-90">
                        {d.body}
                      </p>

                      <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1.5 text-[11px] font-mono uppercase tracking-[0.12em]">
                        <dt className="text-[color:var(--color-mute)]">Role</dt>
                        <dd className="text-[color:var(--color-warm-off-white)]">{d.role}</dd>
                        <dt className="text-[color:var(--color-mute)]">Year</dt>
                        <dd className="text-[color:var(--color-warm-off-white)]">{d.year}</dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
