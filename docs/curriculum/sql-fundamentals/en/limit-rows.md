---
id: sql-07-limit
track: sql-fundamentals
locale: en
slug: limit-rows
title: Limiting rows with LIMIT
order: 7
published: true
objectives:
  - Cap how many rows a query returns
  - Combine ORDER BY with LIMIT for a top-N list
exercise:
  starter: "SELECT title FROM movies ORDER BY year DESC;"
  hints:
    - "ORDER BY year DESC puts the newest films first, but still returns every row."
    - "Add LIMIT n at the end to keep only the first n rows after sorting."
    - "Try: SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
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

Sometimes you only need the first few rows — the two newest films, not the whole catalog. `LIMIT` caps how many rows come back **after** sorting.

**movies** (full table)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

After `ORDER BY year DESC` the order is: Dune → Interstellar → Inception → The Matrix.  
`LIMIT 2` keeps only the first two of that list.

## Worked example

```sql
SELECT title
FROM movies
ORDER BY year DESC
LIMIT 2;
```

- `ORDER BY year DESC` sorts newest first.
- `LIMIT 2` keeps only the first two rows of that sorted list.
- Without `ORDER BY`, `LIMIT` still caps the count, but which rows you get is not meaningful for “newest”.

Result:

| title |
| --- |
| Dune |
| Interstellar |

## Common mistakes

- Putting `LIMIT` before `ORDER BY` — `LIMIT` belongs at the end of the statement.
- Using `LIMIT` alone when the task asks for newest or top values — sort first, then limit.
- Writing `LIMIT = 2` — use `LIMIT 2` with no equals sign.

## Your turn

Return the two newest movie titles: sort by `year` descending, then keep only two rows.
