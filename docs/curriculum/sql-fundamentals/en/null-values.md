---
id: sql-08-null
track: sql-fundamentals
locale: en
slug: null-values
title: Missing data with NULL
order: 8
published: true
objectives:
  - Treat NULL as missing data, not as zero or empty text
  - Find rows with IS NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "A missing rating is stored as NULL — it is not the text 'NULL' and not 0."
    - "Use IS NULL in WHERE; = NULL does not work the way beginners expect."
    - "Try: SELECT title FROM movies WHERE rating IS NULL ORDER BY title;"
  solution: "SELECT title FROM movies WHERE rating IS NULL ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "rating"]
    rows:
      - [1, "Inception", 2010, 8.8]
      - [2, "The Matrix", 1999, null]
      - [3, "Dune", 2021, 8.0]
      - [4, "Old Cut", 1985, null]
  expected:
    columns: ["title"]
    rows:
      - ["Old Cut"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, rating DOUBLE PRECISION);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 8.8), (2, 'The Matrix', 1999, NULL), (3, 'Dune', 2021, 8.0), (4, 'Old Cut', 1985, NULL);"
---

Some cells have no value yet — like a blank cell in a spreadsheet. In SQL that missing value is called `NULL`. It is not zero, and it is not the word “NULL”.

**movies** (full table — blank rating cells are `NULL`)

| id | title | year | rating |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 8.8 |
| 2 | The Matrix | 1999 | *(missing)* |
| 3 | Dune | 2021 | 8.0 |
| 4 | Old Cut | 1985 | *(missing)* |

Two films have ratings; two do not.

## Worked example

```sql
SELECT title
FROM movies
WHERE rating IS NULL
ORDER BY title;
```

- Inception (`8.8`) and Dune (`8.0`) have real ratings — they do not match.
- The Matrix and Old Cut have `NULL` ratings — they match `IS NULL`.
- Use `IS NULL` (or `IS NOT NULL`) — comparing with `= NULL` does not select missing values.

Result:

| title |
| --- |
| Old Cut |
| The Matrix |

## Common mistakes

- Writing `WHERE rating = NULL` — that comparison never finds missing values; use `IS NULL`.
- Searching for the text `'NULL'` — that is a string, not a missing value.
- Treating `NULL` as `0` — zero is a real number; `NULL` means “unknown / not filled in”.

## Your turn

List the `title` of every movie whose `rating` is missing (`IS NULL`), ordered by `title`.
