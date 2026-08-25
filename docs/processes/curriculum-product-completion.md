# Curriculum product completion

## Purpose

Define what “complete” means for a Syntaxia learning product and keep track status separate from raw lesson counts or implementation checklists.

A track is not complete merely because files exist, the parser accepts them, or a smoke test can open them. Completion is evaluated within an explicitly declared scope.

## Product states

| State | Meaning |
|-------|---------|
| **engine-ready** | The player/sandbox, parser, persistence, and rendering needed by the track exist and have regression coverage. |
| **content-complete** | Every item in the declared curriculum map is authored in EN/VI with no placeholder/stub nodes. |
| **quality-reviewed** | Content passes the domain pedagogy contract: explanations, mental models/visuals, interactions, feedback, recall/production, parity, accessibility-oriented authoring, and stable grading identity. |
| **production-ready** | All previous states are true **and** the canonical Product CI + DB-backed release gate are green for the exact commit promoted to `main`. |

Do not use `done`, `complete`, or `production-ready` without naming the scope when a track name could imply a larger curriculum.

## Production baseline

PRs #4, #5 and #6 have been merged. The production `main` baseline is the release merge commit `a91d9c8c4e4bc14ee3ad92e13ab5c75fe5ecbcf2`, which contains the stabilization and curriculum-completion work previously developed on the feature branches.

The production product scopes at that baseline are:

| Product | Declared production scope | Engine | Content | Quality |
|---------|---------------------------|--------|---------|---------|
| SQL Fundamentals | 42 portable-SQL lessons | ready | complete | IT Learning V2 reviewed by `verify-sql-fundamentals.mjs` |
| PostgreSQL | 19 PostgreSQL-specific basic→advanced lessons | ready | complete | IT Learning V2 reviewed by `verify-postgresql-v2.mjs` |
| JavaScript Basics | 9 MDN-mapped scripting fundamentals lessons | ready | complete | IT Learning V2 reviewed by `verify-javascript-v2.mjs` |
| HTML Basics | 12 semantic-HTML fundamentals lessons | ready | complete | IT Learning V2 reviewed by `verify-html-v2.mjs` |
| CSS Basics | 14 fundamentals-through-Flexbox lessons | ready | complete | IT Learning V2 reviewed by `verify-css-v2.mjs` |
| Mandarin Level 1 foundation | pronunciation Unit 0 + 11 communicative units / **41 nodes per locale** | ready | complete | Mandarin + Language V3 reviewed |
| English A1 foundation | 8 communicative units / **30 nodes per locale** | ready | complete | English + Language V3 reviewed |
| Japanese N5 foundation | 9 communicative units / **28 nodes per locale** | ready | complete | Japanese + Language V3 reviewed |
| Chinese IT specialty | 6 mapped workplace-technology lessons per locale | ready | complete | Language V3 specialty reviewed |

The release promotion candidate passed canonical Product CI before merge. Exact post-merge `main` CI remains a release-health signal and does not redefine curriculum scope.

## Active expansion branch

`feature/home-learning-map-english-foundation` starts from the production release baseline and contains two related product improvements:

1. **Interactive homepage learning map** — preserve the existing `SQL / Web / JS / EN / 中文 / 日本語` visual language while deriving available chips, navigation targets, positions, and progress from live catalog data instead of hard-coded template spans.
2. **English foundation-first A1 progression** — insert a backward-compatible Unit 0 before the existing eight English communicative units.

The active branch changes the declared English product to **9 units / 37 nodes per locale**:

- Unit 0: 7 pronunciation/grammar/checkpoint/review nodes;
- Units 1–8: existing 30 communicative nodes, with all published IDs/orders preserved.

Until canonical Product CI and DB-backed release E2E are green on the exact active-branch head, the **37-node English scope is content-authored and statically quality-locked but not yet promoted production-ready**.

## Domain-specific quality bars

### IT / code / web

A production lesson must make the learner reason about the concept, not just read prose:

`mental model / visual structure -> predict -> worked example -> trace or inspect -> debug -> build/try -> immediate feedback -> quick recall`

The current IT verifiers enforce the relevant sequence across every declared lesson, including Can-Do, mental/execution model, prediction, worked example, debugging, common mistakes, learner task, recall, progressive hints, canonical solution, and EN/VI parity. SQL/PostgreSQL mutation lessons additionally lock mutation/verification behavior. JavaScript, HTML and CSS canonical authored solutions are exercised by the release sandbox gates.

Where a sandbox exists, the authored canonical solution must grade successfully and the exercise must expose progressive hints rather than the solution as the starter.

### Core languages

A core foreign-language product must teach reusable language foundations rather than only presenting situations:

`pronunciation / sound -> high-frequency vocabulary & chunks -> basic sentence grammar -> listening -> interaction / speaking -> reading & writing production -> checkpoint -> delayed retrieval`

A production communicative node then follows:

`scene -> listen / notice -> understand -> interact -> controlled recall / production -> checkpoint -> delayed retrieval`

A pronunciation-focused node may instead use:

`visual sound model -> listen -> discriminate -> recall/type -> checkpoint -> delayed retrieval`

Target-language naturalness, listening behavior, semantic visuals, stable assessed IDs, feedback/remediation, EN/VI intent parity, and FSRS review identity are product requirements rather than optional polish.

