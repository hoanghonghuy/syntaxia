# English Basics — CEFR A1 foundation map

## Purpose

Define a coherent **English A1 foundation course** for Syntaxia. The course is organized by communicative Can-Do outcomes rather than by isolated grammar points or vocabulary chapters.

This product is deliberately bounded: it is a practical A1 foundation, not a claim that every CEFR A1 descriptor, every Cambridge YLE word, or every possible beginner situation is exhausted.

## Standards and sources

| Source | Role |
|--------|------|
| [Council of Europe — CEFR descriptors](https://www.coe.int/en/web/common-european-framework-reference-languages/cefr-descriptors) | Primary pedagogy/level source. A1 work is mapped to simple interaction about familiar topics and immediate needs. |
| [CEFR Companion Volume](https://rm.coe.int/common-european-framework-of-reference-for-languages-learning-teaching/16809ea0d4) | Broader action-oriented Can-Do framework and mediation/interaction context. |
| [ozbonus/yle-vocabulary-dataset](https://github.com/ozbonus/yle-vocabulary-dataset) (CC BY-SA 4.0) | Open vocabulary membership/theme support for beginner lexical choices. |
| [Cambridge YLE wordlists](https://www.cambridgeenglish.org/Images/wordlists-pre-a1-starters-a1-movers-and-a2-flyers.pdf) | Official lineage for the YLE-derived vocabulary dataset; do not copy textbook/exam prose. |

**Pedagogy rule:** CEFR Can-Do outcomes determine what a unit teaches. The YLE dataset constrains/supports vocabulary selection; it does not define the lesson sequence.

**Audience rule:** explain prose and situations are original Syntaxia copy for general/adult learners. Child-exam contexts from YLE are not copied into the course.

## Declared foundation product

The course contains **8 units / 30 nodes per locale** (`en` + `vi`). Each unit ends in an explicit checkpoint and delayed-retrieval review.

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

Total nodes: `3 + 4 + 4 + 3 + 4 + 4 + 4 + 4 = 30` per locale.

## A1 capability coverage in this product

The course intentionally covers a useful foundation subset of A1 interaction:

- exchange basic personal/social information;
- identify familiar people and relationships;
- understand/use simple numbers, locations, times and schedules;
- satisfy immediate transactional needs in café/shop exchanges;
- describe familiar surroundings and locate common objects;
- state simple preferences;
- make and answer a basic invitation;
- coordinate a simple time/place plan.

These are implemented as communicative outcomes. Grammar such as `be`, pronouns, `there is`, prepositions, `do` questions, or `would like` appears only when it serves an outcome.

## Language V3 node contract

Every published node must:

1. declare `cefr_level: a1`, `unit_id`, `unit_order`, `unit_role`, `unit_can_do`, and node `can_do`;
2. use a semantic `scene` where visual context helps the task;
3. include target-language `dialogue` and a `listen` step;
4. move from understanding/contextual recognition toward controlled recall or production;
5. include an explicit `checkpoint` step;
6. use stable authored assessment IDs so FSRS review identity survives copy/UI changes;
7. keep EN/VI variants aligned in intent, IDs, unit membership and grading answers;
8. avoid generic authored `mcq` as the core learning mechanic;
9. avoid hotlinked images; semantic visuals must come from the app-owned registry.

The canonical session arc remains:

`scene -> notice/listen -> understand -> manipulate/respond -> produce -> checkpoint -> retrieve later`

## Vocabulary policy

- Prefer beginner words marked Starters and/or Movers in `ozbonus/yle-vocabulary-dataset` when a lexical choice is needed.
- Reuse already-learned vocabulary rather than introducing unnecessary synonyms.
- Functional chunks such as `How much is this?`, `I'll take it`, `Where's …?`, and `Do you want to …?` are authored as communicative language, not treated as isolated glossary lemmas.
- Do not copy Cambridge example sentences, exam tasks, or textbook paragraphs.
- Vocabulary membership is a guardrail; naturalness and communicative usefulness still require human/product review.

## Product boundary

Calling this course `content-complete` or `production-ready` means **the declared 8-unit Syntaxia A1 foundation** is complete. It does **not** mean:

- exhaustive CEFR A1 descriptor coverage;
- Cambridge A1 Movers exam preparation;
- a complete English grammar syllabus;
- coverage of every beginner vocabulary item;
- speaking proficiency certification.

A future A1 continuation or A2 product must receive a new explicit curriculum map and Can-Do scope instead of silently extending this definition.

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

- exact 30-node EN inventory exposed through the API;
- EN/VI parity locked statically;
- progress and notes persist;
- language review/FSRS path remains functional;
- canonical Product CI including PostgreSQL-backed E2E is green for the promoted commit.

## Related

- [`language-learning-pedagogy-v3.md`](./language-learning-pedagogy-v3.md)
- [`language-content-quality-v3.md`](./language-content-quality-v3.md)
- [`languages-tracks.md`](./languages-tracks.md)
- [`curriculum-product-completion.md`](./curriculum-product-completion.md)
