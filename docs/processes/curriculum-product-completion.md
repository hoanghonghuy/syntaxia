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
| English starter | CEFR A1 starter, 4 units / 14 nodes per locale | ready | complete | Language V3 reviewed | green on stabilization baseline |
| Japanese starter | JLPT N5 starter, 5 units / 16 nodes per locale | ready | complete | Language V3 reviewed | green on stabilization baseline |
| Chinese IT specialty | 6 mapped workplace-technology lessons per locale | ready | complete | Language V3 specialty gate added on `feature/curriculum-product-completion` | **pending Product CI for this branch** |

The baseline referenced above is commit `d677c898d49f01fcaa9e79e4c6bcfaf010f3020d`, whose Product CI was green before this curriculum-completion branch began.

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
- `english-basics` is currently a complete **starter A1 slice**, not full CEFR A1 coverage.
- `chinese-hsk` is currently a complete **Band 1 starter path**, not the whole HSK system.
- `japanese-jlpt` is currently a complete **N5 starter path**, not full JLPT N5 exam preparation.
- `chinese-it-vocab` is a six-lesson **specialty mini-course** constrained by its cited term map.

Expansion begins by creating/updating a public-reference curriculum map and defining a new declared scope. Do not silently change what an existing “complete” label means.

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
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

### Release

The canonical Product CI must then pass API tests/vet, web build/regression, curriculum gates, and PostgreSQL-backed E2E including sandboxes and FSRS persistence.

## Current branch objective

`feature/curriculum-product-completion` exists to close product-level curriculum gaps without mixing them into the stabilization PR. The first concrete gap is the legacy `chinese-it-vocab` authoring model; all six lessons are being migrated to the Language V3 specialty contract and included in the canonical V3 test command.

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`release-hardening.md`](./release-hardening.md)
