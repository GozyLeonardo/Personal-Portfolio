# lawrencenwuzor.com

**The personal portfolio and empire front of Lawrence Chigozie Nwuzor.**
*Building what shouldn't work, from where it shouldn't.*

---

## Stack

- **Next.js 15** (App Router) · **TypeScript strict** · **Tailwind v4** (CSS-first `@theme`) · **Motion v12**
- **Vercel** hosting · **Cloudflare** DNS optional · **Resend** email optional
- Fonts: **Ojuju** (display) · **Space Grotesk** (headlines) · **Inter** (body) · **IBM Plex Mono** (mono)

## Design — COSMIC AFRICAN SOUL

| Token | Hex | Role |
|---|---|---|
| `--color-foundation` | `#080808` | Architecture — the cosmic field |
| `--color-solar-gold` | `#C47A00` | Human / founder / agency |
| `--color-electric-teal` | `#00BFA6` | System / product / infrastructure |
| `--color-warm-off-white` | `#F2EDE4` | Soul surface, body text |

Africanfuturist visual grammar — Igbo-Ukwu interlacing circles, Uli body-painting curves, Nsibidi-inspired glyphs — load-bearing, not decoration.

## Get Started

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev
# Open http://localhost:3000

# 3. Build for production
npm run build

# 4. Lint
npm run lint
```

## Project Structure

```
lawrencenwuzor.com/
├── AGENTS.md              ← Read first. Law for any AI touching this repo.
├── CLAUDE.md              ← Claude Code-specific rules.
├── README.md              ← This file.
├── DEPLOY.md              ← Deploy runbook.
├── .cursor/rules/         ← Cursor AI rules.
├── src/
│   ├── app/
│   │   ├── page.tsx                ← Homepage (one-page scroll)
│   │   ├── layout.tsx              ← Root layout, metadata, fonts
│   │   ├── globals.css             ← COSMIC AFRICAN SOUL @theme tokens
│   │   ├── not-found.tsx · loading.tsx · error.tsx
│   │   ├── sitemap.ts · robots.ts
│   │   └── projects · writing · now · empire · uses · press · give
│   ├── components/
│   │   ├── ui/        ← OrbitalMark, TerminalLabel, buttons, glyphs
│   │   ├── layout/    ← Nav, Footer
│   │   ├── motion/    ← SectionReveal, motion-primitives
│   │   └── sections/  ← Hero, About, Projects, Skills, Empire, Contact
│   └── lib/           ← cn, motion variants
└── public/            ← static assets
```

## Voice

Inherits from `components/voices/founder-direct.md` v1.2.0 in the Empire vault.
First person throughout. Diagnose → elevate. Specifics carry the weight.
Banned words list lives in `.cursor/rules/050-copy-brand.mdc`.

## Deployment

See `DEPLOY.md` for the full runbook. Short version:

```bash
npm install -g vercel
vercel link
vercel --prod
```

Then point `lawrencenwuzor.com` DNS at Vercel.

## Status

**v0.1 — Foundation shipped 2026-05-09.**
Homepage live with all six sections (Hero · About · Projects · Skills · Empire · Contact). Stub pages for /projects, /writing, /now, /empire, /uses, /press, /give. Branded 404, loading, error states. SEO baseline.

What's next: case study MDX content, Hashnode API for /writing, opengraph-image.tsx, Resend newsletter signup.

---

© 2026 Lawrence Chigozie Nwuzor · Lagos, Nigeria
