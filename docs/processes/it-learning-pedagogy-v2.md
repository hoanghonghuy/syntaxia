# IT learning pedagogy V2

## Purpose

Define how Syntaxia teaches technical subjects such as SQL, PostgreSQL, JavaScript, HTML, and CSS. This replaces the old pattern of "read a Markdown explanation, then use the sandbox" with a learning loop that makes the learner inspect, predict, debug, build, and recall.

This contract is intentionally separate from language-learning pedagogy. Programming and database skills require executable mental models, code/data tracing, debugging, and progressively less-scaffolded tasks.

## Research anchors

The structure is grounded in public learning paths rather than copied from a language course:

- PostgreSQL Tutorial: start from relational concepts and hands-on querying, then move to joins, aggregates, updates, and more advanced database features.
- SQLBolt: introduce one query concept at a time and end each lesson with an interactive exercise.
- MDN Learn Web Development: combine focused concept lessons with frequent skill checks and less-frequent integrated challenges.

References:

- https://www.postgresql.org/docs/current/tutorial.html
- https://www.postgresql.org/docs/current/tutorial-sql.html
- https://sqlbolt.com/
- https://developer.mozilla.org/en-US/docs/Learn_web_development

## Core learning loop — locked

Every migrated IT lesson follows this cognitive sequence:

**See -> Predict -> Explain -> Debug -> Build -> Recall**

1. **See** — present the concrete artifact first: a table, result set, code snippet, DOM structure, rendered UI, or runtime state.
2. **Predict** — ask the learner to predict output/behavior before revealing the explanation.
3. **Explain** — introduce one mental model and one concept. Explain why the result happened, not only what syntax to type.
4. **Debug** — show a realistic wrong attempt and require the learner to identify the broken assumption or syntax.
5. **Build** — use the sandbox/editor for a task that is close to, but not identical to, the worked example.
6. **Recall** — end with a short concept check that can be answered without copying the example.

The loop may use different UI later, but the authored content must preserve the sequence now.

## Shared lesson contract

### Frontmatter

Keep existing stable identity fields. Migrated lessons also add:

- `can_do`: one observable outcome, written as a learner capability rather than a topic label.
- `objectives`: 2–3 supporting outcomes.
- the existing exercise/grading contract for the domain.

EN and VI variants must keep the same `id`, `track`, `slug`, `order`, exercise data shape, and task difficulty. Vietnamese should be natural technical Vietnamese, not a sentence-by-sentence literal translation.

### Body structure

Do not repeat the frontmatter title as a body H1. Use the following structure where the concept supports it:

- short problem-oriented hook
- `## Mental model` / `## Mô hình tư duy`
- concrete sample artifact
- `## Predict before you run` / `## Dự đoán trước khi chạy`
- `## Worked example` / `## Ví dụ mẫu`
- `## Debug this` / `## Tìm lỗi`
- `## Your turn` / `## Thử ngay`
- `## Quick check` / `## Tự kiểm tra`

Keep paragraphs short. Prefer tables, code, before/after state, and explicit traces over long prose.

## SQL Fundamentals adaptation

SQL is taught as **asking precise questions of data**, not as memorizing keyword definitions.

Each query lesson should make the learner reason about two things separately:

- **result shape** — which columns are returned;
- **row set/order** — which rows survive and in what order when ordering is explicitly requested.

Required practices across the track:

- show the source table before the query;
- ask for a prediction before the final result is explained;
- trace row filtering or grouping when it matters;
- distinguish `SELECT` (output columns) from `WHERE` (row filtering), `ORDER BY` (ordering), and `LIMIT` (row cap);
- show incorrect queries that reflect real beginner misconceptions;
- keep exercises executable in the existing SQL sandbox;
- preserve three progressive hints, canonical solution, preview, expected result, and TEMP seed.

For multi-table lessons, show both source tables and make join matching visible. For aggregates, show how source rows become groups before showing the aggregate result. For DML/DDL, show before/after state and use the existing mutation verification contract.

## PostgreSQL adaptation

The PostgreSQL track assumes portable SQL Fundamentals and focuses on PostgreSQL behavior, not duplicate SQL basics.

Lessons should include, where relevant:

