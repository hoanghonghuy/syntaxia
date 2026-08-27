---
id: zh-hsk-b1-10-adjectives
track: chinese-hsk
locale: en
slug: adjectives
title: "Describe size and temperature simply"
order: 10
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-describe-07
unit_title: "Describe something simply"
unit_order: 7
unit_can_do: "Describe an object's size or temperature naturally and respond to a simple description question"
unit_role: lesson
can_do: "Describe something as big/small or hot/cold with a natural beginner sentence"
pattern: "很大 / 很小 / 很热 / 很冷"
objectives:
  - "Use 很 + adjective in a neutral description"
  - "Contrast 大 / 小 and 热 / 冷"
vocab:
  - { hanzi: "大", pinyin: "dà", gloss: "big" }
  - { hanzi: "小", pinyin: "xiǎo", gloss: "small" }
  - { hanzi: "热", pinyin: "rè", gloss: "hot" }
  - { hanzi: "冷", pinyin: "lěng", gloss: "cold" }
  - { hanzi: "好", pinyin: "hǎo", gloss: "good" }
  - { hanzi: "多", pinyin: "duō", gloss: "many / much" }
  - { hanzi: "少", pinyin: "shǎo", gloss: "few / little" }
  - { hanzi: "很", pinyin: "hěn", gloss: "very / linking adverb" }
steps:
  - type: scene
    title: "See the contrast, then build the description"
    body: "Compare big with small and hot with cold. Then use the same three-part frame to describe something naturally: subject + 很 + adjective."
    imageUrl: "/language/scenes/mandarin-adjective-contrasts.svg"
    imageAlt: "A large circle contrasts with a small circle beside 大 and 小; hot and cold symbols contrast beside 热 and 冷; below, 水 points to 很 and then 冷 to show the frame 水很冷."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个大吗？", reading: "zhè ge dà ma" }
      - { speaker: "B", text: "不大，很小。", reading: "bú dà, hěn xiǎo" }
      - { speaker: "A", text: "水热吗？", reading: "shuǐ rè ma" }
      - { speaker: "B", text: "不热，很冷。", reading: "bú rè, hěn lěng" }
  - type: listen
    prompt: "Listen for the temperature description."
    text: "水很冷。"
    reading: "shuǐ hěn lěng"
  - type: tip
    title: "Do not insert 是 before a simple adjective"
    body: "In a neutral description, 很 commonly links the subject and adjective: 水很冷, 这个很大. Avoid the beginner error *水是冷."
  - type: teach
    items:
      - { form: "很大", reading: "hěn dà", gloss: "big / quite big", example: "这个很大。" }
      - { form: "很小", reading: "hěn xiǎo", gloss: "small", example: "这个很小。" }
      - { form: "很热", reading: "hěn rè", gloss: "hot", example: "水很热。" }
      - { form: "很冷", reading: "hěn lěng", gloss: "cold", example: "水很冷。" }
  - type: practice
    id: zh-adj-natural-1
    kind: dialogue_choice
    prompt: "Which is the natural beginner sentence for “The water is cold”?"
    choices: ["水很冷。", "水是冷。", "水冷是。"]
    answer: "水很冷。"
    explanation: "Use 很 + adjective in this neutral description, not 是 + adjective."
  - type: practice
    id: zh-adj-listen-1
    kind: audio_choice
    prompt: "Listen. Is the object big or small?"
    audioText: "这个很小。"
    choices: ["小", "大", "热"]
    answer: "小"
  - type: practice
    id: zh-adj-produce-1
    kind: type_answer
    prompt: "Type: “The water is hot.”"
    answer: "水很热"
    acceptedAnswers: ["水很热。"]
    hints:
      - "Use 水 + 很热."
  - type: checkpoint
    items:
      - id: zh-adj-check-1
        kind: meaning_choice
        prompt: "Which word means “small”?"
        choices: ["小", "大", "多"]
        answer: "小"
      - id: zh-adj-check-2
        kind: dialogue_choice
        prompt: "Review: which question asks “Where is she?”"
        choices: ["她在哪里？", "她是谁？", "她是老师吗？"]
        answer: "她在哪里？"
exercise:
  type: dialogue_choice
  prompt: "Which sentence naturally says “This is big”?"
  choices: ["这个很大。", "这个是大。", "很这个大。"]
  answer: "这个很大。"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
