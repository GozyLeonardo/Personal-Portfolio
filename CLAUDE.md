# CLAUDE.md — lawrencenwuzor.com

<!-- Claude Code reads this file automatically -->
<!-- Inherits all rules from AGENTS.md — read that first -->

## Claude-Specific Instructions

- Always read `AGENTS.md` before beginning any task.
- Use the TodoWrite tool to track multi-step tasks.
- Run `npm run build` to verify no TypeScript errors before finishing.
- Run `npm run lint` after generating new components.
- Test new routes with `npm run dev` and check `localhost:3000`.
- Never delete files without explicit instruction.
- When creating components, place them in the correct folder per `AGENTS.md`:
  - `src/components/ui/` — atoms (buttons, labels, glyphs)
  - `src/components/layout/` — nav, footer
  - `src/components/motion/` — client motion wrappers
  - `src/components/sections/` — homepage sections only
- Voice reference: pull from `components/voices/founder-direct.md` in the Empire vault before writing any user-facing copy.
- Brand source of truth: `COSMIC-AFRICAN-SOUL Design Philosophy Manifesto` (May 2026). Override any older brand doc with this.

## Clarifying Questions

When ambiguity arises, ask the operator (Lawrence) using button-format questions if available. Plain-text question lists are deprecated per the Universal Master Context v2.1.0.

## Drive-First Save Protocol

Any new file Claude creates outside this project (e.g., docs, prompts, voice variants) must be deposited to Google Drive Empire Vault first, then mirrored locally. See Universal Master Context for the full protocol.
