---
id: sql-01-syntax
track: sql-fundamentals
locale: en
slug: sql-syntax
title: SQL syntax basics
order: 1
published: true
can_do: "Recognize the basic shape of a SELECT statement and identify its output columns and source table"
objectives:
  - Read a basic SELECT statement from left to right
  - Distinguish SQL keywords from table and column identifiers
  - Return one column from a table
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "A basic query names the output column after SELECT and the source after FROM."
    - "The requested output is only title; keep movies as the source table."
    - "Use: SELECT title FROM movies ORDER BY title;"
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

SQL syntax is easier to remember when every part has a job. Do not memorize a long grammar yet; learn the shape of one small request.

## Mental model

A basic table query has two essential decisions:

| Question | SQL part | Example |
| --- | --- | --- |
| What should appear in the result? | `SELECT ...` | `SELECT title` |
| Where does that data come from? | `FROM ...` | `FROM movies` |

SQL keywords such as `SELECT` and `FROM` describe operations. Names such as `title` and `movies` refer to objects in your data.

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

## Predict before you run

Consider:

```sql
SELECT title
FROM movies;
```

Before running it, predict the **shape**, not the exact display order.

- The result has **1 column** because only `title` is selected.
- It has **4 rows** because no row filter has been added.

That separation — output columns versus source rows — will stay useful throughout SQL.

## Worked example

The exercise uses this version so the grader receives a stable row order:

```sql
SELECT title
FROM movies
ORDER BY title;
```

| title |
| --- |
| Dune |
| Inception |
| Interstellar |
| The Matrix |

For now, focus on `SELECT title FROM movies`. `ORDER BY title` only makes the displayed order predictable; sorting gets its own lesson later.

SQL keywords are commonly written in uppercase for readability, but uppercase is a convention rather than the reason the query works. A semicolon marks the end of a statement and is a good habit, especially when several statements are sent together.

## Debug this

What is wrong with this order?

```sql
FROM movies
SELECT title;
```

SQL's grammar expects the `SELECT` list before the `FROM` source. The database cannot rearrange arbitrary clause order for you.

## Common mistakes

- Reversing clause order because natural language says “from movies, show title”. SQL syntax starts with `SELECT`.
- Confusing the column `title` with the table `movies`.
- Thinking uppercase keywords are mandatory. Consistent casing improves readability, but the clause structure is what matters.

## Your turn

Return only the `title` column from `movies`, ordered by `title`. Before running it, predict the result dimensions.

## Quick check

In `SELECT title FROM movies`, which token is the column and which token is the table?

**Answer:** `title` is the selected column; `movies` is the source table.
