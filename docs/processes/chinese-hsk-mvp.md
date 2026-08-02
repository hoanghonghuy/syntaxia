# Chinese HSK Band 1 MVP (implementation)

## Purpose

How the first Languages vertical slice is wired in code and content.

## When to use

- Extending Band 1 after the archived MVP
- Debugging language lessons / sync

## Steps

1. Curriculum: `docs/curriculum/chinese-hsk/{en,vi}/*.md` — frontmatter `vocab` + language `exercise` (`mcq` | `fill_blank`).
2. Sync: `ParseLessonFile` merges top-level `vocab` / `hsk_band` / `hsk_version` into `exercise` JSONB.
3. UI: `isLanguageTrack('chinese-hsk')` → `LanguageVocabList` + `LanguageExercise`; IT sandboxes gated with `!isLanguageTrack`.
4. Grade: client-side `gradeLanguageExercise` (exact hanzi match after trim).
5. Progress: existing mark-complete APIs.
6. Tests: `npm run test:chinese-hsk`, `npm run test:languages-placeholder`, `go test ./internal/drive/ -count=1`.

## Do / Don't

- **Do** keep answers in lesson payload for v1 (same honesty as IT hints).
- **Don't** mount `SqlSandbox` on language tracks.

## Related

- [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md)
- [`chinese-hsk-pedagogy.md`](./chinese-hsk-pedagogy.md)
- Change: `openspec/changes/archive/chinese-hsk-mvp/`
- Main spec: [`../openspec/specs/language-lessons/spec.md`](../../openspec/specs/language-lessons/spec.md)