- dialect-specific reason/use case;
- PostgreSQL data type or operator semantics;
- before/after data state;
- query-plan reading for performance topics;
- explicit portability note when syntax is PostgreSQL-specific.

Current PostgreSQL documentation is the primary correctness reference.

## JavaScript adaptation

JavaScript lessons should teach execution, not syntax lists.

Preferred artifacts:

- variable/state snapshots;
- line-by-line traces;
- predicted console output;
- small broken programs;
- function input/output tables;
- DOM state when the concept reaches browser APIs.

A lesson should move from guided tracing to editing/running code, then to a small task without a copyable final answer immediately above it.

## HTML/CSS adaptation

HTML/CSS lessons should connect source code to rendered output.

Preferred loop:

- inspect the target UI or document structure;
- identify the relevant element/style rule;
- predict the visual/semantic effect of a change;
- edit in the existing HTML/CSS sandbox;
- diagnose one broken markup/style example;
- finish with a small integrated change.

For HTML, semantic structure and accessibility meaning matter alongside appearance. For CSS, teach box/layout/style effects with visible before/after states.

## Difficulty progression

Within a track, scaffolding must decrease:

- **Guided:** one concept, strong hints, close example.
- **Controlled:** combine the current concept with one prior concept.
- **Applied:** use several prior concepts to answer a realistic task.
- **Challenge/checkpoint:** minimal scaffolding; learner must choose the approach.

Do not make every lesson an isolated one-line exercise forever. Periodic integrated challenges are required after a coherent block.

## Feedback rules

- Hint 1: point to the concept/decision, not the answer.
- Hint 2: narrow to the relevant syntax/structure.
- Hint 3: show a near-complete pattern or exact correction path.
- Solution reveal is remediation, not a substitute for a successful new attempt.
- Error explanations should identify the learner's misconception when possible.

## Migration order

Current priority is IT curriculum; Language V3 remains paused until this sequence is stable.

1. SQL Fundamentals — migrate Blocks A–G to V2, one coherent block at a time.
2. PostgreSQL — audit correctness against current PostgreSQL docs, then migrate basic -> intermediate -> advanced.
3. JavaScript Basics — convert to trace/debug/build flow and add integrated checkpoints.
4. HTML + CSS Basics — connect source edits to semantic/rendered effects and add integrated challenges.
5. Run cross-track content QA, sandbox regression, mobile/a11y review, and only then resume Language V3.

## SQL Fundamentals migration slices

| Slice | Orders | Focus | Status |
|---|---:|---|---|
| A | 0–7 | intro, SELECT, DISTINCT, WHERE, boolean filters, ORDER BY, LIMIT | in progress |
| B | 8–11 | NULL + INSERT/UPDATE/DELETE | todo |
| C | 12–18 | aggregates + single-table filters | todo |
| D | 19–25 | joins + set operations + GROUP BY | todo |
| E | 26–28 | HAVING + subquery + CASE | todo |
| F | 29–35 | schema/keys/index/view | todo |
| G | 36–41 | closure topics | todo |

A slice is done only when EN/VI content, structural verifier, build, and existing sandbox/grading checks are green.

## Do

- Teach one core concept per lesson, then deliberately retrieve prior concepts.
- Prefer concrete data/code over abstract definitions.
- Ask for a prediction before giving the explanation when output can be reasoned about.
- Include realistic debugging, not intentionally silly syntax errors.
- Keep examples small enough to simulate mentally.
- Keep stable IDs/slugs unless a migration explicitly requires changing them.

## Don't

- Copy the language-learning lesson structure into IT tracks.
- Turn every lesson into a long article before the sandbox.
- Put the final answer immediately before an exercise without first requiring reasoning.
- Add framework/library trivia to fundamentals tracks.
- Mass-generate curriculum before a migrated slice passes its quality gate.

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md) — V1/historical baseline
- [`sql-fundamentals-closure.md`](./sql-fundamentals-closure.md)
- [`postgresql-track.md`](./postgresql-track.md)
- [`javascript-track.md`](./javascript-track.md)
- [`html-css-basics-tracks.md`](./html-css-basics-tracks.md)
- [`sandbox-feedback.md`](./sandbox-feedback.md)
