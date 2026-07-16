---
id: sql-31-drop
track: sql-fundamentals
locale: en
slug: drop-table
title: Removing a table with DROP TABLE
order: 31
published: true
objectives:
  - Drop an unused table
  - Leave other tables untouched
  - Contrast DROP TABLE with DELETE (rows only)
exercise:
  starter: "DROP TABLE "
  hints:
    - "DROP TABLE removes the whole table, not just rows."
    - "Name only the table you want gone — leave keepers alone."
    - "Try: DROP TABLE obsolete;"
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

`DELETE` removes rows. `DROP TABLE` removes the entire table — structure and data — like deleting a whole sheet from a workbook.

You have two temporary tables:

| table | purpose | sample rows |
| --- | --- | --- |
| obsolete | no longer needed | empty |
| keepers | still in use | one row (`id = 1`) |

| Command | What it removes |
| --- | --- |
| `DELETE FROM obsolete` | rows only — empty table remains |
| `DROP TABLE obsolete` | the whole table |

Drop only `obsolete`. `keepers` must remain.

## Worked example

```sql
DROP TABLE obsolete;
```

- `DROP TABLE` names the command.
- `obsolete` is the table to remove.
- After this, queries against `obsolete` fail; `keepers` is unchanged.

## Common mistakes

- Dropping `keepers` by mistake — read the table name carefully.
- Using `DELETE FROM obsolete` — that clears rows but leaves the empty table.
- Writing `DROP TABLE obsolete, keepers` when the task asks for one table only.

## Your turn

Drop the `obsolete` table. Leave `keepers` in place.
