---
id: sql-01-select
track: sql-fundamentals
locale: en
slug: select-queries
title: Writing SELECT queries
order: 2
published: true
objectives:
  - Pick specific columns with SELECT
  - Read table and column names
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "List only the columns you need after SELECT, separated by commas."
    - "Do not keep the asterisk * if you want specific columns."
    - "Try: SELECT title, year FROM movies ORDER BY title;"
  solution: "SELECT title, year FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Inception", 2010]
      - ["Interstellar", 2014]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Often you do not need every column. Think of hiding columns in a spreadsheet so only **title** and **year** stay visible.

**movies** (full table — four columns)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

`SELECT *` would return all four columns. Today you will ask for two.

## Worked example

```sql
SELECT title, year
FROM movies
ORDER BY title;
```

- After `SELECT`, name the columns you want (`title`, `year`), separated by commas.
- `FROM movies` still means “look in this table”.
- `ORDER BY title` sorts rows by title so the grader sees a stable order.

Result:

| title | year |
| --- | --- |
| Dune | 2021 |
| Inception | 2010 |
| Interstellar | 2014 |
| The Matrix | 1999 |

The `id` and `director` columns are not shown, because you did not ask for them.

## Common mistakes

- Leaving `SELECT *` when the task asks for specific columns — the grader checks column names.
- Putting spaces or quotes around column names that do not need them (`"title"` is usually unnecessary here).
- Swapping order: `FROM movies SELECT title` is invalid — `SELECT` comes first.

## Your turn

Change the starter query so it returns only `title` and `year` for every movie, ordered by `title`.
