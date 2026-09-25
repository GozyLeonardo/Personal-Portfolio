// AI-backed tools (The Brief, First Line, Repurpose) stay gated until the
// production env is set (DEEPSEEK_API_KEY + Turnstile). Flip on by setting
// NEXT_PUBLIC_TOOLS_AI_ENABLED=true in Vercel and redeploying.
export const AI_TOOLS_ENABLED =
  process.env.NEXT_PUBLIC_TOOLS_AI_ENABLED === "true";
