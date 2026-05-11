import Link from "next/link";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { SectionIndex } from "@/components/ui/SectionIndex";

const ventures = [
  {
    slug: "benlaz",
    code: "001",
    name: "Benlaz",
    tagline: "First production proof.",
    summary:
      "A Next.js platform shipped end-to-end from Lagos. Code from this ground holds chi.",
    role: "Founder · Engineering",
    year: "2024 — Live",
    stack: ["Next.js", "TypeScript", "Vercel"],
    status: "Live",
    statusKind: "live" as const,
    href: "https://benlaz.com",
    external: true,
    glyph: "spiral" as const,
  },
  {
    slug: "sqc",
    code: "002",
    name: "SQC Community",
    tagline: "Peer infrastructure.",
    summary:
      "Nigerian builders moving from zero to first paying client. Held in WhatsApp because that is where the line moves now.",
    role: "Founder · Operations",
    year: "2025 — Now",
    stack: ["Community", "Operations", "Content"],
    status: "Active",
    statusKind: "live" as const,
    href: "/projects/sqc" as const,
    external: false,
    glyph: "interlace" as const,
  },
  {
    slug: "empire-os",
    code: "003",
    name: "Empire OS",
    tagline: "Direction engine for the lost.",
    summary:
      "Faith-grounded operating system for young Africans whose chi has been confused by colonial cartography. Built the way ndichie built — for those who come after.",
    role: "Founder · Design · Engineering",
    year: "2026 — In build",
    stack: ["Next.js", "Supabase", "AI"],
    status: "Private build",
    statusKind: "lock" as const,
    href: "/projects/empire-os" as const,
    external: false,
    glyph: "wave" as const,
  },
];

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <SectionIndex current={3} total={6} label="Ventures" bearing="072°" />
          <h2 className="mt-6 font-display text-3xl md:text-5xl text-[color:var(--color-warm-off-white)]">
            Three ventures.{" "}
            <span className="text-[color:var(--color-solar-gold)]">One line.</span>
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-mute)] max-w-[52ch]">
            Each one a small return — code as ritual, not transaction.
          </p>
        </SectionReveal>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          {ventures.map((v, idx) => {
            const dotColor =
              v.statusKind === "live"
                ? "var(--color-electric-teal)"
                : "var(--color-solar-gold)";

            return (
              <SectionReveal key={v.slug} delay={idx * 0.08}>
                <Link
                  href={v.href as never}
                  target={v.external ? "_blank" : undefined}
                  rel={v.external ? "noopener noreferrer" : undefined}
                  className="block h-full p-8 rounded-[var(--radius-soft)] bg-[color:var(--color-surface)] border border-[color:var(--color-line)] hover:border-[color:var(--color-solar-gold)] transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-quint)] group"
                >
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-solar-gold)]">
                      {v.code} / 003
                    </span>
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{ background: dotColor }}
                      />
                      {v.status}
                    </span>
                  </div>

                  <NsibidiGlyph variant={v.glyph} size={24} color="gold" />

                  <h3 className="mt-5 font-display text-2xl text-[color:var(--color-warm-off-white)] group-hover:text-[color:var(--color-solar-gold)] transition-colors">
                    {v.name}
                  </h3>

                  <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--color-electric-teal)]">
                    {v.tagline}
                  </p>

                  <p className="mt-5 text-sm leading-relaxed text-[color:var(--color-warm-off-white)] opacity-90">
                    {v.summary}
                  </p>

                  <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[11px] font-mono uppercase tracking-[0.12em]">
                    <dt className="text-[color:var(--color-mute)]">Role</dt>
                    <dd className="text-[color:var(--color-warm-off-white)]">{v.role}</dd>
                    <dt className="text-[color:var(--color-mute)]">Year</dt>
                    <dd className="text-[color:var(--color-warm-off-white)]">{v.year}</dd>
                    <dt className="text-[color:var(--color-mute)]">Stack</dt>
                    <dd className="text-[color:var(--color-warm-off-white)]">
                      {v.stack.join(" · ")}
                    </dd>
                  </dl>
                </Link>
              </SectionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
