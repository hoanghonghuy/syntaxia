---
id: sql-00-intro
track: sql-fundamentals
locale: en
slug: what-is-sql
title: What is data and SQL?
order: 0
published: true
objectives:
  - See a table as a spreadsheet of rows and columns
  - Understand what SQL is for in plain language
  - Run a first SELECT to look at all rows
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "The asterisk * means every column."
    - "Keep the table name movies after FROM."
    - "Type: SELECT * FROM movies; then click Run."
  solution: "SELECT * FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Imagine a list of movies in Excel or Google Sheets. Each **row** is one movie. Each **column** is one fact about it — title, year, or director.

In a database, that list is called a **table**. SQL (Structured Query Language) is a language for asking questions about tables. You do not need to be a programmer to start.

**movies** — the full practice table (four films):

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Read it like a spreadsheet: row 1 is Inception; the `year` column holds release years; Nolan directed two of the four films.

## Worked example

To look at every column and every row, write:

```sql
SELECT * FROM movies;
```

- `SELECT` means “show me…”
- `*` means every column (`id`, `title`, `year`, `director`)
- `FROM movies` means “from the table named movies”

Result (same four rows as the sample):

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Later lessons will ask for **some** columns or **some** rows. Today you only need “everything”.

## Common mistakes

- Forgetting the semicolon `;` at the end of the statement (many tools still accept it, but habit matters).
- Writing `SELECT movies` instead of `SELECT * FROM movies` — you must say which table with `FROM`.
- Misspelling the table name (`movie` vs `movies`) — names must match exactly.

## Your turn

Run a query that returns **all columns and all rows** from `movies`. Use the hint button if you get stuck.
