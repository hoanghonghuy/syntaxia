---
id: sql-04-aggregate
track: sql-fundamentals
locale: en
slug: group-by-aggregate
title: Counting with GROUP BY
order: 25
published: true
can_do: "Partition rows into groups and compute one aggregate result per group"
objectives:
  - Build groups from equal key values
  - Apply COUNT(*) inside each group
  - Distinguish whole-table aggregation from grouped aggregation
exercise:
  starter: "SELECT director_id FROM movies;"
  hints:
    - "The requirement wants one count per director rather than one count for the whole table."
    - "GROUP BY director_id forms the buckets; COUNT(*) summarizes each bucket."
    - "Use: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id ORDER BY director_id;"
  solution: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id ORDER BY director_id;"
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
      - [2, 1]
      - [3, 1]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'Interstellar', 2014, 1), (3, 'The Matrix', 1999, 2), (4, 'Dune', 2021, 3);"
---

Block C used aggregates to summarize the whole input set. `GROUP BY` changes the unit of aggregation: first split rows into buckets, then compute a summary inside each bucket.

## Mental model

Reason in two stages: **bucket -> aggregate**.

Source rows:

| title | director_id |
| --- | ---: |
| Inception | 1 |
| Interstellar | 1 |
| The Matrix | 2 |
| Dune | 3 |

After `GROUP BY director_id`:

| group key | rows in bucket | `COUNT(*)` |
| ---: | --- | ---: |
| 1 | Inception, Interstellar | 2 |
| 2 | The Matrix | 1 |
| 3 | Dune | 1 |

The result now has **one row per group**, not one row per movie and not one row for the entire table.

## Predict before you run

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id;
```

Predict three result rows with counts `2, 1, 1`. Compare that with `SELECT COUNT(*) FROM movies`, which would return one whole-table count: `4`.

## Worked example

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id
ORDER BY director_id;
```

| director_id | movie_count |
| ---: | ---: |
| 1 | 2 |
| 2 | 1 |
| 3 | 1 |

`director_id` is valid beside the aggregate because it is the grouping key: every output row represents one value of that key.

## Debug this

Why is this not a well-defined grouped result?

```sql
SELECT title, COUNT(*)
FROM movies
GROUP BY director_id;
```

A director group can contain multiple different titles. SQL cannot pick one arbitrary `title` to represent the whole group. Select grouping keys and aggregates, or deliberately change the grouping.

## Common mistakes

- Forgetting GROUP BY and getting one total for the entire table.
- Selecting a non-grouped, non-aggregated column that has multiple possible values inside a group.
- Thinking GROUP BY sorts output; use ORDER BY when order matters.

## Your turn

Count movies per `director_id`, name the count `movie_count`, and order by director ID. Build the three buckets manually before running.

## Quick check

What decides the number of rows in a grouped aggregate result?

**Answer:** the number of distinct groups produced by the GROUP BY keys (subject to later filtering such as HAVING).
