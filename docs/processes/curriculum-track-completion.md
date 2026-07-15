# Curriculum track completion policy

## Purpose

Define when a Syntaxia track counts as **complete** for the current scope, so work finishes one track before starting the next category or outline expansion.

## When to use

- After `/opsx-research` on “what to finish next?”
- Before adding lessons to a new track or reopening a “done” SQL track
- When updating `product-perfection-checklist.md` curriculum rows

## Locked decision (owner + research, 2026-07-15)

**Finish `javascript-basics` through MDN scripting fundamentals (orders 0–8) before any new track or PostgreSQL/SQL expansion.**

### Track status snapshot

| Track | Lessons (en) | Locked outline | Status |
|-------|----------------|----------------|--------|
| `sql-fundamentals` | 36 | W3Schools-density portable SQL | **Complete** — E2E gate + voice pass |
| `postgresql` | 19 | basic→advanced PG-specific (orders 0–6, 10–16, 20–24) | **Complete** — all outline rows published |
| `javascript-basics` | 6 of 9 | MDN Scripting basics (orders 0–8) | **In progress** — missing 6–8 |

Do not start a second code track or widen SQL tracks until `javascript-basics` hits **Definition of done** below.

### Definition of done — `javascript-basics` (orders 0–8)

1. Publish Depth-B lessons **en + vi** for:
   - `conditionals` (order 6)
   - `loops` (order 7)
   - `functions` (order 8)
2. No `exercise` / `sandbox_seed` (JS sandbox still deferred per `javascript-track.md`).
3. `GET /api/v1/lessons?track=javascript-basics&locale=en` returns **9** lessons in order.
4. `npm run test:i18n` — `javascript-basics` pair gate expects **9** slugs.
5. Update `javascript-track.md`, `docs/curriculum/README.md`, checklist row **#22**.
6. API restart or admin sync after Markdown lands.

**Out of scope for this completion:** DOM, events, fetch, JSON, frameworks, JS code runner (later OpenSpec).

### After `javascript-basics` is done

Re-run `/opsx-research` to pick among:

- Deeper **SQL** (only if a mapped public outline gap exists — not ad-hoc topics)
- **JS sandbox** (OpenSpec — do not bolt on `eval`)
- **Guest static learning** (`future-guest-static-learning.md`)
- Production deploy

## Do

- One track completion slice at a time; TDD gates (i18n pairs, API smoke).
- Map from MDN Scripting order: conditionals → loops → functions.

## Don't

- Publish empty stubs to “fill” the sidebar.
- Attach SQL sandbox JSON to JS lessons.
- Expand `postgresql` or `sql-fundamentals` while `javascript-basics` is incomplete.

## Related

- [`javascript-track.md`](./javascript-track.md)
- [`postgresql-track.md`](./postgresql-track.md)
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [MDN — Dynamic scripting with JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting)
- [MDN — JavaScript fundamentals curriculum](https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/)
