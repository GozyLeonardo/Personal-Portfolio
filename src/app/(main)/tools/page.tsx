import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Free tools for founders, creators, and freelancers — built by Lawrence Nwuzor. Cold email openers, content repurposing, testimonial cards, mockups, and proposals.",
};

const tools = [
  {
    href: "/tools/first-line" as const,
    name: "First Line",
    tagline: "AI cold email opener",
    description:
      "Enter a prospect's website. Get 3 personalized opening lines with pain-point hooks in seconds.",
    badge: "3 FREE RUNS",
    icon: "✉",
  },
  {
    href: "/tools/testimonial" as const,
    name: "Proof Card",
    tagline: "WhatsApp testimonial cards",
    description:
      "Turn WhatsApp screenshots and customer reviews into polished, shareable testimonial cards.",
    badge: "FREE",
    icon: "★",
  },
  {
    href: "/tools/mockup" as const,
    name: "Mockup",
    tagline: "Screenshot to device frame",
    description:
      "Upload a screenshot, pick a device frame. Get a clean mockup in seconds.",
    badge: "FREE",
    icon: "▢",
  },
  {
    href: "/tools/repurpose" as const,
    name: "Repurpose",
    tagline: "One post, six platforms",
    description:
      "Paste a blog post or transcript. Get 6 formatted social posts — X, LinkedIn, IG, TikTok, WhatsApp.",
    badge: "3 FREE RUNS",
    icon: "↻",
  },
  {
    href: "/tools/proposal" as const,
    name: "Proposal",
    tagline: "Quote builder for WhatsApp",
    description:
      "Fill in scope and pricing. Get a clean, shareable proposal you can send via WhatsApp or email.",
    badge: "FREE",
    icon: "◈",
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen pt-24">
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-mono text-electric-teal text-xs tracking-[0.3em] uppercase mb-4">
            Tools
          </p>
          <h1 className="font-display text-4xl md:text-6xl font-bold text-warm-off-white mb-6">
            Small tools that
            <br />
            <span className="text-solar-gold">solve real problems</span>
          </h1>
          <p className="text-mute text-lg max-w-xl mx-auto leading-relaxed">
            Free utilities I built for founders, creators, and freelancers.
            Simple, fast, no account required.
          </p>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-2xl bg-surface border border-line p-8 transition-all duration-200 hover:border-solar-gold/30 hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between mb-4">
                <span className="text-3xl text-warm-off-white">{tool.icon}</span>
                <span className="font-mono text-[10px] tracking-wider text-electric-teal bg-electric-teal/10 px-2 py-1 rounded">
                  {tool.badge}
                </span>
              </div>
              <h2 className="font-display text-xl font-bold text-warm-off-white mb-1 group-hover:text-solar-gold transition-colors">
                {tool.name}
              </h2>
              <p className="font-mono text-xs text-solar-gold/70 mb-3">
                {tool.tagline}
              </p>
              <p className="text-mute text-sm leading-relaxed">
                {tool.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
