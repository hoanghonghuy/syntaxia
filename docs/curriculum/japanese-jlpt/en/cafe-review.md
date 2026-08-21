---
id: ja-n5-u04-review
track: japanese-jlpt
locale: en
slug: cafe-review
title: "Review: order at a café"
order: 12
published: true
jlpt_level: n5
unit_id: ja-n5-cafe-04
unit_title: "Order at a café"
unit_order: 4
unit_can_do: "Ask for one food or drink and close a short counter exchange politely"
unit_role: review
can_do: "Recall the request frame and polite close with little scaffolding"
pattern: "Nをください。 / ありがとうございます。"
objectives:
  - "Retrieve item + をください from memory"
  - "Close the exchange politely"
steps:
  - type: scene
    title: "Order again"
    body: "You return to the counter and order a different item without a written model."
  - type: dialogue
    lines:
      - { speaker: "客", text: "パンをください。", reading: "パンをください。" }
      - { speaker: "店員", text: "はい、どうぞ。", reading: "はい、どうぞ。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen and recall the requested item."
    text: "コーヒーをください。"
    reading: "コーヒーをください。"
  - type: practice
    id: ja-cafe-u04-review-listen
    kind: audio_choice
    prompt: "Listen. What is requested?"
    audioText: "お茶をください"
    choices: ["お茶", "水", "パン"]
    answer: "お茶"
  - type: practice
    id: ja-cafe-u04-review-request
    kind: type_answer
    prompt: "You want water. Type the complete request."
    answer: "水をください"
    acceptedAnswers: ["水をください。"]
    hints:
      - "Use 水 + をください."
  - type: practice
    id: ja-cafe-u04-review-close
    kind: dialogue_choice
    prompt: "What do you say after receiving the item?"
    choices: ["ありがとうございます。", "お名前は何ですか。", "八番です。"]
    answer: "ありがとうございます。"
  - type: checkpoint
    items:
      - id: ja-cafe-u04-review-coffee
        kind: listen_type
        prompt: "Listen and type the full request."
        audioText: "コーヒーをください"
        answer: "コーヒーをください"
        acceptedAnswers: ["コーヒーをください。"]
      - id: ja-cafe-u04-review-bread
        kind: type_answer
        prompt: "Type: “Bread, please.”"
        answer: "パンをください"
        acceptedAnswers: ["パンをください。"]
exercise:
  type: type_answer
  prompt: "Type a complete request for tea."
  answer: "お茶をください"
  acceptedAnswers: ["お茶をください。"]
---

This review removes most scaffolding and asks the learner to retrieve the counter request frame from memory.
