import Link from "next/link";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { OrbitalMark } from "@/components/ui/OrbitalMark";

const channels = [
  {
    label: "Email",
    value: "lawrence@lawrencenwuzor.com",
    href: "mailto:lawrence@lawrencenwuzor.com",
  },
  {
    label: "X / Twitter",
    value: "@GozyLeonardo",
    href: "https://x.com/GozyLeonardo",
  },
  {
    label: "GitHub",
    value: "GozyLeonardo",
    href: "https://github.com/GozyLeonardo",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--color-line)]"
    >
      <div className="mx-auto max-w-3xl text-center">
        <SectionReveal>
          {/* Small OrbitalMark — cosmological anchor */}
          <div className="flex justify-center mb-8">
            <OrbitalMark size={64} />
          </div>

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

          {/* Ceremonial separator */}
          <div className="flex justify-center mt-10">
            <NsibidiGlyph variant="interlace" size={24} color="gold" animate />
          </div>

          {/* Full-width channel rows */}
          <ul className="mt-10 text-left border-t border-[color:var(--color-line)]">
            {channels.map((c) => (
              <li key={c.label}>
                <Link
                  href={c.href as never}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={
                    c.href.startsWith("http") ? "noopener noreferrer" : undefined
                  }
                  className="group flex items-center justify-between py-5 border-b border-[color:var(--color-line)] hover:border-[color:var(--color-solar-gold)] transition-colors duration-200"
                >
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-mute)] group-hover:text-[color:var(--color-solar-gold)] transition-colors">
                    {c.label}
                  </span>
                  <span className="flex items-center gap-3">
                    <span className="font-mono text-sm text-[color:var(--color-warm-off-white)]">
                      {c.value}
                    </span>
                    <span className="text-[color:var(--color-line)] group-hover:text-[color:var(--color-solar-gold)] group-hover:translate-x-1 transition-all duration-200">
                      →
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
