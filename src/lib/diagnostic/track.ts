import posthog from "posthog-js";

/**
 * Thin, safe wrapper around posthog.capture. No-ops on the server and
 * swallows errors so analytics never blocks the quiz flow.
 */
export function track(event: string, props?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  try {
    posthog.capture(event, props);
  } catch {
    /* analytics must never break the experience */
  }
}
