---
id: sql-22-full-join
track: sql-fundamentals
locale: en
slug: full-join
title: Combining both sides with FULL OUTER JOIN
order: 22
published: true
objectives:
  - Keep unmatched rows from both tables with FULL OUTER JOIN
  - Spot leftovers on either side with NULL checks
  - Find customers with no orders using IS NULL after the join
exercise:
  starter: "SELECT name FROM customers;"
  hints:
    - "FULL OUTER JOIN keeps rows that match and rows that match on only one side."
    - "Customers with no orders have orders.id as NULL after the join."
    - "Try: SELECT customers.name FROM customers FULL OUTER JOIN orders ON customers.id = orders.customer_id WHERE orders.id IS NULL ORDER BY customers.name;"
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

`LEFT JOIN` keeps the left table; `RIGHT JOIN` keeps the right. `FULL OUTER JOIN` keeps **both**: matches plus leftovers from either side. Think of merging two contact lists and still seeing names that appear in only one list.

**customers** (full table)

| id | name |
| --- | --- |
| 1 | Ann |
| 2 | Bob |
| 3 | Cara |

**orders** (full table)

| id | customer_id | amount |
| --- | --- | --- |
| 1 | 1 | 50 |
| 2 | 99 | 20 |

| Side | What happens |
| --- | --- |
| Ann + order 1 | match |
| Bob, Cara | customer only → order columns `NULL` |
| order 2 (`customer_id` 99) | order only → customer columns `NULL` |

## Worked example

```sql
SELECT customers.name, orders.id AS order_id, orders.amount
FROM customers
FULL OUTER JOIN orders ON customers.id = orders.customer_id
ORDER BY customers.name, orders.id;
```

- Ann matches order `1`.
- Bob and Cara have no order, so `orders.id` is `NULL`.
- Order `2` points at customer `99`, who is missing — customer name is `NULL`.
- `WHERE orders.id IS NULL` returns customers who never ordered (Bob and Cara).

Result of the full join (before the filter):

| name | order_id | amount |
| --- | --- | --- |
| Ann | 1 | 50 |
| Bob |  |  |
| Cara |  |  |
|  | 2 | 20 |

Customers with no orders:

| name |
| --- |
| Bob |
| Cara |

## Common mistakes

- Using `INNER JOIN` when you need unmatched rows from either side.
- Writing `FULL JOIN` without understanding it is the same idea as `FULL OUTER JOIN` in PostgreSQL.
- Filtering with `= NULL` instead of `IS NULL`.

## Your turn

List the `name` of every customer who has no matching order. Order by `customers.name`.
