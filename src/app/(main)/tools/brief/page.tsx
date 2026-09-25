"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { TurnstileInstance } from "@marsidev/react-turnstile";
import { TurnstileBox } from "../_components/TurnstileBox";
import { ComingSoonPanel } from "../_components/ComingSoonPanel";
import { AI_TOOLS_ENABLED } from "@/lib/tools-config";
import type { BriefData, ChatMessage, Desire, Priority } from "@/lib/brief/types";

type Phase = "intro" | "chat" | "generating" | "done";

const OPENING =
  "Tell me what you want to build. Start anywhere — the idea, the problem, the feeling. I'll pull the rest out of you.";

const PRIORITY_STYLE: Record<Priority, string> = {
  must: "text-solar-gold border-solar-gold/40 bg-solar-gold/10",
  want: "text-electric-teal border-electric-teal/40 bg-electric-teal/10",
  nice: "text-mute border-line bg-surface",
};

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

function BriefPreview({ brief }: { brief: BriefData }) {
  return (
    <div className="rounded-2xl bg-surface border border-line p-6 md:p-8 text-left space-y-6">
      <div className="border-b border-line pb-5">
        <p className="font-mono text-electric-teal text-[10px] tracking-[0.3em] uppercase">
          The Brief
        </p>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-warm-off-white mt-2">
          {brief.projectName}
        </h2>
        {brief.oneLiner && (
          <p className="text-solar-gold mt-2 leading-relaxed">{brief.oneLiner}</p>
        )}
      </div>

      {brief.clientName && (
        <p className="text-mute text-xs font-mono">
          PREPARED FOR {brief.clientName.toUpperCase()}
        </p>
      )}

      {brief.vision && (
        <Section label="The vision">
          <p className="text-warm-off-white/90 leading-relaxed">{brief.vision}</p>
        </Section>
      )}

      {brief.audience && (
        <Section label="Who it's for">
          <p className="text-warm-off-white/90 leading-relaxed">{brief.audience}</p>
        </Section>
      )}

      {brief.desires.length > 0 && (
        <Section label="Desires">
          <ul className="space-y-2">
            {brief.desires.map((d: Desire, i: number) => (
              <li
                key={i}
                className="rounded-xl bg-foundation/60 border border-line px-4 py-3"
              >
                <div className="flex items-start gap-3">
                  <span
                    className={`font-mono text-[10px] uppercase tracking-wider border rounded px-2 py-0.5 shrink-0 mt-0.5 ${PRIORITY_STYLE[d.priority]}`}
                  >
                    {d.priority}
                  </span>
                  <div>
                    <p className="text-warm-off-white font-headline font-semibold text-sm">
                      {d.label}
                    </p>
                    {d.detail && (
                      <p className="text-mute text-sm mt-0.5">{d.detail}</p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </Section>
      )}

      {(brief.references.loves ||
        brief.references.hates ||
        brief.references.inspirations) && (
        <Section label="References">
          {brief.references.loves && (
            <p className="text-mute text-sm">Loves: {brief.references.loves}</p>
          )}
          {brief.references.hates && (
            <p className="text-mute text-sm">Hates: {brief.references.hates}</p>
          )}
          {brief.references.inspirations && (
            <p className="text-mute text-sm">
              Inspirations: {brief.references.inspirations}
            </p>
          )}
        </Section>
      )}

      {(brief.constraints.budget ||
        brief.constraints.timeline ||
        brief.constraints.offLimits) && (
        <Section label="Boundaries">
          {brief.constraints.budget && (
            <p className="text-mute text-sm">Budget: {brief.constraints.budget}</p>
          )}
          {brief.constraints.timeline && (
            <p className="text-mute text-sm">
              Timeline: {brief.constraints.timeline}
            </p>
          )}
          {brief.constraints.offLimits && (
            <p className="text-mute text-sm">
              Off-limits: {brief.constraints.offLimits}
            </p>
          )}
        </Section>
      )}

      {brief.successMetrics && (
        <Section label="How success is measured">
          <p className="text-warm-off-white/90 leading-relaxed">
            {brief.successMetrics}
          </p>
        </Section>
      )}
    </div>
  );
}

function Section({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <p className="font-mono text-electric-teal text-[10px] tracking-[0.3em] uppercase mb-2">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function BriefPage() {
  const [phase, setPhase] = useState<Phase>("intro");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [brief, setBrief] = useState<BriefData | null>(null);
  const [generating, setGenerating] = useState(false);
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
      const res = await fetch("/api/brief/chat", {
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

  async function handleGenerateSubmit() {
    if (generating) return;
    setGenerating(true);
    setError("");

    try {
      const res = await fetch("/api/brief/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages,
          name,
          email,
          turnstileToken: token,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Couldn't build your brief. Try again.");
        setPhase("chat");
      } else {
        setBrief(data.brief as BriefData);
        setPhase("done");
      }
    } catch {
      setError("Connection interrupted. Try again.");
      setPhase("chat");
    } finally {
      setGenerating(false);
      setToken("");
      tsRef.current?.reset();
    }
  }

  async function handleDownload() {
    if (!brief || downloading) return;
    setDownloading(true);
    setError("");
    try {
      const res = await fetch("/api/brief/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(brief),
      });
      if (!res.ok) throw new Error("pdf failed");
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${brief.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "project"}-brief.pdf`;
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
    setBrief(null);
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
            The Brief
          </h1>
          <p className="text-mute text-lg leading-relaxed">
            Talk through your idea with an AI interviewer. Leave with a full brief
            — every desire captured and ranked — ready to hand to a builder.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-2xl mx-auto">
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
                    A few minutes of conversation. No forms, no walls of fields —
                    just tell it like you would a builder sitting across from you.
                  </p>
                  <button
                    onClick={handleStart}
                    className="mt-8 bg-solar-gold text-foundation font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
                  >
                    Start your brief
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
                        placeholder="Describe your idea..."
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
                        onClick={() => setPhase("generating")}
                        disabled={sending}
                        className="w-full bg-solar-gold text-foundation font-display font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        Generate my brief →
                      </button>
                    )}
                  </div>
                </motion.div>
              )}

              {phase === "generating" && (
                <motion.div
                  key="generating"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-2xl bg-surface border border-line p-8 space-y-5"
                >
                  <div>
                    <p className="font-mono text-electric-teal text-xs tracking-[0.3em] uppercase mb-3">
                      Almost there
                    </p>
                    <p className="text-mute text-sm leading-relaxed">
                      Where should I send the follow-up? Leave it blank if you&apos;d
                      rather not say.
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
                    onClick={handleGenerateSubmit}
                    disabled={generating || !token}
                    className="w-full bg-solar-gold text-foundation font-display font-bold px-6 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {generating ? "Writing your brief..." : "Generate brief"}
                  </button>
                </motion.div>
              )}

              {phase === "done" && brief && (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="space-y-6"
                >
                  <BriefPreview brief={brief} />

                  {error && (
                    <p className="text-red-400 text-xs font-mono text-center">{error}</p>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={handleDownload}
                      disabled={downloading}
                      className="flex-1 bg-solar-gold text-foundation font-display font-bold px-6 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {downloading ? "Preparing PDF..." : "Download PDF"}
                    </button>
                    <button
                      onClick={handleRestart}
                      className="px-6 py-4 border border-line text-mute font-mono text-xs uppercase tracking-wider rounded-xl hover:text-warm-off-white hover:border-warm-off-white transition-colors"
                    >
                      Start over
                    </button>
                  </div>

                  <p className="text-center text-mute/70 text-xs font-mono">
                    Share the PDF with whoever&apos;s building — or reply to the
                    follow-up and I&apos;ll take it from here.
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
