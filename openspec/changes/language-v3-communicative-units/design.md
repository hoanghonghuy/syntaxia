# Design — Language V3 communicative units

## Authoring contract

Language lesson frontmatter may declare:

```yaml
unit_id: en-a1-meeting-01
unit_title: "Meet someone"
unit_order: 1
unit_can_do: "Start, sustain, and close a short first meeting"
unit_role: lesson
```

`unit_role` is one of:

- `lesson` — guided acquisition/practice;
- `checkpoint` — end-of-unit performance check;
- `review` — explicit consolidation node in the path.

EN/VI copies of the same lesson must share `unit_id`, `unit_order`, and `unit_role`. `unit_title` and `unit_can_do` are localized.

## Persistence

The parser maps top-level unit fields into the existing `exercise` JSONB document:

- `unit_id` → `unitId`
- `unit_title` → `unitTitle`
- `unit_order` → `unitOrder`
- `unit_can_do` → `unitCanDo`
- `unit_role` → `unitRole`

This deliberately avoids a database migration while the model is being validated. The server's existing startup curriculum sync persists the values.

If an admin-authored lesson already contains the camelCase field inside `exercise`, the parser preserves that explicit value instead of overwriting it.

## Read model

`GET /api/v1/lessons` remains a lean summary endpoint. It exposes only the five unit fields needed by the language hub rather than returning the entire exercise JSON document.

The repository extracts those values directly from JSONB. Invalid/non-numeric `unitOrder` values degrade to zero rather than causing a query cast failure.

## Frontend model

`buildLanguageUnits` groups lessons only by explicit `unitId`.

For content not yet migrated:

- each lesson becomes one singleton unit keyed by `lesson:<lessonId>`;
- no slug/title heuristic is allowed;
- the lesson remains visible and participates in sequential progress.

The current node is the first incomplete lesson in stable lesson order. Completed nodes remain clickable; the current node is clickable; later nodes are locked.

Unit nodes preserve their semantic role so the UI can distinguish normal lessons, checkpoints, and review nodes without deriving meaning from display copy.

## Performance

The language hub uses the normal lesson-summary request. It must not fetch one full lesson request per node merely to obtain unit metadata.

## Migration strategy

1. Lock parser/read-model/path behavior with tests.
2. Add metadata to one English EN/VI seed lesson.
3. Build complete golden units for English, Mandarin, and Japanese in L5.
4. Only then migrate the remaining published language curriculum in L6.

## Compatibility

IT tracks ignore the optional unit fields. Existing full lesson APIs and the FSRS review persistence model are unchanged.
