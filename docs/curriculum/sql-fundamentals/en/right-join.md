---
id: sql-21-right-join
track: sql-fundamentals
locale: en
slug: right-join
title: Keeping unmatched rows with RIGHT JOIN
order: 21
published: true
can_do: "Reason about RIGHT JOIN as right-side preservation and identify an equivalent LEFT JOIN orientation"
objectives:
  - Keep unmatched rows from the right input
  - Detect missing left matches with IS NULL
  - Relate RIGHT JOIN to LEFT JOIN with swapped table order
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "The table that must be preserved is directors, which is written on the right."
    - "After the join, directors with no movie have movies.id as NULL."
    - "Use: SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  solution: "SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
      - [2, "Wachowski"]
      - [3, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Villeneuve"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Interstellar', 2014, 1);"
---

RIGHT JOIN does not introduce a new matching mechanism. It uses the same `ON` rule and changes only which side is preserved when a match is missing.

## Mental model

Compare the preservation rule:

| Join form | Unmatched rows guaranteed to survive |
| --- | --- |
| `A LEFT JOIN B` | A |
| `A RIGHT JOIN B` | B |

Here `directors` is on the right, so all three directors survive even though Villeneuve has no matching movie.

| director | matching movie? | movies.id after join |
| --- | --- | --- |
| Nolan | yes | non-NULL |
| Wachowski | yes | non-NULL |
| Villeneuve | no | NULL |

## Predict before you run

```sql
SELECT directors.name, movies.title
FROM movies
RIGHT JOIN directors
  ON movies.director_id = directors.id;
```

Predict that Villeneuve still appears with a NULL movie. Then `WHERE movies.id IS NULL` isolates exactly that director.

## Worked example

```sql
SELECT directors.name
FROM movies
RIGHT JOIN directors
  ON movies.director_id = directors.id
WHERE movies.id IS NULL;
```

| name |
| --- |
| Villeneuve |

The same logic can often be written more familiarly as:

```sql
SELECT directors.name
FROM directors
LEFT JOIN movies
  ON movies.director_id = directors.id
WHERE movies.id IS NULL;
```

Swapping table order turns the preserved right side into a preserved left side.

## Debug this

A learner says “RIGHT JOIN returns rows from the right table only.” Why is that wrong?

Matched pairs still contain columns from **both** inputs. RIGHT only describes what happens to an unmatched right-side row; it does not discard the left side from successful matches.

## Common mistakes

- Thinking RIGHT JOIN uses a different relationship than LEFT JOIN.
- Testing missing matches with `= NULL`.
- Using RIGHT JOIN when a swapped LEFT JOIN would make the query easier for the team to read.

## Your turn

Return directors that have no matching movie. Before running, rewrite the query mentally as the equivalent LEFT JOIN to confirm which side must be preserved.

## Quick check

What is the simplest conceptual rewrite of `A RIGHT JOIN B`?

**Answer:** `B LEFT JOIN A`, using the same matching relationship with the inputs swapped.
