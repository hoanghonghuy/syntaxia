# App-wide notebook theme — extend journal style beyond lesson prose

Extend the digital bullet journal / notebook visual language from `.prose-lesson` to the whole Syntaxia UI: canvas grid background, pastel cards/buttons/chips, handwritten display headings (Playpen Sans), larger radii — while keeping Mintlify IA (sidebar/lesson/TOC), Source Sans body text, emerald accent for interactive states, and dark terminal sandbox editors. CSS-token-first, phased across shell → home/catalog → hub pages → sandbox chrome. No doodle stickers/mascots in this change.

## Context

- Change ID: `app-notebook-theme`
- Flow: `sdd`
- Research: `/syn-research` — Studygram notebook (palette constraint, grid under structure) + Mintlify Themes (IA vs skin separation)
- Prior change: `lesson-notebook-style` (tokens + `.prose-lesson` already shipped)
- Decision: Option A — shell + surfaces app-wide, not full kawaii

## Motivation

Learners already see a warm notebook lesson reader. The rest of the app (home, tracks, hubs, chrome) still looks like a plain Mintlify shell, so the experience feels split. Extending the same visual language app-wide increases brand coherence and reduces intimidation for non-technical audiences without changing navigation IA or product rules.

## Scope

- **In:** Global tokens (canvas grid, radii, heading font usage), shell chrome (header/footer/sidebar), shared `.card` / `.btn` / chips, home + track catalog, hub pages (progress/notes/account/search), sandbox panel chrome (not the code editor)
- **Out:** Backend, curriculum content, auth logic, guest sandbox behavior, doodle/sticker/mascot assets, rewriting Mintlify IA
- **Non-goal:** Replacing emerald accent presets; handwritten body text
