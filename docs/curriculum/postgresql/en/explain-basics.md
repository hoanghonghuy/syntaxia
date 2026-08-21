---
id: pg-23-explain
track: postgresql
locale: en
slug: explain-basics
title: Reading PostgreSQL query plans with EXPLAIN
order: 23
published: true
can_do: "Read basic PostgreSQL EXPLAIN concepts and distinguish planner estimates from measurements produced by EXPLAIN ANALYZE"
objectives:
  - Read a plan as a tree of execution nodes
  - Distinguish estimated cost/rows from actual execution metrics
  - Use EXPLAIN ANALYZE cautiously because it executes the statement
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "The sandbox grades stable query results rather than environment-dependent plan text."
    - "Return title in deterministic alphabetical order after studying the plan example."
    - "Use: SELECT title FROM movies ORDER BY title;"
  solution: "SELECT title FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

PostgreSQL's planner turns a SQL statement into a tree of execution nodes. `EXPLAIN` lets you inspect that proposed plan; `EXPLAIN ANALYZE` runs the statement and adds actual execution measurements.

## Mental model

A simplified plan line:

```text
Seq Scan on movies  (cost=0.00..12.00 rows=2 width=32)
```

Read the concepts, not the exact numbers:

| field | meaning |
| --- | --- |
| node type | operation such as Seq Scan, Index Scan, Sort, Hash Join |
| `cost` | planner estimate in internal cost units, not milliseconds |
| `rows` | estimated rows emitted by the node |
| `width` | estimated average output row width in bytes |

Plan values vary with statistics, data volume, configuration, and PostgreSQL version. A toy-table plan is not evidence for production scale.

## Predict before you run

For a tiny table and a query that needs all rows, a sequential scan is a plausible plan. But do not turn that into a guarantee: the lesson is about reading planner reasoning, not memorizing one node.

## Worked example

```sql
EXPLAIN SELECT title
FROM movies
ORDER BY title;
```

A plan may contain a scan plus sort. With `EXPLAIN ANALYZE`, PostgreSQL actually executes the statement and can report actual times/rows and buffers when requested.

The graded sandbox task remains a normal deterministic SELECT because exact plan text is intentionally environment-dependent:

```sql
SELECT title FROM movies ORDER BY title;
```

## Debug this

“Cost 100 means the query takes 100 ms” is incorrect. Planner cost uses configurable abstract units. To compare estimates with reality, use `EXPLAIN ANALYZE` on an appropriate representative environment—and remember it executes side effects for modifying statements.

## Common mistakes

- Comparing cost numbers directly to elapsed milliseconds.
- Treating one local plan on tiny data as proof of production behavior.
- Running `EXPLAIN ANALYZE` on a mutation without realizing the mutation is actually executed.

## Your turn

After reading the plan model, run the deterministic SELECT required by the sandbox. In real practice, compare EXPLAIN estimates against representative data before optimizing.

## Quick check

What is the most important safety difference between plain `EXPLAIN` and `EXPLAIN ANALYZE`?

**Answer:** `EXPLAIN ANALYZE` actually executes the statement; plain EXPLAIN only plans it.
