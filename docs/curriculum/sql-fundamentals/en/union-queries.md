---
id: sql-24-union
track: sql-fundamentals
locale: en
slug: union-queries
title: Combining result sets with UNION
order: 24
published: true
objectives:
  - Stack rows from two SELECT queries with UNION
  - Understand that UNION removes duplicate values
  - Place ORDER BY after the full UNION
exercise:
  starter: "SELECT name FROM a;"
  hints:
    - "UNION stacks the rows of two SELECT results into one list."
    - "Duplicate names that appear in both tables are kept only once."
    - "Try: SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  solution: "SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
      - ["Dee"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
      - ["Dee"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE a (name TEXT);"
    - "CREATE TEMP TABLE b (name TEXT);"
    - "INSERT INTO a VALUES ('Ann'), ('Bob'), ('Cara');"
    - "INSERT INTO b VALUES ('Bob'), ('Cara'), ('Dee');"
---

Sometimes you have two similar lists and want one combined list — like stacking two spreadsheet columns into one. `UNION` runs two `SELECT` queries and merges their rows. Duplicate values appear only once.

**a** (full table)

| name |
| --- |
| Ann |
| Bob |
| Cara |

**b** (full table)

| name |
| --- |
| Bob |
| Cara |
| Dee |

| name | In `a`? | In `b`? | After `UNION`? |
| --- | --- | --- | --- |
| Ann | yes | no | once |
| Bob | yes | yes | once (duplicate dropped) |
| Cara | yes | yes | once |
| Dee | no | yes | once |

## Worked example

```sql
SELECT name FROM a
UNION
SELECT name FROM b
ORDER BY name;
```

- Each `SELECT` must return the same number of columns with compatible types.
- `UNION` drops duplicate `Bob` and `Cara`.
- `ORDER BY name` sorts the combined list — place it **after** the full `UNION`.
- To keep every row including duplicates, use `UNION ALL` (lesson `union-all`).

Result:

| name |
| --- |
| Ann |
| Bob |
| Cara |
| Dee |

## Common mistakes

- Using `UNION ALL` when the task expects unique values — `UNION ALL` keeps duplicates (see `union-all`).
- Selecting different column counts in the two queries — that causes an error.
- Putting `ORDER BY` only on the first `SELECT` — place it after the full `UNION`.

## Your turn

Return one sorted list of unique `name` values from tables `a` and `b`.
