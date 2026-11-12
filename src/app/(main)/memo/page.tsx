import type { Metadata } from "next";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { EmpireMap } from "@/components/ui/EmpireMap";
import { UliCurveDivider } from "@/components/ui/UliCurveDivider";

export const metadata: Metadata = {
  title: "The Founder Memo — A Four-Product Empire for the Next Billion",
  description:
    "The investment thesis: building what shouldn't work, from where it shouldn't. Four directions, one line, drawn from Lagos.",
  alternates: { canonical: "/memo" },
};

const directions = [
  { n: "01", code: "CONSUMER", title: "Personal OS", status: "In build", active: true },
  { n: "02", code: "FINTECH", title: "Trust Infrastructure", status: "Mapped", active: false },
  { n: "03", code: "CIVIC", title: "Coordination OS", status: "Mapped", active: false },
  { n: "04", code: "TOOLS", title: "Direction Engine", status: "Mapped", active: false },
];

const directionRows = [
  {
    n: "01",
    code: "CONSUMER",
    title: "Personal Operating System",
    audience: "For people who are genuinely lost.",
    body: "The question before the question. A compass for those whose chi is intact but misdirected. Architecture locked. In build.",
    status: "In build",
    active: true,
  },
  {
    n: "02",
    code: "FINTECH",
    title: "Trust Infrastructure",
    audience: "For African digital commerce.",
    body: "Ala does not forget what she holds. The ground beneath the exchange, remembered. Structural trust for a market that runs on memory.",
    status: "Mapped",
    active: false,
  },
  {
    n: "03",
    code: "CIVIC",
    title: "Coordination OS",
    audience: "For African communities and organizations.",
    body: "The ndichie held a village without a board meeting. That memory is not lost. We are remembering.",
    status: "Mapped",
    active: false,
  },
  {
    n: "04",
    code: "TOOLS",
    title: "Direction Engine",
    audience: "For young Africans without a clear path.",
    body: "Not advice. Direction. The line that runs under every life, made visible to those who stop long enough to read it.",
    status: "Mapped",
    active: false,
  },
];

