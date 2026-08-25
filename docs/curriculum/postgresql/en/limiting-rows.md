---
id: pg-01-limit
track: postgresql
locale: en
slug: limiting-rows
title: Deterministic top-N queries with LIMIT
order: 1
published: true
can_do: "Build a deterministic top-N PostgreSQL query by defining a complete order before applying LIMIT"
objectives:
  - Explain why LIMIT alone does not define which rows are first
  - Define a deterministic ORDER BY for a top-N request
  - Apply LIMIT after ordering
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Top-N has meaning only after the result order is defined."
    - "Sort newest first; title can break ties deterministically."
    - "Use: SELECT title, year FROM movies ORDER BY year DESC, title ASC LIMIT 2;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC, title ASC LIMIT 2;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Dune", 2021]
      - [4, "Arrival", 2016]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Arrival", 2016]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021), (4, 'Arrival', 2016);"
---

`LIMIT` controls **how many** rows PostgreSQL returns. It does not by itself define **which** rows count as first.

## Mental model

A top-N query is a two-step operation:

```text
all matching rows -> deterministic ORDER BY -> take first N with LIMIT
```

For “two newest movies”:

| title | year | rank after `year DESC` |
| --- | ---: | ---: |
| Dune | 2021 | 1 |
| Arrival | 2016 | 2 |
| Inception | 2010 | 3 |
| The Matrix | 1999 | 4 |

A secondary sort key such as `title ASC` makes ties predictable if two movies share a year.

## Predict before you run

After sorting newest first, predict the first two rows: Dune and Arrival. `LIMIT 2` should then preserve exactly those rows.

## Worked example

```sql
SELECT title, year
FROM movies
ORDER BY year DESC, title ASC
LIMIT 2;
```

| title | year |
| --- | ---: |
| Dune | 2021 |
| Arrival | 2016 |

PostgreSQL can choose different execution plans for different LIMIT/OFFSET values, so relying on an unspecified row order is not a stable contract.

## Debug this

```sql
SELECT title, year
FROM movies
LIMIT 2;
```

This asks for at most two rows but never defines “newest”. If it appears to return the desired rows in one run, that is accidental rather than guaranteed behavior.

## Common mistakes

- Treating insertion order as an implicit sort order.
- Applying LIMIT to a business ranking without ORDER BY.
- Using a non-unique sort key when ties must be resolved consistently.

## Your turn

Return the two newest movies using a deterministic order and `LIMIT 2`.

## Quick check

What gives “first two rows” business meaning: `LIMIT 2` or `ORDER BY ... LIMIT 2`?

**Answer:** `ORDER BY ... LIMIT 2`, because ORDER BY defines which rows are first.
