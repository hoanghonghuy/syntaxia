---
id: zh-hsk-b1-u08-checkpoint
track: chinese-hsk
locale: en
slug: travel-checkpoint
title: "Checkpoint: say how you travel"
order: 12
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-travel-08
unit_title: "Say how you travel"
unit_order: 8
unit_can_do: "Ask how someone is traveling and answer with a train, plane, or taxi choice"
unit_role: checkpoint
can_do: "Answer a simple how-you-travel question with minimal support"
pattern: "你怎么去？ / 我坐火车。 / 我坐飞机。 / 我打车。"
objectives:
  - "Recognize a transport choice by sound"
  - "Choose 坐 + vehicle or the fixed chunk 打车"
steps:
  - type: scene
    title: "Choose how to go"
    body: "A friend asks how you will travel. Answer with the transport you plan to use."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你怎么去？", reading: "nǐ zěn me qù" }
      - { speaker: "B", text: "我坐火车。", reading: "wǒ zuò huǒ chē" }
      - { speaker: "A", text: "他呢？", reading: "tā ne" }
      - { speaker: "B", text: "他打车。", reading: "tā dǎ chē" }
  - type: listen
    prompt: "Listen first. Which transport choice do you hear?"
    text: "我坐飞机。"
    reading: "wǒ zuò fēi jī"
  - type: practice
    id: zh-travel-u08-check-listen
    kind: audio_choice
    prompt: "Listen and choose the transport."
    audioText: "我坐火车。"
    choices: ["火车", "飞机", "打车"]
    answer: "火车"
  - type: practice
    id: zh-travel-u08-check-reply
    kind: dialogue_choice
    prompt: "Someone asks 你怎么去？ You are taking a plane. What do you say?"
    choices: ["我坐飞机。", "我是飞机。", "我去飞机。"]
    answer: "我坐飞机。"
  - type: practice
    id: zh-travel-u08-check-produce
    kind: type_answer
    prompt: "Type: “I take a taxi.”"
    answer: "我打车"
    acceptedAnswers: ["我打车。"]
    hints:
      - "Use the fixed chunk 打车, without 坐."
  - type: checkpoint
    items:
      - id: zh-travel-u08-check-train
        kind: type_answer
        prompt: "Type: “I take the train.”"
        answer: "我坐火车"
        acceptedAnswers: ["我坐火车。"]
      - id: zh-travel-u08-check-question
        kind: audio_choice
        prompt: "Listen. Which question do you hear?"
        audioText: "你怎么去？"
        choices: ["你怎么去？", "你去哪里？", "这是谁？"]
        answer: "你怎么去？"
exercise:
  type: type_answer
  prompt: "Type: “I take a plane.”"
  answer: "我坐飞机"
  acceptedAnswers: ["我坐飞机。"]
---

The checkpoint tests a real travel choice: understand how the person is going and answer with the correct transport chunk.
