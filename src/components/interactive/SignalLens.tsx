"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { SolarGoldButton } from "@/components/ui/SolarGoldButton";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { TerminalLabel } from "@/components/ui/TerminalLabel";

interface DiagnosticScores {
  performance: number;
  seo: number;
  accessibility: number;
  bestPractices: number;
}

interface DiagnosticIssue {
  severity: "critical" | "warning" | "info";
  category: string;
  title: string;
  detail: string;
}

interface DiagnosticResult {
  url: string;
  timestamp: string;
  scores: DiagnosticScores;
  metrics: {
    fcp: string;
    lcp: string;
    cls: string;
    tbt: string;
    speedIndex: string;
    responseTime: number;
  };
  security: Record<string, boolean>;
  seoDetails: Record<string, boolean | string>;
  issues: DiagnosticIssue[];
  verdict: {
    tier: "signal" | "engine" | "system";
    summary: string;
  };
}

const WA_NUMBER = "2347017303970";

function waLink(tier: string) {
  const msg = `Hi Lawrence, I just ran a Signal Lens diagnostic on my site and it recommended the ${tier} tier. I'd like to discuss fixing the issues found.`;
  return `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`;
}

function ScoreRing({
  score,
  label,
  delay,
}: {
  score: number;
  label: string;
  delay: number;
}) {
  const unavailable = score < 0;
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = unavailable ? circumference : circumference - (score / 100) * circumference;

  const color = unavailable
    ? "var(--color-mute)"
    : score >= 90
      ? "var(--color-electric-teal)"
      : score >= 50
        ? "var(--color-solar-gold)"
        : "#ef4444";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-2"
    >
      <div className="relative w-20 h-20">
        <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
          <circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke="var(--color-line)"
            strokeWidth="4"
          />
          <motion.circle
            cx="40"
            cy="40"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        </svg>
        <motion.span
          className="absolute inset-0 flex items-center justify-center font-mono text-lg"
          style={{ color }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + 0.5 }}
        >
          {unavailable ? "—" : score}
        </motion.span>
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-[color:var(--color-mute)]">
        {label}
      </span>
    </motion.div>
  );
}

function IssueCard({
  issue,
  index,
}: {
  issue: DiagnosticIssue;
  index: number;
}) {
  const severityStyles = {
    critical: {
      border: "border-red-500/30",
      badge: "bg-red-500/20 text-red-400",
      label: "Critical",
    },
    warning: {
      border: "border-[color:var(--color-solar-gold)]/30",
      badge: "bg-[color:var(--color-solar-gold)]/20 text-[color:var(--color-solar-gold)]",
      label: "Warning",
    },
    info: {
      border: "border-[color:var(--color-electric-teal)]/30",
      badge: "bg-[color:var(--color-electric-teal)]/20 text-[color:var(--color-electric-teal)]",
      label: "Info",
    },
  };

  const style = severityStyles[issue.severity];

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        duration: 0.4,
        delay: 0.8 + index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`p-5 rounded-[var(--radius-soft)] border ${style.border} bg-[color:var(--color-surface)]`}
    >
      <div className="flex items-center gap-3 mb-2">
        <span
          className={`px-2 py-0.5 rounded font-mono text-[10px] uppercase tracking-wider ${style.badge}`}
        >
          {style.label}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-mute)]">
          {issue.category}
        </span>
      </div>
      <h4 className="text-base font-headline text-[color:var(--color-warm-off-white)]">
        {issue.title}
      </h4>
      <p className="mt-1.5 text-sm text-[color:var(--color-mute)] leading-relaxed">
        {issue.detail}
      </p>
    </motion.div>
  );
}

function PulsingGlyph() {
  return (
    <motion.div
      animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="flex items-center justify-center"
    >
      <NsibidiGlyph variant="cross" size={32} color="gold" animate />
    </motion.div>
  );
}

