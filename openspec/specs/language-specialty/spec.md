# language-specialty

Specialty languages track for Chinese IT / tech terminology (vi/en explain).

## Requirements

### Requirement: Pedagogy precedes content

Authors must not invent specialty term lists. A cited map (szdict CC BY-SA and/or MIT computerese) is required before lesson Markdown. NC/ND lists must not be redistributed as curriculum dumps.

#### Scenario: Map gate

- **GIVEN** track `chinese-it-vocab`
- **WHEN** lessons are authored
- **THEN** a cited map process doc exists
- **AND** redistributed dumps from NC/ND sources are forbidden

### Requirement: Placeholder track

Phase 4.4 ships the catalog track under languages. Hub may show under-development until lessons publish.

#### Scenario: Hub under development

- **WHEN** the specialty track exists with zero lessons
- **THEN** under-development lead copy is acceptable

### Requirement: Mapped specialty lessons

MVP ships exactly the slugs listed in `chinese-it-vocab-map.md` as paired en/vi Markdown; each vocab hanzi is a szdict lemma from that map.

#### Scenario: Six mapped themes

- **GIVEN** map cites mhagiwara/szdict
- **WHEN** MVP is published
- **THEN** six slugs exist under `docs/curriculum/chinese-it-vocab/{en,vi}/`

### Requirement: Language player only

Opening a `chinese-it-vocab` lesson mounts the language player; SQL/JS/HTML sandboxes do not.

#### Scenario: Sandbox gate

- **WHEN** `isLanguageTrack` is true for the track
- **THEN** IT sandboxes stay behind `!isLanguageTrack`
