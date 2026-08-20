# Proposal — language-v3-feedback-remediation

## Why

Language v3 already prevents duplicate pass events and supports authored hints/explanations, but remediation is still too dependent on the learner manually discovering help. A production language player needs a consistent minimum feedback loop across exercise types.

## Change

- Reveal authored hints progressively after failed checked attempts.
- Delay solution reveal until three failed attempts.
- Revealing the solution never counts as a pass; the learner must still answer again.
- Format learner-facing solutions for structured exercises instead of exposing canonical grading strings.
- Preserve unlocked remediation while the learner retries.
- Strengthen keyboard, focus, live-region, touch-target, and long-text behavior.
- Add a dedicated regression test and wire it into `test:language-v3`.

## Out of scope

- Semantic visual asset pipeline (L3)
- True communicative unit metadata/path (L4)
- Speech recognition or pronunciation scoring
- Mass curriculum rewrite
