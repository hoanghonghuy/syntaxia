# Notes hub and catalog search

## Purpose

How Syntaxia lists learner notes across lessons and provides title-based catalog search — without reshaping Mintlify IA.

## When to use

- Changing `/notes` or `/search`
- Extending `GET /api/v1/notes`
- Adjusting client filter helpers in `catalogSearch.ts`

## Research lock (2026-07-11)

`/opsx-research` chốt: **Notes API list + hub**; **client title search** first (full-text later). Evidence: Duolingo notes hub (review outside lesson flow); Mintlify nav clarity; quality lock path-first + non-tech audience.

## API

| Method | Path | Auth | Notes |
|--------|------|------|-------|
| `GET` | `/api/v1/notes?locale=` | yes | All notes for user+locale with `slug`, `title`, `trackId`, `preview` |

Preview text from `learning.NotePreview` (Go). Join `lesson_notes` → `lessons`.

## Web

| Route | Behavior |
|-------|----------|
| `/notes` | Guest gate; list cards → lesson deep link; client filter |
| `/search` | Domain chips + filter tracks/lessons by title/slug via `filterCatalog(..., domain)` |

Shared chrome: `HubHeader.vue` (also used by progress/account).

## Tests

```bash
cd apps/api && go test ./internal/learning/ -run NotePreview
cd apps/web && npm run test:catalog-search && npm run test:shell-ux && npm run test:i18n
```

After API change: rebuild linux binary + recreate API container (`scripts/docker-up.ps1` or project compose flow).

## Do

- Keep search scoped to the active domain so SQL hits do not appear while browsing Languages
- Keep one job per page; deep-link notes back to the lesson
- Ship `notes.*` / `search.*` en+vi together
- Prefer skeleton + empty states over ComingSoon when data exists

## Don't

- Ship a search engine / AI assistant in this phase
- Show raw note IDs as primary UI

## Related

- [`ui-skeleton-and-shell.md`](./ui-skeleton-and-shell.md)
- [`progress-hub.md`](./progress-hub.md)
- [`product-quality-lock.md`](./product-quality-lock.md)
