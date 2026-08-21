---
id: sql-35-view
track: sql-fundamentals
locale: en
slug: create-view
title: Saved queries with views
order: 35
published: true
can_do: "Expose a reusable query as a view and reason about the view as a derived interface over base data"
objectives:
  - Distinguish a view definition from a copied table
  - Create a view from a SELECT
  - Query the derived interface and predict its rows
exercise:
  starter: "CREATE TEMP VIEW modern_movies AS "
  hints:
    - "Define a named SELECT; do not copy rows into another table."
    - "The temporary base table requires a temporary view in this sandbox."
    - "Use: CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
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

A view gives a reusable name to a query. Think of it as a **derived interface** over base data rather than a second manually synchronized copy of the table.

## Mental model

Base table:

| title | year |
| --- | ---: |
| Inception | 2010 |
| The Matrix | 1999 |
| Interstellar | 2014 |
| Dune | 2021 |

View definition:

```text
movies -> filter year >= 2000 -> project title -> modern_movies
```

Expected view rows: Dune, Inception, Interstellar. The Matrix is excluded by the definition.

## Predict before you run

After creating the view, `SELECT title FROM modern_movies ORDER BY title` should return three rows. No separate INSERT into `modern_movies` is needed.

## Worked example

```sql
CREATE TEMP VIEW modern_movies AS
SELECT title
FROM movies
WHERE year >= 2000;
```

The sandbox uses a temporary view because its base table is temporary. The core concept is the same as a regular `CREATE VIEW`.

## Debug this

```sql
CREATE TEMP TABLE modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

This creates a table snapshot, not the requested view abstraction. Both may initially show similar rows, but their data semantics are different.

## Common mistakes

- Confusing a view with a copied table.
- Forgetting `AS` before the defining SELECT.
- Writing a filter whose boundary does not match the requirement (`>` instead of `>=`).

## Your turn

Create temporary view `modern_movies` that exposes titles with `year >= 2000`. Predict its three rows before running.

## Quick check

What primarily defines the rows visible through a view?

**Answer:** the SELECT query stored as the view definition.
