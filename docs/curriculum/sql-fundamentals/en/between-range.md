---
id: sql-17-between
track: sql-fundamentals
locale: en
slug: between-range
title: Filtering a range with BETWEEN
order: 17
published: true
can_do: "Use BETWEEN for an inclusive interval and translate it to equivalent boundary comparisons"
objectives:
  - Evaluate whether values lie inside an inclusive range
  - Remember that both BETWEEN endpoints are included
  - Contrast ranges with exact-value lists
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "The requirement includes every year from 2000 through 2020, not only two exact values."
    - "BETWEEN includes both bounds: year BETWEEN 2000 AND 2020."
    - "Use: SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
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
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

A range requirement says every value inside an interval can match. `BETWEEN` packages the lower and upper boundary checks into one readable predicate.

## Mental model

For ordinary comparable values:

```sql
year BETWEEN 2000 AND 2020
```

means an **inclusive** range equivalent to:

```sql
year >= 2000 AND year <= 2020
```

Trace the data:

| title | year | inside 2000–2020? |
| --- | ---: | --- |
| Inception | 2010 | yes |
| The Matrix | 1999 | no — below lower bound |
| Dune | 2021 | no — above upper bound |
| Interstellar | 2014 | yes |

## Predict before you run

If a row had `year = 2000` or `year = 2020`, would it match? **Yes**: BETWEEN includes both endpoints.

Predict the current survivors: Inception and Interstellar.

## Worked example

```sql
SELECT title
FROM movies
WHERE year BETWEEN 2000 AND 2020
ORDER BY title;
```

| title |
| --- |
| Inception |
| Interstellar |

The lower bound comes first and the upper bound second in the normal ascending form used here.

## Debug this

A learner wants every year from 2000 through 2020 but writes:

```sql
WHERE year IN (2000, 2020)
```

That matches only the two endpoints, not values such as 2010 or 2014. IN describes a finite list; BETWEEN describes an interval.

## Common mistakes

- Treating BETWEEN endpoints as exclusive.
- Reversing the lower and upper bounds.
- Confusing an interval with a list of exact values.

## Your turn

Return titles whose year is between 2000 and 2020 inclusive, ordered by title. Trace each source year against both boundaries first.

## Quick check

What two comparisons are equivalent to `x BETWEEN 10 AND 20` for ordinary non-NULL numeric values?

**Answer:** `x >= 10 AND x <= 20`.
