/**
 * AI Readiness Diagnostic — shared types.
 * Source spec: AI-READINESS-DIAGNOSTIC-SPEC.md v1.0
 */

export type SectionKey = "business" | "aiSkills" | "readiness";
export type BandKey = "explorer" | "builder" | "operator" | "architect";
export type QuizStep = "intro" | "quiz" | "email" | "results";

export interface QuizOption {
  label: string;
  score: 1 | 2 | 3 | 4;
}

export interface QuizQuestion {
  id: number; // 0-13
  section: SectionKey;
  sectionLabel: string;
  text: string;
  options: [QuizOption, QuizOption, QuizOption, QuizOption];
}

export interface SectionScore {
  raw: number;
  min: number;
  max: number;
  percentage: number;
}

export interface QuizResults {
  totalScore: number;
  band: BandKey;
  bandLabel: string;
  sectionScores: {
    business: SectionScore;
    aiSkills: SectionScore;
    readiness: SectionScore;
  };
  weakestSection: SectionKey;
}
