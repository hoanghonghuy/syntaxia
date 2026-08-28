# Adaptive Learning V1

## Purpose

Build the first shared learning-intelligence layer on top of existing curriculum, progress, deterministic graders, and FSRS review persistence.

Learning Intelligence V1 is complete within the declared **P1.0–P1.3** scope. This is not a claim that Syntaxia has a complete recommendation engine or that every future adaptive-learning problem is solved. V1 establishes trustworthy, inspectable primitives and a bounded learner-facing daily plan without introducing opaque scoring or a second source of learning truth.

## Status

| Slice | Status | Product result |
|---|---|---|
| P1.0 — evidence and mastery foundation | implemented | immutable skill evidence + confidence-weighted mastery read model |
| P1.1 — deterministic server-graded attempts | implemented | raw answer is graded authoritatively on the server and committed with FSRS/evidence/mastery |
| P1.2 — explainable weak-skill read model | implemented | bounded repair candidates with explicit reasons and curriculum-frontier safety |
| P1.3 — Adaptive Daily Session | implemented | bounded `Today` plan composed from due review + P1.2 repair + next curriculum action |

The next product phase is **P2 — English Guided Practice V1**. P2 may consume these primitives, but it must not replace or silently fork their source-of-truth rules.

## Implemented learning loop

```text
published authored assessment
-> deterministic server-graded attempt
-> FSRS Again / Good
-> immutable attempt + skill evidence
-> confidence-weighted mastery
-> explainable weak-skill candidates
-> bounded Today session
-> review / repair / next curriculum action
```

### P1.0 — evidence and mastery foundation

```text
accepted language review
-> resolve authored skills for itemKey
-> convert review rating to deterministic observation
-> append immutable evidence
-> update current skill mastery
-> expose authenticated mastery read model
```

### P1.1 — deterministic server-graded attempts

```text
raw language submission
-> deterministic server grader
-> correct / incorrect
-> FSRS Again / Good
-> immutable attempt log
-> high-confidence skill evidence
-> confidence-weighted mastery
```

The review UI uses P1.1 for production language-review attempts. The older client-rating review endpoint remains available for backward compatibility and is explicitly lower-confidence evidence.

### P1.2 — explainable weak-skill read model

```text
mastery
+ evidence weight
+ recent deterministic mistakes
+ review schedule state
+ completed curriculum frontier
-> bounded repair candidates with explicit reasons
```

P1.2 persists no recommendation table and calculates no opaque recommendation score. It derives a rebuildable read model from existing PostgreSQL product truth.

### P1.3 — Adaptive Daily Session

```text
P1.2 weak-skill candidates
+ due FSRS review count
+ next published incomplete lesson
+ learner time budget
-> bounded Today plan
```

P1.3 is deliberately **stateless**. A Today plan is rebuilt from current learner truth each time it is requested, so a completed review, newly finished lesson, or changed mastery state cannot leave a persisted stale session behind.

The server owns composition. The Home UI renders the returned plan and owns localization/presentation only.

## Security and integrity boundary

There is **no client mastery-write endpoint**, no client weak-skill-write endpoint, and no client daily-session-write endpoint.

For the authoritative P1.1 path:

- the client sends a raw answer to `POST /api/v1/language/attempt`;
- the server verifies authenticated ownership, lesson completion, published curriculum identity, stable item identity and response-time bounds;
- the server grades against the published authored answer/accepted answers;
- the client does not choose the persisted correctness rating;
- FSRS card CAS, review log, attempt log, skill evidence and mastery update commit in one PostgreSQL transaction;
- a failed CAS writes none of those rows.

P1.2 and P1.3 are authenticated read models. They read learner-owned progress, review, attempt, evidence and mastery rows under the authenticated user id. P1.3 never accepts a client-supplied weakness score or repair target.

### Data minimization

Raw learner submissions are graded in memory and intentionally **not persisted** and **not echoed in responses**.

Durable attempt history stores only the information needed for learning-state reconstruction and audit:

- item identity;
- correct / incorrect;
- response time;
- grader version;
- evidence confidence;
- timestamp;
- linkage to the exact review log.

