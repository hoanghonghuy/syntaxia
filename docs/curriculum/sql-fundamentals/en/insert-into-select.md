---
id: sql-38-insert-select
track: sql-fundamentals
locale: en
slug: insert-into-select
title: Copying rows with INSERT INTO SELECT
order: 38
published: true
can_do: "Move a query result into a destination table by matching destination columns to SELECT output and verifying the resulting state"
objectives:
  - Treat SELECT output as the row source for INSERT
  - Match destination columns to source expressions
  - Predict and verify the destination table after a filtered copy
exercise:
  starter: "SELECT title, year FROM archive;"
  hints:
    - "The destination needs title and year; the source SELECT must return those values in the same order."
    - "Filter source movies with year >= 2010 before inserting."
    - "Use: INSERT INTO archive (title, year) SELECT title, year FROM movies WHERE year >= 2010;"
  solution: "INSERT INTO archive (title, year) SELECT title, year FROM movies WHERE year >= 2010;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["Dune", 2021]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Inception", 2010]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title, year FROM archive ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "CREATE TEMP TABLE archive (title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021);"
---

An `INSERT` does not have to get values from a literal `VALUES (...)` list. A `SELECT` can produce the rows to insert, which is useful for copying, archiving, and transforming sets of rows.

## Mental model

Think in a pipeline:

```text
movies -> WHERE year >= 2010 -> SELECT title, year -> INSERT into archive(title, year)
```

Trace it:

| source movie | passes filter? | inserted into archive? |
| --- | --- | --- |
| The Matrix, 1999 | no | no |
| Inception, 2010 | yes | yes |
| Dune, 2021 | yes | yes |

The destination column list `(title, year)` must line up with the two expressions produced by the SELECT.

## Predict before you run

`archive` starts empty. Predict its complete after-state: exactly two rows, Inception 2010 and Dune 2021.

## Worked example

```sql
INSERT INTO archive (title, year)
SELECT title, year
FROM movies
WHERE year >= 2010;
```

Then verify state:

```sql
SELECT title, year
FROM archive
ORDER BY title;
```

| title | year |
| --- | ---: |
| Dune | 2021 |
| Inception | 2010 |

## Debug this

```sql
INSERT INTO archive (title, year)
SELECT year, title FROM movies WHERE year >= 2010;
```

The source expressions are reversed relative to destination columns. Set-based mutations still require explicit value-to-column reasoning.

## Common mistakes

- Misaligning destination columns and SELECT expressions.
- Forgetting the source filter and copying too many rows.
- Verifying only that the command ran instead of checking the destination after-state.

## Your turn

Copy title and year for movies from 2010 onward into `archive`. Predict the complete destination state first, then run and verify it.

## Quick check

In `INSERT INTO dest (a, b) SELECT x, y ...`, which source value goes into `b`?

**Answer:** `y`, because SELECT expressions map positionally to the destination column list.
