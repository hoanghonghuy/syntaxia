# Syntaxia Product Direction V2

## Status

**Active product north star.**

This document supersedes roadmap decisions that treated Syntaxia primarily as a growing catalog of IT and language tracks.

## Product definition

Syntaxia is an **adaptive multi-domain learning platform** that helps a learner decide what to learn next, practice the right weakness, retain what was learned, and apply it.

The product is not defined by lesson count. One account and one learning history are shared across domains, while each domain keeps the pedagogy that fits the skill being learned.

## North-star loop

```text
Learn -> Practice -> Feedback -> Remember -> Repair -> Apply -> Progress
```

Every major feature must improve at least one part of this loop without weakening another.

## Shared learning intelligence

The platform layer progressively understands:

```text
curriculum
+ attempts / trusted learning evidence
+ progress
+ spaced-review state
+ skill mastery
+ weak skills
= next best learning action
```

Shared intelligence must not force identical lesson pedagogy across domains.

### IT

```text
mental model -> predict -> run/inspect -> debug -> fix -> apply -> review
```

Executable sandboxes/graders remain authoritative where deterministic grading is possible.

### Languages

```text
input/listen -> notice -> understand -> interact -> produce -> checkpoint -> review
```

Curriculum controls which language has been introduced. AI may later create constrained practice but does not become the curriculum source of truth.

## Current product freeze

After the home/language hardening release, current declared curriculum scopes remain frozen except for defect fixes and quality regressions while adaptive practice is built on the completed Learning Intelligence V1 foundation.

Do not add a new language, a new domain, English A2, or a new IT track merely to grow the catalog during this phase.

## Product priorities

### P1 — Learning Intelligence V1

**Status: implemented within the declared V1 scope.**

1. stable skill ids authored against assessed items — implemented;
2. immutable skill evidence — implemented;
3. deterministic learner mastery with explicit evidence confidence — implemented;
4. deterministic server-graded language attempt evidence — implemented;
5. explainable weak-skill detection — implemented;
6. adaptive daily session / next-best-action composition — implemented.

P1 completion means the product now has an inspectable loop from accepted learning evidence to a bounded Today plan. It does **not** mean mastery is psychometrically calibrated or that a general-purpose recommendation engine is complete.

### P2 — English Guided Practice V1

**Status: next.**

Curriculum-constrained text practice first. AI can vary practice and explain feedback only inside taught language and known learner state.

Voice/STT comes later, after text practice and evidence quality are reliable.

### P3 — Diagnostic and Skill Profile

Use the skill/evidence model to estimate a useful starting frontier and expose competence by skill rather than only completed lessons or XP.

### P4 — Speaking

Add speech evidence, pronunciation feedback, and bounded roleplay only after the mastery pipeline can distinguish evidence sources and confidence.

### P5 — Curriculum expansion

Research the next curriculum scope only after the adaptive loop is product-ready. English A2 is the default first candidate; Mandarin, Japanese, and new IT tracks depend on actual usage and product evidence.

## AI boundary

AI sits downstream of deterministic product truth:

```text
curriculum + learner state + mistake history + allowed skills -> AI practice/feedback
```

AI may:

- generate controlled practice variants;
- explain a mistake differently;
- create a bounded scenario from taught material;
- generate progressive hints;
- evaluate free-form work when deterministic grading is unavailable, with an explicit evidence confidence level.

AI must not:

- silently widen the curriculum;
- mark deterministic sandbox failures as correct;
- fabricate learner progress;
- publish generated curriculum without review;
- become a generic chat surface disconnected from the learning loop.

## Evidence integrity

Mastery is only as trustworthy as its evidence.

Syntaxia distinguishes at least two evidence qualities:

- compatibility `language_review` signals are authenticated/persisted but originate from a client-decided FSRS rating and carry lower confidence;
- `server_graded_attempt` evidence is generated after the server deterministically grades the raw answer against published curriculum and carries higher confidence.

