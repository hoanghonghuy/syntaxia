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
| **production-ready** | All previous states are true **and** canonical Product CI + DB-backed release gate are green for the exact commit promoted to `main`. |

Do not use `done`, `complete`, or `production-ready` without naming the scope when a track name could imply a larger curriculum.

## Production baseline

PRs #4, #5 and #6 have been merged. The production `main` baseline is release merge commit `a91d9c8c4e4bc14ee3ad92e13ab5c75fe5ecbcf2`.

The production product scopes at that historical baseline are:

| Product | Declared production scope | Engine | Content | Quality |
|---------|---------------------------|--------|---------|---------|
| SQL Fundamentals | 42 portable-SQL lessons | ready | complete | IT Learning V2 reviewed |
| PostgreSQL | 19 PostgreSQL-specific basic→advanced lessons | ready | complete | IT Learning V2 reviewed |
| JavaScript Basics | 9 MDN-mapped scripting fundamentals lessons | ready | complete | IT Learning V2 reviewed |
| HTML Basics | 12 semantic-HTML fundamentals lessons | ready | complete | IT Learning V2 reviewed |
| CSS Basics | 14 fundamentals-through-Flexbox lessons | ready | complete | IT Learning V2 reviewed |
| Mandarin Level 1 foundation | pronunciation Unit 0 + 11 communicative units / **41 nodes per locale** | ready | complete | Mandarin + Language V3 reviewed |
| English A1 foundation | 8 communicative units / **30 nodes per locale** | ready | complete | English + Language V3 reviewed |
| Japanese N5 foundation | 9 communicative units / **28 nodes per locale** | ready | complete | Japanese + Language V3 reviewed |
| Chinese IT specialty | 6 mapped workplace-technology lessons per locale | ready | complete | Language V3 specialty reviewed |

The 30-node English and 28-node Japanese values above are intentionally historical. They describe `main` at that release commit and must not be confused with the active branch candidate below.

## Active expansion branch

`feature/home-learning-map-english-foundation` starts from the production release baseline and contains related product-hardening work:

1. **Interactive homepage learning map** — derive available chips, navigation targets, positions, and progress from live catalog data while preserving the familiar `SQL / Web / JS / EN / 中文 / 日本語` visual language.
2. **English foundation-first A1 progression** — insert a backward-compatible Unit 0 before the existing eight English communicative units.
3. **Japanese foundation-first N5 progression** — insert a backward-compatible Unit 0 for kana/sound, mora timing and core sentence grammar before the existing nine communicative units.
4. **Language catalog recovery** — reconcile all application-owned tracks at API startup so long-lived databases cannot silently expose an incomplete language catalog or fail lesson sync on missing track rows.
5. **Locale/content quality hardening** — keep explanation-language copy out of shared pronunciation assets, detect instructional-locale leakage, and require meaningful lexical/chunk depth in normal communicative lessons.
6. **Foundation-first contract hardening** — lock pronunciation/sound, vocabulary, grammar, listening, speaking, reading, writing, and review as deliberate core-language dimensions while keeping specialty terminology optional.

### Active language candidate inventory

| Track | Active authored candidate |
|-------|---------------------------|
| `chinese-hsk` | **41 nodes per locale** — pronunciation Unit 0 + 11 communicative units |
| `english-basics` | **9 units / 39 nodes per locale** — foundation Unit 0 + 8 communicative units |
| `japanese-jlpt` | **10 units / 33 nodes per locale** — foundation Unit 0 + 9 communicative units |
| `chinese-it-vocab` | **6 optional specialty lessons per locale** |

Existing published IDs/orders in English Units 1–8 and Japanese Units 1–9 are preserved. Inserted Unit 0 nodes use `unit_order: 0`; generic learner-frontier behavior keeps returning learners on their established continuation path while leaving earlier prerequisites available for catch-up.

Until canonical Product CI and DB-backed release E2E are green on the **exact active-branch head**, these expanded scopes are authored candidates and must not be promoted as a new production baseline.

## Domain-specific quality bars

### IT / code / web

A production lesson makes the learner reason about the concept rather than only read prose:

