---
id: ja-n5-u04-checkpoint
track: japanese-jlpt
locale: en
slug: cafe-checkpoint
title: "Checkpoint: order at a café"
order: 11
published: true
jlpt_level: n5
unit_id: ja-n5-cafe-04
unit_title: "Order at a café"
unit_order: 4
unit_can_do: "Ask for one food or drink and close a short counter exchange politely"
unit_role: checkpoint
can_do: "Ask for a chosen item and thank the clerk with minimal support"
pattern: "Nをください。 / ありがとうございます。"
objectives:
  - "Recognize the requested item by sound"
  - "Produce item + をください and close politely"
steps:
  - type: scene
    title: "At the café counter"
    body: "Choose one item, ask for it, then thank the clerk when it is handed to you."
  - type: dialogue
    lines:
      - { speaker: "客", text: "コーヒーをください。", reading: "コーヒーをください。" }
      - { speaker: "店員", text: "はい、どうぞ。", reading: "はい、どうぞ。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen first. Which item is requested?"
    text: "お茶をください。"
    reading: "おちゃをください。"
  - type: practice
    id: ja-cafe-u04-check-listen
    kind: audio_choice
    prompt: "Listen and choose the requested item."
    audioText: "水をください"
    choices: ["水", "お茶", "パン"]
    answer: "水"
  - type: practice
    id: ja-cafe-u04-check-request
    kind: type_answer
    prompt: "You want tea. Type the complete request."
    answer: "お茶をください"
    acceptedAnswers: ["お茶をください。"]
    hints:
      - "Put お茶 before をください."
  - type: practice
    id: ja-cafe-u04-check-close
    kind: dialogue_choice
    prompt: "The clerk gives you the item. What can you say?"
    choices: ["ありがとうございます。", "何番ですか。", "母です。"]
    answer: "ありがとうございます。"
  - type: checkpoint
    items:
      - id: ja-cafe-u04-check-coffee
        kind: type_answer
        prompt: "Type: “Coffee, please.”"
        answer: "コーヒーをください"
        acceptedAnswers: ["コーヒーをください。"]
      - id: ja-cafe-u04-check-bread
        kind: listen_type
        prompt: "Listen and type the full request."
        audioText: "パンをください"
        answer: "パンをください"
        acceptedAnswers: ["パンをください。"]
exercise:
  type: type_answer
  prompt: "Type the polite thank-you after receiving the item."
  answer: "ありがとうございます"
  acceptedAnswers: ["ありがとうございます。"]
---

The checkpoint tests one complete counter action: understand the item, make the request, and close politely.
