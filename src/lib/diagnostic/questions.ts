import type { QuizQuestion } from "./types";

/**
 * The 14 diagnostic questions, in order. Index === question.id.
 * Sections: Q0-4 business, Q5-9 aiSkills, Q10-13 readiness.
 * Source spec: AI-READINESS-DIAGNOSTIC-SPEC.md §1.2–1.4
 */
export const QUESTIONS: QuizQuestion[] = [
  {
    id: 0,
    section: "business",
    sectionLabel: "Your Business",
    text: "How do you currently make money (or plan to)?",
    options: [
      { label: "I have a job but no business yet — I want to start something", score: 1 },
      { label: "I freelance or consult, but income is inconsistent", score: 2 },
      { label: "I run a business with regular revenue, looking to add AI services", score: 3 },
      { label: "I already sell digital products or services online with predictable revenue", score: 4 },
    ],
  },
  {
    id: 1,
    section: "business",
    sectionLabel: "Your Business",
    text: "How clear is the problem you want to solve with AI?",
    options: [
      { label: "I know AI is hot but I haven't identified a specific problem yet", score: 1 },
      { label: 'I have a vague idea — something like "automating tasks for businesses"', score: 2 },
      { label: "I can name the specific problem and the type of person who has it", score: 3 },
      { label: "I've talked to at least 3 people who confirmed they'd pay for a solution", score: 4 },
    ],
  },
  {
    id: 2,
    section: "business",
    sectionLabel: "Your Business",
    text: "Who would buy your AI product or service?",
    options: [
      { label: "I'm not sure yet — maybe everyone?", score: 1 },
      { label: 'I have a general audience in mind (e.g., "small businesses" or "marketers")', score: 2 },
      { label: "I can describe my buyer's role, industry, and daily frustration in one sentence", score: 3 },
      { label: "I have a list of specific people or companies I could reach out to today", score: 4 },
    ],
  },
  {
    id: 3,
    section: "business",
    sectionLabel: "Your Business",
    text: "What's your pricing strategy?",
    options: [
      { label: "I haven't thought about pricing yet", score: 1 },
      { label: "I'd probably charge whatever feels reasonable and see what happens", score: 2 },
      { label: "I've researched what competitors charge and have a price range in mind", score: 3 },
      { label: "I've tested a price point with real buyers or have a structured value-to-price framework", score: 4 },
    ],
  },
  {
    id: 4,
    section: "business",
    sectionLabel: "Your Business",
    text: "How are you reaching potential buyers right now?",
    options: [
      { label: "I'm not — I haven't started any outreach or marketing", score: 1 },
      { label: "I post on social media sometimes but don't have a system", score: 2 },
      { label: "I have one working channel (LinkedIn, email, referrals) that brings leads", score: 3 },
      { label: "I have 2+ active channels bringing inbound interest or I do consistent outbound", score: 4 },
    ],
  },
  {
    id: 5,
    section: "aiSkills",
    sectionLabel: "Your AI Skills",
    text: "Which best describes your experience with AI tools (ChatGPT, Claude, Midjourney, etc.)?",
    options: [
      { label: "I've tried them casually — mostly for fun or curiosity", score: 1 },
      { label: "I use them regularly for my own work (writing, research, brainstorming)", score: 2 },
      { label: "I've built at least one workflow or automation that uses AI for a specific task", score: 3 },
      { label: "I've built and delivered AI-powered solutions for other people (clients or users)", score: 4 },
    ],
  },
  {
    id: 6,
    section: "aiSkills",
    sectionLabel: "Your AI Skills",
    text: "Can you connect two apps together using a no-code tool (Zapier, Make, n8n)?",
    options: [
      { label: "I don't know what those tools are", score: 1 },
      { label: "I've heard of them but never set one up", score: 2 },
      { label: 'I\'ve built a basic automation (e.g., "when I get an email, save it to a spreadsheet")', score: 3 },
      { label: "I've built multi-step automations with conditional logic, API calls, or error handling", score: 4 },
    ],
  },
  {
    id: 7,
    section: "aiSkills",
    sectionLabel: "Your AI Skills",
    text: "How comfortable are you with APIs — connecting one system to another?",
    options: [
      { label: "I don't know what an API is", score: 1 },
      { label: "I understand the concept but I've never used one", score: 2 },
      { label: "I've made API calls using no-code tools or followed a tutorial to connect one", score: 3 },
      { label: "I can read API documentation and integrate endpoints on my own", score: 4 },
    ],
  },
  {
    id: 8,
    section: "aiSkills",
    sectionLabel: "Your AI Skills",
    text: "When an AI gives you a wrong or weird output, what do you do?",
    options: [
      { label: "I assume AI just doesn't work for that task and move on", score: 1 },
      { label: "I try rephrasing my request once or twice, then give up", score: 2 },
      { label: "I systematically adjust my prompt — changing context, constraints, or examples", score: 3 },
      { label: "I diagnose why the output failed, test different approaches, and document what works", score: 4 },
    ],
  },
  {
    id: 9,
    section: "aiSkills",
    sectionLabel: "Your AI Skills",
    text: "Have you ever written a system prompt, a prompt chain, or a structured prompt template?",
    options: [
      { label: "I don't know what a system prompt is", score: 1 },
      { label: "I've heard the term but never written one", score: 2 },
      { label: "I've written system prompts and seen how they change output quality", score: 3 },
      { label: "I maintain a library of tested prompts and know how to engineer them for reliability", score: 4 },
    ],
  },
  {
    id: 10,
    section: "readiness",
    sectionLabel: "Your Readiness",
    text: "How many hours per week can you commit to building an AI product or service?",
    options: [
      { label: "Less than 3 hours — I'm stretched thin", score: 1 },
      { label: "3-7 hours — I can carve out some evenings or weekends", score: 2 },
      { label: "8-15 hours — I have a consistent schedule I can protect", score: 3 },
      { label: "15+ hours — this is my primary focus right now", score: 4 },
    ],
  },
  {
    id: 11,
    section: "readiness",
    sectionLabel: "Your Readiness",
    text: "What can you invest in tools, learning, and your first test campaign?",
    options: [
      { label: "$0 — I need to start with only free tools", score: 1 },
      { label: "$10-50/month — I can cover a few subscriptions", score: 2 },
      { label: "$50-200/month — I can invest in tools and some paid learning", score: 3 },
      { label: "$200+/month — I'm ready to invest in infrastructure and growth", score: 4 },
    ],
  },
  {
    id: 12,
    section: "readiness",
    sectionLabel: "Your Readiness",
    text: "What happens when you hit a wall — a tool doesn't work, a client says no, you feel stuck?",
    options: [
      { label: "I usually stop and move to something else", score: 1 },
      { label: "I take a break and come back to it, but sometimes I don't come back", score: 2 },
      { label: "I get frustrated but push through — I search for answers until I find one", score: 3 },
      { label: "I treat blockers as data — I document what failed, adjust the approach, and keep moving", score: 4 },
    ],
  },
  {
    id: 13,
    section: "readiness",
    sectionLabel: "Your Readiness",
    text: "How soon do you want to earn your first dollar from AI?",
    options: [
      { label: "I'm just exploring — no timeline yet", score: 1 },
      { label: "Within 6 months would be nice", score: 2 },
      { label: "Within 30-90 days — I have urgency", score: 3 },
      { label: "Within 14 days — I'm ready to execute and I need the income", score: 4 },
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length;

export const SECTION_LABELS: Record<string, string> = {
  business: "Business Clarity",
  aiSkills: "AI Skill Level",
  readiness: "Execution Readiness",
};
