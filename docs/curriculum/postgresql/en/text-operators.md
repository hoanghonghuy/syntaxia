---
id: pg-05-text
track: postgresql
locale: en
slug: text-operators
title: PostgreSQL text matching and concatenation
order: 5
published: true
can_do: "Use PostgreSQL ILIKE for case-insensitive pattern matching and read || as text concatenation"
objectives:
  - Contrast LIKE with PostgreSQL ILIKE
  - Combine ILIKE with wildcard placement intentionally
  - Read the || concatenation operator and its NULL implications
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "The requirement says contains matrix regardless of letter case."
    - "ILIKE performs case-insensitive pattern matching; % allows text on both sides."
    - "Use: SELECT title FROM movies WHERE title ILIKE '%matrix%' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE title ILIKE '%matrix%' ORDER BY title;"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "The Matrix"]
      - [2, "Inception"]
      - [3, "The Matrix Reloaded"]
      - [4, "Arrival"]
  expected:
    columns: ["title"]
    rows:
      - ["The Matrix"]
      - ["The Matrix Reloaded"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix'), (2, 'Inception'), (3, 'The Matrix Reloaded'), (4, 'Arrival');"
---

PostgreSQL adds convenient text operators beyond portable basics. `ILIKE` is its case-insensitive pattern matcher; `||` concatenates values into text expressions.

## Mental model

For pattern matching:

| expression | case-sensitive? | pattern semantics |
| --- | --- | --- |
| `title LIKE '%matrix%'` | yes | contains lowercase `matrix` exactly by case |
| `title ILIKE '%matrix%'` | no | contains `matrix` regardless of case |

For concatenation:

```sql
SELECT 'Movie: ' || title AS label FROM movies;
```

`||` builds a new expression; it does not modify `title` in storage. Be aware that NULL in a concatenation can propagate NULL, so production formatting often needs explicit null handling.

## Predict before you run

Both Matrix titles contain the target word with capital `M`. Predict that `ILIKE '%matrix%'` returns two rows while ordinary `LIKE '%matrix%'` would not match those exact stored strings.

## Worked example

```sql
SELECT title
FROM movies
WHERE title ILIKE '%matrix%'
ORDER BY title;
```

| title |
| --- |
| The Matrix |
| The Matrix Reloaded |

## Debug this

```sql
WHERE title ILIKE 'matrix'
```

Case-insensitivity is correct, but the missing `%` wildcards change the requirement from “contains” to “equals the whole pattern”. Operator choice and wildcard placement solve different parts of the problem.

## Common mistakes

- Assuming `ILIKE` is portable to every SQL database.
- Using `+` as the PostgreSQL text concatenation operator instead of `||`.
- Forgetting that NULL behavior matters when composing display strings.

## Your turn

Return titles containing `matrix` regardless of case, ordered by title.

## Quick check

What two independent choices make this query work: case handling and substring handling?

**Answer:** `ILIKE` handles case-insensitive matching; `%...%` makes the pattern match a substring rather than the whole value.
