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
    - "Run: SELECT title FROM movies;"
  solution: "SELECT title FROM movies;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

SQL is a language for asking questions of tables. A short query reads like a sentence: which columns, from which table.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

## Worked example

```sql
SELECT title FROM movies;
```

- `SELECT` starts the request — “show me these columns”.
- `title` is the column you want.
- `FROM movies` names the table (like a sheet name in a spreadsheet).

Result:

| title |
| --- |
| Inception |
| The Matrix |

Every SQL statement ends with a semicolon (`;`). Keywords are usually written in uppercase so they stand out from table and column names.

## Common mistakes

- Forgetting `FROM` — `SELECT title` alone does not say which table to use.
- Misspelling the table or column name (`movie` vs `movies`) — names must match exactly.
- Leaving out the semicolon when the tool expects a complete statement.

## Your turn

Run a query that returns only the `title` column from `movies`.
