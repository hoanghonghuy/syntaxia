---
id: zh-hsk-b1-01-greetings
track: chinese-hsk
locale: en
slug: greetings
title: "Greet, thank, and say goodbye"
order: 1
published: true
hsk_band: 1
hsk_version: "3.0"
can_do: "Greet someone, thank them, and close a short exchange naturally"
pattern: "你好 / 谢谢 / 不客气 / 再见"
objectives:
  - "Open and close a short greeting exchange"
  - "Reply naturally to 谢谢"
vocab:
  - { hanzi: "你好", pinyin: "nǐ hǎo", gloss: "hello" }
  - { hanzi: "谢谢", pinyin: "xiè xie", gloss: "thank you" }
  - { hanzi: "不客气", pinyin: "bú kè qi", gloss: "you're welcome" }
  - { hanzi: "再见", pinyin: "zài jiàn", gloss: "goodbye" }
steps:
  - type: scene
    title: "Situation"
    body: "You meet a classmate before class. Greet them, then end the exchange politely."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "B", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "A", text: "谢谢你。", reading: "xiè xie nǐ" }
      - { speaker: "B", text: "不客气。", reading: "bú kè qi" }
      - { speaker: "A", text: "再见！", reading: "zài jiàn" }
      - { speaker: "B", text: "再见！", reading: "zài jiàn" }
  - type: listen
    prompt: "Listen first. Which chunk did A use to thank B?"
    text: "谢谢你。"
    reading: "xiè xie nǐ"
  - type: tip
    title: "Learn the whole exchange"
    body: "Treat 你好, 谢谢, 不客气, and 再见 as ready-to-use chunks. Pinyin supports pronunciation; the characters remain the target form."
  - type: teach
    items:
      - { form: "你好", reading: "nǐ hǎo", gloss: "hello", example: "你好！" }
      - { form: "谢谢", reading: "xiè xie", gloss: "thank you", example: "谢谢你。" }
      - { form: "不客气", reading: "bú kè qi", gloss: "you're welcome", example: "不客气。" }
      - { form: "再见", reading: "zài jiàn", gloss: "goodbye", example: "再见！" }
  - type: practice
    id: zh-greet-reply-1
    kind: dialogue_choice
    prompt: "Someone says 谢谢. What is the natural reply?"
    choices: ["不客气", "再见", "你好"]
    answer: "不客气"
    explanation: "谢谢 and 不客气 form a common thank-you exchange."
  - type: practice
    id: zh-greet-listen-1
    kind: audio_choice
    prompt: "Listen and choose what you hear."
    audioText: "你好"
    choices: ["你好", "谢谢", "再见"]
    answer: "你好"
  - type: practice
    id: zh-greet-type-1
    kind: type_answer
    prompt: "Type the characters for “goodbye”."
    answer: "再见"
    hints:
      - "The first character is 再."
      - "The second is 见."
  - type: checkpoint
    items:
      - id: zh-greet-check-1
        kind: meaning_choice
        prompt: "Which chunk closes a meeting?"
        choices: ["再见", "你好", "谢谢"]
        answer: "再见"
      - id: zh-greet-check-2
        kind: dialogue_choice
        prompt: "A classmate says 你好. What can you say back?"
        choices: ["你好！", "不客气。", "再见。"]
        answer: "你好！"
exercise:
  type: dialogue_choice
  prompt: "Choose the natural reply to 谢谢."
  choices: ["不客气", "你好", "再见"]
  answer: "不客气"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
