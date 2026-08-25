---
id: sql-23-self-join
track: sql-fundamentals
locale: en
slug: self-join
title: Joining a table to itself
order: 23
published: true
can_do: "Use two aliases for one table to relate rows that play different roles"
objectives:
  - Treat one physical table as two logical join inputs
  - Match employee.manager_id to manager.id
  - Predict which rows disappear under an INNER self-join
exercise:
  starter: "SELECT name FROM employees;"
  hints:
    - "The same table needs two roles: employee e and manager m."
    - "Connect e.manager_id to m.id."
    - "Use: SELECT e.name AS employee, m.name AS manager FROM employees e INNER JOIN employees m ON e.manager_id = m.id ORDER BY e.name;"
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

A self-join is not a special database structure. It is an ordinary join where the same physical table plays two different logical roles in the query.

## Mental model

Read the table twice:

- `employees e` = “the employee row I am describing”
- `employees m` = “the row that may be this employee's manager”

| employee row | e.manager_id | manager row with m.id | pair |
| --- | ---: | --- | --- |
| Ada | NULL | none | no INNER JOIN pair |
| Bob | 1 | Ada (id 1) | Bob -> Ada |
| Cara | 1 | Ada (id 1) | Cara -> Ada |
| Dan | 2 | Bob (id 2) | Dan -> Bob |

Aliases make the two roles unambiguous even though both inputs come from `employees`.

## Predict before you run

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
INNER JOIN employees m
  ON e.manager_id = m.id;
```

Predict three result rows. Ada is absent as an employee because her `manager_id` is NULL and therefore finds no manager pair.

## Worked example

```sql
SELECT e.name AS employee, m.name AS manager
FROM employees e
INNER JOIN employees m
  ON e.manager_id = m.id
ORDER BY e.name;
```

| employee | manager |
| --- | --- |
| Bob | Ada |
| Cara | Ada |
| Dan | Bob |

The important idea is **role**, not alias spelling. `e` and `m` are short names chosen to make references readable.

## Debug this

Why does this produce self-pairs instead of manager relationships?

```sql
ON e.id = m.id
```

Every row has the same ID as itself, so Bob pairs with Bob, Cara with Cara, and so on. The relationship column is `e.manager_id`, which points to another row's `m.id`.

## Common mistakes

- Omitting aliases and making same-table column references ambiguous.
- Matching the row's own ID rather than the relationship field.
- Forgetting that INNER JOIN removes top-level rows with no manager match.

## Your turn

Return each employee with their manager, ordered by employee name. Trace the four rows as two logical roles before running.

## Quick check

Why are aliases essential in a self-join?

**Answer:** they distinguish the two logical instances/roles of the same physical table so each column reference has a clear side.
