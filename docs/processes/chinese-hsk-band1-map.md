# Chinese HSK 3.0 Band 1 — first lesson map

## Purpose

Map open **HSK 3.0 Band 1** (level 1 / `new-1`) vocabulary into the first Syntaxia `chinese-hsk` lessons. Authors must not invent word lists outside this map for the MVP slice.

## When to use

- Before adding or publishing a `docs/curriculum/chinese-hsk/` lesson
- When reviewing OpenSpec `chinese-hsk-mvp` content tasks

## Sources (cited)

| Source | Role |
|--------|------|
| [leonsilicon/hsk3.0](https://github.com/leonsilicon/hsk3.0) `HSK3.0_words_level1.json` | Primary Band 1 word membership (hanzi strings) |
| [elkmovie/hsk30](https://github.com/elkmovie/hsk30) / [ivankra/hsk30](https://github.com/ivankra/hsk30) | Cross-check / OCR lineage of HSK 3.0 lists (MIT community datasets) |
| Official HSK 3.0 notice (PRC MoE, 2021) | Standard definition of bands — we do not republish the PDF |

**Rule:** Every hanzi in MVP frontmatter `vocab` must appear in Band 1 of the primary list above (variant forms like `爸爸|爸` count as the simplified headword used in lessons).

Glosses and explain prose are original Syntaxia copy (en/vi). Pinyin is standard Mandarin romanization for learner UI.

## First slice (12 lessons)

Not the full Band 1 (~300–500 headwords in community level-1 exports). Thematic clusters only:

| Order | Slug | Theme | Target words (Band 1 subset) |
|------:|------|-------|------------------------------|
| 1 | `greetings` | Greetings & courtesy | 你好, 再见, 谢谢, 不客气, 请问, 对不起, 没关系 |
| 2 | `pronouns` | People & pronouns | 我, 你, 他, 她, 我们, 你们, 人, 名字 |
| 3 | `numbers` | Numbers | 一, 二, 三, 四, 五, 六, 七, 八, 九, 十, 零, 百 |
| 4 | `family` | Family | 爸爸, 妈妈, 哥哥, 姐姐, 弟弟, 妹妹, 家 |
| 5 | `time-of-day` | Days & parts of day | 今天, 明天, 昨天, 上午, 下午, 晚上, 现在 |
| 6 | `school-daily` | School & daily verbs | 学校, 老师, 学生, 同学, 学习, 汉语, 吃饭, 喝 |
| 7 | `food-drink` | Food & drink | 水, 茶, 米饭, 水果, 买, 钱, 好吃 |
| 8 | `places` | Places & going | 商店, 医院, 图书馆, 电影院, 去, 回家, 在 |
| 9 | `questions` | Question words | 什么, 谁, 哪, 哪里, 多少, 吗, 呢 |
| 10 | `adjectives` | Descriptions | 大, 小, 好, 多, 少, 冷, 热 |
| 11 | `transport` | Transport | 车, 打车, 汽车, 火车, 飞机, 车站 |
| 12 | `devices` | Phones & screens | 电话, 手机, 电脑, 电视, 上网 |

Lesson ids: `zh-hsk-b1-{order}-{slug}` (e.g. `zh-hsk-b1-01-greetings`). Locales: `en` + `vi` paired files.

## Do

- Cite this map in PRs that add Chinese lessons
- Keep `hsk_band: 1` and `hsk_version: "3.0"` in frontmatter
- Ship explain locales together
- New lessons must use **`steps`** (dialogue / tip / teach / practice) per [`language-learning-pedagogy-v2.md`](./language-learning-pedagogy-v2.md)

## Don't

- Publish empty stubs for the rest of Band 1
- Copy copyrighted textbook paragraphs
- Add JLPT / English-target lessons under this track
- Add new **glossary-only** themes (vocab table + single MCQ) — freeze until migrated to path v2

## Related

- [`chinese-hsk-pedagogy.md`](./chinese-hsk-pedagogy.md)
- [`multi-domain-roadmap.md`](./multi-domain-roadmap.md) Phase 3
- OpenSpec archive: `openspec/changes/archive/chinese-hsk-mvp/`
- Main spec: `openspec/specs/language-lessons/`
