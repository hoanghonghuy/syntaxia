# JavaScript Basics track

## Purpose

Locked outline and authoring rules for the **javascript-basics** track: MDN-mapped first steps for absolute beginners, with **Web Worker sandbox** exercises on all 9 lessons.

## When to use

- Adding or rewriting lessons under `docs/curriculum/javascript-basics/`
- Planning later JS topics (DOM, events, fetch, …)
- Product-perfection checklist **#11–#24** and quality slice **#25**

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

## Sandbox strategy (shipped — #24)

| Layer | Behavior |
|-------|----------|
| **Execution** | Web Worker + `JsSandbox.vue` — see [`javascript-sandbox.md`](./javascript-sandbox.md) |
| **Curriculum** | All **9** lessons ship `exercise` (starter, hints, solution, expected) en+vi — map [`javascript-basics-w3schools-map.md`](./javascript-basics-w3schools-map.md) |
| **Progress** | Pass grade → auto `setProgress(true)` — see [`progress-sandbox-sync.md`](./progress-sandbox-sync.md) |
| **Do not** | Reuse Postgres SQL sandbox or server-side Node `vm` runner |

**Starter quality:** `exercise.starter` must be **incomplete** (TODO comment / missing logic). Solutions stay in `solution` only.

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
6. **Your turn** — point at the JS sandbox; pass grade marks lesson complete.
7. `exercise` with `returnValue` or `console` expected — **no** `sandbox_seed`. Do **not** put SQL-shaped exercise JSON on these lessons.

## Steps (author a lesson)

1. Pick the next slug from the locked outline (MDN order).
2. Write Depth-B body (en + vi together) with JS fences.
3. Add `exercise` with incomplete starter + 3 hints + solution + expected.
4. Recreate/restart API so startup sync picks up `/app/curriculum` (or admin sync).
5. Verify: `GET /api/v1/lessons?track=javascript-basics&locale=en` returns the published lessons; `check-js-sandbox.ps1` grades solutions.

## Do

- Map MDN Scripting; one concept per lesson.
- Ship `vi` and `en` together.
- Keep starters incomplete; solutions in `solution` only.

## Don't

- Invent a long syllabus unrelated to MDN.
- Attach SQL `sandbox_seed` / SQL `exercise.expected` to code lessons.
- Publish empty stubs that clutter the learner path.
- Duplicate the frontmatter `title` as `#` in the body.

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md) (#11–#25)
- [`javascript-sandbox.md`](./javascript-sandbox.md)
- [`progress-sandbox-sync.md`](./progress-sandbox-sync.md)
- [`javascript-basics-w3schools-map.md`](./javascript-basics-w3schools-map.md)
- [`sql-sandbox.md`](./sql-sandbox.md) (SQL only — not for JS)
- `docs/curriculum/javascript-basics/`
- `docs/curriculum/README.md`
