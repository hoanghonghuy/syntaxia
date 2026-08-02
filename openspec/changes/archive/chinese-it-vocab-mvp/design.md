# Design — chinese-it-vocab-mvp

## Approach

- Reuse Chinese vocab surface (`hanzi` + `pinyin` + `gloss`) and language player.
- Lesson id prefix `zh-it-`.
- Sync via existing local curriculum path on API restart (no new parser fields required beyond optional `specialty` in frontmatter if ignored safely).
- Migration `013` updates track description to “starter path” (not under-development).
- Placeholder test: remove “no curriculum dir” assertion; point to `test:chinese-it-vocab`.

## Risks

- CC BY-SA share-alike — map documents attribution; lemmas cited from szdict.
- Slug collisions with other tracks — always `?track=chinese-it-vocab`.
