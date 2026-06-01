"use client";

import { useState } from "react";

const CHALLENGE_URL = "https://whop.com/checkout/plan_fk3fy5ikFIt7I";

export function UpgradeNudge({ tool }: { tool: string }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">(
    "idle"
  );

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("saving");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim(), tool }),
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-2xl border border-solar-gold/30 bg-surface p-8 text-center">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-solar-gold mb-3">
        Out of free runs
      </p>
      <h3 className="font-display text-2xl font-bold text-warm-off-white mb-2">
        You&apos;ve used your 3 free runs
      </h3>
      <p className="text-mute text-sm mb-6 max-w-md mx-auto leading-relaxed">
        Want unlimited access? Drop your email and I&apos;ll tell you the moment the
        full version ships — or skip the line and grab the build that teaches you
        to make tools like this.
      </p>

      {status === "done" ? (
        <p className="text-electric-teal text-sm font-mono mb-4">
          You&apos;re on the list. Talk soon.
        </p>
      ) : (
        <form
          onSubmit={submit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-4"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            className="flex-1 bg-foundation border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
          />
          <button
            type="submit"
            disabled={status === "saving" || !email.trim()}
            className="bg-solar-gold text-foundation font-display font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {status === "saving" ? "Saving..." : "Notify me"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-red-400 text-xs mb-4">Couldn&apos;t save — try again.</p>
      )}

      <div className="flex items-center justify-center gap-5 text-xs font-mono pt-2">
        <a
          href={CHALLENGE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-solar-gold hover:underline"
        >
          14-Day Challenge →
        </a>
        <a href="/services" className="text-mute hover:text-warm-off-white transition-colors">
          Work with me →
        </a>
      </div>
    </div>
  );
}