export function SignalLens() {
  const [url, setUrl] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState("");
  const resultRef = useRef<HTMLDivElement>(null);

  async function handleDiagnose() {
    if (!url.trim()) return;

    setState("loading");
    setError("");
    setResult(null);

    try {
      const res = await fetch("/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setState("error");
        return;
      }

      setResult(data);
      setState("done");

      setTimeout(() => {
        resultRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 300);
    } catch {
      setError("Network error. Check your connection and try again.");
      setState("error");
    }
  }

  const tierNames = { signal: "Signal", engine: "Engine", system: "System" };
  const securityScore = result
    ? Math.round(
        (Object.values(result.security).filter(Boolean).length /
          Object.values(result.security).length) *
          100
      )
    : 0;

  return (
    <section
      id="signal-lens"
      className="py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--color-line)]"
    >
      <div className="mx-auto max-w-4xl">
        <TerminalLabel>Signal Lens</TerminalLabel>

        <h2 className="mt-6 font-display text-3xl md:text-5xl text-[color:var(--color-warm-off-white)]">
          Don&apos;t take my word for it.{" "}
          <span className="text-[color:var(--color-solar-gold)]">
            Test yours.
          </span>
        </h2>

        <p className="mt-4 text-base text-[color:var(--color-mute)] max-w-[52ch]">
          Paste any URL. Signal Lens runs a full diagnostic — performance,
          security, SEO, mobile-readiness — and tells you exactly what&apos;s
          costing you traffic and trust.
        </p>

        {/* Input */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && state !== "loading") handleDiagnose();
              }}
              placeholder="example.com"
              disabled={state === "loading"}
              className="w-full px-5 py-4 bg-[color:var(--color-surface)] border border-[color:var(--color-line)] rounded-[var(--radius-soft)] text-[color:var(--color-warm-off-white)] font-mono text-sm placeholder:text-[color:var(--color-mute)]/50 focus:outline-none focus:border-[color:var(--color-solar-gold)] transition-colors disabled:opacity-50"
            />
          </div>
          <button
            onClick={handleDiagnose}
            disabled={state === "loading" || !url.trim()}
            className="px-8 py-4 bg-[color:var(--color-solar-gold)] text-[color:var(--color-foundation)] font-mono text-sm uppercase tracking-[0.14em] rounded-[var(--radius-soft)] hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
          >
            {state === "loading" ? "Analyzing..." : "Diagnose"}
          </button>
        </div>

        {/* Loading State */}
        <AnimatePresence>
          {state === "loading" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-12 flex flex-col items-center gap-6 py-16"
            >
              <PulsingGlyph />
              <div className="text-center">
                <p className="font-mono text-sm text-[color:var(--color-solar-gold)]">
                  Reading the signal...
                </p>
                <p className="mt-2 text-xs text-[color:var(--color-mute)]">
                  Running performance, security, and SEO analysis
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Error State */}
        <AnimatePresence>
          {state === "error" && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mt-8 p-5 rounded-[var(--radius-soft)] border border-red-500/30 bg-red-500/5"
            >
              <p className="text-sm text-red-400">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <AnimatePresence>
          {state === "done" && result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="mt-12 space-y-8"
            >
              {/* Scores */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="p-8 rounded-[var(--radius-soft)] border border-[color:var(--color-line)] bg-[color:var(--color-surface)]"
              >
                <div className="flex items-center gap-2 mb-8">
                  <NsibidiGlyph variant="cross" size={14} color="gold" />
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)]">
                    Diagnostic Report
                  </span>
                  <span className="ml-auto font-mono text-[10px] text-[color:var(--color-mute)]">
                    {new URL(result.url).hostname}
                  </span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-6 justify-items-center">
                  <ScoreRing
                    score={result.scores.performance}
                    label="Speed"
                    delay={0}
                  />
                  <ScoreRing
                    score={result.scores.seo}
                    label="SEO"
                    delay={0.1}
                  />
                  <ScoreRing
                    score={result.scores.accessibility}
                    label="Access"
                    delay={0.2}
                  />
                  <ScoreRing
                    score={result.scores.bestPractices}
                    label="Best Prac"
                    delay={0.3}
                  />
                  <ScoreRing
                    score={securityScore}
                    label="Security"
                    delay={0.4}
                  />
                </div>

                {/* Core Web Vitals */}
                <div className="mt-8 pt-6 border-t border-[color:var(--color-line)] grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { label: "First Paint", value: result.metrics.fcp },
                    { label: "Largest Paint", value: result.metrics.lcp },
                    { label: "Layout Shift", value: result.metrics.cls },
                    { label: "Blocking Time", value: result.metrics.tbt },
                  ].map((m) => (
                    <div key={m.label} className="text-center">
                      <p className="font-mono text-lg text-[color:var(--color-warm-off-white)]">
                        {m.value}
                      </p>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-[color:var(--color-mute)]">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Issues */}
              {result.issues.length > 0 && (
                <div>
                  <h3 className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-mute)] mb-4">
                    {result.issues.length} issue
                    {result.issues.length !== 1 ? "s" : ""} found
                  </h3>
                  <div className="space-y-3">
                    {result.issues.map((issue, i) => (
                      <IssueCard
                        key={`${issue.category}-${issue.title}`}
                        issue={issue}
                        index={i}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Verdict */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                className="p-8 rounded-[var(--radius-soft)] border border-[color:var(--color-solar-gold)]/40 bg-[color:var(--color-solar-gold)]/5"
              >
                <div className="flex items-center gap-2 mb-4">
                  <NsibidiGlyph variant="interlace" size={16} color="gold" />
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-solar-gold)]">
                    Verdict
                  </span>
                </div>

                <p className="text-lg text-[color:var(--color-warm-off-white)] leading-relaxed mb-6">
                  {result.verdict.summary}
                </p>

                <div className="flex flex-col sm:flex-row gap-3">
                  <SolarGoldButton
                    href={waLink(tierNames[result.verdict.tier])}
                  >
                    Fix this in 7 days
                  </SolarGoldButton>
                  <button
                    onClick={() => {
                      setState("idle");
                      setUrl("");
                      setResult(null);
                    }}
                    className="px-6 py-3 border border-[color:var(--color-line)] rounded-[var(--radius-soft)] font-mono text-sm text-[color:var(--color-mute)] hover:text-[color:var(--color-warm-off-white)] hover:border-[color:var(--color-warm-off-white)] transition-colors"
                  >
                    Test another site
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
