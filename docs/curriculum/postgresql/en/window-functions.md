---
id: pg-20-window
track: postgresql
locale: en
slug: window-functions
title: Row context with window functions
order: 20
published: true
can_do: "Use a window function to calculate across related rows without collapsing each input row into a group summary"
objectives:
  - Contrast window calculations with GROUP BY aggregation
  - Define window ordering independently from final output ordering
  - Add a deterministic tie-breaker for ROW_NUMBER
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "ROW_NUMBER keeps every movie row and adds a calculated number."
    - "Put year and id inside OVER (ORDER BY ...) so numbering is deterministic."
    - "Use: SELECT title, year, ROW_NUMBER() OVER (ORDER BY year, id) AS rn FROM movies ORDER BY rn;"
  solution: "SELECT title, year, ROW_NUMBER() OVER (ORDER BY year, id) AS rn FROM movies ORDER BY rn;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
  expected:
    columns: ["title", "year", "rn"]
    rows:
      - ["The Matrix", 1999, 1]
      - ["Inception", 2010, 2]
      - ["Arrival", 2016, 3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016);"
---

Window functions calculate with awareness of other rows while preserving the identity of each current row. That is the key difference from a normal aggregate with `GROUP BY`.

## Mental model

Compare output shape:

| query idea | input rows | output rows |
| --- | ---: | ---: |
| `COUNT(*)` for whole table | 3 | 1 |
| `GROUP BY year` | 3 | one per group |
| `ROW_NUMBER() OVER (...)` | 3 | 3 |

`OVER (...)` defines the window context. Its `ORDER BY` controls how the window function calculates; a separate top-level `ORDER BY` controls how result rows are displayed.

## Predict before you run

Ordered by year then id, the row numbers are Matrix → 1, Inception → 2, Arrival → 3. No source row disappears.

## Worked example

```sql
SELECT
  title,
  year,
  ROW_NUMBER() OVER (ORDER BY year, id) AS rn
FROM movies
ORDER BY rn;
```

| title | year | rn |
| --- | ---: | ---: |
| The Matrix | 1999 | 1 |
| Inception | 2010 | 2 |
| Arrival | 2016 | 3 |

For per-group ranking, add `PARTITION BY`; functions such as `RANK`, `LAG`, `LEAD`, and window aggregates reuse the same `OVER` model.

## Debug this

```sql
SELECT title, ROW_NUMBER() OVER () AS rn
FROM movies;
```

The query is valid, but row numbering has no ordering criterion. If row number represents a ranking, define a deterministic order rather than relying on whatever row order happens to arrive.

## Common mistakes

- Replacing a window requirement with GROUP BY and losing individual rows.
- Assuming window `ORDER BY` automatically guarantees final display order.
- Ranking tied values without a tie-breaker when stable numbering matters.

## Your turn

Return each movie with `rn` ordered by year and id, and display the result by that row number.

## Quick check

What happens to row count when you add `ROW_NUMBER() OVER (...)` to a simple SELECT?

**Answer:** the row count stays the same; the window function adds calculated context to each row instead of collapsing rows.
