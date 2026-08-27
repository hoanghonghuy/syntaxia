# Adaptive Learning V1

## Purpose

Build the first shared learning-intelligence layer on top of existing curriculum, progress, deterministic graders, and FSRS review persistence.

The V1 objective is not a complete recommendation engine. It is to establish trustworthy, inspectable primitives that later power weak-skill repair and daily learning sessions.

## First vertical

```text
language review accepted by existing validation + CAS
-> resolve authored skills for itemKey
-> convert review rating to deterministic observation
-> append immutable evidence
-> update current skill mastery
-> expose authenticated mastery read model
```

## Security and integrity boundary

There is **no client mastery-write endpoint**.

The only V1 evidence source is an accepted persisted language review. A failed CAS writes no review log, evidence, or mastery update.

V1 review ratings are client-submitted signals validated for ownership, lesson completion, published curriculum identity, item identity, range, and concurrency. They are not anti-cheat raw-answer grading. Server-graded attempt evidence is a required later hardening before mastery is used for high-stakes decisions.

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

A separate `skill_definitions` database table is deferred until naming is validated across at least one language pilot and one IT pilot.

## Observation score

V1 maps existing FSRS rating to an explainable 0–100 observation:

| Rating | Observation |
|---|---:|
| Again | 20 |
| Hard | 50 |
| Good | 80 |
| Easy | 100 |

This score is a product heuristic, not a psychometric probability.

## Mastery aggregate

For each `(user, track, locale, skill)` V1 stores:

- current score;
- evidence count;
- time of latest evidence.

The score is the running mean of observations:

```text
new_score = (old_score * old_count + observation) / (old_count + 1)
```

Why running mean for V1:

- deterministic and inspectable;
- safe under an atomic PostgreSQL upsert;
- easy to explain/debug;
- avoids pretending the first version has a scientifically calibrated model.

A later version may use recency/confidence weighting after real learner data exists, without changing immutable evidence history.

## Persistence

Migration `015_adaptive_skill_mastery.sql` owns two tables.

### `skill_evidence`

Append-only learner observations linked to the exact `language_review_logs.id` that produced them.

Important fields:

- user / track / lesson / locale;
- stable item key;
- stable skill id;
- source;
- rating;
- observation score;
- observed time.

`UNIQUE(review_log_id, skill_id)` prevents duplicate skill evidence for one accepted review event.

### `learner_skill_mastery`

Current aggregate keyed by:

```text
user_id + track_id + locale + skill_id
```

This table is rebuildable from evidence in principle; evidence is the history, mastery is the current read model.

## Transaction contract

`SaveLanguageReviewCAS` performs, in one PostgreSQL transaction:

1. compare-and-swap the FSRS card;
2. append the review log and obtain its id;
3. append authored skill evidence;
4. upsert mastery aggregates;
5. commit.

If any step fails, the transaction rolls back.

If the CAS affects zero rows, the function returns a conflict before inserting review/evidence/mastery rows.

## API

Authenticated endpoint:

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

This path is used by release E2E so the full review-to-mastery pipeline is continuously verified.

### English Unit 9 — possessions

The `possessions` lesson starts validating a more semantic skill split:

- `en.grammar.possession`;
- `en.grammar.do-question`;
- `en.communication.possession`;
- `en.listening.possession`;
- `en.production.possession`.

The existing question/answer identities remain unchanged; only skill metadata is added.

## Verification

Required gates for this vertical:

- unit tests for rating mapping;
- unit tests for practice/checkpoint skill extraction and deduplication;
- unit test proving missing metadata is not inferred;
- existing Go module/checksum + `govulncheck` + tests + vet;
- existing Web/Language V3/i18n gates;
- release DB initialization applies `014` then `015`;
- language E2E performs an English Good review and reads the expected mastery rows;
- release DB assertion requires persisted `skill_evidence` and `learner_skill_mastery` rows.

## Next slices

### V1.1 — server-graded attempt evidence

For deterministic authored assessments, persist submitted answer/result on the server and emit higher-confidence skill evidence from server grading rather than relying only on client review rating.

Evidence source/confidence must be explicit so later recommendation logic can weight evidence appropriately.

### V1.2 — weak-skill query

Build a small read model that combines mastery score, evidence count, due review state, and recent attempts to identify repair candidates.

### V1.3 — Adaptive Daily Session

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
