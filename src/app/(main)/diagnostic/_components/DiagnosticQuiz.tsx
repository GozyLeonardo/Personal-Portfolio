"use client";

import { useCallback, useReducer } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { QuizResults, QuizStep } from "@/lib/diagnostic/types";
import { QUESTIONS, TOTAL_QUESTIONS } from "@/lib/diagnostic/questions";
import { calculateResults } from "@/lib/diagnostic/scoring";
import { track } from "@/lib/diagnostic/track";
import { QuizIntro } from "./QuizIntro";
import { QuizProgress } from "./QuizProgress";
import { QuizQuestion } from "./QuizQuestion";
import { EmailCapture } from "./EmailCapture";
import { ResultsPage } from "./ResultsPage";

interface State {
  step: QuizStep;
  currentQuestion: number;
  answers: Record<number, number>;
  email: string;
  isSubmitting: boolean;
  error: string | null;
  results: QuizResults | null;
}

const INITIAL: State = {
  step: "intro",
  currentQuestion: 0,
  answers: {},
  email: "",
  isSubmitting: false,
  error: null,
  results: null,
};

type Action =
  | { type: "START" }
  | { type: "ANSWER"; index: number; score: number }
  | { type: "NEXT" }
  | { type: "PREV" }
  | { type: "SET_EMAIL"; value: string }
  | { type: "BACK_TO_QUIZ" }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_ERROR"; error: string }
  | { type: "SUBMIT_SUCCESS"; results: QuizResults };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, step: "quiz", currentQuestion: 0 };
    case "ANSWER":
      return { ...state, answers: { ...state.answers, [action.index]: action.score } };
    case "NEXT":
      return state.currentQuestion < TOTAL_QUESTIONS - 1
        ? { ...state, currentQuestion: state.currentQuestion + 1 }
        : { ...state, step: "email" };
    case "PREV":
      return state.currentQuestion > 0
        ? { ...state, currentQuestion: state.currentQuestion - 1 }
        : { ...state, step: "intro" };
    case "SET_EMAIL":
      return { ...state, email: action.value, error: null };
    case "BACK_TO_QUIZ":
      return { ...state, step: "quiz", currentQuestion: TOTAL_QUESTIONS - 1 };
    case "SUBMIT_START":
      return { ...state, isSubmitting: true, error: null };
    case "SUBMIT_ERROR":
      return { ...state, isSubmitting: false, error: action.error };
    case "SUBMIT_SUCCESS":
      return { ...state, isSubmitting: false, step: "results", results: action.results };
    default:
      return state;
  }
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const stepVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};

export function DiagnosticQuiz() {
  const [state, dispatch] = useReducer(reducer, INITIAL);

  const handleStart = useCallback(() => {
    track("diagnostic_started");
    dispatch({ type: "START" });
  }, []);

  const handleAnswer = useCallback(
    (score: number) => {
      const index = state.currentQuestion;
      const question = QUESTIONS[index];
      dispatch({ type: "ANSWER", index, score });

      track("diagnostic_question_answered", {
        question: index + 1,
        section: question.section,
        score,
      });

      // Section completion events (Q4 / Q9 / Q13 are the last in each section).
      const merged = { ...state.answers, [index]: score };
      const isLastInSection = index === 4 || index === 9 || index === 13;
      if (isLastInSection) {
        const indices =
          index === 4 ? [0, 1, 2, 3, 4] : index === 9 ? [5, 6, 7, 8, 9] : [10, 11, 12, 13];
        const sectionScore = indices.reduce((sum, i) => sum + (merged[i] || 0), 0);
        track("diagnostic_section_completed", {
          section: question.section,
          sectionScore,
        });
      }

      // Brief pulse, then auto-advance.
      window.setTimeout(() => dispatch({ type: "NEXT" }), 300);
    },
    [state.currentQuestion, state.answers],
  );

  const handleSubmit = useCallback(async () => {
    const email = state.email.trim();
    if (!EMAIL_RE.test(email)) {
      dispatch({ type: "SUBMIT_ERROR", error: "Enter a valid email address." });
      return;
    }

    dispatch({ type: "SUBMIT_START" });
    const results = calculateResults(state.answers);

    track("diagnostic_email_submitted", {
      band: results.band,
      score: results.totalScore,
    });

    // Fire-and-don't-block: a failed send must never gate the results.
    try {
      await fetch("/api/diagnostic", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers: state.answers,
          totalScore: results.totalScore,
          band: results.band,
          sectionScores: {
            business: results.sectionScores.business.percentage,
            aiSkills: results.sectionScores.aiSkills.percentage,
            readiness: results.sectionScores.readiness.percentage,
          },
          weakestSection: results.weakestSection,
        }),
      });
    } catch {
      /* swallow — results still render */
    }

    dispatch({ type: "SUBMIT_SUCCESS", results });
  }, [state.email, state.answers]);

  return (
    <section className="min-h-[100svh] px-6 pb-24 pt-28 md:px-10 md:pt-32">
      {/* Progress bar lives above the quiz content while answering. */}
      {state.step === "quiz" && (
        <div className="mx-auto mb-10 max-w-2xl">
          <QuizProgress current={state.currentQuestion} total={TOTAL_QUESTIONS} />
        </div>
      )}

      <div className="mx-auto max-w-2xl">
        <AnimatePresence mode="wait">
          {state.step === "intro" && (
            <motion.div
              key="intro"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <QuizIntro onStart={handleStart} />
            </motion.div>
          )}

          {state.step === "quiz" && (
            <motion.div
              key={`q-${state.currentQuestion}`}
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              {state.currentQuestion > 0 && (
                <button
                  type="button"
                  onClick={() => dispatch({ type: "PREV" })}
                  className="mb-6 font-mono text-xs uppercase tracking-[0.14em] text-[color:var(--color-mute)] transition-colors hover:text-[color:var(--color-warm-off-white)]"
                >
                  &larr; Back
                </button>
              )}
              <QuizQuestion
                question={QUESTIONS[state.currentQuestion]}
                selected={state.answers[state.currentQuestion]}
                onSelect={handleAnswer}
              />
            </motion.div>
          )}

          {state.step === "email" && (
            <motion.div
              key="email"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <EmailCapture
                email={state.email}
                isSubmitting={state.isSubmitting}
                error={state.error}
                onEmailChange={(value) => dispatch({ type: "SET_EMAIL", value })}
                onSubmit={handleSubmit}
                onBack={() => dispatch({ type: "BACK_TO_QUIZ" })}
              />
            </motion.div>
          )}

          {state.step === "results" && state.results && (
            <motion.div
              key="results"
              variants={stepVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <ResultsPage results={state.results} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
