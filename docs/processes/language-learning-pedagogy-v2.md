# Language learning pedagogy v2 (locked)

## Purpose

Replace the v1 “thematic vocab list + one MCQ” pattern with an **app-style guided path**: communicative units, sentence-first practice, explicit tips, and spaced review — informed by Duolingo, HelloChinese, Busuu, and Syntaxia constraints. Supersedes lesson-shape sections of the v1 pedagogy locks for Chinese / English / Japanese / specialty.

## When to use

- Before any new language curriculum Markdown or player work
- When tempted to add more glossary-style theme lessons
- Before `/syn-propose` / `/syn-apply` for `language-lesson-path-v2`

## Research inputs (2026-08-02)

| Source | Takeaway |
|--------|----------|
| [Duolingo Method whitepaper (2023)](https://duolingo-papers.s3.amazonaws.com/reports/Duolingo_whitepaper_duolingo_method_2023.pdf) | Implicit learning via **phrases/sentences** + short explicit Tips; **spaced repetition** of known items; teach to standards (CEFR) |
| [Duolingo Path whitepaper (2024)](https://duolingo-papers.s3.amazonaws.com/reports/Duolingo_whitepaper_language_read_listen_write_speak_2024.pdf) | Linear **path** (not free tree); units interleave new lessons, **review**, and stories; difficulty ladder recognition → production |
| [Duolingo blog — courses evolving](https://blog.duolingo.com/how-are-duolingo-courses-evolving/) | CEFR Can-Do sequencing; section quizzes; tips for hard-to-notice patterns |
| HelloChinese reviews ([ALR](https://www.alllanguageresources.com/hellochinese-review/), [Languavibe](https://languavibe.com/hellochinese-review/)) | Mandarin-specific: **pinyin/tones first**, units of 3–4 lessons × many micro-exercises; grammar tips; speech/writing optional |
| Busuu Chinese reviews | Lesson = vocab **then quiz in context**; CEFR levels; weak/strong word review |
| Du Chinese / FluentU (as supplement pattern) | Graded **reading/listening input** after starter path — not a replacement for beginner structure |
| Syntaxia v1 (current) | Markdown + `vocab` list + single `mcq`/`fill_blank` — feels like a **glossary**, not a course |

## What is wrong with Syntaxia v1 shape

1. **Word lists without use** — learners see hanzi/gloss but rarely produce or understand **sentences**.
2. **One exercise per lesson** — apps use many short trials (recognition → recall) in one sitting.
3. **No review loop** — Duolingo/Busuu resurface old items; we only “mark complete”.
4. **Themes ≠ Can-Do** — “food words” without “order a drink” / pattern tip.
5. **Expanding themes** without fixing the player **amplifies** the wrong model.

## Locked approach (chốt) — Option C below

### 1. Standards stay; sequence changes

| Track | Coverage standard (map membership) | Path organizing principle |
|-------|--------------------------------------|---------------------------|
| `chinese-hsk` | HSK 3.0 Band 1 lemmas | **Can-Do units** + grammar tips; Mandarin: pinyin/tones awareness before dumping characters |
| `english-basics` | CEFR A1 open lists | CEFR Can-Do units (introduce self, order, ask where…) |
| `japanese-jlpt` | JLPT N5 open map | Can-Do + kana/kanji reading in **sentences** |
| `chinese-it-vocab` | szdict lemmas | Can-Do in **tech contexts** (“describe hardware vs software”), not glossary dumps |

Maps remain the **membership** gate (do not invent lemmas). Maps must also list **unit Can-Do** and **patterns**, not only theme→word tables.

### 2. Unit path (hub UX)

- Track hub shows a **linear path of units** (Duolingo-style guidance), each unit = 1 communicative goal.
- Inside a unit: 3–5 short lessons + optional **review** lesson that reuses prior sentences/lemmas.
- Do **not** add more v1 glossary lessons until at least one unit ships on the v2 player.

### 3. Lesson micro-flow (player)

Every language lesson (all tracks) uses **ordered steps**, not “scroll vocab then one quiz”:

| Step type | Role |
|-----------|------|
| `dialogue` | 2–6 lines of target-language sentences (with reading/pinyin/ipa as needed) |
| `tip` | One short explicit note (pattern, tone, particle, politeness) |
| `teach` | Introduce ≤5 new lemmas **with example sentence**, not bare list |
| `practice` | Micro-exercise: `mcq`, `fill_blank`, `match`, `order_words` (sentence-level preferred) |
| `checkpoint` | End-of-lesson 3–5 items mixing new + **1–2 review** items from earlier in the unit |

**Ladder:** recognition of meaning → select correct sentence/word → produce (fill/order). Audio: Listen via optional `audioUrl` or browser TTS — see [`language-step-audio.md`](./language-step-audio.md). Speech recognition / stroke still deferred.

**Out of v2 first ship:** FSRS/Birdbrain personalization, Stories product, speech recognition, stroke canvas, AI tutor, full Duolingo clone UI chrome.

### 4. Effective study habit (product copy)

Encourage short daily sessions: one lesson (~5–10 min) of many steps > one long glossary page. Completion stays on existing progress API; review lessons count as lessons.

### 5. Content rewrite policy

- **Done (path v2):** all published ZH / EN / JA / specialty IT lessons use `steps`.
- Deprecate bare `vocab`+single `exercise` for **new** content (legacy fields may remain for smoke/API).
- Next product slice: track hub **unit path** chrome — **done** (`language-unit-path-hub`).
- Listen audio — **done** (`language-step-audio`).
- Review session — **done** (`language-review-session`).
- Further: multi-lesson units grouping, FSRS, speech recognition.

## Comparison

| Option | Pros | Cons |
|--------|------|------|
| A. Keep glossary + add more themes | Fast content | User rejected; weak retention |
| B. Full Duolingo clone (FSRS, speech, path chrome) | High fidelity | Huge scope; out of Syntaxia near-term |
| **C. Sentence-step path + Can-Do units + light review** | Matches research; fits Markdown/API; incremental | Requires player + content rewrite |

**Chốt: Option C.**

## Do / Don't

### Do

- Sequence by **Can-Do** + pattern tips
- Prefer **sentence** practice; keep lemma maps for membership
- Interleave **review** steps/lessons
- Freeze new v1 glossary expansions

### Don't

- Ship another theme that is only a word table + one MCQ
- Invent lemmas outside cited maps
- Block v2 on speech/FSRS/stroke

## Related

- [`chinese-hsk-pedagogy.md`](./chinese-hsk-pedagogy.md) — v1; lesson shape superseded by this file
- [`english-basics-pedagogy.md`](./english-basics-pedagogy.md) — same
- [`japanese-jlpt-pedagogy.md`](./japanese-jlpt-pedagogy.md) — same
- [`language-specialty-it-vocab.md`](./language-specialty-it-vocab.md) — specialty content must follow v2 shape
- [`languages-tracks.md`](./languages-tracks.md)
- OpenSpec archive: `openspec/changes/archive/language-lesson-path-v2/`; hub path: `openspec/changes/archive/language-unit-path-hub/`
