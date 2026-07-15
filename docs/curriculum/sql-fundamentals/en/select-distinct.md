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
    columns: ["id", "director"]
    rows:
      - [1, "Nolan"]
      - [2, "Nolan"]
      - [3, "Wachowski"]
  expected:
    columns: ["director"]
    rows:
      - ["Nolan"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Nolan'), (2, 'Nolan'), (3, 'Wachowski');"
---

A table can repeat the same value in many rows. When you only need each value once — like a unique list of directors — use `DISTINCT`.

| id | director |
| --- | --- |
| 1 | Nolan |
| 2 | Nolan |
| 3 | Wachowski |

## Worked example

```sql
SELECT DISTINCT director FROM movies ORDER BY director;
```

- `SELECT director` alone would return Nolan twice.
- `DISTINCT` keeps each director value only once.
- `ORDER BY director` sorts the list so the result order is stable (Nolan, then Wachowski).

Result:

| director |
| --- |
| Nolan |
| Wachowski |

## Common mistakes

- Writing `SELECT director DISTINCT` — `DISTINCT` belongs immediately after `SELECT`.
- Expecting `DISTINCT` to remove whole duplicate rows when you selected several columns — it applies to the combination of columns you listed.
- Forgetting that without `ORDER BY`, the order of distinct values is not guaranteed.

## Your turn

List each distinct `director` from `movies`, sorted by `director`.
