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
| `sql-fundamentals` | 42 | W3Schools-density + closure (orders 0–41) | **Closure in progress** — 6 new lessons live; polish pass ongoing |
| `postgresql` | 19 | basic→advanced PG-specific (orders 0–6, 10–16, 20–24) | **Complete** — all outline rows published |
| `javascript-basics` | 9 | MDN Scripting basics (orders 0–8) | **Complete** (2026-07-16) |

Do not start a second code track or widen SQL tracks until the next `/opsx-research` picks the following slice.

**`javascript-basics` orders 0–8:** complete as of checklist row #22 (2026-07-16).

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

Ordered post-curriculum slices (see [`production-deploy.md`](./production-deploy.md)):

| Order | Slice | Gate |
|------:|-------|------|
| 1 | Deeper SQL | **Skip** — Fundamentals 36 + PostgreSQL 19 complete per outline |
| 2 | JS code sandbox | Row **#24** — `/opsx-research` + OpenSpec before code |
| 3 | Guest static FE | **Deferred** — `future-guest-static-learning.md` |
| 4 | Production deploy | Row **#23** — `release-smoke.ps1` + `production-deploy.md` |

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
