---
id: ja-n5-u01-review
track: japanese-jlpt
locale: en
slug: politeness-review
title: "Review: ask for an item"
order: 3
published: true
jlpt_level: n5
unit_id: ja-n5-shop-request-01
unit_title: "Ask for an item"
unit_order: 1
unit_can_do: "Ask for a chosen item and close a short shop exchange politely"
unit_role: review
can_do: "Recall the shop request and thank-you without a model"
pattern: "これをください。 / はい。 / ありがとうございます。"
objectives:
  - Retrieve the request from memory
  - Reconnect sound, reading, and meaning
steps:
  - type: scene
    title: "Back at the shop"
    body: "You return to a small shop. Recall the request before looking at the model again."
    visualKey: "shop-counter-request"
    imageAlt: "A customer points to an item at a small shop counter while the clerk listens."
  - type: dialogue
    lines:
      - { speaker: "客", text: "これをください。", reading: "これをください。" }
      - { speaker: "店員", text: "はい。", reading: "はい。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen before reading. Which request do you hear?"
    text: "これをください。"
    reading: "これをください。"
  - type: practice
    id: ja-u01-review-listen
    kind: listen_type
    prompt: "Listen and type the phrase you hear."
    audioText: "ありがとうございます"
    answer: "ありがとうございます"
    acceptedAnswers: ["ありがとうございます。"]
  - type: practice
    id: ja-u01-review-reply
    kind: dialogue_choice
    prompt: "Which line asks for the item you are pointing to?"
    choices: ["これをください。", "いいえ。", "ありがとうございます。"]
    answer: "これをください。"
  - type: practice
    id: ja-u01-review-type
    kind: type_answer
    prompt: "Type the short affirmative reply."
    answer: "はい"
    acceptedAnswers: ["はい。"]
    hints:
      - "It has two hiragana characters."
  - type: checkpoint
    items:
      - id: ja-u01-review-request
        kind: dialogue_choice
        prompt: "You are ready to ask for the item. What do you say?"
        choices: ["これをください。", "ありがとうございます。", "いいえ。"]
        answer: "これをください。"
      - id: ja-u01-review-close
        kind: meaning_choice
        prompt: "Which phrase politely thanks the clerk?"
        choices: ["ありがとうございます。", "これをください。", "はい。"]
        answer: "ありがとうございます。"
exercise:
  type: dialogue_choice
  prompt: "Choose the complete request."
  choices: ["これをください。", "ください。", "はい。"]
  answer: "これをください。"
---

Review by retrieval: hear the phrase, recall it, then use it again in the shop exchange.
