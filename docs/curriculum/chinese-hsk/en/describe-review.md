---
id: zh-hsk-b1-u07-review
track: chinese-hsk
locale: en
slug: describe-review
title: "Review: describe something simply"
order: 12
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-describe-07
unit_title: "Describe something simply"
unit_order: 7
unit_can_do: "Describe an object's size or temperature naturally and respond to a simple description question"
unit_role: review
can_do: "Retrieve natural size and temperature descriptions without a model"
pattern: "很大 / 很小 / 很热 / 很冷"
objectives:
  - "Recall a description from sound"
  - "Rebuild natural 很 + adjective sentences from memory"
steps:
  - type: scene
    title: "Describe it again"
    body: "Later, you compare another object and another drink. Describe them without copying the earlier model."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个小吗？", reading: "zhè ge xiǎo ma" }
      - { speaker: "B", text: "不小，很大。", reading: "bù xiǎo, hěn dà" }
      - { speaker: "A", text: "水冷吗？", reading: "shuǐ lěng ma" }
      - { speaker: "B", text: "不冷，水很热。", reading: "bù lěng, shuǐ hěn rè" }
  - type: listen
    prompt: "Listen before reading. Which description do you hear?"
    text: "这个很小。"
    reading: "zhè ge hěn xiǎo"
  - type: practice
    id: zh-describe-u07-review-listen
    kind: audio_choice
    prompt: "Listen. Which description matches?"
    audioText: "水很热。"
    choices: ["热", "冷", "小"]
    answer: "热"
  - type: practice
    id: zh-describe-u07-review-natural
    kind: dialogue_choice
    prompt: "Which sentence naturally describes a big object?"
    choices: ["这个很大。", "这个是大。", "大是这个。"]
    answer: "这个很大。"
  - type: practice
    id: zh-describe-u07-review-produce
    kind: type_answer
    prompt: "Type: “The water is cold.”"
    answer: "水很冷"
    acceptedAnswers: ["水很冷。"]
    hints:
      - "Use 水 + 很冷; do not insert 是."
  - type: checkpoint
    items:
      - id: zh-describe-u07-review-small
        kind: type_answer
        prompt: "Type: “This is small.”"
        answer: "这个很小"
        acceptedAnswers: ["这个很小。"]
      - id: zh-describe-u07-review-error
        kind: dialogue_choice
        prompt: "Which sentence avoids the beginner error 是 + adjective?"
        choices: ["水很冷。", "水是冷。", "水冷是。"]
        answer: "水很冷。"
exercise:
  type: type_answer
  prompt: "Type: “This is big.”"
  answer: "这个很大"
  acceptedAnswers: ["这个很大。"]
---

Review means retrieving the natural description pattern from memory and keeping 是 out of simple adjective descriptions.
