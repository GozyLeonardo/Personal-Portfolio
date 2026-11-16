import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { UliCurveDivider } from "@/components/ui/UliCurveDivider";
import { GhostGlyph } from "@/components/ui/GhostGlyph";

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 md:py-32 px-6 md:px-10">
      {/* Vertical Uli stroke — left edge */}
      <div
        className="absolute top-0 bottom-0 left-0 md:left-10 w-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--color-solar-gold) 15%, var(--color-solar-gold) 85%, transparent)",
        }}
        aria-hidden="true"
      />

      {/* Large ghost interlace glyph — right float */}
      <GhostGlyph
        variant="interlace"
        size={120}
        className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 opacity-[0.06]"
      />

      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <TerminalLabel>About</TerminalLabel>

          <h2 className="mt-6 font-display text-3xl md:text-5xl leading-tight text-[color:var(--color-warm-off-white)]">
            Most African tech is cosplay.
            <br />
            <span className="text-[color:var(--color-solar-gold)]">
              I am building the real thing.
            </span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-[color:var(--color-warm-off-white)]">
            <p>
              I am Lawrence Chigozie Nwuzor — an Izzi indigene of Abarigwe,
              Ishieke, building from Lagos. Computer engineering, but the degree
              is not the work.
            </p>
            <p>
              In January 2025 I took a beating in Ikwo as a passage rite. Later,
              men in uniform assaulted me. Fear stopped being a factor. I got
              more calculative. The past matters for one reason only — it taught
              me to stop asking permission.
            </p>
            <p>
              Right now I am shipping. Eleven live builds — Benlaz, Sparknexis,
              KUDI, Bodways, Focus Group, Indigent Care, Meskadon, CiasLuxe, The
              Signal, and ACIM Life. Six more are in build. I am not waiting for
              a perfect portfolio to prove itself.
            </p>
            <p>
              I am moving client work into owned infrastructure. The client
              builds fund what I am building for the continent — The Signal and
              its four directions.
            </p>
            <p className="text-[color:var(--color-solar-gold)] font-display text-2xl md:text-3xl">
              Every line of code I write is a small act of return.
            </p>
          </div>
        </SectionReveal>

        <SectionReveal delay={0.15}>
          <div className="mt-12">
            <TerminalLabel>What this is not</TerminalLabel>
            <p className="mt-5 text-base leading-relaxed text-[color:var(--color-mute)]">
              Not a consultancy. Not a Western SaaS clone wearing African
              colours. Not a bid for sympathy. This is a position — the decision
              to build for the people who are actually here, from the place
              where the constraint is real.
            </p>
          </div>
        </SectionReveal>

        <UliCurveDivider />
      </div>
    </section>
  );
}
