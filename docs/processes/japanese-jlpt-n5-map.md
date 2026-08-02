# Japanese (JLPT) — N5 first lesson map

## Purpose

Map **open** JLPT N5 vocabulary into the first Syntaxia `japanese-jlpt` lessons. Authors must not invent word lists outside this map for the starter slice.

## When to use

- Before adding `docs/curriculum/japanese-jlpt/` lessons
- When implementing OpenSpec `japanese-jlpt-mvp`

## Sources (cited)

| Source | Role |
|--------|------|
| [evanclan/OpenJLPT](https://github.com/evanclan/OpenJLPT) `data/csv/vocab-n5.csv` (CC BY-SA 4.0) | Primary **membership** — every starter lemma must appear as `word` in this file |
| OpenJLPT [`NOTICE.md`](https://github.com/evanclan/OpenJLPT/blob/main/NOTICE.md) | Attribution: Waller level lists (CC BY), JMdict/KANJIDIC2 (CC BY-SA), Tatoeba |
| [Jonathan Waller / tanos JLPT](https://www.tanos.co.uk/jlpt/) (CC BY) | Community N5–N1 assignments underlying OpenJLPT levels |

**Note:** JLPT does not publish official word lists. OpenJLPT/Waller are unofficial community standards. Classic greetings such as こんにちは were **not** present in OpenJLPT `vocab-n5.csv` at map time — starter lesson 1 uses courtesy markers that **are** in that file.

**Rule:** Every lemma in frontmatter `vocab[].surface` (or alias) must match an OpenJLPT N5 `word` cell. Prefer OpenJLPT `reading` when non-empty.

## First slice (6 lessons)

| Order | Slug | Theme | Target lemmas (surface) |
|------:|------|-------|-------------------------|
| 1 | `politeness` | Courtesy markers | はい, いいえ, ください, どうも |
| 2 | `people` | People and identity | 私, あなた, 人, 名前, 友達 |
| 3 | `numbers` | Numbers 1–10 | 一, 二, 三, 四, 五, 六, 七, 八, 九, 十 |
| 4 | `family` | Family | お母さん, お父さん, 家族, 兄, 姉 |
| 5 | `food-drink` | Food and drink | 水, 食べる, 飲む, 御飯 |
| 6 | `places` | Places and motion | 学校, 家, 駅, 店, 行く, ここ |

Lesson ids: `ja-n5-{order}-{slug}` (e.g. `ja-n5-01-politeness`). Locales: explain `en` + `vi` paired files. Target language in examples: Japanese.

Frontmatter: `jlpt_level: n5`, `track: japanese-jlpt`.

## Do

- Cite this map in PRs that add Japanese lessons
- Keep `jlpt_level: n5` in frontmatter
- Ship explain locales together
- Lessons use **`steps`** per [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md)
- Pass `?track=japanese-jlpt` when fetching lessons (shared slugs)

## Don't

- Publish empty stubs for the full N5 list
- Copy commercial textbook paragraphs
- Add lemmas missing from OpenJLPT `vocab-n5.csv` without updating this map
- Add glossary-only lessons without `steps`

## Related

- [`japanese-jlpt-pedagogy.md`](./japanese-jlpt-pedagogy.md)
- [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md)
- [`languages-tracks.md`](./languages-tracks.md)
- OpenSpec archive: `openspec/changes/archive/japanese-jlpt-mvp/`
