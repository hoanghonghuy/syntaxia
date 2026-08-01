# Languages tracks (Chinese HSK)

## Purpose

How Syntaxia ships the **languages** catalog category and `chinese-hsk` track — shared shell, separate pedagogy from IT sandboxes.

## When to use

- Adding language tracks or category copy
- Extending HSK curriculum beyond the Band 1 starter slice
- Deciding whether a language feature belongs in Syntaxia vs a separate app

## Locked approach

1. **One app, shared shell/UI** — domains **IT** vs **Languages** ([`learning-domains.md`](./learning-domains.md)).
2. **Separate pedagogy** — language player (`text` + `vocab` + `exercise`); never mount SQL/JS/HTML sandboxes on `chinese-hsk`.
3. **Map before content** — [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md); do not invent outlines.
4. **Chinese first** — track id `chinese-hsk`, category `languages`, `sort_order` 100.
5. **Content** — Markdown under `docs/curriculum/chinese-hsk/{en,vi}/` (HSK 3.0 Band 1 starter: 6 lessons).

## Steps (extend)

1. Migrations `006_languages_tracks.sql`, `007_chinese_hsk_band1_copy.sql` + `init.sql` row.
2. i18n `catalog.category.languages`, `catalog.hskBand1`, lesson vocab/exercise keys (en+vi).
3. Apply migrations (`docker-up.ps1` / `migrate-neon.ps1`).
4. Restart API so curriculum sync picks up new MD files.
5. Verify: `/tracks?domain=languages` → Chinese hub lists lessons → language player (no SQL sandbox).

## Do

- Keep Category → Level → Track → Lessons
- Ship en+vi explain locales together
- Cite Band 1 map for new vocab clusters

## Don't

- Publish empty stubs for the full Band 1 list
- Force language UX into SQL sandbox patterns
- Merge Talkory SRS/AI/writing without OpenSpec

## Related

- [`chinese-hsk-pedagogy.md`](./chinese-hsk-pedagogy.md)
- [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md)
- [`chinese-hsk-mvp.md`](./chinese-hsk-mvp.md)
- OpenSpec: `openspec/changes/chinese-hsk-mvp/`
