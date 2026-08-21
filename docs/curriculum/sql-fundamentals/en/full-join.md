---
id: sql-22-full-join
track: sql-fundamentals
locale: en
slug: full-join
title: Combining both sides with FULL OUTER JOIN
order: 22
published: true
can_do: "Preserve unmatched rows from both inputs with FULL OUTER JOIN and identify which side is missing"
objectives:
  - Distinguish matched pairs, left-only rows, and right-only rows
  - Read NULL-extension on either side of a full join
  - Filter one kind of unmatched row with an appropriate NULL check
exercise:
  starter: "SELECT name FROM customers;"
  hints:
    - "FULL OUTER JOIN preserves customers and orders even when one side has no match."
    - "A customer with no order has orders.id as NULL; an orphan order has customer columns as NULL."
    - "Use: SELECT customers.name FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL ORDER BY customers.name;"
  solution: "SELECT customers.name FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL ORDER BY customers.name;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Ann"]
      - [2, "Bob"]
      - [3, "Cara"]
  expected:
    columns: ["name"]
    rows:
      - ["Bob"]
      - ["Cara"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE customers (id INT, name TEXT);"
    - "CREATE TEMP TABLE orders (id INT, customer_id INT, amount INT);"
    - "INSERT INTO customers VALUES (1, 'Ann'), (2, 'Bob'), (3, 'Cara');"
    - "INSERT INTO orders VALUES (1, 1, 50), (2, 99, 20);"
---

FULL OUTER JOIN is useful when reconciliation matters: you want to see matches **and** leftovers from both datasets instead of choosing one preserved side.

## Mental model

Classify every joined outcome into one of three buckets:

| Outcome | customer side | order side |
| --- | --- | --- |
| matched | present | present |
| customer only | present | NULL-filled |
| order only | NULL-filled | present |

With the lesson data:

| outcome | customer | order |
| --- | --- | --- |
| match | Ann | order 1 |
| left-only | Bob | NULL |
| left-only | Cara | NULL |
| right-only | NULL | order 2 (`customer_id = 99`) |

## Predict before you run

A full join before filtering should produce **four rows**. Now predict two different NULL filters:

- `orders.id IS NULL` -> Bob and Cara, customers with no order.
- `customers.id IS NULL` -> the orphan order pointing to customer 99.

The side you test determines which kind of leftover you isolate.

## Worked example

```sql
SELECT customers.name
FROM customers
FULL OUTER JOIN orders
  ON customers.id = orders.customer_id
WHERE orders.id IS NULL
ORDER BY customers.name;
```

| name |
| --- |
| Bob |
| Cara |

The orphan order is not included because its `orders.id` exists; its missing side is `customers` instead.

## Debug this

The requirement is “customers with no orders”, but someone writes:

```sql
WHERE customers.id IS NULL
```

That predicate finds the opposite leftover: orders that have no matching customer. With outer joins, always ask **which side should be missing in the rows I want?**

## Common mistakes

- Treating FULL JOIN as “every possible combination”; it still uses the ON matching rule.
- Checking NULL on the wrong side and selecting the opposite kind of orphan.
- Replacing the outer join with INNER JOIN and losing all unmatched rows.

## Your turn

Return customers with no matching order, sorted by customer name. Classify the four full-join outcomes before applying the filter.

## Quick check

In a FULL OUTER JOIN, what does a row with customer columns NULL and order columns present represent?

**Answer:** a right-only order that found no matching customer.
