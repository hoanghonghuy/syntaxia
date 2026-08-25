# Curriculum product completion

## Purpose

Define what “complete” means for a Syntaxia learning product and separate product quality from raw lesson counts.

A track is not complete merely because files exist or the parser accepts them. Completion is always evaluated within an explicitly declared scope.

## Product states

| State | Meaning |
|-------|---------|
| **engine-ready** | Player/sandbox, parser, persistence and rendering required by the track exist with regression coverage. |
| **content-complete** | Every item in the declared map is authored in EN/VI with no placeholder/stub nodes. |
| **quality-reviewed** | Content passes the domain pedagogy contract: mental model or language foundation, examples/visuals, interactions, feedback, recall/production, parity and stable grading identity. |
| **production-ready** | All previous states are true and canonical Product CI + DB-backed release gate are green for the exact promoted commit. |

Do not use `complete` or `production-ready` without naming the bounded product scope when the track name could imply a larger curriculum.

## Production baseline before the current branch

Production `main` at merge commit `a91d9c8c4e4bc14ee3ad92e13ab5c75fe5ecbcf2` passed Product CI #93 after the `develop → main` release promotion.

| Product | Production scope |
|---------|------------------|
| SQL Fundamentals | 42 portable-SQL lessons |
| PostgreSQL | 19 PostgreSQL-specific lessons |
| JavaScript Basics | 9 fundamentals lessons |
| HTML Basics | 12 semantic-HTML lessons |
| CSS Basics | 14 fundamentals-through-Flexbox lessons |
| Mandarin Level 1 foundation | Pronunciation Unit 0 + 11 communicative units / 41 nodes per locale |
| English A1 foundation | 8 communicative units / 30 nodes per locale |
| Japanese N5 foundation | 9 communicative units / 28 nodes per locale |
| Chinese IT specialty | 6 workplace-technology lessons per locale |

The current feature branch intentionally expands the declared English product from this production baseline; it must not be called production-ready until its exact head passes the full gate.

## Current feature objective

Branch: `feature/interactive-learning-map-english-foundation`.

Two related product improvements are scoped together:

1. make the existing circular homepage learning map an accessible, catalog-driven navigation surface without changing its visible `SQL / Web / JS / EN / 中文 / 日本語` labels;
2. deepen `english-basics` from a situation-first 8-unit/30-node path into a language-first **9-unit/35-node CEFR A1 foundation**.

## Domain-specific quality bars

### IT / code / web

A production lesson must make the learner reason about the concept:

`mental model / visual structure -> predict -> worked example -> trace or inspect -> debug -> build/try -> immediate feedback -> quick recall`

Current IT verifiers lock the relevant sequence, progressive hints, canonical solution and EN/VI parity. Executable tracks are exercised through release sandbox E2E.

### Core languages

A core language product must make the language system explicit before and during communicative work:

`sound / pronunciation -> vocabulary -> grammar / sentence pattern -> listening -> interaction -> controlled speaking/writing -> checkpoint -> delayed retrieval`

Communicative nodes then combine those layers:

`scene -> listen / notice -> understand -> interact -> controlled production -> checkpoint -> later retrieval`

Can-Do outcomes remain the observable destination; they are not a replacement for pronunciation, vocabulary or grammar progression.

### Specialty language

Specialty terminology must be embedded in a realistic work action. Specialty tracks do not substitute for core-language foundations.

## Current declared scopes

| Product | Declared scope on current feature branch | Engine | Content/quality state | Release |
|---------|------------------------------------------|--------|-----------------------|---------|
| SQL Fundamentals | 42 lessons | ready | unchanged / reviewed | production baseline green |
| PostgreSQL | 19 lessons | ready | unchanged / reviewed | production baseline green |
| JavaScript Basics | 9 lessons | ready | unchanged / reviewed | production baseline green |
| HTML Basics | 12 lessons | ready | unchanged / reviewed | production baseline green |
| CSS Basics | 14 lessons | ready | unchanged / reviewed | production baseline green |
| Mandarin Level 1 | 41 nodes/locale | ready | unchanged / reviewed | production baseline green |
| **English A1** | **Foundation Unit 0 + 8 communicative units / 35 nodes per locale** | ready | authored; static/runtime gates updated | **pending exact feature CI** |
| Japanese N5 | 28 nodes/locale | ready | unchanged / reviewed | production baseline green |
| Chinese IT specialty | 6 lessons/locale | ready | unchanged / reviewed | production baseline green |

## English foundation quality lock

The expanded English product contains exactly **9 units / 35 nodes per locale**.

### Unit 0 — language foundations

1. `sound-spelling` — listening before spelling assumptions; a small guided sound contrast;
2. `word-stress` — main beat in familiar words, aimed at intelligibility;
3. `core-be` — subject pronouns, `am/is/are`, contractions, a basic negative and yes/no question;
4. `foundation-checkpoint` — mixed sound/stress/grammar assessment;
5. `foundation-review` — delayed retrieval.

### Units 1–8 — communicative application

The historical 30 nodes remain intact and retain their published IDs/orders. They cover meeting, people/family, navigation, café ordering, routine/time, shopping, home/location and free-time planning.

The English map now locks representative cumulative grammar progression rather than allowing grammar to appear only incidentally. Vocabulary is introduced in everyday contexts and reused across later units.

### Backward compatibility

Unit 0 uses `unit_order: 0` and sort orders `-5..-1`. Existing Units 1–8 are not renumbered. Generic language frontier logic means:

- a new learner starts with Unit 0;
- a returning learner already beyond that point is not silently rewound;
- Unit 0 remains available for catch-up.

## Homepage learning-map quality lock

The circular map is part of the homepage navigation rather than decorative markup:

- visible labels remain `SQL`, `Web`, `JS`, `EN`, `中文`, `日本語`;
- catalog categories/target-language profiles resolve the actual tracks dynamically;
- language chips prefer the first/core catalog track for that target language, so later Chinese specialty tracks do not replace core Mandarin;
- single-track chips can continue the authenticated learner’s next lesson;
- multi-track chips route to a catalog filtered by live category/domain;
- authenticated progress is derived from real lessons/progress and reflected subtly in the chip;
- center `S` links to the full catalog;
- keyboard focus, accessible labels and reduced-motion behavior are required.

The resolver must not hard-code `english-basics`, `chinese-hsk` or `japanese-jlpt` route IDs.

## Verification ownership

### IT curriculum

```bash
node scripts/verify-sql-fundamentals.mjs
node scripts/verify-postgresql-v2.mjs
node scripts/verify-javascript-v2.mjs
node scripts/verify-html-v2.mjs
node scripts/verify-css-v2.mjs
```

### Language / web

```bash
cd apps/web
npm run build
npm run test:ui-refresh
npm run test:english-basics
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

### Release

Canonical Product CI must prove on the exact feature head:

- curriculum structure/parity;
- cold Go tests + vet;
- Nuxt production build and UI regression;
- English exact 35-node EN/VI inventory and Unit 0 runtime metadata;
- PostgreSQL-backed cross-domain E2E/sandboxes;
- progress and notes persistence;
- FSRS review persistence across current language products.

Only after that exact head is green may this feature’s expanded English scope be marked production-ready.

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`english-basics-pedagogy.md`](./english-basics-pedagogy.md)
- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
