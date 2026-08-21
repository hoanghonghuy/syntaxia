# IT Curriculum V2

## Why

The existing technical curriculum is complete enough in topic coverage, but most lessons still follow a reader-first pattern: explanation -> worked example -> common mistakes -> sandbox task. That is useful reference material, but it does not consistently require prediction, code/data tracing, debugging, or retrieval before the learner sees the answer.

Technical learning needs a different pedagogy from language learning. SQL, programming, and web development should develop executable mental models and debugging skill, not only recognition of syntax.

## Scope

- Establish `docs/processes/it-learning-pedagogy-v2.md` as the active technical-learning contract.
- Migrate SQL Fundamentals first, one block at a time, without changing stable lesson IDs/slugs or breaking sandbox grading.
- Start with Block A (orders 0–7) as the reference slice.
- Add automated structural checks for migrated content.
- After SQL Fundamentals, migrate PostgreSQL, JavaScript, HTML, and CSS.
- Keep Language V3 paused while this work is active.

## Non-goals

- No mass rewrite of all tracks in one commit.
- No new framework-specific curriculum.
- No redesign of the language-learning player in this change.
- No replacement of the SQL sandbox/grader unless a concrete content requirement proves it necessary.

## Success criteria

A migrated lesson makes the learner see a concrete artifact, predict behavior, understand the mental model, diagnose an error, complete a sandbox task, and recall the concept. EN/VI parity and existing grading contracts remain intact.
