---
id: sql-26-having
track: sql-fundamentals
locale: en
slug: having-filter
title: Filtering groups with HAVING
order: 26
published: true
can_do: "Choose WHERE or HAVING from the stage of data the condition refers to"
objectives:
  - Distinguish row filtering from group filtering
  - Trace WHERE -> GROUP BY -> aggregate -> HAVING
  - Keep only groups that satisfy an aggregate condition
exercise:
  starter: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id;"
  hints:
    - "The condition is about each group's COUNT(*), so it must run after grouping."
    - "Use HAVING COUNT(*) >= 2 after GROUP BY director_id."
    - "Use: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
  solution: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "Interstellar", 1]
      - [3, "The Matrix", 2]
      - [4, "Dune", 3]
  expected:
    columns: ["director_id", "movie_count"]
    rows:
      - [1, 2]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'Interstellar', 2014, 1), (3, 'The Matrix', 1999, 2), (4, 'Dune', 2021, 3);"
---

`WHERE` and `HAVING` both filter, but they operate on different stages of a query. The safest way to choose between them is to ask: **does the condition talk about source rows or about a group summary?**

## Mental model

Think through the pipeline instead of memorizing clause names:

| Stage | What exists here? | Typical filter |
| --- | --- | --- |
| source rows | individual movies | `WHERE year >= 2000` |
| groups | one bucket per `director_id` | `GROUP BY director_id` |
| group summaries | `COUNT(*)` for each bucket | `HAVING COUNT(*) >= 2` |

With this data, grouping produces:

| director_id | rows in group | count |
| ---: | --- | ---: |
| 1 | Inception, Interstellar | 2 |
| 2 | The Matrix | 1 |
| 3 | Dune | 1 |

The rule “directors with at least two movies” cannot be evaluated until those counts exist.

## Predict before you run

For `HAVING COUNT(*) >= 2`, predict which group survives: only `director_id = 1`. The result shape should be **2 columns × 1 row**.

## Worked example

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id
HAVING COUNT(*) >= 2
ORDER BY director_id;
```

| director_id | movie_count |
| ---: | ---: |
| 1 | 2 |

Read it in processing order: start with rows, build director buckets, count each bucket, then discard buckets whose count is below 2.

## Debug this

Why is this wrong for the requirement?

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
WHERE COUNT(*) >= 2
GROUP BY director_id;
```

`WHERE` runs before group aggregates exist, so `COUNT(*)` is not available there. Move an aggregate-based condition to `HAVING`.

## Common mistakes

- Putting an aggregate rule in `WHERE` instead of `HAVING`.
- Treating `HAVING` as a replacement for every `WHERE`; row-level conditions should usually stay in `WHERE`.
- Forgetting that `HAVING` filters already-built groups, so `GROUP BY` must match the intended grouping.

## Your turn

Return each `director_id` with at least two movies. Name the count `movie_count` and order by `director_id`. Say which stage creates the count before you run it.

## Quick check

Where should “movies released after 2000” be filtered, and where should “directors with at least two movies” be filtered?

**Answer:** `WHERE` for the row condition; `HAVING` for the aggregate group condition.
