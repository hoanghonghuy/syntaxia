---
id: sql-41-comments
track: sql-fundamentals
locale: en
slug: sql-comments
title: Notes in SQL with comments
order: 41
published: true
can_do: "Add useful SQL comments without accidentally commenting out executable code or changing query behavior"
objectives:
  - Use -- for line comments and /* */ for block comments
  - Separate human explanation from executable SQL
  - Recognize comment-boundary bugs while debugging
exercise:
  starter: |
    -- list movie titles A to Z
    SELECT title FROM movies;
  hints:
    - "The comment is already correct; the executable SELECT still needs deterministic ordering."
    - "Keep the -- line above the SQL and add ORDER BY title to the query."
    - "Use: -- list movie titles A to Z\nSELECT title FROM movies ORDER BY title;"
  solution: |
    -- list movie titles A to Z
    SELECT title FROM movies ORDER BY title;
  preview:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["The Matrix"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021);"
---

Comments explain **why** SQL exists or what a non-obvious choice means. They are ignored by the SQL engine, so the executable statement still has to be correct on its own.

## Mental model

| syntax | boundary | effect on execution |
| --- | --- | --- |
| `-- note` | from `--` to end of line | ignored |
| `/* note */` | between opening and closing markers | ignored |

Keep human text and executable text visibly separate:

```sql
-- Stable alphabetical output for the report
SELECT title FROM movies ORDER BY title;
```

The comment documents intent; `ORDER BY` is what actually guarantees the order.

## Predict before you run

Removing a well-formed comment should not change query rows. Predict the same three titles with or without the comment.

## Worked example

```sql
-- list movie titles A to Z
SELECT title
FROM movies
ORDER BY title;
```

| title |
| --- |
| Dune |
| Inception |
| The Matrix |

A block comment is useful when an explanation genuinely needs multiple lines:

```sql
/* This report intentionally includes all years.
   Filtering happens in the consuming service. */
SELECT title FROM movies ORDER BY title;
```

## Debug this

```sql
SELECT title FROM movies -- sort titles
ORDER BY title;
```

This example still works because only text after `--` on that line is ignored. But placing executable code after `--` on the **same** line can silently comment it out. When debugging strange syntax/behavior, inspect comment boundaries.

## Common mistakes

- Putting executable SQL after `--` and unintentionally disabling it.
- Leaving a `/*` block unclosed.
- Writing comments that repeat syntax while failing to explain intent, constraints, or surprising decisions.

## Your turn

Keep the existing `--` comment and make the SELECT return titles A to Z with `ORDER BY title`.

## Quick check

Should changing only a correct comment change the rows returned by a query?

**Answer:** no. Comments are ignored by the SQL engine.
