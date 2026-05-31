"use client";

import { motion } from "motion/react";
import type { FormEvent } from "react";

interface EmailCaptureProps {
  email: string;
  isSubmitting: boolean;
  error: string | null;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
  onBack: () => void;
}

/**
 * Email gate. Sits between the last question and the results.
 * Email is required — the value exchange is full results for an address.
 */
export function EmailCapture({
  email,
  isSubmitting,
  error,
  onEmailChange,
  onSubmit,
  onBack,
}: EmailCaptureProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="w-full"
    >
      <button
        type="button"
        onClick={onBack}
        className="mb-8 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--color-mute)] transition-colors hover:text-[color:var(--color-warm-off-white)]"
      >
        &larr; Back
      </button>

      <h2 className="font-display text-3xl md:text-5xl leading-[1.05] text-[color:var(--color-warm-off-white)]">
        Your results are ready.
      </h2>

      <p className="mt-5 text-base md:text-lg text-[color:var(--color-mute)] max-w-[52ch] leading-relaxed">
        Enter your email to see your AI Readiness score, personalized breakdown,
        and the specific next step for your level.
      </p>

      <form onSubmit={handleSubmit} className="mt-8" noValidate>
        <input
          type="email"
          inputMode="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          aria-invalid={!!error}
          className="w-full rounded-[var(--radius-soft)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)] px-5 py-4 text-base text-[color:var(--color-warm-off-white)] placeholder:text-[color:var(--color-mute)] focus:border-[color:var(--color-solar-gold)] focus:outline-none"
        />

        {error && (
          <p className="mt-3 font-mono text-xs text-[color:var(--color-solar-gold)]">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-[var(--radius-soft)] bg-[color:var(--color-solar-gold)] px-6 py-4 font-mono text-sm font-medium uppercase tracking-[0.12em] text-[color:var(--color-foundation)] transition-all duration-[var(--duration-micro)] ease-[var(--ease-out-quint)] hover:translate-y-[-1px] hover:bg-[color:var(--color-solar-gold-soft)] focus-visible:outline-2 focus-visible:outline-[color:var(--color-solar-gold)] focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Calculating…" : "Show My Results"}
        </button>
      </form>

      <p className="mt-4 text-sm text-[color:var(--color-mute)] max-w-[52ch] leading-relaxed">
        Your results + a 3-part email series on getting started. Unsubscribe
        anytime. No spam — I don&apos;t have time for that.
      </p>
    </motion.div>
  );
}
