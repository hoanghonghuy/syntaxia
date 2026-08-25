# Curriculum product completion

## Purpose

Define what “complete” means for a Syntaxia learning product and keep track status separate from raw lesson counts or implementation checklists.

A track is not complete merely because files exist, the parser accepts them, or a smoke test can open them. Completion is evaluated within an explicitly declared scope.

## Product states

| State | Meaning |
|-------|---------|
| **engine-ready** | The player/sandbox, parser, persistence, and rendering needed by the track exist and have regression coverage. |
| **content-complete** | Every item in the declared curriculum map is authored in EN/VI with no placeholder/stub nodes. |
| **quality-reviewed** | Content passes the domain pedagogy contract: explanations, examples/visuals, interactions, feedback, recall/production, parity, accessibility-oriented authoring, and stable grading identity. |
| **production-ready** | All previous states are true **and** the canonical Product CI + DB-backed release gate are green for the exact commit being promoted. |

Do not use `done`, `complete`, or `production-ready` without naming the scope when a track name could imply a larger curriculum.

## Current declared products

| Product | Declared scope | Engine | Content | Quality | Release |
|---------|----------------|--------|---------|---------|---------|
| SQL Fundamentals | 42 portable-SQL lessons | ready | complete | reviewed by `verify-sql-fundamentals.mjs` | green on stabilization baseline |
| PostgreSQL | 19 PostgreSQL-specific basic→advanced lessons | ready | complete | reviewed by `verify-postgresql-v2.mjs` | green on stabilization baseline |
| JavaScript Basics | 9 MDN-mapped scripting fundamentals lessons | ready | complete | reviewed by `verify-javascript-v2.mjs` | green on stabilization baseline |
| HTML Basics | 12 semantic-HTML fundamentals lessons | ready | complete | reviewed by `verify-html-v2.mjs` | green on stabilization baseline |
| CSS Basics | 14 fundamentals-through-Flexbox lessons | ready | complete | reviewed by `verify-css-v2.mjs` | green on stabilization baseline |
| Mandarin starter | HSK 3.0 Band 1 starter, 9 units / 30 nodes per locale | ready | complete | Language V3 reviewed | green on stabilization baseline |
| English A1 foundation | 8 Can-Do units / 30 nodes per locale | ready | complete on `feature/curriculum-product-completion` | locked by English + Language V3 + golden-unit gates | **pending Product CI for expanded English head** |
| Japanese starter | JLPT N5 starter, 5 units / 16 nodes per locale | ready | complete | Language V3 reviewed | green on stabilization baseline |
| Chinese IT specialty | 6 mapped workplace-technology lessons per locale | ready | complete | Language V3 specialty reviewed | **green in Product CI #15 at `05437da8f223b3589ddbee1894374ef5c4434d7a`** |

The stabilization baseline is `d677c898d49f01fcaa9e79e4c6bcfaf010f3020d`. Chinese IT specialty was subsequently proven through the full Product CI/DB-backed release path at `05437da8f223b3589ddbee1894374ef5c4434d7a` before the English foundation expansion began.

## Domain-specific quality bars

### IT / code / web

A production lesson should make the learner reason about the concept, not just read prose:

`mental model / visual structure -> predict -> worked example -> trace or inspect -> debug -> build/try -> immediate feedback -> quick recall`

Where a sandbox exists, the authored canonical solution must grade successfully and the exercise must expose progressive hints rather than the solution as the starter.

### Languages

A production language lesson is a guided communicative session:

`scene -> listen / notice -> understand -> interact -> controlled recall / production -> checkpoint -> delayed retrieval`

Target-language naturalness, listening behavior, semantic visuals, stable assessed IDs, feedback/remediation, EN/VI intent parity, and FSRS review identity are product requirements rather than optional polish.

### Specialty language

Specialty tracks add a second rule: terminology must be embedded in a realistic work action. A glossary with selection questions is not a complete specialty-language product.

## Course-scope rules

- `javascript-basics` ending at functions is a complete **Basics** product; DOM/events/fetch/async require a separately mapped continuation product.
- `english-basics` now declares an **8-unit CEFR A1 foundation product**. It covers core simple interactions (meet, introduce, find, order, schedule, buy, locate, invite) but does not claim exhaustive CEFR A1 or exam preparation.
- `chinese-hsk` is currently a complete **Band 1 starter path**, not the whole HSK system.
- `japanese-jlpt` is currently a complete **N5 starter path**, not full JLPT N5 exam preparation.
- `chinese-it-vocab` is a six-lesson **specialty mini-course** constrained by its cited term map.

Expansion begins by creating/updating a public-reference curriculum map and defining a new declared scope. Do not silently change what an existing “complete” label means.

## English foundation quality lock

The current English product contains exactly **8 units / 30 nodes per locale**. The first four units are preserved; four new units extend the product without changing existing IDs/order:

5. `en-a1-routine-05` — ask/tell times and describe a short routine;
6. `en-a1-shopping-06` — ask price, choose, buy, close politely;
7. `en-a1-home-07` — describe a familiar room and locate an object;
8. `en-a1-free-time-08` — state a preference and make a simple plan.

Each new unit uses lesson → checkpoint → review structure, semantic scenes, listening, controlled production, stable assessed IDs, and EN/VI parity. The live release gate requires the API to expose exactly 30 English nodes after curriculum sync.

## Verification ownership

### IT curriculum

```bash
node scripts/verify-sql-fundamentals.mjs
node scripts/verify-postgresql-v2.mjs
node scripts/verify-javascript-v2.mjs
node scripts/verify-html-v2.mjs
node scripts/verify-css-v2.mjs
```

### Language curriculum

```bash
cd apps/web
npm run test:english-basics
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

### Release

The canonical Product CI must then pass API tests/vet, web build/regression, curriculum gates, and PostgreSQL-backed E2E including exact live inventories, sandboxes and FSRS persistence.

## Current branch objective

`feature/curriculum-product-completion` closes product-level curriculum gaps without mixing them into the stabilization PR. Work completed on the branch so far:

1. Chinese IT specialty: migrated all six EN/VI lessons from glossary/MCQ-style authoring to the Language V3 specialty contract, added semantic technology visuals, stable review IDs, and DB-backed FSRS evidence.
2. English Basics: expanded the old 4-unit/14-node starter into an 8-unit/30-node A1 foundation mapped to communicative Can-Do outcomes, with new semantic home/free-time visuals and exact inventory/parity gates.

The branch remains draft until the exact expanded English head passes the full Product CI release path.

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`release-hardening.md`](./release-hardening.md)
