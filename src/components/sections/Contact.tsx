import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { SolarGoldButton } from "@/components/ui/SolarGoldButton";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";

const channels = [
  { label: "Email", value: "lawrence@lawrencenwuzor.com", href: "mailto:lawrence@lawrencenwuzor.com" },
  { label: "X / Twitter", value: "@GozyLeonardo", href: "https://x.com/GozyLeonardo" },
  { label: "GitHub", value: "GozyLeonardo", href: "https://github.com/GozyLeonardo" },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--color-line)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          <TerminalLabel className="justify-center">Contact</TerminalLabel>

          <h2 className="mt-6 font-display text-4xl md:text-6xl leading-tight text-[color:var(--color-warm-off-white)]">
            What does your work
            <br />
            <span className="text-[color:var(--color-solar-gold)]">
              demand of you?
            </span>
          </h2>

          <p className="mt-8 text-lg text-[color:var(--color-warm-off-white)] max-w-[48ch] mx-auto">
            I build with founders whose work demands something larger than
            themselves. The line carries through them. The work serves more
            than itself.
          </p>

          <p className="mt-4 text-base text-[color:var(--color-mute)] max-w-[48ch] mx-auto">
            If yours does — send me the answer. If it doesn&apos;t, no need.
            Ala still holds the dead.
          </p>

          <div className="mt-12 flex justify-center">
            <SolarGoldButton href="mailto:lawrence@lawrencenwuzor.com">
              Tell me what your work demands
            </SolarGoldButton>
          </div>

          <ul className="mt-16 flex flex-col sm:flex-row justify-center gap-8 sm:gap-12">
            {channels.map((c) => (
              <li key={c.label}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-electric-teal)] flex items-center justify-center gap-2 mb-2">
                  <NsibidiGlyph variant="dot" size={8} color="teal" />
                  {c.label}
                </p>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono text-sm text-[color:var(--color-warm-off-white)] hover:text-[color:var(--color-solar-gold)] transition-colors"
                >
                  {c.value}
                </a>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
