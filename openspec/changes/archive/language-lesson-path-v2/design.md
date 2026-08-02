# Design — language-lesson-path-v2

## Data

Frontmatter (YAML):

```yaml
can_do: "Greet someone politely"
pattern: "你好 / 再见"
steps:
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！", reading: "nǐ hǎo" }
  - type: tip
    title: "…"
    body: "…"
  - type: teach
    items:
      - { form: "你好", reading: "nǐ hǎo", gloss: "hello", example: "你好！" }
  - type: practice
    kind: mcq
    prompt: "…"
    choices: […]
    answer: "…"
  - type: checkpoint
    items:
      - { kind: mcq, prompt: "…", choices: […], answer: "…" }
```

API: parse `steps` into `lesson.exercise.steps` (or top-level `steps` on lesson DTO if already flexible). Prefer merge into exercise JSON like vocab.

## UI

- `LanguageLessonSteps.vue` — wizard or stacked steps with Next; practices grade inline
- Keep learn layout chrome
- Banner if legacy-only

## Risks

- Go ParseLessonFile must forward unknown frontmatter keys carefully
- Existing e2e assumes single exercise — update pilot + keep legacy grading for old lessons
