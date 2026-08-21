---
id: pg-22-filter
track: postgresql
locale: en
slug: filter-clause
title: Conditional aggregates with FILTER
order: 22
published: true
can_do: "Compute multiple aggregates over different row subsets by attaching FILTER conditions to individual aggregate calls"
objectives:
  - Explain which rows each aggregate receives
  - Contrast aggregate FILTER with a top-level WHERE
  - Compute total and conditional counts in one result row
exercise:
  starter: "SELECT COUNT(*) AS total FROM movies;"
  hints:
    - "Keep the unfiltered total and add a second COUNT for modern movies."
    - "Attach FILTER (WHERE year >= 2000) only to the modern aggregate."
    - "Use: SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;"
  solution: "SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
      - [4, "Dune", 2021]
  expected:
    columns: ["total", "modern"]
    rows:
      - [4, 3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016), (4, 'Dune', 2021);"
---

`FILTER` attaches a row condition to one aggregate instead of filtering the whole query input. That becomes especially useful when one output row needs several metrics over different subsets.

## Mental model

All four rows reach the SELECT's aggregate stage:

| aggregate | rows it receives | result |
| --- | --- | ---: |
| `COUNT(*)` | all four | 4 |
| `COUNT(*) FILTER (WHERE year >= 2000)` | Inception, Arrival, Dune | 3 |

A top-level `WHERE year >= 2000` would remove The Matrix before **both** aggregates, making it impossible for the first count to remain 4.

## Predict before you run

Predict one result row with `total = 4` and `modern = 3`.

## Worked example

```sql
SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE year >= 2000) AS modern
FROM movies;
```

| total | modern |
| ---: | ---: |
| 4 | 3 |

## Debug this

```sql
SELECT COUNT(*) AS total, COUNT(*) AS modern
FROM movies
WHERE year >= 2000;
```

Both counts become 3 because the top-level WHERE reduced the shared input first. The bug is filter placement, not COUNT syntax.

## Common mistakes

- Moving a per-metric filter to top-level WHERE and changing every metric.
- Forgetting the `WHERE` keyword inside `FILTER (...)`.
- Repeating separate queries when several conditional aggregates can be expressed clearly in one result.

## Your turn

Return both total movie count and count of movies from year 2000 onward in one row.

## Quick check

Why can FILTER be better than a top-level WHERE when computing a dashboard row with several metrics?

**Answer:** each aggregate can receive its own subset while other aggregates still see the full or a different input set.
