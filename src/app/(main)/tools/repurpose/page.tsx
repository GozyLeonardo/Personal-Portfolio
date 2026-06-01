"use client";

import { useRef, useState } from "react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { TurnstileBox } from "../_components/TurnstileBox";
import { UpgradeNudge } from "../_components/UpgradeNudge";
import { ComingSoonPanel } from "../_components/ComingSoonPanel";
import { AI_TOOLS_ENABLED } from "@/lib/tools-config";

interface Post {
  platform: string;
  label: string;
  content: string;
}

export default function RepurposePage() {
  const [input, setInput] = useState("");
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [limitReached, setLimitReached] = useState(false);
  const tsRef = useRef<TurnstileInstance>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (input.trim().length < 50 || !token) return;

    setLoading(true);
    setError("");
    setPosts([]);

    try {
      const res = await fetch("/api/repurpose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: input, turnstileToken: token }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.limitReached) setLimitReached(true);
        else setError(data.error || "Something went wrong");
      } else {
        setPosts(data.posts);
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
            Repurpose
          </h1>
          <p className="text-mute text-lg leading-relaxed">
            Paste a blog post, transcript, or long-form text. Get 6
            platform-ready social posts.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-3xl mx-auto">
          {!AI_TOOLS_ENABLED ? (
            <ComingSoonPanel />
          ) : limitReached ? (
            <UpgradeNudge tool="repurpose" />
          ) : (
            <>
              <form onSubmit={handleSubmit} className="mb-4">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your blog post, video transcript, or any long-form content here..."
                  rows={8}
                  className="w-full bg-surface border border-line rounded-xl px-5 py-4 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm resize-none mb-4"
                />
                <TurnstileBox ref={tsRef} onToken={setToken} />
                <button
                  type="submit"
                  disabled={loading || input.trim().length < 50 || !token}
                  className="w-full bg-solar-gold text-foundation font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Repurposing..."
                    : !token
                    ? "Verifying you're human…"
                    : "Repurpose → 6 Posts"}
                </button>
              </form>

              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-6 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {posts.length > 0 && (
                <div className="space-y-4">
                  {posts.map((post, i) => (
                    <div
                      key={i}
                      className="rounded-xl bg-surface border border-line p-6 transition-colors hover:border-solar-gold/20"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <span className="font-mono text-[10px] text-electric-teal tracking-wider bg-electric-teal/10 px-2 py-1 rounded">
                            {post.label}
                          </span>
                          <p className="text-warm-off-white mt-3 leading-relaxed whitespace-pre-wrap text-sm">
                            {post.content}
                          </p>
                          <p className="text-mute/60 text-xs mt-2 font-mono">
                            {post.content.length} characters
                          </p>
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText(post.content)}
                          className="text-mute hover:text-solar-gold transition-colors shrink-0 mt-1"
                          title="Copy"
                          aria-label="Copy post"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <rect x="9" y="9" width="13" height="13" rx="2" />
                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
