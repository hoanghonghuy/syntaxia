# English Basics — CEFR A1 first lesson map

## Purpose

Map **open** beginner English vocabulary into the first Syntaxia `english-basics` lessons. Authors must not invent word lists outside this map for the starter slice.

## When to use

- Before adding `docs/curriculum/english-basics/` lessons
- When implementing OpenSpec `english-basics-mvp`

## Sources (cited)

| Source | Role |
|--------|------|
| [ozbonus/yle-vocabulary-dataset](https://github.com/ozbonus/yle-vocabulary-dataset) (CC BY-SA 4.0) | Primary **membership + themes** (Starters / Movers tags). American column preferred for v1 spelling. |
| [Cambridge YLE wordlists PDF](https://www.cambridgeenglish.org/Images/wordlists-pre-a1-starters-a1-movers-and-a2-flyers.pdf) | Official list lineage for the dataset (do not republish PDF text) |
| CEFR A1 descriptors (Council of Europe) | Level label “CEFR A1” — familiar everyday expressions |

**Audience note:** YLE is child-exam oriented; we reuse **theme clusters and word membership** only. Explain prose is original Syntaxia copy for adult learners.

**Rule:** Every lemma in frontmatter `vocab` must appear in the YLE dataset at **starters** and/or **movers** (A1-adjacent). Prefer starters for the first six lessons.

## First slice (6 lessons)

| Order | Slug | Theme (YLE-aligned) | Target words (American spelling) |
|------:|------|---------------------|----------------------------------|
| 1 | `greetings` | Social / school greetings | hello, goodbye, please, thank you, sorry, yes, no |
| 2 | `people` | Family and friends / pronouns | I, you, he, she, we, they, name, friend |
| 3 | `numbers` | Numbers | one, two, three, four, five, six, seven, eight, nine, ten |
| 4 | `family` | Family and friends | mother, father, sister, brother, family, baby |
| 5 | `food-drink` | Food and drink | water, milk, apple, bread, eat, drink, hungry |
| 6 | `places` | Places and directions | school, home, park, shop, go, here, there |

Lesson ids: `en-a1-{order}-{slug}` (e.g. `en-a1-01-greetings`). Locales: explain `en` + `vi` paired files. Target language in examples: English.

## Do

- Cite this map in PRs that add English lessons
- Keep `cefr_level: a1` in frontmatter
- Ship explain locales together
- New/migrated lessons use **`steps`** per [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md)

## Don't

- Publish empty stubs for the full YLE / A1 list
- Add glossary-only lessons (vocab + single MCQ) without `steps`
- Copy Cambridge or Books4Languages textbook paragraphs
- Use Flyers-only vocabulary in this starter slice without updating the map

## Related

- [`english-basics-pedagogy.md`](./english-basics-pedagogy.md)
- [`languages-tracks.md`](./languages-tracks.md)
- OpenSpec: `openspec/changes/archive/english-basics-mvp/`
