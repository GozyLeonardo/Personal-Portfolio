import type { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

/* ============================================================================
   Signal Tools — abuse + budget guard
   Three walls, each cheap, a bot clears none:
   1. Cloudflare Turnstile  — verify a human before any model call (free, no spend)
   2. Per-device per-tool   — 3 free runs per tool, per device (httpOnly cookie, ~forever)
   3. Global lifetime cap   — 800 successful AI calls EVER (~$4 of credits), then upgrade-only
   ========================================================================== */

export const PER_TOOL_DEVICE_LIMIT = 3;
export const GLOBAL_LIFETIME_CAP = 800;
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 10; // ~10 years = "forever"
const LIFETIME_KEY = "signal:tools:lifetime";

const TURNSTILE_VERIFY =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify";
// Cloudflare always-pass TEST secret — used only when no real secret is set (local dev).
const TEST_SECRET = "1x0000000000000000000000000000000AA";

let _redis: Redis | null = null;
function redis(): Redis | null {
  if (_redis) return _redis;
  if (
    !process.env.UPSTASH_REDIS_REST_URL ||
    !process.env.UPSTASH_REDIS_REST_TOKEN
  ) {
    return null; // graceful: skip global cap if Upstash not configured (dev)
  }
  _redis = Redis.fromEnv();
  return _redis;
}

export function getClientIp(req: NextRequest): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function verifyTurnstile(
  token: string | undefined,
  ip: string
): Promise<boolean> {
  if (!token) return false;
  const secret = process.env.TURNSTILE_SECRET_KEY || TEST_SECRET;
  try {
    const res = await fetch(TURNSTILE_VERIFY, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch {
    return false;
  }
}

/** Block private / internal / non-http targets (SSRF guard for First Line). */
export function isSafeHttpUrl(raw: string): boolean {
  let u: URL;
  try {
    u = new URL(raw.startsWith("http") ? raw : "https://" + raw);
  } catch {
    return false;
  }
  if (u.protocol !== "http:" && u.protocol !== "https:") return false;
  const h = u.hostname.toLowerCase();
  if (
    h === "localhost" ||
    h === "0.0.0.0" ||
    h.endsWith(".local") ||
    h.endsWith(".internal")
  ) {
    return false;
  }
  const m = h.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (m) {
    const a = parseInt(m[1], 10);
    const b = parseInt(m[2], 10);
    if (
      a === 10 ||
      a === 127 ||
      (a === 192 && b === 168) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 169 && b === 254)
    ) {
      return false;
    }
  }
  if (h.includes(":")) {
    if (h === "::1" || h.startsWith("fe80") || h.startsWith("fc") || h.startsWith("fd")) {
      return false;
    }
  }
  return true;
}

export type GateResult =
  | { ok: true; remaining: number; commit: (res: NextResponse) => void }
  | { ok: false; status: number; error: string; limitReached?: boolean };

/**
 * Run BEFORE the model call. On ok, call `gate.commit(response)` AFTER a
 * successful generation to persist the device count + increment the global counter.
 * @param tool short slug used as the cookie suffix, e.g. "fl", "rp"
 */
export async function gate(
  req: NextRequest,
  tool: string,
  turnstileToken?: string
): Promise<GateResult> {
  const ip = getClientIp(req);

  // 1. human check
  if (!(await verifyTurnstile(turnstileToken, ip))) {
    return { ok: false, status: 403, error: "Verification failed. Refresh and try again." };
  }

  // 2. global lifetime budget cap
  const r = redis();
  if (r) {
    const used = (await r.get<number>(LIFETIME_KEY)) ?? 0;
    if (used >= GLOBAL_LIFETIME_CAP) {
      return { ok: false, status: 429, error: "Free capacity reached.", limitReached: true };
    }
  }

  // 3. per-device per-tool cap (cookie)
  const cookieName = `st_${tool}`;
  const current = parseInt(req.cookies.get(cookieName)?.value ?? "0", 10) || 0;
  if (current >= PER_TOOL_DEVICE_LIMIT) {
    return {
      ok: false,
      status: 429,
      error: "You've used your 3 free runs for this tool.",
      limitReached: true,
    };
  }

  return {
    ok: true,
    remaining: PER_TOOL_DEVICE_LIMIT - current - 1,
    commit: (res: NextResponse) => {
      res.cookies.set(cookieName, String(current + 1), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: COOKIE_MAX_AGE,
        path: "/",
      });
      const rr = redis();
      if (rr) void rr.incr(LIFETIME_KEY);
    },
  };
}
