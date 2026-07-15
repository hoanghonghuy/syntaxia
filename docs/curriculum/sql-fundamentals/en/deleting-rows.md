---
id: sql-08-delete
track: sql-fundamentals
locale: en
slug: deleting-rows
title: Removing rows with DELETE
order: 11
published: true
objectives:
  - Remove rows with DELETE
  - Protect data with WHERE
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "DELETE FROM table WHERE condition removes matching rows."
    - "Always include WHERE so you do not wipe the whole table."
    - "Try: DELETE FROM movies WHERE year < 2000;"
  solution: "DELETE FROM movies WHERE year < 2000;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

`DELETE` removes whole rows. Like `UPDATE`, always add `WHERE` so you do not wipe the entire table.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

## Worked example

```sql
DELETE FROM movies WHERE year < 2000;
```

- `DELETE FROM movies` names the table.
- `WHERE year < 2000` keeps only matching rows for deletion.
- The Matrix (1999) is removed; Inception (2010) stays.

## Common mistakes

- Running `DELETE FROM movies;` with no `WHERE` — that removes every row.
- Using `>` instead of `<` when the task says “before” a year.
- Confusing `DELETE` (remove a row) with `UPDATE` (change a cell).

## Your turn

Delete movies released before the year 2000.
