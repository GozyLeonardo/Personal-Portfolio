"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { TurnstileBox } from "../_components/TurnstileBox";
import { ComingSoonPanel } from "../_components/ComingSoonPanel";
import { AI_TOOLS_ENABLED } from "@/lib/tools-config";
import type { ChatMessage, SoulBlueprint } from "@/lib/desire/types";

type Phase = "intro" | "interview" | "revealing" | "done";

const LAYERS = [
  "Who you are",
  "Your story",
  "The wound & gift",
  "The compass",
  "The feelings",
  "The shadow",
  "The life you refuse",
  "The essence",
];

function BSection({
  num,
  label,
  children,
}: {
  num: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-5">
      <div className="flex items-baseline mb-1.5">
        <span className="font-mono text-xs text-[color:var(--color-solar-gold)] w-7">
          {num}
        </span>
        <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-[color:var(--color-electric-teal)]">
          {label}
        </span>
      </div>
      {children}
    </div>
  );
}

function BHighlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-1 bg-stone-50 border-l-2 border-[color:var(--color-solar-gold)] px-4 py-3 text-neutral-800">
      {children}
    </div>
  );
}

function BlueprintPreview({ bp }: { bp: SoulBlueprint }) {
  const hasCompass = bp.admires || bp.judges || bp.envies;
  const hasValues = bp.authenticValues.length > 0 || bp.inheritedValues.length > 0;
  const hasDream = Object.values(bp.dreamLife).some(Boolean);
  const hasIkigai = Object.values(bp.ikigai).some(Boolean);

  return (
    <div className="rounded-2xl bg-white border border-stone-200 p-8 md:p-10 text-left shadow-2xl shadow-black/30">
      <div className="mb-8">
        <p className="font-mono text-[11px] tracking-[0.3em] uppercase text-[color:var(--color-solar-gold)]">
          Alchemy of Desire
        </p>
        {bp.name && (
          <h2 className="font-display text-3xl md:text-4xl font-bold text-neutral-900 mt-2">
            {bp.name}
          </h2>
        )}
        {bp.essence && (
          <p className="font-headline text-neutral-700 mt-3 leading-relaxed">
            {bp.essence}
          </p>
        )}
        <div className="h-0.5 w-12 bg-[color:var(--color-solar-gold)] mt-5" />
      </div>

      {bp.storyThusFar && (
        <BSection num="01" label="Story Thus Far">
          <p className="text-neutral-800 leading-relaxed">{bp.storyThusFar}</p>
        </BSection>
      )}

      {(bp.wound || bp.gift) && (
        <BSection num="02" label="The Wound & The Gift">
          {bp.wound && <p className="text-neutral-500">{bp.wound}</p>}
          {bp.gift && <BHighlight>{bp.gift}</BHighlight>}
        </BSection>
      )}

      {bp.turningPoint && (
        <BSection num="03" label="The Turning Point">
          <p className="text-neutral-800 leading-relaxed">{bp.turningPoint}</p>
        </BSection>
      )}

      {hasCompass && (
        <BSection num="04" label="The Compass">
          {bp.admires && <p className="text-neutral-500 text-sm">You admire — {bp.admires}</p>}
          {bp.judges && <p className="text-neutral-500 text-sm">You judge — {bp.judges}</p>}
          {bp.envies && <p className="text-neutral-500 text-sm">You secretly envy — {bp.envies}</p>}
          {bp.trueNorth && <BHighlight>{bp.trueNorth}</BHighlight>}
        </BSection>
      )}

      {bp.coreFeelings.length > 0 && (
        <BSection num="05" label="Core Desired Feelings">
          <div className="flex flex-wrap gap-2">
            {bp.coreFeelings.map((f, i) => (
              <span
                key={i}
                className="font-headline text-sm text-neutral-800 bg-stone-50 rounded px-3 py-1"
              >
                {f}
              </span>
            ))}
          </div>
        </BSection>
      )}

      {hasValues && (
        <BSection num="06" label="Values — Authentic vs. Inherited">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase text-[color:var(--color-solar-gold)] mb-1">
                Truly Yours
              </p>
              {bp.authenticValues.map((v, i) => (
                <p key={i} className="text-neutral-800 text-sm">· {v}</p>
              ))}
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase text-neutral-400 mb-1">
                Inherited
              </p>
              {bp.inheritedValues.map((v, i) => (
                <p key={i} className="text-neutral-500 text-sm">· {v}</p>
              ))}
            </div>
          </div>
        </BSection>
      )}

      {(bp.shadow.hiddenDesires.length > 0 || bp.shadow.gold) && (
        <BSection num="07" label="The Shadow">
          {bp.shadow.hiddenDesires.map((s, i) => (
            <p key={i} className="text-neutral-500 text-sm">· {s}</p>
          ))}
          {bp.shadow.gold && <BHighlight>{bp.shadow.gold}</BHighlight>}
        </BSection>
      )}

      {hasDream && (
        <BSection num="08" label="Dream Life, Interpreted">
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {(
              [
                ["Home", bp.dreamLife.home],
                ["Work", bp.dreamLife.work],
                ["Body", bp.dreamLife.body],
                ["Family", bp.dreamLife.family],
                ["Travel", bp.dreamLife.travel],
                ["Network", bp.dreamLife.network],
              ] as const
            ).map(([label, value]) =>
              value ? (
                <div key={label}>
                  <span className="font-mono text-[11px] uppercase text-[color:var(--color-electric-teal)]">
                    {label}
                  </span>
                  <p className="text-neutral-600 text-sm">{value}</p>
                </div>
              ) : null
            )}
          </div>
        </BSection>
      )}

      {bp.antivision && (
        <BSection num="09" label="The Life You Refuse">
          <p className="text-neutral-500 leading-relaxed">{bp.antivision}</p>
        </BSection>
      )}

      {bp.futureSelf && (
        <BSection num="10" label="Your Future Self">
          <p className="text-neutral-800 leading-relaxed">{bp.futureSelf}</p>
        </BSection>
      )}

      {bp.beliefs.length > 0 && (
        <BSection num="11" label="The Gap to Bridge">
          {bp.beliefs.map((b, i) => (
            <div key={i} className="flex flex-col sm:flex-row sm:gap-3 mb-2">
              <span className="text-neutral-400 line-through text-sm">{b.belief}</span>
              <span className="text-[color:var(--color-solar-gold)]">→</span>
              <span className="text-neutral-800 text-sm">{b.replacement}</span>
            </div>
          ))}
        </BSection>
      )}

      {(bp.mission || hasIkigai) && (
        <BSection num="12" label="Your Mission">
          {bp.mission && (
            <p className="text-neutral-800 leading-relaxed">{bp.mission}</p>
          )}
          {hasIkigai && (
            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2 mt-2">
              {(
                [
                  ["What you love", bp.ikigai.love],
                  ["What you're good at", bp.ikigai.goodAt],
                  ["What the world needs", bp.ikigai.worldNeeds],
                  ["What sustains you", bp.ikigai.sustains],
                ] as const
              ).map(([label, value]) =>
                value ? (
                  <div key={label}>
                    <span className="font-mono text-[11px] uppercase text-[color:var(--color-electric-teal)]">
                      {label}
                    </span>
                    <p className="text-neutral-600 text-sm">{value}</p>
                  </div>
                ) : null
              )}
            </div>
          )}
        </BSection>
      )}

      {(bp.covenant.commitment || bp.covenant.dailyPractice) && (
        <BSection num="13" label="The Covenant">
          <div className="border border-[color:var(--color-solar-gold)] rounded p-5">
            <p className="font-headline font-bold text-[color:var(--color-solar-gold)] mb-2">
              A Binding Agreement with Yourself
            </p>
            {bp.covenant.commitment && (
              <p className="text-neutral-800 leading-relaxed">{bp.covenant.commitment}</p>
            )}
            {bp.covenant.dailyPractice && (
              <p className="text-neutral-500 text-sm mt-3">
                <span className="font-mono uppercase text-[11px] text-neutral-400">
                  Daily practice —{" "}
                </span>
                {bp.covenant.dailyPractice}
              </p>
            )}
          </div>
        </BSection>
      )}
    </div>
  );
}

