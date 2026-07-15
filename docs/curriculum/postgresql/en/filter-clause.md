---
id: pg-22-filter
track: postgresql
locale: en
slug: filter-clause
title: Conditional counts with FILTER
order: 22
published: true
objectives:
  - Count only matching rows with FILTER
  - Combine an aggregate with WHERE-like logic inside it
exercise:
  starter: "SELECT COUNT(*) FROM movies;"
  hints:
    - "FILTER (WHERE …) limits which rows an aggregate sees."
    - "Keep COUNT(*) but add FILTER for year >= 2000."
    - "Try: SELECT COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;"
  solution: "SELECT COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
      - [4, "Dune", 2021]
  expected:
    columns: ["modern"]
    rows:
      - [3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016), (4, 'Dune', 2021);"
---

You already know `COUNT(*)`. Sometimes you want one total that only counts rows matching a condition — without a separate `WHERE` that would hide other aggregates. PostgreSQL’s `FILTER` clause attaches that condition to the aggregate itself.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Arrival | 2016 |
| 4 | Dune | 2021 |

## Worked example

```sql
SELECT COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;
```

- `COUNT(*)` still counts rows.
- `FILTER (WHERE year >= 2000)` includes only movies from year 2000 onward.
- The Matrix (1999) is skipped; three modern movies remain.

Result:

| modern |
| --- |
| 3 |

Portable alternative: `COUNT(CASE WHEN year >= 2000 THEN 1 END)`. `FILTER` is clearer PostgreSQL syntax for the same idea.

## Common mistakes

- Putting the year test only in a top-level `WHERE` when the lesson asks for `FILTER`.
- Forgetting the `modern` alias.
- Writing `FILTER year >= 2000` without `WHERE` inside the parentheses.

## Your turn

Return a single column `modern`: how many movies have `year >= 2000`, using `FILTER`.
