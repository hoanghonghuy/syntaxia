---
id: zh-hsk-b1-u11-review
track: chinese-hsk
locale: en
slug: free-time-review
title: "Review: make a free-time plan"
order: 21
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-free-time-11
unit_title: "Make a simple free-time plan"
unit_order: 11
unit_can_do: "Say a simple preference, ask whether a friend wants to go, and respond to the plan"
unit_role: review
can_do: "Recall the preference and invitation chunks without a model"
pattern: "我喜欢看电影。 / 你想去看电影吗？ / 想去。"
objectives:
  - Retrieve the movie preference sentence
  - Retrieve the plan question
  - Answer the invitation from memory
steps:
  - type: scene
    title: "Make the plan again"
    body: "A friend brings up movies on another day. Use the same preference and plan chunks from memory."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你喜欢看电影吗？", reading: "nǐ xǐ huan kàn diàn yǐng ma" }
      - { speaker: "B", text: "喜欢。", reading: "xǐ huan" }
      - { speaker: "A", text: "你想去看电影吗？", reading: "nǐ xiǎng qù kàn diàn yǐng ma" }
      - { speaker: "B", text: "想去。", reading: "xiǎng qù" }
  - type: listen
    prompt: "Listen for the preference."
    text: "我喜欢看电影。"
    reading: "wǒ xǐ huan kàn diàn yǐng"
  - type: practice
    id: zh-free-u11-review-listen
    kind: audio_choice
    prompt: "Listen. What activity do you hear?"
    audioText: "我喜欢看电影。"
    choices: ["看电影", "坐飞机", "上网"]
    answer: "看电影"
  - type: practice
    id: zh-free-u11-review-invite
    kind: dialogue_choice
    prompt: "Which line invites a friend into the plan?"
    choices: ["你想去看电影吗？", "今天天气怎么样？", "这是你的电脑吗？"]
    answer: "你想去看电影吗？"
  - type: practice
    id: zh-free-u11-review-produce
    kind: type_answer
    prompt: "Type from memory: “I like watching movies.”"
    answer: "我喜欢看电影"
    acceptedAnswers: ["我喜欢看电影。"]
  - type: checkpoint
    items:
      - id: zh-free-u11-review-want
        kind: type_answer
        prompt: "Type: “I want to go see a movie.”"
        answer: "我想去看电影"
        acceptedAnswers: ["我想去看电影。"]
      - id: zh-free-u11-review-response
        kind: listen_type
        prompt: "Listen and type the short response."
        audioText: "想去。"
        answer: "想去"
        acceptedAnswers: ["想去。"]
exercise:
  type: type_answer
  prompt: "Ask from memory: Do you like watching movies?"
  answer: "你喜欢看电影吗"
  acceptedAnswers: ["你喜欢看电影吗？"]
---

Delayed review keeps the preference-to-plan exchange available for later conversation.
