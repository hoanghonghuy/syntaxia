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
| **production-ready** | All previous states are true **and** the canonical Product CI + DB-backed release gate are green for the exact commit being promoted. |

Do not use `done`, `complete`, or `production-ready` without naming the scope when a track name could imply a larger curriculum.

## Current declared products

All products below are green on the exact curriculum branch head `8610a2b0435ae502863836d32716adf58ece9c44` through Product CI #88.

| Product | Declared scope | Engine | Content | Quality | Release |
|---------|----------------|--------|---------|---------|---------|
| SQL Fundamentals | 42 portable-SQL lessons | ready | complete | IT Learning V2 reviewed by `verify-sql-fundamentals.mjs` | **green #88** |
| PostgreSQL | 19 PostgreSQL-specific basic→advanced lessons | ready | complete | IT Learning V2 reviewed by `verify-postgresql-v2.mjs` | **green #88** |
| JavaScript Basics | 9 MDN-mapped scripting fundamentals lessons | ready | complete | IT Learning V2 reviewed by `verify-javascript-v2.mjs` | **green #88** |
| HTML Basics | 12 semantic-HTML fundamentals lessons | ready | complete | IT Learning V2 reviewed by `verify-html-v2.mjs` | **green #88** |
| CSS Basics | 14 fundamentals-through-Flexbox lessons | ready | complete | IT Learning V2 reviewed by `verify-css-v2.mjs` | **green #88** |
| Mandarin Level 1 foundation | pronunciation Unit 0 + 11 communicative units / **41 nodes per locale** | ready | complete | Mandarin + Language V3 reviewed | **green #88** |
| English A1 foundation | 8 Can-Do units / **30 nodes per locale** | ready | complete | English + Language V3 + golden-unit reviewed | **green #88** |
| Japanese N5 foundation | 9 communicative units / **28 nodes per locale** | ready | complete | Japanese + Language V3 reviewed | **green #88** |
| Chinese IT specialty | 6 mapped workplace-technology lessons per locale | ready | complete | Language V3 specialty reviewed | **green #88** |

The stabilization branch head is `d677c898d49f01fcaa9e79e4c6bcfaf010f3020d`; its Product CI #11 is green and PR #4 is Ready for review. The curriculum branch stays draft until that stabilization PR is merged and the final merge head is revalidated.

## Domain-specific quality bars

### IT / code / web

A production lesson must make the learner reason about the concept, not just read prose:

`mental model / visual structure -> predict -> worked example -> trace or inspect -> debug -> build/try -> immediate feedback -> quick recall`

The current IT verifiers enforce the relevant sequence across every declared lesson, including Can-Do, mental/execution model, prediction, worked example, debugging, common mistakes, learner task, recall, progressive hints, canonical solution, and EN/VI parity. SQL/PostgreSQL mutation lessons additionally lock mutation/verification behavior. JavaScript, HTML and CSS canonical authored solutions are exercised by the release sandbox gates.

Where a sandbox exists, the authored canonical solution must grade successfully and the exercise must expose progressive hints rather than the solution as the starter.

### Languages

A production communicative language lesson is a guided session:

`scene -> listen / notice -> understand -> interact -> controlled recall / production -> checkpoint -> delayed retrieval`

A pronunciation foundation may use a domain-appropriate sequence instead:

`visual sound model -> listen -> discriminate -> recall/type -> checkpoint -> delayed retrieval`

Target-language naturalness, listening behavior, semantic visuals, stable assessed IDs, feedback/remediation, EN/VI intent parity, and FSRS review identity are product requirements rather than optional polish.

### Specialty language

Specialty tracks add a second rule: terminology must be embedded in a realistic work action. A glossary with selection questions is not a complete specialty-language product.

## Course-scope rules

