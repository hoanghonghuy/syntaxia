---
id: sql-34-index
track: sql-fundamentals
locale: en
slug: create-index
title: Speeding lookups with indexes
order: 34
published: true
objectives:
  - Create an index on a column
  - Keep the underlying table readable after indexing
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "An index is a lookup aid on a column — it does not replace the table."
    - "Name the index, then ON table (column)."
    - "Try: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception');"
---

An **index** helps the database find rows faster — like a book’s index that points to page numbers without rewriting the chapters.

Sample data already in `movies`:

| id | title |
| --- | --- |
| 1 | Inception |

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

- `movies_title_idx` is the index name (you choose a clear name).
- `ON movies (title)` builds the index on the `title` column.
- The table and its rows stay the same; the index is an extra structure.

In this sandbox, creating the index is the graded statement. A follow-up SELECT confirms the table is still readable.

## Worked example

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

- `CREATE INDEX` starts the command.
- The name comes before `ON`.
- Parentheses list the column(s) to index.

## Common mistakes

- Forgetting the index name (`CREATE INDEX ON movies (title)` is incomplete in standard SQL).
- Indexing the wrong column or table.
- Expecting `CREATE INDEX` to return the movie rows — the grader checks the table afterward.

## Your turn

Create an index named `movies_title_idx` on `movies(title)`.
