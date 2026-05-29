"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function ChatBubble({ message }: { message: Message }) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-[color:var(--color-solar-gold)]/15 text-[color:var(--color-warm-off-white)] rounded-br-sm"
            : "bg-[color:var(--color-surface)] border border-[color:var(--color-line)] text-[color:var(--color-warm-off-white)] rounded-bl-sm"
        }`}
      >
        {message.content}
      </div>
    </motion.div>
  );
}

function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-start"
    >
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-[color:var(--color-surface)] border border-[color:var(--color-line)]">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[color:var(--color-solar-gold)]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}

const STARTER_PROMPTS = [
  "What can you build in 7 days?",
  "How do you use AI in your work?",
  "What's your tech stack?",
  "I need a site for my business",
];

export function SignalChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInactive, setIsInactive] = useState(false);
  const [hasChecked, setHasChecked] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const pathname = usePathname();

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading, scrollToBottom]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Check if chat is active on first open
  useEffect(() => {
    if (isOpen && !hasChecked) {
      setHasChecked(true);
      fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: "hello" }], page: pathname }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status === "inactive") {
            setIsInactive(true);
          }
        })
        .catch(() => {
          setIsInactive(true);
        });
    }
  }, [isOpen, hasChecked, pathname]);

  async function sendMessage(content: string) {
    if (!content.trim() || isLoading || isInactive) return;

    const userMessage: Message = { role: "user", content: content.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
          page: pathname,
        }),
      });

      const data = await res.json();

      if (data.status === "inactive") {
        setIsInactive(true);
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else if (data.message) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.message },
        ]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.error },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection interrupted. Try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[color:var(--color-foundation)] border border-[color:var(--color-solar-gold)]/40 shadow-lg shadow-black/30 flex items-center justify-center group cursor-pointer"
            aria-label="Open Signal Chat"
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-[color:var(--color-solar-gold)]/20"
              animate={{ scale: [1, 1.4, 1.4], opacity: [0.6, 0, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
            />
            {/* Inner glyph */}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[color:var(--color-solar-gold)] group-hover:text-[color:var(--color-warm-off-white)] transition-colors"
            >
              <path
                d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                fill="currentColor"
                opacity="0.9"
              />
            </svg>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[calc(100vh-48px)] rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-foundation)] shadow-2xl shadow-black/40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[color:var(--color-line)]">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[color:var(--color-solar-gold)]/10 border border-[color:var(--color-solar-gold)]/30 flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                        fill="var(--color-solar-gold)"
                      />
                    </svg>
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[color:var(--color-foundation)] ${isInactive ? "bg-[color:var(--color-mute)]" : "bg-[color:var(--color-electric-teal)]"}`}
                  />
                </div>
                <div>
                  <p className="text-sm font-headline text-[color:var(--color-warm-off-white)]">
                    The Signal
                  </p>
                  <p className="text-[10px] font-mono uppercase tracking-[0.14em] text-[color:var(--color-mute)]">
                    {isInactive ? "Coming soon" : "Ask anything"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[color:var(--color-surface)] transition-colors text-[color:var(--color-mute)] hover:text-[color:var(--color-warm-off-white)]"
                aria-label="Close chat"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M4 4L12 12M12 4L4 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
              {messages.length === 0 && !isInactive && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="flex flex-col items-center justify-center h-full gap-6 py-8"
                >
                  <div className="text-center">
                    <p className="text-sm text-[color:var(--color-warm-off-white)]">
                      Signal from the noise.
                    </p>
                    <p className="mt-1 text-xs text-[color:var(--color-mute)]">
                      Ask me anything about the work, the stack, or the mission.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 w-full max-w-[300px]">
                    {STARTER_PROMPTS.map((prompt) => (
                      <button
                        key={prompt}
                        onClick={() => sendMessage(prompt)}
                        className="px-3 py-2.5 text-left text-xs text-[color:var(--color-mute)] border border-[color:var(--color-line)] rounded-xl hover:border-[color:var(--color-solar-gold)]/40 hover:text-[color:var(--color-warm-off-white)] transition-colors"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {isInactive && messages.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center h-full gap-4 py-8 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[color:var(--color-solar-gold)]/10 flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
                        fill="var(--color-solar-gold)"
                        opacity="0.5"
                      />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[color:var(--color-warm-off-white)]">
                      Signal Chat is coming soon.
                    </p>
                    <p className="mt-2 text-xs text-[color:var(--color-mute)] max-w-[240px]">
                      In the meantime, reach out directly:
                    </p>
                  </div>
                  <div className="flex flex-col gap-2 w-full max-w-[240px]">
                    <a
                      href="https://wa.me/2347017303970"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2.5 text-center text-xs font-mono uppercase tracking-wider bg-[color:var(--color-solar-gold)]/10 border border-[color:var(--color-solar-gold)]/30 rounded-xl text-[color:var(--color-solar-gold)] hover:bg-[color:var(--color-solar-gold)]/20 transition-colors"
                    >
                      WhatsApp
                    </a>
                    <a
                      href="mailto:lawrence@lawrencenwuzor.com"
                      className="px-4 py-2.5 text-center text-xs font-mono uppercase tracking-wider border border-[color:var(--color-line)] rounded-xl text-[color:var(--color-mute)] hover:text-[color:var(--color-warm-off-white)] hover:border-[color:var(--color-warm-off-white)] transition-colors"
                    >
                      Email
                    </a>
                  </div>
                </motion.div>
              )}

              {messages.map((msg, i) => (
                <ChatBubble key={i} message={msg} />
              ))}

              <AnimatePresence>{isLoading && <TypingIndicator />}</AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            {!isInactive && (
              <div className="px-4 py-3 border-t border-[color:var(--color-line)]">
                <div className="flex gap-2">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        sendMessage(input);
                      }
                    }}
                    placeholder="Ask anything..."
                    disabled={isLoading}
                    className="flex-1 px-4 py-2.5 bg-[color:var(--color-surface)] border border-[color:var(--color-line)] rounded-xl text-sm text-[color:var(--color-warm-off-white)] placeholder:text-[color:var(--color-mute)]/50 focus:outline-none focus:border-[color:var(--color-solar-gold)]/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    onClick={() => sendMessage(input)}
                    disabled={isLoading || !input.trim()}
                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-[color:var(--color-solar-gold)]/10 border border-[color:var(--color-solar-gold)]/30 text-[color:var(--color-solar-gold)] hover:bg-[color:var(--color-solar-gold)]/20 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                    aria-label="Send message"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M14 2L7 9M14 2L9.5 14L7 9M14 2L2 6.5L7 9"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
