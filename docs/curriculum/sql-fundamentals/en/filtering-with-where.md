---
id: sql-02-where
track: sql-fundamentals
locale: en
slug: filtering-with-where
title: Filtering with WHERE
order: 4
published: true
can_do: "Filter source rows with a WHERE condition and predict which rows survive"
objectives:
  - Separate column selection from row filtering
  - Evaluate a numeric comparison for each row
  - Use WHERE to keep only matching rows
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "The task is about which rows survive, so add a WHERE condition after FROM movies."
    - "Compare the year column with 2000 using >."
    - "Use: SELECT title FROM movies WHERE year > 2000 ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year > 2000 ORDER BY title;"
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
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

A useful query often needs fewer rows, not just fewer columns. `WHERE` turns a condition into a yes/no decision for each source row.

## Mental model

Keep these jobs separate:

| Clause | Main job |
| --- | --- |
| `SELECT` | Decide the result columns |
| `FROM` | Name the source table |
| `WHERE` | Decide which source rows survive |

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

For `WHERE year > 2000`, imagine evaluating one row at a time.

| title | `year > 2000` | Keep? |
| --- | --- | --- |
| Inception | true | yes |
| The Matrix | false | no |
| Dune | true | yes |
| Interstellar | true | yes |

## Predict before you run

```sql
SELECT title
FROM movies
WHERE year > 2000;
```

Before running it, name the three surviving titles. Also predict the shape: **1 column, 3 rows**.

## Worked example

```sql
SELECT title
FROM movies
WHERE year > 2000
ORDER BY title;
```

Result:

| title |
| --- |
| Dune |
| Inception |
| Interstellar |

The comparison does not change the stored `year` values. It only controls whether each row participates in this result.

## Debug this

A task says “movies released after 2000”, but someone writes:

```sql
SELECT title
FROM movies
WHERE year = 2000;
```

`=` means exactly equal. It will not match 2010, 2014, or 2021. Translate the requirement first: “after 2000” means `year > 2000`.

## Common mistakes

- Choosing the right columns but forgetting the row condition.
- Using `=` when the requirement implies `>`, `<`, `>=`, or `<=`.
- Placing `WHERE` before `FROM`; the clause order is `SELECT ... FROM ... WHERE ...`.

## Your turn

Return only the `title` of movies released after 2000, ordered by `title`. Predict which row will be rejected before you run the query.

## Quick check

If `SELECT` changes which columns appear, which clause changes which rows survive?

**Answer:** `WHERE`.
