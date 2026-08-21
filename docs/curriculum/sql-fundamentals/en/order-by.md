---
id: sql-05-order
track: sql-fundamentals
locale: en
slug: order-by
title: Sorting with ORDER BY
order: 6
published: true
can_do: "Sort query results by a chosen column in ascending or descending order"
objectives:
  - Explain why row order is not guaranteed without ORDER BY
  - Sort by one result-related column
  - Choose ASC or DESC from the requirement
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "The task changes row order, not which rows survive. Add ORDER BY after the source clauses."
    - "Sort using year and choose DESC for newest/largest first."
    - "Use: SELECT title, year FROM movies ORDER BY year DESC;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Interstellar", 2014]
      - ["Inception", 2010]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

A result set has no business meaning such as “newest first” unless the query states that order. `ORDER BY` makes ordering part of the request instead of relying on whatever order happens to appear.

## Mental model

Sorting changes **position**, not membership.

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

If all four rows are selected, `ORDER BY year DESC` keeps all four and rearranges them by `year` from greatest to smallest.

| Direction | Numeric intuition | Year order here |
| --- | --- | --- |
| `ASC` | small -> large | 1999 -> 2010 -> 2014 -> 2021 |
| `DESC` | large -> small | 2021 -> 2014 -> 2010 -> 1999 |

## Predict before you run

```sql
SELECT title, year
FROM movies
ORDER BY year DESC;
```

Write the four years in the order you expect **before** running the query. The first row should be the movie from 2021; the last should be the movie from 1999.

## Worked example

```sql
SELECT title, year
FROM movies
ORDER BY year DESC;
```

| title | year |
| --- | --- |
| Dune | 2021 |
| Interstellar | 2014 |
| Inception | 2010 |
| The Matrix | 1999 |

`ASC` is the default direction if no direction is written, but writing the direction can make intent clearer when the requirement matters.

## Debug this

This clause has the right ideas in the wrong order:

```sql
ORDER BY DESC year
```

The sort expression comes first, then its direction: `ORDER BY year DESC`.

## Common mistakes

- Treating the table's current display order as guaranteed query order.
- Forgetting `DESC` when the requirement says newest, largest, or highest first.
- Placing `ORDER BY` before `WHERE`; ordering comes after row filtering in the written SELECT statement.

## Your turn

Return each movie's `title` and `year`, sorted from newest to oldest. Predict the first and last row before running it.

## Quick check

Does `ORDER BY` remove rows that do not match a condition?

**Answer:** no. `WHERE` filters membership; `ORDER BY` arranges the rows that remain.
