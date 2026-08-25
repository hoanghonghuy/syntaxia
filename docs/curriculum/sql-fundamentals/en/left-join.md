---
id: sql-20-left-join
track: sql-fundamentals
locale: en
slug: left-join
title: Keeping unmatched rows with LEFT JOIN
order: 20
published: true
can_do: "Preserve every left-table row with LEFT JOIN and detect rows that found no right-side match"
objectives:
  - Contrast LEFT JOIN with INNER JOIN
  - Read NULL-filled right-side columns as an unmatched join result
  - Use LEFT JOIN plus IS NULL as an anti-join pattern
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Start from movies and preserve every movie with LEFT JOIN."
    - "A movie with no director match has directors.id = NULL in the joined result."
    - "Use: SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  solution: "SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "The Matrix", 2]
      - [3, "Orphan", null]
  expected:
    columns: ["title"]
    rows:
      - ["Orphan"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Orphan', 2020, NULL);"
---

INNER JOIN answers “show me matches”. LEFT JOIN answers a broader question: “start with every row on the left, attach a match when one exists, and still keep the row when it does not.”

## Mental model

The word **LEFT** is a preservation rule.

```sql
FROM movies
LEFT JOIN directors ...
```

means every `movies` row must survive the join stage.

| movie | director match | joined right side |
| --- | --- | --- |
| Inception | Nolan | director columns filled |
| The Matrix | Wachowski | director columns filled |
| Orphan | none | director columns become NULL |

That NULL is not a stored fake director. It is the join result saying “no right-side row matched”.

## Predict before you run

Before filtering, this LEFT JOIN should return **3 rows**, including Orphan:

```sql
SELECT movies.title, directors.name
FROM movies
LEFT JOIN directors
  ON movies.director_id = directors.id;
```

Then ask what `WHERE directors.id IS NULL` does: it removes the matched rows and leaves only the failed match.

## Worked example

```sql
SELECT movies.title
FROM movies
LEFT JOIN directors
  ON movies.director_id = directors.id
WHERE directors.id IS NULL;
```

| title |
| --- |
| Orphan |

This is a common **anti-join** pattern: preserve the left side, then keep rows where the right side failed to appear.

## Debug this

Why does replacing LEFT JOIN with INNER JOIN make the final query incapable of finding Orphan?

INNER JOIN discards the unmatched movie during the join stage. By the time `WHERE directors.id IS NULL` runs, the orphan row is already gone.

## Common mistakes

- Using INNER JOIN and then trying to search for missing right-side matches.
- Testing `directors.id = NULL` instead of `IS NULL`.
- Forgetting which table is on the preserved left side.

## Your turn

Return the title of every movie with no matching director. Trace the full LEFT JOIN result first, then apply the NULL filter mentally.

## Quick check

In `movies LEFT JOIN directors`, which input is guaranteed to keep its unmatched rows?

**Answer:** `movies`, the left input.
