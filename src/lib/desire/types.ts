export interface LimitingBelief {
  belief: string;
  replacement: string;
}

export interface Ikigai {
  love: string;
  goodAt: string;
  worldNeeds: string;
  sustains: string;
}

export interface Shadow {
  hiddenDesires: string[];
  gold: string;
}

export interface DreamLife {
  home: string;
  work: string;
  body: string;
  family: string;
  travel: string;
  network: string;
}

export interface SoulBlueprint {
  name: string;
  essence: string;

  storyThusFar: string;
  wound: string;
  gift: string;
  turningPoint: string;

  admires: string;
  judges: string;
  envies: string;
  trueNorth: string;

  coreFeelings: string[];

  authenticValues: string[];
  inheritedValues: string[];

  shadow: Shadow;

  dreamLife: DreamLife;

  antivision: string;

  futureSelf: string;

  beliefs: LimitingBelief[];

  mission: string;
  ikigai: Ikigai;

  covenant: {
    commitment: string;
    dailyPractice: string;
  };
}

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
