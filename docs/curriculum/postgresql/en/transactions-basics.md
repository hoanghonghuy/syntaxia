---
id: pg-24-tx
track: postgresql
locale: en
slug: transactions-basics
title: Transaction boundaries and all-or-nothing changes
order: 24
published: true
can_do: "Reason about BEGIN/COMMIT/ROLLBACK as a consistency boundary and perform a targeted mutation inside the sandbox transaction"
objectives:
  - Explain atomic all-or-nothing transaction behavior
  - Distinguish COMMIT from ROLLBACK and autocommit
  - Connect transaction scope to multi-step consistency
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "The sandbox already owns the transaction boundary; your graded task is the targeted UPDATE inside it."
    - "Use WHERE title = 'Interstellar' so only the intended row changes."
    - "Use: UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  solution: "UPDATE movies SET year = 2014 WHERE title = 'Interstellar';"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2010]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Interstellar", 2014]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'Interstellar', 2010);"
---

A transaction is a consistency boundary: several statements can become one all-or-nothing unit of work. Other transactions do not observe a half-finished multi-step change as a committed state.

## Mental model

```text
BEGIN
  step A
  step B
  step C
COMMIT   -> keep the unit
```

or:

```text
BEGIN
  step A
  step B fails / decision changes
ROLLBACK -> discard the unit's changes
```

Without an explicit transaction block, PostgreSQL normally runs each statement in its own transaction (autocommit behavior from the client's perspective).

Transactions are not just “undo buttons”. They are how related writes preserve invariants under failures and concurrency; isolation level then governs what concurrent transactions can observe.

## Predict before you run

The sandbox already wraps this exercise safely. The targeted UPDATE should alter Interstellar only; Inception remains 2010.

## Worked example

In an application, a multi-step unit could look like:

```sql
BEGIN;
UPDATE accounts SET balance = balance - 100 WHERE id = 1;
UPDATE accounts SET balance = balance + 100 WHERE id = 2;
COMMIT;
```

If the second step cannot be accepted, `ROLLBACK` can discard the transaction rather than commit a one-sided transfer.

For this sandbox, run only the inner mutation:

```sql
UPDATE movies SET year = 2014 WHERE title = 'Interstellar';
```

## Debug this

Two related writes are executed as separate autocommitted statements. The first succeeds and the process crashes before the second. Each SQL statement was valid, but the business operation is inconsistent because the transaction boundary was wrong.

## Common mistakes

- Thinking transactions matter only when a query throws a syntax error.
- Splitting a single business invariant across independent commits.
- Holding transactions open unnecessarily while waiting on slow external work, increasing contention and resource usage.

## Your turn

Perform the targeted Interstellar update inside the sandbox's existing transaction and verify the final state.

## Quick check

Why wrap a multi-step money transfer in one transaction?

**Answer:** so all related balance changes commit together or none of them do, preserving the business invariant under failure.
