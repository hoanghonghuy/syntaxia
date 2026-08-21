---
id: sql-16-in
track: sql-fundamentals
locale: en
slug: in-list
title: Matching a list with IN
order: 16
published: true
can_do: "Use IN for membership in a finite list of exact values and contrast it with a continuous range"
objectives:
  - Evaluate list membership for each row
  - Rewrite repeated OR equality checks as IN
  - Distinguish IN from BETWEEN
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "The requirement names two exact years, so use a membership list rather than a range."
    - "Filter year with IN (1999, 2010)."
    - "Use: SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
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
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

A requirement can name several **exact alternatives**: “1999 or 2010”. `IN` expresses membership in that finite set without repeating the same column comparison.

## Mental model

For a non-NULL year, this:

```sql
year IN (1999, 2010)
```

expresses the same membership test as:

```sql
year = 1999 OR year = 2010
```

Trace the rows:

| title | year | member of `{1999, 2010}`? |
| --- | ---: | --- |
| Inception | 2010 | yes |
| The Matrix | 1999 | yes |
| Dune | 2021 | no |
| Interstellar | 2014 | no |

## Predict before you run

Predict which two titles survive `year IN (1999, 2010)`. Notice that 2005 would **not** match merely because it lies numerically between those values; IN is about exact membership.

## Worked example

```sql
SELECT title
FROM movies
WHERE year IN (1999, 2010)
ORDER BY title;
```

| title |
| --- |
| Inception |
| The Matrix |

Use IN when the requirement gives a discrete set. Use a range predicate when every value between bounds should qualify.

## Debug this

Why does this not express membership in two values?

```sql
WHERE year = (1999, 2010)
```

`=` compares against one value/expression. A list-membership test uses `IN (...)`.

## Common mistakes

- Using `=` with a parenthesized list.
- Using IN when the requirement actually means a continuous interval.
- Forgetting that text members of an IN list need string quotes.

## Your turn

Return titles whose year is exactly 1999 or 2010, ordered by title. Evaluate all four rows before running.

## Quick check

Would `year IN (1999, 2010)` match the year 2000?

**Answer:** no. Only values explicitly present in the list match.
