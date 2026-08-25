---
id: ja-n5-fnd-03-core-sentences
track: japanese-jlpt
locale: en
slug: core-sentences
title: Build basic Japanese sentences
order: -3
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Japanese foundation"
unit_order: 0
unit_can_do: "Read, hear, and build basic Japanese forms before the communicative units"
unit_role: lesson
foundation_focus: grammar
can_do: "Build a short polite sentence with a useful particle and です or ます"
pattern: "A は B です。 / N を Vます。 / Place に 行きます。 / Place で Vます。"
objectives:
  - Use は to mark the topic in a basic identity sentence
  - Use を with a direct object and に with a destination
  - Use で for the place where an action happens
vocab:
  - { surface: "私", reading: "わたし", gloss: "I / me" }
  - { surface: "学生", reading: "がくせい", gloss: "student" }
  - { surface: "水", reading: "みず", gloss: "water" }
  - { surface: "学校", reading: "がっこう", gloss: "school" }
  - { surface: "行く", reading: "いく", gloss: "go" }
  - { surface: "飲む", reading: "のむ", gloss: "drink" }
steps:
  - type: scene
    title: "Build the sentence from roles"
    body: "You need a few reusable sentence frames before longer dialogues. Notice what each particle connects."
  - type: dialogue
    lines:
      - { speaker: "A", text: "私は学生です。", reading: "わたしは がくせいです。" }
      - { speaker: "B", text: "私は学校に行きます。", reading: "わたしは がっこうに いきます。" }
      - { speaker: "A", text: "学校で水を飲みます。", reading: "がっこうで みずを のみます。" }
  - type: listen
    prompt: "Listen. Which particle marks the destination before 学校?"
    text: "学校に行きます。"
    reading: "がっこうに いきます。"
  - type: tip
    title: "Particles show relationships"
    body: "Learn particles inside short sentences: は marks the topic, を the direct object, に a destination, and で the place where an action happens."
  - type: teach
    items:
      - { form: "私は学生です。", reading: "わたしは がくせいです。", gloss: "I am a student.", example: "私は学生です。" }
      - { form: "水を飲みます。", reading: "みずを のみます。", gloss: "I drink water.", example: "水を飲みます。" }
      - { form: "学校に行きます。", reading: "がっこうに いきます。", gloss: "I go to school.", example: "学校に行きます。" }
  - type: practice
    id: ja-fnd-grammar-topic
    kind: order_words
    prompt: "Build: I am a student."
    tokens: ["私は", "学生です"]
    answer: "私は学生です"
    acceptedAnswers: ["私は学生です。"]
  - type: practice
    id: ja-fnd-grammar-object
    kind: dialogue_choice
    prompt: "Which sentence correctly says you drink water?"
    choices: ["水を飲みます。", "水に飲みます。", "水は行きます。"]
    answer: "水を飲みます。"
  - type: practice
    id: ja-fnd-grammar-destination
    kind: type_answer
    prompt: "Type: I go to school."
    answer: "学校に行きます"
    acceptedAnswers: ["学校に行きます。"]
    hints:
      - "Use に before 行きます."
  - type: checkpoint
    items:
      - id: ja-fnd-grammar-check-de
        kind: meaning_choice
        prompt: "Which particle marks the place where an action happens in 学校＿勉強します?"
        choices: ["で", "を", "は"]
        answer: "で"
      - id: ja-fnd-grammar-check-topic
        kind: type_answer
        prompt: "Type: I am a student."
        answer: "私は学生です"
        acceptedAnswers: ["私は学生です。"]
exercise:
  type: type_answer
  prompt: "Type: I go to school."
  answer: "学校に行きます"
  acceptedAnswers: ["学校に行きます。"]
---

These are productive starter frames, not a complete particle table. Later units reuse the same roles in real exchanges.
