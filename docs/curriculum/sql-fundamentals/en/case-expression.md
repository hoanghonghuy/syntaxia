---
id: sql-28-case
track: sql-fundamentals
locale: en
slug: case-expression
title: Labeling rows with CASE
order: 28
published: true
can_do: "Translate ordered conditions into a CASE expression that derives a value for each result row"
objectives:
  - Evaluate CASE conditions for each row
  - Understand first-match and ELSE behavior
  - Produce a derived result column without changing stored data
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "The derived era value depends on year for each row."
    - "Use WHEN year < 2000 THEN 'classic' and ELSE 'modern'."
    - "Use: SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
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

`CASE` derives a value from conditions while the query runs. It is closer to a spreadsheet `IF` column than to an `UPDATE`: the stored movie rows remain unchanged.

## Mental model

For each input row, walk the `WHEN` branches from top to bottom. The **first true branch wins**; if none match, `ELSE` supplies the fallback.

| title | year | `year < 2000` | derived `era` |
| --- | ---: | --- | --- |
| The Matrix | 1999 | true | classic |
| Inception | 2010 | false | modern |
| Interstellar | 2014 | false | modern |
| Dune | 2021 | false | modern |

The `era` column exists in the result only. It is not added to the `movies` table.

## Predict before you run

```sql
SELECT title,
       CASE WHEN year < 2000 THEN 'classic'
            ELSE 'modern'
       END AS era
FROM movies;
```

Predict four output rows and two output columns. Only The Matrix should receive `classic`.

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

| title | era |
| --- | --- |
| Dune | modern |
| Inception | modern |
| Interstellar | modern |
| The Matrix | classic |

`END` closes the expression; `AS era` names the derived output column.

## Debug this

A learner writes:

```sql
CASE
  WHEN year >= 2000 THEN 'classic'
  ELSE 'modern'
END
```

The SQL is syntactically valid but the labels are logically reversed. Debug `CASE` by testing representative boundary rows against each condition, not just by checking whether the query runs.

## Common mistakes

- Forgetting `END` or the alias expected by downstream code.
- Reversing a comparison and producing valid but incorrect labels.
- Assuming `CASE` changes stored values; it only derives a value for this query unless used inside a mutation statement.

## Your turn

Return each movie title with an `era`: `classic` when `year < 2000`, otherwise `modern`. Order by title and verify the boundary around 2000 mentally first.

## Quick check

If multiple `WHEN` conditions are true, which result is used?

**Answer:** the result from the first true `WHEN` branch.
