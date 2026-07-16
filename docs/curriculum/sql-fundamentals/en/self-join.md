---
id: sql-23-self-join
track: sql-fundamentals
locale: en
slug: self-join
title: Joining a table to itself
order: 23
published: true
objectives:
  - Join a table to itself with two aliases
  - Match employees to their managers on manager_id
  - See why the top manager disappears under INNER JOIN
exercise:
  starter: "SELECT name FROM employees;"
  hints:
    - "Give the same table two aliases, such as e for employee and m for manager."
    - "Link them with e.manager_id = m.id."
    - "Try: SELECT e.name AS employee, m.name AS manager FROM employees e INNER JOIN employees m ON e.manager_id = m.id ORDER BY e.name;"
  solution: "SELECT e.name AS employee, m.name AS manager FROM employees e INNER JOIN employees m ON e.manager_id = m.id ORDER BY e.name;"
  preview:
    columns: ["id", "name", "manager_id"]
    rows:
      - [1, "Ada", null]
      - [2, "Bob", 1]
      - [3, "Cara", 1]
      - [4, "Dan", 2]
  expected:
    columns: ["employee", "manager"]
    rows:
      - ["Bob", "Ada"]
      - ["Cara", "Ada"]
      - ["Dan", "Bob"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE employees (id INT, name TEXT, manager_id INT);"
    - "INSERT INTO employees VALUES (1, 'Ada', NULL), (2, 'Bob', 1), (3, 'Cara', 1), (4, 'Dan', 2);"
---

Sometimes related rows live in the **same** table — like an org chart where each person points to a manager id. A self-join reads that table twice under two names (aliases) and matches them.

**employees** (full table)

| id | name | manager_id |
| --- | --- | --- |
| 1 | Ada |  |
| 2 | Bob | 1 |
| 3 | Cara | 1 |
| 4 | Dan | 2 |

| employee | manager_id | manager name |
| --- | --- | --- |
| Bob | 1 | Ada |
| Cara | 1 | Ada |
| Dan | 2 | Bob |
| Ada |  | none (top of chart) |

## Worked example

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
INNER JOIN employees m ON e.manager_id = m.id
ORDER BY e.name;
```

- `employees e` is the worker side; `employees m` is the manager side.
- `ON e.manager_id = m.id` links each person to their manager.
- Ada has `manager_id` NULL, so she does not appear as an employee in an `INNER JOIN`.
- Dan reports to Bob, who reports to Ada — two levels in one table.

Result:

| employee | manager |
| --- | --- |
| Bob | Ada |
| Cara | Ada |
| Dan | Bob |

## Common mistakes

- Forgetting aliases — SQL cannot tell the two uses of `employees` apart without them.
- Joining `e.id = m.id` — that matches each person to themselves, not to a manager.
- Expecting Ada in the employee column when using `INNER JOIN` — she has no manager row to match.

## Your turn

Return each employee `name` as `employee` with their manager `name` as `manager`, ordered by employee name.
