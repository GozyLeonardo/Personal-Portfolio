import type { NextRequest } from "next/server";
import { Redis } from "@upstash/redis";
import {
  GLOBAL_LIFETIME_CAP,
  getClientIp,
  verifyTurnstile,
} from "@/lib/signal-tools";

/* Light abuse gate for The Brief. Unlike the Signal Tools gate, there is no
   per-device run cap — every completed brief is a lead we want. We keep the
   Cloudflare Turnstile human check and the global lifetime cost cap. */

const LIFETIME_KEY = "signal:tools:lifetime";

let _redis: Redis | null = null;
function redis(): Redis | null {
  if (_redis) return _redis;
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null;
  }
  _redis = Redis.fromEnv();
  return _redis;
}

export type BriefGateResult =
  | { ok: true }
  | { ok: false; status: number; error: string };

export async function briefGate(
  req: NextRequest,
  turnstileToken?: string
): Promise<BriefGateResult> {
  const ip = getClientIp(req);

  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return {
      ok: false,
      status: 403,
      error: "Verification failed. Refresh and try again.",
    };
  }

  const r = redis();
  if (r) {
    const used = (await r.get<number>(LIFETIME_KEY)) ?? 0;
    if (used >= GLOBAL_LIFETIME_CAP) {
      return { ok: false, status: 429, error: "Free capacity reached." };
    }
  }

  return { ok: true };
}

export async function bumpLifetime(): Promise<void> {
  const r = redis();
  if (r) void r.incr(LIFETIME_KEY);
}
