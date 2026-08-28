# Adaptive Learning V1

## Purpose

Build the first shared learning-intelligence layer on top of existing curriculum, progress, deterministic graders, and FSRS review persistence.

The V1 objective is not a complete recommendation engine. It is to establish trustworthy, inspectable primitives that later power weak-skill repair and daily learning sessions.

## Implemented verticals

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

The review UI uses P1.1 for production language-review attempts. The older client-rating review endpoint remains available for backward compatibility and is explicitly treated as lower-confidence evidence.

## Security and integrity boundary

There is **no client mastery-write endpoint**.

For the authoritative P1.1 path:

- the client sends a raw answer to `POST /api/v1/language/attempt`;
- the server verifies authenticated ownership, lesson completion, published curriculum identity, stable item identity and response-time bounds;
- the server grades against the published authored answer/accepted answers;
- the client does not choose the persisted correctness rating;
- FSRS card CAS, review log, attempt log, skill evidence and mastery update commit in one PostgreSQL transaction;
- a failed CAS writes none of those rows.

### Data minimization

Raw learner submissions are graded in memory and intentionally **not persisted** and **not echoed in the response**.

Durable attempt history stores only the information needed for learning-state reconstruction and audit:

- item identity;
- correct / incorrect;
- response time;
- grader version;
- evidence confidence;
- timestamp;
- linkage to the exact review log.

### Legacy compatibility evidence

`POST /api/v1/language/review` still accepts an FSRS rating for backward compatibility. It validates ownership, lesson/item identity, rating range and CAS concurrency, but correctness was decided upstream by the client.

Therefore evidence sources are explicit:

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

`evidence_count` still counts accepted observations. `evidence_weight` records how much confidence mass has contributed to the current score.

Why this remains intentionally simple:

- deterministic and inspectable;
- safe under one atomic PostgreSQL upsert;
- lets high-confidence server grading outweigh compatibility review signals without inventing an opaque model;
- can be rebuilt from immutable evidence history.

A later version may add recency or domain-specific calibration after real learner data exists.

## Persistence

### Migration `015_adaptive_skill_mastery.sql`

Introduced:

- `skill_evidence`;
- `learner_skill_mastery`.

### Migration `016_server_graded_language_attempts.sql`

Introduces:

- `language_attempt_logs`;
- `skill_evidence.attempt_log_id`;
- explicit evidence confidence;
- explicit `server_graded_attempt` source;
- `learner_skill_mastery.evidence_weight`.

Deployment order is:

```text
014_language_review_fsrs.sql
-> 015_adaptive_skill_mastery.sql
-> 016_server_graded_language_attempts.sql
```

That order is locked in Product CI, Docker local bootstrap and the Neon migration script.

### `language_attempt_logs`

One row is linked one-to-one to the accepted `language_review_logs.id` for a server-graded attempt.

Important fields:

- user / track / lesson / locale / stable item key;
- correct boolean;
- response time;
- grader version;
- confidence;
- graded timestamp.

There is deliberately no raw-submission column.

### `skill_evidence`

Append-only learner observations linked to the exact accepted review event, and to the attempt log for server-graded evidence.

Important fields:

- user / track / lesson / locale;
- stable item key;
- stable skill id;
- source;
- rating;
- observation score;
- confidence;
- observed time.

`UNIQUE(review_log_id, skill_id)` prevents duplicate skill evidence for one accepted event.

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

If any step fails, the transaction rolls back.

If the CAS affects zero rows, the function returns a conflict before inserting review/attempt/evidence/mastery rows.

## APIs

### Authoritative deterministic attempt

```http
POST /api/v1/language/attempt
Content-Type: application/json

{
  "lessonId": "en-a1-u00-sound-spelling",
  "locale": "en",
  "itemKey": "en-fnd-sound-hear-meet",
  "submission": "Meet!",
  "responseMs": 1000
}
```

Example response shape:

```json
{
  "correct": true,
  "rating": 3,
  "confidence": 1,
  "card": {
    "trackId": "english-basics",
    "lessonId": "en-a1-u00-sound-spelling",
    "locale": "en",
    "itemKey": "en-fnd-sound-hear-meet"
  }
}
```

The raw submission is not returned.

### Mastery read model

```http
GET /api/v1/learning/mastery?track=english-basics&locale=en
```

Response rows are ordered weakest-first, then by skill id.

Example shape:

```json
[
  {
    "trackId": "english-basics",
    "locale": "en",
    "skillId": "en.sound.spelling",
    "score": 80,
    "evidenceCount": 1,
    "evidenceWeight": 1,
    "lastEvidenceAt": "..."
  }
]
```

No POST/PATCH mastery endpoint exists.

## Initial pilots

### English foundation

`en-fnd-sound-hear-meet` and related `sound-spelling` assessments author:

- `en.sound.spelling`;
- `en.listening.word-recognition`.

Release E2E submits raw `Meet!`, requires server grading to normalize it as correct, then requires both skills to persist with score 80 and evidence weight 1.

### English Unit 9 — possessions

The `possessions` lesson validates a more semantic skill split:

- `en.grammar.possession`;
- `en.grammar.do-question`;
- `en.communication.possession`;
- `en.listening.possession`;
- `en.production.possession`.

The existing question/answer identities remain unchanged; only skill metadata is added.

## Verification

Required gates now include:

- unit tests for rating mapping;
- unit tests for practice/checkpoint skill extraction and deduplication;
- unit test proving missing skill metadata is not inferred;
- deterministic server-grader tests for normalization, accepted/wrong answers and pair canonicalization;
- Go module/checksum + `govulncheck` + cold tests + vet;
- production npm audit, Nuxt build, product flow, Language V3 and i18n gates;
- release DB initialization applies `014 -> 015 -> 016`;
- language E2E submits a raw English answer through `/api/v1/language/attempt`;
- E2E proves the response does not echo the raw answer;
- E2E requires confidence-1 server-graded skill evidence and mastery;
- release DB assertion requires persisted `language_attempt_logs`, `skill_evidence` and `learner_skill_mastery` rows.

## Next slices

### P1.2 — weak-skill read model

Combine:

- mastery score;
- evidence count and evidence weight;
- recent deterministic mistakes;
- due review state;
- current curriculum frontier.

Return a small, explainable list of repair candidates rather than an opaque recommendation score.

### P1.3 — Adaptive Daily Session

Compose a bounded session from:

```text
due reviews + weak-skill repair + next curriculum action
```

The first UI should answer one question well:

> What should I learn today?

## Non-goals

Adaptive V1 does not add:

- AI chat;
- new curriculum levels;
- placement testing;
- speech grading;
- leaderboards/economy;
- microservices;
- an opaque ML mastery model.

Those depend on the evidence/mastery foundation proving reliable first.
