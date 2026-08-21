---
id: zh-hsk-b1-05-time-of-day
track: chinese-hsk
locale: en
slug: time-of-day
title: "Make a simple plan by day and time"
order: 5
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-study-04
unit_title: "Plan when and where you study"
unit_order: 4
unit_can_do: "Say when and where you study Chinese and confirm a simple study plan"
unit_role: lesson
can_do: "Say whether something happens today or tomorrow and place it in a part of the day"
pattern: "我今天… / 我明天上午…"
objectives:
  - "Contrast today, tomorrow, and yesterday"
  - "Use morning / afternoon / evening in a short plan"
vocab:
  - { hanzi: "今天", pinyin: "jīn tiān", gloss: "today" }
  - { hanzi: "明天", pinyin: "míng tiān", gloss: "tomorrow" }
  - { hanzi: "昨天", pinyin: "zuó tiān", gloss: "yesterday" }
  - { hanzi: "上午", pinyin: "shàng wǔ", gloss: "morning" }
  - { hanzi: "下午", pinyin: "xià wǔ", gloss: "afternoon" }
  - { hanzi: "晚上", pinyin: "wǎn shang", gloss: "evening" }
  - { hanzi: "现在", pinyin: "xiàn zài", gloss: "now" }
steps:
  - type: scene
    title: "Situation"
    body: "You and a classmate are deciding when to study together."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你明天上午学习汉语吗？", reading: "nǐ míng tiān shàng wǔ xué xí hàn yǔ ma" }
      - { speaker: "B", text: "学习。你呢？", reading: "xué xí. nǐ ne" }
      - { speaker: "A", text: "我明天下午学习。", reading: "wǒ míng tiān xià wǔ xué xí" }
      - { speaker: "B", text: "好，明天见。", reading: "hǎo, míng tiān jiàn" }
  - type: listen
    prompt: "Listen for the day and part of the day."
    text: "我明天下午学习。"
    reading: "wǒ míng tiān xià wǔ xué xí"
  - type: tip
    title: "Time words anchor the event"
    body: "A beginner-friendly pattern is 我 + time + action, for example 我明天下午学习. Learn 今天 / 明天 / 昨天 as a contrast set, then add 上午 / 下午 / 晚上."
  - type: teach
    items:
      - { form: "今天", reading: "jīn tiān", gloss: "today", example: "我今天学习。" }
      - { form: "明天", reading: "míng tiān", gloss: "tomorrow", example: "我明天学习。" }
      - { form: "上午", reading: "shàng wǔ", gloss: "morning", example: "我明天上午学习。" }
      - { form: "下午", reading: "xià wǔ", gloss: "afternoon", example: "我明天下午学习。" }
  - type: practice
    id: zh-time-listen-1
    kind: audio_choice
    prompt: "Listen. When does the person study?"
    audioText: "我明天下午学习。"
    choices: ["明天下午", "今天上午", "明天晚上"]
    answer: "明天下午"
  - type: practice
    id: zh-time-meaning-1
    kind: meaning_choice
    prompt: "Which word means “today”?"
    choices: ["今天", "明天", "昨天"]
    answer: "今天"
  - type: practice
    id: zh-time-produce-1
    kind: type_answer
    prompt: "Type: “I study tomorrow morning.”"
    answer: "我明天上午学习"
    acceptedAnswers: ["我明天上午学习。"]
    hints:
      - "Start with 我, then 明天上午."
  - type: checkpoint
    items:
      - id: zh-time-check-1
        kind: meaning_choice
        prompt: "Which means “evening”?"
        choices: ["晚上", "上午", "现在"]
        answer: "晚上"
      - id: zh-time-check-2
        kind: dialogue_choice
        prompt: "Review: someone asks 这是谁？ What can introduce your mother?"
        choices: ["这是我妈妈。", "我明天学习。", "三号。"]
        answer: "这是我妈妈。"
exercise:
  type: dialogue_choice
  prompt: "Which word means “tomorrow”?"
  choices: ["明天", "今天", "昨天"]
  answer: "明天"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
