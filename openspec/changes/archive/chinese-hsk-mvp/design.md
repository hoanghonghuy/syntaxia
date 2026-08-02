# Design — Chinese HSK Band 1 MVP

## Approach

Extend the existing Markdown → Drive/local sync → lesson reader path. Add language-specific frontmatter and a **track-gated player** on the lesson page. Content authors map open HSK lists into 5–8 lessons; the app does not invent outlines.

### 1. Curriculum map (before bodies)

**Artifact:** `docs/processes/chinese-hsk-band1-map.md`

- Source: open HSK 3.0 Band 1 vocabulary (community/published lists — cite URLs/licenses in the map doc)
- Output: thematic clusters (e.g. greetings, numbers, people, daily phrases) → lesson `id` / `slug` / target word counts
- Rule: no lesson MD until its cluster is listed in the map

### 2. Frontmatter shape (language lessons)

Mirror IT conventions; add language fields. Example sketch:

```yaml
---
id: zh-hsk-b1-01-greetings
track: chinese-hsk
locale: en   # explain locale
slug: greetings
title: Greetings
order: 1
published: true
hsk_band: 1
hsk_version: "3.0"
objectives:
  - Recognize and use 你好 / 再见
vocab:
  - { hanzi: "你好", pinyin: "nǐ hǎo", gloss: "hello" }
exercise:
  type: mcq   # or fill_blank
  prompt: "Which means hello?"
  choices: ["你好", "再见", "谢谢"]
  answer: "你好"
  hints: ["Tone marks matter in pinyin; here pick the characters."]
---
```

Body Markdown = `text` block (prose). `vocab` + `exercise` come from frontmatter (or fenced blocks later if sync already supports nested YAML only).

**Sync:** Reuse existing curriculum sync; ensure unknown frontmatter keys are preserved in exercise/metadata JSON (verify parser; extend if stripped).

### 3. Lesson page player

**File:** `apps/web/app/pages/tracks/[track]/lessons/[slug].vue` (+ small components)

```
if track === 'chinese-hsk' (or category languages / domain languages):
  render LessonBody (MD)
  render VocabBlock (hanzi · pinyin · gloss)
  render LanguageExercise (MCQ / fill-blank)
  do NOT render SqlSandbox / JsSandbox / HtmlCssSandbox
else:
  existing IT sandbox branch
```

Components (suggested names, keep flat):

- `LanguageVocabList.vue`
- `LanguageExercise.vue`

Grading v1: compare client-side to `exercise.answer` (normalize trim/case for fill-blank Latin; hanzi exact). On correct → existing “mark complete” UX (auth required for persist).

### 4. API

- **Prefer no new sandbox endpoints** for language MCQ.
- Progress/notes: existing endpoints unchanged.
- Catalog: after sync, `GET /tracks` / lessons include `chinese-hsk` published rows.
- Optional later: `POST /sandbox/language/grade` only if server-side answer hiding is required; **v1 ships answers in lesson payload** like some IT hints — acceptable for learning MVP; document risk.

### 5. i18n

- Each lesson duplicated under `en/` and `vi/` with explain-locale prose + gloss.
- UI chrome strings: add keys for vocab/exercise labels if missing.
- Track label: “HSK 3.0 · Band 1” in catalog/hub copy.

### 6. Hub / empty state

- When published lessons exist, Languages hub lists them (remove pure “coming soon” for this track only).
- Placeholder track row may keep `sort_order` 100; content presence drives UX.

## Risks

| Risk | Mitigation |
|------|------------|
| Invented outlines | Map doc cites open lists; review before publish |
| Frontmatter stripped on sync | Test round-trip; extend parser |
| Accidental SQL sandbox on language lesson | Track/category gate + unit test |
| Answer leakage in HTML | Accept for v1; harden later if needed |
| Copyright from textbooks | Author original explain prose; vocab from open lists only |

## Files likely touched

- `docs/processes/chinese-hsk-band1-map.md` (new)
- `docs/curriculum/chinese-hsk/en/*.md`, `.../vi/*.md` (new)
- `apps/web/app/pages/tracks/[track]/lessons/[slug].vue`
- `apps/web/app/components/LanguageVocabList.vue`, `LanguageExercise.vue` (new)
- Curriculum sync / frontmatter types in API or web if needed
- i18n locale JSON
- Tests under `apps/web` (and API sync if parser changes)
- Process docs: pedagogy “related”, roadmap Phase 3 checkboxes

## Non-goals in this design

Talkory FSRS, stroke canvas, CMS admin, English target track.
