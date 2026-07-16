---
id: sql-28-case
track: sql-fundamentals
locale: en
slug: case-expression
title: Labeling rows with CASE
order: 28
published: true
objectives:
  - Build a CASE expression that returns different labels
  - Alias the result column for grading
  - Use ELSE as the fallback branch
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "CASE WHEN … THEN … ELSE … END picks a label from a condition."
    - "Movies before year 2000 are 'classic'; everything else is 'modern'."
    - "Try: SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
  solution: "SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Interstellar", 2014]
      - [4, "Dune", 2021]
  expected:
    columns: ["title", "era"]
    rows:
      - ["Dune", "modern"]
      - ["Inception", "modern"]
      - ["Interstellar", "modern"]
      - ["The Matrix", "classic"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Interstellar', 2014), (4, 'Dune', 2021);"
---

Spreadsheets often add a helper column with IF formulas. In SQL, `CASE` does the same job: look at a value and return a label. Here we tag each movie as `classic` or `modern` from its year.

**movies** (full table)

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Interstellar | 2014 |
| 4 | Dune | 2021 |

| title | year | `year < 2000`? | era |
| --- | --- | --- | --- |
| The Matrix | 1999 | yes | classic |
| Inception | 2010 | no | modern |
| Interstellar | 2014 | no | modern |
| Dune | 2021 | no | modern |

## Worked example

```sql
SELECT
  title,
  CASE
    WHEN year < 2000 THEN 'classic'
    ELSE 'modern'
  END AS era
FROM movies
ORDER BY title;
```

- `WHEN year < 2000 THEN 'classic'` labels older films.
- `ELSE 'modern'` covers every other year.
- `AS era` names the new column so results are easy to read and grade.
- `END` closes the `CASE` — without it, SQL raises an error.

Result:

| title | era |
| --- | --- |
| Dune | modern |
| Inception | modern |
| Interstellar | modern |
| The Matrix | classic |

## Common mistakes

- Forgetting `END` after the `CASE` branches.
- Omitting `AS era` when the expected column is named `era`.
- Comparing years with text quotes (`'2000'`) when `year` is a number — keep types consistent.

## Your turn

Return each movie `title` with an `era` label: `classic` when `year < 2000`, otherwise `modern`. Order by `title`.
