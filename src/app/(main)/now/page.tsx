import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

export const metadata: Metadata = {
  title: "Now — What Lawrence Nwuzor Is Building Right Now",
  description:
    "What Lawrence Nwuzor is currently focused on: active projects, current builds, and what's shipping next from Lagos, Nigeria.",
  alternates: { canonical: "/now" },
  openGraph: {
    title: "Now",
    description: "What Lawrence Nwuzor is building right now, from Lagos.",
    url: "https://lawrencenwuzor.com/now",
  },
};

export default function NowPage() {
  return (
    <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
      <div className="mx-auto max-w-3xl">
        <TerminalLabel>Now — November 2026</TerminalLabel>
        <h1 className="mt-6 font-display text-4xl md:text-6xl text-[color:var(--color-warm-off-white)]">
          Currently building.
        </h1>

        <ul className="mt-16 space-y-6 text-lg text-[color:var(--color-warm-off-white)]">
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">01</span>
            <span>
              Moving <strong>client work into owned infrastructure</strong>. The
              model-router is live on Azure&apos;s free tier — one gateway that
              routes to whichever provider answers. The client builds fund the
              infrastructure; the infrastructure becomes the products.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">02</span>
            <span>
              Building <strong>Lagos Corps Connect</strong> — a live build for
              corps members, running now.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">03</span>
            <span>
              Building <strong>The Signal&apos;s four directions</strong>. Personal
              OS is the active build — direction, structure, accountability for
              one person. Trust Infrastructure, Coordination OS, and the
              Direction Engine are being mapped.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">04</span>
            <span>
              Running <strong>eleven live builds</strong> — Benlaz, Sparknexis,
              KUDI, Bodways, Focus Group, Indigent Care, Meskadon, CiasLuxe, The
              Signal, ACIM Life, and Athena. Six more are in progress.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">05</span>
            <span>
              <strong>Chi</strong> is parked — the architecture is locked, and
              the build resumes once the infrastructure spine is stable.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">06</span>
            <span>
              Daily — <strong>A Course in Miracles</strong>. Deep blocks. Running.
              The body and the spirit are infrastructure.
            </span>
          </li>
        </ul>

        <p className="mt-16 text-sm text-[color:var(--color-mute)] italic">
          Last updated November 2026.
        </p>
      </div>
    </section>
  );
}
