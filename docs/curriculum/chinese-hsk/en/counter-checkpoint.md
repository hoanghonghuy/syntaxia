---
id: zh-hsk-b1-u05-checkpoint
track: chinese-hsk
locale: en
slug: counter-checkpoint
title: "Checkpoint: order at a counter"
order: 8
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-counter-05
unit_title: "Order at a counter"
unit_order: 5
unit_can_do: "Order a simple food or drink item and respond to a short follow-up at a counter"
unit_role: checkpoint
can_do: "Complete a short counter order with minimal support"
pattern: "我要… / 还要…吗？ / 要，谢谢。"
objectives:
  - "Recognize the requested item by sound"
  - "Make and continue a short counter request"
steps:
  - type: scene
    title: "A quick order"
    body: "You are at a small counter. Order a drink and answer when the server asks whether you want another item."
  - type: dialogue
    lines:
      - { speaker: "Server", text: "你要什么？", reading: "nǐ yào shén me" }
      - { speaker: "You", text: "我要水。", reading: "wǒ yào shuǐ" }
      - { speaker: "Server", text: "还要苹果吗？", reading: "hái yào píng guǒ ma" }
      - { speaker: "You", text: "要，谢谢。", reading: "yào, xiè xie" }
  - type: listen
    prompt: "Listen first. Which item does the customer ask for?"
    text: "我要茶。"
    reading: "wǒ yào chá"
  - type: practice
    id: zh-counter-u05-check-listen
    kind: audio_choice
    prompt: "Listen and choose the requested item."
    audioText: "我要水。"
    choices: ["水", "茶", "米饭"]
    answer: "水"
  - type: practice
    id: zh-counter-u05-check-reply
    kind: dialogue_choice
    prompt: "The server asks 你要什么？ You want tea. What do you say?"
    choices: ["我要茶。", "我是茶。", "我在茶。"]
    answer: "我要茶。"
  - type: practice
    id: zh-counter-u05-check-produce
    kind: type_answer
    prompt: "Type: “I want an apple.”"
    answer: "我要苹果"
    acceptedAnswers: ["我要苹果。"]
    hints:
      - "Use 我要 + 苹果."
  - type: checkpoint
    items:
      - id: zh-counter-u05-check-followup
        kind: dialogue_choice
        prompt: "The server asks 还要米饭吗？ You want it. Which reply works?"
        choices: ["要，谢谢。", "我叫米饭。", "米饭在哪里？"]
        answer: "要，谢谢。"
      - id: zh-counter-u05-check-drink
        kind: audio_choice
        prompt: "Listen and choose the drink."
        audioText: "茶"
        choices: ["茶", "苹果", "米饭"]
        answer: "茶"
exercise:
  type: type_answer
  prompt: "Type: “I want water.”"
  answer: "我要水"
  acceptedAnswers: ["我要水。"]
---

The checkpoint measures whether you can carry a tiny counter exchange, not whether you can recite food words.
