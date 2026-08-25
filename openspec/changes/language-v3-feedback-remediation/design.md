# Design — language-v3-feedback-remediation

## State model

Per exercise instance:

- `attempts`: all checked attempts, used for emitted telemetry
- `failedAttempts`: failed checked attempts, used for remediation unlocks
- `hintIndex`: manual hint reveal count
- `visibleHintCount = max(failedAttempts, hintIndex)` capped by authored hints
- `solutionRevealed`: learner explicitly opened the solution after the threshold
- `status`: idle / fail / pass

Changing a selected/input answer after failure clears the red fail state but does not reset attempts, hints, or an already revealed solution.

## Solution threshold

`LANGUAGE_SOLUTION_REVEAL_ATTEMPTS = 3`.

The solution button is unavailable before the threshold. Opening it is informational only: it does not emit `attempt`, does not emit `passed`, and does not advance lesson/checkpoint state.

## Structured solutions

The player must show learner-readable content:

- text/order/choice: authored `answer`
- matching: `left → right` pairs rather than the canonical `left=right|...` grading encoding
- image choice: use accessible media description when available rather than an internal choice id

## Accessibility and mobile floor

- choice/matching controls are labeled groups
- Enter checks text input
- failed text input exposes `aria-invalid`
- feedback/solution use polite live regions
- focus-visible styles remain explicit
- primary input/choice/token targets stay at least ~44–48px high
- long choice/token/solution content wraps rather than creating required horizontal scrolling

## Persistence interaction

Only checked attempts emit `attempt`. Review scheduling therefore still receives failed/correct attempt evidence, while opening hints or solution does not create fake FSRS reviews.
