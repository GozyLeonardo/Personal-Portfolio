"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

export function UliRule({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [ambient, setAmbient] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion || !isInView || ambient) return;
    const t = setTimeout(() => setAmbient(true), 1550);
    return () => clearTimeout(t);
  }, [isInView, reduceMotion, ambient]);

  if (reduceMotion) {
    return <hr className={`uli-rule${className ? ` ${className}` : ""}`} />;
  }

  return (
    <motion.div
      ref={ref}
      role="separator"
      aria-hidden="true"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: "0px" }}
      animate={ambient ? { scaleX: 1, opacity: [1, 0.55, 1] } : undefined}
      transition={
        ambient
          ? { duration: 4, repeat: Infinity, ease: "easeInOut" }
          : { duration: 1.4, ease: [0.22, 1, 0.36, 1] }
      }
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
