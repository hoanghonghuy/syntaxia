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

The current direction is not catalog expansion. Learning Intelligence V1 is now complete within its declared P1.0–P1.3 scope; the next phase turns that foundation into richer curriculum-constrained guided practice.

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
- deterministic server-graded review attempts for authored answer types;
- backward-compatible curriculum continuation.

### Platform

- shared account/auth;
- Home learning map for exploration/new learners;
- returning-learner Today adaptive surface;
- cross-domain Continue/progress;
- PostgreSQL persistence;
- immutable skill evidence and confidence-weighted mastery;
- explainable weak-skill read model;
- stateless bounded daily-session composition;
- product CI with cold Go tests, `govulncheck`, production npm audit, Nuxt build, curriculum gates, and PostgreSQL-backed release E2E.

## Phase P1 — Learning Intelligence V1

**Status: implemented within the declared V1 scope.**

Source of truth: [`adaptive-learning-v1.md`](./adaptive-learning-v1.md).

### P1.0 — evidence and mastery foundation

**Status: implemented.**

```text
authored skill id
-> learning evidence
-> mastery aggregate
-> authenticated read model
```

Implemented contracts:

- evidence and mastery persistence are transactional;
- no public/client mastery-write API exists;
- skill mapping is explicit rather than inferred from prompt text;
- EN/VI assessed identities map to the same skill ids;
- PostgreSQL E2E proves evidence/mastery persistence.

### P1.1 — server-graded deterministic attempt evidence

**Status: implemented.**

Production language review supports:

```text
raw answer
-> deterministic server grader
-> correct / incorrect
-> FSRS Again / Good
-> attempt log
-> source/confidence-aware skill evidence
-> confidence-weighted mastery
```

Integrity boundaries:

- server grading uses published authored answers, not AI;
- raw learner text is not persisted or echoed;
- direct client-rating review remains only as lower-confidence backward compatibility;
- server-graded evidence is high confidence;
- review/attempt/evidence/mastery writes are one CAS-protected PostgreSQL transaction;
- deployment order is `014 -> 015 -> 016`.

### P1.2 — explainable weak-skill read model

**Status: implemented.**

Authenticated endpoint:

```http
GET /api/v1/learning/weak-skills?track=<track>&locale=<locale>&limit=5
```

The read model combines:

- mastery score;
- evidence count and accumulated evidence weight;
- deterministic incorrect attempts from the previous 14 days;
- current FSRS review schedule state;
- current completed/published curriculum frontier.

It returns a bounded list with:

- stable skill id;
- mastery and evidence weight;
- recent mistake count;
- review due/next-review state;
- `high` / `medium` / `watch` priority;
- explicit reason codes;
- a repair lesson that remains inside the current completed curriculum.

There is deliberately no ML ranking and no persisted recommendation table. Historical mastery can survive a progress reset, but P1.2 does not emit a repair candidate unless a currently completed, published lesson can support the repair.

### P1.3 — Adaptive Daily Session

**Status: implemented.**

Authenticated endpoint:

```http
GET /api/v1/learning/today?track=<track>&locale=<locale>&targetMinutes=15
```

The daily composer combines:

```text
P1.2 first weak-skill repair candidate
+ due FSRS review work
+ next published incomplete curriculum action
+ bounded time budget
-> Today plan
```

Contracts:

- default target is 15 minutes; accepted range is 10–30;
- P1.3 consumes P1.2 ordering rather than duplicating or reranking weakness rules;
- one authored answer may map to multiple skills, so candidate #1 from P1.2 is the repair source of truth;
- `high` / `medium` weakness reserves repair capacity before new content;
- a `watch`-only signal does not block new curriculum progression;
- due reviews fill the remaining bounded capacity;
- at most one repair and one next lesson are composed in V1;
- the Today session is stateless and adds no persisted recommendation/session table;
- Home keeps the exploration map for guests/no-history learners and switches returning learners to the Today surface;
- Today actions deep-link to existing review and lesson flows rather than inventing another player.

Release E2E independently proves a fresh English learner can produce deterministic Good/Again evidence, obtain the P1.2 ordered repair candidates, and receive due review + candidate #1 repair + next curriculum action inside the exact 15-minute fixture without raw-answer leakage.

## Phase P2 — English Guided Practice V1

**Status: next.**

Use English as the first guided-practice language because its A1 foundation is bounded/audited and its stable skill/evidence pipeline now feeds the complete P1 learning-intelligence loop.

Start text-first.

AI may generate a scenario/variant only from:

- taught curriculum;
- learner mastery;
- known weak skills;
- explicit allowed skill targets.

P2 must preserve deterministic grading where authored answer truth exists and must consume, not replace, the P1 mastery/weakness/review boundaries.

Do not ship a generic chatbot disconnected from curriculum/progress.

## Phase P3 — Diagnostic and Skill Profile

Only after evidence/mastery quality is reliable in real learner use:

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

Curriculum expansion resumes only after the adaptive/guided-practice loop is product-ready.

Default research order:

1. English A2 candidate map;
2. Mandarin/Japanese continuation based on learner usage;
3. new IT track based on real demand.

No expansion is automatic merely because a public syllabus exists.

## Frozen during P2 entry

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

A green earlier head is only an implementation checkpoint. The PR is review-ready only when the final head after the last code/test/documentation change passes canonical Product CI.

## Related

- [`product-direction-v2.md`](./product-direction-v2.md)
- [`adaptive-learning-v1.md`](./adaptive-learning-v1.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
