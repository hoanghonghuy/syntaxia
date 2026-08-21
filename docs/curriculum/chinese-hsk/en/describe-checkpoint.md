---
id: zh-hsk-b1-u07-checkpoint
track: chinese-hsk
locale: en
slug: describe-checkpoint
title: "Checkpoint: describe something simply"
order: 11
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-describe-07
unit_title: "Describe something simply"
unit_order: 7
unit_can_do: "Describe an object's size or temperature naturally and respond to a simple description question"
unit_role: checkpoint
can_do: "Describe size or temperature naturally with minimal support"
pattern: "这个很大。/ 这个很小。/ 水很热。/ 水很冷。"
objectives:
  - "Recognize size and temperature descriptions by sound"
  - "Produce 很 + adjective without inserting 是"
steps:
  - type: scene
    title: "Compare what you see"
    body: "A classmate points to an object and a cup of water. Describe their size or temperature naturally."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个大吗？", reading: "zhè ge dà ma" }
      - { speaker: "B", text: "不大，很小。", reading: "bú dà, hěn xiǎo" }
      - { speaker: "A", text: "水热吗？", reading: "shuǐ rè ma" }
      - { speaker: "B", text: "不热，水很冷。", reading: "bú rè, shuǐ hěn lěng" }
  - type: listen
    prompt: "Listen first. Which description do you hear?"
    text: "这个很大。"
    reading: "zhè ge hěn dà"
  - type: practice
    id: zh-describe-u07-check-listen
    kind: audio_choice
    prompt: "Listen. Is the water hot or cold?"
    audioText: "水很冷。"
    choices: ["冷", "热", "大"]
    answer: "冷"
  - type: practice
    id: zh-describe-u07-check-natural
    kind: dialogue_choice
    prompt: "Which sentence naturally says “The water is cold”?"
    choices: ["水很冷。", "水是冷。", "很水冷。"]
    answer: "水很冷。"
    explanation: "In this neutral description, use 很 + adjective rather than 是 + adjective."
  - type: practice
    id: zh-describe-u07-check-produce
    kind: type_answer
    prompt: "Type: “This is small.”"
    answer: "这个很小"
    acceptedAnswers: ["这个很小。"]
    hints:
      - "Use 这个 + 很小."
  - type: checkpoint
    items:
      - id: zh-describe-u07-check-hot
        kind: type_answer
        prompt: "Type: “The water is hot.”"
        answer: "水很热"
        acceptedAnswers: ["水很热。"]
      - id: zh-describe-u07-check-big
        kind: audio_choice
        prompt: "Listen. Which size do you hear?"
        audioText: "这个很大。"
        choices: ["大", "小", "冷"]
        answer: "大"
exercise:
  type: type_answer
  prompt: "Type: “The water is cold.”"
  answer: "水很冷"
  acceptedAnswers: ["水很冷。"]
---

The checkpoint checks a usable description pattern and explicitly guards against the beginner error 是 + adjective.
