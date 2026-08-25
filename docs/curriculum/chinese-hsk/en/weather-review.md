---
id: zh-hsk-b1-u10-review
track: chinese-hsk
locale: en
slug: weather-review
title: "Review: talk about weather"
order: 18
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-weather-10
unit_title: "Talk about today's weather"
unit_order: 10
unit_can_do: "Ask about simple weather, understand a short answer, and use it for a basic plan"
unit_role: review
can_do: "Recall the weather question and answer from memory"
pattern: "今天天气怎么样？ / 今天很冷。 / 今天下雨。"
objectives:
  - Retrieve the weather question
  - Recognize a weather detail from audio
  - Produce a weather answer without a model
steps:
  - type: scene
    title: "Check the weather again"
    body: "A friend asks again on another day. Answer without looking back at the lesson."
  - type: dialogue
    lines:
      - { speaker: "A", text: "今天天气怎么样？", reading: "jīn tiān tiān qì zěn me yàng" }
      - { speaker: "B", text: "今天下雨。", reading: "jīn tiān xià yǔ" }
  - type: listen
    prompt: "Listen and identify the weather."
    text: "今天很冷。"
    reading: "jīn tiān hěn lěng"
  - type: practice
    id: zh-weather-u10-review-listen
    kind: audio_choice
    prompt: "Listen. Which detail do you hear?"
    audioText: "今天很冷。"
    choices: ["很冷", "很热", "下雨"]
    answer: "很冷"
  - type: practice
    id: zh-weather-u10-review-question
    kind: dialogue_choice
    prompt: "Which question asks about the weather?"
    choices: ["今天天气怎么样？", "你叫什么名字？", "你怎么去？"]
    answer: "今天天气怎么样？"
  - type: practice
    id: zh-weather-u10-review-produce
    kind: type_answer
    prompt: "Type from memory: “It is raining today.”"
    answer: "今天下雨"
    acceptedAnswers: ["今天下雨。"]
  - type: checkpoint
    items:
      - id: zh-weather-u10-review-hot
        kind: type_answer
        prompt: "Type: “It is hot today.”"
        answer: "今天很热"
        acceptedAnswers: ["今天很热。"]
      - id: zh-weather-u10-review-cold
        kind: listen_type
        prompt: "Listen and type the full statement."
        audioText: "今天很冷。"
        answer: "今天很冷"
        acceptedAnswers: ["今天很冷。"]
exercise:
  type: type_answer
  prompt: "Ask from memory: How is the weather today?"
  answer: "今天天气怎么样"
  acceptedAnswers: ["今天天气怎么样？"]
---

Delayed retrieval keeps the question-answer pair ready for a future real-world weather check.
