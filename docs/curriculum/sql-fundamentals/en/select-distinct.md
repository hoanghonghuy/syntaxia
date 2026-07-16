---
id: sql-03-distinct
track: sql-fundamentals
locale: en
slug: select-distinct
title: Unique values with DISTINCT
order: 3
published: true
objectives:
  - Remove duplicate values from a result
  - Use SELECT DISTINCT on one column
exercise:
  starter: "SELECT director FROM movies;"
  hints:
    - "Without DISTINCT, the same director can appear more than once."
    - "Place DISTINCT right after SELECT."
    - "Try: SELECT DISTINCT director FROM movies ORDER BY director;"
  solution: "SELECT DISTINCT director FROM movies ORDER BY director;"
  preview:
    columns: ["id", "title", "director"]
    rows:
      - [1, "Inception", "Nolan"]
      - [2, "Interstellar", "Nolan"]
      - [3, "The Matrix", "Wachowski"]
      - [4, "Dune", "Villeneuve"]
  expected:
    columns: ["director"]
    rows:
      - ["Nolan"]
      - ["Villeneuve"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 'Nolan'), (2, 'Interstellar', 'Nolan'), (3, 'The Matrix', 'Wachowski'), (4, 'Dune', 'Villeneuve');"
---

A table can repeat the same value in many rows. When you only need each value once — like a unique list of directors — use `DISTINCT`.

**movies** (full table — notice Nolan appears twice)

| id | title | director |
| --- | --- | --- |
| 1 | Inception | Nolan |
| 2 | Interstellar | Nolan |
| 3 | The Matrix | Wachowski |
| 4 | Dune | Villeneuve |

If you select `director` without `DISTINCT`, Nolan shows up twice (once per film).

## Worked example

```sql
SELECT DISTINCT director
FROM movies
ORDER BY director;
```

- `SELECT director` alone would return Nolan, Nolan, Wachowski, Villeneuve.
- `DISTINCT` keeps each director value only once.
- `ORDER BY director` sorts the list A→Z so the result order is stable.

Result:

| director |
| --- |
| Nolan |
| Villeneuve |
| Wachowski |

## Common mistakes

- Writing `SELECT director DISTINCT` — `DISTINCT` belongs immediately after `SELECT`.
- Expecting `DISTINCT` to remove whole duplicate rows when you selected several columns — it applies to the combination of columns you listed.
- Forgetting that without `ORDER BY`, the order of distinct values is not guaranteed.

## Your turn

List each distinct `director` from `movies`, sorted by `director`.
