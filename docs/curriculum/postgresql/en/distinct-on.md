---
id: pg-15-distinct
track: postgresql
locale: en
slug: distinct-on
title: Deterministic one-row-per-group with DISTINCT ON
order: 15
published: true
can_do: "Use PostgreSQL DISTINCT ON with a compatible deterministic ORDER BY to select one intended row per group"
objectives:
  - Explain why DISTINCT ON keeps the first row in each group
  - Align DISTINCT ON expressions with the leftmost ORDER BY keys
  - Add tie-breakers when the winner must be deterministic
exercise:
  starter: "SELECT director, title, year FROM movies ORDER BY director, year DESC;"
  hints:
    - "DISTINCT ON (director) keeps the first sorted row for each director."
    - "ORDER BY must begin with director, then put newest year first."
    - "Use: SELECT DISTINCT ON (director) director, title FROM movies ORDER BY director, year DESC, id DESC;"
  solution: "SELECT DISTINCT ON (director) director, title FROM movies ORDER BY director, year DESC, id DESC;"
  preview:
    columns: ["id", "director", "title", "year"]
    rows:
      - [1, "Nolan", "Inception", 2010]
      - [2, "Nolan", "Interstellar", 2014]
      - [3, "Villeneuve", "Arrival", 2016]
      - [4, "Villeneuve", "Dune", 2021]
  expected:
    columns: ["director", "title"]
    rows:
      - ["Nolan", "Interstellar"]
      - ["Villeneuve", "Dune"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, director TEXT, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Nolan', 'Inception', 2010), (2, 'Nolan', 'Interstellar', 2014), (3, 'Villeneuve', 'Arrival', 2016), (4, 'Villeneuve', 'Dune', 2021);"
---

`DISTINCT ON` is a PostgreSQL-specific shortcut for “choose one row per group”. The critical idea is that it keeps the **first row after ordering**, so ordering defines the winner.

## Mental model

Pipeline:

```text
sort rows by group + winner criteria -> DISTINCT ON keeps first row of each group
```

For Nolan, year descending places Interstellar before Inception. For Villeneuve, Dune comes before Arrival.

PostgreSQL requires the `DISTINCT ON` expression(s) to match the leftmost `ORDER BY` expression(s). Extra ORDER BY keys decide precedence within a group.

## Predict before you run

Predict one winner per director: Nolan → Interstellar; Villeneuve → Dune.

## Worked example

```sql
SELECT DISTINCT ON (director) director, title
FROM movies
ORDER BY director, year DESC, id DESC;
```

| director | title |
| --- | --- |
| Nolan | Interstellar |
| Villeneuve | Dune |

The `id DESC` tie-breaker matters if two rows share the same director and year; without enough ordering, “first” can still be ambiguous.

## Debug this

```sql
SELECT DISTINCT ON (director) director, title
FROM movies;
```

This asks PostgreSQL to keep one row per director but never tells it which row is preferred. A query can be syntactically valid yet semantically nondeterministic.

## Common mistakes

- Omitting ORDER BY and assuming a meaningful first row.
- Failing to start ORDER BY with the DISTINCT ON expressions.
- Forgetting a tie-breaker when business semantics require exactly one stable winner.

## Your turn

Return the newest movie for each director using `DISTINCT ON`, with a deterministic tie-breaker.

## Quick check

What decides which row survives inside each DISTINCT ON group?

**Answer:** the row that appears first according to the compatible ORDER BY sequence.