- `sql-fundamentals` is a closed **42-lesson portable SQL fundamentals** product; PostgreSQL-specific behavior belongs in the PostgreSQL track.
- `postgresql` is a bounded **19-lesson PostgreSQL-specific basic→advanced** product.
- `javascript-basics` ending at functions is a complete **Basics** product; DOM/events/fetch/async require a separately mapped continuation product.
- `html-basics` and `css-basics` are bounded web-foundation products with executable HTML/CSS sandbox exercises; broader web application work belongs in a future separately mapped product.
- `english-basics` declares an **8-unit CEFR A1 foundation product**; it does not claim exhaustive CEFR A1 or exam preparation.
- `chinese-hsk` declares a **practical Mandarin Level 1 foundation** with an explicit pronunciation Unit 0 plus 11 communicative units; it does not claim exhaustive HSK exam preparation or complete HSK-system coverage.
- `japanese-jlpt` declares a **9-unit practical N5 foundation**; it does not claim exhaustive JLPT N5 exam preparation, all N5 vocabulary, kanji, or grammar.
- `chinese-it-vocab` is a six-lesson **specialty mini-course** constrained by its cited term map.

Expansion begins by creating/updating a public-reference curriculum map and defining a new declared scope. Do not silently change what an existing “complete” label means.

## Language foundation quality locks

### English

Exactly **8 units / 30 nodes per locale**. Units cover meeting, people, navigation/numbers, café ordering, routine/time, shopping, home/location, and free-time planning. Stable assessed IDs feed the generic FSRS engine.

### Japanese

Exactly **9 units / 28 nodes per locale**. Units cover politeness/requesting, people/family, numbers, food/drink, places, routine/time, classroom interaction, train travel, and free-time planning. The source map keeps the official N5 ability boundary separate from open vocabulary cross-checks.

### Mandarin

Exactly **41 nodes per locale**:

- Unit 0 pronunciation foundation: `pinyin-syllables`, `tones`, `tone-changes`, `pronunciation-checkpoint`, `pronunciation-review`;
- Units 1–11: the existing practical communicative foundation.

Unit 0 uses `unit_order: 0` and sort orders `-5..-1` without renumbering published Unit 1+ identities. The API/parser/web contract preserves zero as a real unit order. New app-owned diagrams visualize syllable structure, tone contours, and canonical spelling versus connected speech.

Backward compatibility is part of the product lock: inserting earlier language content must not rewind a returning learner's established frontier. Earlier newly inserted nodes remain available for catch-up, while Continue advances from the furthest completed point. A learner with no prior progress starts at the newly inserted foundation normally.

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

The cold Go-test requirement is intentional: some drive-package smoke tests read `docs/curriculum` outside the Go package cache key, so cached package results must never hide curriculum changes.

## Current branch objective and status

`feature/curriculum-product-completion` closes product-level curriculum gaps without mixing them into stabilization PR #4.

Completed branch slices:

1. **Chinese IT specialty** — six EN/VI V3 workplace-technology sessions with semantic visuals, stable review IDs and FSRS evidence.
2. **English Basics** — expanded the old starter into an 8-unit/30-node A1 foundation mapped to practical Can-Do outcomes.
3. **Japanese JLPT** — expanded the old starter into a 9-unit/28-node practical N5 foundation with routine, classroom, train and free-time units.
4. **Mandarin** — added a five-node pronunciation foundation before the 11 communicative units, bringing the product to 41 nodes/locale; added official Pinyin/proficiency-source boundaries and backward-compatible learner-frontier behavior.
5. **CI/source-of-truth hardening** — exact runtime inventory locks, cold Go curriculum smoke, full DB-backed E2E/FSRS evidence, and synchronized current-scope documentation.

### Exact-head evidence

Product CI #88 at `8610a2b0435ae502863836d32716adf58ece9c44` is fully green: curriculum, API, web, Language V3, PostgreSQL-backed E2E, sandboxes, progress/notes, and persisted FSRS rows.

The branch remains **draft for dependency ordering**, not because of a known failing technical gate: PR #4 must merge to `develop`, then the final PR #5 merge head must be revalidated before PR #5 is marked Ready.

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
