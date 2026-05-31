"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { QuizResults } from "@/lib/diagnostic/types";
import { BANDS } from "@/lib/diagnostic/bands";
import { SECTION_LABELS } from "@/lib/diagnostic/questions";
import { track } from "@/lib/diagnostic/track";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { ScoreAnimation } from "./ScoreAnimation";
import { SectionBreakdown } from "./SectionBreakdown";
import { CTABlock } from "./CTABlock";

interface ResultsPageProps {
  results: QuizResults;
}

const reveal = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
};

/**
 * The payoff screen: animated score → band → section bars → narrative → CTA.
 */
export function ResultsPage({ results }: ResultsPageProps) {
  const band = BANDS[results.band];
  const [countUpDone, setCountUpDone] = useState(false);

  useEffect(() => {
    track("diagnostic_results_viewed", {
      band: results.band,
      score: results.totalScore,
      weakestSection: results.weakestSection,
    });
  }, [results]);

  return (
    <div className="w-full">
      {/* Score */}
      <div className="text-center">
        <TerminalLabel className="justify-center">Your AI Readiness</TerminalLabel>
        <div className="mt-6">
          <ScoreAnimation
            score={results.totalScore}
            onComplete={() => setCountUpDone(true)}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: countUpDone ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="mt-4 font-display text-2xl md:text-3xl text-[color:var(--color-warm-off-white)]"
        >
          {band.label}
        </motion.p>
      </div>

      {/* Headline + description */}
      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.2 }} className="mt-12">
        <h2 className="font-headline text-2xl md:text-3xl leading-snug text-[color:var(--color-warm-off-white)]">
          {band.headline}
        </h2>
        <p className="mt-5 text-base md:text-lg text-[color:var(--color-mute)] leading-relaxed">
          {band.description}
        </p>
      </motion.div>

      {/* Section breakdown */}
      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.35 }}
        className="mt-12 rounded-[var(--radius-soft)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] p-6 md:p-8"
      >
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-electric-teal)]">
          Your breakdown
        </p>
        <div className="mt-6">
          <SectionBreakdown results={results} animate={countUpDone} />
        </div>
      </motion.div>

      {/* Weakest section callout */}
      <motion.div
        {...reveal}
        transition={{ ...reveal.transition, delay: 0.45 }}
        className="mt-8 border-l-2 border-[color:var(--color-solar-gold)] pl-5"
      >
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--color-solar-gold)]">
          Your biggest gap: {SECTION_LABELS[results.weakestSection]}
        </p>
        <p className="mt-3 text-base text-[color:var(--color-warm-off-white)] leading-relaxed">
          {band.sectionInterpretation[results.weakestSection]}
        </p>
      </motion.div>

      {/* Recommended next step + CTA */}
      <motion.div {...reveal} transition={{ ...reveal.transition, delay: 0.55 }} className="mt-12">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-electric-teal)]">
          Your next step
        </p>
        <p className="mt-3 text-base md:text-lg text-[color:var(--color-warm-off-white)] leading-relaxed max-w-[56ch]">
          {band.recommendedNextStep}
        </p>
        <div className="mt-8">
          <CTABlock band={results.band} score={results.totalScore} />
        </div>
      </motion.div>
    </div>
  );
}
