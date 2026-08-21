---
id: zh-hsk-b1-u08-review
track: chinese-hsk
locale: en
slug: travel-review
title: "Review: say how you travel"
order: 13
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-travel-08
unit_title: "Say how you travel"
unit_order: 8
unit_can_do: "Ask how someone is traveling and answer with a train, plane, or taxi choice"
unit_role: review
can_do: "Recall the core travel question and answer with the correct transport chunk"
pattern: "你怎么去？ / 我坐火车。 / 我坐飞机。 / 我打车。"
objectives:
  - "Recall 怎么去 from sound and context"
  - "Produce 坐 + vehicle or 打车 without a model sentence"
steps:
  - type: scene
    title: "Travel plan"
    body: "You meet a friend again and quickly compare how each person is traveling."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你怎么去？", reading: "nǐ zěn me qù" }
      - { speaker: "B", text: "我打车。你呢？", reading: "wǒ dǎ chē. nǐ ne" }
      - { speaker: "A", text: "我坐火车。", reading: "wǒ zuò huǒ chē" }
  - type: listen
    prompt: "Listen and recall the transport choice."
    text: "我坐飞机。"
    reading: "wǒ zuò fēi jī"
  - type: practice
    id: zh-travel-u08-review-listen
    kind: audio_choice
    prompt: "Listen. How is the person traveling?"
    audioText: "我打车。"
    choices: ["打车", "坐火车", "坐飞机"]
    answer: "打车"
  - type: practice
    id: zh-travel-u08-review-question
    kind: dialogue_choice
    prompt: "Which question asks how someone is going?"
    choices: ["你怎么去？", "你去哪里？", "你是谁？"]
    answer: "你怎么去？"
  - type: practice
    id: zh-travel-u08-review-produce
    kind: type_answer
    prompt: "Type: “I take a plane.”"
    answer: "我坐飞机"
    acceptedAnswers: ["我坐飞机。"]
    hints:
      - "Use 坐 before 飞机."
  - type: checkpoint
    items:
      - id: zh-travel-u08-review-taxi
        kind: type_answer
        prompt: "Type: “I take a taxi.”"
        answer: "我打车"
        acceptedAnswers: ["我打车。"]
      - id: zh-travel-u08-review-train
        kind: listen_type
        prompt: "Listen and type the full sentence."
        audioText: "我坐火车。"
        answer: "我坐火车"
        acceptedAnswers: ["我坐火车。"]
exercise:
  type: type_answer
  prompt: "Type a natural answer to 你怎么去？ if you take the train."
  answer: "我坐火车"
  acceptedAnswers: ["我坐火车。"]
---

This review removes most scaffolding and asks the learner to retrieve the travel question and transport chunks from memory.
