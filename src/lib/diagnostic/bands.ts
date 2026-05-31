import type { BandKey, SectionKey } from "./types";

/**
 * Product links. The Blueprint is live on Whop. The Challenge link is a
 * placeholder until the product is listed (spec §4, Priority 4).
 * Override at build time with NEXT_PUBLIC_* env vars when the Challenge ships.
 */
export const BLUEPRINT_URL =
  process.env.NEXT_PUBLIC_BLUEPRINT_URL ??
  "https://whop.com/checkout/plan_Q0zbd6BwsNFom";

// TODO(P4): replace once the 14-Day Challenge plan is created on Whop.
export const CHALLENGE_URL =
  process.env.NEXT_PUBLIC_CHALLENGE_URL ?? "https://whop.com/lawrence-nwuzor";

export const SERVICES_URL = "https://lawrencenwuzor.com/services";

export interface BandCTA {
  primaryLabel: string;
  primaryHref: string;
  primaryProduct: string;
  secondaryText?: string;
  secondaryHref?: string;
  secondaryProduct?: string;
}

export interface BandContent {
  key: BandKey;
  label: string;
  range: string;
  headline: string;
  description: string;
  /** Per-section interpretation shown for the weakest section callout. */
  sectionInterpretation: Record<SectionKey, string>;
  recommendedNextStep: string;
  /** One-paragraph focus recommendation — used in Email 1. */
  focus: string;
  cta: BandCTA;
}

