# Design — english-guided-practice-v1

## Product boundary

English Guided Practice V1 is an application layer over published English A1 curriculum and P1 learner state. It must not become a second curriculum, grader, or mastery source of truth.

## P2.0 architecture

```text
published English lessons
+ learner progress
+ static authored unit blueprint registry
-> deterministic eligibility read model
-> authenticated API
```

No database migration is required for P2.0.

### Blueprint authority

The server registry contains one blueprint for each communicative English unit (1–9). Each blueprint declares stable product metadata only:

- blueprint id;
- unit id/order;
- scenario goal;
- required lesson/checkpoint slugs;
- target skill ids;
- allowed taught patterns;
- exit-check lesson slug and stable checkpoint item keys.

The registry does not contain answer keys. Exit answers continue to live in published curriculum and are resolved by the existing language attempt path.

### Eligibility

A blueprint is eligible only when:

1. every required slug resolves to a published lesson in the requested track/locale;
2. the authenticated learner has completed each resolved lesson in that locale.

Missing/unpublished curriculum fails closed. A delayed review node is never a required prerequisite.

The API returns all authored units with explicit `curriculumReady`, `eligible`, and `missingPrerequisiteSlugs` fields so the UI does not infer availability.

## Future P2 state machine

P2.1 will add a bounded interaction state machine:

```text
blueprint objective
-> turn 1 prompt
-> learner response
-> deterministic transition / optional validated AI variation
-> turn 2 ...
-> exit-check handoff
```

A deterministic authored fallback must cover the entire scenario. AI is an optional surface-variation and feedback adapter, not the state authority.

## AI adapter boundary

P2.2 provider integration must be behind an interface owned by the practice layer. Input is a sanitized `PracticeContext` built from authored blueprint/curriculum facts and bounded learner state. Output is a strict structured response that is validated again by product rules.

Invalid, refused, timed-out, or out-of-contract responses fall back immediately to the deterministic path. No provider-specific branching belongs in handlers or learner-state repositories.

## Evidence boundary

Guided turns are formative. They do not write mastery.

The exit check reuses existing stable checkpoint item keys and submits the learner answer through the existing deterministic server-grading path. Therefore authoritative evidence remains one pipeline:

```text
published checkpoint answer
-> server grader
-> FSRS
-> attempt log
-> skill evidence
-> mastery
```

## Security and privacy

- Authenticated learner id owns eligibility/progress lookup.
- Client cannot submit target skills, eligibility, or frontier state.
- Raw guided-practice text is not persisted by default.
- AI inputs must separate trusted instructions from untrusted learner text.
- Blueprint/provider output cannot widen curriculum unlocks or write progress/mastery.

## Compatibility

P2 adds capability without changing existing lesson, review, FSRS, Continue, or Today semantics. Existing users keep all current progress and review identities. Unit 0 remains audio-first and excluded from text guided practice by design.