export default function AlchemyOfDesirePage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [step, setStep] = useState(0);
  const [complete, setComplete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [blueprint, setBlueprint] = useState<SoulBlueprint | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const tsRef = useRef<TurnstileInstance>(null);

  async function handleBegin() {
    setPhase("interview");
    setLoading(true);
    setError("");
    try {
      const seed: ChatMessage[] = [
        { role: "user", content: "I'm ready to begin." },
      ];
      const res = await fetch("/api/desire/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: seed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't start. Try again.");
        setPhase("intro");
      } else if (data.message) {
        setMessages([...seed, { role: "assistant", content: data.message }]);
        setQuestion(data.message);
        if (data.complete) setComplete(true);
      }
    } catch {
      setError("Connection interrupted. Try again.");
      setPhase("intro");
    } finally {
      setLoading(false);
    }
  }

  async function handleContinue() {
    const text = answer.trim();
    if (!text || loading) return;

    const next = [...messages, { role: "user", content: text } as ChatMessage];
    setAnswer("");
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/desire/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Connection interrupted. Try again.");
      } else if (data.message) {
        setMessages([...next, { role: "assistant", content: data.message }]);
        setQuestion(data.message);
        setStep((s) => s + 1);
        if (data.complete) setComplete(true);
      }
    } catch {
      setError("Connection interrupted. Try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleReveal() {
    if (revealing) return;
    setRevealing(true);
    setError("");

    try {
      const res = await fetch("/api/desire/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, name, email, turnstileToken: token }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't reveal your blueprint. Try again.");
        setPhase("interview");
      } else {
        setBlueprint(data.blueprint as SoulBlueprint);
        setPhase("done");
      }
    } catch {
      setError("Connection interrupted. Try again.");
      setPhase("interview");
    } finally {
      setRevealing(false);
      setToken("");
      tsRef.current?.reset();
    }
  }

  async function handleDownload() {
    if (!blueprint || downloading) return;
    setDownloading(true);
    setError("");
    try {
      const res = await fetch("/api/desire/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(blueprint),
      });
      if (!res.ok) throw new Error("pdf failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${(blueprint.name || "soul").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "soul"}-blueprint.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      setError("Couldn't generate the PDF. Try again.");
    } finally {
      setDownloading(false);
    }
  }

  function handleRestart() {
    setPhase("intro");
    setMessages([]);
    setQuestion("");
    setAnswer("");
    setStep(0);
    setComplete(false);
    setBlueprint(null);
    setName("");
    setEmail("");
    setToken("");
    setError("");
  }

  const layerIndex = Math.min(step, LAYERS.length - 1);
  const progress = Math.min((step + 1) / LAYERS.length, 1);

  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-electric-teal text-xs tracking-[0.3em] uppercase mb-4">
            Free Tool
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-warm-off-white mb-4">
            Alchemy of Desire
          </h1>
          <p className="text-mute text-lg leading-relaxed">
            A guided conversation that draws out the desires you never named —
            and hands them back as a Soul Blueprint.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className={blueprint ? "max-w-3xl mx-auto" : "max-w-2xl mx-auto"}>
          {!AI_TOOLS_ENABLED ? (
            <ComingSoonPanel />
          ) : (
            <AnimatePresence mode="wait">
              {phase === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl bg-surface border border-line p-10 text-center"
                >
                  <p className="text-mute text-sm max-w-md mx-auto leading-relaxed">
                    Eight steps. One question each. Go as deep as you let me —
                    and leave with what you were actually after.
                  </p>
                  <button
                    onClick={handleBegin}
                    className="mt-8 bg-solar-gold text-foundation font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Begin
                  </button>
                </motion.div>
              )}

              {phase === "interview" && (
                <motion.div
                  key="interview"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="rounded-2xl bg-foundation border border-line p-6 md:p-8">
                    {/* Progress */}
                    <div className="mb-8">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-electric-teal">
                          Step {step + 1}
                        </span>
                        <span className="font-mono text-[11px] text-mute">
                          {LAYERS[layerIndex]}
                        </span>
                      </div>
                      <div className="h-1 rounded-full bg-surface overflow-hidden">
                        <motion.div
                          className="h-full bg-solar-gold"
                          initial={false}
                          animate={{ width: `${progress * 100}%` }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        />
                      </div>
                    </div>

                    {/* Question */}
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 24 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -24 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="font-display text-xl md:text-2xl font-bold text-warm-off-white leading-snug min-h-[3.5rem]">
                          {question}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Answer */}
                    {!complete ? (
                      <>
                        <div className="mt-6">
                          <textarea
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                handleContinue();
                              }
                            }}
                            rows={3}
                            placeholder="Say it plainly…"
                            disabled={loading}
                            className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/50 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm resize-none disabled:opacity-50"
                          />
                        </div>

                        {error && (
                          <p className="mt-3 text-red-400 text-xs font-mono">{error}</p>
                        )}

                        <button
                          onClick={handleContinue}
                          disabled={loading || !answer.trim()}
                          className="w-full mt-5 bg-solar-gold text-foundation font-display font-bold px-6 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {loading ? "Listening…" : "Continue →"}
                        </button>
                      </>
                    ) : (
                      <div className="mt-8 text-center">
                        <p className="font-display text-lg font-bold text-warm-off-white mb-2">
                          That&apos;s everything I need.
                        </p>
                        <p className="text-mute text-sm mb-6">
                          The interview is complete. Reveal your Soul Blueprint.
                        </p>
                        {error && (
                          <p className="mb-4 text-red-400 text-xs font-mono">{error}</p>
                        )}
                        <button
                          onClick={() => setPhase("revealing")}
                          className="w-full bg-solar-gold text-foundation font-display font-bold px-6 py-4 rounded-xl hover:opacity-90 transition-opacity"
                        >
                          Reveal my blueprint →
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}

              {phase === "revealing" && (
                <motion.div
                  key="revealing"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl bg-surface border border-line p-8 space-y-5"
                >
                  <div>
                    <p className="font-mono text-electric-teal text-xs tracking-[0.3em] uppercase mb-3">
                      One last thing
                    </p>
                    <p className="text-mute text-sm leading-relaxed">
                      Where should I send a copy? Leave it blank if you&apos;d rather
                      not say.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="w-full bg-foundation border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
                    />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@email.com"
                      className="w-full bg-foundation border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
                    />
                  </div>

                  <TurnstileBox ref={tsRef} onToken={setToken} />

                  {error && (
                    <p className="text-red-400 text-xs font-mono">{error}</p>
                  )}

                  <button
                    onClick={handleReveal}
                    disabled={revealing || !token}
                    className="w-full bg-solar-gold text-foundation font-display font-bold px-6 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {revealing ? "Distilling your blueprint..." : "Reveal blueprint"}
                  </button>
                </motion.div>
              )}

              {phase === "done" && blueprint && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <BlueprintPreview bp={blueprint} />

                  {error && (
                    <p className="text-red-400 text-xs font-mono text-center">{error}</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownload}
                      disabled={downloading}
                      className="flex-1 bg-solar-gold text-foundation font-display font-bold px-6 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {downloading ? "Preparing PDF..." : "Download Soul Blueprint"}
                    </button>
                    <button
                      onClick={handleRestart}
                      className="px-6 py-4 border border-line text-mute font-mono text-xs uppercase tracking-wider rounded-xl hover:text-warm-off-white hover:border-warm-off-white transition-colors"
                    >
                      Start over
                    </button>
                  </div>

                  <p className="text-center text-mute/70 text-xs font-mono">
                    Read it in the morning and at night. It&apos;s a mirror, not a
                    report.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  );
}
