# English Guided Practice V1

## Status

**P2 is in progress. P2.0 is implemented; P2.1 is next.**

## Purpose

Define how Syntaxia turns the completed English A1 curriculum and Learning Intelligence V1 into bounded, curriculum-constrained guided practice without becoming a generic chatbot.

P2 starts text-first. The product must remain useful when an AI provider is disabled, unavailable, slow, or returns invalid output.

## When to use

- Designing or implementing English guided practice
- Adding a guided-practice API, state machine, UI, AI adapter, or fallback
- Mapping English unit practice to P1 skills/mastery/weakness
- Adding or changing practice eligibility or exit checks
- Reviewing whether AI output may affect learner evidence

## Locked product contract

P2 is **unit consolidation**, not a replacement lesson player.

```text
completed authored lesson(s) + unit checkpoint
-> eligible guided-practice blueprint
-> deterministic fallback / optional constrained AI variation
-> 3–5 guided interaction turns
-> formative feedback
-> authored deterministic exit check
-> P1 server grading / FSRS / evidence / mastery
```

### Scope

- English `english-basics` only in V1.
- Text guided practice covers Units **1–9**.
- Unit 0 pronunciation/sound work remains in the audio-first lesson/review flow; it is not converted into text conversation.
- Delayed `*-review` nodes remain FSRS/retrieval work and do **not** gate guided-practice eligibility.

### Eligibility

A unit blueprint becomes eligible only when every authored prerequisite slug in that blueprint resolves to a currently published lesson in the requested locale and the learner has completed each prerequisite.

P2.0 prerequisites are the unit's teaching lesson(s) plus its checkpoint. Missing/unpublished curriculum fails closed.

Authenticated read API:

```http
GET /api/v1/language/guided-practice/eligibility?track=english-basics&locale=en
```

The server owns eligibility. The client never submits `eligible=true`, target skill ids, or a curriculum frontier.

### Blueprint

A practice blueprint is stable authored product metadata. It declares:

- stable blueprint id;
- English unit id/order;
- scenario goal;
- required lesson/checkpoint slugs;
- reusable target skill ids;
- allowed taught patterns;
- checkpoint lesson containing authoritative exit checks;
- stable authored exit-check item keys.

The blueprint references existing checkpoint identities instead of copying answer truth into a second grading system.

P2.0 has exactly **9 blueprints**, one for every communicative Unit 1–9. Unit 3 explicitly includes the number exit item and Unit 8 explicitly includes the planning/close item so every declared target skill has an evidence path.

## AI boundary

AI is downstream of deterministic product truth.

```text
blueprint
+ taught curriculum context
+ learner weakness/mastery context
+ sanitized current turn
-> optional AI surface variation / formative feedback
```

AI may later:

- vary names, concrete objects, or scenario wording inside the blueprint;
- produce one bounded next turn matching an authored objective;
- provide concise formative feedback or a hint.

AI must not:

- unlock a unit;
- add untaught grammar/functions as required language;
- choose or mutate target skill ids;
- write progress/mastery directly;
- replace authored checkpoint answer truth;
- mark deterministic exit checks correct;
- silently widen the English A1 curriculum.

Provider structured output is treated as untrusted data. Schema-valid output still requires product validation. Timeout, refusal, malformed output, unsupported language, or constraint failure must fall back to deterministic authored behavior.

## Evidence boundary

Guided-practice interaction turns are formative in V1. They do not directly create mastery evidence.

Authoritative learner evidence remains:

```text
authored exit-check item
-> POST /api/v1/language/attempt
-> deterministic server grader
-> FSRS result
-> attempt log
-> skill evidence
-> mastery
```

P2 consumes the P1 evidence/mastery boundary instead of inventing a second scoring path.

P2.0 now locks this mechanically:

- every blueprint target skill must be covered by one or more listed exit-check item keys;
- each listed exit item must carry authored `skills` metadata;
- the EN and VI variants of each exit item must carry the same ordered skill ids;
- the Unit 1 E2E completes the unit, syncs the stable exit cards, submits raw answers through `/api/v1/language/attempt`, and requires mastery `80` with evidence weight `1` for greeting, self-introduction and closing;
- attempt responses must not echo the raw learner answer.

## Data minimization

Do not persist raw guided-practice transcripts by default.

If session persistence is introduced in a later P2 slice, store only the minimum state required for resume/audit (blueprint/version, turn index, provider metadata, fallback flag, timestamps, and bounded derived status). Raw learner free text must not become durable history without a separately reviewed product requirement.

## Implementation phases

### P2.0 — contract, eligibility and exit evidence

**Status: implemented.**

- authored Unit 1–9 blueprint registry;
- deterministic identity/prerequisite validation;
- authenticated eligibility read model;
- explicit Unit 1–9 exit-check skill coverage;
- EN/VI skill parity regression;
- API/E2E proof of eligibility + shared P1 exit grading/mastery;
- no migration, AI provider, transcript storage, session table, or new grader.

### P2.1 — deterministic fallback state machine

**Status: next.**

- define 3–5 authored interaction turns;
- keep next-turn state owned by the practice product contract;
- make the whole scenario work with zero AI configuration;
- terminate at existing stable exit-check identities.

### P2.2 — optional AI variation adapter

- provider-neutral interface;
- strict structured response schema;
- sanitized curriculum/learner context;
- timeout/invalid/refusal -> deterministic fallback;
- no provider-specific business logic in handler/service layers.

### P2.3 — feedback and P1 evidence integration

- formative feedback stays separate from authoritative grading;
- exit check is submitted through the P1 deterministic attempt endpoint;
- mapped exit checks provide skill evidence appropriate to blueprint targets.

### P2.4 — learner-facing product integration

- entry from eligible English unit / Today repair where appropriate;
- loading/error/retry/fallback/mobile/a11y states;
- DB-backed E2E for eligibility, fallback, exit-check evidence, and no raw-answer/transcript leakage.

## Do

- Keep one curriculum authority: published authored English A1 content.
- Keep one authoritative deterministic grading path for authored answers.
- Make fallback behavior a first-class production path, not a test stub.
- Use stable blueprint/unit/item/skill identities.
- Keep EN/VI learner-facing explanation copy localizable; target English forms remain English.
- Fail closed when prerequisites or referenced curriculum identities are missing.

## Don't

- Do not ship a generic AI chat tab.
- Do not let AI decide eligibility, progress, or mastery.
- Do not duplicate checkpoint answer truth inside prompts or a new grader.
- Do not make AI availability a prerequisite for English practice.
- Do not gate practice on delayed review completion.
- Do not include Unit 0 pronunciation in text chat merely for feature parity.
- Do not persist raw transcripts by default.

## Related

- [`product-direction-v2.md`](./product-direction-v2.md)
- [`adaptive-learning-v1.md`](./adaptive-learning-v1.md)
- [`english-basics-a1-map.md`](./english-basics-a1-map.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-review-session.md`](./language-review-session.md)
- [`e2e-smoke.md`](./e2e-smoke.md)
- `openspec/changes/english-guided-practice-v1/`
