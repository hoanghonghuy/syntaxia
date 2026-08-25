---
id: zh-hsk-b1-02-pronouns
track: chinese-hsk
locale: en
slug: pronouns
title: "Exchange names and introduce a person"
order: 2
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-people-02
unit_title: "Introduce yourself and people close to you"
unit_order: 2
unit_can_do: "Exchange names and introduce a friend or family member"
unit_role: lesson
can_do: "Ask someone's name, say your own name, and refer to another person"
pattern: "我叫… / 你叫什么名字？ / 他（她）叫…"
objectives:
  - "Exchange names in a first meeting"
  - "Use 我 / 你 / 他 / 她 in short identity statements"
vocab:
  - { hanzi: "我", pinyin: "wǒ", gloss: "I / me" }
  - { hanzi: "你", pinyin: "nǐ", gloss: "you" }
  - { hanzi: "他", pinyin: "tā", gloss: "he / him" }
  - { hanzi: "她", pinyin: "tā", gloss: "she / her" }
  - { hanzi: "叫", pinyin: "jiào", gloss: "to be called" }
  - { hanzi: "名字", pinyin: "míng zi", gloss: "name" }
  - { hanzi: "我们", pinyin: "wǒ men", gloss: "we / us" }
steps:
  - type: scene
    title: "Situation"
    body: "You sit next to a new classmate. Exchange names, then introduce a friend."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！你叫什么名字？", reading: "nǐ hǎo! nǐ jiào shén me míng zi" }
      - { speaker: "B", text: "我叫小明。你呢？", reading: "wǒ jiào xiǎo míng. nǐ ne" }
      - { speaker: "A", text: "我叫小红。她叫安娜。", reading: "wǒ jiào xiǎo hóng. tā jiào ān nà" }
  - type: listen
    prompt: "Listen for the pattern used to say a name."
    text: "我叫小红。"
    reading: "wǒ jiào xiǎo hóng"
  - type: tip
    title: "他 and 她 sound the same"
    body: "他 and 她 are both pronounced tā. The written character distinguishes them. Use 我叫 + name for your own name."
  - type: teach
    items:
      - { form: "我叫…", reading: "wǒ jiào", gloss: "I am called…", example: "我叫小明。" }
      - { form: "你叫什么名字？", reading: "nǐ jiào shén me míng zi", gloss: "What is your name?", example: "你叫什么名字？" }
      - { form: "他叫…", reading: "tā jiào", gloss: "his name is…", example: "他叫大卫。" }
      - { form: "她叫…", reading: "tā jiào", gloss: "her name is…", example: "她叫安娜。" }
  - type: practice
    id: zh-name-reply-1
    kind: dialogue_choice
    prompt: "Someone asks 你叫什么名字？ Choose a natural reply."
    choices: ["我叫小明。", "不客气。", "再见。"]
    answer: "我叫小明。"
  - type: practice
    id: zh-name-listen-1
    kind: audio_choice
    prompt: "Listen. Which written pronoun matches the sentence?"
    audioText: "她叫安娜。"
    choices: ["她", "他", "我"]
    answer: "她"
    explanation: "她 and 他 are both pronounced tā; the written form distinguishes them."
  - type: practice
    id: zh-name-produce-1
    kind: type_answer
    prompt: "Your name is 小明. Type a complete self-introduction."
    answer: "我叫小明"
    acceptedAnswers: ["我叫小明。"]
    hints:
      - "Start with 我叫."
  - type: checkpoint
    items:
      - id: zh-name-check-1
        kind: meaning_choice
        prompt: "Which form means “I / me”?"
        choices: ["我", "你", "他"]
        answer: "我"
      - id: zh-name-check-2
        kind: dialogue_choice
        prompt: "Review: someone says 谢谢. What do you reply?"
        choices: ["不客气", "我叫小明", "你好"]
        answer: "不客气"
exercise:
  type: dialogue_choice
  prompt: "Choose the natural reply to 你叫什么名字？"
  choices: ["我叫小明。", "你好。", "再见。"]
  answer: "我叫小明。"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
