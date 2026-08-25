---
id: zh-hsk-b1-08-places
track: chinese-hsk
locale: en
slug: places
title: "Say where you are going"
order: 8
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-info-06
unit_title: "Ask about people and places"
unit_order: 6
unit_can_do: "Ask who or where and answer with a person, place, or destination in a short exchange"
unit_role: lesson
can_do: "Ask where someone is going and answer with a common place"
pattern: "你去哪里？ / 我去… / 我回家。"
objectives:
  - "Recognize common places"
  - "Ask and answer a simple where-going question"
vocab:
  - { hanzi: "商店", pinyin: "shāng diàn", gloss: "shop / store" }
  - { hanzi: "医院", pinyin: "yī yuàn", gloss: "hospital" }
  - { hanzi: "学校", pinyin: "xué xiào", gloss: "school" }
  - { hanzi: "家", pinyin: "jiā", gloss: "home" }
  - { hanzi: "去", pinyin: "qù", gloss: "to go" }
  - { hanzi: "在", pinyin: "zài", gloss: "to be at / in" }
  - { hanzi: "回家", pinyin: "huí jiā", gloss: "go home" }
  - { hanzi: "哪里", pinyin: "nǎ lǐ", gloss: "where" }
steps:
  - type: scene
    title: "Situation"
    body: "Class has ended. A friend asks where you are going next."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你去哪里？", reading: "nǐ qù nǎ lǐ" }
      - { speaker: "B", text: "我去商店。你呢？", reading: "wǒ qù shāng diàn. nǐ ne" }
      - { speaker: "A", text: "我回家。", reading: "wǒ huí jiā" }
      - { speaker: "B", text: "好，再见！", reading: "hǎo, zài jiàn" }
  - type: listen
    prompt: "Listen for the destination."
    text: "我去商店。"
    reading: "wǒ qù shāng diàn"
  - type: tip
    title: "去 + destination; 回家 as one chunk"
    body: "Use 我去 + place for a destination. 回家 is commonly used without 去: 我回家. Keep these as separate useful chunks."
  - type: teach
    items:
      - { form: "我去商店。", reading: "wǒ qù shāng diàn", gloss: "I go to the shop.", example: "我去商店。" }
      - { form: "我去医院。", reading: "wǒ qù yī yuàn", gloss: "I go to the hospital.", example: "我去医院。" }
      - { form: "我在学校。", reading: "wǒ zài xué xiào", gloss: "I am at school.", example: "我在学校。" }
      - { form: "我回家。", reading: "wǒ huí jiā", gloss: "I go home.", example: "我回家。" }
  - type: practice
    id: zh-place-reply-1
    kind: dialogue_choice
    prompt: "Someone asks 你去哪里？ You are going to the shop. What do you say?"
    choices: ["我去商店。", "我是商店。", "我要商店。"]
    answer: "我去商店。"
  - type: practice
    id: zh-place-listen-1
    kind: audio_choice
    prompt: "Listen. Where is the person going?"
    audioText: "我去医院。"
    choices: ["医院", "学校", "商店"]
    answer: "医院"
  - type: practice
    id: zh-place-produce-1
    kind: type_answer
    prompt: "Type: “I go home.”"
    answer: "我回家"
    acceptedAnswers: ["我回家。"]
    hints:
      - "Use the chunk 回家."
  - type: checkpoint
    items:
      - id: zh-place-check-1
        kind: meaning_choice
        prompt: "Which word asks “where”?"
        choices: ["哪里", "什么", "谁"]
        answer: "哪里"
      - id: zh-place-check-2
        kind: dialogue_choice
        prompt: "Review: at a counter you want water. What can you say?"
        choices: ["我要水。", "我去水。", "我是水。"]
        answer: "我要水。"
exercise:
  type: dialogue_choice
  prompt: "Which answer says “I go to the shop”?"
  choices: ["我去商店。", "我回家。", "我在学校。"]
  answer: "我去商店。"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
