# Languages tracks (Chinese + English + Japanese + specialty IT vocab)



## Purpose



How Syntaxia ships the **languages** catalog category: `chinese-hsk` (HSK Band 1), `english-basics` (CEFR A1), `japanese-jlpt` (JLPT N5), `chinese-it-vocab` (specialty IT vocab).



## When to use



- Adding language tracks or category copy

- Extending HSK / English / JLPT / specialty curriculum

- Debugging wrong lesson body for a shared slug



## Locked approach



1. **One app, shared shell/UI** — domains **IT** vs **Languages** ([`learning-domains.md`](./learning-domains.md)).

2. **Separate pedagogy** — language player with **sentence steps** (path v2); never mount SQL/JS/HTML sandboxes when `category === 'languages'`. See [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md). Legacy vocab+MCQ remains until migrated.

3. **Map before content** — Chinese: [`chinese-hsk-band1-map.md`](./chinese-hsk-band1-map.md). English: [`english-basics-a1-map.md`](./english-basics-a1-map.md). Japanese: [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md). Specialty IT: [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md).

4. **Chinese** — `chinese-hsk`, Band 1 starter (**12** lessons).

5. **English** — `english-basics`, CEFR A1 starter (6 lessons).

6. **Japanese** — `japanese-jlpt`, JLPT N5 starter (6 lessons).

7. **Specialty** — `chinese-it-vocab`, **6** lessons (szdict map).

8. **Content paths** — `docs/curriculum/chinese-hsk/{en,vi}/`, `docs/curriculum/english-basics/{en,vi}/`, `docs/curriculum/japanese-jlpt/{en,vi}/`, `docs/curriculum/chinese-it-vocab/{en,vi}/`.

9. **Track-scoped fetch** — DB uniqueness is `(track_id, slug, locale)`. Client **must** pass `?track=` on `GET /lessons/:slug`, notes, and solution.



## Steps (extend)



1. Migrations `006`–`013` + `init.sql` rows (`docker-up.ps1` / `migrate-neon.ps1`).

2. Author mapped MD; restart API (rebuild `bin/server-linux` if Go changed) to sync.

3. Verify: `/tracks?domain=languages` lists Chinese + English + Japanese + specialty IT vocab.



## Do



- Pass `track` from the route into `useApi.lesson` / notes / solution

- Ship en+vi explain locales together for real lessons

- Gate language player by category `languages`



## Don't



- Invent outlines without research + map

- Call `GET /lessons/:slug` without `track` when multiple tracks may share the slug

- Force language UX into SQL sandbox patterns

- Redistribute NC/ND glossaries as curriculum dumps



## Related



- [`english-basics-pedagogy.md`](./english-basics-pedagogy.md)

- [`japanese-jlpt-pedagogy.md`](./japanese-jlpt-pedagogy.md)

- [`japanese-jlpt-n5-map.md`](./japanese-jlpt-n5-map.md)

- [`chinese-hsk-pedagogy.md`](./chinese-hsk-pedagogy.md)

- [`language-specialty-it-vocab.md`](./language-specialty-it-vocab.md)

- [`chinese-it-vocab-map.md`](./chinese-it-vocab-map.md)

- [`multi-domain-roadmap.md`](./multi-domain-roadmap.md) Phase 4

- OpenSpec: `openspec/specs/english-lessons/`, `openspec/specs/language-lessons/`, `openspec/specs/language-specialty/`

