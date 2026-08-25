---
id: sql-07-limit
track: sql-fundamentals
locale: en
slug: limit-rows
title: Limiting rows with LIMIT
order: 7
published: true
can_do: "Build a deterministic top-N query by sorting first and then limiting the number of rows"
objectives:
  - Cap the number of returned rows with LIMIT
  - Explain why top-N queries need an explicit order
  - Combine ORDER BY and LIMIT in the correct clause order
exercise:
  starter: "SELECT title FROM movies ORDER BY year DESC;"
  hints:
    - "The rows are already sorted newest first; the remaining job is to cap how many survive in the result."
    - "Add LIMIT at the end of the query and use the requested count 2."
    - "Use: SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
  solution: "SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

“Give me two rows” and “give me the two newest rows” are different requests. `LIMIT` controls count; `ORDER BY` gives that count a deterministic meaning.

## Mental model

For a top-N query, reason in two stages:

1. **Order the candidate rows** into the ranking you care about.
2. **Take the first N rows** from that ordered result.

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

After sorting by `year DESC`:

| position | title | year |
| --- | --- | --- |
| 1 | Dune | 2021 |
| 2 | Interstellar | 2014 |
| 3 | Inception | 2010 |
| 4 | The Matrix | 1999 |

`LIMIT 2` then keeps positions 1 and 2.

## Predict before you run

```sql
SELECT title
FROM movies
ORDER BY year DESC
LIMIT 2;
```

Before running, identify which operation decides **who is first** and which operation decides **how many rows remain**.

Prediction: `ORDER BY year DESC` ranks the movies; `LIMIT 2` returns Dune and Interstellar.

## Worked example

```sql
SELECT title
FROM movies
ORDER BY year DESC
LIMIT 2;
```

| title |
| --- |
| Dune |
| Interstellar |

Using `LIMIT 2` without a meaningful `ORDER BY` can still return two rows, but it does not express “the newest two”. A top-N requirement needs both operations.

## Debug this

Why does this fail syntactically?

```sql
SELECT title
FROM movies
LIMIT 2
ORDER BY year DESC;
```

In PostgreSQL/this SQL sandbox, the written SELECT clause order places `ORDER BY` before `LIMIT`. Write the ranking first, then the cap.

## Common mistakes

- Using `LIMIT` alone for a “top”, “newest”, “highest”, or “lowest” requirement.
- Reversing `ORDER BY` and `LIMIT` in the statement.
- Writing `LIMIT = 2`; `LIMIT` takes the count directly.

## Your turn

Return the two newest movie titles. Before running, trace the two-stage pipeline: first rank all four movies, then keep two.

## Quick check

Why is `ORDER BY` important in a top-N query?

**Answer:** it defines which rows count as the first N; `LIMIT` only caps the number returned.
