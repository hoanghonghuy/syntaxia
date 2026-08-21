---
id: zh-hsk-b1-u02-checkpoint
track: chinese-hsk
locale: en
slug: introductions-checkpoint
title: "Introductions checkpoint"
order: 15
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-people-02
unit_title: "Introduce yourself and people close to you"
unit_order: 2
unit_can_do: "Exchange names and introduce a friend or family member"
unit_role: checkpoint
can_do: "Exchange a name and introduce a close person with minimal support"
pattern: "你叫什么名字？ / 我叫… / 这是我…"
objectives:
  - "Ask and answer a name question"
  - "Introduce a friend or family member"
  - "Connect spoken pinyin with the correct characters"
steps:
  - type: scene
    title: "Meet and introduce"
    body: "You meet a new classmate, exchange names, then show a family photo."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你叫什么名字？", reading: "nǐ jiào shén me míng zi" }
      - { speaker: "B", text: "我叫小明。", reading: "wǒ jiào xiǎo míng" }
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我姐姐。", reading: "zhè shì wǒ jiě jie" }
  - type: listen
    prompt: "Listen for the family member being introduced."
    text: "这是我妈妈。"
    reading: "zhè shì wǒ mā ma"
  - type: practice
    id: zh-u02-check-listen
    kind: audio_choice
    prompt: "Listen. Who is introduced?"
    audioText: "这是我爸爸。"
    choices: ["爸爸", "妈妈", "姐姐"]
    answer: "爸爸"
  - type: practice
    id: zh-u02-check-reply
    kind: dialogue_choice
    prompt: "Someone asks 你叫什么名字？ Choose the natural reply."
    choices: ["我叫小红。", "这是我妈妈。", "不客气。"]
    answer: "我叫小红。"
  - type: practice
    id: zh-u02-check-produce
    kind: type_answer
    prompt: "Type: “This is my older sister.”"
    answer: "这是我姐姐"
    acceptedAnswers: ["这是我姐姐。"]
    hints:
      - "Use 这是我 + 姐姐."
  - type: checkpoint
    items:
      - id: zh-u02-check-name
        kind: dialogue_choice
        prompt: "Which question asks someone's name?"
        choices: ["你叫什么名字？", "这是谁？", "你去哪儿？"]
        answer: "你叫什么名字？"
      - id: zh-u02-check-character
        kind: audio_choice
        prompt: "Listen. Which written form matches tā in this sentence?"
        audioText: "她叫安娜。"
        choices: ["她", "他", "我"]
        answer: "她"
exercise:
  type: type_answer
  prompt: "Your name is 小明. Type a complete introduction."
  answer: "我叫小明"
  acceptedAnswers: ["我叫小明。"]
---

Use the name and family patterns as one short introduction exchange.
