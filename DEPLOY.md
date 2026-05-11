# DEPLOY.md — lawrencenwuzor.com

**Ship runbook. Follow in order. Each phase verifies the previous.**

---

## Phase 0 — One-time machine setup (skip if done)

```bash
# Verify Node 20+ and npm 10+
node --version    # ≥ v20.0.0
npm --version     # ≥ 10.0.0

# Vercel CLI for deploy
npm install -g vercel
```

---

## Phase 1 — Local dev (5 minutes)

```bash
# 1. cd into the project
cd "C:\Users\NEW USER\Documents\Lawrence-Empire-100M\lawrencenwuzor.com"

# 2. Install dependencies
npm install

# 3. Run dev server
npm run dev
```

Open `http://localhost:3000`. You should see:
- Hero with rotating OrbitalMark + tagline
- About section with the "they say the soul of Africa is gone" headline
- Three project cards (Benlaz, SQC, Empire OS)
- Stack + Principles
- Four Directions (Direction 01–04)
- Contact with `mailto:lawrence@lawrencenwuzor.com`
- Branded footer with *"ala still holds the dead"*

If anything looks wrong, run `npm run build` to surface TypeScript errors.

---

## Phase 2 — Push to GitHub (10 minutes)

```bash
# 1. Init git
git init
git branch -M main

# 2. Stage everything
git add .
git commit -m "feat: scaffold lawrencenwuzor.com — COSMIC AFRICAN SOUL v0.1"

# 3. Create the repo on GitHub
#    Manually at https://github.com/new — name: lawrencenwuzor-com (private OR public)
#    Or via GitHub CLI:
gh repo create lawrencenwuzor-com --public --source=. --remote=origin --push
```

If you don't have GitHub CLI, do it via the web UI then:

```bash
git remote add origin https://github.com/GozyLeonardo/lawrencenwuzor-com.git
git push -u origin main
```

---

## Phase 3 — Deploy to Vercel (10 minutes)

```bash
# 1. Link the project
vercel link
#    Answer: link to existing? N
#    Project name: lawrencenwuzor-com
#    Directory: .
#    Override settings? N

# 2. Deploy preview
vercel
#    This gives you a unique preview URL like
#    https://lawrencenwuzor-com-xxx.vercel.app

# 3. Open the preview URL — verify it looks identical to localhost

# 4. Deploy production
vercel --prod
```

You now have a live `*.vercel.app` URL. The site is shipped.

---

## Phase 4 — Connect the domain (15 minutes)

Assumes you own `lawrencenwuzor.com` already.

1. **Vercel Dashboard** → your project → Settings → Domains.
2. Click **Add Domain** → enter `lawrencenwuzor.com`.
3. Vercel shows you DNS records to set. Two options:
   - **Easy:** point your nameservers at Vercel (`ns1.vercel-dns.com` and `ns2.vercel-dns.com`).
   - **Granular:** keep your registrar's nameservers, add an `A` record at `@` to `76.76.21.21` and a `CNAME` at `www` to `cname.vercel-dns.com`.
4. Wait for DNS to propagate (usually 5–60 minutes).
5. Verify SSL — Vercel issues a Let's Encrypt cert automatically. You should see the lock icon at `https://lawrencenwuzor.com`.

---

## Phase 5 — Post-deploy checks (5 minutes)

```bash
# After production deploy, verify these URLs return 200:
# https://lawrencenwuzor.com/
# https://lawrencenwuzor.com/projects
# https://lawrencenwuzor.com/writing
# https://lawrencenwuzor.com/now
# https://lawrencenwuzor.com/empire
# https://lawrencenwuzor.com/uses
# https://lawrencenwuzor.com/press
# https://lawrencenwuzor.com/sitemap.xml
# https://lawrencenwuzor.com/robots.txt
```

In Vercel Dashboard → Analytics → enable **Web Analytics** and **Speed Insights** (free on Hobby).

---

## Phase 6 — What ships in v0.2 (the next 7 days)

Lock these tasks for next week:

1. **Add favicon set** — drop into `/public/`:
   - `favicon.ico` (16+32 multi-size)
   - `apple-touch-icon.png` (180×180)
   - `icon-192.png`, `icon-512.png` for PWA-light support

2. **opengraph-image.tsx** — auto-discovered 1200×630 OG card. Use OrbitalMark + tagline.

3. **Real case study MDX** — flesh out `/projects/benlaz`, `/projects/sqc`, `/projects/empire-os`.

4. **Hashnode integration** — wire `/writing` to fetch from Hashnode API.

5. **Newsletter signup** — Resend route handler. One field. Captures emails.

---

## Troubleshooting

**`Module not found` on first install** — run `npm install` again. The Tailwind v4 beta sometimes needs two passes.

**Tailwind classes not applying** — verify `src/app/globals.css` has `@import "tailwindcss";` at the top and no `tailwind.config.js` exists.

**Motion errors about `framer-motion`** — replace any `framer-motion` import with `motion/react`. The packages diverged.

**Vercel build fails on TypeScript** — run `npm run build` locally first. Fix all type errors before pushing.

---

## Files Lawrence should NEVER delete

- `src/app/globals.css` — COSMIC AFRICAN SOUL tokens
- `src/components/ui/OrbitalMark.tsx` — brand identity mark
- `AGENTS.md` and `.cursor/rules/001-core.mdc` — the AI law
- `src/lib/motion.ts` — animation source of truth

---

*Built with founder-direct.md v1.2.0 voice. Every line of code, a small act of return.*
