# PostgreSQL track (basic → advanced)

## Purpose

Mode-style / PostgreSQL-docs mapped track for dialect features after SQL Fundamentals. Expand to W3Schools-like density for **Postgres-specific** topics (not duplicate portable SQL).

## When to use

- Adding lessons under `docs/curriculum/postgresql/`
- Deciding Fundamentals vs PostgreSQL ownership of a topic

## Locked outline (published target)

Mapped from [Mode SQL Tutorial](https://mode.com/sql-tutorial/) levels + [PostgreSQL docs](https://www.postgresql.org/docs/current/) / W3Schools PostgreSQL notes. Do not invent topics.

### Basic (orders 0–6)

| Order | Slug | Topic | Status |
|------:|------|-------|--------|
| 0 | `postgresql-types` | INTEGER, TEXT, BOOLEAN, NUMERIC | published |
| 1 | `limiting-rows` | LIMIT | published |
| 2 | `handling-null` | IS NULL / IS NOT NULL | published |
| 3 | `serial-identity` | SERIAL / IDENTITY | published |
| 4 | `boolean-filters` | BOOLEAN columns in WHERE | published |
| 5 | `text-operators` | `\|\|` concat, `ILIKE` | published |
| 6 | `date-basics` | DATE / TIMESTAMP filters | published |

### Intermediate (orders 10–16)

| Order | Slug | Topic | Status |
|------:|------|-------|--------|
| 10 | `returning-clause` | RETURNING | published |
| 11 | `upsert-on-conflict` | ON CONFLICT | published |
| 12 | `jsonb-basics` | JSONB ->> / @> | published |
| 13 | `array-basics` | ARRAY / ANY | published |
| 14 | `coalesce-nullif` | COALESCE / NULLIF | published |
| 15 | `distinct-on` | DISTINCT ON | published |
| 16 | `indexes-intro` | CREATE INDEX (PG notes) | published |

### Advanced (orders 20–24)

| Order | Slug | Topic | Status |
|------:|------|-------|--------|
| 20 | `window-functions` | ROW_NUMBER / LAG | published |
| 21 | `common-table-expressions` | WITH CTE | published |
| 22 | `filter-clause` | AGG FILTER (WHERE …) | published |
| 23 | `explain-basics` | EXPLAIN (read plan text) | published |
| 24 | `transactions-basics` | BEGIN / COMMIT idea (sandbox: single-tx demo) | published |

## Track metadata

- Track id: `postgresql` (category `sql`, level `intermediate`)
- Path: `docs/curriculum/postgresql/<locale>/<slug>.md`
- Pedagogy: Depth B; TEMP seeds; vi+en together

## Do / Don't

- Teach Postgres flavor; link back to Fundamentals for portable SQL
- Do not republish SELECT/WHERE/JOIN basics here
- Prefer `allow_mutations` + `verify_sql` for DML/DDL demos

## Related

- [`sql-fundamentals-w3schools-map.md`](./sql-fundamentals-w3schools-map.md)
- [`curriculum-pedagogy.md`](./curriculum-pedagogy.md)
- `docs/curriculum/postgresql/`
