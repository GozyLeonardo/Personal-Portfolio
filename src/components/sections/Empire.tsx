import { SectionReveal } from "@/components/motion/SectionReveal";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { FourDirectionsIcon } from "@/components/ui/FourDirectionsIcon";

const directions = [
  {
    n: "01",
    code: "CONSUMER",
    title: "Personal Operating System",
    audience: "For those whose chi has been confused.",
    body: "The question before the question. What the compass reveals when the noise clears. Built for those whose chi is intact but misdirected.",
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
    body: "Ala does not forget what she holds. Neither does this. The ground beneath the exchange, remembered.",
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
    body: "The ndichie held a village together without a board meeting. That memory is not lost. We are remembering.",
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
    body: "Not advice. Direction. The line that runs under every life, made visible to those who stop long enough to read it.",
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
          <FourDirectionsIcon size={48} className="mt-6 opacity-60" />
          <h2 className="mt-4 font-display text-3xl md:text-5xl text-[color:var(--color-warm-off-white)]">
            Four directions.{" "}
            <span className="text-[color:var(--color-solar-gold)]">One line.</span>
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-mute)] max-w-[58ch]">
            Four directions. One thesis. The work does not announce itself — it
            moves beneath the surface, the way things that last always do.
          </p>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {directions.map((d, idx) => {
            const isPrivate = d.statusKind === "lock";
            const dotColor = isPrivate
              ? "var(--color-solar-gold)"
              : "var(--color-mute)";
            const hoverBorder = isPrivate
              ? "hover:border-[color:var(--color-solar-gold)]"
              : "hover:border-[color:var(--color-electric-teal)]";

            return (
              <SectionReveal key={d.n} delay={idx * 0.06}>
                <div
                  className={`relative overflow-hidden h-full p-8 rounded-[var(--radius-soft)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)]/60 hover:bg-[color:var(--color-surface)] ${hoverBorder} transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-quint)]`}
                >
                  {/* Ghost folio number */}
                  <span
                    className="absolute -bottom-4 -right-4 font-display leading-none text-[color:var(--color-warm-off-white)] opacity-[0.03] pointer-events-none select-none"
                    style={{ fontSize: "120px" }}
                    aria-hidden="true"
                  >
                    {d.n}
                  </span>

                  <div className="flex items-center justify-between mb-6 gap-4">
                    <span className="font-mono text-[9px] uppercase tracking-[0.22em] px-2 py-0.5 border border-[color:var(--color-solar-gold)] text-[color:var(--color-solar-gold)] rounded">
                      {d.code}
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full${isPrivate ? " animate-ping-dot" : ""}`}
                        style={{ background: dotColor }}
                      />
                      {d.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-6">
                    <NsibidiGlyph variant={d.glyph} size={32} color="teal" animate />
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
