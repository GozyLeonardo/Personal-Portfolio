"use client";

import { motion } from "motion/react";
import type { QuizQuestion as Question } from "@/lib/diagnostic/types";
import { SectionHeader } from "./SectionHeader";

const SECTION_INDEX: Record<string, number> = {
  business: 1,
  aiSkills: 2,
  readiness: 3,
};

interface QuizQuestionProps {
  question: Question;
  selected: number | undefined; // currently selected score, if answered
  onSelect: (score: number) => void;
}

/**
 * One question with four full-width option cards.
 * Selected option gets a gold border + tint. Tapping fires onSelect.
 */
export function QuizQuestion({ question, selected, onSelect }: QuizQuestionProps) {
  return (
    <div className="w-full">
      <SectionHeader
        label={question.sectionLabel}
        index={SECTION_INDEX[question.section]}
        total={3}
      />

      <h2 className="mt-6 font-headline text-2xl md:text-3xl leading-snug text-[color:var(--color-warm-off-white)]">
        {question.text}
      </h2>

      <div className="mt-8 flex flex-col gap-3">
        {question.options.map((option, i) => {
          const isSelected = selected === option.score;
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => onSelect(option.score)}
              whileTap={{ scale: 0.99 }}
              animate={isSelected ? { scale: [1, 1.02, 1] } : { scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              aria-pressed={isSelected}
              className={[
                "min-h-[56px] w-full rounded-[var(--radius-soft)] border px-5 py-4 text-left",
                "flex items-center gap-4 transition-colors duration-200",
                "focus-visible:outline-2 focus-visible:outline-[color:var(--color-solar-gold)] focus-visible:outline-offset-2",
                isSelected
                  ? "border-[color:var(--color-solar-gold)] bg-[color:color-mix(in_oklab,var(--color-solar-gold)_12%,var(--color-surface))]"
                  : "border-[color:var(--color-line)] bg-[color:var(--color-surface)] hover:border-[color:var(--color-solar-gold-soft)]",
              ].join(" ")}
            >
              <span
                aria-hidden
                className={[
                  "grid h-7 w-7 shrink-0 place-items-center rounded-full border font-mono text-xs",
                  isSelected
                    ? "border-[color:var(--color-solar-gold)] bg-[color:var(--color-solar-gold)] text-[color:var(--color-foundation)]"
                    : "border-[color:var(--color-line)] text-[color:var(--color-mute)]",
                ].join(" ")}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="text-base leading-snug text-[color:var(--color-warm-off-white)]">
                {option.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
