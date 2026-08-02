# Design — English Basics CEFR A1 MVP

## Approach

### Vocab normalization

`languageVocabFromLesson` accepts either:

- Chinese: `hanzi`, `pinyin`, `gloss`
- English: `word`, `ipa` (optional), `gloss`

Normalized item: `{ form, reading, gloss }` for `LanguageVocabList`.

### Sync

`ParseLessonFile`: merge `vocab`; if `cefr_level` present → `exercise.cefrLevel`.

### Lessons

Six slugs per map; `track: english-basics`; `cefr_level: a1`; exercise `mcq`/`fill_blank`.

### Hub

Track eyebrow for `english-basics` shows `catalog.cefrA1` (parallel to `hskBand1`).