export default function MemoPage() {
  return (
    <article className="relative pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <SectionReveal>
          <div className="flex items-center justify-between">
            <TerminalLabel>Founder Memo</TerminalLabel>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mute)]">
              Lagos · 2026
            </span>
          </div>

          <h1 className="mt-8 font-display text-4xl md:text-6xl leading-[1.02] text-[color:var(--color-warm-off-white)]">
            A four-product empire
            <br />
            <span className="text-[color:var(--color-solar-gold)]">
              for the next billion people.
            </span>
          </h1>

          <p className="mt-8 text-lg text-[color:var(--color-mute)] max-w-[52ch] leading-relaxed">
            Drawn from Lagos. Building what shouldn&apos;t work, from where it
            shouldn&apos;t.
          </p>
        </SectionReveal>

        <UliCurveDivider />

        {/* 01 — Thesis */}
        <SectionReveal>
          <TerminalLabel>Thesis</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl text-[color:var(--color-warm-off-white)]">
            Most software for Africans is built by people who have never had to
            use it.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-[color:var(--color-mute)]">
            <p>
              I am building the inverse — systems that assume the opposite. The
              infrastructure, the direction, and the trust layer for a continent
              that came online through a phone, not a desktop.
            </p>
            <p className="text-[color:var(--color-warm-off-white)]">
              Four products. One line. Each answers a question Africa is already
              asking and cannot yet answer for itself.
            </p>
          </div>
        </SectionReveal>

        {/* 02 — Why now */}
        <SectionReveal>
          <TerminalLabel className="mt-16">Why now</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl text-[color:var(--color-warm-off-white)]">
            Three forces collide in 2026.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-[color:var(--color-mute)]">
            <p>
              Half of Africa is under twenty, and most are online for the first
              time through a phone. The cost of building software collapsed to
              near zero. And the old infrastructure — built for the colonial
              economy, not the people — is failing under the weight of real
              demand.
            </p>
            <p>
              The tools exist. The people are here. What is missing is not
              technology. It is the decision to build for the people who are
              actually here.
            </p>
          </div>
        </SectionReveal>

        {/* 03 — Why this geography */}
        <SectionReveal>
          <TerminalLabel className="mt-16">Why Lagos</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl text-[color:var(--color-warm-off-white)]">
            This could not be built anywhere else.
          </h2>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-[color:var(--color-mute)]">
            <p>
              Lagos is where the continent&apos;s ambition and its constraint
              meet — a pressure cooker that tests every assumption in real time.
              If a system survives here, it survives wherever the constraint is
              real. Which is most of the world.
            </p>
          </div>
        </SectionReveal>

        {/* 04 — The four directions + Empire Map */}
        <SectionReveal>
          <TerminalLabel className="mt-16">The Four Directions</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl text-[color:var(--color-warm-off-white)]">
            One line, four directions.
          </h2>

          <div className="mt-12">
            <EmpireMap directions={directions} className="w-full h-auto" />
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6">
            {directionRows.map((d) => (
              <div
                key={d.n}
                className="relative overflow-hidden rounded-[var(--radius-soft)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)]/60 p-6"
              >
                <div className="flex items-center justify-between gap-4 mb-4">
                  <span
                    className={`font-mono text-[9px] uppercase tracking-[0.22em] px-2 py-0.5 border rounded ${
                      d.active
                        ? "border-[color:var(--color-solar-gold)] text-[color:var(--color-solar-gold)]"
                        : "border-[color:var(--color-line)] text-[color:var(--color-mute)]"
                    }`}
                  >
                    {d.code}
                  </span>
                  <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{
                        background: d.active
                          ? "var(--color-solar-gold)"
                          : "var(--color-mute)",
                      }}
                    />
                    {d.status}
                  </span>
                </div>
                <div className="flex items-start gap-5">
                  <NsibidiGlyph
                    variant={d.active ? "spiral" : "dot"}
                    size={28}
                    color={d.active ? "gold" : "muted"}
                  />
                  <div>
                    <h3 className="font-display text-xl text-[color:var(--color-warm-off-white)]">
                      {d.title}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.12em] text-[color:var(--color-mute)]">
                      {d.audience}
                    </p>
                    <p className="mt-4 text-base leading-relaxed text-[color:var(--color-mute)]">
                      {d.body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* 05 — Traction signals */}
        <SectionReveal>
          <TerminalLabel className="mt-16">Traction signals</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl text-[color:var(--color-warm-off-white)]">
            Pre-revenue. No co-founder.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-[color:var(--color-mute)]">
            <p>
              I will not dress this up. Here is what exists instead of what does
              not.
            </p>
            <ul className="space-y-3">
              {[
                "Live builds shipped: Benlaz, Sparknexis Energy, KUDI, SQC Community.",
                "The Signal — a private build, architecture locked, in progress.",
                "Public writing, published on a cadence, not an accident.",
                "Thousands of hours at the keyboard before Lagos wakes.",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="text-[color:var(--color-solar-gold)] mt-1.5">
                    <NsibidiGlyph variant="dot" size={12} />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </SectionReveal>

        {/* 06 — 18-month plan */}
        <SectionReveal>
          <TerminalLabel className="mt-16">18-month plan</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl text-[color:var(--color-warm-off-white)]">
            The line, drawn forward.
          </h2>
          <div className="mt-6 space-y-3">
            {[
              ["0–6 months", "Ship the Personal Operating System to first users. Hold the SQC community."],
              ["6–12 months", "Open the Direction Engine. Publish the build log as proof of velocity."],
              ["12–18 months", "Stand up Trust Infrastructure. The four directions become one system."],
            ].map(([window, goal]) => (
              <div
                key={window}
                className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6 py-4 border-b border-[color:var(--color-line)]"
              >
                <span className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-solar-gold)] shrink-0">
                  {window}
                </span>
                <span className="text-[color:var(--color-warm-off-white)]">{goal}</span>
              </div>
            ))}
          </div>
        </SectionReveal>

        {/* 07 — What this is not */}
        <SectionReveal>
          <TerminalLabel className="mt-16">What this is not</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl text-[color:var(--color-warm-off-white)]">
            Boundaries hold the shape.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-[color:var(--color-mute)]">
            <p>
              Not a consultancy. Not a Western SaaS clone with African colours.
              Not a lifestyle business. Not a bid for sympathy.
            </p>
            <p>
              This is a position — the decision to build for the people who are
              actually here, from the place where the constraint is real.
            </p>
          </div>
        </SectionReveal>

        {/* 08 — Honest risks */}
        <SectionReveal>
          <TerminalLabel className="mt-16">Honest risks</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl text-[color:var(--color-warm-off-white)]">
            I name these before you do.
          </h2>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-[color:var(--color-mute)]">
            <p>
              Pre-revenue. Solo. A market whose demand is proven in population
              but not yet in payment. The plan is a line, not a guarantee.
            </p>
            <p>
              What I carry against these: the builds that shipped, the cadence
              that held, and a faith that is clarity, not comfort.
            </p>
          </div>
        </SectionReveal>

        {/* 09 — The ask + contact */}
        <SectionReveal>
          <div className="mt-20 rounded-[var(--radius-soft)] border border-[color:var(--color-solar-gold)]/40 bg-[color:var(--color-surface)]/60 p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <OrbitalMark size={56} />
            </div>
            <h2 className="font-display text-3xl md:text-4xl text-[color:var(--color-warm-off-white)]">
              I am building for the long arc.
            </h2>
            <p className="mt-6 text-lg text-[color:var(--color-mute)] max-w-[46ch] mx-auto">
              If you hold capital, conviction, or a community that should be
              part of this — write to me. I read every line.
            </p>
            <a
              href="mailto:lawrence@lawrencenwuzor.com"
              className="mt-8 inline-flex items-center gap-2 rounded-[var(--radius-soft)] bg-[color:var(--color-solar-gold)] px-8 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[color:var(--color-foundation)] transition-all duration-[var(--duration-micro)] hover:bg-[color:var(--color-solar-gold-soft)]"
            >
              lawrence@lawrencenwuzor.com
            </a>
          </div>
        </SectionReveal>
      </div>
    </article>
  );
}
