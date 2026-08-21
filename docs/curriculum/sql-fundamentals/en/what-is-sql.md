---
id: sql-00-intro
track: sql-fundamentals
locale: en
slug: what-is-sql
title: What is data and SQL?
order: 0
published: true
can_do: "Read a database table and run a query that returns all of its columns and rows"
objectives:
  - See a table as rows and columns rather than an abstract database object
  - Explain the difference between a source table, a SQL query, and a query result
  - Run a first SELECT query in the sandbox
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "The task asks for every column, so keep the asterisk *."
    - "FROM must be followed by the source table name: movies."
    - "Use: SELECT * FROM movies;"
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

A database becomes much less mysterious when you start with one concrete table. Think of `movies` as a spreadsheet that an application can query instead of a sheet you scroll through by hand.

## Mental model

Keep three things separate:

| Thing | What it is |
| --- | --- |
| **Table** | Stored data arranged as columns and rows |
| **Query** | A request that describes what data you want |
| **Result** | A new table-shaped answer produced by the query |

Here is the source table for this lesson:

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

A row represents one movie. A column represents one kind of fact about every movie.

## Predict before you run

Look at this query without running it yet:

```sql
SELECT * FROM movies;
```

Predict two things:

- How many columns will the result have?
- How many rows will the result have?

The `*` means every available column, and there is no row filter. Your prediction should therefore be **4 columns and 4 rows**.

## Worked example

```sql
SELECT *
FROM movies;
```

Read the query from the request outward:

- `SELECT` starts the request for output data.
- `*` asks for every column.
- `FROM movies` names the source table.

Result:

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

The result looks like the source because this query asks for every column and does not filter any row. Later queries will reshape or reduce that result.

## Debug this

Why is this not the same request?

```sql
SELECT movies;
```

`movies` is a **table name**, not a column expression. The query also never uses `FROM` to name a source table. For this lesson, the correct shape is `SELECT ... FROM movies`.

## Common mistakes

- Treating a table name and a column name as the same thing.
- Misspelling `movies` as `movie`; identifiers must match the schema.
- Assuming SQL always returns rows in a meaningful order. Ordering becomes explicit with `ORDER BY` in a later lesson.

## Your turn

Use the sandbox to return **every column and every row** from `movies`. Before pressing Run, say out loud what result shape you expect.

## Quick check

Which part of `SELECT * FROM movies` tells SQL where the data comes from?

**Answer:** `FROM movies` names the source table.
