---
id: sql-14-sumavg
track: sql-fundamentals
locale: en
slug: sum-and-avg
title: Totals and averages with SUM and AVG
order: 14
published: true
can_do: "Reduce numeric rows to a total or arithmetic mean with SUM and AVG"
objectives:
  - Trace how SUM combines numeric inputs
  - Explain AVG as a summary over non-NULL numeric values
  - Distinguish totals from counts
exercise:
  starter: "SELECT amount FROM sales;"
  hints:
    - "The task asks for one total, so aggregate the amount column instead of listing it."
    - "Use SUM(amount) and name the result total."
    - "Use: SELECT SUM(amount) AS total FROM sales;"
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

Totals and averages answer different questions about the same numeric inputs. The skill is to identify the summary the requirement actually asks for.

## Mental model

**sales**

| product | amount |
| --- | ---: |
| Ticket | 10 |
| Snack | 20 |
| Poster | 30 |
| Program | 15 |

Trace the two reductions:

- `SUM(amount)` -> `10 + 20 + 30 + 15` -> **75**
- `AVG(amount)` -> `75 / 4` -> **18.75**

Like other ungrouped aggregates, each expression produces one summary value for the whole input set. Standard SQL aggregates such as SUM and AVG ignore NULL input values rather than treating them as zero.

## Predict before you run

```sql
SELECT SUM(amount) AS total
FROM sales;
```

Predict: one column, one row, value **75**. Changing `SUM` to `COUNT` would answer a different question: there are four rows, not 75.

## Worked example

```sql
SELECT SUM(amount) AS total,
       AVG(amount) AS average
FROM sales;
```

| total | average |
| ---: | ---: |
| 75 | 18.75 |

The exercise asks for only the first summary, named `total`.

## Debug this

Why is this conceptually inconsistent without grouping?

```sql
SELECT product, SUM(amount)
FROM sales;
```

`product` asks for row-level values while `SUM(amount)` asks for one whole-set summary. Later, `GROUP BY` will show how to create one aggregate result per category. For now, aggregate the whole table without a row-level column beside it.

## Common mistakes

- Using COUNT when the task asks to add numeric values.
- Mixing row-level columns with whole-table aggregates without a grouping rule.
- Treating missing numeric values as zero; aggregates generally ignore NULL inputs.

## Your turn

Return the total of all `amount` values as one column named `total`. Predict the arithmetic before running it.

## Quick check

What question does `SUM(amount)` answer that `COUNT(*)` does not?

**Answer:** SUM answers “what do these numeric values add up to?”; COUNT answers “how many rows are there?”.