For deterministic language review items, the production review UI uses the server-graded path. Raw learner answer text is graded in memory and intentionally not stored or echoed; durable history keeps correctness, response time, grader version, confidence and event identity.

P1.2 consumes those trusted primitives without inventing a black-box recommendation score. Weak-skill candidates expose mastery, evidence weight, recent deterministic mistakes, review schedule state, priority and reason codes. Recommendations are emitted only when a currently completed/published repair lesson exists inside the learner's curriculum frontier.

P1.3 then consumes P1.2 rather than reranking weakness. `GET /api/v1/learning/today` composes the first P1.2 repair candidate, due FSRS work and the next published incomplete curriculum action inside a bounded 10–30 minute budget (15 minutes by default). The Today read model is stateless and is rebuilt from current learner truth instead of persisting a second recommendation/session source of truth.

This is sufficient for Learning Intelligence V1, but it is still not a claim of psychometric calibration or certification-grade measurement. Placement/certification-like decisions need additional validation and calibrated evidence policies.

## Product hierarchy for a signed-in learner

The signed-in Home experience now follows the intended hierarchy for returning learners:

```text
Today
-> due review / weak-skill repair / next lesson
-> current learning paths
-> exploration/catalog
```

Guests and signed-in learners without progress history retain the exploration-oriented learning map rather than seeing an empty adaptive dashboard.

## Scope-control rules

During the current P2 entry phase:

- no new language;
- no third domain;
- no English A2 expansion;
- no generic AI chatbot;
- no social/community layer;
- no marketplace;
- no large CMS rewrite;
- no microservice split;
- no deep virtual-currency/leaderboard economy.

## Architecture

Keep a modular monolith. New capabilities should fit modules such as:

```text
auth
catalog
curriculum
progress
assessment
review
skills
mastery
practice
ai (later)
```

PostgreSQL remains the system of record. FSRS remains the spaced-review scheduler. New infrastructure is justified by product load/behavior, not by architectural fashion.

P1.2 intentionally adds no recommendation table. P1.3 intentionally adds no daily-session table. Both are read models over existing relational product truth. Persist a derived recommendation/cache only when measured load or a researched resume/analytics requirement justifies it.

## Definition of Done

A product feature is not Done merely because the happy-path code works.

Done requires, as applicable:

- explicit product intent;
- complete learner flow;
- loading/empty/error/retry behavior;
- mobile and accessibility behavior;
- security/data-integrity review;
- deterministic tests;
- persistence E2E for stored learner state;
- backward compatibility;
- synchronized product documentation;
- exact-head Product CI green.

## Current implementation

Learning Intelligence V1 has completed all four declared slices:

```text
P1.0
accepted learning event
-> authored skill ids
-> immutable skill evidence
-> confidence-aware learner mastery
-> authenticated mastery read API

P1.1
raw deterministic language answer
-> server grader
-> FSRS result
-> immutable attempt audit row
-> high-confidence skill evidence
-> mastery

P1.2
mastery + evidence weight
+ recent deterministic mistakes
+ review schedule
+ completed curriculum frontier
-> explicit weak-skill reasons
-> frontier-safe repair lesson

P1.3
P1.2 first repair candidate
+ due FSRS review count
+ next published incomplete lesson
+ bounded learner time budget
-> stateless Today session
-> Home review / repair / lesson actions
```

P1.3 keeps one ranking authority: P1.2 determines weakness order; the daily composer only decides how the available time budget is allocated among repair, new curriculum and due review work. A `watch`-only signal does not block progression to new content.

The next product phase is **P2 — English Guided Practice V1**: text-first, curriculum-constrained practice that consumes taught content and known learner state without turning Syntaxia into a generic chatbot.

See [`adaptive-learning-v1.md`](./adaptive-learning-v1.md) for the completed P1 contract and [`multi-domain-roadmap.md`](./multi-domain-roadmap.md) for ordered phases.
