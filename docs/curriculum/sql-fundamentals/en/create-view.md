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
  - Use CREATE TEMP VIEW when the base table is temporary
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
      - [2, "The Matrix", 1999]
      - [3, "Interstellar", 2014]
      - [4, "Dune", 2021]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM modern_movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Interstellar', 2014), (4, 'Dune', 2021);"
---

A **view** is a saved `SELECT` with a name. You query it like a table, but it does not store its own copy of the rows — it re-runs the query.

**movies** (base table)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |
| 3 | Interstellar | 2014 |
| 4 | Dune | 2021 |

| title | year | In `modern_movies` (`year >= 2000`)? |
| --- | --- | --- |
| Inception | 2010 | yes |
| The Matrix | 1999 | no |
| Interstellar | 2014 | yes |
| Dune | 2021 | yes |

```sql
CREATE VIEW modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

In this sandbox the base table is temporary, so use `CREATE TEMP VIEW` (same idea as a regular view, scoped to the session).

## Worked example

```sql
CREATE TEMP VIEW modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

- `modern_movies` is the view name.
- The filter keeps titles from year 2000 onward and drops The Matrix (1999).
- The grader then selects from the view: `SELECT title FROM modern_movies ORDER BY title`.

Result from the view:

| title |
| --- |
| Dune |
| Inception |
| Interstellar |

## Common mistakes

- Writing only `CREATE VIEW` without `TEMP` here — temporary base tables need a temporary view in this sandbox.
- Forgetting `AS` before the `SELECT`.
- Filtering with the wrong comparison (`>` instead of `>=` when the task includes year 2000).

## Your turn

Create a temporary view `modern_movies` that selects `title` from movies with `year >= 2000`.