P1.2 and P1.3 therefore reason from correctness, timestamps, review state and authored skill identity without needing raw answer text.

### Legacy compatibility evidence

`POST /api/v1/language/review` still accepts an FSRS rating for backward compatibility. It validates ownership, lesson/item identity, rating range and CAS concurrency, but correctness was decided upstream by the client.

Therefore evidence sources remain explicit:

| Source | Confidence | Meaning |
|---|---:|---|
| `language_review` | 0.5 | authenticated persisted client-rating performance signal |
| `server_graded_attempt` | 1.0 | deterministic answer graded by the server |

These confidence values are product heuristics, not psychometric probabilities.

## Deterministic language grader

P1.1 uses authored assessment truth only. It does not use AI.

Normalization contract:

- Unicode NFKC normalization;
- trim and collapse whitespace for all language tracks;
- English additionally ignores case and terminal `.`, `!`, `?` punctuation;
- authored `acceptedAnswers` are honored;
- `match_pairs` answers are canonicalized so pair ordering does not change correctness.

A published review item without deterministic authored answer truth is rejected by the authoritative attempt endpoint rather than silently guessed.

## Skill authoring

Skills are stable strings authored on assessed items:

```yaml
- type: practice
  id: en-u09-have-context
  skills: ["en.grammar.possession", "en.communication.possession"]
```

Rules:

- EN/VI versions of the same assessed item use the same skill ids;
- skill ids describe reusable capability, not a lesson file name;
- no skill is inferred from prompt text;
- duplicate/blank ids are removed by the parser helper;
- an assessed item without `skills` continues to review normally but creates no mastery evidence.

A separate `skill_definitions` database table remains deferred until naming is validated across at least one language pilot and one IT pilot.

## Observation score

V1 maps the FSRS outcome used by the accepted learning event to an explainable 0–100 observation:

| Rating | Observation |
|---|---:|
| Again | 20 |
| Hard | 50 |
| Good | 80 |
| Easy | 100 |

For P1.1 deterministic attempts:

- incorrect -> `Again` -> 20;
- correct -> `Good` -> 80.

The server does not currently award `Hard` or `Easy` from a raw deterministic attempt because those are self-assessment nuances, not correctness outcomes.

## Mastery aggregate

For each `(user, track, locale, skill)` V1 stores:

- current score;
- evidence count;
- accumulated evidence weight;
- time of latest evidence.

The score is the confidence-weighted running mean:

```text
new_score =
  (old_score * old_weight + observation * evidence_confidence)
  / (old_weight + evidence_confidence)
```

`evidence_count` counts accepted observations. `evidence_weight` records how much confidence mass has contributed to the current score.

Why this remains intentionally simple:

- deterministic and inspectable;
- safe under one atomic PostgreSQL upsert;
- lets high-confidence server grading outweigh compatibility review signals without inventing an opaque model;
- can be rebuilt from immutable evidence history.

A later version may add recency or domain-specific calibration after real learner data exists.

## P1.2 weak-skill contract

### Candidate eligibility

A skill is considered for repair when:

- mastery is below `80`; or
- there is at least one deterministic incorrect attempt in the recent window.

A skill with mastery `>= 80` and no recent deterministic mistake is not emitted merely because its FSRS review is due. Due review remains separate work that P1.3 composes independently.

A candidate is emitted only when its evidence resolves to a **currently completed, published repair lesson**. Historical mastery survives a progress reset, but repair recommendations do not escape the learner's current curriculum frontier.

### Recent window

P1.2 uses the previous **14 days** for deterministic mistake recency. The API returns `recentWindowDays` so this policy is visible rather than hidden.

### Priority classes

There is no numeric recommendation score.

Priority is deterministic:

- `high`: recent deterministic mistake, or mastery `< 60` with evidence weight `>= 1`;
- `medium`: mastery `< 80` with evidence weight `>= 1`;
- `watch`: weak mastery supported only by limited evidence weight `< 1`.

Within a priority class, candidates sort by:

1. lower mastery;
2. more recent-window mistakes;
3. review due before not-due;
4. greater evidence weight;
5. stable skill id.

### Reason codes

P1.2 returns explicit machine-readable reasons:

