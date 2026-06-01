"use client";

import { useRef, useState } from "react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { TurnstileBox } from "../_components/TurnstileBox";
import { UpgradeNudge } from "../_components/UpgradeNudge";

export default function FirstLinePage() {
  const [url, setUrl] = useState("");
  const [lines, setLines] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const tsRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!url.trim() || !token) return;

    setLoading(true);
    setError("");
    setLines([]);

    try {
      const res = await fetch("/api/first-line", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), turnstileToken: token }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.limitReached) setLimitReached(true);
        else setError(data.error || "Something went wrong");
      } else {
        setLines(data.lines);
      }
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
      tsRef.current?.reset();
      setToken("");
    }
  }

  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-electric-teal text-xs tracking-[0.3em] uppercase mb-4">
            Free Tool
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-warm-off-white mb-4">
            First Line
          </h1>
          <p className="text-mute text-lg leading-relaxed">
            Enter a prospect&apos;s website. Get 3 personalized cold email openers
            with pain-point hooks.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
          {limitReached ? (
            <UpgradeNudge tool="first-line" />
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="example.com"
                    className="flex-1 bg-surface border border-line rounded-xl px-5 py-4 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors font-mono text-sm"
                  />
                  <button
                    type="submit"
                    disabled={loading || !url.trim() || !token}
                    className="bg-solar-gold text-foundation font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                  >
                    {loading ? "Analyzing..." : "Generate"}
                  </button>
                </div>
              </form>

              <TurnstileBox ref={tsRef} onToken={setToken} />

              {!token && !loading && (
                <p className="text-mute/60 text-xs font-mono mb-4">
                  Verifying you&apos;re human…
                </p>
              )}

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {lines.length > 0 && (
                <div className="space-y-4">
                  {lines.map((line, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-surface border border-line p-6 transition-colors hover:border-solar-gold/20"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="font-mono text-[10px] text-solar-gold/70 tracking-wider">
                            LINE {i + 1}
                          </span>
                          <p className="text-warm-off-white mt-2 leading-relaxed">
                            {line}
                          </p>
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText(line)}
                          className="text-mute hover:text-solar-gold transition-colors shrink-0 mt-1"
                          title="Copy to clipboard"
                          aria-label="Copy line"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <p className="text-center text-mute/70 text-xs font-mono mt-6">
                    Each line references something specific from the prospect&apos;s
                    site. Not a template — a diagnosis.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
