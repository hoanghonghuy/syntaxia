---
id: sql-12-minmax
track: sql-fundamentals
locale: en
slug: min-and-max
title: Finding extremes with MIN and MAX
order: 12
published: true
can_do: "Collapse a numeric column to its smallest or largest value with MIN or MAX"
objectives:
  - Recognize MIN and MAX as aggregate functions
  - Predict how many rows an ungrouped aggregate returns
  - Choose the correct extreme for a requirement
exercise:
  starter: "SELECT year FROM movies;"
  hints:
    - "The task wants one summary value, not the list of every year."
    - "Use MAX(year) because newest means the largest year, then name the result newest_year."
    - "Use: SELECT MAX(year) AS newest_year FROM movies;"
  solution: "SELECT MAX(year) AS newest_year FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["newest_year"]
    rows:
      - [2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Some questions ask for a summary of many rows rather than the rows themselves: “What is the newest year?” or “What is the smallest price?”. `MIN` and `MAX` are aggregates that collapse many input values into one answer.

## Mental model

Think **many values -> one summary value**.

| year |
| ---: |
| 2010 |
| 1999 |
| 2021 |
| 2014 |

For this set:

- `MIN(year)` -> `1999`
- `MAX(year)` -> `2021`

Without `GROUP BY`, an aggregate over the whole table produces one summary row.

## Predict before you run

```sql
SELECT MAX(year) AS newest_year
FROM movies;
```

Predict both dimensions and value: **1 column, 1 row, value 2021**. The four source rows are inputs to the calculation; they do not each become an output row.

## Worked example

```sql
SELECT MIN(year) AS oldest_year
FROM movies;
```

| oldest_year |
| ---: |
| 1999 |

`MIN` and `MAX` answer questions about an extreme **value**. They do not automatically return the rest of the row that contained that value.

## Debug this

Why does this not answer “newest year” as one value?

```sql
SELECT year
FROM movies
ORDER BY year DESC;
```

It sorts all four years but still returns four rows. Sorting and aggregation solve different problems. Use `MAX(year)` when the requested answer itself is one largest value.

## Common mistakes

- Expecting `MAX(year)` to automatically return the movie title associated with that year.
- Forgetting parentheses: aggregate functions are called as `MAX(year)`.
- Choosing `MIN` when the requirement means largest/latest/newest.

## Your turn

Return the newest release year as one column named `newest_year`. Before running, predict why the result has only one row.

## Quick check

What is the key difference between `ORDER BY year DESC` and `MAX(year)`?

**Answer:** `ORDER BY` keeps and rearranges rows; `MAX` reduces the input values to one summary value.
