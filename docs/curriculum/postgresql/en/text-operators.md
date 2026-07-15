---
id: pg-05-text
track: postgresql
locale: en
slug: text-operators
title: Text search and concatenation
order: 5
published: true
objectives:
  - Match text case-insensitively with ILIKE
  - Join text pieces with ||
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "ILIKE ignores letter case when matching a pattern."
    - "Use % as a wildcard for “any characters” around the word."
    - "Try: SELECT title FROM movies WHERE title ILIKE '%matrix%';"
  solution: "SELECT title FROM movies WHERE title ILIKE '%matrix%';"
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

Sometimes you need a soft text match — find titles that contain a word, even if the letter case differs. PostgreSQL’s `ILIKE` does that. Separately, `||` glues text pieces together (concatenation), like joining cells in a spreadsheet formula.

| id | title |
| --- | --- |
| 1 | The Matrix |
| 2 | Inception |
| 3 | The Matrix Reloaded |
| 4 | Arrival |

## Worked example

```sql
SELECT title FROM movies WHERE title ILIKE '%matrix%';
```

- `ILIKE` is a case-insensitive pattern match (PostgreSQL-specific; portable SQL often uses `LOWER(...) LIKE ...`).
- `%` means “any characters before or after”.
- `'%matrix%'` matches both Matrix titles even though the stored text uses capital `M`.

Result:

| title |
| --- |
| The Matrix |
| The Matrix Reloaded |

Concatenation example (for reading, not graded here):

```sql
SELECT 'Year: ' || year AS label FROM movies;
```

- `||` joins the left text to the right text into one string.

## Common mistakes

- Using `LIKE` when you need case-insensitive matching — `LIKE` is case-sensitive for normal text.
- Forgetting `%` wildcards so only an exact full title matches.
- Using `+` to join strings — in PostgreSQL text join is `||`.

## Your turn

Return every `title` that contains the word `matrix`, ignoring letter case.
