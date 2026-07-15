---
id: sql-04-aggregate
track: sql-fundamentals
locale: en
slug: group-by-aggregate
title: Counting with GROUP BY
order: 25
published: true
objectives:
  - Count rows per group
  - Use GROUP BY with COUNT
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
  expected:
    columns: ["director_id", "movie_count"]
    rows:
      - [1, 2]
      - [2, 1]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'Interstellar', 1), (3, 'The Matrix', 2);"
---

Sometimes you want a summary, not every row — like a pivot table: “how many movies per director?”

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |
| 2 | Interstellar | 1 |
| 3 | The Matrix | 2 |

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

Result:

| director_id | movie_count |
| --- | --- |
| 1 | 2 |
| 2 | 1 |

## Common mistakes

- Using `COUNT(*)` without `GROUP BY` when you need a count **per** director — that returns one total for the whole table.
- Selecting `title` alongside `COUNT(*)` without grouping by `title` — non-grouped columns usually cause an error.
- Forgetting `AS movie_count` when the expected result uses that column name.

## Your turn

Count movies per `director_id`, ordered by `director_id`. Name the count column `movie_count`.