- `recent_incorrect_attempt`;
- `mastery_below_60`;
- `mastery_below_80`;
- `review_due`;
- `limited_evidence`.

The UI localizes these reason codes without changing learning-state logic.

### Curriculum frontier

`frontier` is the furthest completed, published lesson by `sort_order` for the requested track/locale.

`repairLesson` is the most recently observed completed/published lesson for that skill. If no currently valid repair lesson exists, the historical skill is not emitted as a P1.2 candidate.

## P1.3 daily-session contract

### Endpoint

```http
GET /api/v1/learning/today?track=english-basics&locale=en&targetMinutes=15
```

`track` and `locale` are required. `targetMinutes` defaults to **15** and must be between **10 and 30** inclusive.

The response contains product facts rather than localized prose:

- requested track/locale and `asOf`;
- target and estimated minutes;
- total due-review count;
- weak-skill candidate count used by the composer;
- ordered actions of type `review`, `repair`, or `lesson`.

### Composition rules

V1 uses transparent fixed estimates:

| Action | Estimate |
|---|---:|
| one due review card | 1 minute |
| one repair action | 4 minutes |
| one next lesson | 7 minutes |

Composition is bounded and deterministic:

1. fetch P1.2 with a bounded candidate set;
2. use the **first P1.2 candidate** as the possible repair target — P1.3 does not rerank weakness;
3. if that candidate is `high` or `medium`, reserve repair budget before reserving new content;
4. a `watch` candidate does not block curriculum progression;
5. reserve the next published incomplete curriculum lesson when it fits;
6. fill remaining budget with due FSRS review cards;
7. return actions in learner-facing order: review, repair, then next lesson, omitting any action that does not fit.

The due-review count in the response is the current total due count; the review action's `reviewCount` is the bounded number scheduled into this Today plan.

The composer currently chooses at most one repair target and one next lesson. Broad optimization across many repairs is deliberately deferred until real learner behavior justifies additional complexity.

### Next curriculum action

The next lesson is the first published lesson in track/locale order that is not currently completed. It is derived from curriculum/progress truth rather than generated by the adaptive layer.

### Home behavior

`HomeLearningMap` remains the exploration surface for guests and signed-in learners without progress history.

For a signed-in returning learner with real progress, the same hero area switches to `HomeTodaySession` instead of creating a second dashboard. The current track follows existing Continue/resume semantics; Today then requests the server-composed plan for that track.

The Today surface provides loading, recoverable failure/retry, caught-up state, mobile layout and reduced-motion behavior. Actions deep-link to the existing review or lesson flows; P1.3 does not invent another learning player.

## Persistence

### Migration `015_adaptive_skill_mastery.sql`

Introduced:

- `skill_evidence`;
- `learner_skill_mastery`.

### Migration `016_server_graded_language_attempts.sql`

Introduced:

- `language_attempt_logs`;
- `skill_evidence.attempt_log_id`;
- explicit evidence confidence;
- explicit `server_graded_attempt` source;
- `learner_skill_mastery.evidence_weight`.

Deployment order remains:

```text
014_language_review_fsrs.sql
-> 015_adaptive_skill_mastery.sql
-> 016_server_graded_language_attempts.sql
```

That order is locked in Product CI, Docker local bootstrap and the Neon migration script.

P1.2 and P1.3 add **no migration**. Both are rebuildable read models over existing product truth.

### `language_attempt_logs`

One row is linked one-to-one to the accepted `language_review_logs.id` for a server-graded attempt. There is deliberately no raw-submission column.

### `skill_evidence`

Append-only learner observations link the exact accepted review event to stable authored skill ids. `UNIQUE(review_log_id, skill_id)` prevents duplicate skill evidence for one accepted event.

### `learner_skill_mastery`

Current aggregate keyed by:

```text
user_id + track_id + locale + skill_id
```

This table is a rebuildable read model. Immutable evidence is the history.

## Transaction contract

`SaveLanguageReviewCAS` performs, in one PostgreSQL transaction:

1. compare-and-swap the FSRS card;
2. append the review log and obtain its id;
3. optionally append the authoritative server-graded attempt log;
4. append authored skill evidence with source/confidence;
5. upsert confidence-weighted mastery aggregates;
6. commit.

