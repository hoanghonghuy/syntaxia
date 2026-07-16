---
id: sql-18-aliases
track: sql-fundamentals
locale: en
slug: column-aliases
title: Renaming columns with AS
order: 18
published: true
objectives:
  - Give result columns clearer names with AS
  - Sort by an alias when the database allows it
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "AS renames a column only in the result — the table itself stays unchanged."
    - "Use title AS film_name and year AS release_year."
    - "Try: SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  solution: "SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["film_name", "release_year"]
    rows:
      - ["The Matrix", 1999]
      - ["Inception", 2010]
      - ["Interstellar", 2014]
      - ["Dune", 2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Column names in the table may be short or technical. `AS` renames a column in the **result** only — like a display label on a spreadsheet export, without renaming the real column.

**movies** (full table — real column names stay `title` and `year`)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

## Worked example

```sql
SELECT title AS film_name, year AS release_year
FROM movies
ORDER BY release_year;
```

- `title AS film_name` shows the title under the heading `film_name`.
- `year AS release_year` shows the year under `release_year`.
- `ORDER BY release_year` sorts using that result name (oldest year first).

Result:

| film_name | release_year |
| --- | --- |
| The Matrix | 1999 |
| Inception | 2010 |
| Interstellar | 2014 |
| Dune | 2021 |

The stored table still uses `title` and `year` — only this query’s output headings changed.

## Common mistakes

- Thinking `AS` renames the stored column forever — it only changes the output heading.
- Selecting `title, year` when the grader expects `film_name` and `release_year`.
- Putting `AS` after `FROM` — aliases belong next to the selected expressions.

## Your turn

Select `title` as `film_name` and `year` as `release_year`. Sort by `release_year`.
