---
id: zh-hsk-b1-07-food-drink
track: chinese-hsk
locale: en
slug: food-drink
title: "Order a simple drink or food item"
order: 7
published: true
hsk_band: 1
hsk_version: "3.0"
can_do: "Ask for a basic drink or food item and respond politely at a counter"
pattern: "我要… / 喝水 / 吃米饭"
objectives:
  - "Recognize common food and drink words"
  - "Use 我要 + item as a simple request"
vocab:
  - { hanzi: "水", pinyin: "shuǐ", gloss: "water" }
  - { hanzi: "茶", pinyin: "chá", gloss: "tea" }
  - { hanzi: "米饭", pinyin: "mǐ fàn", gloss: "cooked rice / meal" }
  - { hanzi: "苹果", pinyin: "píng guǒ", gloss: "apple" }
  - { hanzi: "吃", pinyin: "chī", gloss: "to eat" }
  - { hanzi: "喝", pinyin: "hē", gloss: "to drink" }
  - { hanzi: "要", pinyin: "yào", gloss: "to want / would like" }
steps:
  - type: scene
    title: "Situation"
    body: "You are at a simple food counter and need a drink and something to eat."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好。你要什么？", reading: "nǐ hǎo. nǐ yào shén me" }
      - { speaker: "B", text: "我要茶。", reading: "wǒ yào chá" }
      - { speaker: "A", text: "还要米饭吗？", reading: "hái yào mǐ fàn ma" }
      - { speaker: "B", text: "要，谢谢。", reading: "yào, xiè xie" }
  - type: listen
    prompt: "Listen for the item being requested."
    text: "我要茶。"
    reading: "wǒ yào chá"
  - type: tip
    title: "Use a usable request, not a word list"
    body: "我要 + item is a direct beginner-friendly request in a counter context. Learn 喝 with liquids and 吃 with food so the nouns immediately enter sentences."
  - type: teach
    items:
      - { form: "我要茶。", reading: "wǒ yào chá", gloss: "I would like tea.", example: "我要茶。" }
      - { form: "我喝水。", reading: "wǒ hē shuǐ", gloss: "I drink water.", example: "我喝水。" }
      - { form: "我吃米饭。", reading: "wǒ chī mǐ fàn", gloss: "I eat rice.", example: "我吃米饭。" }
      - { form: "苹果", reading: "píng guǒ", gloss: "apple", example: "我要苹果。" }
  - type: practice
    id: zh-food-reply-1
    kind: dialogue_choice
    prompt: "At the counter, you want tea. What can you say?"
    choices: ["我要茶。", "我是茶。", "茶在哪里？"]
    answer: "我要茶。"
  - type: practice
    id: zh-food-listen-1
    kind: audio_choice
    prompt: "Listen and choose the drink."
    audioText: "茶"
    choices: ["茶", "水", "米饭"]
    answer: "茶"
  - type: practice
    id: zh-food-produce-1
    kind: type_answer
    prompt: "Type: “I want water.”"
    answer: "我要水"
    acceptedAnswers: ["我要水。"]
    hints:
      - "Use 我要 + 水."
  - type: checkpoint
    items:
      - id: zh-food-check-1
        kind: meaning_choice
        prompt: "Which verb goes with a liquid such as water?"
        choices: ["喝", "吃", "学习"]
        answer: "喝"
      - id: zh-food-check-2
        kind: dialogue_choice
        prompt: "Review: someone asks 你是学生吗？ Choose a positive reply."
        choices: ["是，我是学生。", "我要茶。", "不客气。"]
        answer: "是，我是学生。"
exercise:
  type: dialogue_choice
  prompt: "Which sentence asks for tea?"
  choices: ["我要茶。", "我喝学校。", "我是米饭。"]
  answer: "我要茶。"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
