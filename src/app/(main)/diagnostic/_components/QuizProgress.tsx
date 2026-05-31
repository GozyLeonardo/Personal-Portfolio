"use client";

import { motion } from "motion/react";

interface QuizProgressProps {
  current: number; // 0-based index of current question
  total: number;
}

/**
 * Gold progress bar on a dark track. Width animates as the user advances.
 */
export function QuizProgress({ current, total }: QuizProgressProps) {
  const pct = Math.round(((current + 1) / total) * 100);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
        <span>Question {current + 1} of {total}</span>
        <span>{pct}%</span>
      </div>
      <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-[color:var(--color-line)]">
        <motion.div
          className="h-full rounded-full bg-[color:var(--color-solar-gold)]"
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}
