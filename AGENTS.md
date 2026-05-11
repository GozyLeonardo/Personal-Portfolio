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

## Voice Reference

This site's copy inherits from `components/voices/founder-direct.md` v1.2.0 in the Lawrence-Empire-500M Obsidian vault. When writing new copy:

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

## When In Doubt

Default to: simpler, cleaner, faster, more branded. When unsure about copy — ask. When unsure about design — ask. When unsure about architecture — re-read `001-core.mdc`.
