"use client";

import { useState } from "react";

export function EmailCapture() {
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
        body: JSON.stringify({
          email: email.trim(),
          tool: "newsletter",
          source: "Site footer",
        }),
      });
      setStatus(r.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 items-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-solar-gold mb-2">
          Stay in signal
        </p>
        <p className="text-sm text-mute max-w-[40ch] leading-relaxed">
          One email when I ship something worth your time — a new tool, a new
          piece of writing. No spam, no noise.
        </p>
      </div>

      {status === "done" ? (
        <p className="text-sm font-mono text-electric-teal md:text-right">
          You&apos;re in. Talk soon.
        </p>
      ) : (
        <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            className="flex-1 bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
          />
          <button
            type="submit"
            disabled={status === "saving" || !email.trim()}
            className="bg-solar-gold text-foundation font-display font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap text-sm"
          >
            {status === "saving" ? "Saving..." : "Keep me posted"}
          </button>
        </form>
      )}
      {status === "error" && (
        <p className="text-xs text-red-400 md:text-right">
          Couldn&apos;t save — try again.
        </p>
      )}
    </div>
  );
}
