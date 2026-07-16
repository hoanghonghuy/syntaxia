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
  - Name the index clearly before ON
  - Keep the underlying table readable after indexing
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "An index is a lookup aid on a column — it does not replace the table."
    - "Name the index, then ON table (column)."
    - "Try: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Interstellar", 2014]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
      - ["The Matrix"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Interstellar', 2014);"
---

An **index** helps the database find rows faster — like a book’s index that points to page numbers without rewriting the chapters.

**movies** (full table — already loaded)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |
| 3 | Interstellar | 2014 |

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

| Piece | Meaning |
| --- | --- |
| `movies_title_idx` | index name (you choose a clear name) |
| `ON movies (title)` | build the index on the `title` column |

The table and its rows stay the same; the index is an extra structure. Creating the index is the graded statement; a follow-up SELECT confirms the table is still readable.

## Worked example

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

- `CREATE INDEX` starts the command.
- The name comes before `ON`.
- Parentheses list the column(s) to index.
- Afterward, `SELECT title FROM movies` still returns the same three titles.

## Common mistakes

- Forgetting the index name (`CREATE INDEX ON movies (title)` is incomplete in standard SQL).
- Indexing the wrong column or table.
- Expecting `CREATE INDEX` to return the movie rows — the grader checks the table afterward.

## Your turn

Create an index named `movies_title_idx` on `movies(title)`.
