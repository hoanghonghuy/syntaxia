---
id: sql-12-minmax
track: sql-fundamentals
locale: en
slug: min-and-max
title: Finding extremes with MIN and MAX
order: 12
published: true
objectives:
  - Find the smallest value with MIN
  - Find the largest value with MAX
exercise:
  starter: "SELECT year FROM movies;"
  hints:
    - "MIN and MAX look across a whole column and return one value."
    - "Give the result a clear name with AS, such as newest_year."
    - "Try: SELECT MAX(year) AS newest_year FROM movies;"
  solution: "SELECT MAX(year) AS newest_year FROM movies;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["The Matrix", 1999]
      - ["Dune", 2021]
  expected:
    columns: ["newest_year"]
    rows:
      - [2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Dune', 2021);"
---

Sometimes you do not need every row — you need the smallest or largest number in a column, like the earliest or latest year in a list.

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |
| Dune | 2021 |

## Worked example

```sql
SELECT MIN(year) AS oldest_year FROM movies;
```

- `MIN(year)` scans the `year` column and keeps the smallest value (`1999`).
- `MAX(year)` would keep the largest (`2021`).
- `AS oldest_year` names the result column so the output is easier to read.

Result:

| oldest_year |
| --- |
| 1999 |

## Common mistakes

- Expecting one row per movie — `MIN` / `MAX` return a single summary value, not a filtered list of titles.
- Forgetting parentheses: write `MAX(year)`, not `MAX year`.
- Mixing up which extreme you need — `MIN` is smallest; `MAX` is largest.

## Your turn

Find the newest release year in `movies`. Return one column named `newest_year` using `MAX(year)`.
