import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { SectionReveal } from "@/components/motion/SectionReveal";

const stack = {
  frontend: ["Next.js 15", "React 19", "TypeScript", "Tailwind v4", "Motion"],
  backend: ["Supabase", "PostgreSQL", "Edge Functions", "REST + tRPC"],
  ops: ["Vercel", "GitHub Actions", "Cloudflare", "Resend"],
  ai: ["Claude", "OpenAI", "n8n", "Custom prompt arsenal"],
};

const principles = [
  "The work serves more than itself, or it does not get built.",
  "Specifics carry the weight. Date, place, dollar figure, named verb.",
  "Failure carries chi the success would not. Ship the lesson.",
  "Built from inside Lagos, not for Lagos. The ground itself remembered.",
];

export function Skills() {
  return (
    <section id="skills" className="py-24 md:py-32 px-6 md:px-10 bg-[color:var(--color-surface)]/40 border-y border-[color:var(--color-line)]">
      <div className="mx-auto max-w-6xl grid md:grid-cols-2 gap-16">
        <SectionReveal>
          <TerminalLabel>Stack</TerminalLabel>
          <h2 className="mt-6 font-display text-3xl md:text-4xl text-[color:var(--color-warm-off-white)]">
            What I build with
          </h2>

          <div className="mt-10 space-y-8">
            {Object.entries(stack).map(([category, items]) => (
              <div key={category}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-electric-teal)] mb-3">
                  {category}
                </p>
                <ul className="flex flex-wrap gap-x-4 gap-y-2">
                  {items.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-sm text-[color:var(--color-warm-off-white)]"
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
                className="flex gap-4 text-base text-[color:var(--color-warm-off-white)]"
              >
                <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-0.5">
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
