---
id: sql-03-distinct
track: sql-fundamentals
locale: en
slug: select-distinct
title: Unique values with DISTINCT
order: 3
published: true
can_do: "Return unique result rows with DISTINCT and explain what counts as a duplicate"
objectives:
  - Remove duplicate values from a one-column result
  - Predict how DISTINCT changes the number of result rows
  - Understand that DISTINCT applies to the selected column combination
exercise:
  starter: "SELECT director FROM movies;"
  hints:
    - "The plain director result contains Nolan twice."
    - "Place DISTINCT immediately after SELECT so duplicate result rows collapse."
    - "Use: SELECT DISTINCT director FROM movies ORDER BY director;"
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

Duplicate values are normal in stored data. Two movies can have the same director. The question is whether your **result** needs every occurrence or only unique values.

## Mental model

`DISTINCT` removes duplicate **result rows after the SELECT list has defined their shape**.

**movies**

| id | title | director |
| --- | --- | --- |
| 1 | Inception | Nolan |
| 2 | Interstellar | Nolan |
| 3 | The Matrix | Wachowski |
| 4 | Dune | Villeneuve |

A plain `SELECT director` produces four result rows because there are four movies. Two of those rows contain the same value: Nolan.

## Predict before you run

```sql
SELECT DISTINCT director
FROM movies;
```

Which rows can remain if duplicates are collapsed?

- Nolan appears twice in the source but once in the distinct result.
- Villeneuve appears once.
- Wachowski appears once.

So the result should have **3 rows**, not 4.

## Worked example

```sql
SELECT DISTINCT director
FROM movies
ORDER BY director;
```

| director |
| --- |
| Nolan |
| Villeneuve |
| Wachowski |

`ORDER BY director` makes the display order explicit. It is separate from `DISTINCT`: one removes duplicate result rows, the other sorts them.

## Debug this

Suppose your real goal is “one row per director”. Why does this query fail to achieve that?

```sql
SELECT DISTINCT director, title
FROM movies;
```

The selected rows are now pairs such as `(Nolan, Inception)` and `(Nolan, Interstellar)`. Those pairs are different, so both survive. `DISTINCT` compares the **whole selected row**, not just the first column.

## Common mistakes

- Writing `SELECT director DISTINCT`; `DISTINCT` belongs immediately after `SELECT`.
- Assuming `DISTINCT` permanently removes duplicate values from the stored table. It only changes this query result.
- Adding extra selected columns and then wondering why a value still appears more than once.

## Your turn

Return each distinct `director` exactly once, ordered by `director`.

## Quick check

Would `SELECT DISTINCT director, title` guarantee one row per director?

**Answer:** no. Uniqueness is evaluated on the selected `(director, title)` combination.
