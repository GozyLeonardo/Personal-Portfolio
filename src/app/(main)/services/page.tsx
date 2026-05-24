import type { Metadata } from "next";
import { TerminalLabel } from "@/components/ui/TerminalLabel";
import { SolarGoldButton } from "@/components/ui/SolarGoldButton";
import { GhostButton } from "@/components/ui/GhostButton";
import { SectionReveal } from "@/components/motion/SectionReveal";
import { NsibidiGlyph } from "@/components/ui/NsibidiGlyph";
import { UliCurveDivider } from "@/components/ui/UliCurveDivider";

export const metadata: Metadata = {
  title: "The 7-Day Lead Engine",
  description:
    "Production-grade websites and systems delivered in 7 days. AI-orchestrated builds at fixed price. By Lawrence Nwuzor.",
  openGraph: {
    title: "The 7-Day Lead Engine | Lawrence Nwuzor",
    description:
      "Production-grade websites and systems delivered in 7 days. AI-orchestrated builds at fixed price.",
  },
};

const tiers = [
  {
    name: "Signal",
    tag: "Landing Page",
    price: 997,
    originalPrice: 1500,
    description: "One page. One message. Built to convert.",
    deliverables: [
      "Single-page site — responsive, fast, deployed",
      "Custom design matching your brand",
      "SEO fundamentals — meta tags, OG images, sitemap",
      "Contact form or CTA integration",
      "Deployed to your domain on Vercel",
    ],
  },
  {
    name: "Engine",
    tag: "Multi-Page + CMS",
    price: 2497,
    originalPrice: 3500,
    description: "A full site you can run yourself.",
    highlight: true,
    deliverables: [
      "Everything in Signal",
      "Up to 6 pages — About, Services, Blog, etc.",
      "Headless CMS — edit content without touching code",
      "Analytics dashboard — know who visits and why",
      "Performance optimized — sub-2s load times",
    ],
  },
  {
    name: "System",
    tag: "Full-Stack Application",
    price: 4997,
    originalPrice: 7000,
    description: "Backend logic. Database. The real machinery.",
    deliverables: [
      "Everything in Engine",
      "Database + authentication — Supabase",
      "Custom backend logic — APIs, webhooks, integrations",
      "Admin dashboard for your operations",
      "Production infrastructure — monitoring, error tracking",
    ],
  },
];

