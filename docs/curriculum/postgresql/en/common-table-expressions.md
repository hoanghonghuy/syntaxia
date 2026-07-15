---
id: pg-21-cte
track: postgresql
locale: en
slug: common-table-expressions
title: Named steps with WITH (CTE)
order: 21
published: true
objectives:
  - Name a temporary result with WITH
  - Query that named result in the same statement
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "WITH name AS (SELECT …) defines a temporary named result."
    - "Then SELECT from that name as if it were a table."
    - "Try: WITH recent AS (SELECT title, year FROM movies WHERE year >= 2010) SELECT title FROM recent ORDER BY title;"
  solution: "WITH recent AS (SELECT title, year FROM movies WHERE year >= 2010) SELECT title FROM recent ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
      - [4, "Dune", 2021]
  expected:
    columns: ["title"]
    rows:
      - ["Arrival"]
      - ["Dune"]
      - ["Inception"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016), (4, 'Dune', 2021);"
---

Long queries are easier when you name an intermediate step — like a labeled range in a spreadsheet. A **common table expression (CTE)** uses `WITH name AS (…)` to define that step, then you `SELECT` from it in the same statement.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Arrival | 2016 |
| 4 | Dune | 2021 |

## Worked example

```sql
WITH recent AS (
  SELECT title, year FROM movies WHERE year >= 2010
)
SELECT title FROM recent ORDER BY title;
```

- `WITH recent AS (…)` builds a temporary named result of movies from 2010 onward.
- The outer `SELECT` reads only from `recent`.
- The Matrix (1999) never enters `recent`, so it does not appear.

Result:

| title |
| --- |
| Arrival |
| Dune |
| Inception |

## Common mistakes

- Forgetting the outer `SELECT` after the CTE definition.
- Referencing the base table only, skipping the CTE name the task asks for.
- Omitting `ORDER BY title` when the expected order is alphabetical.

## Your turn

Define a CTE `recent` for movies with `year >= 2010`, then return their `title` ordered by title.
