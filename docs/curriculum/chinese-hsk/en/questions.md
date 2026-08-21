---
id: zh-hsk-b1-09-questions
track: chinese-hsk
locale: en
slug: questions
title: "Ask what, who, and where"
order: 9
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-info-06
unit_title: "Ask about people and places"
unit_order: 6
unit_can_do: "Ask who or where and answer with a person, place, or destination in a short exchange"
unit_role: lesson
can_do: "Use basic question words and a yes/no question in a short exchange"
pattern: "什么 / 谁 / 哪里 / …吗？ / …呢？"
objectives:
  - "Ask what / who / where"
  - "Use 吗 for a yes/no question and 呢 for a follow-up"
vocab:
  - { hanzi: "什么", pinyin: "shén me", gloss: "what" }
  - { hanzi: "谁", pinyin: "shéi", gloss: "who" }
  - { hanzi: "哪里", pinyin: "nǎ lǐ", gloss: "where" }
  - { hanzi: "几", pinyin: "jǐ", gloss: "how many / what number" }
  - { hanzi: "吗", pinyin: "ma", gloss: "yes/no question particle" }
  - { hanzi: "呢", pinyin: "ne", gloss: "follow-up particle" }
steps:
  - type: scene
    title: "Situation"
    body: "You are looking at a class photo and asking about people and places."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我姐姐。", reading: "zhè shì wǒ jiě jie" }
      - { speaker: "A", text: "她在哪里？", reading: "tā zài nǎ lǐ" }
      - { speaker: "B", text: "她在学校。", reading: "tā zài xué xiào" }
      - { speaker: "A", text: "她是老师吗？", reading: "tā shì lǎo shī ma" }
      - { speaker: "B", text: "是。", reading: "shì" }
  - type: listen
    prompt: "Listen for the question word."
    text: "她在哪里？"
    reading: "tā zài nǎ lǐ"
  - type: tip
    title: "Question words stay in the answer position"
    body: "Compare 她在学校 and 她在哪里？ The question word 哪里 replaces the unknown place. 吗 turns a statement into a yes/no question."
  - type: teach
    items:
      - { form: "什么", reading: "shén me", gloss: "what", example: "这是什么？" }
      - { form: "谁", reading: "shéi", gloss: "who", example: "这是谁？" }
      - { form: "哪里", reading: "nǎ lǐ", gloss: "where", example: "她在哪里？" }
      - { form: "吗", reading: "ma", gloss: "yes/no question particle", example: "她是老师吗？" }
  - type: practice
    id: zh-question-where-1
    kind: dialogue_choice
    prompt: "You want to ask where she is. Which question is correct?"
    choices: ["她在哪里？", "她是谁？", "她是什么？"]
    answer: "她在哪里？"
  - type: practice
    id: zh-question-listen-1
    kind: audio_choice
    prompt: "Listen. Which question word do you hear?"
    audioText: "这是谁？"
    choices: ["谁", "什么", "哪里"]
    answer: "谁"
  - type: practice
    id: zh-question-produce-1
    kind: type_answer
    prompt: "Type: “Who is this?”"
    answer: "这是谁"
    acceptedAnswers: ["这是谁？"]
    hints:
      - "Use 这 + 是 + 谁."
  - type: checkpoint
    items:
      - id: zh-question-check-1
        kind: meaning_choice
        prompt: "Which particle makes a yes/no question?"
        choices: ["吗", "呢", "谁"]
        answer: "吗"
      - id: zh-question-check-2
        kind: dialogue_choice
        prompt: "Review: someone asks 你去哪里？ You go home. What do you say?"
        choices: ["我回家。", "我是谁？", "我要茶。"]
        answer: "我回家。"
exercise:
  type: dialogue_choice
  prompt: "Which word asks “who”?"
  choices: ["谁", "什么", "哪里"]
  answer: "谁"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
