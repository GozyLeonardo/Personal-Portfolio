"use client";

import { useState, useRef } from "react";

export default function TestimonialPage() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);

  function generateCard() {
    const canvas = canvasRef.current;
    if (!canvas || !text.trim()) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = 1080;
    canvas.height = 1080;

    ctx.fillStyle = "#080808";
    ctx.fillRect(0, 0, 1080, 1080);

    ctx.strokeStyle = "rgba(196, 122, 0, 0.15)";
    ctx.lineWidth = 1;
    ctx.strokeRect(40, 40, 1000, 1000);
    ctx.strokeRect(60, 60, 960, 960);

    ctx.fillStyle = "#C47A00";
    ctx.font = "bold 72px serif";
    ctx.fillText("“", 80, 180);

    ctx.fillStyle = "#F2EDE4";
    ctx.font = "26px sans-serif";
    const words = text.split(" ");
    let line = "";
    let y = 220;
    const maxWidth = 880;

    for (const word of words) {
      const test = line + word + " ";
      if (ctx.measureText(test).width > maxWidth && line) {
        ctx.fillText(line.trim(), 80, y);
        line = word + " ";
        y += 38;
      } else {
        line = test;
      }
    }
    ctx.fillText(line.trim(), 80, y);

    ctx.fillStyle = "#C47A00";
    ctx.font = "bold 72px serif";
    ctx.fillText("”", 960, y + 60);

    const stars = "★".repeat(rating) + "☆".repeat(5 - rating);
    ctx.fillStyle = "#C47A00";
    ctx.font = "28px sans-serif";
    ctx.fillText(stars, 80, y + 120);

    if (name) {
      ctx.fillStyle = "#F2EDE4";
      ctx.font = "bold 24px sans-serif";
      ctx.fillText(name, 80, y + 175);
    }
    if (role) {
      ctx.fillStyle = "rgba(242, 237, 228, 0.5)";
      ctx.font = "20px sans-serif";
      ctx.fillText(role, 80, y + 210);
    }

    ctx.fillStyle = "rgba(196, 122, 0, 0.4)";
    ctx.font = "14px monospace";
    ctx.textAlign = "right";
    ctx.fillText("lawrencenwuzor.com", 980, 1020);
    ctx.textAlign = "left";

    setGenerated(true);
  }

  function downloadCard() {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `testimonial-${name || "card"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  }

  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-electric-teal text-xs tracking-[0.3em] uppercase mb-4">
            Free Tool
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-warm-off-white mb-4">
            Proof Card
          </h1>
          <p className="text-mute text-lg leading-relaxed">
            Turn customer reviews into polished, shareable testimonial cards. No
            account needed. Always free.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div>
              <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                TESTIMONIAL TEXT
              </label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the customer's words here..."
                rows={5}
                className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm resize-none"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                  CUSTOMER NAME
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ada Okafor"
                  className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                  ROLE / COMPANY
                </label>
                <input
                  type="text"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  placeholder="CEO, TechCo"
                  className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
                />
              </div>
            </div>
            <div>
              <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                RATING
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setRating(n)}
                    className={`text-2xl transition-colors ${
                      n <= rating ? "text-solar-gold" : "text-mute/40"
                    }`}
                    aria-label={`${n} star${n > 1 ? "s" : ""}`}
                  >
                    {"★"}
                  </button>
                ))}
              </div>
            </div>
            <button
              onClick={generateCard}
              disabled={!text.trim()}
              className="w-full bg-solar-gold text-foundation font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate Card
            </button>
            {generated && (
              <button
                onClick={downloadCard}
                className="w-full border border-solar-gold/30 text-solar-gold font-display font-bold px-8 py-4 rounded-xl hover:bg-solar-gold/10 transition-colors"
              >
                Download PNG
              </button>
            )}
          </div>

          <div className="flex items-start justify-center">
            <canvas
              ref={canvasRef}
              className="w-full max-w-[400px] rounded-xl border border-line bg-surface/60"
              style={{ aspectRatio: "1/1" }}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
