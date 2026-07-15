---
id: pg-15-distinct
track: postgresql
locale: en
slug: distinct-on
title: One row per group with DISTINCT ON
order: 15
published: true
objectives:
  - Keep one row per key with DISTINCT ON
  - Pair DISTINCT ON with ORDER BY
exercise:
  starter: "SELECT director, title, year FROM movies ORDER BY director, year DESC;"
  hints:
    - "DISTINCT ON (director) keeps the first row for each director."
    - "ORDER BY must start with the same expression as DISTINCT ON, then the sort that picks the winner."
    - "Try: SELECT DISTINCT ON (director) director, title FROM movies ORDER BY director, year DESC;"
  solution: "SELECT DISTINCT ON (director) director, title FROM movies ORDER BY director, year DESC;"
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

You may want “the newest film per director” — one row per person, not every film. PostgreSQL’s `DISTINCT ON (column)` keeps the first row for each distinct value of that column, after sorting.

| id | director | title | year |
| --- | --- | --- | --- |
| 1 | Nolan | Inception | 2010 |
| 2 | Nolan | Interstellar | 2014 |
| 3 | Villeneuve | Arrival | 2016 |
| 4 | Villeneuve | Dune | 2021 |

## Worked example

```sql
SELECT DISTINCT ON (director) director, title
FROM movies
ORDER BY director, year DESC;
```

- `DISTINCT ON (director)` keeps one row per director.
- `ORDER BY director, year DESC` must start with `director`, then newest year first so the kept row is the latest film.
- Without matching `ORDER BY`, which row you keep is not meaningful.

Result:

| director | title |
| --- | --- |
| Nolan | Interstellar |
| Villeneuve | Dune |

This is a PostgreSQL-specific form; portable SQL often uses window functions or subqueries instead.

## Common mistakes

- Forgetting `ORDER BY` that starts with the same columns as `DISTINCT ON`.
- Sorting only by `year` without `director` first.
- Expecting every film to appear — `DISTINCT ON` intentionally drops extras.

## Your turn

For each `director`, return `director` and the `title` of their newest movie.
