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
| English A1 foundation | 8 Can-Do units / 30 nodes per locale | ready | complete | English + Language V3 + golden-unit reviewed | **green in Product CI #61 at `4088cc27c27311b23a466f82941a897c73d639e3`** |
| Japanese N5 foundation | 9 communicative units / 28 nodes per locale | ready | complete on `feature/curriculum-product-completion` | Japanese + Language V3 reviewed by branch gates | **pending full Product CI for current Japanese head** |
| Chinese IT specialty | 6 mapped workplace-technology lessons per locale | ready | complete | Language V3 specialty reviewed | **green in Product CI #15 at `05437da8f223b3589ddbee1894374ef5c4434d7a`** |

The stabilization baseline is `d677c898d49f01fcaa9e79e4c6bcfaf010f3020d`. Subsequent product slices must each prove their exact head through the same full release path.

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
- `english-basics` declares an **8-unit CEFR A1 foundation product** covering meet, introduce, find, order, schedule, buy, locate, and invite; it does not claim exhaustive CEFR A1 or exam preparation.
- `chinese-hsk` is currently a complete **Band 1 starter path**, not the whole HSK system.
- `japanese-jlpt` now declares a **9-unit practical N5 foundation** aligned to basic reading and short daily-life/classroom listening; it does not claim exhaustive JLPT N5 exam preparation, all N5 vocabulary, kanji, or grammar.
- `chinese-it-vocab` is a six-lesson **specialty mini-course** constrained by its cited term map.

Expansion begins by creating/updating a public-reference curriculum map and defining a new declared scope. Do not silently change what an existing “complete” label means.

## English foundation quality lock

The English product contains exactly **8 units / 30 nodes per locale**. Units 5–8 extend the original course without changing earlier IDs/order:

5. `en-a1-routine-05` — ask/tell times and describe a short routine;
6. `en-a1-shopping-06` — ask price, choose, buy, close politely;
7. `en-a1-home-07` — describe a familiar room and locate an object;
8. `en-a1-free-time-08` — state a preference and make a simple plan.

The full Product CI at `4088cc27c27311b23a466f82941a897c73d639e3` proved exact runtime inventory, cross-domain E2E, and an English FSRS card derived from stable authored ID `greet-response-1`.

## Japanese foundation quality lock

The Japanese product now contains exactly **9 units / 28 nodes per locale**. Units 6–9 extend the existing five units without renumbering earlier content:

6. `ja-n5-routine-06` — ask/tell daily routine times;
7. `ja-n5-classroom-07` — follow read/write instructions and ask for repetition;
8. `ja-n5-train-08` — confirm a train destination and understand where to get off;
9. `ja-n5-weekend-09` — state a preference, invite, and make a simple free-time plan.

The source map uses the official JLPT N5 ability description for the reading/listening boundary and OpenJLPT for open vocabulary membership. New semantic scene assets are app-owned, and EN/VI share stable assessed IDs. The release gate additionally requires a Japanese FSRS card from authored item `ja-pol-dialogue-1`.

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
npm run test:japanese-jlpt
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

### Release

The canonical Product CI must pass API tests/vet, web build/regression, curriculum gates, and PostgreSQL-backed E2E including exact live inventories, sandboxes, progress/notes, and FSRS persistence. The current branch requires evidence across Mandarin, English, Japanese, and Chinese IT.

## Current branch objective

`feature/curriculum-product-completion` closes product-level curriculum gaps without mixing them into the stabilization PR. Work completed on the branch so far:

1. **Chinese IT specialty** — migrated all six EN/VI lessons from glossary/MCQ-style authoring to Language V3 specialty sessions, added semantic technology visuals, stable review IDs, and DB-backed FSRS evidence.
2. **English Basics** — expanded the old 4-unit/14-node starter into an 8-unit/30-node A1 foundation mapped to practical Can-Do outcomes; full Product CI #61 is green at `4088cc27c27311b23a466f82941a897c73d639e3`.
3. **Japanese JLPT** — expanded the old 5-unit/16-node starter into a 9-unit/28-node practical N5 foundation with daily-routine, classroom, train, and free-time units, app-owned semantic assets, exact inventory/parity gates, and Japanese FSRS E2E coverage.

The branch remains draft until the exact current Japanese-expanded head passes the complete Product CI release path.

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`release-hardening.md`](./release-hardening.md)
