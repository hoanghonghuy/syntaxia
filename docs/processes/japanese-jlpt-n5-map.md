# Japanese (JLPT) — N5 foundation map

## Purpose

Define the declared Syntaxia `japanese-jlpt` **N5 foundation course**. The product is organized by communicative outcomes rather than by a grammar checklist or a vocabulary dump.

JLPT N5 officially describes the ability to understand some basic Japanese: read typical expressions/sentences in hiragana, katakana, and basic kanji, and pick up necessary information from short, slowly spoken conversations in daily-life and classroom situations. JLPT does **not** publish an official vocabulary list.

## Sources

| Source | Role |
|--------|------|
| [JLPT official level summary](https://www.jlpt.jp/e/about/levelsummary.html) | Authoritative N5 reading/listening ability boundary |
| [evanclan/OpenJLPT](https://github.com/evanclan/OpenJLPT) `data/csv/vocab-n5.csv` (CC BY-SA 4.0) | Primary vocabulary membership + readings for authored frontmatter |
| OpenJLPT [`NOTICE.md`](https://github.com/evanclan/OpenJLPT/blob/main/NOTICE.md) | Attribution and dataset lineage |
| Jonathan Waller / tanos JLPT lists (CC BY) | Community level assignments underlying OpenJLPT |

**Vocabulary rule:** every `vocab[].surface` (or alias) published in this course must match an OpenJLPT N5 `word` entry. Prefer its `reading` when available. The official JLPT descriptor defines the ability target; OpenJLPT defines the open vocabulary-membership source used by Syntaxia.

## Declared foundation scope — 9 communicative units / 28 nodes per locale

| Unit | Can-Do outcome | Primary mapped N5 vocabulary |
|-----:|----------------|------------------------------|
| 1. Polite request | Make one simple polite request and respond | はい, いいえ, ください, どうも |
| 2. People & family | Identify and introduce a person/family member | 私, あなた, 人, 名前, 友達, お母さん, お父さん, 家族, 兄, 姉 |
| 3. Numbers | Understand and produce basic numbers in a short exchange | 一, 二, 三, 四, 五, 六, 七, 八, 九, 十 |
| 4. Café | Request a simple food/drink item | 水, 食べる, 飲む, 御飯, お茶 |
| 5. Location | Ask where a familiar place is and understand viewpoint words | どこ, ここ, そこ, あそこ, トイレ, 駅, 店 |
| 6. Daily routine | Ask when someone gets up/goes to bed and answer with a simple time | 朝, 午前, 午後, 起きる, 寝る |
| 7. Classroom | Follow read/write instructions and ask for repetition | 授業, 宿題, 読む, 書く, 先生, 教室, もう一度 |
| 8. Train travel | Check a train destination and understand where to get off | 電車, 駅, 乗る, 降りる, 切符, 次, 出る |
| 9. Free-time plan | State a preference, invite someone, and agree on a simple plan | 好き, 音楽, 映画, スポーツ, 一緒, 日曜日, 暇, 会う |

Each unit ends in explicit checkpoint and delayed-review nodes. The first five units retain the existing published identities; units 6–9 extend the course without renumbering earlier nodes.

## Learning contract

A normal learning node follows the Language V3 guided-session model:

`scene -> dialogue/listen -> notice/teach -> contextual practice -> controlled production -> checkpoint -> delayed review`

For this N5 foundation specifically:

- listening must require extracting a useful detail, not just replaying audio;
- Japanese lines keep learner-readable `reading` values;
- assessed items use stable IDs shared by EN/VI explanation locales;
- production uses Japanese recall (`type_answer`, `listen_type`, or structured production), not generic `mcq` authoring;
- daily-life and classroom contexts are preferred because they match the official N5 ability description;
- semantic visuals must be app-owned; external hotlinks are not allowed.

## Product boundary

This course is a **practical N5 foundation**, not a claim of exhaustive JLPT N5 exam preparation, all 662 OpenJLPT N5 words, every N5 kanji, or every grammar point. Expanding beyond this boundary requires a new mapped scope and explicit exam-preparation design rather than silently redefining “complete”.

## Verification

```bash
cd apps/web
npm run test:japanese-jlpt
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

The canonical Product CI additionally verifies exact runtime inventory, progress/notes, cross-domain E2E, and PostgreSQL-backed FSRS persistence.

## Related

- [`japanese-jlpt-pedagogy.md`](./japanese-jlpt-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
