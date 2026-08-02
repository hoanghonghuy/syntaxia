# English Basics pedagogy (locked for Syntaxia v1 slice)

## Purpose

Locked decisions for **how** Syntaxia teaches **English as the target language** on track `english-basics`, before any lesson Markdown. Completes research gate for Phase 4.2 of [`multi-domain-roadmap.md`](./multi-domain-roadmap.md).

## When to use

- Before `/syn-propose` / OpenSpec for `english-basics-mvp`
- When mapping word lists into thematic lessons
- When tempted to dump Oxford 3000 / full A1–B2 into empty stubs

## Research inputs (2026-08-02)

| Source | Takeaway |
|--------|----------|
| CEFR (Council of Europe) | A1 = breakthrough: familiar everyday expressions, introduce self, simple interaction |
| [Cambridge YLE wordlists](https://www.cambridgeenglish.org/Images/wordlists-pre-a1-starters-a1-movers-and-a2-flyers.pdf) (Pre-A1 Starters / A1 Movers) | Thematic + alphabetic lists; **child-exam oriented (ages 6–12)** — useful as *membership check*, not as primary adult syllabus voice |
| [ozbonus/yle-vocabulary-dataset](https://github.com/ozbonus/yle-vocabulary-dataset) (CC BY-SA) | Machine-readable YLE themes (food, school, places…) for clustering |
| [Books4Languages English A1](https://open.books4languages.com/english-a1-vocabulary/) | CEFR-aligned unit themes for adults — **do not copy book prose** (site asserts rights reserved / educator limited rights); use only as theme inspiration |
| Community CEFR-tagged open datasets (e.g. CEFR-J tags) | Extra membership / frequency checks — cite in map doc when used |
| Syntaxia today | Same language player as Chinese (`text` + `vocab` + `exercise`); track placeholder `english-basics` (`008`); explain locales = app `vi`/`en` |

## Locked approach (chốt)

### 1. Standard

- Content target: **CEFR A1** thematic starter slice (label in UI: “CEFR A1”).
- Do **not** invent word lists — map from **cited open lists** (primary: [ozbonus/yle-vocabulary-dataset](https://github.com/ozbonus/yle-vocabulary-dataset) CC BY-SA thematic clusters; optional CEFR-J tagged open sets). Document URLs + licenses in `english-basics-a1-map.md`.
- Author **original** explain prose in vi/en; do not paste Cambridge PDFs or Books4Languages chapter text.
- Out of first slice: full A1 dump, A2+, IELTS/TOEIC tracks, FSRS, speech recognition, AI tutor.

### 2. Target × explain languages

| Role | Languages |
|------|-----------|
| **Target** (what you learn) | `en` (general American or British spelling — pick **one** per track version; v1: **American** spelling in lemmas, note British variants in gloss when needed) |
| **Explain** (UI + lesson prose) | `vi` and `en` (same as app i18n) |

Optional later: explain `zh` for Chinese-first learners — new locale files, not a new track.

### 3. Lesson shape (player)

Reuse existing language player (no SQL/JS sandboxes). Category `languages` already gates via `isLanguageTrack`.

| Block | English adaptation |
|-------|-------------------|
| `text` | Explain grammar / dialogue notes in explain locale |
| `vocab` | `word` · optional `ipa` · `gloss` (vi/en) — extend frontmatter/UI when implementing (hanzi/pinyin fields unused) |
| `exercise` | MCQ / fill-blank (client-side), same as Chinese |

**Flow:** short scroll lessons (5–8), same as HSK starter — not Duolingo infinite tree.

### 4. Curriculum slice size

- First ship: **5–8 lessons**, thematic clusters after sorting open A1 list (e.g. greetings, people, numbers, food, places, daily verbs — exact themes only in map doc).
- Path: `docs/curriculum/english-basics/{en,vi}/*.md`
- Track hub stays “coming soon” until those lessons exist.

### 5. Content pipeline

| Choice | Decision |
|--------|----------|
| **v1** | Markdown + frontmatter (same sync as Chinese/IT) |
| **Later** | CMS only if volume requires |

Frontmatter: `track: english-basics`, `locale`, `order`, `objectives`, `cefr_level: a1`, `vocab`, language `exercise`.

### 6. SRS / audio / writing

- **v1:** no FSRS; progress = existing APIs.
- Audio: optional later (same rule as Chinese).
- Writing: typed answers OK; no speech/handwriting.

## Comparison (why this cut)

| Option | Verdict |
|--------|---------|
| A. Full Oxford 3000 / commercial lists | License risk; too large |
| B. YLE-only child syllabus as product voice | Wrong audience for Syntaxia |
| C. **CEFR A1 thematic MD slice + language player, open cited lists** | **Chosen** — mirrors Chinese HSK cut |
| D. Duolingo-clone gamification only | Weak grammar notes for adult IT learners |

## Do

- Research → this lock → map doc → OpenSpec `english-basics-mvp` → apply
- Ship explain `en`+`vi` together
- Keep `category = languages`, `sort_order` 110

## Don't

- Copy copyrighted textbook paragraphs
- Publish empty stubs for entire A1 lists
- Mount IT sandboxes on English lessons
- Start JLPT before English slice or more HSK by owner priority

## Next OpenSpec

Change: **`openspec/changes/archive/english-basics-mvp/`** — archived; main spec `openspec/specs/english-lessons/`.

Map: [`english-basics-a1-map.md`](./english-basics-a1-map.md).

## Related

- [`languages-tracks.md`](./languages-tracks.md)
- [`chinese-hsk-pedagogy.md`](./chinese-hsk-pedagogy.md) — parallel pattern
- [`multi-domain-roadmap.md`](./multi-domain-roadmap.md) Phase 4.2
- Track seed: `apps/api/migrations/008_english_basics_track.sql`
