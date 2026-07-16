---
id: sql-38-insert-select
track: sql-fundamentals
locale: en
slug: insert-into-select
title: Copying rows with INSERT INTO SELECT
order: 38
published: true
objectives:
  - Insert rows by selecting from another table
  - Copy a filtered subset into a destination table
  - Use verify_sql style thinking: select after insert to check
exercise:
  starter: "SELECT title, year FROM archive;"
  hints:
    - "INSERT INTO archive (title, year) SELECT … copies rows from movies."
    - "Filter with WHERE year >= 2010 so older films stay out."
    - "Try: INSERT INTO archive (title, year) SELECT title, year FROM movies WHERE year >= 2010;"
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

Sometimes you already have rows in one table and want to **copy** some of them into another table — like copying selected spreadsheet rows into a second sheet. `INSERT INTO … SELECT` does that in one step: no typing each value by hand.

**movies** (source — full table)

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Dune | 2021 |

**archive** (destination — empty at the start)

| title | year |
| --- | --- |
| *(no rows yet)* |  |

Goal: copy only films from year **2010 or later** into `archive`.

## Worked example

```sql
INSERT INTO archive (title, year)
SELECT title, year
FROM movies
WHERE year >= 2010;
```

- `INSERT INTO archive (title, year)` names the destination columns.
- `SELECT title, year FROM movies` is the source of those values.
- `WHERE year >= 2010` keeps Inception and Dune; drops The Matrix (1999).
- After the insert, check with `SELECT title, year FROM archive ORDER BY title;`.

**archive** after the insert:

| title | year |
| --- | --- |
| Dune | 2021 |
| Inception | 2010 |

## Common mistakes

- Forgetting column lists — if column order differs, values can land in the wrong place; list `(title, year)` on both sides carefully.
- Using `VALUES` when the data already lives in a table — `SELECT` is the right tool for copying.
- Inserting without a filter — then every movie is copied; use `WHERE` when you only want a subset.

## Your turn

Copy `title` and `year` from `movies` into `archive` for films with `year >= 2010`. The checker reads `archive` ordered by `title`.
