---
id: zh-hsk-b1-u02-review
track: chinese-hsk
locale: en
slug: introductions-review
title: "Review: introductions"
order: 16
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-people-02
unit_title: "Introduce yourself and people close to you"
unit_order: 2
unit_can_do: "Exchange names and introduce a friend or family member"
unit_role: review
can_do: "Recall name and family introductions without a model"
pattern: "你叫什么名字？ / 我叫… / 这是我…"
objectives:
  - "Retrieve the name question and answer"
  - "Recognize a family introduction by listening"
  - "Produce a short introduction in characters"
steps:
  - type: scene
    title: "Introduce people again"
    body: "You meet the same classmates later. Recall the useful name and family phrases without reopening the earlier examples."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你叫什么名字？", reading: "nǐ jiào shén me míng zi" }
      - { speaker: "B", text: "我叫安娜。", reading: "wǒ jiào ān nà" }
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我哥哥。", reading: "zhè shì wǒ gē ge" }
  - type: listen
    prompt: "Listen first. Which family member do you hear?"
    text: "这是我姐姐。"
    reading: "zhè shì wǒ jiě jie"
  - type: practice
    id: zh-u02-review-listen
    kind: audio_choice
    prompt: "Listen and choose the family member."
    audioText: "这是我妈妈。"
    choices: ["妈妈", "爸爸", "哥哥"]
    answer: "妈妈"
  - type: practice
    id: zh-u02-review-reply
    kind: dialogue_choice
    prompt: "Someone asks 你叫什么名字？ What is a natural answer?"
    choices: ["我叫安娜。", "这是我爸爸。", "不客气。"]
    answer: "我叫安娜。"
  - type: practice
    id: zh-u02-review-produce
    kind: type_answer
    prompt: "Type: “This is my mom.”"
    answer: "这是我妈妈"
    acceptedAnswers: ["这是我妈妈。"]
    hints:
      - "Use 这是我 + 妈妈."
  - type: checkpoint
    items:
      - id: zh-u02-review-name
        kind: dialogue_choice
        prompt: "Which line asks for a name?"
        choices: ["你叫什么名字？", "这是谁？", "几点了？"]
        answer: "你叫什么名字？"
      - id: zh-u02-review-pronoun
        kind: audio_choice
        prompt: "Listen. Which character matches the pronoun?"
        audioText: "他叫小明。"
        choices: ["他", "她", "我"]
        answer: "他"
exercise:
  type: type_answer
  prompt: "Your name is 小红. Type the sentence."
  answer: "我叫小红"
  acceptedAnswers: ["我叫小红。"]
---

Retrieve the characters and chunks instead of rereading the explanation.
