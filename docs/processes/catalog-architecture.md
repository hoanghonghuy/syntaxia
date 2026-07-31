# Catalog architecture (Category → Level → Track → Lessons)

## Purpose

Locked rules for Syntaxia’s learning catalog: how categories, levels, and tracks relate, and how to add a new track without inventing curriculum.

## When to use

- Adding or renaming a track / category / level
- Product-perfection checklist **#10** (scaffold) and **#11+** (first code lessons)
- Changing home grouping or track hub empty states

## Hierarchy

```
Domain (it | languages | …)
  └── Category (sql | web | code | languages | …)
        └── Level (basic | intermediate | advanced)
              └── Track → Lessons
```

| Domain | Categories (today) | Notes |
|--------|-------------------|--------|
| `it` | `sql`, `web`, `code` | Sandbox pedagogy |
| `languages` | `languages` | Placeholder HSK; see [`languages-tracks.md`](./languages-tracks.md) |

| Category | Seeded tracks (today) | Notes |
|----------|----------------------|--------|
| `sql` | `sql-fundamentals` (basic), `postgresql` (intermediate) | Portable SQL → Postgres dialect |
| `web` | `html-basics` (basic), `css-basics` (basic) | MDN HTML → CSS; see [`html-css-basics-tracks.md`](./html-css-basics-tracks.md) |
| `code` | `javascript-basics` (basic) | MDN JS scripting; see `javascript-track.md` |
| `languages` | `chinese-hsk` (basic, **placeholder**) | HSK 3.0 mapped later — see [`languages-tracks.md`](./languages-tracks.md) |

Home: **domain cards** + featured IT tracks. Catalog: `/tracks?domain=it|languages` then category chips. See [`learning-domains.md`](./learning-domains.md).
## Steps (add a track)

1. Choose a stable **track id** (kebab-case), `category`, and `level`. Prefer research-backed ids (e.g. MDN / SQLBolt / Mode), not invented brand names.
2. Add an idempotent SQL migration under `apps/api/migrations/` (e.g. `004_code_track.sql`) **and** mirror the row in `init.sql` for fresh installs.
3. Apply on a running DB (use `docker cp` on Windows so UTF-8 titles survive; do not pipe `Get-Content` into `psql`):
   ```powershell
   docker cp apps/api/migrations/004_code_track.sql syntaxia-postgres-1:/tmp/004_code_track.sql
   docker compose exec -T postgres psql -U syntaxia -d syntaxia -f /tmp/004_code_track.sql
   ```
   Or re-run `powershell -File scripts/docker-up.ps1` (applies `002`–`004` idempotently).
4. Recreate/restart API so clients see the new list:
   ```powershell
   docker compose up -d --force-recreate api --pull never
   ```
5. Verify: `GET /api/v1/tracks` includes the new id; or `powershell -File scripts/check-catalog.ps1`.
6. Add curriculum only when the checklist row for that track says so — empty track hubs show **Coming soon** until lessons exist.
7. Ship `en` + `vi` i18n for any new category/level keys together (`apps/web/i18n/locales/`).

## Do

- Keep Category → Level → Track → Lessons; do not invent a fourth top-level axis.
- Seed track metadata before writing full lesson bodies.
- Use `ON CONFLICT` so migrations are safe to re-run (same pattern as `docker-up.ps1` + `002_sandbox_harden.sql`).
- Document curriculum outlines in a dedicated process file when lessons start (see `postgresql-track.md`).

## Don't

- Invent a full code curriculum in the architecture row (#10); that is #11+.
- Publish empty lesson stubs that clutter the learner path.
- Skip updating `init.sql` when adding a migration seed.
- Enable Google/Drive for curriculum until the owner asks.

## Related

- [`learning-path-progress.md`](./learning-path-progress.md) — home Continue / progress UX
- [`product-quality-lock.md`](./product-quality-lock.md) — IA lock
- [`product-perfection-checklist.md`](./product-perfection-checklist.md) — #10 / #11
- [`postgresql-track.md`](./postgresql-track.md) — SQL category example
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- `apps/api/migrations/003_track_taxonomy.sql`, `004_code_track.sql`, `005_web_tracks.sql`, `006_languages_tracks.sql`, `init.sql`
- [`languages-tracks.md`](./languages-tracks.md) — language-learning placeholders
- `scripts/check-catalog.ps1`
