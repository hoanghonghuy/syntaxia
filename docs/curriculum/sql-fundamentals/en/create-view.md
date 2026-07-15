---
id: sql-35-view
track: sql-fundamentals
locale: en
slug: create-view
title: Saved queries with views
order: 35
published: true
objectives:
  - Create a view that filters rows
  - Query the view like a table
exercise:
  starter: "CREATE TEMP VIEW modern_movies AS "
  hints:
    - "A view stores a SELECT under a name — query it later like a table."
    - "In this sandbox use CREATE TEMP VIEW because the base table is temporary."
    - "Try: CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
  solution: "CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Matrix", 1999]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM modern_movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'Matrix', 1999);"
---

A **view** is a saved `SELECT` with a name. You query it like a table, but it does not store its own copy of the rows — it re-runs the query.

Base table `movies`:

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Matrix | 1999 |

```sql
CREATE VIEW modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

- `CREATE VIEW` names the saved query.
- `AS` introduces the `SELECT` that defines it.
- Later: `SELECT title FROM modern_movies;` returns only titles from year 2000 onward.

In this sandbox the base table is temporary, so use `CREATE TEMP VIEW` (same idea as a regular view, scoped to the session).

## Worked example

```sql
CREATE TEMP VIEW modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

- `modern_movies` is the view name.
- The filter keeps Inception (2010) and drops Matrix (1999).
- The grader then selects from the view.

## Common mistakes

- Writing only `CREATE VIEW` without `TEMP` here — temporary base tables need a temporary view in this sandbox.
- Forgetting `AS` before the `SELECT`.
- Filtering with the wrong comparison (`>` instead of `>=` when the task includes year 2000).

## Your turn

Create a temporary view `modern_movies` that selects `title` from movies with `year >= 2000`.
