---
id: sql-04-aggregate
track: sql-fundamentals
locale: en
slug: group-by-aggregate
title: Counting with GROUP BY
order: 25
published: true
objectives:
  - Bucket rows with GROUP BY
  - Count rows per group with COUNT(*)
  - Alias the count column for a clear result
exercise:
  starter: "SELECT director_id FROM movies;"
  hints:
    - "COUNT(*) counts how many rows fall in each group."
    - "GROUP BY director_id buckets rows that share the same director."
    - "Try: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id ORDER BY director_id;"
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

Sometimes you want a summary, not every row — like a pivot table: “how many movies per director?”

**movies** (full table)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | Interstellar | 2014 | 1 |
| 3 | The Matrix | 1999 | 2 |
| 4 | Dune | 2021 | 3 |

| director_id | titles in the group | count |
| --- | --- | --- |
| 1 | Inception, Interstellar | 2 |
| 2 | The Matrix | 1 |
| 3 | Dune | 1 |

## Worked example

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id
ORDER BY director_id;
```

- `GROUP BY director_id` buckets rows that share the same director.
- `COUNT(*)` counts rows in each bucket.
- `AS movie_count` names the result column so the grader can match it.
- `ORDER BY director_id` keeps the groups in a stable order.
- Filtering groups after they are built is covered later in `having-filter`.

Result:

| director_id | movie_count |
| --- | --- |
| 1 | 2 |
| 2 | 1 |
| 3 | 1 |

## Common mistakes

- Using `COUNT(*)` without `GROUP BY` when you need a count **per** director — that returns one total for the whole table.
- Selecting `title` alongside `COUNT(*)` without grouping by `title` — non-grouped columns usually cause an error.
- Forgetting `AS movie_count` when the expected result uses that column name.

## Your turn

Count movies per `director_id`, ordered by `director_id`. Name the count column `movie_count`.
