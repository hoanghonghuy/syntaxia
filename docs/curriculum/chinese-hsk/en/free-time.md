---
id: zh-hsk-b1-14-free-time
track: chinese-hsk
locale: en
slug: free-time
title: Make a simple free-time plan
order: 19
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-free-time-11
unit_title: "Make a simple free-time plan"
unit_order: 11
unit_can_do: "Say a simple preference, ask whether a friend wants to go, and respond to the plan"
unit_role: lesson
can_do: "Say you like movies and ask a friend whether they want to go see one"
pattern: "你喜欢看电影吗？ / 我喜欢。 / 你想去看电影吗？ / 想去。"
objectives:
  - Ask about a simple preference with 喜欢
  - Ask whether someone wants to go with 想去
  - Respond positively to a simple plan
vocab:
  - { hanzi: "喜欢", pinyin: "xǐ huan", gloss: "to like" }
  - { hanzi: "电影", pinyin: "diàn yǐng", gloss: "movie" }
  - { hanzi: "看", pinyin: "kàn", gloss: "to look at; watch" }
  - { hanzi: "星期", pinyin: "xīng qī", gloss: "week; weekday marker" }
  - { hanzi: "想", pinyin: "xiǎng", gloss: "to want; would like" }
  - { hanzi: "去", pinyin: "qù", gloss: "to go" }
  - { hanzi: "朋友", pinyin: "péng you", gloss: "friend" }
steps:
  - type: scene
    title: "Make a plan after class"
    body: "You and a friend are free after class. Find out whether you both like movies and make one simple plan."
    visualKey: "weekend-plan"
    imageAlt: "Two friends compare a simple weekend calendar and choose an activity together."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你喜欢看电影吗？", reading: "nǐ xǐ huan kàn diàn yǐng ma" }
      - { speaker: "B", text: "喜欢。", reading: "xǐ huan" }
      - { speaker: "A", text: "星期六想去看电影吗？", reading: "xīng qī liù xiǎng qù kàn diàn yǐng ma" }
      - { speaker: "B", text: "想去。", reading: "xiǎng qù" }
  - type: listen
    prompt: "Listen once. What activity does the speaker like?"
    text: "我喜欢看电影。"
    reading: "wǒ xǐ huan kàn diàn yǐng"
  - type: tip
    title: "Use 喜欢 for preference and 想 for a plan"
    body: "喜欢看电影 says you like watching movies. 想去看电影 shifts from preference to a simple intended activity."
  - type: teach
    items:
      - { form: "你喜欢看电影吗？", reading: "nǐ xǐ huan kàn diàn yǐng ma", gloss: "Do you like watching movies?", example: "你喜欢看电影吗？" }
      - { form: "我喜欢看电影。", reading: "wǒ xǐ huan kàn diàn yǐng", gloss: "I like watching movies.", example: "我喜欢看电影。" }
      - { form: "你想去看电影吗？", reading: "nǐ xiǎng qù kàn diàn yǐng ma", gloss: "Do you want to go see a movie?", example: "你想去看电影吗？" }
      - { form: "想去。", reading: "xiǎng qù", gloss: "I'd like to go.", example: "想去。" }
  - type: practice
    id: zh-free-u11-listen
    kind: audio_choice
    prompt: "Listen. What does the speaker like?"
    audioText: "我喜欢看电影。"
    choices: ["电影", "火车", "电脑"]
    answer: "电影"
  - type: practice
    id: zh-free-u11-reply
    kind: dialogue_choice
    prompt: "A friend asks 你想去看电影吗？ You want to go. Which reply fits?"
    choices: ["想去。", "很冷。", "多少钱？"]
    answer: "想去。"
  - type: practice
    id: zh-free-u11-produce
    kind: type_answer
    prompt: "Type: “I like watching movies.”"
    answer: "我喜欢看电影"
    acceptedAnswers: ["我喜欢看电影。"]
    hints:
      - "Use 我 + 喜欢 + 看电影."
  - type: checkpoint
    items:
      - id: zh-free-u11-check-like
        kind: dialogue_choice
        prompt: "Which question asks whether someone likes movies?"
        choices: ["你喜欢看电影吗？", "电影在哪里？", "电影多少钱？"]
        answer: "你喜欢看电影吗？"
      - id: zh-free-u11-check-plan
        kind: listen_type
        prompt: "Listen and type the short positive response."
        audioText: "想去。"
        answer: "想去"
        acceptedAnswers: ["想去。"]
exercise:
  type: type_answer
  prompt: "Ask: Do you want to go see a movie?"
  answer: "你想去看电影吗"
  acceptedAnswers: ["你想去看电影吗？"]
---

The lesson moves from preference to a usable social plan rather than teaching 喜欢 and 电影 as isolated entries.
