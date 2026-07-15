---
id: sql-14-sumavg
track: sql-fundamentals
locale: en
slug: sum-and-avg
title: Totals and averages with SUM and AVG
order: 14
published: true
objectives:
  - Add numbers in a column with SUM
  - Understand AVG as the mean of a column
exercise:
  starter: "SELECT amount FROM sales;"
  hints:
    - "SUM adds every value in a numeric column."
    - "Name the result with AS total so the column matches the expected output."
    - "Try: SELECT SUM(amount) AS total FROM sales;"
  solution: "SELECT SUM(amount) AS total FROM sales;"
  preview:
    columns: ["id", "amount"]
    rows:
      - [1, 10]
      - [2, 20]
      - [3, 30]
  expected:
    columns: ["total"]
    rows:
      - [60]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE sales (id INT, amount INT);"
    - "INSERT INTO sales VALUES (1, 10), (2, 20), (3, 30);"
---

When a column holds amounts, you often want the total or the average — like summing a spreadsheet column or taking its mean.

| id | amount |
| --- | --- |
| 1 | 10 |
| 2 | 20 |
| 3 | 30 |

## Worked example

```sql
SELECT SUM(amount) AS total, AVG(amount) AS average FROM sales;
```

- `SUM(amount)` adds `10 + 20 + 30` → `60`.
- `AVG(amount)` divides that total by the number of rows → `20`.
- Each aggregate returns one summary value for the whole table (unless you later use `GROUP BY`).

Result:

| total | average |
| --- | --- |
| 60 | 20 |

## Common mistakes

- Selecting `amount` next to `SUM(amount)` without grouping — a plain column and an aggregate do not mix that way.
- Confusing `SUM` (add everything) with `COUNT` (how many rows).
- Forgetting `AS total` when the exercise expects that exact column name.

## Your turn

Add every `amount` in `sales`. Return one column named `total`.
