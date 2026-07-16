# JavaScript code sandbox

## Purpose

Locked architecture for **client-side JavaScript exercises** on the `javascript-basics` track: isolated execution in the browser, server-side grading metadata (like SQL), and UX parity with `SqlSandbox` (hints, solution reveal, auth gate).

Research date: **2026-07-16** (checklist row **#24**).

## When to use

- Implementing or changing `JsSandbox` (or equivalent) on the web
- Adding `exercise` blocks to JS curriculum lessons
- Adding API grading endpoints for JS submissions
- Security review of learner code execution

## Locked decision (chốt)

| Layer | Choice |
|-------|--------|
| **Execution** | Dedicated **Web Worker** (`public/workers/js-sandbox.worker.js` or equivalent module worker). No `eval` / `new Function` on the main thread. |
| **Timeout** | Main thread enforces **2.5s** max; `worker.terminate()` on overrun. |
| **Console** | Worker wraps user code; capture `console.log` / `warn` / `error` lines and return via `postMessage`. |
| **Return value** | Worker evaluates learner code as an async IIFE; last expression value is serialized (JSON-safe types only). |
| **Grading** | **Server-side compare** of submitted outcome vs `exercise.expected` loaded from Postgres by `lessonId` + `locale`. No server-side Node/`vm` runner. |
| **API** | Authed `POST /api/v1/sandbox/js/grade` with `{ lessonId, locale, returnValue, consoleLines }` → `{ passed, code?, message? }`. |
| **Secrets** | Public `GET /lessons/:slug` strips `exercise.expected` and `exercise.solution` (same as SQL). Solution via authed `GET /lessons/:slug/solution`. |
| **UX** | Reuse sandbox feedback patterns from [`sandbox-feedback.md`](./sandbox-feedback.md): progressive hints, solution after 3 failed attempts, guest soft gate. |
| **Curriculum** | `exercise.starter`, `hints`, `solution`, `expected` — **no** `sandbox_seed`. Start with **return-value** and **console** graders only. |

### Rejected options

| Option | Why not |
|--------|---------|
| Postgres SQL sandbox | Wrong runtime; locked in [`javascript-track.md`](./javascript-track.md). |
| Server Node `vm` / container runner | Ops cost, latency, and explicit out-of-scope for this track. |
| `eval` on main thread | Blocks UI; DOM/cookie exposure risk. |
| Sandboxed `<iframe srcdoc>` alone | Weaker infinite-loop kill switch; worker + terminate is simpler. |
| SES `lockdown()` + `Compartment` (phase 1) | Heavier bundle; workers already isolate DOM. Revisit if we need many concurrent sandboxes or finer capability control. |
| Client-only grading with `expected` in bundle | Leaks answers; contradicts B1 lesson hardening. |

## Steps (implementation order)

1. **OpenSpec** — `openspec/changes/js-code-sandbox/` (proposal → `/opsx-apply`).
2. **API** — `POST /api/v1/sandbox/js/grade`, `gradeJs()` with `expected` shapes:
   - `type: "returnValue"` — deep-equal JSON compare on `returnValue`
   - `type: "console"` — ordered line compare on `consoleLines` (trimmed strings)
3. **Worker** — message protocol: `{ type: "run", code, timeoutMs }` → `{ ok, returnValue?, consoleLines?, error? }`.
4. **Web** — `JsSandbox.vue` + CodeMirror `javascript` lang; wire lesson page when `track === 'javascript-basics'` and `lesson.exercise` present.
5. **Curriculum** — one sandbox exercise per lesson (9 × en/vi); see [`javascript-basics-w3schools-map.md`](./javascript-basics-w3schools-map.md).
6. **Tests** — Go unit tests for `gradeJs`; Node tests for worker protocol; extend `release-smoke.ps1` with one JS grade gate.
7. **Docs** — update [`javascript-track.md`](./javascript-track.md) sandbox table to **shipped**.

## Exercise frontmatter (JS)

```yaml
exercise:
  starter: |
    let name = "Syntaxia";
    // return the length of name
  hints:
    - "Strings have a .length property."
    - "Use return at the end of your code."
  solution: |
    let name = "Syntaxia";
    return name.length;
  expected:
    type: returnValue
    value: 8
```

Console example:

```yaml
  expected:
    type: console
    lines:
      - "Hello, Syntaxia!"
```

## Do

- Run untrusted learner code only inside a worker.
- Keep grading inputs server-side; strip from public lesson JSON.
- Mirror SQL sandbox auth, hints, and solution reveal UX.
- Ship en + vi exercise pairs together.
- Fail closed on malformed `expected` or worker errors.

## Don't

- Reuse `POST /api/v1/sandbox/run` (SQL-only).
- Add `sandbox_seed` to JS lessons.
- Trust client `passed: true` without server grade.
- Auto-fill the editor on solution reveal without explicit **Use this code** click.

## Related

- [`javascript-track.md`](./javascript-track.md)
- [`sql-sandbox.md`](./sql-sandbox.md) — SQL runner (not for JS)
- [`sandbox-feedback.md`](./sandbox-feedback.md)
- [`audit-remediation-checklist.md`](./audit-remediation-checklist.md) — B1 lesson stripping
- OpenSpec: `openspec/changes/js-code-sandbox/`
- Research sources: [MDN Web Workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers), [SES docs](https://docs.endojs.org/modules/ses.html)
