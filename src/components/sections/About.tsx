import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { UliCurveDivider } from "@/components/ui/UliCurveDivider";

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <SectionReveal>
          <TerminalLabel>About</TerminalLabel>

          <h2 className="mt-6 font-display text-3xl md:text-5xl leading-tight text-[color:var(--color-warm-off-white)]">
            They say the soul of Africa is gone.
            <br />
            <span className="text-[color:var(--color-solar-gold)]">
              That is not what my grandfathers carried.
            </span>
          </h2>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-[color:var(--color-warm-off-white)]">
            <p>
              I am Lawrence Chigozie Nwuzor. Born December 2001 in Ebonyi,
              Nigeria — an Izzi indigene of Abarigwe, Ishieke. Computer
              Engineering graduate. Working from Lagos.
            </p>
            <p>
              Ala still holds the dead. Ndichie still gather at the boundary.
              The chi that walked with my grandfather still walks with me. What
              was buried did not die — it went underground because the ground
              itself remembered.
            </p>
            <p>
              I build the front of a long-arc empire. Trust infrastructure.
              Direction systems. Coordination tools for Africa and humanity.
              Spiritually grounded. Technically unassailable. Built to outlast
              me.
            </p>
            <p className="text-[color:var(--color-solar-gold)] font-display text-xl md:text-2xl">
              Every line of code I write is a small act of return.
            </p>
          </div>
        </SectionReveal>

        <UliCurveDivider />
      </div>
    </section>
  );
}
