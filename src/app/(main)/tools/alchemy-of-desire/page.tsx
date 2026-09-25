"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { TurnstileBox } from "../_components/TurnstileBox";
import { ComingSoonPanel } from "../_components/ComingSoonPanel";
import { AI_TOOLS_ENABLED } from "@/lib/tools-config";
import type { ChatMessage, SoulBlueprint } from "@/lib/desire/types";

type Phase = "intro" | "chat" | "revealing" | "done";

const OPENING =
  "Tell me who you are. Start anywhere — where you come from, what shaped you, what's been on your mind lately. I'll follow you down.";

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-solar-gold/15 text-warm-off-white rounded-br-sm"
            : "bg-surface border border-line text-warm-off-white rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function TypingDots() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-surface border border-line">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-solar-gold"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

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
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [blueprint, setBlueprint] = useState<SoulBlueprint | null>(null);
  const [revealing, setRevealing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState("");
  const tsRef = useRef<TurnstileInstance>(null);

  function handleStart() {
    setError("");
    setMessages([{ role: "assistant", content: OPENING }]);
    setPhase("chat");
  }

  async function handleSend(content: string) {
    const text = content.trim();
    if (!text || sending) return;

    const next = [...messages, { role: "user", content: text } as ChatMessage];
    setMessages(next);
    setInput("");
    setSending(true);
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
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message } as ChatMessage,
        ]);
      }
    } catch {
      setError("Connection interrupted. Try again.");
    } finally {
      setSending(false);
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
        setPhase("chat");
      } else {
        setBlueprint(data.blueprint as SoulBlueprint);
        setPhase("done");
      }
    } catch {
      setError("Connection interrupted. Try again.");
      setPhase("chat");
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
    setBlueprint(null);
    setInput("");
    setName("");
    setEmail("");
    setToken("");
    setError("");
  }

  const hasConversation = messages.some((m) => m.role === "user");

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
                    No forms. No goals-first interrogation. Just a conversation
                    that goes where you point it — down to what you actually want.
                  </p>
                  <button
                    onClick={handleStart}
                    className="mt-8 bg-solar-gold text-foundation font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Begin
                  </button>
                </motion.div>
              )}

              {phase === "chat" && (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl bg-foundation border border-line overflow-hidden"
                >
                  <div className="max-h-[420px] overflow-y-auto px-5 py-5 space-y-3">
                    {messages.map((m, i) => (
                      <ChatBubble key={i} message={m} />
                    ))}
                    <AnimatePresence>{sending && <TypingDots />}</AnimatePresence>
                  </div>

                  {error && (
                    <p className="px-5 py-2 text-red-400 text-xs font-mono">{error}</p>
                  )}

                  <div className="px-5 py-4 border-t border-line space-y-3">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend(input);
                          }
                        }}
                        placeholder="Tell me more..."
                        disabled={sending}
                        className="flex-1 px-4 py-3 bg-surface border border-line rounded-xl text-sm text-warm-off-white placeholder:text-mute/50 focus:outline-none focus:border-solar-gold/50 transition-colors disabled:opacity-50"
                      />
                      <button
                        onClick={() => handleSend(input)}
                        disabled={sending || !input.trim()}
                        className="px-5 py-3 bg-solar-gold/10 border border-solar-gold/30 rounded-xl text-solar-gold font-display font-bold text-sm hover:bg-solar-gold/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                      >
                        Send
                      </button>
                    </div>

                    {hasConversation && (
                      <button
                        onClick={() => setPhase("revealing")}
                        disabled={sending}
                        className="w-full bg-solar-gold text-foundation font-display font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Reveal my blueprint →
                      </button>
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
