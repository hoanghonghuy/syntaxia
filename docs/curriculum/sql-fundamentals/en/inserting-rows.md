---
id: sql-06-insert
track: sql-fundamentals
locale: en
slug: inserting-rows
title: Adding rows with INSERT
order: 9
published: true
objectives:
  - Insert a new row into a table
  - Confirm with SELECT after insert
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "INSERT adds a row; list columns then VALUES (...)."
    - "Match the column order: id, title, year."
    - "Try: INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);"
  solution: "INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Dune", 2021]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

So far you only **read** data. `INSERT` adds a new row — like appending a line at the bottom of a sheet.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

## Worked example

```sql
INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);
```

- `INSERT INTO movies` names the table.
- `(id, title, year)` lists the columns you are filling.
- `VALUES (3, 'Dune', 2021)` supplies one value per column, in the same order.

After insert, the table has three movies. The sandbox checks the table with a SELECT for you.

## Common mistakes

- Using double quotes for text (`"Dune"`) — in SQL, string values use single quotes (`'Dune'`).
- Putting values in the wrong order relative to the column list.
- Running only `SELECT` without `INSERT` — the grader looks for the new row in the table.

## Your turn

Insert a movie with `id = 3`, `title = 'Dune'`, `year = 2021`.
