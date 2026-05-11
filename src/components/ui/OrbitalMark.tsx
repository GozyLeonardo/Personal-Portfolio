"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface OrbitalMarkProps {
  size?: number;
  className?: string;
}

/**
 * OrbitalMark — the brand identity mark.
 * Africanfuturist: Igbo-Ukwu-inspired interlocking circles + a single Solar Gold core.
 * Outer ring spins 20s. Inner ring 12s reverse.
 */
export function OrbitalMark({ size = 96, className }: OrbitalMarkProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn("relative inline-block", className)}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 200 200" width={size} height={size}>
        {/* Outer cosmic ring */}
        <motion.g
          animate={reduceMotion ? undefined : { rotate: 360 }}
          transition={
            reduceMotion ? undefined : { duration: 20, ease: "linear", repeat: Infinity }
          }
          style={{ originX: "100px", originY: "100px" }}
        >
          <circle
            cx={100}
            cy={100}
            r={88}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth={1}
          />
          {/* Solar Gold dot — agency marker */}
          <circle cx={100} cy={12} r={4} fill="var(--color-solar-gold)" />
        </motion.g>

        {/* Inner system ring (counter-rotating) */}
        <motion.g
          animate={reduceMotion ? undefined : { rotate: -360 }}
          transition={
            reduceMotion ? undefined : { duration: 12, ease: "linear", repeat: Infinity }
          }
          style={{ originX: "100px", originY: "100px" }}
        >
          <circle
            cx={100}
            cy={100}
            r={62}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth={1}
          />
          {/* Electric Teal dot — system marker */}
          <circle cx={45} cy={122} r={3} fill="var(--color-electric-teal)" />
        </motion.g>

        {/* Core — civilizational center */}
        <circle
          cx={100}
          cy={100}
          r={14}
          fill="var(--color-foundation)"
          stroke="var(--color-solar-gold)"
          strokeWidth={1.5}
        />
        <circle cx={100} cy={100} r={3} fill="var(--color-solar-gold)" />
      </svg>
    </div>
  );
}
