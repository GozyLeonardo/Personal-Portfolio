import type { BandKey, QuizResults, SectionKey, SectionScore } from "./types";

/**
 * Pure scoring logic. No React, no side effects — testable in isolation.
 * Source spec: AI-READINESS-DIAGNOSTIC-SPEC.md §2.1 / §8.3
 */

const SECTION_INDICES: Record<SectionKey, number[]> = {
  business: [0, 1, 2, 3, 4],
  aiSkills: [5, 6, 7, 8, 9],
  readiness: [10, 11, 12, 13],
};

const SECTION_BOUNDS: Record<SectionKey, { min: number; max: number }> = {
  business: { min: 5, max: 20 },
  aiSkills: { min: 5, max: 20 },
  readiness: { min: 4, max: 16 },
};

function bandFor(totalScore: number): { band: BandKey; label: string } {
  if (totalScore <= 24) return { band: "explorer", label: "Explorer" };
  if (totalScore <= 35) return { band: "builder", label: "Builder" };
  if (totalScore <= 46) return { band: "operator", label: "Operator" };
  return { band: "architect", label: "Architect" };
}

function sectionScore(section: SectionKey, answers: Record<number, number>): SectionScore {
  const { min, max } = SECTION_BOUNDS[section];
  const raw = SECTION_INDICES[section].reduce((sum, i) => sum + (answers[i] || 0), 0);
  const percentage = Math.round(((raw - min) / (max - min)) * 100);
  return { raw, min, max, percentage };
}

export function calculateResults(answers: Record<number, number>): QuizResults {
  const totalScore = Object.values(answers).reduce((sum, s) => sum + s, 0);

  const sectionScores = {
    business: sectionScore("business", answers),
    aiSkills: sectionScore("aiSkills", answers),
    readiness: sectionScore("readiness", answers),
  };

  const { band, label } = bandFor(totalScore);

  // Weakest section by percentage. Ties resolve to the first in section order.
  const ordered: [SectionKey, SectionScore][] = [
    ["business", sectionScores.business],
    ["aiSkills", sectionScores.aiSkills],
    ["readiness", sectionScores.readiness],
  ];
  const weakestSection = ordered.reduce((min, curr) =>
    curr[1].percentage < min[1].percentage ? curr : min,
  )[0];

  return {
    totalScore,
    band,
    bandLabel: label,
    sectionScores,
    weakestSection,
  };
}
