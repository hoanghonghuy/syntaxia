---
id: sql-01-select
track: sql-fundamentals
locale: en
slug: select-queries
title: Writing SELECT queries
order: 2
published: true
can_do: "Choose exactly which columns a query returns without changing the source rows"
objectives:
  - Select more than one specific column
  - Predict a result's column shape from the SELECT list
  - Contrast explicit columns with SELECT *
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "The task asks for two named output columns, not every column."
    - "Replace * with title, year after SELECT."
    - "Use: SELECT title, year FROM movies ORDER BY title;"
  solution: "SELECT title, year FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Inception", 2010]
      - ["Interstellar", 2014]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Real applications rarely need every column. Returning only what the screen, report, or API needs makes the result easier to understand and gives the query a clear contract.

## Mental model

Think of the `SELECT` list as the **shape of the output**.

**Source: movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Compare these requests:

| SELECT list | Result columns |
| --- | --- |
| `*` | `id`, `title`, `year`, `director` |
| `title` | `title` |
| `title, year` | `title`, `year` |

At this stage, changing the SELECT list changes **columns**, not which source rows exist.

## Predict before you run

```sql
SELECT title, year
FROM movies;
```

Predict the result dimensions:

- **2 columns**: `title`, `year`
- **4 rows**: one for each movie, because there is still no `WHERE` filter

The `id` and `director` values do not disappear from storage; they simply are not part of this result.

## Worked example

```sql
SELECT title, year
FROM movies
ORDER BY title;
```

Result:

| title | year |
| --- | --- |
| Dune | 2021 |
| Inception | 2010 |
| Interstellar | 2014 |
| The Matrix | 1999 |

The comma separates expressions in the SELECT list. Their left-to-right order also becomes the left-to-right column order in the result.

`ORDER BY title` is included only to make the exercise result deterministic; a later lesson focuses on sorting.

## Debug this

This looks close, but it does not request two output columns:

```sql
SELECT title year
FROM movies;
```

Without the comma, SQL can interpret `year` as an alias for `title` rather than as a second selected column. If you want two columns, separate them explicitly: `title, year`.

## Common mistakes

- Keeping `*` when a task asks for specific columns.
- Forgetting commas between selected columns.
- Assuming `SELECT title, year` automatically filters rows. Row filtering is a separate job handled by `WHERE`.

## Your turn

Change the starter query so the result contains exactly `title` and `year` for every movie, ordered by `title`.

## Quick check

If a table has ten columns but your SELECT list contains three column names, how many columns does the result have?

**Answer:** three. The SELECT list defines the output column shape.
