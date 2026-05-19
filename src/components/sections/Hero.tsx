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
              Engineer · Lagos · The line carries
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
              Software engineer and builder from Lagos. I make full-stack
              systems for founders whose work carries chi. Every line of code,
              a small act of return.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SolarGoldButton href="#contact">Let&apos;s work</SolarGoldButton>
              <GhostButton href="#projects">Follow the build &rarr;</GhostButton>
            </div>
          </div>

          <div className="hidden md:flex justify-center md:justify-end">
            <OrbitalMark size={280} />
          </div>
        </div>
      </div>
    </section>
  );
}
