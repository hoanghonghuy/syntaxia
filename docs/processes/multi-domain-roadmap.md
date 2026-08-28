# Multi-domain product roadmap

## Status

**Active roadmap for Syntaxia V2.**

Current product direction lives in [`product-direction-v2.md`](./product-direction-v2.md). The MVP-era sequencing that treated FSRS, English/Japanese, and broader language capability as future work is retired.

## North star

```text
Syntaxia
├── shared: curriculum / progress / review / skills / mastery / next action
├── IT: mental model -> predict -> execute -> debug -> apply -> review
└── Languages: input -> notice -> interact -> produce -> checkpoint -> review
```

The roadmap is intentionally depth-first. Do not grow catalog breadth while the shared learning loop is still being completed.

## Current shipped foundation

### IT

- SQL Fundamentals;
- PostgreSQL;
- JavaScript Basics;
- HTML Basics;
- CSS Basics;
- deterministic SQL/JS/HTML-CSS grading;
- progress, notes, search and track/domain navigation.

### Languages

- Mandarin practical Level 1 foundation;
- English bounded CEFR A1 foundation;
- Japanese practical N5 foundation;
- optional Chinese IT specialty;
- Language V3 guided player;
- stable assessed identities;
- semantic visuals/audio;
- checkpoint/review units;
- persistent FSRS state/logs;
- deterministic server-graded authored attempts;
- backward-compatible curriculum continuation.

### Shared platform

- auth/account;
- Home exploration map for guests/new learners;
- returning-learner adaptive Today surface;
- cross-domain Continue/progress;
- PostgreSQL persistence;
- immutable skill evidence + confidence-aware mastery;
- explainable weak-skill model;
- bounded stateless Today composition;
- canonical Product CI with cold Go tests, `govulncheck`, production npm audit, Nuxt build, curriculum gates and PostgreSQL-backed E2E.

## Phase P1 — Learning Intelligence V1

**Status: implemented within the declared V1 scope.**

Source of truth: [`adaptive-learning-v1.md`](./adaptive-learning-v1.md).

### P1.0 — evidence and mastery

**Implemented.** Stable authored skill ids → immutable evidence → confidence-aware mastery → authenticated read model.

### P1.1 — server-graded deterministic attempts

**Implemented.** Raw authored answers are graded on the server, mapped to FSRS, persisted transactionally with attempt/evidence/mastery state, and raw text is not persisted or echoed.

### P1.2 — explainable weak-skill model

**Implemented.** Mastery + evidence weight + 14-day deterministic mistakes + review schedule + current completed/published frontier → explicit `high` / `medium` / `watch` candidates with reason codes and frontier-safe repair lesson.

### P1.3 — Adaptive Daily Session

**Implemented.** P1.2 candidate #1 + due review + next incomplete published lesson + 10–30 minute budget → stateless Today plan. P1.3 composes P1.2 and does not rerank weakness.

## Phase P2 — English Guided Practice V1

**Status: in progress. P2.0 implemented; P2.1 next.**

Source of truth: [`english-guided-practice-v1.md`](./english-guided-practice-v1.md).

P2 uses English first because the bounded A1 curriculum and P1 evidence pipeline are already audited. P2 is guided scenario practice, not generic AI chat.

### P2.0 — blueprint, eligibility and authoritative exit evidence

**Status: implemented.**

Contracts now locked:

- exactly 9 authored blueprints for English communicative Units 1–9;
- Unit 0 stays audio/pronunciation-first and is excluded from text guided practice;
- teaching lesson(s) + checkpoint gate a unit; delayed `*-review` never gates;
- authenticated eligibility derives from current published curriculum + learner progress;
- missing/unpublished prerequisites fail closed;
- stable target skill ids and stable exit-check item keys are server-authored product truth;
- every target skill has at least one authored authoritative exit-check evidence path;
- EN/VI exit-check skill mappings must remain identical;
- P2 has no second grader: exit checks reuse `POST /api/v1/language/attempt`;
- Unit 1 E2E proves correct exit checks persist high-confidence mastery for greeting, self-introduction and closing;
- no AI provider, transcript persistence, practice-session table or migration is introduced in P2.0.

### P2.1 — deterministic fallback state machine

**Status: next.**

Build a complete 3–5 turn scenario flow that works with zero AI configuration:

```text
eligible blueprint
-> authored turn 1
-> learner response
-> deterministic transition
-> authored turn 2 ...
-> exit-check handoff
```

The state machine owns interaction sequencing, not grading or mastery. It must terminate at existing stable exit-check identities.

### P2.2 — optional AI variation adapter

Only after fallback is complete:

- provider-neutral interface;
- strict structured response contract;
- sanitized curriculum/learner context;
- explicit separation of trusted instructions and untrusted learner text;
- timeout/refusal/malformed/out-of-contract output → deterministic fallback;
- no provider-specific business logic in handlers/repositories.

### P2.3 — formative feedback + shared evidence boundary

- AI feedback remains formative;
- authoritative exit grading stays in P1;
- evidence source/confidence remains explicit;
- no AI-written mastery/progress.

### P2.4 — learner-facing integration and release hardening

- practice surface;
- eligible unit + Today repair entry points where appropriate;
- loading/error/retry/fallback/mobile/a11y;
- DB-backed E2E and exact-head release evidence.

## Phase P3 — Diagnostic and Skill Profile

After evidence/mastery quality has real-use validation:

- short entry diagnostic;
- recommended frontier;
- skill profile;
- transparent repair rationale.

Do not fabricate completion for skipped earlier lessons.

## Phase P4 — Speaking

After text guided practice is stable:

- STT;
- pronunciation evidence;
- bounded voice roleplay;
- speech-specific repair and confidence policy.

## Phase P5 — Curriculum expansion

Only after adaptive + guided-practice loops are product-ready. Default research order:

1. English A2 candidate map;
2. Mandarin/Japanese continuation based on usage;
3. new IT track based on real demand.

## Frozen during P2

Do not prioritize:

- new languages;
- third learning domain;
- English A2 production;
- generic AI chat;
- social/community;
- marketplace;
- large CMS rewrite;
- microservices;
- deep leaderboard/currency economy.

## Decision rule

A proposed feature must answer:

> Which part of Learn -> Practice -> Feedback -> Remember -> Repair -> Apply -> Progress does this improve?

If it cannot answer that clearly, it is not a current roadmap priority.

## Quality gate

Every phase preserves:

- bounded product intent;
- backward compatibility;
- mobile/a11y/error/retry behavior where relevant;
- security/data-integrity review;
- deterministic regression tests;
- DB-backed E2E for learner state;
- synchronized source-of-truth docs;
- exact-head Product CI green.

A green earlier head is only an implementation checkpoint. A PR is review-ready only when the final head after the last code/test/docs change passes canonical Product CI.

## Current checkpoint

```text
P1.0  Evidence + mastery                 complete
P1.1  Server-graded attempts             complete
P1.2  Explainable weak skills            complete
P1.3  Adaptive Today                     complete
P2.0  Practice blueprint/eligibility
      + authoritative exit evidence      complete
P2.1  Deterministic fallback flow        next
P2.2  Optional AI variation              later
P2.3  Feedback/evidence integration      later
P2.4  Product integration/release        later
P3+   Diagnostic / Speaking / Expansion  later
```

## Related

- [`product-direction-v2.md`](./product-direction-v2.md)
- [`adaptive-learning-v1.md`](./adaptive-learning-v1.md)
- [`english-guided-practice-v1.md`](./english-guided-practice-v1.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