export const BANDS: Record<BandKey, BandContent> = {
  explorer: {
    key: "explorer",
    label: "Explorer",
    range: "14–24",
    headline: "You're at the starting line. That's not a problem — it's a position.",
    description:
      "Your score says you're early. You haven't locked in a buyer, you haven't built with AI tools beyond casual use, and your business model is still forming. None of that is fatal. What kills people at this stage is spending 6 months \"learning AI\" without picking a direction. The single highest-leverage thing you can do right now: pick ONE problem that ONE type of person has, and figure out if AI can solve it. Not \"learn everything about AI.\" Not \"build a portfolio.\" Find one problem, one buyer, one solution.",
    sectionInterpretation: {
      business:
        "Your biggest gap is business fundamentals, not AI skills. AI is a tool — it needs a business to serve.",
      aiSkills:
        "You need structured exposure to AI tools and automation logic. Start with no-code (Make/Zapier) before anything custom.",
      readiness:
        "Time, budget, or persistence is a constraint. Be honest about whether this is the right season to build.",
    },
    recommendedNextStep:
      "Start with the AI Operations Blueprint ($29) — it gives you the mental model for how AI automation businesses actually work, so you stop chasing tutorials and start building with direction.",
    focus:
      'Before you touch any AI tool, answer this question on paper: "Who has a problem that costs them time or money every week, and how would I find them?" Everything else — the tools, the skills, the automations — comes after you answer that. Without a buyer and a problem, AI knowledge is trivia.',
    cta: {
      primaryLabel: "Get the Blueprint — $29",
      primaryHref: BLUEPRINT_URL,
      primaryProduct: "blueprint",
    },
  },
  builder: {
    key: "builder",
    label: "Builder",
    range: "25–35",
    headline: "You have pieces. They need assembly.",
    description:
      "You're not starting from zero. You use AI tools, you have some sense of who you'd serve, and you're willing to put in time. The gap: you haven't connected these pieces into something someone can buy. You might be stuck in \"learning mode\" — consuming courses, watching YouTube, experimenting with tools — without ever putting an offer in front of a real person. The shift from Builder to Operator happens when you stop asking \"what should I build?\" and start asking \"who will pay me this week, and for what?\"",
    sectionInterpretation: {
      business:
        "You have a direction but it's fuzzy. Sharpen: who specifically, what specifically, at what price.",
      aiSkills:
        "You can use AI tools but haven't built anything end-to-end. Your next move is building a complete workflow — input to output, with error handling.",
      readiness:
        "You have time but may lack structure. A 14-day sprint with accountability will outperform 3 months of self-paced learning.",
    },
    recommendedNextStep:
      "The 14-Day AI Automation Challenge ($49-99) is built for your exact position. You'll go from \"I could probably build something\" to \"I built it, delivered it, and got paid\" in two weeks.",
    focus:
      'Pick one person in your network who runs a business. Ask them: "What\'s the most annoying repetitive task in your week?" Don\'t pitch anything. Just listen. If you can hear a task that AI could handle, you\'ve found your first project. Stop building in the dark.',
    cta: {
      primaryLabel: "Join the 14-Day Challenge",
      primaryHref: CHALLENGE_URL,
      primaryProduct: "challenge",
      secondaryText: "Or start with the Blueprint — $29",
      secondaryHref: BLUEPRINT_URL,
      secondaryProduct: "blueprint",
    },
  },
  operator: {
    key: "operator",
    label: "Operator",
    range: "36–46",
    headline: "You're close. The bottleneck isn't knowledge — it's execution speed.",
    description:
      "You have business fundamentals. You can build with AI tools. You know who you'd serve. You might already have revenue from freelancing, consulting, or a different business. Your gap is systemizing: turning what you can do manually into something repeatable and scalable. You're probably spending too much time on custom work and not enough time on productizing. The jump from Operator to Architect means building systems that run without you touching every piece.",
    sectionInterpretation: {
      business:
        "Your business model works but may not scale. Look at where you're trading hours for dollars and whether AI can break that constraint.",
      aiSkills:
        "You build functional things. Now build reliable things — error handling, edge cases, monitoring.",
      readiness:
        "You execute but may lack a forcing function. Deadlines and accountability structures accelerate output 3-5x.",
    },
    recommendedNextStep:
      "Start with the AI Operations Blueprint ($29) to get the systemization framework, then use the 14-Day Challenge to build your first productized offer. You have the skills — you need the packaging.",
    focus:
      'Your next dollar isn\'t in learning more. It\'s in packaging what you already know into a fixed-scope offer with a price tag. Write this down: "I help [type of person] do [specific thing] using AI, in [timeframe], for [$price]." If you can\'t fill in every blank, that\'s your homework.',
    cta: {
      primaryLabel: "Get the Blueprint — $29",
      primaryHref: BLUEPRINT_URL,
      primaryProduct: "blueprint",
      secondaryText: "Ready to build? Join the 14-Day Challenge",
      secondaryHref: CHALLENGE_URL,
      secondaryProduct: "challenge",
    },
  },
  architect: {
    key: "architect",
    label: "Architect",
    range: "47–56",
    headline: "You don't need a course. You need a launchpad.",
    description:
      "You scored high across all three dimensions. You understand business, you build with AI, and you have the time and capital to execute. If you haven't shipped a paid AI product or service yet, the only thing stopping you is that you haven't started selling. Not learning — selling. Your biggest risk at this level is over-engineering: building a beautiful system nobody asked for. The fastest path to revenue: take your strongest AI skill, find a business that needs it this week, and charge for it.",
    sectionInterpretation: {
      business: "You know your market. Execute before your window closes.",
      aiSkills:
        "You can build. Ship something imperfect this week rather than something perfect next month.",
      readiness: "All systems go. The only metric that matters now is revenue.",
    },
    recommendedNextStep:
      "The 14-Day Challenge ($49-99) will give you the structure to go from \"ready\" to \"shipped and paid\" with accountability. Or skip straight to building — you already have what you need.",
    focus:
      "You don't need more preparation. Open a blank doc and write the outreach message you'd send to your first 5 prospects. Not a hypothetical — actual names, actual companies, actual problems you've noticed. Send it today. The gap between you and revenue is measured in sends, not skills.",
    cta: {
      primaryLabel: "Join the 14-Day Challenge",
      primaryHref: CHALLENGE_URL,
      primaryProduct: "challenge",
      secondaryText: "Or start building — you already have what you need",
      secondaryHref: SERVICES_URL,
      secondaryProduct: "services",
    },
  },
};