The exact order is language-specific: Mandarin needs Pinyin/tone foundations; English needs sound-spelling/stress plus a minimal sentence grammar core; Japanese should eventually harden kana/sound and basic grammar prerequisites without renumbering its published N5 units.

### Specialty language

Specialty tracks are optional additions after or alongside a core language path. Terminology must be embedded in a realistic work action. A glossary with selection questions is not a complete specialty-language product, and specialty terminology must never substitute for the core language foundation.

## Course-scope rules

- `sql-fundamentals` is a closed **42-lesson portable SQL fundamentals** product; PostgreSQL-specific behavior belongs in the PostgreSQL track.
- `postgresql` is a bounded **19-lesson PostgreSQL-specific basic→advanced** product.
- `javascript-basics` ending at functions is a complete **Basics** product; DOM/events/fetch/async require a separately mapped continuation product.
- `html-basics` and `css-basics` are bounded web-foundation products with executable HTML/CSS sandbox exercises; broader web application work belongs in a future separately mapped product.
- `english-basics` on the active branch declares a **9-unit / 37-node CEFR A1 language foundation** with Unit 0 for pronunciation and core sentence grammar; it does not claim exhaustive CEFR A1, a complete grammar/phonology syllabus, or exam preparation.
- `chinese-hsk` declares a **practical Mandarin Level 1 foundation** with an explicit pronunciation Unit 0 plus 11 communicative units; it does not claim exhaustive HSK exam preparation or complete HSK-system coverage.
- `japanese-jlpt` declares a **9-unit practical N5 foundation**; it does not claim exhaustive JLPT N5 exam preparation, all N5 vocabulary, kanji, or grammar.
- `chinese-it-vocab` is a six-lesson **optional specialty mini-course** constrained by its cited term map.

Expansion begins by creating/updating a public-reference curriculum map and defining a new declared scope. Do not silently change what an existing “complete” label means.

## Language foundation quality locks

### English — active branch target

Exactly **9 units / 37 nodes per locale**.

Unit 0 (`en-a1-foundation-00`) uses `unit_order: 0` and sort orders `-7..-1`:

1. `sound-spelling` — sound ↔ meaning ↔ spelling, with IPA as reference support;
2. `word-stress` — strong syllable in familiar beginner words;
3. `sentence-melody` — useful beginner intonation cues for intelligibility;
4. `core-sentences` — subject pronouns, `am/is/are`, contractions, basic one-clause `be` sentences;
5. `basic-questions` — `be` inversion, wh + `be`, and `Do you like …?`;
6. `foundation-checkpoint`;
7. `foundation-review`.

The existing Units 1–8 remain meeting, people, navigation/numbers, café ordering, routine/time, shopping, home/location, and free-time planning. Existing IDs/orders are unchanged. Stable assessed IDs from Unit 0 must enter the same generic FSRS engine as later units.

### Japanese

Exactly **9 units / 28 nodes per locale** in the production baseline. Units cover politeness/requesting, people/family, numbers, food/drink, places, routine/time, classroom interaction, train travel, and free-time planning. The source map keeps the official N5 ability boundary separate from open vocabulary cross-checks.

### Mandarin

Exactly **41 nodes per locale**:

- Unit 0 pronunciation foundation: `pinyin-syllables`, `tones`, `tone-changes`, `pronunciation-checkpoint`, `pronunciation-review`;
- Units 1–11: the existing practical communicative foundation.

Unit 0 uses `unit_order: 0` and sort orders `-5..-1` without renumbering published Unit 1+ identities. The API/parser/web contract preserves zero as a real unit order. App-owned diagrams visualize syllable structure, tone contours, and canonical spelling versus connected speech.

## Backward-compatible language expansion

Inserting an earlier language foundation must not fabricate progress or rewind a returning learner's established frontier:

- new learners start at the new first curriculum node;
- returning learners continue after their furthest completed published node;
- inserted earlier nodes remain available for catch-up;
- if the forward frontier is exhausted, remaining gaps become available/current normally.

This behavior is generic and must not be hard-coded to Mandarin or English.

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
npm run test:chinese-hsk
npm run test:english-basics
npm run test:japanese-jlpt
npm run test:chinese-it-vocab
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

### Release

Canonical Product CI verifies:

- Go module graph, cold `go test -count=1`, and vet;
- Nuxt production build and product/UI regressions;
- exact curriculum structure and EN/VI parity;
- Language V3 unit/path/audio/review contracts;
- PostgreSQL-backed exact live inventories;
- SQL, JavaScript and HTML/CSS sandbox execution;
- progress and notes persistence;
- FSRS review synchronization and persisted cards/logs across Mandarin, English, Japanese and Chinese IT.

The cold Go-test requirement is intentional: drive-package smoke tests may read `docs/curriculum` outside the Go package cache key, so cached package results must never hide curriculum changes.

For the active English branch, release E2E must additionally prove:

- `english-basics = 37` live nodes per locale;
- Unit 0 exposes `unitOrder: 0` through the API;
- `en-fnd-sound-hear-meet` synchronizes into and persists through the FSRS review engine;
- homepage learning-map changes pass build/UI/a11y regressions.

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md)
- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)
- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`release-hardening.md`](./release-hardening.md)