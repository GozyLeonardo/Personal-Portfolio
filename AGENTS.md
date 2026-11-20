# AGENTS.md — lawrencenwuzor.com

## READ THIS BEFORE TOUCHING ANY FILE

This is the personal portfolio and empire front of Lawrence Nwuzor (@GozyLeonardo), a software engineer and founder from Lagos, Nigeria.

You are an AI agent assisting on this project. These rules are LAW. Violating them wastes the operator's time. Comply completely and immediately.

## Project Identity

- Domain: **lawrencenwuzor.com**
- Stack: Next.js 15 (App Router), TypeScript strict, Tailwind v4, Motion v12
- Tagline: **"Building what shouldn't work from where it shouldn't."**
- North star: front of a $500T empire. Build accordingly.
- Design philosophy: **COSMIC AFRICAN SOUL** (canonical — never substituted)

## Brand Tokens (CSS variables — never invent others)

- `--color-foundation` `#080808` — cosmic field, the architecture of the universe
- `--color-solar-gold` `#C47A00` — human / founder / agency moments
- `--color-electric-teal` `#00BFA6` — system / product / infrastructure moments
- `--color-warm-off-white` `#F2EDE4` — soul surface, body text
- `--color-surface` `#0F0F10` — cards, surfaces one step up from foundation
- `--color-line` `#1F1E1B` — borders, hairlines

## Type Stack

- Display: **Ojuju Bold** (Lagos type foundry — fallback Space Grotesk)
- Headlines: **Space Grotesk**
- Body: **Inter**
- Mono / labels: **IBM Plex Mono**
- Iconographic ornaments: **Akagu Neo-Nsibidi** (load only when used)

## Visual Grammar (Africanfuturist — load-bearing, not decoration)

- Igbo-Ukwu interlacing circles — primary geometry
- Uli body-painting curves — section dividers
- Nsibidi-inspired glyphs — section markers
- Foundation Black as cosmic architecture — the material of the universe

### Blog posts — full standard + series classification

Locked in. Every post follows this, no exceptions.

**Series selection — decide BEFORE writing, every time.** Classify the post first; the series is not an afterthought.

- **Signal & Noise** (`signal-and-noise`) — a build log. The subject is a *specific build/deliverable*: a client project, a product, a tool, an automation. Concrete technical work, code, real errors, real decisions. "What I built. What broke. What I learned."
- **The Long Becoming** (`the-long-becoming`) — a personal narrative. The subject is the *self / the journey*, even when triggered by a build: ownership and the sovereignty pivot, direction changes, parking/letting go, faith, family legacy, the daily practice, seasons of becoming. "Who I am, told in parts."

Rule of thumb: if the lesson is about the work → Signal & Noise. If the lesson is about Lawrence → The Long Becoming.

**Voice** — founder-direct:
- First person. Past-tense build-log narrative (the day's work, then the lesson).
- Diagnose the brutal truth → state what was built → what broke → what was learned.
- Specifics carry the weight: dates, numbers, named tools, named actions, real errors.
- No banned words (utilize, leverage, delve, "game-changer", etc.). No emoji. No exclamation marks.
- Short paragraphs. Two-clause compression.

**Structure** (in order):
1. Opening diagnosis — the problem as a brutal truth, one or two lines.
2. What I built — concrete, with code/specifics where it serves.
3. What broke — the honest failures, the real errors.
4. What I learned — the elevation, one or two aphoristic lines max.

**Frontmatter**: `title` (I [verb] [specific]), `publishedAt`, `excerpt` (one-sentence specific hook), `coverImage`, `status: published`, `series: signal-and-noise`, `seriesOrder` (next sequential).

**Cover graphics — images only, no typography, NEVER repeated.**
- NO text of any kind — no title, no eyebrow, no stat labels, no words.
- **Every cover must be a UNIQUE composition. Never repeat a design or fall back to a default layout across posts.** Two posts must never share the same visual.
- Vary the concept per post — different geometry, motif, composition, negative space, palette emphasis — while staying inside Cosmic African Soul (Foundation Black, Solar Gold, Electric Teal, Warm Off-White; Igbo-Ukwu / Uli / Nsibidi grammar). Do not re-use the same "circles + Okavango" default every time.
- 1280×720 PNG. The visual carries the weight alone; title/excerpt live in metadata, never in the image.

## Voice Reference

This site's copy inherits from `components/voices/founder-direct.md` v1.2.0 in the Lawrence-Empire-500M Obsidian vault. The in-repo, always-applied rule file is `.cursor/rules/050-copy-brand.mdc` — **read it before writing any copy, every time, no exceptions.** When writing new copy:

- First person throughout the site (third person ONLY on /press)
- Diagnose the brutal truth, then state the elevation
- Two-clause compression. Triadic verb stacks. Specifics carry the weight.
- Civilizational scale. Counter-factual restoration ("continuation, not catch-up")
- Banned words: utilize, leverage, delve, "in today's fast-paced", "game-changer", "unlock", "passionate about", "I love", "amazing", any AI cliché

## Rules That Cannot Be Broken

1. Read `.cursor/rules/001-core.mdc` before generating any code.
2. Server Components by default. `"use client"` only at leaf level.
3. `await` `params`, `searchParams`, `cookies()`, `headers()` — they are Promises.
4. Import Motion from `"motion/react"` — never `"framer-motion"`.
5. No `tailwind.config.js` — Tailwind v4 uses `@theme` in `globals.css`.
6. Named exports only. No TypeScript `any`.
7. No hardcoded hex colors — use CSS variables from `globals.css`.
8. No lorem ipsum or placeholder copy in any committed file.
9. Write ALL copy in the founder voice — read `.cursor/rules/050-copy-brand.mdc` before writing a single line of copy.

## When Given a Task

1. Understand the full context before generating.
2. Ask clarifying questions if the task is ambiguous (in button format if available).
3. Generate clean, complete, production-ready code.
4. Do not add features or files not explicitly requested.
5. Do not refactor code not related to the task.
6. Do not leave TODOs in committed code.

## Pages

`/` (home, one-page scroll: Hero · About · Projects · Skills · Empire · Contact) · `/projects` · `/projects/[slug]` · `/writing` · `/now` · `/empire` · `/uses` · `/press` · `/give`

## Files That Must Never Be Deleted

- `src/app/globals.css` (brand tokens — CANONICAL)
- `src/components/ui/OrbitalMark.tsx` (brand identity mark)
- `src/components/motion/SectionReveal.tsx` (animation system entry)
- `src/lib/motion.ts` (motion variants)
- `AGENTS.md` (this file)
- `.cursor/rules/001-core.mdc` (the law)
- `.cursor/rules/050-copy-brand.mdc` (brand voice — the law for all copy)

## Memory (Automatic)

Every commit is automatically logged to `CHANGELOG.md` by `.githooks/post-commit`
(a date + commit message + hash line). This is the canonical record of what
changed and when — read it for context before starting any task.

- If the hook isn't active on a fresh clone, run: `git config core.hooksPath .githooks`
- `SESSION_LOG.md` holds longer-form session notes (what was built, why, what's next).
- Never delete `CHANGELOG.md` or `.githooks/`.

## When In Doubt

Default to: simpler, cleaner, faster, more branded. When unsure about copy — ask. When unsure about design — ask. When unsure about architecture — re-read `001-core.mdc`.
