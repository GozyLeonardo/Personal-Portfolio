import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { SolarGoldButton } from "@/components/ui/SolarGoldButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { TelemetryStrip } from "@/components/ui/TelemetryStrip";
import { IgboUkwuGrid } from "@/components/ui/IgboUkwuGrid";
import { AnimatedHairline } from "@/components/motion/AnimatedHairline";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-24 px-6 md:px-10 overflow-hidden">
      {/* Igbo-Ukwu interlacing circle grid — background texture */}
      <IgboUkwuGrid className="absolute inset-0 opacity-[0.04] pointer-events-none z-0" />

      {/* Animated gold hairlines */}
      <AnimatedHairline
        className="absolute top-24 left-6 right-6 md:left-10 md:right-10 pointer-events-none z-10"
        delay={0}
      />
      <AnimatedHairline
        className="absolute bottom-12 left-6 right-6 md:left-10 md:right-10 pointer-events-none z-10"
        delay={0.3}
      />

      <div className="mx-auto max-w-6xl w-full relative z-10">
        <TelemetryStrip
          className="mb-12"
          align="start"
          readouts={[
            { label: "Station", value: "Lagos · NG", status: "lock" },
            { label: "Bearing", value: "035°", status: "live" },
            { label: "Chi", value: "Intact", status: "lock" },
          ]}
        />

        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] flex items-center gap-2 mb-8">
              <NsibidiGlyph variant="cross" size={14} animate />
              AI Orchestrator · Lagos · The line carries
            </p>

            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-[color:var(--color-warm-off-white)]">
              Lawrence
              <br />
              Nwuzor
            </h1>

            <p className="mt-8 text-lg md:text-xl text-[color:var(--color-warm-off-white)] max-w-[42ch] leading-relaxed">
              Building what shouldn&apos;t work,
              <br className="hidden md:block" /> from where it shouldn&apos;t.
            </p>

            <p className="mt-6 text-base text-[color:var(--color-mute)] max-w-[54ch]">
              I build the front of a long-arc empire from Lagos — AI systems,
              production-grade infrastructure, and the tools that hold
              communities together. Every line of code, a small act of return.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SolarGoldButton href="#projects">See the builds</SolarGoldButton>
              <GhostButton href="#empire">The Signal &rarr;</GhostButton>
            </div>

            {/* Live builds shipped so far — the done list */}
            <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)] flex flex-wrap items-center gap-x-5 gap-y-2">
              <span className="text-[color:var(--color-solar-gold)]">Live builds</span>
              <a
                href="https://benlaz.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--color-solar-gold)] transition-colors"
              >
                benlaz.com
              </a>
              <a
                href="https://sparknexisenergy.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--color-solar-gold)] transition-colors"
              >
                sparknexisenergy.com
              </a>
              <a
                href="https://kudiapp.com.ng"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--color-solar-gold)] transition-colors"
              >
                kudiapp.com.ng
              </a>
              <a
                href="/projects/sqc"
                className="hover:text-[color:var(--color-solar-gold)] transition-colors"
              >
                sqc.community
              </a>
            </p>
          </div>

          <div className="hidden md:flex justify-center md:justify-end">
            <OrbitalMark size={280} />
          </div>
        </div>
      </div>
    </section>
  );
}
