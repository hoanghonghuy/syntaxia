# Mandarin HSK Level 1 practical foundation — 2026 transition map

## Purpose

Define the declared Syntaxia `chinese-hsk` **practical Level 1 foundation** during the 2026 HSK 3.0 transition. The product is organized around useful communicative outcomes and keeps an explicit boundary between:

1. the **current official HSK Level 1 ability/exam boundary**;
2. the **open vocabulary lineage** historically used to author Syntaxia content; and
3. the smaller **vocabulary subset actually taught by this foundation course**.

The course must not claim exhaustive HSK 3.0 Level 1 exam preparation while the official transition is still in progress and the repository has not pinned a machine-verifiable official final vocabulary corpus.

## Current official status — August 2026

| Official source | What Syntaxia relies on |
|-----------------|-------------------------|
| [Chinese Test Service — HSK Level 1](https://www.chinesetest.cn/HSK/1) | Current Level 1 test structure: listening + reading, about 40 minutes |
| [Chinese Test Service — Level 1 vocabulary resource](https://www.chinesetest.cn/HSK/1?type=2) | Current site states Level 1 covers a **fundamental vocabulary of 150 Chinese words** |
| [HSK 3.0 second global trial notice](https://www.chinesetest.cn/notice) | HSK 3.0 second global trial is scheduled for **2026-09-20**, so Syntaxia treats the exam transition as active rather than pretending the old 2021 community export is the final 2026 exam corpus |

The official vocabulary table is rendered dynamically on the current site. Until Syntaxia pins an official downloadable/versioned list in CI, the number **150** is an official level boundary, not a claim that every current Syntaxia frontmatter word has been automatically verified against a final official 2026 file.

## Open authoring lineage

| Source | Role |
|--------|------|
| [leonsilicon/hsk3.0](https://github.com/leonsilicon/hsk3.0) `HSK3.0_words_level1.json` | Historical open Band-1 membership source used by the existing Syntaxia corpus |
| [elkmovie/hsk30](https://github.com/elkmovie/hsk30) / [ivankra/hsk30](https://github.com/ivankra/hsk30) | Community cross-check / OCR lineage for the 2021 standard |

These community sources remain **provenance/cross-check inputs**, not an authority override for the current Chinese Test Service exam pages.

## Declared product scope — 11 communicative units / 36 nodes per locale

| Unit | Can-Do outcome | Representative authored vocabulary |
|-----:|----------------|------------------------------------|
| 1. Greetings | Start and close a short polite meeting | 你好, 再见, 谢谢, 不客气, 对不起, 没关系 |
| 2. People & family | Identify and introduce a person or family member | 我, 你, 他, 她, 名字, 爸爸, 妈妈, 家 |
| 3. Numbers | Understand and produce basic numbers in context | 一, 二, 三, 四, 五, 六, 七, 八, 九, 十 |
| 4. Study & routine | Talk about a simple study day and time-of-day | 今天, 明天, 上午, 下午, 学校, 老师, 学生, 学习 |
| 5. Counter / food | Request or buy a basic food/drink item | 水, 茶, 米饭, 水果, 买, 钱 |
| 6. Places & information | Ask who/what/where and understand a short location answer | 什么, 谁, 哪里, 商店, 医院, 去, 在 |
| 7. Description | Describe size or temperature naturally | 大, 小, 多, 少, 冷, 热, 很 |
| 8. Travel | Identify a simple transport option and say how to go | 车, 火车, 飞机, 车站, 去 |
| 9. Devices | Identify a common device and say what it is used for | 电话, 手机, 电脑, 电视, 上网 |
| 10. Weather | Ask about today's weather and understand hot/cold/rain information | 天气, 今天, 明天, 下雨, 冷, 热 |
| 11. Free time | State a preference and make a simple movie plan | 喜欢, 电影, 看, 星期, 想, 去, 朋友 |

The first nine units preserve their published identities. Units 10–11 close practical communication gaps without renumbering earlier content.

## Learning contract

Every Language V3 node in this track must provide an observable learning action:

`scene -> dialogue/listen -> notice/teach -> contextual response -> controlled character production -> checkpoint -> delayed retrieval`

Mandarin-specific rules:

- target speech language is `zh-CN`;
- authored readings use tone-marked pinyin for beginner support;
- listening must require extracting useful information, not just replaying audio;
- CJK grading remains strict: different Chinese characters are not normalized into the same answer;
- EN/VI explanation locales share stable assessed IDs and learning intent;
- generic authored `mcq` is not the production contract;
- semantic visuals are app-owned and cannot be external hotlinks;
- learner-facing dialogue should be natural beginner Mandarin, not vocabulary-list sentences stitched together.

## Metadata note

Existing frontmatter keeps:

```yaml
hsk_band: 1
hsk_version: "3.0"
```

This is a **Syntaxia curriculum-lineage marker** for the current track. It does not by itself certify that a lesson is part of a final official 2026 HSK examination vocabulary set.

## Product boundary

This is a **practical Mandarin Level 1 foundation**. It does not claim:

- all 150 currently stated official Level 1 words are taught;
- every word in the historical 2021 Band-1 community export is taught;
- exhaustive HSK Level 1 mock-exam preparation;
- a final mapping to the post-trial HSK 3.0 corpus before that corpus is version-pinned in the repository.

A later exam-preparation product should pin the official syllabus/vocabulary artifact, add reading/listening item coverage against that artifact, and maintain a separate exam-readiness matrix.

## Verification

```bash
cd apps/web
npm run test:chinese-hsk
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

Canonical Product CI additionally verifies exact runtime inventory, progress/notes, cross-domain sandboxes, and PostgreSQL-backed FSRS persistence.

## Related

- [`chinese-hsk-pedagogy.md`](./chinese-hsk-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
