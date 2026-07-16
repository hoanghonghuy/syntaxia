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
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Old Cut", 1985, "Unknown"]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [3, "Dune", 2021]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Old Cut', 1985, 'Unknown');"
---

`DELETE` removes whole rows. Like `UPDATE`, always add `WHERE` so you do not wipe the entire table.

**movies** — before delete (four films)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Old Cut | 1985 | Unknown |

Films before year 2000 should go: The Matrix and Old Cut.

## Worked example

```sql
DELETE FROM movies
WHERE year < 2000;
```

- `DELETE FROM movies` names the table.
- `WHERE year < 2000` selects which rows to remove.
- The Matrix (1999) and Old Cut (1985) are removed; Inception and Dune stay.

**movies** — after delete (what the checker reads)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 3 | Dune | 2021 |

## Common mistakes

- Running `DELETE FROM movies;` with no `WHERE` — that removes every row.
- Using `>` instead of `<` when the task says “before” a year.
- Confusing `DELETE` (remove a row) with `UPDATE` (change a cell).

## Your turn

Delete movies released before the year 2000.
