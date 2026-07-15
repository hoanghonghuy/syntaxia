---
id: pg-00-types
track: postgresql
locale: en
slug: postgresql-types
title: PostgreSQL column types
order: 0
published: true
objectives:
  - Recognize common PostgreSQL column types
  - Filter rows using a typed column (BOOLEAN)
exercise:
  starter: "SELECT name, price FROM catalog;"
  hints:
    - "Add a WHERE clause so only rows that are in stock remain."
    - "The in_stock column is BOOLEAN — compare it to true (no quotes)."
    - "Try: SELECT name, price FROM catalog WHERE in_stock = true;"
  solution: "SELECT name, price FROM catalog WHERE in_stock = true;"
  preview:
    columns: ["id", "name", "price", "in_stock"]
    rows:
      - [1, "Notebook", 13, true]
      - [2, "Pencil", 1, false]
      - [3, "Eraser", 2, true]
  expected:
    columns: ["name", "price"]
    rows:
      - ["Notebook", 13]
      - ["Eraser", 2]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE catalog (id INTEGER, name TEXT, price INTEGER, in_stock BOOLEAN);"
    - "INSERT INTO catalog VALUES (1, 'Notebook', 13, true), (2, 'Pencil', 1, false), (3, 'Eraser', 2, true);"
---

In a spreadsheet, a column might hold numbers, text, or yes/no values. PostgreSQL stores the same idea as a **column type** — a rule for what kind of value belongs in that column.

Common types you will see:

| Type | Plain meaning | Example |
| --- | --- | --- |
| `INTEGER` | Whole numbers | `1`, `42` |
| `TEXT` | Words and labels | `'Notebook'` |
| `NUMERIC` | Decimal amounts (later lessons) | `12.5` |
| `BOOLEAN` | Yes/no | `true`, `false` |

Here is a small product list named `catalog` using `INTEGER`, `TEXT`, and `BOOLEAN`:

| id | name | price | in_stock |
| --- | --- | --- | --- |
| 1 | Notebook | 13 | true |
| 2 | Pencil | 1 | false |
| 3 | Eraser | 2 | true |

## Worked example

```sql
SELECT name, price FROM catalog WHERE in_stock = true;
```

- `in_stock` is a `BOOLEAN` column.
- `= true` keeps only products that are available.
- Pencil is dropped because `in_stock` is `false`.

Result:

| name | price |
| --- | --- |
| Notebook | 13 |
| Eraser | 2 |

## Common mistakes

- Wrapping `true` in quotes (`'true'`) — that is text, not a boolean.
- Filtering on `name` when the task is about stock status.
- Mixing up type names (`INT` vs `INTEGER` is fine in PostgreSQL; both mean whole numbers).

## Your turn

Return `name` and `price` for every product that is currently in stock.
