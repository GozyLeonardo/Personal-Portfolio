import Link from "next/link";
import { OrbitalMark } from "@/components/ui/OrbitalMark";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";

const linkGroups = [
  {
    title: "Site",
    links: [
      { href: "/projects", label: "Projects" },
      { href: "/writing", label: "Writing" },
      { href: "/empire", label: "Empire" },
      { href: "/uses", label: "Uses" },
    ],
  },
  {
    title: "Off-Site",
    links: [
      { href: "https://github.com/GozyLeonardo", label: "GitHub", external: true },
      { href: "https://x.com/GozyLeonardo", label: "X (Twitter)", external: true },
      { href: "https://benlaz.com", label: "Benlaz", external: true },
      { href: "/press", label: "Press" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-32 border-t border-[color:var(--color-line)]">
      <div className="mx-auto max-w-6xl px-6 md:px-10 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <OrbitalMark size={48} />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-mute)] mt-4">
              Lawrence Nwuzor
            </p>
            <p className="text-sm text-[color:var(--color-mute)] mt-2 max-w-[28ch]">
              Building what shouldn&apos;t work, from where it shouldn&apos;t.
            </p>
          </div>

          {linkGroups.map((group) => (
            <div key={group.title}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)] mb-4 flex items-center gap-2">
                <NsibidiGlyph variant="dot" size={10} />
                {group.title}
              </p>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href as never}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className="text-sm text-[color:var(--color-warm-off-white)] hover:text-[color:var(--color-solar-gold)] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-[color:var(--color-line)] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="font-mono text-xs uppercase tracking-[0.16em] text-[color:var(--color-mute)]">
            © {new Date().getFullYear()} Lawrence Chigozie Nwuzor · Lagos, Nigeria
          </p>
          <p className="font-mono text-xs text-[color:var(--color-mute)]">
            Ala still holds the dead
          </p>
        </div>

        <p className="mt-12 text-center font-mono text-[10px] uppercase tracking-[0.36em] text-[color:var(--color-solar-gold)]">
          — End of Transmission —
        </p>
      </div>
    </footer>
  );
}
