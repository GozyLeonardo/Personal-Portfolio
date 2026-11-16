import type { Metadata } from "next";
import Link from "next/link";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";

export const metadata: Metadata = {
  title: "Projects — Software & AI Products Built from Lagos",
  description:
    "What Lawrence Nwuzor has shipped: eleven live builds across commerce, energy, community infrastructure, and AI — plus six in active build. All from Lagos, Nigeria.",
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects | Lawrence Nwuzor",
    description:
      "Eleven live builds and six in active build — commerce, energy, community infrastructure, and AI, from Lagos.",
    url: "https://lawrencenwuzor.com/projects",
  },
};

type Build = {
  name: string;
  tagline: string;
  status: string;
  href?: string;
  glyph: "dot" | "cross" | "spiral" | "wave" | "interlace";
  external?: boolean;
};

const liveBuilds: Build[] = [
  {
    name: "Benlaz",
    tagline: "A living legacy.",
    status: "Live",
    href: "https://benlaz.com",
    glyph: "spiral",
    external: true,
  },
  {
    name: "Sparknexis Energy",
    tagline: "Solar, sold direct from Lagos.",
    status: "Live",
    href: "https://sparknexisenergy.com",
    glyph: "dot",
    external: true,
  },
  {
    name: "KUDI",
    tagline: "Record sales. Know your stock.",
    status: "Live",
    href: "https://kudiapp.com.ng",
    glyph: "spiral",
    external: true,
  },
  {
    name: "Bodways Integrated",
    tagline: "Integrated smart services.",
    status: "Live",
    href: "https://bodways-integrated-ten.vercel.app",
    glyph: "cross",
    external: true,
  },
  {
    name: "Focus Group Limited",
    tagline: "Business services.",
    status: "Live",
    href: "https://focus-group-gozy-leonardos-projects.vercel.app",
    glyph: "wave",
    external: true,
  },
  {
    name: "Indigent Care Foundation",
    tagline: "A foundation's front.",
    status: "Live",
    href: "https://indigentcarefoundation.com",
    glyph: "interlace",
    external: true,
  },
  {
    name: "Meskadon Engineering",
    tagline: "Engineering services.",
    status: "Live",
    href: "https://meskadon-engineering-services-gozy-leonardos-projects.vercel.app",
    glyph: "cross",
    external: true,
  },
  {
    name: "CiasLuxe Events",
    tagline: "Events.",
    status: "Live",
    href: "https://ciasluxe-events.vercel.app",
    glyph: "wave",
    external: true,
  },
  {
    name: "The Signal",
    tagline: "The front of the empire.",
    status: "Live",
    href: "https://the-signal-site-five.vercel.app",
    glyph: "spiral",
    external: true,
  },
  {
    name: "ACIM Life",
    tagline: "A learning environment.",
    status: "Live",
    href: "https://acim-life.vercel.app",
    glyph: "dot",
    external: true,
  },
  {
    name: "Athena",
    tagline: "Autonomous intelligence infrastructure.",
    status: "Live",
    href: "https://athena-nine-tau.vercel.app",
    glyph: "cross",
    external: true,
  },
];

const inBuild: Build[] = [
  {
    name: "Chi",
    tagline: "Life management via WhatsApp.",
    status: "In build",
    href: "/projects/chi",
    glyph: "wave",
  },
  { name: "Alp Solar Nigeria", tagline: "Solar.", status: "In build", glyph: "dot" },
  {
    name: "Bluutech Integrated Services",
    tagline: "Integrated services.",
    status: "In build",
    glyph: "cross",
  },
  { name: "Octovia Pharmacies", tagline: "Pharmacy front.", status: "In build", glyph: "wave" },
  { name: "Pasiey Natural Foods", tagline: "Natural foods.", status: "In build", glyph: "dot" },
  { name: "SheAscends", tagline: "Women's initiative.", status: "In build", glyph: "wave" },
];

function BuildRow({ b }: { b: Build }) {
  const isLive = b.status === "Live";

  const row = (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <NsibidiGlyph variant={b.glyph} size={16} color={isLive ? "teal" : "gold"} animate />
          <h3 className="font-display text-xl text-[color:var(--color-warm-off-white)] group-hover:text-[color:var(--color-solar-gold)] transition-colors">
            {b.name}
          </h3>
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
          {b.status}
        </span>
      </div>
      <p className="mt-2 text-sm text-[color:var(--color-mute)] ml-7">
        {b.tagline}
      </p>
    </>
  );

  const rowClass =
    "block p-6 border border-[color:var(--color-line)] rounded-[var(--radius-soft)] hover:border-[color:var(--color-solar-gold)] transition-colors group";

  if (b.href) {
    return (
      <li>
        <Link
          href={b.href as never}
          target={b.external ? "_blank" : undefined}
          rel={b.external ? "noopener noreferrer" : undefined}
          className={rowClass}
        >
          {row}
        </Link>
      </li>
    );
  }

  return <li className="p-6 border border-[color:var(--color-line)] rounded-[var(--radius-soft)]">{row}</li>;
}

export default function ProjectsPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Projects</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          Eleven live.{" "}
          <span className="text-[color:var(--color-solar-gold)]">Six in build.</span>
        </h1>
        <p className="mt-8 text-lg text-[color:var(--color-mute)]">
          I am not talking about what I might build. This is what is already
          running, and what is being built right now.
        </p>

        <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-electric-teal)] flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full animate-ping-dot"
            style={{ background: "var(--color-electric-teal)" }}
          />
          Live
        </p>
        <ul className="mt-6 space-y-4">
          {liveBuilds.map((b) => (
            <BuildRow key={b.name} b={b} />
          ))}
        </ul>

        <p className="mt-16 font-mono text-[10px] uppercase tracking-[0.22em] text-[color:var(--color-solar-gold)] flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "var(--color-solar-gold)" }}
          />
          In build
        </p>
        <ul className="mt-6 space-y-4">
          {inBuild.map((b) => (
            <BuildRow key={b.name} b={b} />
          ))}
        </ul>
      </div>
    </section>
  );
}
