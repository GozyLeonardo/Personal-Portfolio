import Link from "next/link";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { SectionIndex } from "@/components/ui/SectionIndex";
import { GhostGlyph } from "@/components/ui/GhostGlyph";

interface Venture {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  summary: string;
  role: string;
  year: string;
  stack: string[];
  status: string;
  statusKind: "live" | "build";
  href?: string;
  external?: boolean;
  glyph: "dot" | "cross" | "spiral" | "wave" | "interlace";
}

const live: Venture[] = [
  {
    slug: "benlaz",
    code: "001",
    name: "Benlaz",
    tagline: "A living legacy.",
    summary: "The family's digital home — shipped and live. The first proof that code from this ground holds.",
    role: "Founder · Engineering",
    year: "Live",
    stack: ["Next.js", "TypeScript", "Vercel"],
    status: "Live",
    statusKind: "live",
    href: "https://benlaz.com",
    external: true,
    glyph: "spiral",
  },
  {
    slug: "sparknexis",
    code: "002",
    name: "Sparknexis Energy",
    tagline: "Solar, sold direct from Lagos.",
    summary: "A store that prices, carts, and tracks solar equipment — panels, inverters, batteries — Lagos to the door.",
    role: "Founder · Engineering",
    year: "Live",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Vercel"],
    status: "Live",
    statusKind: "live",
    href: "https://sparknexisenergy.com",
    external: true,
    glyph: "dot",
  },
  {
    slug: "kudi",
    code: "003",
    name: "KUDI",
    tagline: "Record sales. Know your stock.",
    summary: "Shopkeepers still run from memory. KUDI records the sale, knows the stock, shows the number.",
    role: "Founder · Architecture · Engineering",
    year: "Live",
    stack: ["Next.js", "TypeScript", "Neon PostgreSQL", "PWA"],
    status: "Live",
    statusKind: "live",
    href: "https://kudiapp.com.ng",
    external: true,
    glyph: "spiral",
  },
  {
    slug: "bodways",
    code: "004",
    name: "Bodways Integrated",
    tagline: "Integrated smart services.",
    summary: "Smart services for modern living, live from Lagos. Client work that moved from folder to deployment.",
    role: "Engineering",
    year: "Live",
    stack: ["Next.js", "TypeScript"],
    status: "Live",
    statusKind: "live",
    href: "https://bodways-integrated-hc3e30yhs-gozy-leonardos-projects.vercel.app",
    external: true,
    glyph: "cross",
  },
  {
    slug: "focus-group",
    code: "005",
    name: "Focus Group Limited",
    tagline: "Business services.",
    summary: "A business services front, live.",
    role: "Engineering",
    year: "Live",
    stack: ["Next.js", "TypeScript"],
    status: "Live",
    statusKind: "live",
    href: "https://focus-group-lrd5k9kxk-gozy-leonardos-projects.vercel.app",
    external: true,
    glyph: "wave",
  },
  {
    slug: "indigent-care",
    code: "006",
    name: "Indigent Care Foundation",
    tagline: "A foundation's front.",
    summary: "The foundation's digital front — .com and .org, live.",
    role: "Engineering",
    year: "Live",
    stack: ["Next.js", "TypeScript"],
    status: "Live",
    statusKind: "live",
    href: "https://indigentcarefoundation.com",
    external: true,
    glyph: "interlace",
  },
  {
    slug: "meskadon",
    code: "007",
    name: "Meskadon Engineering",
    tagline: "Engineering services.",
    summary: "An engineering services firm's front, live.",
    role: "Engineering",
    year: "Live",
    stack: ["Next.js", "TypeScript"],
    status: "Live",
    statusKind: "live",
    href: "https://meskadon-engineering-services-g6b77ts8s-gozy-leonardos-projects.vercel.app",
    external: true,
    glyph: "cross",
  },
  {
    slug: "ciasluxe",
    code: "008",
    name: "CiasLuxe Events",
    tagline: "Events.",
    summary: "An events company's site, live.",
    role: "Engineering",
    year: "Live",
    stack: ["Astro", "TypeScript"],
    status: "Live",
    statusKind: "live",
    href: "https://ciasluxe-events-mb3olrmji-gozy-leonardos-projects.vercel.app",
    external: true,
    glyph: "wave",
  },
  {
    slug: "the-signal",
    code: "009",
    name: "The Signal",
    tagline: "The front of the empire.",
    summary: "The four directions, drawn in public. Live.",
    role: "Founder · Engineering",
    year: "Live",
    stack: ["Next.js", "TypeScript"],
    status: "Live",
    statusKind: "live",
    href: "https://the-signal-site-pbn0uze15-gozy-leonardos-projects.vercel.app",
    external: true,
    glyph: "spiral",
  },
  {
    slug: "acim-life",
    code: "010",
    name: "ACIM Life",
    tagline: "A learning environment.",
    summary: "A learning environment for A Course in Miracles, live.",
    role: "Founder · Engineering",
    year: "Live",
    stack: ["React", "Capacitor"],
    status: "Live",
    statusKind: "live",
    href: "https://acim-life-ntf7bo5hh-gozy-leonardos-projects.vercel.app",
    external: true,
    glyph: "dot",
  },
];

