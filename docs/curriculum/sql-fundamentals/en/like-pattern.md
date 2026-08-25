---
id: sql-15-like
track: sql-fundamentals
locale: en
slug: like-pattern
title: Matching text with LIKE
order: 15
published: true
can_do: "Translate a text-pattern requirement into LIKE with the wildcard in the correct position"
objectives:
  - Distinguish exact equality from pattern matching
  - Trace which strings match a LIKE pattern
  - Use % for a variable-length sequence of characters
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "The requirement says starts with rather than equals exactly, so use LIKE."
    - "Place % after In because any suffix is allowed."
    - "Use: SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "Interstellar", 2014, "Nolan"]
      - [3, "The Matrix", 1999, "Wachowski"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'Interstellar', 2014, 'Nolan'), (3, 'The Matrix', 1999, 'Wachowski'), (4, 'Dune', 2021, 'Villeneuve');"
---

Text requirements are not always exact equality. “Starts with In” describes a **pattern**, so the query must encode which part is fixed and which part may vary.

## Mental model

In a LIKE pattern, `%` means “zero or more characters may appear here”. Its position changes the meaning.

| Pattern | Reads as |
| --- | --- |
| `'In%'` | starts with `In` |
| `'%In'` | ends with `In` |
| `'%In%'` | contains `In` somewhere |

Apply `'In%'` to the data:

| title | match? |
| --- | --- |
| Inception | yes |
| Interstellar | yes |
| The Matrix | no |
| Dune | no |

## Predict before you run

```sql
SELECT title
FROM movies
WHERE title LIKE 'In%';
```

Predict the two survivors before running. Also notice that the pattern is quoted because it is a text literal.

## Worked example

```sql
SELECT title
FROM movies
WHERE title LIKE 'In%'
ORDER BY title;
```

| title |
| --- |
| Inception |
| Interstellar |

In PostgreSQL, ordinary `LIKE` is case-sensitive for these text values; do not silently assume that `'in%'` matches the same rows. PostgreSQL-specific `ILIKE` belongs in the PostgreSQL track.

## Debug this

The requirement is “starts with In”, but the query uses:

```sql
WHERE title LIKE '%In'
```

The wildcard is on the wrong side. This pattern allows any prefix and requires the string to **end** with `In`.

## Common mistakes

- Using `=` with wildcard text and expecting pattern matching.
- Moving `%` to a position that changes “starts with” into “ends with” or “contains”.
- Assuming case-insensitive matching across SQL systems.

## Your turn

Return titles that start with `In`, ordered by title. Before running, test the pattern mentally against all four strings.

## Quick check

What pattern would express “contains `Matrix` anywhere”?

**Answer:** `'%Matrix%'`.
