---
id: sql-34-index
track: sql-fundamentals
locale: en
slug: create-index
title: Speeding lookups with indexes
order: 34
published: true
can_do: "Create an index for a lookup pattern while separating logical query results from physical access structures"
objectives:
  - Explain what an index changes and what it does not change
  - Create a named index on a chosen column
  - Verify that the index object actually exists
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "Create an access structure on the title column; the movie rows themselves should not change."
    - "Use the requested index name before ON movies (title)."
    - "Use: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Interstellar", 2014]
  expected:
    columns: ["n"]
    rows:
      - [1]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT COUNT(*)::int AS n FROM pg_indexes WHERE tablename = 'movies' AND indexname = 'movies_title_idx';"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Interstellar', 2014);"
---

An index is an extra access structure that can help the database locate rows efficiently. It does **not** change the logical rows a correct SELECT should return.

## Mental model

Separate logical data from physical access support:

| Layer | Before index | After index |
| --- | --- | --- |
| table rows | 3 movie rows | same 3 movie rows |
| schema columns | `id`, `title`, `year` | same columns |
| access structures | none for this exercise | `movies_title_idx` on `title` |

A useful analogy is a book index: it points you toward content without replacing the pages.

## Predict before you run

After creating `movies_title_idx`, predict two facts: the movie data remains identical, and database metadata now contains one index with that name on the table.

## Worked example

```sql
CREATE INDEX movies_title_idx
ON movies (title);
```

The grader now checks the **index catalog itself**, not merely whether the table still returns rows. That prevents a no-op or unrelated statement from passing this lesson.

## Debug this

```sql
CREATE INDEX movies_year_idx ON movies (year);
```

This creates a real index, but it does not satisfy the requested access path or name. Performance DDL must match the query pattern and the intended managed object, not just be syntactically valid.

## Common mistakes

- Assuming an index changes query results rather than query access strategy.
- Indexing the wrong column or using the wrong managed-object name.
- Treating “more indexes” as automatically better; indexes consume storage and add write maintenance cost.

## Your turn

Create `movies_title_idx` on `movies(title)`. Before running, state what should remain unchanged and what new database object should appear.

## Quick check

Should adding a normal index change which rows `SELECT * FROM movies` logically returns?

**Answer:** no. It can change how the database reaches rows, not the correct logical result.
