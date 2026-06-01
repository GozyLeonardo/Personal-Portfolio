"use client";

import { useState } from "react";

interface LineItem {
  description: string;
  amount: string;
}

export default function ProposalPage() {
  const [clientName, setClientName] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [currency, setCurrency] = useState("NGN");
  const [items, setItems] = useState<LineItem[]>([
    { description: "", amount: "" },
  ]);
  const [timeline, setTimeline] = useState("");
  const [notes, setNotes] = useState("");
  const [generated, setGenerated] = useState(false);

  function addItem() {
    setItems([...items, { description: "", amount: "" }]);
  }

  function updateItem(index: number, field: keyof LineItem, value: string) {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  }

  function removeItem(index: number) {
    if (items.length <= 1) return;
    setItems(items.filter((_, i) => i !== index));
  }

  const total = items.reduce(
    (sum, item) => sum + (parseFloat(item.amount) || 0),
    0
  );

  const currencySymbol = currency === "NGN" ? "₦" : "$";

  function formatAmount(n: number) {
    return n.toLocaleString(currency === "NGN" ? "en-NG" : "en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
  }

  function generateProposal() {
    setGenerated(true);
  }

  function copyShareText() {
    const text = `
PROPOSAL: ${projectTitle}
For: ${clientName}

${items
  .filter((i) => i.description)
  .map(
    (i) =>
      `• ${i.description} — ${currencySymbol}${formatAmount(parseFloat(i.amount) || 0)}`
  )
  .join("\n")}

Total: ${currencySymbol}${formatAmount(total)}
Timeline: ${timeline}
${notes ? `\nNotes: ${notes}` : ""}

— Lawrence Nwuzor
lawrencenwuzor.com
    `.trim();

    navigator.clipboard.writeText(text);
  }

  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <p className="font-mono text-electric-teal text-xs tracking-[0.3em] uppercase mb-4">
            Free Tool
          </p>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-warm-off-white mb-4">
            Proposal
          </h1>
          <p className="text-mute text-lg leading-relaxed">
            Build a clean proposal in 60 seconds. Copy and send via WhatsApp or
            email.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                  CLIENT NAME
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="Acme Ltd"
                  className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
                />
              </div>
              <div>
                <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                  CURRENCY
                </label>
                <div className="flex gap-2">
                  {["NGN", "USD"].map((c) => (
                    <button
                      key={c}
                      onClick={() => setCurrency(c)}
                      className={`flex-1 px-4 py-3 rounded-xl text-xs font-mono transition-colors ${
                        currency === c
                          ? "bg-solar-gold text-foundation"
                          : "bg-surface text-mute"
                      }`}
                    >
                      {c === "NGN" ? "₦ Naira" : "$ USD"}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                PROJECT TITLE
              </label>
              <input
                type="text"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                placeholder="Website Redesign"
                className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                LINE ITEMS
              </label>
              <div className="space-y-2">
                {items.map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) =>
                        updateItem(i, "description", e.target.value)
                      }
                      placeholder="Design & development"
                      className="flex-1 bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
                    />
                    <input
                      type="number"
                      value={item.amount}
                      onChange={(e) => updateItem(i, "amount", e.target.value)}
                      placeholder="0"
                      className="w-28 bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm text-right"
                    />
                    {items.length > 1 && (
                      <button
                        onClick={() => removeItem(i)}
                        className="text-mute hover:text-red-400 transition-colors px-2"
                        aria-label="Remove line item"
                      >
                        ×
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                onClick={addItem}
                className="mt-2 text-solar-gold/70 hover:text-solar-gold text-xs font-mono transition-colors"
              >
                + Add line item
              </button>
            </div>

            <div>
              <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                TIMELINE
              </label>
              <input
                type="text"
                value={timeline}
                onChange={(e) => setTimeline(e.target.value)}
                placeholder="7 business days"
                className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm"
              />
            </div>

            <div>
              <label className="text-mute text-xs font-mono tracking-wider block mb-2">
                NOTES (OPTIONAL)
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="50% upfront, 50% on delivery..."
                rows={3}
                className="w-full bg-surface border border-line rounded-xl px-4 py-3 text-warm-off-white placeholder:text-mute/60 focus:outline-none focus:border-solar-gold/50 transition-colors text-sm resize-none"
              />
            </div>

            <button
              onClick={generateProposal}
              disabled={!clientName.trim() || !projectTitle.trim()}
              className="w-full bg-solar-gold text-foundation font-display font-bold px-8 py-4 rounded-xl hover:opacity-90 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Generate Proposal
            </button>
          </div>

          <div>
            {generated ? (
              <div className="rounded-2xl bg-surface border border-line p-8 sticky top-24">
                <div className="border-b border-line pb-6 mb-6">
                  <p className="font-mono text-solar-gold/70 text-[10px] tracking-[0.3em] uppercase">
                    Proposal
                  </p>
                  <h3 className="font-display text-2xl font-bold text-warm-off-white mt-2">
                    {projectTitle}
                  </h3>
                  <p className="text-mute text-sm mt-1">
                    Prepared for {clientName}
                  </p>
                </div>

                <div className="space-y-3 mb-6">
                  {items
                    .filter((i) => i.description)
                    .map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center"
                      >
                        <span className="text-warm-off-white/80 text-sm">
                          {item.description}
                        </span>
                        <span className="text-warm-off-white font-mono text-sm">
                          {currencySymbol}
                          {formatAmount(parseFloat(item.amount) || 0)}
                        </span>
                      </div>
                    ))}
                </div>

                <div className="border-t border-line pt-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-warm-off-white font-bold">Total</span>
                    <span className="text-solar-gold font-display text-2xl font-bold">
                      {currencySymbol}
                      {formatAmount(total)}
                    </span>
                  </div>
                </div>

                {timeline && (
                  <p className="text-mute text-xs font-mono mb-2">
                    Timeline: {timeline}
                  </p>
                )}
                {notes && <p className="text-mute text-xs mb-4">{notes}</p>}

                <div className="border-t border-line pt-4 mt-4">
                  <p className="text-mute text-xs font-mono">
                    Lawrence Nwuzor · lawrencenwuzor.com
                  </p>
                </div>

                <button
                  onClick={copyShareText}
                  className="w-full mt-6 border border-solar-gold/30 text-solar-gold font-display font-bold px-6 py-3 rounded-xl hover:bg-solar-gold/10 transition-colors text-sm"
                >
                  Copy for WhatsApp
                </button>
              </div>
            ) : (
              <div className="rounded-2xl bg-surface/60 border border-line p-8 flex items-center justify-center min-h-[400px]">
                <p className="text-mute/70 text-sm font-mono text-center">
                  Fill in the details and click Generate
                  <br />
                  to preview your proposal
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
