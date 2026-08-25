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
can_do: "Build and pronounce a short polite sentence with a useful particle and です or ます"
pattern: "A は B です。 / N を Vます。 / Place に 行きます。 / Place で Vます。"
objectives:
  - Use は to mark the topic and pronounce the particle as わ in this role
  - Use を with a direct object and recognize its usual modern pronunciation as お
  - Use に for a destination and で for the place where an action happens
  - Recognize the beginner polite pairs 行く → 行きます and 飲む → 飲みます without treating them as a rule for every verb
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
    body: "You need a few reusable sentence frames before longer dialogues. Notice what each particle connects, how two written particles sound in speech, and which polite verb form the sentence actually uses."
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
    title: "Particles have jobs — and two common spellings have special readings"
    body: "Learn particles inside sentences: は marks the topic, を the direct object, に a destination, and で the place of an action. When は is the topic particle, it is written は but pronounced わ. The object particle を is normally pronounced お in modern standard Japanese."
  - type: teach
    items:
      - { form: "私は学生です。", reading: "わたしは がくせいです。", gloss: "I am a student. Topic は is pronounced わ.", example: "私は学生です。" }
      - { form: "水を飲みます。", reading: "みずを のみます。", gloss: "I drink water. Object を is normally pronounced お.", example: "水を飲みます。" }
      - { form: "学校に行きます。", reading: "がっこうに いきます。", gloss: "I go to school.", example: "学校に行きます。" }
      - { form: "行く → 行きます / 飲む → 飲みます", reading: "いく → いきます / のむ → のみます", gloss: "dictionary-form lemma → polite form used in this lesson", example: "学校に行きます。 / 水を飲みます。" }
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
    explanation: "を marks 水 as the object of 飲みます in this frame."
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
      - id: ja-fnd-grammar-check-particle-sound
        kind: meaning_choice
        prompt: "When は is the topic particle in 私は学生です, which kana shows its pronunciation?"
        choices: ["わ", "は", "が"]
        answer: "わ"
exercise:
  type: type_answer
  prompt: "Type: I go to school."
  answer: "学校に行きます"
  acceptedAnswers: ["学校に行きます。"]
---

The vocabulary list stores dictionary-form verb lemmas such as 行く and 飲む, while the sentence frames deliberately use the polite forms 行きます and 飲みます. Learn these pairs here; later grammar work can generalize conjugation instead of making you guess a universal rule from two verbs.
