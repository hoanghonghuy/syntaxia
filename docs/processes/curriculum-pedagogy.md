# Curriculum pedagogy (non-technical learners)

## Purpose

How Syntaxia writes SQL Fundamentals lessons so absolute beginners understand them — mapped from SQLBolt / Khan Academy / Mode patterns, not invented from scratch.

## When to use

- Writing or rewriting any lesson Markdown
- Changing exercise UX (hints, preview tables, editor)
- Reviewing whether a lesson is “too sparse”
- Checklist item **Curriculum voice pass**

## Voice (locked)

- Audience: absolute non-tech (never coded).
- Tone: neutral textbook clarity + professional reference (Mode / SQLBolt / Khan). Not chatty AI (“Let’s dive in”, “Amazing”, emoji clusters).
- Locales: `vi` and `en` same quality; ship together.
- Teach carefully: short sentences; define jargon once; spreadsheet analogies when helpful.

## Lesson shape (required — depth B)

1. **Frontmatter `title`** is the only page H1 (UI renders it). Body must **not** start with `# Title` or repeat the title as `#`.
2. **Plain-language hook** — what problem this solves in everyday words (spreadsheet / list analogy).
3. **Visual sample** — Markdown table of the data the learner will query (renders as `lesson-table` in HTML).
4. **Worked example** — one full query + keyword gloss (one short sentence per keyword). Heading: `## Worked example` / `## Ví dụ mẫu`.
5. **Common mistakes** — 2–3 bullets of real beginner errors for this concept. Heading: `## Common mistakes` / `## Lỗi thường gặp`. **Required** on every Fundamentals lesson.
6. **Your turn** — one clear task. Heading: `## Your turn` / `## Thử ngay`.
7. **Exercise frontmatter (required when the lesson has a sandbox exercise):**
   - `exercise.hints` — **2–3** progressive hints (reveal one-by-one in UI)
   - `exercise.solution` — canonical answer SQL (**required**; used after N fails / reveal button)
   - `exercise.preview` — `{ columns, rows }` shown above the editor
   - `exercise.starter`, `exercise.expected`
   - `sandbox_seed` — `ddl` (+ `allow_mutations` + `verify_sql` for DML)

The Markdown renderer skips a leading `#` heading (page UI owns the H1) and renders pipe tables as HTML with class `lesson-table`.

## Track order (SQL Fundamentals)

Aligned with SQLBolt-style progression:

0. What is data / tables / SQL (intro)  
1. SELECT columns  
2. WHERE filter  
3. ORDER BY  
4. JOIN  
5. GROUP BY / aggregates  
6–8. INSERT / UPDATE / DELETE  
9. Tables & columns (schema intro)

## Editor

- Use **CodeMirror 6** + `@codemirror/lang-sql` (mobile-first, lighter than Monaco).
- Hints from `exercise.hints[]`; Ctrl/Cmd+Enter runs query.
- Solution reveal after N attempts or explicit button — see [`sandbox-feedback.md`](./sandbox-feedback.md).

## Do

- Write for someone who has never coded; avoid jargon without a one-line gloss.
- Keep one concept per lesson.
- Ship `vi` and `en` together.
- Keep `expected` / `sandbox_seed` / `verify_sql` correct so grading stays green.
- After curriculum Markdown changes, recreate/restart the API so sync on startup picks up files mounted at `/app/curriculum`.

## Don't

- Duplicate the lesson title as `#` in the body.
- Jump to Postgres-specific features in Fundamentals.
- Invent curriculum outlines unrelated to public references.
- Ship a lesson with an exercise but no `solution` or fewer than two hints.
- Use chatty AI filler or hype.

## Related

- [`product-quality-lock.md`](./product-quality-lock.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`product-baseline.md`](./product-baseline.md)
- [`postgresql-track.md`](./postgresql-track.md)
- [`javascript-track.md`](./javascript-track.md) — Depth B adapted for code; sandbox deferred
- [`sandbox-feedback.md`](./sandbox-feedback.md)
- [`auth-email-local-phase.md`](./auth-email-local-phase.md)
- `docs/curriculum/`
