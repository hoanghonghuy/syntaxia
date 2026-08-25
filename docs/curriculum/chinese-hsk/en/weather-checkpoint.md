---
id: zh-hsk-b1-u10-checkpoint
track: chinese-hsk
locale: en
slug: weather-checkpoint
title: "Checkpoint: talk about weather"
order: 17
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-weather-10
unit_title: "Talk about today's weather"
unit_order: 10
unit_can_do: "Ask about simple weather, understand a short answer, and use it for a basic plan"
unit_role: checkpoint
can_do: "Extract one weather detail and produce a simple weather answer with minimal support"
pattern: "天气怎么样？ / 很冷 / 很热 / 下雨"
objectives:
  - Extract hot/cold/rain from short audio
  - Choose a natural response to the weather question
  - Produce one complete weather statement
steps:
  - type: scene
    title: "Check before going outside"
    body: "A friend asks about the weather. Listen for the key detail and answer naturally."
  - type: dialogue
    lines:
      - { speaker: "A", text: "今天天气怎么样？", reading: "jīn tiān tiān qì zěn me yàng" }
      - { speaker: "B", text: "今天很热。", reading: "jīn tiān hěn rè" }
  - type: listen
    prompt: "Listen. Is it hot, cold, or raining?"
    text: "今天很热。"
    reading: "jīn tiān hěn rè"
  - type: practice
    id: zh-weather-u10-check-listen
    kind: audio_choice
    prompt: "Listen and choose the weather detail."
    audioText: "今天下雨。"
    choices: ["下雨", "很热", "很冷"]
    answer: "下雨"
  - type: practice
    id: zh-weather-u10-check-reply
    kind: dialogue_choice
    prompt: "Which answer naturally responds to 今天天气怎么样？"
    choices: ["今天很冷。", "我是天气。", "天气多少钱？"]
    answer: "今天很冷。"
  - type: practice
    id: zh-weather-u10-check-produce
    kind: type_answer
    prompt: "Type: “It is hot today.”"
    answer: "今天很热"
    acceptedAnswers: ["今天很热。"]
    hints:
      - "Use 今天 + 很热."
  - type: checkpoint
    items:
      - id: zh-weather-u10-check-rain
        kind: listen_type
        prompt: "Listen and type the full statement."
        audioText: "今天下雨。"
        answer: "今天下雨"
        acceptedAnswers: ["今天下雨。"]
      - id: zh-weather-u10-check-tomorrow
        kind: dialogue_choice
        prompt: "Which short question shifts the topic to tomorrow?"
        choices: ["明天呢？", "谁呢？", "多少钱呢？"]
        answer: "明天呢？"
exercise:
  type: type_answer
  prompt: "Say: It is cold today."
  answer: "今天很冷"
  acceptedAnswers: ["今天很冷。"]
---

The checkpoint asks for useful information extraction plus a full beginner response.
