# Chinese HSK pedagogy (locked for Syntaxia v1)

## Purpose

Locked decisions for **how** Syntaxia teaches Chinese before any lesson bodies or language player code. Completes Phase 2 of [`multi-domain-roadmap.md`](./multi-domain-roadmap.md).

## When to use

- Before `/opsx-propose` for `chinese-hsk-mvp` / language lesson player
- When tempted to add FSRS, stroke canvas, or AI tutor to the first languages slice
- When mapping HSK vocabulary into units

## Research inputs (2026-07-31)

| Source | Takeaway |
|--------|----------|
| HSK 3.0 standard summaries ([Hacking Chinese](https://www.hackingchinese.com/the-new-hsk-3-0-what-you-need-to-know/), [chinesefor.us](https://chinesefor.us/new-hsk-2021-requirements-levels-3-0-standards/)) | 9 bands / 3 stages; Band 1 ≈ ~300 words / ~syllables·chars·grammar quotas; handwriting listed in standard but exam rollout gradual |
| Beginner Mandarin apps ([HelloChinese vs Duolingo comparisons](https://migaku.com/blog/chinese/duolingo-chinese-review-vs-alternatives)) | Mandarin-specific path: pinyin/tones + short lessons + grammar notes; Duolingo-style alone is weak for tones/characters |
| Talkory `content-strategy.md` / `S05-lesson.md` | HSK 3.0 primary; block renderer (text, vocab, exercise, reading, writing CTA); DB CMS long-term |
| Syntaxia today | Domain `languages` + track `chinese-hsk` placeholder; IT lessons = Markdown + sandbox |

## Locked approach (chốt)

### 1. Standard

- **HSK 3.0 Band 1** is the only content target for the first vertical slice.
- Do **not** invent word lists — import/map from open HSK 3.0 vocab datasets (e.g. community `complete-hsk-vocabulary` / published band lists). Explanations authored in vi/en.
- Label in UI: “HSK 3.0 · Band 1” (not “HSK 1 old”).

### 2. Target × explain languages

| Role | Languages |
|------|-----------|
| **Target** (what you learn) | `zh` (Mandarin, simplified for v1) |
| **Explain** (UI + lesson prose) | `vi` and `en` (same as app i18n) |

Later (Phase 4): learn `en` with explain `vi`/`zh` — same pattern, new track.

### 3. Lesson shape (player)

Reuse Syntaxia **lesson chrome** (learn layout, progress, prev/next) but **not** SQL/JS sandboxes.

v1 block types (Talkory-inspired, minimal):

| Block | Purpose |
|-------|---------|
| `text` | Explain concept / dialogue notes (Markdown, locale = UI) |
| `vocab` | Word list: hanzi · pinyin · gloss (vi/en) |
| `exercise` | MCQ and/or fill-blank graded client-side or thin API |
| `audio` (optional if cheap) | Pronunciation URL; skip if blocking |

**Lesson flow:** short scroll page (mixed) — like HelloChinese “guided short lesson”, not Duolingo infinite skill tree.

**Out of v1:** stroke-order canvas, speech recognition, FSRS engine, AI tutor, full reading passages, Talkory IT-language specialty track.

### 4. Curriculum slice size

- **Not** entire Band 1 (~300 words) in one go.
- First ship: **5–8 lessons**, thematic clusters mapped from Band 1 list (e.g. greetings / numbers / people / daily phrases — exact themes chosen only after sorting the open vocab list by theme/frequency, documented in a future `chinese-hsk-band1-map.md`).
- Track hub stays empty of fake stubs until those lessons exist.

### 5. Content pipeline

| Choice | Decision |
|--------|----------|
| **v1** | **Markdown under `docs/curriculum/chinese-hsk/`** + frontmatter (same sync path as IT) — ship faster, match Syntaxia ops |
| **Later** | Optional DB/CMS import (Talkory-style) if authoring volume needs admin CMS |

Frontmatter should carry: `track`, `locale`, `order`, `objectives`, `hsk_band`, exercise payloads — mirror IT lesson conventions where possible.

### 6. SRS / review

- **v1:** no FSRS. Completion = existing progress API; optional “review vocab from this lesson” = static list on lesson page.
- **Later:** dedicated review domain feature after Band 1 slice proves retention need.

### 7. Writing / characters

- v1: **recognition + pinyin + meaning** in vocab blocks; typed answers in exercises OK.
- Handwriting/stroke: **deferred** (HSK 3.0 mentions it; apps like HelloChinese include it early — we add after core path works).

## Comparison (why this cut)

| Option | Verdict |
|--------|---------|
| A. Full Talkory (SRS + stroke + AI + DB CMS) | Too big; merge risk |
| B. Duolingo-clone gamification only | Weak tones/grammar for Mandarin |
| C. **Markdown lessons + text/vocab/exercise player, HSK 3.0 Band 1 slice** | **Chosen** — fits Syntaxia, maps standard, shippable |
| D. Anki-only / vocab dump | Not a Syntaxia learning path |

## Do

- Research → process lock (this file) → `/opsx-propose chinese-hsk-mvp` → apply
- Ship en+vi explain together for each lesson
- Keep domain = `languages` on the track

## Don't

- Copy copyrighted textbook paragraphs
- Reuse `SqlSandbox` / `JsSandbox` for language drills
- Publish empty MD stubs for the whole Band 1 word list
- Start JLPT or English tracks before Chinese slice ships

## Next OpenSpec

Archived: **[`openspec/changes/archive/chinese-hsk-mvp/`](../../openspec/changes/archive/chinese-hsk-mvp/)**. Main specs: [`openspec/specs/language-lessons/spec.md`](../../openspec/specs/language-lessons/spec.md).

Ops leftover: restart API (or `docker-up`) so curriculum sync loads the 6 Band 1 lessons into Postgres.

## Related

- [`multi-domain-roadmap.md`](./multi-domain-roadmap.md) — Phase 2/3
- [`languages-tracks.md`](./languages-tracks.md)
- [`learning-domains.md`](./learning-domains.md)
- Talkory: `docs/spec/content-strategy.md`, `screens/S05-lesson.md`
