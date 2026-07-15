---
id: sql-26-having
track: sql-fundamentals
locale: en
slug: having-filter
title: Filtering groups with HAVING
order: 26
published: true
objectives:
  - Filter aggregated groups with HAVING
  - Contrast HAVING with WHERE
exercise:
  starter: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id;"
  hints:
    - "WHERE filters rows before grouping; HAVING filters groups after COUNT."
    - "Keep only groups where COUNT(*) is at least 2."
    - "Try: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
  solution: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
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
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'Interstellar', 1), (3, 'The Matrix', 2);"
---

`GROUP BY` builds buckets. Sometimes you only want buckets that meet a rule — for example, directors with at least two movies. That filter belongs in `HAVING`, not in `WHERE`, because it looks at the group total after counting.

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
HAVING COUNT(*) >= 2
ORDER BY director_id;
```

- `GROUP BY director_id` builds one bucket per director.
- `COUNT(*)` measures each bucket.
- `HAVING COUNT(*) >= 2` keeps only buckets with two or more movies.

Result:

| director_id | movie_count |
| --- | --- |
| 1 | 2 |

## Common mistakes

- Putting `COUNT(*) >= 2` in `WHERE` — aggregates are not ready until after `GROUP BY`.
- Forgetting `GROUP BY` when using `HAVING`.
- Omitting `AS movie_count` when the expected column uses that name.

## Your turn

Return each `director_id` with at least two movies. Name the count `movie_count` and order by `director_id`.
