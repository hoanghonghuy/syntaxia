---
id: pg-16-indexes
track: postgresql
locale: en
slug: indexes-intro
title: Indexes in PostgreSQL
order: 16
published: true
objectives:
  - Create an index on a column
  - Understand that indexes speed lookups without changing row data
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "An index is a lookup aid — the table rows stay the same."
    - "Name the index, then ON table (column)."
    - "Try: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception'), (2, 'The Matrix');"
---

An **index** helps PostgreSQL find rows faster — like a book index that points to pages without rewriting the chapters. Creating an index does not change the data you see in `SELECT`; it adds a helper structure behind the scenes.

| id | title |
| --- | --- |
| 1 | Inception |
| 2 | The Matrix |

## Worked example

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

- `movies_title_idx` is a clear name you choose.
- `ON movies (title)` builds the index on the `title` column.
- Later, filters like `WHERE title = 'Inception'` can use this index (the planner decides).

In this sandbox, your graded statement is `CREATE INDEX`. A follow-up `SELECT` confirms the table is still readable.

## Common mistakes

- Forgetting the index name.
- Indexing the wrong column.
- Expecting `CREATE INDEX` itself to return movie rows — the grader checks the table afterward.

## Your turn

Create an index named `movies_title_idx` on `movies(title)`.
