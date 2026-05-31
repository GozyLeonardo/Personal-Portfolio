"use client";

import { useEffect, useState } from "react";
import { animate } from "motion/react";

interface ScoreAnimationProps {
  score: number;
  max?: number;
  onComplete?: () => void;
}

/**
 * Counts up from 0 to the final score over 1.5s. Respects prefers-reduced-motion.
 */
export function ScoreAnimation({ score, max = 56, onComplete }: ScoreAnimationProps) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(score);
      onComplete?.();
      return;
    }

    const controls = animate(0, score, {
      duration: 1.5,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
      onComplete: () => onComplete?.(),
    });
    return () => controls.stop();
    // onComplete intentionally excluded — fires once per score.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [score]);

  return (
    <div className="flex items-baseline justify-center gap-2">
      <span className="font-display text-7xl md:text-8xl leading-none text-[color:var(--color-solar-gold)] tabular-nums">
        {display}
      </span>
      <span className="font-mono text-xl text-[color:var(--color-mute)]">/ {max}</span>
    </div>
  );
}
