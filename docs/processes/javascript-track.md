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

### Basic (scaffold — publish first)

| Order | Slug | Topic | MDN map | Status |
|------:|------|-------|---------|--------|
| 0 | `what-is-javascript` | What JavaScript is and where it runs | What is JavaScript? | **Published** (scaffold) |
| 1 | `variables` | Storing values with `let` / `const` | Variables | **Published** (scaffold) |
| 2 | `numbers-and-operators` | Numbers and basic operators | Basic math — numbers and operators | **Published** (scaffold) |

### Next basics (future — document only)

| Order | Slug (planned) | Topic | MDN map |
|------:|----------------|-------|---------|
| 3 | `strings` | Creating and joining text | Handling text — strings |
| 4 | `string-methods` | Length, slice, replace (intro) | Useful string methods |
| 5 | `arrays` | Lists under one name | Arrays |
| 6 | `conditionals` | `if` / `else` decisions | Conditionals |
| 7 | `loops` | Repeating work | Loops |
| 8 | `functions` | Reusable blocks | Functions |

Do **not** ship empty published stubs for these. Prefer this list until Depth-B lessons exist.

DOM, events, fetch, JSON, and frameworks stay **out of scope** for this basics track until a later checklist row.

## Sandbox strategy (locked — TDD document first)

| Phase | Behavior |
|-------|----------|
| **Now (#11)** | **No code execution** in the API for JS. Lessons teach with Markdown code fences. Omit `exercise` and `sandbox_seed` (or leave them absent). Learners read + **Mark complete**. Frontend already hides `SqlSandbox` when `lesson.exercise` is missing/falsy. |
| **Later** | Isolated client eval (prefer **Web Worker** / sandboxed iframe), never `eval` on the main thread against untrusted lesson code without isolation. Grade by comparing return values or console-captured output — design under a dedicated process + OpenSpec before building. |
| **Do not** | Reuse the Postgres SQL sandbox for JavaScript. Do not add a server-side Node `vm` runner in this item. |

Authoring rule until a JS sandbox exists: **examples in the body only**; “Your turn” is a short reflection or “re-read then mark complete” — not a graded run.

## Track metadata

- Track id: **`javascript-basics`** (seeded; category `code`, level `basic`)
- Path: `docs/curriculum/javascript-basics/<locale>/<slug>.md`
- Frontmatter: `track: javascript-basics`, `order` 0, 1, 2 for the three published basics

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
- [`sql-sandbox.md`](./sql-sandbox.md) (SQL only — not for JS)
- `docs/curriculum/javascript-basics/`
- `docs/curriculum/README.md`