If any step fails, the transaction rolls back. If the CAS affects zero rows, the function returns a conflict before inserting review/attempt/evidence/mastery rows.

P1.2 and P1.3 perform no writes.

## APIs

### Authoritative deterministic attempt

```http
POST /api/v1/language/attempt
```

The response returns correctness, mapped FSRS rating/confidence and the committed card. The raw submission is not returned.

### Mastery read model

```http
GET /api/v1/learning/mastery?track=english-basics&locale=en
```

Rows are ordered weakest-first, then by skill id.

### Weak-skill read model

```http
GET /api/v1/learning/weak-skills?track=english-basics&locale=en&limit=5
```

`limit` defaults to 5 and is capped at 20. There is intentionally no POST/PATCH mastery or weak-skill endpoint.

### Today session

```http
GET /api/v1/learning/today?track=english-basics&locale=en&targetMinutes=15
```

There is intentionally no session-create/update endpoint in V1.

## Initial pilots

### English foundation

`en-fnd-sound-hear-meet` and related `sound-spelling` assessments author:

- `en.sound.spelling`;
- `en.listening.word-recognition`.

A single answer can therefore produce multiple equally weak candidates. P1.2's deterministic ordering is the source of truth; P1.3 consumes candidate #1 instead of hard-coding or reranking one authored skill.

Release E2E submits a correct answer and then a deterministic wrong answer, requires the authored skills to become explainable high-priority candidates, and then requires Today to consume P1.2's first candidate while also retaining due review and next curriculum work inside the 15-minute budget.

### English Unit 9 — possessions

The `possessions` lesson validates a more semantic skill split:

- `en.grammar.possession`;
- `en.grammar.do-question`;
- `en.communication.possession`;
- `en.listening.possession`;
- `en.production.possession`.

Existing question/answer identities remain unchanged; only stable skill metadata is added.

## Verification

Required canonical gates include:

- unit tests for rating mapping;
- unit tests for practice/checkpoint skill extraction and deduplication;
- deterministic server-grader tests for normalization, accepted/wrong answers and pair canonicalization;
- weak-skill rule tests for filtering, ordering, priority, due state, limited evidence, result cap and frontier-safe repair;
- daily-session unit tests for bounded composition, repair/new-content precedence, watch-only behavior and empty/budget boundaries;
- Go module/checksum + `govulncheck` + cold tests + vet;
- production npm audit, Nuxt build, product-flow, Language V3 and i18n gates;
- release DB initialization applies `014 -> 015 -> 016`;
- language E2E submits both correct and incorrect deterministic English attempts and validates mastery/P1.2 state;
- `scripts/e2e-adaptive-today.ps1` independently proves P1.2 -> Today composition using a fresh learner;
- Adaptive Today E2E requires due review + P1.2 first repair candidate + next curriculum action inside an exact 15-minute plan;
- Adaptive Today E2E rejects raw-submission leakage;
- release DB assertions continue to require persisted `language_attempt_logs`, `skill_evidence` and `learner_skill_mastery` rows.

A later commit is not considered release evidence merely because an earlier head was green. The final PR candidate must pass canonical Product CI on its exact final head.

## Next phase

### P2 — English Guided Practice V1

P2 is the next implementation phase after the P1 learning-intelligence loop. It should build richer guided English practice on top of authored curriculum and the completed P1 primitives, while preserving:

- deterministic grading for authoritative assessed answers;
- stable authored skill ids;
- P1.2 as the weakness-ranking source of truth;
- FSRS as review scheduling truth;
- P1.3 as the bounded daily composition boundary unless a researched successor explicitly replaces it.

P2 scope must be researched and locked separately before widening English content or interaction contracts.

## Non-goals

Learning Intelligence V1 does not add:

- AI chat;
- new curriculum levels;
- placement testing;
- speech grading;
- leaderboards/economy;
- microservices;
- an opaque ML mastery model;
- persisted daily-session state;
- a claim of psychometric mastery validity.

Those remain separate product decisions after the evidence/mastery/session foundation proves reliable with real learner use.
