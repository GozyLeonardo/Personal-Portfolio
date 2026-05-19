"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface NsibidiGlyphProps {
  variant?: "dot" | "cross" | "spiral" | "wave" | "interlace";
  size?: number;
  color?: "gold" | "teal" | "muted";
  className?: string;
  animate?: boolean;
}

// Custom hook: uses a plain HTML span as the intersection target
// (guaranteed to work — IntersectionObserver is always reliable on HTMLElements)
function useVisible() {
  const ref = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -5% 0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

export function NsibidiGlyph({
  variant = "dot",
  size = 16,
  color = "gold",
  className,
  animate = false,
}: NsibidiGlyphProps) {
  const reduceMotion = useReducedMotion();
  const { ref: wrapRef, visible } = useVisible();
  const [ambient, setAmbient] = useState(false);

  const stroke =
    color === "gold"
      ? "var(--color-solar-gold)"
      : color === "teal"
        ? "var(--color-electric-teal)"
        : "var(--color-mute)";

  const ceremonial = color !== "teal";
  const revealDuration = ceremonial ? 1.2 : 0.5;

  useEffect(() => {
    if (!animate || reduceMotion || !visible || ambient) return;
    const t = setTimeout(() => setAmbient(true), (revealDuration + 0.2) * 1000);
    return () => clearTimeout(t);
  }, [animate, reduceMotion, visible, ambient, revealDuration]);

  const svgClass = cn("inline-block shrink-0", className);

  // Static render
  if (!animate || reduceMotion) {
    const paths: Record<string, ReactNode> = {
      dot: <circle cx={12} cy={12} r={4} fill={stroke} />,
      cross: (
        <>
          <line x1={4} y1={12} x2={20} y2={12} stroke={stroke} strokeWidth={1.5} />
          <line x1={12} y1={4} x2={12} y2={20} stroke={stroke} strokeWidth={1.5} />
          <circle cx={12} cy={12} r={2} fill={stroke} />
        </>
      ),
      spiral: (
        <path
          d="M 12 12 m -6 0 a 6 6 0 1 1 12 0 a 4 4 0 1 1 -8 0 a 2 2 0 1 1 4 0"
          fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round"
        />
      ),
      wave: (
        <path
          d="M 3 12 Q 7.5 6, 12 12 T 21 12"
          fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round"
        />
      ),
      interlace: (
        <>
          <circle cx={9} cy={12} r={5} fill="none" stroke={stroke} strokeWidth={1.2} />
          <circle cx={15} cy={12} r={5} fill="none" stroke={stroke} strokeWidth={1.2} />
        </>
      ),
    };
    return (
      <svg viewBox="0 0 24 24" width={size} height={size} className={svgClass} aria-hidden="true">
        {paths[variant]}
      </svg>
    );
  }

  // Animated render — span wrapper is the IntersectionObserver target
  const wrapStyle: React.CSSProperties = { display: "inline-flex", alignItems: "center" };

  if (variant === "dot") {
    return (
      <span ref={wrapRef} style={wrapStyle}>
        <svg viewBox="0 0 24 24" width={size} height={size} className={svgClass} aria-hidden="true">
          <motion.circle
            cx={12} cy={12} r={4} fill={stroke}
            style={{ originX: "12px", originY: "12px", transformBox: "fill-box" }}
            initial={{ scale: 0 }}
            animate={
              ambient
                ? { scale: 1, opacity: [1, 0.55, 1] }
                : visible
                  ? { scale: 1 }
                  : { scale: 0 }
            }
            transition={
              ambient
                ? { duration: 3, repeat: Infinity, ease: "easeInOut" }
                : { type: "spring", stiffness: 200, damping: 20 }
            }
          />
        </svg>
      </span>
    );
  }

  if (variant === "cross") {
    return (
      <span ref={wrapRef} style={wrapStyle}>
        <motion.svg
          viewBox="0 0 24 24" width={size} height={size} className={svgClass} aria-hidden="true"
          style={{ originX: "12px", originY: "12px", transformBox: "fill-box" }}
          animate={ambient ? { rotate: 360 } : { rotate: 0 }}
          transition={ambient ? { duration: 20, repeat: Infinity, ease: "linear" } : {}}
        >
          <motion.line
            x1={4} y1={12} x2={20} y2={12} stroke={stroke} strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visible ? 1 : 0 }}
            transition={{ duration: revealDuration, ease: "easeOut" }}
          />
          <motion.line
            x1={12} y1={4} x2={12} y2={20} stroke={stroke} strokeWidth={1.5}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visible ? 1 : 0 }}
            transition={{ duration: revealDuration, ease: "easeOut", delay: 0.2 }}
          />
          <motion.circle
            cx={12} cy={12} r={2} fill={stroke}
            style={{ originX: "12px", originY: "12px", transformBox: "fill-box" }}
            initial={{ scale: 0 }}
            animate={{ scale: visible ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut", delay: revealDuration * 0.7 }}
          />
        </motion.svg>
      </span>
    );
  }

  if (variant === "spiral") {
    return (
      <span ref={wrapRef} style={wrapStyle}>
        <motion.svg
          viewBox="0 0 24 24" width={size} height={size} className={svgClass} aria-hidden="true"
          style={{ originX: "12px", originY: "12px", transformBox: "fill-box" }}
          animate={ambient ? { rotate: 360 } : { rotate: 0 }}
          transition={ambient ? { duration: 12, repeat: Infinity, ease: "linear" } : {}}
        >
          <motion.path
            d="M 12 12 m -6 0 a 6 6 0 1 1 12 0 a 4 4 0 1 1 -8 0 a 2 2 0 1 1 4 0"
            fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visible ? 1 : 0 }}
            transition={{ duration: revealDuration, ease: "easeOut" }}
          />
        </motion.svg>
      </span>
    );
  }

  if (variant === "wave") {
    return (
      <span ref={wrapRef} style={wrapStyle}>
        <motion.svg
          viewBox="0 0 24 24" width={size} height={size} className={svgClass} aria-hidden="true"
          animate={ambient ? { x: [0, -2, 2, 0] } : { x: 0 }}
          transition={ambient ? { duration: 3, repeat: Infinity, ease: "easeInOut" } : {}}
        >
          <motion.path
            d="M 3 12 Q 7.5 6, 12 12 T 21 12"
            fill="none" stroke={stroke} strokeWidth={1.5} strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: visible ? 1 : 0 }}
            transition={{ duration: revealDuration, ease: "easeOut" }}
          />
        </motion.svg>
      </span>
    );
  }

  // interlace
  return (
    <span ref={wrapRef} style={wrapStyle}>
      <svg viewBox="0 0 24 24" width={size} height={size} className={svgClass} aria-hidden="true">
        <motion.circle
          cx={9} cy={12} r={5} fill="none" stroke={stroke} strokeWidth={1.2}
          style={{ originX: "9px", originY: "12px", transformBox: "fill-box" }}
          initial={{ opacity: 0 }}
          animate={
            ambient
              ? { opacity: 1, rotate: 360 }
              : visible
                ? { opacity: 1 }
                : { opacity: 0 }
          }
          transition={
            ambient
              ? { duration: 16, repeat: Infinity, ease: "linear" }
              : { duration: revealDuration, ease: "easeOut" }
          }
        />
        <motion.circle
          cx={15} cy={12} r={5} fill="none" stroke={stroke} strokeWidth={1.2}
          style={{ originX: "15px", originY: "12px", transformBox: "fill-box" }}
          initial={{ opacity: 0 }}
          animate={
            ambient
              ? { opacity: 1, rotate: -360 }
              : visible
                ? { opacity: 1 }
                : { opacity: 0 }
          }
          transition={
            ambient
              ? { duration: 16, repeat: Infinity, ease: "linear" }
              : { duration: revealDuration, ease: "easeOut", delay: 0.3 }
          }
        />
      </svg>
    </span>
  );
}
