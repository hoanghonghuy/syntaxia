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
    columns: ["id", "product", "amount"]
    rows:
      - [1, "Ticket", 10]
      - [2, "Snack", 20]
      - [3, "Poster", 30]
      - [4, "Program", 15]
  expected:
    columns: ["total"]
    rows:
      - [75]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE sales (id INT, product TEXT, amount INT);"
    - "INSERT INTO sales VALUES (1, 'Ticket', 10), (2, 'Snack', 20), (3, 'Poster', 30), (4, 'Program', 15);"
---

When a column holds amounts, you often want the total or the average — like summing a spreadsheet column or taking its mean.

**sales** (full table)

| id | product | amount |
| --- | --- | --- |
| 1 | Ticket | 10 |
| 2 | Snack | 20 |
| 3 | Poster | 30 |
| 4 | Program | 15 |

Amounts: `10 + 20 + 30 + 15` = **75**. Average would be `75 / 4` = **18.75**.

## Worked example

```sql
SELECT SUM(amount) AS total, AVG(amount) AS average FROM sales;
```

- `SUM(amount)` adds every amount → `75`.
- `AVG(amount)` divides that total by the number of rows → `18.75`.
- Each aggregate returns one summary value for the whole table (unless you later use `GROUP BY`).

Result:

| total | average |
| --- | --- |
| 75 | 18.75 |

Your exercise asks only for `SUM` named `total`.

## Common mistakes

- Selecting `amount` next to `SUM(amount)` without grouping — a plain column and an aggregate do not mix that way.
- Confusing `SUM` (add everything) with `COUNT` (how many rows).
- Forgetting `AS total` when the exercise expects that exact column name.

## Your turn

Add every `amount` in `sales`. Return one column named `total`.
