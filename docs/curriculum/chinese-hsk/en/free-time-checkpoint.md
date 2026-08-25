---
id: zh-hsk-b1-u11-checkpoint
track: chinese-hsk
locale: en
slug: free-time-checkpoint
title: "Checkpoint: make a free-time plan"
order: 20
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-free-time-11
unit_title: "Make a simple free-time plan"
unit_order: 11
unit_can_do: "Say a simple preference, ask whether a friend wants to go, and respond to the plan"
unit_role: checkpoint
can_do: "Understand a preference or invitation and produce one short plan response"
pattern: "喜欢看电影 / 想去看电影 / 想去"
objectives:
  - Extract a preference from short audio
  - Recognize a simple invitation
  - Produce a positive plan response
steps:
  - type: scene
    title: "Choose an activity"
    body: "A friend talks about movies and asks whether you want to go. Listen for preference and intention."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你喜欢看电影吗？", reading: "nǐ xǐ huan kàn diàn yǐng ma" }
      - { speaker: "B", text: "喜欢。", reading: "xǐ huan" }
      - { speaker: "A", text: "你想去看电影吗？", reading: "nǐ xiǎng qù kàn diàn yǐng ma" }
      - { speaker: "B", text: "想去。", reading: "xiǎng qù" }
  - type: listen
    prompt: "Listen. Does the speaker like movies?"
    text: "我喜欢看电影。"
    reading: "wǒ xǐ huan kàn diàn yǐng"
  - type: practice
    id: zh-free-u11-check-listen
    kind: audio_choice
    prompt: "Listen. What does the speaker want to do?"
    audioText: "我想去看电影。"
    choices: ["去看电影", "坐火车", "用电脑"]
    answer: "去看电影"
  - type: practice
    id: zh-free-u11-check-invite
    kind: dialogue_choice
    prompt: "Which question asks whether a friend wants to see a movie?"
    choices: ["你想去看电影吗？", "电影很冷吗？", "电影在哪里上网？"]
    answer: "你想去看电影吗？"
  - type: practice
    id: zh-free-u11-check-produce
    kind: type_answer
    prompt: "Type a short positive response: “I want to go.”"
    answer: "想去"
    acceptedAnswers: ["想去。", "我想去", "我想去。"]
    hints:
      - "Use 想 + 去."
  - type: checkpoint
    items:
      - id: zh-free-u11-check-preference
        kind: listen_type
        prompt: "Listen and type the full preference sentence."
        audioText: "我喜欢看电影。"
        answer: "我喜欢看电影"
        acceptedAnswers: ["我喜欢看电影。"]
      - id: zh-free-u11-check-like-question
        kind: dialogue_choice
        prompt: "Which question asks about a preference?"
        choices: ["你喜欢看电影吗？", "你去哪里？", "几点了？"]
        answer: "你喜欢看电影吗？"
exercise:
  type: type_answer
  prompt: "Say: I want to go see a movie."
  answer: "我想去看电影"
  acceptedAnswers: ["我想去看电影。"]
---

The checkpoint verifies preference, invitation, and intention as one mini interaction.
