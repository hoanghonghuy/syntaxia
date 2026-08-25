---
id: ja-n5-fnd-05-foundation-review
track: japanese-jlpt
locale: en
slug: foundation-review
title: Retrieve Japanese foundations
order: -1
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Japanese foundation"
unit_order: 0
unit_can_do: "Read, hear, and build basic Japanese forms before the communicative units"
unit_role: review
foundation_focus: review
can_do: "Retrieve kana, sound length, and core sentence patterns after a delay"
pattern: "hear -> read/write -> build -> retrieve later"
objectives:
  - Retrieve a kana reading from sound
  - Preserve small っ or long-vowel spelling
  - Rebuild a basic polite sentence
vocab:
  - { surface: "朝", reading: "あさ", gloss: "morning" }
  - { surface: "切符", reading: "きっぷ", gloss: "ticket" }
  - { surface: "学校", reading: "がっこう", gloss: "school" }
  - { surface: "学生", reading: "がくせい", gloss: "student" }
  - { surface: "水", reading: "みず", gloss: "water" }
steps:
  - type: scene
    title: "Recall before Unit 1"
    body: "Retrieve the foundations from memory so later dialogues do not depend on constant scaffolding."
  - type: dialogue
    lines:
      - { speaker: "A", text: "私は学生です。", reading: "わたしは がくせいです。" }
      - { speaker: "B", text: "学校に行きます。", reading: "がっこうに いきます。" }
  - type: listen
    prompt: "Listen and type what you hear without looking back."
    text: "がっこう"
    reading: "がっこう"
  - type: practice
    id: ja-fnd-review-hear-school
    kind: listen_type
    prompt: "Listen and type the word."
    audioText: "がっこう"
    answer: "がっこう"
  - type: practice
    id: ja-fnd-review-read-ticket
    kind: type_answer
    prompt: "Type the reading of 切符."
    answer: "きっぷ"
  - type: practice
    id: ja-fnd-review-build-student
    kind: order_words
    prompt: "Build: I am a student."
    tokens: ["私は", "学生です"]
    answer: "私は学生です"
    acceptedAnswers: ["私は学生です。"]
  - type: checkpoint
    items:
      - id: ja-fnd-review-particle-ni
        kind: meaning_choice
        prompt: "Choose the destination particle: 学校＿行きます。"
        choices: ["に", "を", "で"]
        answer: "に"
      - id: ja-fnd-review-kana-morning
        kind: type_answer
        prompt: "Type the reading of 朝."
        answer: "あさ"
exercise:
  type: type_answer
  prompt: "Type the reading of 学校."
  answer: "がっこう"
---

These stable review items seed the same FSRS memory system as the later N5 units.
