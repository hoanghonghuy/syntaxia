# Languages tracks (placeholder)

## Purpose

How Syntaxia reserves a **languages** catalog category for future language learning (Chinese first), without inventing lesson bodies or reusing IT sandbox pedagogy.

## When to use

- Adding language tracks or category copy
- Deciding whether a language feature belongs in Syntaxia vs a separate app
- Before building HSK / SRS / writing flows

## Locked approach

1. **One app, shared shell/UI** (Mintlify-style Syntaxia chrome) — learners browse languages next to SQL/web/code **for now** (placeholder only).
2. **Future IA (shipping):** separate **learning domains** in the UI — **IT** vs **Languages** (see [`learning-domains.md`](./learning-domains.md)). Do **not** stuff language tracks into the same flat category chip list as IT forever. More domains may follow.
3. **Separate pedagogy later** — language lessons will not clone SQL/JS sandboxes; design a language-specific experience when implementing (Talkory specs are a reference: HSK 3.0, explain via UI locale vi/en).
4. **Placeholder first** — seed track metadata only; empty hub shows under-development + coming soon; **no** `docs/curriculum/chinese-hsk/` until real mapped lessons exist.
5. **Chinese first** — track id `chinese-hsk`, category `languages`, `sort_order` 100 (after IT tracks so home featured stays SQL/web/code).

## Steps (extend)

1. Migration `006_languages_tracks.sql` + `init.sql` row (idempotent `ON CONFLICT`).
2. i18n `catalog.category.languages` (+ optional `catalog.underDevelopment`) in en+vi.
3. Apply migration (`docker-up.ps1` / `migrate-neon.ps1` include `006`).
4. Verify: `/tracks?category=languages` shows the card; open track → coming soon, zero lessons.
5. When implementing for real: research HSK map → `/syn-research` / propose → curriculum process doc — do not invent outlines.

## Do

- Keep Category → Level → Track → Lessons
- Ship en+vi category keys together
- Keep placeholders out of Continue / featured by high `sort_order` and empty lessons

## Don't

- Publish fake lesson Markdown stubs
- Force language UX into SQL sandbox patterns
- Treat languages as “just another chip next to SQL forever” once the domain UI ships — split IT vs Languages (and later domains) in navigation/home
- Merge Talkory SRS/AI/writing into Syntaxia without an OpenSpec change

## Related

- [`catalog-architecture.md`](./catalog-architecture.md)
- Talkory reference (sibling repo): `docs/spec/content-strategy.md` (HSK 3.0)
- `apps/api/migrations/006_languages_tracks.sql`
- `apps/web/scripts/check-languages-placeholder.mjs`
