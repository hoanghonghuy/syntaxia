---
id: pg-01-limit
track: postgresql
locale: en
slug: limiting-rows
title: Limiting rows with LIMIT
order: 1
published: true
objectives:
  - Cap how many rows a query returns
  - Combine ORDER BY with LIMIT
exercise:
  starter: "SELECT title, year FROM movies ORDER BY year DESC;"
  hints:
    - "Add LIMIT at the end to keep only the first N rows of the sorted result."
    - "You want the two newest movies, so LIMIT 2."
    - "Try: SELECT title, year FROM movies ORDER BY year DESC LIMIT 2;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC LIMIT 2;"
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

Sometimes a table has many rows, but you only need a short sample — like looking at the top of a sorted spreadsheet. In SQL, `LIMIT` stops the result after a fixed number of rows.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Dune | 2021 |
| 4 | Arrival | 2016 |

## Worked example

```sql
SELECT title, year FROM movies ORDER BY year DESC LIMIT 2;
```

- `ORDER BY year DESC` sorts newest first.
- `LIMIT 2` keeps only the first two rows after sorting.
- Without `ORDER BY`, `LIMIT` still caps the count, but which rows you get is not meaningful for “newest”.

Result:

| title | year |
| --- | --- |
| Dune | 2021 |
| Arrival | 2016 |

## Common mistakes

- Putting `LIMIT` before `ORDER BY` — `LIMIT` belongs at the end.
- Using `LIMIT 1` when the task asks for two rows.
- Forgetting `DESC` when “newest first” is required.

## Your turn

List `title` and `year` for the **two newest** movies.
