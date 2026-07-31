# Learning domains IA

## Purpose

How Syntaxia separates **learning domains** (IT vs Languages, extensible) in the UI while sharing one app shell.

## When to use

- Changing home, `/tracks` filters, or domain labels
- Adding a third domain later
- Before language pedagogy work (domains ≠ lesson player)

## Locked approach (from `/opsx-research`)

```
Domain (it | languages | …)
  └── Category (sql|web|code under it; languages under languages)
        └── Track → Lessons
```

1. **Home:** domain entry cards (IT + Languages) + featured list **IT-only**.
2. **`/tracks`:** domain chips first; category chips only inside the active domain (when >1 category). Default `?domain=it` if omitted.
3. **Map:** `sql|web|code|*` → `it`; `languages` → `languages` (`learningDomains.ts`) — no DB `domain` column yet.
4. **Languages** stays placeholder pedagogy; domain UI only.
5. Shared Mintlify shell; do not merge Talkory SRS into this change.

## Files

| Piece | Path |
|-------|------|
| Domain helpers | `apps/web/app/utils/learningDomains.ts` |
| Catalog browse | `apps/web/app/utils/catalogBrowse.ts` |
| Home / catalog | `apps/web/app/pages/index.vue`, `tracks/index.vue` |
| i18n | `domain.*`, `home.domains*` |
| Tests | `scripts/check-learning-domains.mjs`, shell-ux, catalog-browse |

## Tests

```bash
cd apps/web
npm run test:learning-domains
npm run test:catalog-browse
npm run test:shell-ux
npm run test:i18n
```

## Do

- Add new domains via `LEARNING_DOMAIN_IDS` + i18n + category map
- Keep back-to-catalog links domain-aware (`?domain=`)

## Don't

- Flatten languages back into the same chip row as SQL without a domain row
- Invent HSK lessons in the domain IA change

## Related

- [`languages-tracks.md`](./languages-tracks.md)
- [`catalog-architecture.md`](./catalog-architecture.md)
- [`learn-navigation-ia.md`](./learn-navigation-ia.md)
