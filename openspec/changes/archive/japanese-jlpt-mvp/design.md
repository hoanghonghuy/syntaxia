# Design — Japanese JLPT N5 MVP

## Approach

### Vocab normalization

`languageVocabFromLesson` accepts:

- Chinese: `hanzi`, `pinyin`, `gloss`
- English: `word`, `ipa`, `gloss`
- Japanese: `surface` + `reading`, or `kanji` / `kana` aliases → `{ form, reading, gloss, lang: 'ja' }`

### Sync

`ParseLessonFile`: merge `vocab`; if `jlpt_level` present → `exercise.jlptLevel`.

### Lessons

Six slugs per map; `track: japanese-jlpt`; `jlpt_level: n5`; exercise `mcq`/`fill_blank`.

### Hub

Eyebrow `catalog.jlptN5` already wired; migration `011` updates track description when lessons ship.
