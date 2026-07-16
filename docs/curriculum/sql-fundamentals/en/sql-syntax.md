---
id: sql-01-syntax
track: sql-fundamentals
locale: en
slug: sql-syntax
title: SQL syntax basics
order: 1
published: true
objectives:
  - Recognize the shape of a simple SELECT statement
  - Run a query that returns one column from a table
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "A basic query names columns after SELECT, then the table after FROM."
    - "You only need the title column — not every column."
    - "Run: SELECT title FROM movies ORDER BY title;"
  solution: "SELECT title FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

SQL is a language for asking questions of tables. A short query reads like a sentence: **which columns**, **from which table**.

**movies** (full practice table)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

The table has four columns. Today you will ask for only one of them: `title`.

## Worked example

```sql
SELECT title
FROM movies
ORDER BY title;
```

| Piece | Meaning |
| --- | --- |
| `SELECT` | Start of the request — “show me these columns” |
| `title` | The column you want |
| `FROM movies` | Look in the table named `movies` |
| `ORDER BY title` | Sort titles A→Z so the result is stable |

Result:

| title |
| --- |
| Dune |
| Inception |
| Interstellar |
| The Matrix |

Every SQL statement ends with a semicolon (`;`). Keywords are usually written in uppercase so they stand out from table and column names.

## Common mistakes

- Forgetting `FROM` — `SELECT title` alone does not say which table to use.
- Misspelling the table or column name (`movie` vs `movies`) — names must match exactly.
- Leaving out the semicolon when the tool expects a complete statement.

## Your turn

Return only the `title` column from `movies`, sorted by `title`.
