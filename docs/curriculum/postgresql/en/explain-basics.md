---
id: pg-23-explain
track: postgresql
locale: en
slug: explain-basics
title: Reading EXPLAIN plans
order: 23
published: true
objectives:
  - Recognize what EXPLAIN shows
  - Run a normal SELECT after studying a plan example
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "This exercise grades a normal SELECT, not EXPLAIN text."
    - "Return only the title column."
    - "Try: SELECT title FROM movies ORDER BY title;"
  solution: "SELECT title FROM movies ORDER BY title;"
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
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

Before PostgreSQL runs a query, it builds a **plan** — a step-by-step idea of how to find the rows (scan a table, use an index, sort, and so on). `EXPLAIN` prints that plan as text so you can learn how the database thinks. The output is not your movie list; it is a description of the work.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

## Worked example

```sql
EXPLAIN SELECT title FROM movies;
```

A typical plan line looks like:

```text
Seq Scan on movies  (cost=0.00..1.02 rows=2 width=32)
```

- `Seq Scan` means “read the table from start to finish” (common on small tables).
- `cost` and `rows` are planner estimates, not your data values.
- `EXPLAIN ANALYZE` also runs the query and shows real timings — useful later; start with plain `EXPLAIN`.

In this lesson’s sandbox, the graded task is a normal `SELECT` so grading stays reliable (plan text is hard to match row-by-row). Use `EXPLAIN` in your own practice after you understand the idea.

## Common mistakes

- Expecting `EXPLAIN` to return `title` values — it returns plan text in a column named `QUERY PLAN`.
- Treating cost numbers as “wrong answers” — they are estimates.
- Skipping `ORDER BY` on the graded `SELECT` when alphabetical order is required.

## Your turn

Return every `title` from `movies`, ordered by title (practice SELECT after reading the EXPLAIN example above).
