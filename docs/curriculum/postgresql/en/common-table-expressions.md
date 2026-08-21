---
id: pg-21-cte
track: postgresql
locale: en
slug: common-table-expressions
title: Structuring queries with WITH (CTE)
order: 21
published: true
can_do: "Use a CTE as a named query step while separating readability/scope from assumptions about execution performance"
objectives:
  - Name an intermediate query result with WITH
  - Trace data flow from a CTE into its consuming query
  - Avoid treating every CTE as an automatic optimization boundary
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Create a named result recent containing movies from 2010 onward."
    - "The outer SELECT should read from recent, not rebuild the filter."
    - "Use: WITH recent AS (SELECT title, year FROM movies WHERE year >= 2010) SELECT title FROM recent ORDER BY title;"
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

A common table expression gives a query step a name for the duration of one statement. Use it to expose intent and structure complex logic into understandable stages.

## Mental model

```text
base table movies
      |
      v
CTE recent: filter year >= 2010
      |
      v
outer query: project title + order
```

The CTE name is a query-scoped relation, not a permanent table and not automatically a performance optimization.

Modern PostgreSQL can sometimes fold a side-effect-free, non-recursive CTE into the parent query; in other cases materialization can matter. Start by using CTEs for clear query structure, then inspect plans when performance matters.

## Predict before you run

The Matrix never enters `recent`. The outer query sees Arrival, Dune, Inception and orders them alphabetically.

## Worked example

```sql
WITH recent AS (
  SELECT title, year
  FROM movies
  WHERE year >= 2010
)
SELECT title
FROM recent
ORDER BY title;
```

| title |
| --- |
| Arrival |
| Dune |
| Inception |

## Debug this

A query is split into five CTEs only because “CTEs are faster”. That premise is unsafe. Query readability and execution planning are separate concerns; use `EXPLAIN` to validate a performance claim instead of inferring it from syntax shape.

```text
WITH step1 AS (...), step2 AS (...), step3 AS (...) ...
```

## Common mistakes

- Defining a CTE and then accidentally querying the base table again.
- Assuming the CTE persists beyond the statement.
- Treating CTE syntax as a guaranteed optimization or materialization strategy.

## Your turn

Build a CTE named `recent` for movies from 2010 onward, then select its titles alphabetically.

## Quick check

What is the safest primary reason to introduce a CTE in application SQL?

**Answer:** to name and structure a query step clearly; performance effects should be verified with the planner rather than assumed.
