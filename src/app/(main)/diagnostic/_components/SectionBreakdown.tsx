"use client";

import { motion } from "motion/react";
import type { QuizResults, SectionKey } from "@/lib/diagnostic/types";
import { SECTION_LABELS } from "@/lib/diagnostic/questions";

interface SectionBreakdownProps {
  results: QuizResults;
  /** Whether bar fill animations should run (gated on score count-up finishing). */
  animate?: boolean;
}

const ORDER: SectionKey[] = ["business", "aiSkills", "readiness"];

/**
 * Three horizontal bars, one per section, animating width 0 → percentage,
 * staggered by 200ms. The weakest section is marked.
 */
export function SectionBreakdown({ results, animate = true }: SectionBreakdownProps) {
  return (
    <div className="flex flex-col gap-5">
      {ORDER.map((key, i) => {
        const section = results.sectionScores[key];
        const isWeakest = results.weakestSection === key;
        return (
          <div key={key}>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em]">
              <span
                className={
                  isWeakest
                    ? "text-[color:var(--color-solar-gold)]"
                    : "text-[color:var(--color-mute)]"
                }
              >
                {SECTION_LABELS[key]}
                {isWeakest && " · biggest gap"}
              </span>
              <span className="text-[color:var(--color-warm-off-white)]">
                {section.percentage}%
              </span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-[color:var(--color-line)]">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: isWeakest
                    ? "var(--color-solar-gold)"
                    : "var(--color-electric-teal)",
                }}
                initial={{ width: 0 }}
                animate={{ width: animate ? `${section.percentage}%` : 0 }}
                transition={{
                  duration: 0.8,
                  delay: animate ? i * 0.2 : 0,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
