# English Basics — CEFR A1 language foundation map

## Purpose

Define a coherent **English A1 foundation course** for Syntaxia. The course still ends in practical communicative Can-Do outcomes, but it no longer assumes those outcomes alone are enough to sequence a beginner language course.

The learning order is now explicit:

`pronunciation awareness -> core vocabulary/chunks -> basic sentence grammar -> listening/interaction -> controlled speaking/writing -> checkpoint -> delayed retrieval`

This product is deliberately bounded: it is a practical A1 foundation, not a claim that every CEFR A1 descriptor, every English grammar point, or every beginner vocabulary item is exhausted.

## Standards and sources

| Source | Role |
|--------|------|
| [Council of Europe — CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors) | Primary level/capability source. A1 includes a very basic linguistic range for concrete personal needs and simple interaction. |
| [CEFR Companion Volume 2020](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4) | Primary pronunciation/competence source. The A1 phonological scale covers guided reproduction of a limited sound repertoire, intelligible familiar words/phrases, and simple stress/prosody. The linguistic competence scales also bound simple grammar control. |
| [ozbonus/yle-vocabulary-dataset](https://github.com/ozbonus/yle-vocabulary-dataset) (CC BY-SA 4.0) | Open vocabulary membership/theme support for beginner lexical choices. |
| [Cambridge YLE wordlists](https://www.cambridgeenglish.org/Images/wordlists-pre-a1-starters-a1-movers-and-a2-flyers.pdf) | Official lineage for the YLE-derived vocabulary dataset; do not copy textbook/exam prose. |

**Standards rule:** CEFR defines the A1 ability boundary; it is not itself a complete English grammar or vocabulary syllabus. Syntaxia therefore adds an explicit prerequisite progression for sound, lexical chunks, and a very small grammar core before the communicative units.

**Audience rule:** explanation prose and situations are original Syntaxia copy for general/adult learners. Child-exam contexts from YLE are not copied into the course.

## Declared foundation product

The course contains **9 units / 37 nodes per locale** (`en` + `vi`). Unit 0 establishes pronunciation and sentence-building foundations; Units 1–8 then apply them to familiar A1 situations. Every unit ends in an explicit checkpoint and delayed-retrieval review.

| Unit | Product outcome | Nodes |
|-----:|-----------------|-------|
| 0 | Build the language foundation: sound↔spelling, word stress, sentence melody, `be`, and basic questions | `sound-spelling` → `word-stress` → `sentence-melody` → `core-sentences` → `basic-questions` → `foundation-checkpoint` → `foundation-review` |
| 1 | Meet someone: greet, introduce yourself, close a first meeting | `greetings` → `meeting-checkpoint` → `meeting-review` |
| 2 | Introduce people close to you | `people` → `family` → `people-checkpoint` → `people-review` |
| 3 | Use numbers and simple place language to find your way | `numbers` → `places` → `find-way-checkpoint` → `find-way-review` |
| 4 | Order one item politely at a café | `food-drink` → `cafe-checkpoint` → `cafe-review` |
| 5 | Talk about your day: ask/tell times and give a short routine | `time-of-day` → `daily-routine` → `routine-checkpoint` → `routine-review` |
| 6 | Buy one simple item: ask a price, choose, purchase, close politely | `prices` → `shopping` → `shopping-checkpoint` → `shopping-review` |
| 7 | Find things at home: describe a room and locate a familiar object | `home-things` → `where-things` → `home-checkpoint` → `home-review` |
| 8 | Make a free-time plan: state a preference, invite, agree on time/place | `hobbies` → `invitations` → `free-time-checkpoint` → `free-time-review` |

Total nodes: `7 + 3 + 4 + 4 + 3 + 4 + 4 + 4 + 4 = 37` per locale.

## Unit 0 — language foundation

### Pronunciation

The first three nodes implement the CEFR A1 phonological boundary without pretending to teach a complete English phonology course:

1. **Sound ↔ spelling** — hear a familiar word first, then connect pronunciation, meaning and written form. IPA is optional reference support, not a prerequisite alphabet.
2. **Word stress** — reproduce the stronger syllable in a tiny set of familiar words such as `hello`, `teacher`, and `coffee`.
3. **Sentence melody** — notice useful beginner statement / yes-no question / wh-question intonation shapes while explicitly avoiding claims that one contour is a rigid rule for every accent/context.

The product targets **intelligibility**, not accent imitation.

### Core grammar

The next two nodes provide only the grammar needed to build the later A1 interactions:

- subject pronouns + `am / is / are`;
- common spoken contractions (`I'm`, `you're`, `she's`, etc.);
- one-clause `subject + be + complement` sentences;
- `be` inversion for yes/no questions;
- wh + `be` questions such as `Where are you from?`;
- one high-frequency `do + subject + base verb` frame, introduced through `Do you like …?`.

This is intentionally a **small productive grammar core**, not a grammar reference book.

### Vocabulary

Foundation vocabulary is deliberately small and reusable: personal pronouns, `name`, `student`, `teacher`, `from`, `where`, `like`, `music`, plus words already needed by Unit 1. New words are learned as **sound + meaning + spelling + usable chunk**, not glossary-only entries.

## A1 capability coverage in this product

After Unit 0, Units 1–8 apply the foundation to a useful subset of A1 interaction:

- exchange basic personal/social information;
- identify familiar people and relationships;
- understand/use simple numbers, locations, times and schedules;
- satisfy immediate transactional needs in café/shop exchanges;
- describe familiar surroundings and locate common objects;
- state simple preferences;
- make and answer a basic invitation;
- coordinate a simple time/place plan.

Grammar and vocabulary are prerequisites and reusable tools; Can-Do outcomes prove that the learner can **use** those tools rather than merely recognise them.

## Language V3 node contract

Every published node must:

1. declare `cefr_level: a1`, `unit_id`, `unit_order`, `unit_role`, `unit_can_do`, and node `can_do`;
2. use a semantic app-owned `scene` where visual context helps the task;
3. include target-language `dialogue` and a `listen` step;
4. move from understanding/contextual recognition toward controlled recall or production;
5. include an explicit `checkpoint` step;
6. use stable authored assessment IDs so FSRS review identity survives copy/UI changes;
7. keep EN/VI variants aligned in intent, IDs, unit membership and grading answers;
8. avoid generic authored `mcq` as the core learning mechanic;
9. avoid hotlinked images; semantic visuals must come from the app-owned registry/assets.

The canonical session arc remains:

`scene -> listen/notice -> understand -> manipulate/respond -> produce -> checkpoint -> retrieve later`

## Vocabulary policy

- Prefer beginner words marked Starters and/or Movers in `ozbonus/yle-vocabulary-dataset` when a lexical choice is needed.
- Reuse already-learned vocabulary rather than introducing unnecessary synonyms.
- Treat pronunciation/stress and useful chunks as part of knowing a word.
- Functional chunks such as `How much is this?`, `I'll take it`, `Where's …?`, and `Do you want to …?` are communicative language, not isolated glossary lemmas.
- Do not copy Cambridge example sentences, exam tasks, or textbook paragraphs.
- Vocabulary membership is a guardrail; naturalness and communicative usefulness still require product review.

## Product boundary

Calling this course `content-complete` or `production-ready` means **the declared 9-unit / 37-node Syntaxia A1 foundation** is complete. It does **not** mean:

- exhaustive CEFR A1 descriptor coverage;
- Cambridge A1 Movers exam preparation;
- a complete English grammar syllabus;
- a complete English phonology/accent course;
- coverage of every beginner vocabulary item;
- speaking proficiency certification.

A future A1 continuation or A2 product must receive a new explicit curriculum map and scope instead of silently extending this definition.

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

- exact **37-node** EN inventory exposed through the API;
- EN/VI parity locked statically;
- Unit 0 stable assessed IDs participate in the normal review path;
- progress and notes persist;
- returning learners with progress in Units 1–8 are not rewound by the inserted Unit 0;
- canonical Product CI including PostgreSQL-backed E2E is green for the promoted commit.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)