`mental model / visual structure -> predict -> worked example -> trace or inspect -> debug -> build/try -> immediate feedback -> quick recall`

The IT verifiers enforce Can-Do, mental/execution model, prediction, worked example, debugging, common mistakes, learner task, recall, progressive hints, canonical solution, and EN/VI parity. SQL/PostgreSQL mutation lessons additionally lock mutation/verification behavior. JavaScript, HTML and CSS canonical authored solutions are exercised by release sandbox gates.

Where a sandbox exists, the authored canonical solution must grade successfully and the exercise must expose progressive hints rather than the solution as the starter.

### Core languages

A core foreign-language product teaches reusable language foundations rather than only presenting situations:

`pronunciation / sound -> high-frequency general vocabulary & chunks -> basic productive grammar -> listening -> interaction / speaking -> reading & writing -> checkpoint -> delayed retrieval`

Every core map deliberately accounts for:

`pronunciation | vocabulary | grammar | listening | speaking | reading | writing | review`

A normal production communicative node then follows:

`scene -> listen / notice -> understand -> interact -> controlled recall / production -> checkpoint -> delayed retrieval`

Foundation-focused nodes may emphasize sound discrimination, writing-system decoding, or sentence construction earlier in the sequence, but still require stable assessed identity, recall/production, checkpoint evidence and later retrieval.

Target-language naturalness, listening behavior, semantic visuals, stable assessed IDs, feedback/remediation, EN/VI intent parity, locale-pure explanatory copy, accessibility, and FSRS review identity are product requirements rather than optional polish.

Language-specific adaptation is explicit:

- **Mandarin** — Pinyin syllables, tones/tone changes, general vocabulary, productive grammar, listening/speaking, gradual Hanzi reading/writing.
- **English** — sound↔spelling, high-value vowel/consonant contrasts, stress/prosody, reusable chunks and a minimal productive sentence core.
- **Japanese** — kana↔sound, long-vowel/small-`っ` mora contrasts, general vocabulary, `です / ます`, starter sentence order/particles, listening/speaking, kana/basic-kanji reading/writing.

### Specialty language

Specialty tracks are optional additions after or alongside a core language path. Terminology must be embedded in realistic work actions. A glossary with selection questions is not a complete specialty-language product, and specialty terminology never substitutes for the core language foundation.

## Course-scope rules

- `sql-fundamentals` is a closed **42-lesson portable SQL fundamentals** product; PostgreSQL-specific behavior belongs in PostgreSQL.
- `postgresql` is a bounded **19-lesson PostgreSQL-specific basic→advanced** product.
- `javascript-basics` ending at functions is a complete **Basics** product; DOM/events/fetch/async require a separately mapped continuation product.
- `html-basics` and `css-basics` are bounded web-foundation products with executable HTML/CSS sandbox exercises.
- `english-basics` on the active branch declares a **9-unit / 39-node CEFR A1 language foundation** with Unit 0 for pronunciation and core sentence grammar; it does not claim exhaustive CEFR A1, a complete grammar/phonology syllabus, or exam preparation.
- `chinese-hsk` declares a **practical Mandarin Level 1 foundation** with pronunciation Unit 0 plus 11 communicative units; it does not claim exhaustive HSK exam preparation or complete HSK-system coverage.
- `japanese-jlpt` on the active branch declares a **10-unit / 33-node practical N5 foundation** with Unit 0 for kana/sound, mora timing and core sentence grammar; it does not claim exhaustive JLPT N5 exam preparation, all N5 vocabulary/kanji, or every grammar point.
- `chinese-it-vocab` is a six-lesson **optional specialty mini-course** constrained by its cited term map.

Expansion begins by creating/updating a public-reference curriculum map and defining a new declared scope. Do not silently change what an existing “complete” label means.

## Language foundation quality locks

### English — active branch target

Exactly **9 units / 39 nodes per locale**.

Unit 0 (`en-a1-foundation-00`) uses `unit_order: 0` and sort orders `-9..-1`:

1. `sound-spelling`;
2. `vowel-contrasts`;
3. `consonant-clarity`;
4. `word-stress`;
5. `sentence-melody`;
6. `core-sentences`;
7. `basic-questions`;
8. `foundation-checkpoint`;
9. `foundation-review`.

