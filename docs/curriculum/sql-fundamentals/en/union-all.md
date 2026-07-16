---
id: sql-37-union-all
track: sql-fundamentals
locale: en
slug: union-all
title: Keeping duplicates with UNION ALL
order: 37
published: true
objectives:
  - Stack two SELECT results with UNION ALL
  - See that UNION ALL keeps duplicate values
  - Contrast UNION ALL with UNION
exercise:
  starter: "SELECT name FROM east;"
  hints:
    - "UNION ALL stacks every row from both SELECTs, including duplicates."
    - "If Ann appears in both tables, UNION ALL keeps both Ann rows."
    - "Try: SELECT name FROM east UNION ALL SELECT name FROM west ORDER BY name;"
  solution: "SELECT name FROM east UNION ALL SELECT name FROM west ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Ann"]
      - ["Bo"]
      - ["Cy"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Ann"]
      - ["Bo"]
      - ["Cy"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE east (id INT, name TEXT);"
    - "CREATE TEMP TABLE west (id INT, name TEXT);"
    - "INSERT INTO east VALUES (1, 'Ann'), (2, 'Bo');"
    - "INSERT INTO west VALUES (1, 'Ann'), (2, 'Cy');"
---

`UNION` stacks two result lists and **removes duplicates**. Sometimes you want every row, even when the same value appears twice — like stacking two attendance sheets without deleting a name that signed both days. That is `UNION ALL`.

**east**

| id | name |
| --- | --- |
| 1 | Ann |
| 2 | Bo |

**west**

| id | name |
| --- | --- |
| 1 | Ann |
| 2 | Cy |

Both lists contain `Ann`. With `UNION` you would see `Ann` once. With `UNION ALL` you see `Ann` twice.

## Worked example

```sql
SELECT name
FROM east
UNION ALL
SELECT name
FROM west
ORDER BY name;
```

- First `SELECT` returns Ann, Bo.
- Second `SELECT` returns Ann, Cy.
- `UNION ALL` stacks all four rows — no duplicate removal.
- `ORDER BY name` sorts the combined list A→Z (both Ann rows stay).

Result:

| name |
| --- |
| Ann |
| Ann |
| Bo |
| Cy |

Same data with `UNION` (for comparison — not your exercise):

| name |
| --- |
| Ann |
| Bo |
| Cy |

Only three rows, because the second Ann was dropped.

## Common mistakes

- Using `UNION` when you need every duplicate — switch to `UNION ALL`.
- Putting `ORDER BY` only on the first SELECT — put it after the whole `UNION ALL` chain.
- Different column counts or types in the two SELECTs — both sides must line up.

## Your turn

Combine every `name` from `east` and `west` with `UNION ALL`. Order by `name`. Keep both Ann rows.
