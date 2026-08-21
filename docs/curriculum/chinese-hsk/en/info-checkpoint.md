---
id: zh-hsk-b1-u06-checkpoint
track: chinese-hsk
locale: en
slug: info-checkpoint
title: "Checkpoint: ask about people and places"
order: 10
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-info-06
unit_title: "Ask about people and places"
unit_order: 6
unit_can_do: "Ask who or where and answer with a person, place, or destination in a short exchange"
unit_role: checkpoint
can_do: "Ask and answer basic who/where questions with minimal support"
pattern: "这是谁？ / 她在哪里？ / 你去哪里？"
objectives:
  - "Choose the right question for a missing person or place"
  - "Answer a destination question with a useful chunk"
steps:
  - type: scene
    title: "Ask for the missing information"
    body: "You are looking at a class photo, then leaving class. Ask who a person is, where she is, and where your classmate is going."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我姐姐。", reading: "zhè shì wǒ jiě jie" }
      - { speaker: "A", text: "她在哪里？", reading: "tā zài nǎ lǐ" }
      - { speaker: "B", text: "她在学校。", reading: "tā zài xué xiào" }
      - { speaker: "A", text: "你去哪里？", reading: "nǐ qù nǎ lǐ" }
      - { speaker: "B", text: "我回家。", reading: "wǒ huí jiā" }
  - type: listen
    prompt: "Listen first. Is the speaker asking who or where?"
    text: "她在哪里？"
    reading: "tā zài nǎ lǐ"
  - type: practice
    id: zh-info-u06-check-listen
    kind: audio_choice
    prompt: "Listen and choose the question word you hear."
    audioText: "这是谁？"
    choices: ["谁", "哪里", "什么"]
    answer: "谁"
  - type: practice
    id: zh-info-u06-check-reply
    kind: dialogue_choice
    prompt: "Someone asks 你去哪里？ You are going home. What do you say?"
    choices: ["我回家。", "我是谁？", "我在谁。"]
    answer: "我回家。"
  - type: practice
    id: zh-info-u06-check-produce
    kind: type_answer
    prompt: "Type: “Where is she?”"
    answer: "她在哪里"
    acceptedAnswers: ["她在哪里？"]
    hints:
      - "Use 她 + 在 + 哪里."
  - type: checkpoint
    items:
      - id: zh-info-u06-check-who
        kind: dialogue_choice
        prompt: "You do not know who the person is. Which question works?"
        choices: ["这是谁？", "你去哪里？", "这是哪里？"]
        answer: "这是谁？"
      - id: zh-info-u06-check-destination
        kind: audio_choice
        prompt: "Listen. Where is the person going?"
        audioText: "我去医院。"
        choices: ["医院", "学校", "商店"]
        answer: "医院"
exercise:
  type: type_answer
  prompt: "Type: “Who is this?”"
  answer: "这是谁"
  acceptedAnswers: ["这是谁？"]
---

The checkpoint tests information gaps: choose the question that matches what is unknown, then understand or give the missing person/place information.