const inBuild: Venture[] = [
  {
    slug: "chi",
    code: "011",
    name: "Chi",
    tagline: "Life management via WhatsApp.",
    summary: "For people who feel lost. A WhatsApp-native system that holds the line. The first product under The Signal.",
    role: "Founder · Architecture · Engineering",
    year: "In build",
    stack: ["Python", "LangGraph", "Supabase", "WhatsApp API"],
    status: "In build",
    statusKind: "build",
    href: "/projects/chi",
    glyph: "wave",
  },
  {
    slug: "alp-solar",
    code: "012",
    name: "Alp Solar Nigeria",
    tagline: "Solar.",
    summary: "In build.",
    role: "Engineering",
    year: "In build",
    stack: [],
    status: "In build",
    statusKind: "build",
    glyph: "dot",
  },
  {
    slug: "bluutech",
    code: "013",
    name: "Bluutech Integrated Services",
    tagline: "Integrated services.",
    summary: "In build.",
    role: "Engineering",
    year: "In build",
    stack: [],
    status: "In build",
    statusKind: "build",
    glyph: "cross",
  },
  {
    slug: "octovia",
    code: "014",
    name: "Octovia Pharmacies",
    tagline: "Pharmacy front.",
    summary: "In build.",
    role: "Engineering",
    year: "In build",
    stack: [],
    status: "In build",
    statusKind: "build",
    glyph: "wave",
  },
  {
    slug: "pasiey",
    code: "015",
    name: "Pasiey Natural Foods",
    tagline: "Natural foods.",
    summary: "In build.",
    role: "Engineering",
    year: "In build",
    stack: [],
    status: "In build",
    statusKind: "build",
    glyph: "dot",
  },
  {
    slug: "sheascends",
    code: "016",
    name: "SheAscends",
    tagline: "Women's initiative.",
    summary: "In build.",
    role: "Engineering",
    year: "In build",
    stack: [],
    status: "In build",
    statusKind: "build",
    glyph: "wave",
  },
];

function VentureCard({ v, idx }: { v: Venture; idx: number }) {
  const isLive = v.statusKind === "live";
  const dotColor = isLive
    ? "var(--color-electric-teal)"
    : "var(--color-solar-gold)";

  const inner = (
    <>
      <GhostGlyph
        variant={v.glyph}
        size={80}
        className="absolute right-4 bottom-4 group-hover:opacity-[0.15] transition-opacity duration-500"
      />

      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-solar-gold)]">
          {v.code} / 016
        </span>
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full${isLive ? " animate-ping-dot" : ""}`}
            style={{ background: dotColor }}
          />
          {v.status}
        </span>
      </div>

      <NsibidiGlyph variant={v.glyph} size={24} color={isLive ? "teal" : "gold"} animate />

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
        {v.stack.length > 0 && (
          <>
            <dt className="text-[color:var(--color-mute)]">Stack</dt>
            <dd className="flex flex-wrap gap-1.5 mt-1">
              {v.stack.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-[10px] px-2 py-0.5 border border-[color:var(--color-line)] rounded text-[color:var(--color-mute)]"
                >
                  {tech}
                </span>
              ))}
            </dd>
          </>
        )}
      </dl>
    </>
  );

  const cardClass =
    "relative overflow-hidden block h-full p-8 rounded-[var(--radius-soft)] bg-[color:var(--color-surface)] border border-[color:var(--color-line)] hover:border-[color:var(--color-solar-gold)] transition-all duration-[var(--duration-medium)] ease-[var(--ease-out-quint)] group";

  if (v.href) {
    return (
      <Link
        href={v.href as never}
        target={v.external ? "_blank" : undefined}
        rel={v.external ? "noopener noreferrer" : undefined}
        className={cardClass}
      >
        {inner}
      </Link>
    );
  }

  return <div className={cardClass}>{inner}</div>;
}

export function Projects() {
  return (
    <section id="projects" className="py-24 md:py-32 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionReveal>
          <NsibidiGlyph variant="cross" size={16} animate />
          <SectionIndex current={3} total={6} label="Builds" bearing="072°" />
          <h2 className="mt-6 font-display text-3xl md:text-5xl text-[color:var(--color-warm-off-white)]">
            Ten live.{" "}
            <span className="text-[color:var(--color-solar-gold)]">Six in build.</span>
          </h2>
          <p className="mt-4 text-base text-[color:var(--color-mute)] max-w-[52ch]">
            I am not talking about what I might build. This is what is already
            running, and what is being built right now.
          </p>
        </SectionReveal>

        {/* Live builds */}
        <div className="mt-16">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-electric-teal)] flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full animate-ping-dot" style={{ background: "var(--color-electric-teal)" }} />
            Live
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {live.map((v, idx) => (
              <SectionReveal key={v.slug} delay={idx * 0.04}>
                <VentureCard v={v} idx={idx} />
              </SectionReveal>
            ))}
          </div>
        </div>

        {/* In build */}
        <div className="mt-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-solar-gold)] flex items-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: "var(--color-solar-gold)" }} />
            In build
          </p>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            {inBuild.map((v, idx) => (
              <SectionReveal key={v.slug} delay={idx * 0.04}>
                <VentureCard v={v} idx={idx} />
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
