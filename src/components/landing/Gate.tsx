import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { SolarGoldButton } from "@/components/ui/SolarGoldButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { TelemetryStrip } from "@/components/ui/TelemetryStrip";
import { IgboUkwuGrid } from "@/components/ui/IgboUkwuGrid";
import { AnimatedHairline } from "@/components/motion/AnimatedHairline";
import { SectionReveal } from "@/components/motion/SectionReveal";

export function Gate() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col justify-between px-6 md:px-10 overflow-hidden">
      <IgboUkwuGrid className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" />

      <AnimatedHairline
        className="absolute top-20 left-6 right-6 md:left-10 md:right-10 pointer-events-none z-10"
        delay={0}
      />

      {/* Header band */}
      <header className="relative z-10 flex items-center justify-between pt-8">
        <div className="flex items-center gap-3">
          <OrbitalMark size={36} />
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-warm-off-white)]">
            Lawrence Nwuzor
          </span>
        </div>
        <TelemetryStrip
          align="start"
          className="hidden md:flex w-auto"
          readouts={[
            { label: "Station", value: "Lagos · NG", status: "lock" },
            { label: "Chi", value: "Intact", status: "lock" },
            { label: "Gate", value: "Sealed", status: "lock" },
          ]}
        />
      </header>

      {/* The threshold */}
      <main className="relative z-10 mx-auto w-full max-w-4xl py-24">
        <div className="flex flex-col items-center text-center">
          <SectionReveal>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-[color:var(--color-solar-gold)] flex items-center gap-2 justify-center">
              <NsibidiGlyph variant="cross" size={14} animate />
              A threshold · Lagos · Shipping live
            </p>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <h1 className="mt-10 font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-[color:var(--color-warm-off-white)]">
              Before you enter.
            </h1>
          </SectionReveal>

          <SectionReveal delay={0.2}>
            <p className="mt-12 font-display text-2xl md:text-4xl leading-tight text-[color:var(--color-solar-gold)]">
              What do you think about the future?
            </p>
          </SectionReveal>

          <SectionReveal delay={0.3}>
            <p className="mt-8 text-lg text-[color:var(--color-mute)] max-w-[52ch] leading-relaxed">
              Not everyone is ready to answer that. What waits beyond this door
              is not a portfolio — it is work that is live and still being
              built. Yours is decided by how you answer.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.4}>
            <div className="mt-14 flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
              <SolarGoldButton href="/memo">
                I believe it can be built
              </SolarGoldButton>
              <GhostButton href="/home">Show me the work first</GhostButton>
            </div>
          </SectionReveal>
        </div>
      </main>

      {/* Footer band */}
      <footer className="relative z-10 pb-8">
        <AnimatedHairline
          className="mb-6"
          delay={0.5}
        />
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-mute)] text-center">
          If you came to be impressed, this is the wrong door. The line carries
          through those who build.
        </p>
      </footer>
    </section>
  );
}
