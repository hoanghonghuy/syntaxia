# Proposal: JavaScript code sandbox

## Problem

The `javascript-basics` track (9 lessons, en+vi) ships without runnable exercises. Learners can only read examples and mark complete. Checklist row **#24** requires a safe JS runner that does not reuse the Postgres SQL sandbox or a server-side Node VM.

## Solution

Add a **browser Web Worker** execution path and a thin **Go grading endpoint** that compares learner output to server-stored `exercise.expected`:

- `POST /api/v1/sandbox/js/grade` (authenticated)
- `JsSandbox.vue` on JS lessons (CodeMirror JavaScript mode)
- Worker timeout + console capture + JSON-safe return value
- UX parity with `SqlSandbox`: hints, fail feedback, solution reveal after 3 attempts
- Pilot exercises on `variables` and `functions` (en+vi)

## Out of scope

- DOM / `document` exercises (later track)
- SES compartments or iframe-only sandboxes
- Server-side JS execution
- Grading `async`/`fetch` network calls
- Retrofitting exercises into all 9 lessons in one pass

## References

- [`docs/processes/javascript-sandbox.md`](../../../docs/processes/javascript-sandbox.md) — locked architecture
- [`docs/processes/javascript-track.md`](../../../docs/processes/javascript-track.md)
