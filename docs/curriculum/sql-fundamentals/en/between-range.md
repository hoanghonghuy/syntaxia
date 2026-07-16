---
id: sql-17-between
track: sql-fundamentals
locale: en
slug: between-range
title: Filtering a range with BETWEEN
order: 17
published: true
objectives:
  - Keep values inside an inclusive range
  - Use BETWEEN instead of two comparisons
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "BETWEEN low AND high keeps values from low through high, including both ends."
    - "Filter year BETWEEN 2000 AND 2020, then select title."
    - "Try: SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

A range filter keeps values from a low bound through a high bound — like “years from 2000 to 2020 inclusive”. `BETWEEN` writes that clearly.

**movies** (full table)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

| title | year | Inside 2000–2020? |
| --- | --- | --- |
| Inception | 2010 | yes |
| The Matrix | 1999 | no (too early) |
| Dune | 2021 | no (too late) |
| Interstellar | 2014 | yes |

## Worked example

```sql
SELECT title
FROM movies
WHERE year BETWEEN 2000 AND 2020
ORDER BY title;
```

- `BETWEEN 2000 AND 2020` means `year >= 2000` and `year <= 2020`.
- Both endpoints are included when they appear in the data.
- Inception and Interstellar stay; The Matrix and Dune drop out.

Result:

| title |
| --- |
| Inception |
| Interstellar |

## Common mistakes

- Thinking the ends are excluded — `BETWEEN` includes both the low and high values.
- Writing the bounds backwards (`BETWEEN 2020 AND 2000`) — put the smaller number first.
- Using `BETWEEN` when you meant a short list of exact years — that is usually `IN`.

## Your turn

List the `title` of movies whose `year` is between `2000` and `2020` (inclusive). Sort with `ORDER BY title`.
