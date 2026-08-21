---
id: sql-13-count
track: sql-fundamentals
locale: en
slug: count-rows
title: Counting rows with COUNT
order: 13
published: true
can_do: "Count source rows with COUNT(*) and distinguish row counting from counting non-NULL column values"
objectives:
  - Use COUNT(*) to count rows
  - Predict the scalar result of an aggregate
  - Contrast COUNT(*) with COUNT(column)
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "The task asks how many rows exist, not for their titles."
    - "COUNT(*) counts every row; name the single result movie_count."
    - "Use: SELECT COUNT(*) AS movie_count FROM movies;"
  solution: "SELECT COUNT(*) AS movie_count FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["movie_count"]
    rows:
      - [4]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

When the question is “how many?”, returning all rows and counting them yourself is unnecessary. `COUNT` lets the database produce the count directly.

## Mental model

`COUNT(*)` treats each source row as one item to count.

| source row | contributes to `COUNT(*)`? |
| --- | --- |
| Inception | +1 |
| The Matrix | +1 |
| Dune | +1 |
| Interstellar | +1 |

Four input rows become one aggregate result: `4`.

A useful distinction from the previous NULL lesson:

- `COUNT(*)` counts rows.
- `COUNT(rating)` counts rows where `rating` is **not NULL**.

## Predict before you run

```sql
SELECT COUNT(*) AS movie_count
FROM movies;
```

Predict: **one row** containing `4`. The result is not four rows with the number `1`; aggregation summarizes the set.

## Worked example

```sql
SELECT COUNT(*) AS movie_count
FROM movies;
```

| movie_count |
| ---: |
| 4 |

The alias makes the meaning of the scalar result clear to a reader or API consumer.

## Debug this

A table contains four rows, but one row has `rating = NULL`. Why might this return `3` while `COUNT(*)` returns `4`?

```sql
SELECT COUNT(rating)
FROM movies;
```

`COUNT(column)` ignores NULL values in that expression. Use `COUNT(*)` when the requirement is the number of rows.

## Common mistakes

- Using `COUNT(column)` when the real requirement is “number of rows”.
- Expecting COUNT to return the original rows as well as the count.
- Confusing COUNT with SUM; COUNT counts items, SUM adds numeric values.

## Your turn

Count all rows in `movies` and return one column named `movie_count`.

## Quick check

If a row exists but one of its columns is NULL, does `COUNT(*)` still count that row?

**Answer:** yes. `COUNT(*)` counts rows regardless of NULLs inside them.
