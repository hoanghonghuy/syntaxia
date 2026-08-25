---
id: ja-n5-05-food-drink
track: japanese-jlpt
locale: en
slug: food-drink
title: Order one simple item
order: 5
published: true
jlpt_level: n5
unit_id: ja-n5-cafe-04
unit_title: "Order at a café"
unit_order: 4
unit_can_do: "Ask for one food or drink and close a short counter exchange politely"
unit_role: lesson
can_do: "Ask for one simple food or drink using N をください"
pattern: "お茶をください。 / 水をください。"
objectives:
  - Name a few common food and drink items
  - Put をください after the item you want
  - Complete a very short service exchange politely
vocab:
  - { surface: "水", reading: "みず", gloss: "water" }
  - { surface: "お茶", reading: "おちゃ", gloss: "tea" }
  - { surface: "コーヒー", reading: "コーヒー", gloss: "coffee" }
  - { surface: "パン", reading: "パン", gloss: "bread" }
  - { surface: "を", reading: "を", gloss: "object particle" }
  - { surface: "ください", reading: "ください", gloss: "please give me / please" }
steps:
  - type: scene
    title: "Order at a counter"
    body: "You are at a small café counter. Choose one drink and ask for it in Japanese."
  - type: dialogue
    lines:
      - { speaker: "店員", text: "はい、どうぞ。", reading: "はい、どうぞ。" }
      - { speaker: "客", text: "お茶をください。", reading: "おちゃをください。" }
      - { speaker: "店員", text: "はい。", reading: "はい。" }
      - { speaker: "客", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen for the item before をください."
    text: "水をください。"
    reading: "みずをください。"
  - type: tip
    title: "Put the requested item before をください"
    body: "The useful pattern is item + をください. Replace the item while keeping the request frame stable: 水をください, お茶をください."
  - type: teach
    items:
      - { form: "水をください。", reading: "みずをください。", gloss: "Water, please.", example: "水をください。" }
      - { form: "お茶をください。", reading: "おちゃをください。", gloss: "Tea, please.", example: "お茶をください。" }
      - { form: "コーヒーをください。", reading: "コーヒーをください。", gloss: "Coffee, please.", example: "コーヒーをください。" }
      - { form: "パンをください。", reading: "パンをください。", gloss: "Bread, please.", example: "パンをください。" }
  - type: practice
    id: ja-food-dialogue-1
    kind: dialogue_choice
    prompt: "You want tea. Which request fits the counter situation?"
    choices: ["お茶をください。", "お茶はだれですか。", "お茶ですか。"]
    answer: "お茶をください。"
  - type: practice
    id: ja-food-listen-1
    kind: audio_choice
    prompt: "Listen. What item is requested?"
    audioText: "水をください"
    choices: ["水", "お茶", "パン"]
    answer: "水"
  - type: practice
    id: ja-food-produce-1
    kind: type_answer
    prompt: "You want coffee. Type the complete Japanese request."
    answer: "コーヒーをください"
    acceptedAnswers: ["コーヒーをください。"]
    hints:
      - "Use item + をください."
  - type: checkpoint
    items:
      - id: ja-food-check-1
        kind: meaning_choice
        prompt: "Which sentence asks for bread?"
        choices: ["パンをください。", "水をください。", "パンです。"]
        answer: "パンをください。"
      - id: ja-food-check-2
        kind: dialogue_choice
        prompt: "Review: a classmate points to your father in a family photo. What short answer can you give?"
        choices: ["父です。", "水です。", "何番ですか。"]
        answer: "父です。"
exercise:
  type: dialogue_choice
  prompt: "Choose the request for water."
  choices: ["水をください。", "水は何ですか。", "水の名前です。"]
  answer: "水をください。"
---

The item words are learned inside a reusable request frame, so the learner can swap the noun and immediately perform a real action.
