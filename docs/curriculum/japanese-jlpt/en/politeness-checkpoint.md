---
id: ja-n5-u01-checkpoint
track: japanese-jlpt
locale: en
slug: politeness-checkpoint
title: Shop request checkpoint
order: 2
published: true
jlpt_level: n5
unit_id: ja-n5-shop-request-01
unit_title: "Ask for an item"
unit_order: 1
unit_can_do: "Ask for a chosen item and close a short shop exchange politely"
unit_role: checkpoint
can_do: "Ask for an item and thank the clerk with minimal support"
pattern: "これをください。 / はい。 / ありがとうございます。"
objectives:
  - Produce the complete request これをください
  - Respond appropriately in a short shop exchange
steps:
  - type: scene
    title: "At the counter"
    body: "You have chosen an item. Ask the clerk for it, then close the exchange politely."
    visualKey: "shop-counter-request"
    imageAlt: "A customer points to a chosen item at a shop counter while speaking to the clerk."
  - type: dialogue
    lines:
      - { speaker: "客", text: "これをください。", reading: "これをください。" }
      - { speaker: "店員", text: "はい。", reading: "はい。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen first. Which request does the customer make?"
    text: "これをください。"
    reading: "これをください。"
  - type: practice
    id: ja-u01-check-listen
    kind: listen_type
    prompt: "Listen and type the short reply you hear."
    audioText: "はい"
    answer: "はい"
    acceptedAnswers: ["はい。"]
  - type: practice
    id: ja-u01-check-reply
    kind: dialogue_choice
    prompt: "You point to the item you want. Which line should you say?"
    choices: ["これをください。", "ありがとうございます。", "いいえ。"]
    answer: "これをください。"
    explanation: "The whole chunk これをください is the request in this situation."
  - type: practice
    id: ja-u01-check-type
    kind: type_answer
    prompt: "Type the polite thank-you used after the clerk helps you."
    answer: "ありがとうございます"
    acceptedAnswers: ["ありがとうございます。"]
    hints:
      - "It begins with ありがとう."
  - type: checkpoint
    items:
      - id: ja-u01-check-request
        kind: meaning_choice
        prompt: "Which phrase means “This one, please” in this shop situation?"
        choices: ["これをください。", "はい。", "いいえ。"]
        answer: "これをください。"
      - id: ja-u01-check-thanks
        kind: dialogue_choice
        prompt: "The clerk gives you the item. What can you say?"
        choices: ["ありがとうございます。", "これをください。", "いいえ。"]
        answer: "ありがとうございます。"
exercise:
  type: type_answer
  prompt: "Type the request for the item you are pointing to."
  answer: "これをください"
  acceptedAnswers: ["これをください。"]
---

Use これをください as one useful request inside the shop exchange.
