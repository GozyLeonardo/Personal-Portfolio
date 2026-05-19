"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedHairlineProps {
  className?: string;
  delay?: number;
}

export function AnimatedHairline({ className, delay = 0 }: AnimatedHairlineProps) {
  return (
    <motion.div
      className={cn(className)}
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay }}
      style={{
        originX: 0,
        height: "1px",
        background:
          "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--color-solar-gold) 50%, transparent) 25%, color-mix(in oklab, var(--color-solar-gold) 50%, transparent) 75%, transparent 100%)",
      }}
    />
  );
}
