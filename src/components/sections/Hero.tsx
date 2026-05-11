import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { SolarGoldButton } from "@/components/ui/SolarGoldButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { TelemetryStrip } from "@/components/ui/TelemetryStrip";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center pt-32 pb-24 px-6 md:px-10 overflow-hidden">
      {/* Two thin gold hairlines — the only frame. Manuscript page register. */}
      <div
        className="absolute top-24 left-6 right-6 md:left-10 md:right-10 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--color-solar-gold) 50%, transparent) 25%, color-mix(in oklab, var(--color-solar-gold) 50%, transparent) 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-12 left-6 right-6 md:left-10 md:right-10 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--color-solar-gold) 50%, transparent) 25%, color-mix(in oklab, var(--color-solar-gold) 50%, transparent) 75%, transparent 100%)",
        }}
        aria-hidden="true"
      />

      <div className="mx-auto max-w-6xl w-full relative">
        <TelemetryStrip
          className="mb-12"
          align="start"
          readouts={[
            { label: "Station", value: "Lagos · NG", status: "lock" },
            { label: "Bearing", value: "035°", status: "live" },
          ]}
        />

        <div className="grid md:grid-cols-[1fr_auto] gap-16 items-center">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] flex items-center gap-2 mb-8">
              <NsibidiGlyph variant="cross" size={14} />
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
