"use client";

import { motion } from "motion/react";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

interface QuizIntroProps {
  onStart: () => void;
}

/**
 * Landing screen for /diagnostic. Sets the frame, then hands off to the quiz.
 */
export function QuizIntro({ onStart }: QuizIntroProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <TerminalLabel>AI Readiness Diagnostic</TerminalLabel>

      <h1 className="mt-6 font-display text-4xl md:text-6xl leading-[1.02] text-[color:var(--color-warm-off-white)]">
        How Ready Are You to{" "}
        <span className="text-[color:var(--color-solar-gold)]">
          Build and Sell AI Automation?
        </span>
      </h1>

      <p className="mt-6 text-lg md:text-xl text-[color:var(--color-warm-off-white)] max-w-[48ch]">
        14 questions. 3 minutes. A score that tells you where you stand — and
        what to do next.
      </p>

      <p className="mt-5 text-base text-[color:var(--color-mute)] max-w-[56ch] leading-relaxed">
        This diagnostic measures three things: how clear your business model is,
        how strong your AI skills are, and whether your circumstances support
        execution. You&apos;ll get a score, a personalized breakdown, and a
        specific recommendation — not a generic &ldquo;you should learn
        more.&rdquo;
      </p>

      <button
        type="button"
        onClick={onStart}
        className="mt-10 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-soft)] bg-[color:var(--color-solar-gold)] px-6 py-4 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[color:var(--color-foundation)] transition-all duration-[var(--duration-micro)] ease-[var(--ease-out-quint)] hover:translate-y-[-1px] hover:bg-[color:var(--color-solar-gold-soft)] focus-visible:outline-2 focus-visible:outline-[color:var(--color-solar-gold)] focus-visible:outline-offset-4 sm:w-auto"
      >
        Start the Diagnostic
      </button>

      <p className="mt-4 font-mono text-xs text-[color:var(--color-mute)]">
        Free. No account needed. Takes about 3 minutes.
      </p>
    </motion.div>
  );
}
