---
id: zh-hsk-b1-04-family
track: chinese-hsk
locale: en
slug: family
title: "Introduce people in your family"
order: 4
published: true
hsk_band: 1
hsk_version: "3.0"
can_do: "Point out and introduce close family members in a simple photo conversation"
pattern: "这是我… / 我家…"
objectives:
  - "Introduce a close family member"
  - "Use 家 to talk about family / home"
vocab:
  - { hanzi: "家", pinyin: "jiā", gloss: "home / family" }
  - { hanzi: "爸爸", pinyin: "bà ba", gloss: "dad" }
  - { hanzi: "妈妈", pinyin: "mā ma", gloss: "mom" }
  - { hanzi: "哥哥", pinyin: "gē ge", gloss: "older brother" }
  - { hanzi: "姐姐", pinyin: "jiě jie", gloss: "older sister" }
  - { hanzi: "弟弟", pinyin: "dì di", gloss: "younger brother" }
  - { hanzi: "妹妹", pinyin: "mèi mei", gloss: "younger sister" }
steps:
  - type: scene
    title: "Situation"
    body: "A classmate sees a family photo on your phone and asks who the people are."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我妈妈。", reading: "zhè shì wǒ mā ma" }
      - { speaker: "A", text: "他呢？", reading: "tā ne" }
      - { speaker: "B", text: "他是我哥哥。", reading: "tā shì wǒ gē ge" }
  - type: listen
    prompt: "Listen for the chunk that introduces a family member."
    text: "这是我妈妈。"
    reading: "zhè shì wǒ mā ma"
  - type: tip
    title: "Use a whole introduction pattern"
    body: "这是我 + family word is a useful chunk. In everyday Chinese, 的 is often omitted before close-family words such as 妈妈 or 爸爸."
  - type: teach
    items:
      - { form: "这是我妈妈。", reading: "zhè shì wǒ mā ma", gloss: "This is my mom.", example: "这是我妈妈。" }
      - { form: "这是我爸爸。", reading: "zhè shì wǒ bà ba", gloss: "This is my dad.", example: "这是我爸爸。" }
      - { form: "他是我哥哥。", reading: "tā shì wǒ gē ge", gloss: "He is my older brother.", example: "他是我哥哥。" }
      - { form: "她是我姐姐。", reading: "tā shì wǒ jiě jie", gloss: "She is my older sister.", example: "她是我姐姐。" }
  - type: practice
    id: zh-family-reply-1
    kind: dialogue_choice
    prompt: "A classmate asks 这是谁？ Choose a natural answer for your mother."
    choices: ["这是我妈妈。", "我是三号。", "再见。"]
    answer: "这是我妈妈。"
  - type: practice
    id: zh-family-listen-1
    kind: audio_choice
    prompt: "Listen. Who is being introduced?"
    audioText: "他是我哥哥。"
    choices: ["哥哥", "姐姐", "妈妈"]
    answer: "哥哥"
  - type: practice
    id: zh-family-produce-1
    kind: type_answer
    prompt: "Type: “This is my dad.”"
    answer: "这是我爸爸"
    acceptedAnswers: ["这是我爸爸。"]
    hints:
      - "Use 这是我 + 爸爸."
  - type: checkpoint
    items:
      - id: zh-family-check-1
        kind: meaning_choice
        prompt: "Which word means “older sister”?"
        choices: ["姐姐", "妹妹", "妈妈"]
        answer: "姐姐"
      - id: zh-family-check-2
        kind: audio_choice
        prompt: "Review: listen and choose the number."
        audioText: "三"
        choices: ["三", "五", "八"]
        answer: "三"
exercise:
  type: dialogue_choice
  prompt: "Which sentence introduces your mother?"
  choices: ["这是我妈妈。", "这是我哥哥。", "我是三号。"]
  answer: "这是我妈妈。"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
