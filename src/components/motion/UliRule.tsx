"use client";

import { useRef, useEffect } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "motion/react";

export function UliRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !isInView) return;
    void (async () => {
      await controls.start("reveal");
      controls.start("ambient");
    })();
  }, [isInView, reduceMotion, controls]);

  if (reduceMotion) {
    return <hr className={`uli-rule${className ? ` ${className}` : ""}`} />;
  }

  return (
    <motion.div
      ref={ref}
      role="separator"
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      animate={controls}
      variants={{
        reveal: {
          scaleX: 1,
          transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
        },
        ambient: {
          opacity: [1, 0.55, 1],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        },
      }}
      style={{
        originX: 0,
        height: "1px",
        border: 0,
        background:
          "linear-gradient(to right, transparent 0%, color-mix(in oklab, var(--color-solar-gold) 60%, transparent) 50%, transparent 100%)",
        margin: "4rem 0",
      }}
      className={className}
    />
  );
}
