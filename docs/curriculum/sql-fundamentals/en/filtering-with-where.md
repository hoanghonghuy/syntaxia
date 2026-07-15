---
id: sql-02-where
track: sql-fundamentals
locale: en
slug: filtering-with-where
title: Filtering with WHERE
order: 4
published: true
objectives:
  - Keep only rows that match a condition
  - Compare a number column
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Add WHERE after the table name to keep some rows and drop others."
    - "Use a comparison on year, such as year > 2000."
    - "Try: SELECT title FROM movies WHERE year > 2000;"
  solution: "SELECT title FROM movies WHERE year > 2000;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski');"
---

`SELECT` chooses **columns**. `WHERE` chooses **rows** — like a spreadsheet filter: “only movies after year 2000”.

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |

## Worked example

```sql
SELECT title FROM movies WHERE year > 2000;
```

- `year > 2000` is checked for each row.
- Only Inception (2010) passes; The Matrix (1999) is dropped.
- The result has one column (`title`) and one row (`Inception`).

## Common mistakes

- Using `=` when the task says “after” or “greater than” — here you need `>` , not `=`.
- Putting `WHERE` before `FROM` — the order is `SELECT … FROM … WHERE …`.
- Filtering on the wrong column (for example `id > 2000`) when the condition is about `year`.

## Your turn

List the `title` of movies released **after** the year 2000.