Published Units 1–8 remain meeting, people, navigation/numbers, café ordering, routine/time, shopping, home/location, and free-time planning. Their identities/orders are unchanged. Stable assessed IDs from Unit 0 enter the same generic FSRS engine as later units.

Shared pronunciation visuals may contain target English, IPA, or sound symbols but must not inject English instructional prose into a Vietnamese lesson.

### Japanese — active branch target

Exactly **10 units / 33 nodes per locale**.

Unit 0 (`ja-n5-foundation-00`) uses `unit_order: 0` and sort orders `-5..-1`:

1. `kana-sounds` — kana↔sound recognition and reading/typing;
2. `mora-length` — long-vowel and small-`っ` timing contrasts;
3. `core-sentences` — starter `です / ます` sentence building and concrete `は / を / に / で` uses;
4. `foundation-checkpoint`;
5. `foundation-review`.

Published Units 1–9 keep their identities/orders and cover polite requesting, people/family, numbers, café, location, routine/time, classroom interaction, train travel, and free-time planning.

The source map separates the official JLPT N5 ability boundary from open vocabulary/readings provenance. JLPT does not publish an official vocabulary/kanji/grammar syllabus, so community/open lists are never presented as official JLPT authority.

### Mandarin

Exactly **41 nodes per locale**:

- Unit 0 pronunciation foundation: `pinyin-syllables`, `tones`, `tone-changes`, `pronunciation-checkpoint`, `pronunciation-review`;
- Units 1–11: existing practical communicative foundation.

Unit 0 uses `unit_order: 0` and sort orders `-5..-1` without renumbering published Unit 1+ identities. Normal communicative lesson nodes are quality-gated for a reusable pattern and sufficient general lexical/chunk material; focused pronunciation nodes are evaluated by sound coverage rather than arbitrary vocabulary count.

## Backward-compatible language expansion

Inserting an earlier language foundation must not fabricate progress or rewind a returning learner's established frontier:

- new learners start at the new first curriculum node;
- returning learners continue after their furthest completed published node;
- inserted earlier nodes remain available for catch-up;
- if the forward frontier is exhausted, remaining gaps become available/current normally.

This behavior is generic and must not be hard-coded to one target language.

## Runtime catalog compatibility

The bundled curriculum depends on application-owned track metadata. API startup reconciles the built-in catalog **before** lesson sync. The release DB-backed gate simulates an older database by deleting `english-basics`, `japanese-jlpt`, and `chinese-it-vocab` after schema initialization and before API startup. The API must recreate them and expose all required tracks through `/api/v1/tracks` before exact lesson inventory checks pass.

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
npm run test:language-locale-quality
npm run test:language-audio
npm run test:language-review
```

### Release

Canonical Product CI verifies:

- Go module graph, cold `go test -count=1`, and vet;
- Nuxt production build and product/UI regressions;
- exact curriculum structure and EN/VI parity;
- Language V3 unit/path/audio/review/locale-quality contracts;
- PostgreSQL-backed exact live inventories;
- built-in track reconciliation against a simulated long-lived/stale database;
- SQL, JavaScript and HTML/CSS sandbox execution;
- progress and notes persistence;
- FSRS review synchronization and persisted cards/logs across Mandarin, English, Japanese and Chinese IT.

The cold Go-test requirement is intentional: drive-package smoke tests may read `docs/curriculum` outside the Go package cache key, so cached package results must never hide curriculum changes.

For the active branch, release E2E additionally proves:

- `english-basics = 39` live nodes per locale;
- English Unit 0 exposes `unitOrder: 0` and `en-fnd-sound-hear-meet` persists through FSRS;
- `japanese-jlpt = 33` live nodes per locale;
- Japanese Unit 0 exposes `unitOrder: 0` and its authored stable review identity persists through the generic FSRS engine;
- homepage learning-map changes pass build/UI/accessibility regressions;
- built-in catalog recovery works before curriculum synchronization.

Exact Product CI run number and SHA are recorded only after the **final exact candidate head** is fully green. A green run from an earlier head is not release evidence for later content changes.

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