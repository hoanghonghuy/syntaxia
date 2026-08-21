# UI refresh 2026

## Goal

Keep Syntaxia visually clear, compact, and consistent across IT and language learning without turning screens into documentation pages.

## Copy rule

UI copy should be short and functional:

- title;
- one short supporting line only when needed;
- visible state/progress;
- clear action.

Long explanations belong inside learning content or help documentation, not catalog/home/auth cards.

## Home

- Present IT and Languages as equal top-level learning domains.
- Primary action goes to the learner's next item when available; otherwise to the catalog.
- Use lightweight app-owned visual motion only as orientation/identity, never decoration that blocks content.
- Preserve `prefers-reduced-motion`.
- Domain and featured cards show compact metadata, progress when useful, and one or two actions.

## Catalog and hubs

- Reuse shared shell/card/meta styles instead of redefining them per page.
- Prefer category, level, progress and action over paragraph descriptions.
- Language paths show unit Can-Do plus clear lesson/checkpoint/review state.
- Locked-state detail remains accessible without adding noisy visible copy.

## Auth

- Keep login/register focused on the form.
- Brand, title, fields, errors, primary action, optional provider action, account switch.
- Do not add marketing/tutorial paragraphs above the form.

## Motion

Allowed:

- small hover/focus lift;
- short arrow/progress transitions;
- subtle non-essential idle motion.

Required:

- no essential meaning depends on animation;
- no layout-jumping animation;
- reduced-motion disables non-essential movement.

## Scope

The first refresh covers:

- home;
- home loading skeleton;
- tracks catalog;
- language unit path;
- login/register.

Lesson reader and global shell remain structurally unchanged unless a concrete QA issue requires a change.
