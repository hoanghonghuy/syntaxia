# Tasks — english-guided-practice-v1

## P2.0 — contract and eligibility

- [x] Define 9 English Unit 1–9 guided-practice blueprints.
- [x] Validate identity/order/prerequisite/skill/exit-check invariants.
- [x] Derive eligibility from published curriculum + authenticated learner progress.
- [x] Add authenticated eligibility API.
- [ ] Add source-of-truth process documentation and index entry.
- [ ] Add authoritative exit-check skill coverage for the blueprint targets.
- [ ] Add API/E2E regression for eligibility.

## P2.1 — deterministic fallback state machine

- [ ] Define 3–5 turn authored interaction contract.
- [ ] Implement deterministic next-turn transitions.
- [ ] Add exit-check handoff using existing stable checkpoint item keys.
- [ ] Prove full guided practice works with no AI provider configured.

## P2.2 — optional AI variation adapter

- [ ] Add provider-neutral adapter interface.
- [ ] Add strict structured output contract and product validator.
- [ ] Sanitize curriculum/learner context and isolate untrusted learner text.
- [ ] Timeout/refusal/invalid response falls back deterministically.

## P2.3 — feedback and evidence

- [ ] Keep AI feedback formative only.
- [ ] Submit authoritative exit checks through P1 server grading.
- [ ] Verify FSRS/evidence/mastery integration and confidence/source rules.

## P2.4 — product integration

- [ ] Add learner-facing guided-practice surface.
- [ ] Integrate eligible unit/Today repair entry points.
- [ ] Add loading/error/retry/fallback/mobile/a11y states.
- [ ] Add DB-backed E2E and exact-head release gates.
