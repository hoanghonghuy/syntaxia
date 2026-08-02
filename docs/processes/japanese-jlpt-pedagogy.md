# Japanese (JLPT) pedagogy (locked for Syntaxia placeholder → N5 slice)

## Purpose

Locked decisions for **how** Syntaxia teaches **Japanese as the target language** on track `japanese-jlpt`, before any lesson Markdown. Completes research gate for Phase 4.3 of [`multi-domain-roadmap.md`](./multi-domain-roadmap.md).

## When to use

- Before `/syn-propose` / OpenSpec for `japanese-jlpt-mvp`
- When mapping N5 vocab into thematic lessons
- When tempted to dump full N5–N1 lists as empty stubs

## Research inputs (2026-08-02)

| Source | Takeaway |
|--------|----------|
| JLPT (official) | Levels N5→N1; **no official public word/kanji lists** — community lists are the practical standard |
| [Jonathan Waller / tanos JLPT lists](https://www.tanos.co.uk/jlpt/) (CC BY) | Widely used community N5–N1 vocab/kanji assignments |
| [evanclan/OpenJLPT](https://github.com/evanclan/OpenJLPT) (CC BY-SA 4.0) | Machine-readable N5–N1 vocab + kanji + examples; attributes Waller + KANJIDIC2 / Tatoeba — **primary open dataset for Syntaxia mapping** |
| [jkindrix/japanese-language-data](https://github.com/jkindrix/japanese-language-data) (CC BY-SA 4.0) | Broader aggregated JA data; optional cross-check, heavier than needed for N5 starter |
| Talkory (spec reference) | Dual-lang heritage; Syntaxia reuses language player only — no FSRS/stroke/CMS merge |
| Syntaxia today | Language player (`text` + `vocab` + `exercise`); explain locales = app `vi`/`en`; track placeholder via migration `010` |

## Locked approach (chốt)

### 1. Standard

- Content target: **JLPT N5** thematic starter slice (UI label: “JLPT N5”).
- Do **not** invent word lists — map from **cited open lists** (primary: OpenJLPT N5 / Waller via OpenJLPT NOTICE). Document URLs + licenses in a future `japanese-jlpt-n5-map.md`.
- Author **original** explain prose in vi/en; do not paste commercial textbook chapters.
- Out of first slice: N4+, full N5 dump as stubs, FSRS, stroke-order canvas, speech, AI tutor, Talkory CMS merge.

### 2. Target × explain languages

| Role | Languages |
|------|-----------|
| **Target** (what you learn) | `ja` (modern standard Japanese; lemmas as commonly written for N5 — kanji when expected at N5, else kana) |
| **Explain** (UI + lesson prose) | `vi` and `en` (same as app i18n) |

### 3. Lesson shape (player)

Reuse existing language player (no IT sandboxes). Category `languages` already gates via `isLanguageTrack`.

| Block | Japanese adaptation |
|-------|---------------------|
| `text` | Explain grammar / dialogue notes in explain locale |
| `vocab` | Prefer `surface` (kanji or kana lemma) · `reading` (hiragana) · `gloss` — may also accept `kanji`/`kana` aliases when implementing; IPA unused |
| `exercise` | MCQ / fill-blank (client-side), same as Chinese/English |

**Flow:** short scroll lessons (5–8), same as HSK/English starters.

### 4. Curriculum slice size

- First ship (later OpenSpec): **5–8 lessons**, thematic clusters after sorting open N5 list (e.g. greetings, people, numbers, food, places, daily verbs — exact themes only in map doc).
- Path when ready: `docs/curriculum/japanese-jlpt/{en,vi}/*.md`
- Until map + lessons exist: hub shows under-development / coming soon (0 lessons).

### 5. Content pipeline

- MD v1 under `docs/curriculum/` + local/Drive sync (same as other tracks).
- Pass `?track=japanese-jlpt` on lesson fetch (shared thematic slugs across language tracks).

### 6. What not to do

- Do not invent N5 outlines without the map doc.
- Do not mount SQL/JS/HTML sandboxes on this track.
- Do not merge Talkory SRS/stroke/AI.

## Comparison (research)

| Option | Pros | Cons |
|--------|------|------|
| A. Full Talkory JP merge | Feature-rich | Scope/risk; violates Talkory-as-reference rule |
| B. Full N5 stub dump | Fast catalog fill | Empty spam; invents pacing |
| **C. Placeholder + N5 map later + language player** | Matches Chinese/English path | Content delayed |

**Chốt: Option C.**

## Related

- [`languages-tracks.md`](./languages-tracks.md)
- [`multi-domain-roadmap.md`](./multi-domain-roadmap.md) Phase 4.3
- OpenSpec: `openspec/changes/archive/japanese-jlpt-mvp/`; main spec `openspec/specs/japanese-lessons/`.
