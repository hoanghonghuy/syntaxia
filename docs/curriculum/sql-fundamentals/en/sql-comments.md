---
id: sql-41-comments
track: sql-fundamentals
locale: en
slug: sql-comments
title: Notes in SQL with comments
order: 41
published: true
objectives:
  - Write a single-line comment with --
  - Write a block comment with /* */
  - Keep comments from changing query results
exercise:
  starter: |
    -- list movie titles A to Z
    SELECT title FROM movies;
  hints:
    - "Comments are ignored by the database — they do not change the result."
    - "Keep a -- comment above the SELECT, then select title ordered by title."
    - "Try: -- list movie titles A to Z\nSELECT title FROM movies ORDER BY title;"
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

A **comment** is a note for humans. The database skips it when running SQL — like a sticky note on a spreadsheet that does not change the numbers.

| Style | How you write it | Use when |
| --- | --- | --- |
| `-- …` | Two dashes, then text to the end of the line | Short notes above a query |
| `/* … */` | Slash-star … star-slash | Notes that span several lines |

**movies** (full table)

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Dune | 2021 |

## Worked example

A one-line comment above a normal `SELECT`:

```sql
-- list movie titles A to Z
SELECT title
FROM movies
ORDER BY title;
```

- `-- list movie titles A to Z` is ignored.
- The real work is `SELECT title … ORDER BY title`.

Result (same as without the comment):

| title |
| --- |
| Dune |
| Inception |
| The Matrix |

A block comment can sit beside the query:

```sql
SELECT title, year
FROM movies
/* only films in this practice table */
ORDER BY year;
```

The comment between `FROM` and `ORDER BY` is still ignored. Prefer placing long notes **above** the query so beginners do not lose the keywords.

## Common mistakes

- Putting code after `--` on the same line by accident — everything after `--` on that line is a comment.
- Forgetting to close `/*` with `*/` — the rest of the file may become a comment.
- Thinking comments change results — they never do; if the answer is wrong, fix the SQL, not the note.

## Your turn

Keep a `--` comment that says you are listing titles A to Z, then select every `title` from `movies` ordered by `title`.
