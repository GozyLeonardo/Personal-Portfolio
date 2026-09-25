export const PRIORITIES = ["must", "want", "nice"] as const;
export type Priority = (typeof PRIORITIES)[number];

export interface Desire {
  label: string;
  detail: string;
  priority: Priority;
}

export interface BriefData {
  projectName: string;
  clientName: string;
  contactEmail: string;
  oneLiner: string;
  vision: string;
  audience: string;
  desires: Desire[];
  references: { loves: string; hates: string; inspirations: string };
  constraints: { budget: string; timeline: string; offLimits: string };
  successMetrics: string;
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
