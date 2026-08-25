# Japanese (JLPT) — N5 practical foundation map

## Purpose

Define the declared Syntaxia `japanese-jlpt` N5 foundation. JLPT supplies the ability boundary; Syntaxia supplies an explicit teaching progression so beginners are not dropped directly into situation lessons without kana, sound or grammar prerequisites.

JLPT N5 officially describes the ability to understand some basic Japanese: read typical expressions/sentences written in hiragana, katakana and basic kanji, and obtain necessary information from short, slowly spoken conversations in daily-life/classroom situations. JLPT explicitly notes that vocabulary and grammar knowledge are required but does not publish an official vocabulary/kanji/grammar syllabus.

## Sources

| Source | Role |
|---|---|
| [JLPT official level summary](https://www.jlpt.jp/e/about/levelsummary.html) | Authoritative N5 reading/listening ability boundary |
| [JLPT FAQ](https://www.jlpt.jp/e/faq/) | Confirms vocabulary/grammar knowledge matters but no official item-list syllabus is published |
| [Japan Foundation Irodori Starter](https://www.irodori.jpf.go.jp/starter/pdf.html) | Beginner kana/pronunciation reference; explicitly includes long-vowel and small-っ/long-consonant work |
| [evanclan/OpenJLPT](https://github.com/evanclan/OpenJLPT) (CC BY-SA 4.0) | Open vocabulary/readings provenance for authored frontmatter; not official JLPT authority |

## Declared scope — 10 units / 33 nodes per locale

### Unit 0 — Japanese foundation

| Node | Foundation goal |
|---|---|
| `kana-sounds` | Connect common kana to Japanese sounds and read/type familiar beginner forms |
| `mora-length` | Hear and read long-vowel / small-っ length contrasts |
| `core-sentences` | Build a minimal productive core with `です / ます` and concrete particle roles |
| `foundation-checkpoint` | Mix kana/sound/grammar retrieval |
| `foundation-review` | Delayed retrieval before communicative Unit 1 |

Unit 0 uses `unit_id: ja-n5-foundation-00`, `unit_order: 0`, and internal sort orders `-5..-1`. Published Units 1–9 keep all existing IDs and orders.

### Communicative Units 1–9

| Unit | Can-Do outcome | Primary mapped vocabulary |
|---:|---|---|
| 1 | Make one simple polite request and respond | はい, いいえ, ください, どうも |
| 2 | Identify and introduce a person/family member | 私, あなた, 人, 名前, 友達, お母さん, お父さん, 家族, 兄, 姉 |
| 3 | Understand and produce basic numbers in context | 一, 二, 三, 四, 五, 六, 七, 八, 九, 十 |
| 4 | Request a simple food/drink item | 水, 食べる, 飲む, 御飯, お茶 |
| 5 | Ask where a familiar place is | どこ, ここ, そこ, あそこ, トイレ, 駅, 店 |
| 6 | Ask/tell a simple daily-routine time | 朝, 午前, 午後, 起きる, 寝る |
| 7 | Follow read/write classroom instructions and ask for repetition | 授業, 宿題, 読む, 書く, 先生, 教室, もう一度 |
| 8 | Check a train destination and understand where to get off | 電車, 駅, 乗る, 降りる, 切符, 次, 出る |
| 9 | State a preference and make a simple free-time plan | 好き, 音楽, 映画, スポーツ, 一緒, 日曜日, 暇, 会う |

## Foundation progression

`kana ↔ sound -> mora/length contrasts -> high-frequency words/chunks -> basic sentence order + particles + polite forms -> listening/speaking -> kana/basic-kanji reading/writing -> checkpoint -> FSRS`

The nine Can-Do units apply this foundation; they are not a substitute for it.

## Learning contract

Every published node must:

- include target Japanese audio/listening work;
- preserve learner-readable `reading` values while reducing dependence on reading support only after the form is taught;
- reach controlled recall/production (`type_answer`, `listen_type`, `order_words`, or another semantic task);
- use stable assessed IDs shared across EN/VI;
- keep natural word order, particles and register;
- avoid generic authored `mcq` when a more specific task exists;
- use app-owned semantic visuals where visuals help.

Foundation pronunciation is bounded: the product teaches kana-to-sound mapping, mora/length awareness, long vowels and small `っ` needed for beginner reading/listening. It does not claim to be a complete Japanese phonetics or pitch-accent course.

## Vocabulary policy

OpenJLPT remains the project’s open vocabulary/readings provenance for the mapped N5 slice. It must not be described as an official JLPT word list. The official descriptor controls the ability boundary; naturalness and pedagogical usefulness control what Syntaxia actually teaches.

## Product boundary

This course is a **practical N5 foundation**, not exhaustive JLPT N5 exam preparation, all vocabulary, every kanji, every grammar point, or certification of speaking/writing proficiency.

## Verification

```bash
cd apps/web
npm run test:japanese-jlpt
npm run test:language-v3
npm run test:language-locale-quality
npm run test:language-audio
npm run test:language-review
```

Canonical Product CI additionally verifies exact 33-node runtime inventory, EN/VI parity, progress/notes, backward-compatible learner continuation and PostgreSQL-backed FSRS persistence.

## Related

- [`japanese-jlpt-pedagogy.md`](./japanese-jlpt-pedagogy.md)
- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
