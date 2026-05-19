"use client";

import { useRef, useEffect, type ReactNode } from "react";
import { motion, useAnimation, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

interface NsibidiGlyphProps {
  variant?: "dot" | "cross" | "spiral" | "wave" | "interlace";
  size?: number;
  color?: "gold" | "teal" | "muted";
  className?: string;
  animate?: boolean;
}

export function NsibidiGlyph({
  variant = "dot",
  size = 16,
  color = "gold",
  className,
  animate = false,
}: NsibidiGlyphProps) {
  const reduceMotion = useReducedMotion();
  const svgRef = useRef<SVGSVGElement>(null);
  const isInView = useInView(svgRef, { once: true, margin: "-10%" });
  const controls = useAnimation();

  const stroke =
    color === "gold"
      ? "var(--color-solar-gold)"
      : color === "teal"
        ? "var(--color-electric-teal)"
        : "var(--color-mute)";

  const ceremonial = color !== "teal";
  const revealDuration = ceremonial ? 1.2 : 0.5;

  useEffect(() => {
    if (!animate || reduceMotion || !isInView) return;
    void (async () => {
      await controls.start("reveal");
      controls.start("ambient");
    })();
  }, [animate, reduceMotion, isInView, controls]);

  const svgClass = cn("inline-block shrink-0", className);

  // Static render — no animate prop or reduced motion
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
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
        />
      ),
      wave: (
        <path
          d="M 3 12 Q 7.5 6, 12 12 T 21 12"
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
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

  // dot — spring scale in, then opacity pulse
  if (variant === "dot") {
    return (
      <motion.svg ref={svgRef} viewBox="0 0 24 24" width={size} height={size} className={svgClass} aria-hidden="true">
        <motion.circle
          cx={12}
          cy={12}
          r={4}
          fill={stroke}
          initial={{ scale: 0 }}
          animate={controls}
          variants={{
            reveal: { scale: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
            ambient: { opacity: [1, 0.55, 1], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
          }}
          style={{ originX: "12px", originY: "12px" }}
        />
      </motion.svg>
    );
  }

  // cross — lines draw from centre, then slow rotation
  if (variant === "cross") {
    return (
      <motion.svg
        ref={svgRef}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={svgClass}
        aria-hidden="true"
        initial={{ rotate: 0 }}
        animate={controls}
        variants={{
          reveal: { rotate: 0 },
          ambient: { rotate: 360, transition: { duration: 20, repeat: Infinity, ease: "linear" } },
        }}
        style={{ originX: "12px", originY: "12px" }}
      >
        <motion.line
          x1={4} y1={12} x2={20} y2={12} stroke={stroke} strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          animate={controls}
          variants={{
            reveal: { pathLength: 1, transition: { duration: revealDuration, ease: "easeOut" } },
            ambient: { pathLength: 1 },
          }}
        />
        <motion.line
          x1={12} y1={4} x2={12} y2={20} stroke={stroke} strokeWidth={1.5}
          initial={{ pathLength: 0 }}
          animate={controls}
          variants={{
            reveal: { pathLength: 1, transition: { duration: revealDuration, ease: "easeOut", delay: 0.2 } },
            ambient: { pathLength: 1 },
          }}
        />
        <motion.circle
          cx={12} cy={12} r={2} fill={stroke}
          initial={{ scale: 0 }}
          animate={controls}
          variants={{
            reveal: { scale: 1, transition: { duration: 0.3, ease: "easeOut", delay: revealDuration * 0.7 } },
            ambient: { scale: 1 },
          }}
          style={{ originX: "12px", originY: "12px" }}
        />
      </motion.svg>
    );
  }

  // spiral — path traces itself, then rotates
  if (variant === "spiral") {
    return (
      <motion.svg
        ref={svgRef}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={svgClass}
        aria-hidden="true"
        initial={{ rotate: 0 }}
        animate={controls}
        variants={{
          reveal: { rotate: 0 },
          ambient: { rotate: 360, transition: { duration: 12, repeat: Infinity, ease: "linear" } },
        }}
        style={{ originX: "12px", originY: "12px" }}
      >
        <motion.path
          d="M 12 12 m -6 0 a 6 6 0 1 1 12 0 a 4 4 0 1 1 -8 0 a 2 2 0 1 1 4 0"
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={controls}
          variants={{
            reveal: { pathLength: 1, transition: { duration: revealDuration, ease: "easeOut" } },
            ambient: { pathLength: 1 },
          }}
        />
      </motion.svg>
    );
  }

  // wave — path sweeps left-to-right, then oscillates
  if (variant === "wave") {
    return (
      <motion.svg
        ref={svgRef}
        viewBox="0 0 24 24"
        width={size}
        height={size}
        className={svgClass}
        aria-hidden="true"
        initial={{ x: 0 }}
        animate={controls}
        variants={{
          reveal: { x: 0 },
          ambient: { x: [0, -2, 2, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } },
        }}
      >
        <motion.path
          d="M 3 12 Q 7.5 6, 12 12 T 21 12"
          fill="none"
          stroke={stroke}
          strokeWidth={1.5}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={controls}
          variants={{
            reveal: { pathLength: 1, transition: { duration: revealDuration, ease: "easeOut" } },
            ambient: { pathLength: 1 },
          }}
        />
      </motion.svg>
    );
  }

  // interlace — circles stagger in, then counter-rotate
  return (
    <motion.svg ref={svgRef} viewBox="0 0 24 24" width={size} height={size} className={svgClass} aria-hidden="true" animate={controls}>
      <motion.circle
        cx={9} cy={12} r={5} fill="none" stroke={stroke} strokeWidth={1.2}
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          reveal: { opacity: 1, transition: { duration: revealDuration, ease: "easeOut" } },
          ambient: { rotate: 360, opacity: 1, transition: { duration: 16, repeat: Infinity, ease: "linear" } },
        }}
        style={{ originX: "9px", originY: "12px" }}
      />
      <motion.circle
        cx={15} cy={12} r={5} fill="none" stroke={stroke} strokeWidth={1.2}
        initial={{ opacity: 0 }}
        animate={controls}
        variants={{
          reveal: { opacity: 1, transition: { duration: revealDuration, ease: "easeOut", delay: 0.3 } },
          ambient: { rotate: -360, opacity: 1, transition: { duration: 16, repeat: Infinity, ease: "linear" } },
        }}
        style={{ originX: "15px", originY: "12px" }}
      />
    </motion.svg>
  );
}
