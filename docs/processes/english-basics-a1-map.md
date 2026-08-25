# English Basics — CEFR A1 foundation map

## Purpose

Define a coherent **English A1 foundation course** for Syntaxia. The product now treats communicative Can-Do outcomes as the destination while explicitly sequencing the language system underneath them:

`sound / stress -> core vocabulary -> grammar / sentence patterns -> listening -> interaction -> controlled production -> reading/writing support -> checkpoint -> delayed retrieval`

This is deliberately bounded: it is a practical A1 foundation, not a claim that every CEFR A1 descriptor, every English word, or every grammar point is exhausted.

## Standards and sources

| Source | Role |
|--------|------|
| [Council of Europe — CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors) | Primary proficiency/Can-Do source. |
| [Council of Europe — qualitative aspects of spoken language use](https://www.coe.int/en/web/common-european-framework-reference-languages/table-3-cefr-3.3-common-reference-levels-qualitative-aspects-of-spoken-language-use) | A1 range/accuracy/fluency boundary: a very basic repertoire, limited control of simple structures, and short supported interaction. |
| [Council of Europe — phonological competence](https://www.coe.int/en/web/common-european-framework-reference-languages/phonological-competence) | Pronunciation foundation: intelligibility, sound articulation and prosodic control rather than accent imitation. |
| [Council of Europe — Reference Level Descriptions](https://www.coe.int/en/web/common-european-framework-reference-languages/reference-level-descriptions) | Confirms that language-specific CEFR content must make words, grammar and related forms explicit rather than relying on generic Can-Do statements alone. |
| [ozbonus/yle-vocabulary-dataset](https://github.com/ozbonus/yle-vocabulary-dataset) (CC BY-SA 4.0) | Open beginner vocabulary membership/theme support. |
| [Cambridge YLE wordlists](https://www.cambridgeenglish.org/Images/wordlists-pre-a1-starters-a1-movers-and-a2-flyers.pdf) | Official lineage for the YLE-derived vocabulary dataset; do not copy exam/textbook prose. |

CEFR remains the level boundary. Vocabulary datasets are selection support, not the course sequence.

## Declared foundation product

The course contains **9 units / 35 nodes per locale** (`en` + `vi`): one explicit language-foundation unit followed by eight communicative units. Existing published Unit 1–8 IDs and sort orders are not renumbered.

### Unit 0 — English foundations

| Node | Main language focus |
|------|---------------------|
| `sound-spelling` | Listen before trusting spelling; guided contrast such as `/ɪ/` vs `/iː/`; IPA is support, not memorisation. |
| `word-stress` | Hear and reproduce the main beat in a small set of familiar A1 words. |
| `core-be` | Subject pronouns + `am/is/are`, common contractions, a basic negative, and yes/no question formation with `be`. |
| `foundation-checkpoint` | Mixed sound + stress + sentence gate. |
| `foundation-review` | Delayed retrieval before the learner enters the first communicative unit. |

A1 phonology is taught for **intelligibility**. Syntaxia does not demand one native accent and does not dump the entire English phoneme inventory into the first session.

### Communicative Units 1–8

| Unit | Product outcome | Nodes |
|-----:|-----------------|-------|
| 1 | Meet someone: greet, introduce yourself, close a first meeting | `greetings` → `meeting-checkpoint` → `meeting-review` |
| 2 | Introduce people close to you | `people` → `family` → `people-checkpoint` → `people-review` |
| 3 | Use numbers and simple place language to find your way | `numbers` → `places` → `find-way-checkpoint` → `find-way-review` |
| 4 | Order one item politely at a café | `food-drink` → `cafe-checkpoint` → `cafe-review` |
| 5 | Talk about your day: ask/tell times and give a short routine | `time-of-day` → `daily-routine` → `routine-checkpoint` → `routine-review` |
| 6 | Buy one simple item: ask a price, choose, purchase, close politely | `prices` → `shopping` → `shopping-checkpoint` → `shopping-review` |
| 7 | Find things at home: describe a room and locate a familiar object | `home-things` → `where-things` → `home-checkpoint` → `home-review` |
| 8 | Make a free-time plan: state a preference, invite, agree on time/place | `hobbies` → `invitations` → `free-time-checkpoint` → `free-time-review` |

Total: `5 + 3 + 4 + 4 + 3 + 4 + 4 + 4 + 4 = 35` nodes per locale.

## Grammar progression

Grammar is not a separate textbook track, but it is no longer incidental. Each stage adds a small reusable structure and then requires it in listening/interaction/production.

| Stage | Grammar / sentence focus | Representative evidence |
|-------|--------------------------|-------------------------|
| Foundation 0 | subject pronouns; `am/is/are`; contractions; `not`; `Are you…? / Is she…?` | `core-be` |
| Unit 1 | first-person `be` and spoken contraction `I'm` | `Hi, I'm …` |
| Unit 2 | `this/that`; `he/she + be`; simple possessive `my` | `This is … / He's … / She's …` |
| Unit 3 | `where + be`; `it's`; simple location language | `Where's …? / It's here.` |
| Unit 4 | polite request chunk with `would like` | `I'd like …, please.` |
| Unit 5 | present-simple `I/you`; `do` question for routines; time phrase with `at`; connector `then` | `What time do you …?` |
| Unit 6 | demonstrative `this`; price/choice chunks; `I'll take it` as a useful fixed future-intention chunk | shopping lessons |
| Unit 7 | `there is/are`; `where + be`; concrete prepositions `in/on/under` | home lessons |
| Unit 8 | present-simple preference; `Do you like…?`; `Do you want to…?`; short `do/don't` responses | hobby/invitation lessons |

The progression is intentionally small. A1 learners should repeatedly use a structure in meaningful situations rather than memorise a large grammar table once.

## Vocabulary progression

- Foundation 0 introduces only words needed to hear the sound/stress model and use core pronouns/`be`.
- Units 1–8 introduce vocabulary by high-frequency everyday domain: people, numbers, places, food/drink, routine/time, shopping, home, hobbies/plans.
- Reuse takes priority over unnecessary synonyms.
- Functional chunks (`How much is this?`, `I'd like…`, `Where's…?`, `Do you want to…?`) are learned as usable language while their grammar becomes explicit at the appropriate stage.
- Do not copy Cambridge example sentences, exam tasks or textbook paragraphs.

## Skills and exercise policy

A normal learning node should move through:

`scene -> listen / notice -> understand -> manipulate/respond -> controlled production -> checkpoint -> retrieve later`

Across the course the learner repeatedly practises:

- **listening:** identify sound, word, stress, detail, or response;
- **speaking support:** repeat intelligible target chunks and notice stress;
- **reading:** connect written word/phrase to sound and meaning;
- **writing/production:** type or order a short target sentence;
- **vocabulary:** retrieve words in context, not a glossary-only quiz;
- **grammar:** build/rebuild a useful sentence pattern;
- **review:** stable assessed IDs feed the generic FSRS review engine.

Generic authored `mcq` is not the primary mechanic when `audio_choice`, `dialogue_choice`, `order_words`, `fill_blank` or `type_answer` expresses the learning task better.

## Language V3 node contract

Every published node must:

1. declare `cefr_level: a1`, `unit_id`, `unit_order`, `unit_role`, `unit_can_do`, node `can_do`, and a reusable `pattern`;
2. use semantic/app-owned visual context where it helps the task;
3. include target-language `dialogue` and a `listen` step;
4. move from understanding/contextual recognition toward controlled recall or production;
5. include an explicit `checkpoint` step;
6. use stable authored assessment IDs so FSRS identity survives copy/UI changes;
7. keep EN/VI variants aligned in intent, IDs, unit membership and grading answers;
8. avoid generic authored `mcq` as the core learning mechanic;
9. keep all visual assets app-owned rather than hotlinked.

## Product boundary

Calling this product `content-complete` or `production-ready` means the declared **9-unit / 35-node Syntaxia English A1 foundation** is complete. It does **not** mean:

- exhaustive CEFR A1 descriptor coverage;
- Cambridge A1 Movers exam preparation;
- a complete English grammar syllabus;
- a complete English phonetics course;
- coverage of every beginner vocabulary item;
- speaking proficiency certification.

A future A1 continuation or A2 product must receive a new explicit map instead of silently changing this boundary.

## Verification

Static/product gates:

```bash
cd apps/web
npm run test:english-basics
npm run test:language-v3
npm run test:language-audio
npm run test:language-review
```

Release gate:

- exact **35-node** EN and VI inventory exposed through the API;
- Foundation Unit 0 remains before Unit 1 without renumbering legacy IDs;
- EN/VI assessed-ID parity is locked;
- app-owned English sound/stress/sentence visuals exist;
- progress and notes persist;
- an authored English review ID persists through FSRS;
- canonical Product CI including PostgreSQL-backed E2E is green for the promoted commit.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
