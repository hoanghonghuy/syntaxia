# Mandarin HSK Level 1 practical foundation — 2026 transition map

## Purpose

Define the declared Syntaxia `chinese-hsk` **practical Level 1 foundation** during the 2026 HSK 3.0 transition. The product is organized around useful communicative outcomes and keeps an explicit boundary between:

1. the official international-Chinese proficiency framework;
2. the current HSK Level 1 ability/exam boundary;
3. the open vocabulary lineage historically used to author Syntaxia content; and
4. the smaller vocabulary subset actually taught by this foundation course.

The course must not claim exhaustive HSK 3.0 Level 1 exam preparation while the official transition is still in progress and the repository has not pinned a machine-verifiable official final vocabulary corpus.

## Official proficiency and orthography foundations

| Official source | What Syntaxia relies on |
|-----------------|-------------------------|
| [MOE / National Language Commission — International Chinese Language Education Chinese Proficiency Grading Standards](https://www.moe.gov.cn/jyb_xwfb/gzdt_gzdt/s5987/202103/t20210329_523304.html) | The proficiency standard uses a three-stage, nine-level system and explicitly treats **syllables, Chinese characters, vocabulary and grammar** as four language-element dimensions. Syntaxia therefore treats pronunciation/syllable awareness as a first-class beginner foundation rather than optional decoration. |
| [MOE — Basic Rules of Hanyu Pinyin Orthography, GB/T 16159—2012](https://www.moe.gov.cn/jyb_xwfb/gzdt_gzdt/s5987/201207/t20120717_139437.html) | Official Pinyin orthography covers modern Chinese spelling and tone-marking rules. Syntaxia authors canonical tone-marked Pinyin and teaches connected-speech tone changes separately from the stored spelling. |

For beginner authoring, Syntaxia keeps the standard written form (`nǐ hǎo`, `bù shì`) as the content identity. A lesson may explain common surface tone changes in connected speech, but it does not rewrite the canonical Pinyin spelling into a new lexical form.

## Current official HSK status — August 2026

| Official source | What Syntaxia relies on |
|-----------------|-------------------------|
| [Chinese Test Service — HSK Level 1](https://www.chinesetest.cn/HSK/1) | Current Level 1 test structure: listening + reading, about 40 minutes. |
| [Chinese Test Service — Level 1 vocabulary resource](https://www.chinesetest.cn/HSK/1?type=2) | Current site states Level 1 covers a **fundamental vocabulary of 150 Chinese words**. |
| [HSK 3.0 second global trial notice](https://www.chinesetest.cn/notice) | HSK 3.0 second global trial is scheduled for **2026-09-20**, so Syntaxia treats the exam transition as active rather than pretending the old 2021 community export is the final 2026 exam corpus. |

The official vocabulary table is rendered dynamically on the current site. Until Syntaxia pins an official downloadable/versioned list in CI, the number **150** is an official level boundary, not a claim that every current Syntaxia frontmatter word has been automatically verified against a final official 2026 file.

## Open authoring lineage

| Source | Role |
|--------|------|
| [leonsilicon/hsk3.0](https://github.com/leonsilicon/hsk3.0) `HSK3.0_words_level1.json` | Historical open Band-1 membership source used by the existing Syntaxia corpus. |
| [elkmovie/hsk30](https://github.com/elkmovie/hsk30) / [ivankra/hsk30](https://github.com/ivankra/hsk30) | Community cross-check / OCR lineage for the 2021 standard. |

These community sources remain **provenance/cross-check inputs**, not an authority override for the current Ministry of Education or Chinese Test Service sources.

## Declared product scope — pronunciation foundation + 11 communicative units / 41 nodes per locale

### Unit 0 — Pronunciation foundation (5 nodes)

This unit precedes communicative Unit 1 without renumbering any previously published lesson identity.

| Node | Role | Can-Do outcome |
|------|------|----------------|
| `pinyin-syllables` | lesson | Break a beginner syllable into sound parts and read tone-marked Pinyin. |
| `tones` | lesson | Hear and identify the four lexical tones plus a neutral-tone syllable. |
| `tone-changes` | lesson | Distinguish canonical Pinyin spelling from common connected-speech tone changes. |
| `pronunciation-checkpoint` | checkpoint | Choose and produce beginner Pinyin without a reference table. |
| `pronunciation-review` | review | Retrieve sound/Pinyin knowledge after a delay before Unit 1. |

The authored sort orders are `-5..-1` and `unit_order: 0`. Units 1–11 keep their existing IDs and ordering, preserving progress and FSRS identities already published by the product.

### Communicative Units 1–11 (36 nodes)

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

The first nine communicative units preserve their published identities. Units 10–11 close practical communication gaps without renumbering earlier content.

## Learning contracts

The pronunciation foundation intentionally uses a different interaction sequence from a communicative lesson:

`visual sound model -> listen -> discriminate -> recall/type Pinyin -> checkpoint -> delayed retrieval`

Communicative Language V3 nodes continue to use:

`scene -> dialogue/listen -> notice/teach -> contextual response -> controlled production -> checkpoint -> delayed retrieval`

Mandarin-specific rules:

- target speech language is `zh-CN`;
- authored readings use tone-marked Pinyin for beginner support;
- neutral-tone teaching explicitly shows the unmarked written form where appropriate;
- connected-speech tone changes are explained without replacing canonical Pinyin spelling;
- listening must require extracting or discriminating useful information, not just replaying audio;
- CJK grading remains strict: different Chinese characters are not normalized into the same answer;
- EN/VI explanation locales share stable assessed IDs and learning intent;
- generic authored `mcq` is not the production contract;
- semantic visuals and pronunciation diagrams are app-owned and cannot be external hotlinks;
- learner-facing dialogue should be natural beginner Mandarin, not vocabulary-list sentences stitched together.

## Metadata note

Existing frontmatter keeps:

```yaml
hsk_band: 1
hsk_version: "3.0"
```

This is a **Syntaxia curriculum-lineage marker** for the current track. It does not by itself certify that a lesson is part of a final official 2026 HSK examination vocabulary set.

Pronunciation nodes additionally use:

```yaml
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_order: 0
```

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

Canonical Product CI additionally verifies exact runtime inventory, progress/notes, cross-domain sandboxes, cold Go curriculum smoke tests, and PostgreSQL-backed FSRS persistence.

## Related

- [`chinese-hsk-pedagogy.md`](./chinese-hsk-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
