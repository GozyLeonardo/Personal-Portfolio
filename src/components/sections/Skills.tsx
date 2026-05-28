import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";

const stack = {
  frontend: ["Next.js 16", "React 19", "TypeScript", "Tailwind v4", "Motion", "Keystatic"],
  backend: ["Supabase", "PostgreSQL", "Python", "LangGraph", "REST"],
  ops: ["Vercel", "GitHub Actions", "Cloudflare", "Resend", "Cloudinary"],
  ai: ["Claude", "n8n", "WhatsApp Business API", "Custom prompt arsenal"],
};

const principles = [
  "The work serves more than itself, or it does not get built.",
  "Specifics carry the weight. Date, place, dollar figure, named verb.",
  "Failure carries chi the success would not. Ship the lesson.",
  "Built from inside Lagos, not for Lagos. The ground itself remembered.",
];

export function Skills() {
  return (
    <section
      id="skills"
      className="py-24 md:py-32 px-6 md:px-10 bg-[color:var(--color-surface)]/40 border-y border-[color:var(--color-line)]"
    >
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
        <SectionReveal>
          <TerminalLabel>Stack</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl md:text-4xl text-[color:var(--color-warm-off-white)]">
            What I build with
          </h2>

          <div className="mt-10 space-y-8">
            {Object.entries(stack).map(([category, items]) => (
              <div key={category}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-electric-teal)] mb-3 flex items-center gap-2">
                  {category}
                  <NsibidiGlyph variant="wave" size={12} color="teal" animate />
                </p>
                <ul className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs px-2.5 py-1 border border-[color:var(--color-line)] rounded text-[color:var(--color-warm-off-white)] bg-[color:var(--color-surface)]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <TerminalLabel>Principles</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl md:text-4xl text-[color:var(--color-warm-off-white)]">
            How I work
          </h2>

          <ul className="mt-10 space-y-6">
            {principles.map((principle, idx) => (
              <li
                key={principle}
                className="flex items-start gap-3 text-base text-[color:var(--color-warm-off-white)]"
              >
                <NsibidiGlyph variant="dot" size={8} color="gold" animate />
                <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-0.5 flex-shrink-0">
                  0{idx + 1}
                </span>
                <span>{principle}</span>
              </li>
            ))}
          </ul>
        </SectionReveal>
      </div>
    </section>
  );
}
