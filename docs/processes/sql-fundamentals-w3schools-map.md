# SQL Fundamentals — W3Schools-mapped expansion

## Purpose

Expand `sql-fundamentals` to a **W3Schools-density** path: one concept ≈ one lesson, mapped from the public [W3Schools SQL Tutorial](https://www.w3schools.com/sql/) sidebar (not invented). Portable SQL first; Postgres-only features stay on the `postgresql` track.

## When to use

- Adding or reordering Fundamentals lessons
- Checking whether a topic belongs here vs PostgreSQL track

## Locked scope (owner 2026-07-11)

- **Priority 1 only:** fill SQL Fundamentals (~35–40 published lessons), vi+en together.
- PostgreSQL / JavaScript expansion waits until this track feels “full” in the sidebar.

## Target order (published)

| Order | Slug | Topic (W3 map) | Status |
|------:|------|----------------|--------|
| 0–35 | see [`sql-fundamentals-closure.md`](./sql-fundamentals-closure.md) | Core W3Schools-density Fundamentals | **published + polished** |
| 36–41 | `sql-wildcards` … `sql-comments` | Closure gaps (Wildcards, Union All, Insert Select, Any/All, Constraints, Comments) | **published** |

**Track status:** **closed** at **42** lessons × en/vi (2026-07-16). Full path + polish rules: [`sql-fundamentals-closure.md`](./sql-fundamentals-closure.md).

**Deferred to PostgreSQL track / later:** stored procedures, SELECT INTO (vendor-specific), injection chapter as security essay, MySQL-only functions.

**Removed from Fundamentals as separate published lesson:** old combined-only WHERE without AND/OR (WHERE stays; AND/OR/NOT is its own lesson).

## Lesson rules

Follow [`curriculum-pedagogy.md`](./curriculum-pedagogy.md) + [`product-quality-lock.md`](./product-quality-lock.md):

- No body `#` title; Depth B; hints (2–3); solution; preview; common mistakes
- Shared movie/customer-style TEMP seeds; portable SQL
- Ship en+vi in the same batch

## Do

- Map W3 chapter → one slug; keep stable `id` when renaming order only
- Reorder existing lessons via frontmatter `order` when inserting new ones

## Don't

- Invent topics not on W3/SQLBolt/Mode public paths
- Put Postgres-only syntax in Fundamentals (except FULL OUTER JOIN which PG supports and W3 teaches)

## Related

- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- [`postgresql-track.md`](./postgresql-track.md)
- `docs/curriculum/sql-fundamentals/`
