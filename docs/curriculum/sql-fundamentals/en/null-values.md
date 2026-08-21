---
id: sql-08-null
track: sql-fundamentals
locale: en
slug: null-values
title: Missing data with NULL
order: 8
published: true
can_do: "Find missing values with IS NULL and explain why ordinary equality does not match NULL"
objectives:
  - Distinguish NULL from zero, empty text, and the string 'NULL'
  - Reason about NULL as an unknown or missing value in a predicate
  - Find missing values with IS NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "The task is about missing ratings, not the number 0 or the text 'NULL'."
    - "NULL is tested with IS NULL rather than ordinary equality."
    - "Use: SELECT title FROM movies WHERE rating IS NULL ORDER BY title;"
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

Real data is often incomplete. A rating may not have been entered yet. SQL represents that absence with `NULL`, and treating it like an ordinary number or string creates subtle bugs.

## Mental model

`NULL` means the value is **missing or unknown** in this row. It is different from real values that happen to look empty or small.

| Stored state | Meaning |
| --- | --- |
| `8.8` | a known numeric rating |
| `0` | a known numeric value equal to zero |
| `''` | a known empty string, if the column is text |
| `NULL` | no known value is present |

**movies**

| id | title | year | rating |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 8.8 |
| 2 | The Matrix | 1999 | *(NULL)* |
| 3 | Dune | 2021 | 8.0 |
| 4 | Old Cut | 1985 | *(NULL)* |

SQL conditions normally evaluate to true or false, but comparisons involving `NULL` can produce a third logical result: **unknown**. A `WHERE` clause keeps rows only when its condition is true.

## Predict before you run

What happens here?

```sql
SELECT title
FROM movies
WHERE rating = NULL;
```

It does **not** mean “rating is missing”. For a missing rating, `rating = NULL` evaluates to unknown rather than true, so those rows are not selected.

Now predict the result of `rating IS NULL`: The Matrix and Old Cut should survive.

## Worked example

```sql
SELECT title
FROM movies
WHERE rating IS NULL
ORDER BY title;
```

Result:

| title |
| --- |
| Old Cut |
| The Matrix |

`IS NULL` asks the special question “is this value missing?”. `IS NOT NULL` asks the opposite question: “is a value present?”.

## Debug this

A learner wants unrated movies and writes:

```sql
WHERE rating = 0
```

That finds rows whose rating is the real number zero. It says nothing about missing values. The requirement must be translated as `rating IS NULL`.

## Common mistakes

- Writing `rating = NULL` instead of `rating IS NULL`.
- Searching for `'NULL'`, which is text rather than a missing value.
- Treating `NULL` as zero or an empty string and therefore mixing “unknown” with a known value.

## Your turn

Return the titles whose `rating` is missing, ordered by `title`. Before running, identify the two rows where no rating is known.

## Quick check

Which condition finds rows that **do have** a known rating?

**Answer:** `rating IS NOT NULL`.
