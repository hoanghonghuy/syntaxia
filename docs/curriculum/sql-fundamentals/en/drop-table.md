---
id: sql-31-drop
track: sql-fundamentals
locale: en
slug: drop-table
title: Removing a table with DROP TABLE
order: 31
published: true
can_do: "Choose DROP TABLE only when the entire database object, not merely its rows, should be removed"
objectives:
  - Contrast DELETE with DROP TABLE
  - Predict the object-level effect of DROP TABLE
  - Remove one target table without touching neighboring tables
exercise:
  starter: "DROP TABLE "
  hints:
    - "The requirement removes the table object itself, not only its rows."
    - "Target obsolete and leave keepers untouched."
    - "Use: DROP TABLE obsolete;"
  solution: "DROP TABLE obsolete;"
  preview:
    columns: ["table"]
    rows:
      - ["obsolete"]
      - ["keepers"]
  expected:
    columns: ["dropped"]
    rows:
      - [true]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT to_regclass('pg_temp.obsolete') IS NULL AS dropped;"
  ddl:
    - "CREATE TEMP TABLE obsolete (id INT);"
    - "CREATE TEMP TABLE keepers (id INT);"
    - "INSERT INTO keepers VALUES (1);"
---

Deleting data and deleting a database object are different operations. `DROP TABLE` removes the table definition itself, including the rows inside it.

## Mental model

| Command | Rows after | Table after |
| --- | --- | --- |
| `DELETE FROM obsolete;` | 0 | still exists |
| `DROP TABLE obsolete;` | unavailable | no longer exists |

The sandbox starts with two independent table objects: `obsolete` and `keepers`. The requirement targets only one of them.

## Predict before you run

After `DROP TABLE obsolete;`:

- resolving `obsolete` should fail / return no relation;
- `keepers` should still exist with its row.

This is an object-scope mutation, so table-name accuracy matters more than with a read-only query.

## Worked example

```sql
DROP TABLE obsolete;
```

The verifier checks that the temporary relation named `obsolete` can no longer be resolved.

## Debug this

```sql
DELETE FROM obsolete;
```

This may leave zero rows, but the table object still exists. If the requirement says the table itself is obsolete, clearing its data is the wrong scope of change.

## Common mistakes

- Using `DELETE` when the whole table object must disappear.
- Dropping the wrong table because the command is short and destructive.
- Assuming `DROP TABLE` is reversible in normal application workflows; treat destructive DDL deliberately.

## Your turn

Drop only `obsolete`. Before running, state which database object should still exist afterward.

## Quick check

After `DELETE FROM t`, can `SELECT * FROM t` still be a valid query?

**Answer:** yes, because `DELETE` removes rows but leaves table `t` itself.
