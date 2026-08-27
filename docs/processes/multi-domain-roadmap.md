# Multi-domain product roadmap

## Status

**Active roadmap for Syntaxia V2.**

The old MVP-era roadmap that treated FSRS, English/Japanese, and broader language capability as future/deferred work has been retired. Current product direction lives in [`product-direction-v2.md`](./product-direction-v2.md).

## North star

Syntaxia is one product with shared learner state and domain-specific pedagogy:

```text
Syntaxia
├── shared: curriculum / progress / review / skills / mastery / next action
├── IT: mental model -> predict -> execute -> debug -> apply -> review
└── Languages: input -> notice -> interact -> produce -> checkpoint -> review
```

The next phase is not catalog expansion. It is turning existing curriculum, progress, sandboxes, assessments, and FSRS into an adaptive learning loop.

## Current shipped foundation

### IT

- SQL Fundamentals;
- PostgreSQL;
- JavaScript Basics;
- HTML Basics;
- CSS Basics;
- deterministic SQL/JS/HTML-CSS sandbox grading;
- progress, notes, search, track/domain navigation.

### Languages

- Mandarin practical Level 1 foundation;
- English bounded CEFR A1 foundation;
- Japanese practical N5 foundation;
- optional Chinese IT specialty;
- Language V3 guided player;
- stable assessed identities;
- semantic visuals/audio;
- checkpoint/review units;
- persistent FSRS review state and logs;
- backward-compatible curriculum continuation.

### Platform

- shared account/auth;
- Home learning map;
- cross-domain Continue/progress;
- PostgreSQL persistence;
- product CI with cold Go tests, `govulncheck`, production npm audit, Nuxt build, curriculum gates, and PostgreSQL-backed release E2E.

## Phase P1 — Learning Intelligence V1

**Status: active.**

Source of truth: [`adaptive-learning-v1.md`](./adaptive-learning-v1.md).

### P1.0 — evidence and mastery foundation

```text
authored skill id
-> learning evidence
-> mastery aggregate
-> authenticated read model
```

Initial vertical uses persisted language reviews and English skill metadata.

Done when:

- evidence and mastery persistence are transactional;
- no public/client mastery-write API exists;
- skill mapping is explicit rather than inferred from prompt text;
- EN/VI assessed identities map to the same skill ids;
- exact-head Product CI proves PostgreSQL persistence.

### P1.1 — server-graded attempt evidence

Add higher-confidence evidence for deterministic authored exercises.

The server should persist the attempt/result used for mastery, rather than relying only on a client-submitted review rating.

Done when evidence source/confidence can distinguish at least:

- server-graded deterministic attempt;
- review-performance signal;
- future AI/free-form evidence.

### P1.2 — weak-skill read model

Combine:

- mastery score;
- evidence count/confidence;
- recent mistakes;
- due review state;
- current curriculum frontier.

Return a small, explainable list of repair candidates rather than an opaque recommendation score.

### P1.3 — Adaptive Daily Session

Compose a session from:

```text
due review
+ weak-skill repair
+ next curriculum action
```

Signed-in Home should evolve toward:

```text
Today
-> Repair / Review
-> Current paths
-> Explore
```

## Phase P2 — English Guided Practice V1

Use English as the first guided-practice language because its A1 foundation is now bounded and audited.

Start text-first.

AI may generate a scenario/variant only from:

- taught curriculum;
- learner mastery;
- known weak skills;
- explicit allowed skill targets.

Do not ship a generic chatbot disconnected from curriculum/progress.

## Phase P3 — Diagnostic and Skill Profile

Only after evidence/mastery quality is reliable:

- short entry diagnostic;
- recommended curriculum frontier;
- skill-level profile;
- transparent reasons for repair recommendations.

This phase must not fabricate completion for skipped earlier lessons.

## Phase P4 — Speaking

Add speech evidence after text practice and mastery-source confidence are mature:

- STT;
- pronunciation evidence;
- bounded roleplay;
- speech-specific repair.

## Phase P5 — Curriculum expansion

Curriculum expansion resumes only after the adaptive loop is production-ready.

Default research order:

1. English A2 candidate map;
2. Mandarin/Japanese continuation based on learner usage;
3. new IT track based on real demand.

No expansion is automatic merely because a public syllabus exists.

## Frozen during P1

Do not prioritize:

- new languages;
- third learning domain;
- English A2 content production;
- generic AI chat;
- social/community;
- marketplace;
- large CMS rewrite;
- microservices;
- deep leaderboard/currency economy.

## Decision rule

A proposed feature should answer:

> Which part of Learn -> Practice -> Feedback -> Remember -> Repair -> Apply -> Progress does this improve?

If it cannot answer that clearly, it is not a current roadmap priority.

## Quality gate

Every phase preserves the existing release bar:

- product intent and bounded scope;
- backward compatibility;
- mobile/a11y/error/retry behavior where relevant;
- security/data-integrity review;
- deterministic regression tests;
- DB-backed E2E for learner state;
- synchronized source-of-truth docs;
- exact-head Product CI green.

## Related

- [`product-direction-v2.md`](./product-direction-v2.md)
- [`adaptive-learning-v1.md`](./adaptive-learning-v1.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
