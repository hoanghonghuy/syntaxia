---
id: ja-n5-01-politeness
track: japanese-jlpt
locale: en
slug: politeness
title: Ask for something politely
order: 1
published: true
jlpt_level: n5
unit_id: ja-n5-shop-request-01
unit_title: "Ask for an item"
unit_order: 1
unit_can_do: "Ask for a chosen item and close a short shop exchange politely"
unit_role: lesson
can_do: "Ask for an item politely and use a basic yes, no, or thank-you response"
pattern: "これをください。 / はい。 / いいえ。 / ありがとうございます。"
objectives:
  - Use これをください as a complete polite request
  - Recognize はい and いいえ as short responses
  - Thank someone with ありがとうございます
vocab:
  - { surface: "これ", reading: "これ", gloss: "this one" }
  - { surface: "ください", reading: "ください", gloss: "please give me / please" }
  - { surface: "はい", reading: "はい", gloss: "yes" }
  - { surface: "いいえ", reading: "いいえ", gloss: "no" }
  - { surface: "ありがとうございます", reading: "ありがとうございます", gloss: "thank you (polite)" }
steps:
  - type: scene
    title: "At a small shop"
    body: "You have chosen an item at a shop. Ask for that item and close the exchange politely."
    visualKey: "shop-counter-request"
    imageAlt: "A customer at a small shop counter points to an item while speaking to the clerk."
  - type: dialogue
    lines:
      - { speaker: "客", text: "これをください。", reading: "これをください。" }
      - { speaker: "店員", text: "はい。", reading: "はい。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen first. Which complete phrase does the customer use to ask for the item?"
    text: "これをください。"
    reading: "これをください。"
  - type: tip
    title: "Learn ください inside a request"
    body: "Do not treat ください as a direct one-word copy of English “please”. In this situation, learn the useful chunk これをください: “This one, please / Please give me this.”"
  - type: teach
    items:
      - { form: "これをください。", reading: "これをください。", gloss: "This one, please.", example: "これをください。" }
      - { form: "はい。", reading: "はい。", gloss: "Yes.", example: "はい。" }
      - { form: "いいえ。", reading: "いいえ。", gloss: "No.", example: "いいえ。" }
      - { form: "ありがとうございます。", reading: "ありがとうございます。", gloss: "Thank you. (polite)", example: "ありがとうございます。" }
  - type: practice
    id: ja-pol-dialogue-1
    kind: dialogue_choice
    prompt: "You want the item you are pointing to. Which request fits the situation?"
    choices: ["これをください。", "いいえ。", "ありがとうございます。"]
    answer: "これをください。"
    explanation: "これをください is the complete request; ありがとうございます thanks the other person after the service."
  - type: practice
    id: ja-pol-listen-1
    kind: listen_type
    prompt: "Listen and type the short response you hear."
    audioText: "はい"
    answer: "はい"
    acceptedAnswers: ["はい。"]
  - type: practice
    id: ja-pol-produce-1
    kind: type_answer
    prompt: "You point to an item and want it. Type the Japanese request."
    answer: "これをください"
    acceptedAnswers: ["これをください。"]
    hints:
      - "Start with これ."
  - type: checkpoint
    items:
      - id: ja-pol-check-1
        kind: meaning_choice
        prompt: "Which phrase is a polite thank-you?"
        choices: ["ありがとうございます。", "これをください。", "いいえ。"]
        answer: "ありがとうございます。"
      - id: ja-pol-check-2
        kind: meaning_choice
        prompt: "Which short response means “no”?"
        choices: ["いいえ。", "はい。", "これ。"]
        answer: "いいえ。"
exercise:
  type: dialogue_choice
  prompt: "Choose the complete polite request."
  choices: ["これをください。", "ください。", "ありがとうございます。"]
  answer: "これをください。"
---

The lesson teaches short Japanese expressions as actions inside a real exchange, not as one-to-one translations of English courtesy words.
