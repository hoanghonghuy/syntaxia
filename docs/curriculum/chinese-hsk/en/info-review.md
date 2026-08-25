---
id: zh-hsk-b1-u06-review
track: chinese-hsk
locale: en
slug: info-review
title: "Review: ask about people and places"
order: 11
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-info-06
unit_title: "Ask about people and places"
unit_order: 6
unit_can_do: "Ask who or where and answer with a person, place, or destination in a short exchange"
unit_role: review
can_do: "Retrieve who/where questions and place answers without a model"
pattern: "这是谁？ / …在哪里？ / 你去哪里？"
objectives:
  - "Recall the right question word from context"
  - "Rebuild a short person-and-place exchange"
steps:
  - type: scene
    title: "Ask again from memory"
    body: "Later, you need the same kinds of information again. Rebuild the who/where questions without copying a model."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我哥哥。", reading: "zhè shì wǒ gē ge" }
      - { speaker: "A", text: "他在哪里？", reading: "tā zài nǎ lǐ" }
      - { speaker: "B", text: "他在学校。", reading: "tā zài xué xiào" }
      - { speaker: "A", text: "你去哪里？", reading: "nǐ qù nǎ lǐ" }
      - { speaker: "B", text: "我去商店。", reading: "wǒ qù shāng diàn" }
  - type: listen
    prompt: "Listen before reading. Which information is missing?"
    text: "他在哪里？"
    reading: "tā zài nǎ lǐ"
  - type: practice
    id: zh-info-u06-review-listen
    kind: audio_choice
    prompt: "Listen and choose the question word."
    audioText: "你去哪里？"
    choices: ["哪里", "谁", "什么"]
    answer: "哪里"
  - type: practice
    id: zh-info-u06-review-reply
    kind: dialogue_choice
    prompt: "Someone asks 这是谁？ It is your older brother. Which answer works?"
    choices: ["这是我哥哥。", "我去哥哥。", "哥哥在哪里？"]
    answer: "这是我哥哥。"
  - type: practice
    id: zh-info-u06-review-produce
    kind: type_answer
    prompt: "Type: “Where are you going?”"
    answer: "你去哪里"
    acceptedAnswers: ["你去哪里？"]
    hints:
      - "Use 你 + 去 + 哪里."
  - type: checkpoint
    items:
      - id: zh-info-u06-review-person
        kind: audio_choice
        prompt: "Listen. Which question do you hear?"
        audioText: "这是谁？"
        choices: ["这是谁？", "你去哪里？", "她在哪里？"]
        answer: "这是谁？"
      - id: zh-info-u06-review-place
        kind: dialogue_choice
        prompt: "Someone asks 她在哪里？ She is at school. What do you say?"
        choices: ["她在学校。", "她去谁。", "她是哪里。"]
        answer: "她在学校。"
exercise:
  type: type_answer
  prompt: "Type: “Where is he?”"
  answer: "他在哪里"
  acceptedAnswers: ["他在哪里？"]
---

Review is retrieval: decide whether the missing information is a person or a place, then produce the right question or answer.
