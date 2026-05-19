import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Uses",
  description: "The tools, hardware, and stack Lawrence Nwuzor builds with from Lagos.",
};

const blocks = [
  {
    title: "Hardware",
    items: ["HP ZBook 15 G3 · Windows 11 · WSL2 Ubuntu", "Wired ethernet over Lagos fiber", "External 27\" 1440p monitor"],
  },
  {
    title: "Editor",
    items: ["VS Code · Windsurf for AI-pair sessions", "Oh-My-Zsh · tmux · ripgrep · fzf", "lazygit for everything git"],
  },
  {
    title: "Stack",
    items: ["Next.js 15 + TypeScript strict + Tailwind v4", "Supabase + PostgreSQL + Edge Functions", "Vercel hosting · Cloudflare DNS · Resend email"],
  },
  {
    title: "AI",
    items: ["Claude (primary) · ChatGPT (cross-check) · Cursor", "Custom prompt arsenal — 200+ Templated prompts", "n8n for automation"],
  },
];

export default function UsesPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Uses</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          Lagos · zero budget ·
          <br />
          <span className="text-[color:var(--color-solar-gold)]">global output.</span>
        </h1>
        <div className="mt-12 space-y-10">
          {blocks.map((block) => (
            <div key={block.title}>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-electric-teal)] mb-3">
                {block.title}
              </p>
              <ul className="space-y-2 text-base text-[color:var(--color-warm-off-white)]">
                {block.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
