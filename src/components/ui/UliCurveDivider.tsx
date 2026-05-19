"use client";

import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface UliCurveDividerProps {
  className?: string;
}

export function UliCurveDivider({ className }: UliCurveDividerProps) {
  const reduceMotion = useReducedMotion();

  // Ball travels left → right → left along the wave, y follows the curve
  // Path: M 8 12 Q 80 2, 160 12 T 320 12 Q 360 18, 392 12
  const xFrames = [8,  80,  160, 240, 320, 360, 392, 360, 320, 240, 160, 80,  8  ];
  const yFrames = [12,  2,   12,  22,  12,  18,  12,  18,  12,  22,  12,  2,  12 ];

  return (
    <div
      className={cn("w-full flex justify-center my-16", className)}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 400 24"
        width={400}
        height={24}
        className="max-w-full opacity-70"
      >
        <path
          d="M 8 12 Q 80 2, 160 12 T 320 12 Q 360 18, 392 12"
          fill="none"
          stroke="var(--color-solar-gold)"
          strokeWidth={1.2}
          strokeLinecap="round"
        />

        {reduceMotion ? (
          <circle cx={200} cy={12} r={2.5} fill="var(--color-solar-gold)" />
        ) : (
          <motion.circle
            r={2.5}
            fill="var(--color-solar-gold)"
            animate={{ cx: xFrames, cy: yFrames }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
              times: [0, 0.1, 0.2, 0.3, 0.43, 0.5, 0.57, 0.64, 0.72, 0.8, 0.88, 0.94, 1],
            }}
          />
        )}
      </svg>
    </div>
  );
}
