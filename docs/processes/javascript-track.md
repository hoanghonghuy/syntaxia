# JavaScript Basics track

## Purpose

Locked outline and authoring rules for the **javascript-basics** track: MDN-mapped first steps for absolute beginners, plus the **deferred sandbox strategy** for non-SQL code lessons.

## When to use

- Adding or rewriting lessons under `docs/curriculum/javascript-basics/`
- Planning later JS topics (strings, arrays, conditionals, …)
- Product-perfection checklist **#11** (scaffold) and later expansions of this track
- Deciding whether a code lesson may ship without a runnable exercise

## Public curriculum map (do not invent)

Primary references:

- [MDN — Dynamic scripting with JavaScript](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting) (current Learn path; formerly “JavaScript first steps” + building blocks)
- [MDN Curriculum — JavaScript fundamentals](https://developer.mozilla.org/en-US/curriculum/core/javascript-fundamentals/)

### Basic (published)

| Order | Slug | Topic | MDN map | Status |
|------:|------|-------|---------|--------|
| 0 | `what-is-javascript` | What JavaScript is and where it runs | What is JavaScript? | **Published** |
| 1 | `variables` | Storing values with `let` / `const` | Variables | **Published** |
| 2 | `numbers-and-operators` | Numbers and basic operators | Basic math — numbers and operators | **Published** |
| 3 | `strings` | Creating and joining text | Handling text — strings | **Published** |
| 4 | `string-methods` | Length, slice, case | Useful string methods | **Published** |
| 5 | `arrays` | Lists under one name | Arrays | **Published** |
| 6 | `conditionals` | `if` / `else` decisions | Conditionals | **Published** |
| 7 | `loops` | Repeating work | Loops | **Published** |
| 8 | `functions` | Reusable blocks | Functions | **Published** |

### Beyond basics (future — document only)

DOM, events, fetch, JSON, and frameworks stay **out of scope** until a later checklist row and `/opsx-research`.

## Sandbox strategy (locked — TDD document first)

| Phase | Behavior |
|-------|----------|
| **Now (#11–#22)** | **No code execution** in the API for JS. Lessons teach with Markdown code fences. Omit `exercise` and `sandbox_seed`. Learners read + **Mark complete**. Frontend hides `SqlSandbox` when `lesson.exercise` is missing. |
| **#24 (shipped)** | **Web Worker** + server grade on **all 9 lessons** — see [`javascript-sandbox.md`](./javascript-sandbox.md), exercise map [`javascript-basics-w3schools-map.md`](./javascript-basics-w3schools-map.md). |
| **Do not** | Reuse the Postgres SQL sandbox for JavaScript. Do not add a server-side Node `vm` runner in this item. |

Authoring rule until a JS sandbox exists: **examples in the body only**; “Your turn” is a short reflection or “re-read then mark complete” — not a graded run.

## Track metadata

- Track id: **`javascript-basics`** (seeded; category `code`, level `basic`)
- Path: `docs/curriculum/javascript-basics/<locale>/<slug>.md`
- Frontmatter: `track: javascript-basics`, `order` 0–8 for published basics (MDN scripting block complete)

## Pedagogy adaptation (Depth B for code)

Follow [`curriculum-pedagogy.md`](./curriculum-pedagogy.md) voice and shape, with these JS-specific swaps:

1. No duplicate H1 (UI owns the title).
2. Plain-language hook (everyday analogy — labels, sticky notes, calculator).
3. **Visual sample** — a small Markdown table of names/values **or** a short labeled example block (not SQL result tables).
4. **Worked example** — one complete `javascript` fence + keyword gloss. Heading: `## Worked example` / `## Ví dụ mẫu`.
5. **Common mistakes** — 2–3 beginner errors. Heading: `## Common mistakes` / `## Lỗi thường gặp`.
6. **Your turn** — clear task; without sandbox, tell the learner what to notice and to mark complete when ready.
7. Omit `exercise` / `sandbox_seed` until a JS runner exists. Do **not** put SQL-shaped exercise JSON on these lessons.

## Steps (author a lesson)

1. Pick the next slug from the locked outline (MDN order).
2. Write Depth-B body (en + vi together) with JS fences; no invented outline topics.
3. Omit exercise fields while sandbox is deferred.
4. Recreate/restart API so startup sync picks up `/app/curriculum` (or admin sync).
5. Verify: `GET /api/v1/lessons?track=javascript-basics&locale=en` returns the published lessons.

## Do

- Map MDN First Steps / Scripting; one concept per lesson.
- Ship `vi` and `en` together.
- Keep lessons readable without a runner (mark complete is enough).
- Document future sandbox isolation before implementing execution.

## Don't

- Invent a long syllabus unrelated to MDN.
- Build a full JS runtime sandbox in checklist #11.
- Attach SQL `sandbox_seed` / SQL `exercise.expected` to code lessons.
- Publish empty stubs that clutter the learner path.
- Duplicate the frontmatter `title` as `#` in the body.

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md) (#11)
- [`javascript-sandbox.md`](./javascript-sandbox.md) (row #24)
- [`javascript-basics-w3schools-map.md`](./javascript-basics-w3schools-map.md) — exercise per lesson
- [`sql-sandbox.md`](./sql-sandbox.md) (SQL only — not for JS)
- `docs/curriculum/javascript-basics/`
- `docs/curriculum/README.md`