const processSteps = [
  {
    day: "Day 1",
    title: "Diagnosis",
    description:
      "We get on a call. I learn what your business does, who it serves, and what the site needs to accomplish. No questionnaires — a conversation.",
  },
  {
    day: "Days 2–4",
    title: "Architecture + Build",
    description:
      "I design and build simultaneously. You see real progress daily — not wireframes and mood boards. AI handles the scaffolding. I handle the judgment calls.",
  },
  {
    day: "Days 5–6",
    title: "Review + Refine",
    description:
      "You see the full site live on a staging URL. We iterate on copy, layout, and flow. Two rounds of revision included.",
  },
  {
    day: "Day 7",
    title: "Launch",
    description:
      "Domain connected. Analytics live. CMS handed over. You own everything — code, content, infrastructure. No vendor lock-in.",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="min-h-[80vh] pt-32 pb-24 px-6 md:px-10">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <TerminalLabel>Services</TerminalLabel>

            <h1 className="mt-6 font-display text-5xl md:text-7xl leading-[0.95] text-[color:var(--color-warm-off-white)]">
              The 7-Day
              <br />
              <span className="text-[color:var(--color-solar-gold)]">
                Lead Engine
              </span>
            </h1>

            <p className="mt-8 text-xl md:text-2xl text-[color:var(--color-warm-off-white)] max-w-[48ch] leading-relaxed">
              Your site is live in 7 days. Production-grade.
              No templates. No waiting.
            </p>

            <p className="mt-6 text-base text-[color:var(--color-mute)] max-w-[54ch]">
              Most agencies take 6{"–"}12 weeks and charge you for the overhead.
              I build with AI-augmented workflows that compress timelines
              without compressing quality. You get the same engineering
              standard{" — "}at a fraction of the time and cost.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <SolarGoldButton href="mailto:lawrence@lawrencenwuzor.com?subject=7-Day%20Lead%20Engine">
                Start a project
              </SolarGoldButton>
              <GhostButton href="#pricing">See pricing &darr;</GhostButton>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--color-line)]">
        <div className="mx-auto max-w-4xl">
          <SectionReveal>
            <TerminalLabel>Process</TerminalLabel>
            <h2 className="mt-6 font-display text-3xl md:text-5xl text-[color:var(--color-warm-off-white)]">
              Seven days.{" "}
              <span className="text-[color:var(--color-solar-gold)]">
                Four phases.
              </span>
            </h2>
          </SectionReveal>

          <div className="mt-16 space-y-0 border-t border-[color:var(--color-line)]">
            {processSteps.map((step, i) => (
              <SectionReveal key={step.day} delay={i * 0.08}>
                <div className="group flex flex-col md:flex-row md:items-start gap-4 md:gap-8 py-8 border-b border-[color:var(--color-line)] hover:border-[color:var(--color-solar-gold)] transition-colors duration-200">
                  <span className="font-mono text-sm text-[color:var(--color-solar-gold)] tracking-[0.14em] uppercase md:w-28 shrink-0">
                    {step.day}
                  </span>
                  <div>
                    <h3 className="text-xl font-headline text-[color:var(--color-warm-off-white)]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-base text-[color:var(--color-mute)] max-w-[52ch]">
                      {step.description}
                    </p>
                  </div>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PRICING ─── */}
      <section
        id="pricing"
        className="py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--color-line)]"
      >
        <div className="mx-auto max-w-5xl">
          <SectionReveal>
            <TerminalLabel className="justify-center">Pricing</TerminalLabel>
            <h2 className="mt-6 font-display text-3xl md:text-5xl text-center text-[color:var(--color-warm-off-white)]">
              Fixed price.{" "}
              <span className="text-[color:var(--color-solar-gold)]">
                No surprises.
              </span>
            </h2>
            <p className="mt-4 text-center text-base text-[color:var(--color-mute)] max-w-[48ch] mx-auto">
              Early-rate pricing{" — "}available while I build the client roster.
              Every tier includes the full 7-day process.
            </p>
          </SectionReveal>

          <div className="mt-16 grid md:grid-cols-3 gap-6">
            {tiers.map((tier, i) => (
              <SectionReveal key={tier.name} delay={i * 0.1}>
                <div
                  className={`relative flex flex-col h-full p-8 rounded-[var(--radius-soft)] border ${
                    tier.highlight
                      ? "border-[color:var(--color-solar-gold)] bg-[color:var(--color-surface)]"
                      : "border-[color:var(--color-line)] bg-[color:var(--color-surface)]"
                  }`}
                >
                  {tier.highlight && (
                    <span className="absolute -top-3 left-8 px-3 py-1 bg-[color:var(--color-solar-gold)] text-[color:var(--color-foundation)] font-mono text-[10px] uppercase tracking-[0.18em] rounded-full">
                      Most popular
                    </span>
                  )}

                  <div className="mb-6">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-[color:var(--color-electric-teal)]">
                      {tier.tag}
                    </p>
                    <h3 className="mt-2 font-headline text-2xl text-[color:var(--color-warm-off-white)]">
                      {tier.name}
                    </h3>
                    <p className="mt-1 text-sm text-[color:var(--color-mute)]">
                      {tier.description}
                    </p>
                  </div>

                  <div className="mb-8">
                    <span className="font-mono text-sm text-[color:var(--color-mute)] line-through">
                      ${tier.originalPrice.toLocaleString()}
                    </span>
                    <p className="font-display text-4xl text-[color:var(--color-warm-off-white)]">
                      ${tier.price.toLocaleString()}
                    </p>
                  </div>

                  <ul className="flex-1 space-y-3 mb-8">
                    {tier.deliverables.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm text-[color:var(--color-mute)]"
                      >
                        <span className="mt-0.5 text-[color:var(--color-solar-gold)]">
                          {"✦"}
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <SolarGoldButton
                    href={`mailto:lawrence@lawrencenwuzor.com?subject=${tier.name}%20%E2%80%94%207-Day%20Lead%20Engine`}
                    className="w-full"
                  >
                    Get started
                  </SolarGoldButton>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─── QUALIFIER ─── */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--color-line)]">
        <div className="mx-auto max-w-3xl">
          <SectionReveal>
            <TerminalLabel>Fit check</TerminalLabel>
            <h2 className="mt-6 font-display text-3xl md:text-5xl text-[color:var(--color-warm-off-white)]">
              This is for you if
            </h2>
          </SectionReveal>

          <SectionReveal delay={0.1}>
            <ul className="mt-12 space-y-6">
              {[
                "You have a business that works — you need the site to match",
                "You’re launching something and can’t afford to wait 3 months",
                "You’ve been burned by agencies that over-promise and under-deliver",
                "You want to own everything — code, domain, infrastructure",
                "You care about craft, not just ‘getting something up’",
              ].map((item, i) => (
                <li key={i} className="flex gap-4 text-lg text-[color:var(--color-warm-off-white)]">
                  <span className="font-mono text-sm text-[color:var(--color-solar-gold)] mt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </SectionReveal>

          <UliCurveDivider />
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-24 md:py-32 px-6 md:px-10 border-t border-[color:var(--color-line)]">
        <div className="mx-auto max-w-3xl text-center">
          <SectionReveal>
            <div className="flex justify-center mb-8">
              <NsibidiGlyph variant="interlace" size={24} color="gold" animate />
            </div>

            <h2 className="font-display text-4xl md:text-6xl leading-tight text-[color:var(--color-warm-off-white)]">
              Your site.{" "}
              <span className="text-[color:var(--color-solar-gold)]">
                Seven days.
              </span>
            </h2>

            <p className="mt-8 text-lg text-[color:var(--color-warm-off-white)] max-w-[48ch] mx-auto">
              Send me what you{"’"}re building and who it{"’"}s for.
              I{"’"}ll tell you if the 7-day window fits{" — "}and which tier makes sense.
            </p>

            <div className="mt-10 flex justify-center gap-4">
              <SolarGoldButton href="mailto:lawrence@lawrencenwuzor.com?subject=7-Day%20Lead%20Engine">
                Start a project
              </SolarGoldButton>
            </div>

            <p className="mt-8 text-sm text-[color:var(--color-mute)]">
              lawrence@lawrencenwuzor.com {"·"} Response within 24 hours
            </p>
          </SectionReveal>
        </div>
      </section>
    </>
  );
}
