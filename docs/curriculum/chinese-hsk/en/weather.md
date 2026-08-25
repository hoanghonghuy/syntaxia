---
id: zh-hsk-b1-13-weather
track: chinese-hsk
locale: en
slug: weather
title: Ask about simple weather
order: 16
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-weather-10
unit_title: "Talk about today's weather"
unit_order: 10
unit_can_do: "Ask about simple weather, understand a short answer, and use it for a basic plan"
unit_role: lesson
can_do: "Ask how the weather is and say whether today is hot, cold, or rainy"
pattern: "今天天气怎么样？ / 今天很冷。 / 今天下雨。"
objectives:
  - Ask a simple weather question
  - Understand hot/cold/rain information from a short answer
  - Produce one natural weather sentence
vocab:
  - { hanzi: "天气", pinyin: "tiān qì", gloss: "weather" }
  - { hanzi: "今天", pinyin: "jīn tiān", gloss: "today" }
  - { hanzi: "明天", pinyin: "míng tiān", gloss: "tomorrow" }
  - { hanzi: "下雨", pinyin: "xià yǔ", gloss: "to rain" }
  - { hanzi: "冷", pinyin: "lěng", gloss: "cold" }
  - { hanzi: "热", pinyin: "rè", gloss: "hot" }
steps:
  - type: scene
    title: "Check the weather before leaving"
    body: "You and a friend are about to go outside. Ask what the weather is like before deciding what to do."
    imageUrl: "/language/scenes/weather-window.svg"
    imageAlt: "A window shows rain outside while a simple thermometer indicates cool weather."
  - type: dialogue
    lines:
      - { speaker: "A", text: "今天天气怎么样？", reading: "jīn tiān tiān qì zěn me yàng" }
      - { speaker: "B", text: "今天很冷，还下雨。", reading: "jīn tiān hěn lěng, hái xià yǔ" }
      - { speaker: "A", text: "明天呢？", reading: "míng tiān ne" }
      - { speaker: "B", text: "明天不冷。", reading: "míng tiān bù lěng" }
  - type: listen
    prompt: "Listen once. What two weather details do you hear about today?"
    text: "今天很冷，还下雨。"
    reading: "jīn tiān hěn lěng, hái xià yǔ"
  - type: tip
    title: "Describe weather directly"
    body: "Use 天气怎么样？ to ask generally. A short answer can be 今天很冷 or 今天下雨. You do not need 是 before the adjective."
  - type: teach
    items:
      - { form: "今天天气怎么样？", reading: "jīn tiān tiān qì zěn me yàng", gloss: "How is the weather today?", example: "今天天气怎么样？" }
      - { form: "今天很冷。", reading: "jīn tiān hěn lěng", gloss: "It is cold today.", example: "今天很冷。" }
      - { form: "今天下雨。", reading: "jīn tiān xià yǔ", gloss: "It is raining today.", example: "今天下雨。" }
  - type: practice
    id: zh-weather-u10-listen
    kind: audio_choice
    prompt: "Listen. What is the weather like?"
    audioText: "今天很热。"
    choices: ["热", "冷", "下雨"]
    answer: "热"
  - type: practice
    id: zh-weather-u10-reply
    kind: dialogue_choice
    prompt: "Someone asks 今天天气怎么样？ It is cold. Which answer fits?"
    choices: ["今天很冷。", "今天是冷。", "今天在哪里？"]
    answer: "今天很冷。"
  - type: practice
    id: zh-weather-u10-produce
    kind: type_answer
    prompt: "Type: “It is raining today.”"
    answer: "今天下雨"
    acceptedAnswers: ["今天下雨。"]
    hints:
      - "Use 今天 + 下雨."
  - type: checkpoint
    items:
      - id: zh-weather-u10-check-question
        kind: dialogue_choice
        prompt: "Which question asks about today's weather?"
        choices: ["今天天气怎么样？", "今天是谁？", "今天多少钱？"]
        answer: "今天天气怎么样？"
      - id: zh-weather-u10-check-cold
        kind: listen_type
        prompt: "Listen and type the full weather statement."
        audioText: "今天很冷。"
        answer: "今天很冷"
        acceptedAnswers: ["今天很冷。"]
exercise:
  type: type_answer
  prompt: "Say: It is hot today."
  answer: "今天很热"
  acceptedAnswers: ["今天很热。"]
---

The lesson turns familiar temperature words into useful weather information for a real decision.
