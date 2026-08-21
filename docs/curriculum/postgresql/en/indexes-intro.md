---
id: pg-16-indexes
track: postgresql
locale: en
slug: indexes-intro
title: PostgreSQL indexes and planner trade-offs
order: 16
published: true
can_do: "Create and verify a PostgreSQL index while reasoning about planner choice and read/write trade-offs"
objectives:
  - Create a B-tree index on a lookup column
  - Verify the index object exists in PostgreSQL metadata
  - Explain why an index can help reads but adds write/storage cost
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "Create the requested index object on movies(title)."
    - "The table data should remain unchanged; the new object appears in index metadata."
    - "Use: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
  expected:
    columns: ["n"]
    rows:
      - [1]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT COUNT(*)::int AS n FROM pg_indexes WHERE tablename = 'movies' AND indexname = 'movies_title_idx';"
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception'), (2, 'The Matrix');"
---

Indexes are physical access structures. They can make suitable lookups cheaper, but they are not free and the PostgreSQL planner—not application code—ultimately chooses whether a usable index is worthwhile for a query.

## Mental model

Adding an index changes physical support, not logical rows:

| concern | effect of index |
| --- | --- |
| SELECT result semantics | unchanged |
| candidate access path | new indexed path may become available |
| INSERT/UPDATE/DELETE | extra index maintenance may be required |
| storage | index consumes additional space |

A default `CREATE INDEX` uses PostgreSQL's default index method (B-tree), which is a strong fit for many equality/range/order workloads.

## Predict before you run

After the command, the movies rows remain the same and metadata should show exactly one index named `movies_title_idx` for this temporary table.

## Worked example

```sql
CREATE INDEX movies_title_idx
ON movies (title);
```

The exercise verifies `pg_indexes`, so merely running a SELECT cannot pass the grader.

## Debug this

“An index exists, therefore PostgreSQL must use it” is false. On a tiny table, a sequential scan can be cheaper; planner decisions depend on cost estimates, statistics, predicates, table size, and other factors.

```sql
SELECT * FROM movies WHERE title = 'Inception';
```

The index is an available access path, not a forced execution strategy.

## Common mistakes

- Creating indexes without a workload/query reason.
- Expecting an index to change query results rather than access cost.
- Ignoring write amplification and storage when adding many indexes.

## Your turn

Create `movies_title_idx` on `movies(title)` and let the grader prove the index object exists.

## Quick check

Does creating a usable index guarantee PostgreSQL will choose it for every matching query?

**Answer:** no. The planner chooses the cheapest estimated plan; an index is one possible access path.
