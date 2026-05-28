import type { Metadata } from "next";
import Link from "next/link";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";

export const metadata: Metadata = {
  title: "Projects",
  description: "Selected work by Lawrence Nwuzor.",
};

const projects = [
  {
    name: "Chi",
    tagline: "Life management via WhatsApp.",
    status: "In build",
    href: "/projects/chi" as const,
    glyph: "wave" as const,
  },
  {
    name: "The 7-Day Lead Engine",
    tagline: "Production-grade sites. One week.",
    status: "Live",
    href: "/services" as const,
    glyph: "cross" as const,
  },
  {
    name: "SQC Community",
    tagline: "Peer infrastructure for Nigerian builders.",
    status: "Active",
    href: "/projects/sqc" as const,
    glyph: "interlace" as const,
  },
  {
    name: "Benlaz",
    tagline: "First production proof.",
    status: "Live",
    href: "https://benlaz.com",
    glyph: "spiral" as const,
    external: true,
  },
];

export default function ProjectsPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Projects</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          The build log.
        </h1>
        <p className="mt-8 text-lg text-[color:var(--color-mute)]">
          Four ventures. Case studies ship as each one clears the next gate.
        </p>

        <ul className="mt-16 space-y-4">
          {projects.map((p) => {
            const isLive = p.status === "Live" || p.status === "Active";
            return (
              <li key={p.name}>
                <Link
                  href={p.href as never}
                  target={p.external ? "_blank" : undefined}
                  rel={p.external ? "noopener noreferrer" : undefined}
                  className="block p-6 border border-[color:var(--color-line)] rounded-[var(--radius-soft)] hover:border-[color:var(--color-solar-gold)] transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <NsibidiGlyph variant={p.glyph} size={16} color="gold" animate />
                      <h2 className="font-display text-xl text-[color:var(--color-warm-off-white)] group-hover:text-[color:var(--color-solar-gold)] transition-colors">
                        {p.name}
                      </h2>
                    </div>
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
                      <span
                        className={`inline-block w-1.5 h-1.5 rounded-full${isLive ? " animate-ping-dot" : ""}`}
                        style={{
                          background: isLive
                            ? "var(--color-electric-teal)"
                            : "var(--color-solar-gold)",
                        }}
                      />
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-[color:var(--color-mute)] ml-7">
                    {p.tagline}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
