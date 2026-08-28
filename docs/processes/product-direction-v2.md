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

The shared layer progressively understands:

```text
curriculum
+ attempts / trusted learning evidence
+ progress
+ spaced-review state
+ skill mastery
+ weak skills
= next best learning action
```

### IT

```text
mental model -> predict -> run/inspect -> debug -> fix -> apply -> review
```

Executable sandboxes/graders remain authoritative where deterministic grading is possible.

### Languages

```text
input/listen -> notice -> understand -> interact -> produce -> checkpoint -> review
```

Curriculum controls which language has been introduced. AI may create bounded practice variation but never becomes curriculum or mastery authority.

## Current product freeze

Current declared curriculum scopes remain frozen except for defect fixes, semantic skill metadata, and quality regressions while adaptive/guided practice is built.

Do not add a new language, a new domain, English A2, or a new IT track merely to grow the catalog during P2.

## Product priorities

### P1 — Learning Intelligence V1

**Status: implemented within the declared V1 scope.**

Implemented:

1. stable skill ids authored against assessed items;
2. immutable skill evidence;
3. confidence-aware deterministic mastery;
4. deterministic server-graded language attempts;
5. explainable weak-skill detection;
6. adaptive Today / next-best-action composition.

P1 provides an inspectable loop from accepted learning evidence to a bounded Today plan. It is not a claim of psychometric calibration or certification-grade measurement.

### P2 — English Guided Practice V1

**Status: in progress. P2.0 implemented; P2.1 next.**

P2 is **guided scenario practice**, not generic AI chat.

```text
completed authored unit
-> eligible practice blueprint
-> deterministic fallback / optional constrained AI variation
-> bounded interaction
-> formative feedback
-> authored deterministic exit check
-> P1 server grading / FSRS / evidence / mastery
```

#### P2.0 — contract, eligibility, and exit evidence

**Status: implemented.**

- English communicative Units 1–9 have stable practice blueprints.
- Unit 0 remains audio/pronunciation-first and is excluded from text guided practice.
- Teaching lesson(s) + unit checkpoint gate eligibility; delayed review does not gate.
- Eligibility is server-derived from published curriculum + authenticated progress.
- Blueprint target skills and stable exit-check item keys are authored product truth.
- Every blueprint target skill has at least one authoritative exit-check evidence path.
- EN/VI exit-check skill mappings are required to remain identical.
- Exit checks reuse the existing deterministic P1 attempt grader; P2 adds no second grader.
- Successful Unit 1 exit checks are proven E2E to create high-confidence target-skill mastery.
- No AI provider, raw transcript persistence, new session table, or migration exists in P2.0.

#### P2.1 — deterministic fallback state machine

**Status: next.**

Build the full 3–5 turn practice flow so it works with **zero AI configuration**. The server/product contract owns the interaction state and hands off to existing stable exit checks at the end.

#### P2.2 — optional AI variation adapter

Add a provider-neutral adapter only after deterministic fallback is complete. Structured model output is untrusted and must be validated against blueprint/curriculum constraints; timeout/refusal/invalid output falls back immediately.

#### P2.3 — feedback and evidence integration

AI feedback remains formative. Authoritative grading continues through P1 deterministic exit checks and explicit evidence source/confidence rules.

#### P2.4 — learner-facing integration

Add the guided-practice surface, eligible-unit/Today entry points, loading/error/retry/fallback/mobile/a11y behavior, and final DB-backed release gates.

### P3 — Diagnostic and Skill Profile

Use the skill/evidence model to estimate a useful starting frontier and expose competence by skill rather than only completed lessons or XP.

### P4 — Speaking

Add speech evidence, pronunciation feedback, and bounded roleplay only after text practice and evidence-source confidence are mature.

### P5 — Curriculum expansion

Research the next curriculum scope only after the adaptive + guided-practice loop is product-ready. English A2 is the default first candidate; Mandarin, Japanese, and new IT tracks depend on usage and product evidence.

## AI boundary

AI sits downstream of deterministic product truth:

```text
curriculum + learner state + mistake history + allowed skills + practice blueprint
-> optional AI practice variation / formative feedback
```

AI may:

- generate controlled surface variants;
- explain a mistake differently;
- vary names/objects/scenario wording inside taught material;
- generate progressive hints;
- evaluate genuinely free-form work later with an explicit lower-confidence policy when deterministic grading is unavailable.

AI must not:

- unlock guided practice;
- widen the curriculum silently;
- choose or mutate target skill ids;
- write progress/mastery directly;
- replace authored deterministic answer truth;
- mark deterministic sandbox/exit-check failures as correct;
- publish generated curriculum without review;
- become a generic chat surface disconnected from the learning loop.

## Evidence integrity

Mastery is only as trustworthy as its evidence.

Syntaxia distinguishes evidence sources/confidence. Legacy client-decided language review signals are lower confidence; deterministic `server_graded_attempt` evidence is higher confidence.

Raw learner answer text is graded in memory and intentionally not stored or echoed. Durable history keeps correctness, response time, grader version, confidence and event identity.

P2 preserves this boundary. Guided interaction turns are formative in V1; only authored exit checks submitted to the shared P1 grader create authoritative mastery evidence.

## Product hierarchy for a signed-in learner

Returning learners follow:

```text
Today
-> due review / weak-skill repair / next lesson
-> eligible guided practice where product-relevant
-> current learning paths
-> exploration/catalog
```

Guests and signed-in learners without progress history retain the exploration-oriented learning map.

## Scope-control rules

During P2:

- no new language;
- no third domain;
- no English A2 production;
- no generic AI chatbot;
- no social/community layer;
- no marketplace;
- no large CMS rewrite;
- no microservice split;
- no deep virtual-currency/leaderboard economy.

## Architecture

Keep a modular monolith. New capabilities fit modules such as:

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
ai (optional adapter)
```

PostgreSQL remains the system of record. FSRS remains the spaced-review scheduler. Infrastructure is justified by measured product need, not architectural fashion.

P1.2 adds no recommendation table; P1.3 adds no daily-session table; P2.0 adds no practice-session table. Derived persistence is added only when resume/analytics/load requirements justify it.

## Definition of Done

A product feature is not Done merely because the happy path works. Done requires, as applicable:

- explicit bounded product intent;
- complete learner flow;
- loading/empty/error/retry behavior;
- mobile and accessibility behavior;
- security/data-integrity review;
- deterministic tests;
- persistence E2E for stored learner state;
- backward compatibility;
- synchronized product documentation;
- exact-head Product CI green.

## Current implementation checkpoint

```text
P1.0 Evidence + mastery              implemented
P1.1 Server-graded attempts          implemented
P1.2 Explainable weak-skill model    implemented
P1.3 Adaptive Today                  implemented

P2.0 Blueprint + eligibility
     + exit skill evidence            implemented
P2.1 Deterministic practice flow     next
P2.2 Optional AI variation           later
P2.3 Feedback/evidence integration   later
P2.4 Product UI/release hardening    later
```

See [`adaptive-learning-v1.md`](./adaptive-learning-v1.md), [`english-guided-practice-v1.md`](./english-guided-practice-v1.md), and [`multi-domain-roadmap.md`](./multi-domain-roadmap.md).
