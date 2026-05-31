"use client";

import type { BandKey } from "@/lib/diagnostic/types";
import { BANDS } from "@/lib/diagnostic/bands";
import { track } from "@/lib/diagnostic/track";

interface CTABlockProps {
  band: BandKey;
  score: number;
}

/**
 * Band-specific call to action. Primary gold button + optional secondary
 * text link. Both open in a new tab and fire diagnostic_cta_clicked.
 */
export function CTABlock({ band, score }: CTABlockProps) {
  const { cta } = BANDS[band];

  function fire(ctaType: "primary" | "secondary", product: string) {
    track("diagnostic_cta_clicked", { band, score, ctaType, product });
  }

  return (
    <div className="flex flex-col items-start gap-4">
      <a
        href={cta.primaryHref}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => fire("primary", cta.primaryProduct)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-soft)] bg-[color:var(--color-solar-gold)] px-6 py-4 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[color:var(--color-foundation)] transition-all duration-[var(--duration-micro)] ease-[var(--ease-out-quint)] hover:translate-y-[-1px] hover:bg-[color:var(--color-solar-gold-soft)] focus-visible:outline-2 focus-visible:outline-[color:var(--color-solar-gold)] focus-visible:outline-offset-4 sm:w-auto"
      >
        {cta.primaryLabel}
      </a>

      {cta.secondaryText && cta.secondaryHref && (
        <a
          href={cta.secondaryHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => fire("secondary", cta.secondaryProduct ?? "")}
          className="text-sm text-[color:var(--color-warm-off-white)] underline decoration-[color:var(--color-line)] underline-offset-4 transition-colors hover:decoration-[color:var(--color-solar-gold)]"
        >
          {cta.secondaryText}
        </a>
      )}
    </div>
  );
}
