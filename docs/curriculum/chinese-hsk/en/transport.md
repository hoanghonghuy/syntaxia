---
id: zh-hsk-b1-11-transport
track: chinese-hsk
locale: en
slug: transport
title: "Say how you are traveling"
order: 11
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-travel-08
unit_title: "Say how you travel"
unit_order: 8
unit_can_do: "Ask how someone is traveling and answer with a train, plane, or taxi choice"
unit_role: lesson
can_do: "Say whether you are taking a train, plane, or taxi in a short travel exchange"
pattern: "我坐火车。/ 我坐飞机。/ 我打车。"
objectives:
  - "Recognize common transport words"
  - "Use 坐 + vehicle and 打车 in a travel plan"
vocab:
  - { hanzi: "车", pinyin: "chē", gloss: "vehicle / car" }
  - { hanzi: "火车", pinyin: "huǒ chē", gloss: "train" }
  - { hanzi: "飞机", pinyin: "fēi jī", gloss: "airplane" }
  - { hanzi: "车站", pinyin: "chē zhàn", gloss: "station" }
  - { hanzi: "打车", pinyin: "dǎ chē", gloss: "take a taxi" }
  - { hanzi: "坐", pinyin: "zuò", gloss: "to ride / take transport" }
steps:
  - type: scene
    title: "Situation"
    body: "You and a friend compare how you will travel."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你怎么去？", reading: "nǐ zěn me qù" }
      - { speaker: "B", text: "我坐火车。你呢？", reading: "wǒ zuò huǒ chē. nǐ ne" }
      - { speaker: "A", text: "我坐飞机。", reading: "wǒ zuò fēi jī" }
      - { speaker: "B", text: "好，路上见。", reading: "hǎo, lù shang jiàn" }
  - type: listen
    prompt: "Listen for the transport choice."
    text: "我坐火车。"
    reading: "wǒ zuò huǒ chē"
  - type: tip
    title: "坐 + transport; 打车 is a fixed chunk"
    body: "Use 坐 before a train or plane: 坐火车, 坐飞机. Learn 打车 as one chunk for taking a taxi."
  - type: teach
    items:
      - { form: "坐火车", reading: "zuò huǒ chē", gloss: "take the train", example: "我坐火车。" }
      - { form: "坐飞机", reading: "zuò fēi jī", gloss: "take a plane", example: "我坐飞机。" }
      - { form: "打车", reading: "dǎ chē", gloss: "take a taxi", example: "我打车。" }
      - { form: "车站", reading: "chē zhàn", gloss: "station", example: "我去车站。" }
  - type: practice
    id: zh-transport-reply-1
    kind: dialogue_choice
    prompt: "You are taking the train. What can you say?"
    choices: ["我坐火车。", "我是火车。", "我要火车。"]
    answer: "我坐火车。"
  - type: practice
    id: zh-transport-listen-1
    kind: audio_choice
    prompt: "Listen. Which transport do you hear?"
    audioText: "我坐飞机。"
    choices: ["飞机", "火车", "车站"]
    answer: "飞机"
  - type: practice
    id: zh-transport-produce-1
    kind: type_answer
    prompt: "Type: “I take the train.”"
    answer: "我坐火车"
    acceptedAnswers: ["我坐火车。"]
    hints:
      - "Use 我坐 + 火车."
  - type: checkpoint
    items:
      - id: zh-transport-check-1
        kind: meaning_choice
        prompt: "Which chunk means “take a taxi”?"
        choices: ["打车", "车站", "坐飞机"]
        answer: "打车"
      - id: zh-transport-check-2
        kind: dialogue_choice
        prompt: "Review: choose the natural sentence for “The water is cold.”"
        choices: ["水很冷。", "水是冷。", "水冷是。"]
        answer: "水很冷。"
exercise:
  type: dialogue_choice
  prompt: "Which sentence says you take a plane?"
  choices: ["我坐飞机。", "我坐火车。", "我打车。"]
  answer: "我坐飞机。"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
