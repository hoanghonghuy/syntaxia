---
id: zh-hsk-b1-u03-checkpoint
track: chinese-hsk
locale: en
slug: number-checkpoint
title: "Checkpoint: confirm a number"
order: 4
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-number-03
unit_title: "Confirm a number"
unit_order: 3
unit_can_do: "Hear, repeat, and confirm a simple numbered label in a short service exchange"
unit_role: checkpoint
can_do: "Confirm a spoken numbered label with minimal support"
pattern: "…号 / …号，对吗？ / 对。"
objectives:
  - "Recognize a numbered label by sound"
  - "Repeat the label to confirm it"
steps:
  - type: scene
    title: "A number at the desk"
    body: "A receptionist gives you a queue number. Confirm the number before you leave the desk."
  - type: dialogue
    lines:
      - { speaker: "Staff", text: "五号。", reading: "wǔ hào" }
      - { speaker: "You", text: "五号，对吗？", reading: "wǔ hào, duì ma" }
      - { speaker: "Staff", text: "对。", reading: "duì" }
  - type: listen
    prompt: "Listen first. Which numbered label do you hear?"
    text: "八号。"
    reading: "bā hào"
  - type: practice
    id: zh-num-u03-check-listen
    kind: audio_choice
    prompt: "Listen and choose the label."
    audioText: "六号"
    choices: ["六号", "九号", "三号"]
    answer: "六号"
  - type: practice
    id: zh-num-u03-check-reply
    kind: dialogue_choice
    prompt: "The staff says 五号. Which reply confirms what you heard?"
    choices: ["五号，对吗？", "我叫五号。", "五号在哪里？"]
    answer: "五号，对吗？"
  - type: practice
    id: zh-num-u03-check-produce
    kind: type_answer
    prompt: "Type the label “number nine”."
    answer: "九号"
    acceptedAnswers: ["九号。"]
    hints:
      - "九 is jiǔ; add 号."
  - type: checkpoint
    items:
      - id: zh-num-u03-check-ten
        kind: audio_choice
        prompt: "Listen and choose the number."
        audioText: "十"
        choices: ["十", "七", "四"]
        answer: "十"
      - id: zh-num-u03-check-confirm
        kind: dialogue_choice
        prompt: "Someone repeats 三号，对吗？ Which short answer confirms it?"
        choices: ["对。", "再见。", "我叫小明。"]
        answer: "对。"
exercise:
  type: type_answer
  prompt: "Type “number five”."
  answer: "五号"
  acceptedAnswers: ["五号。"]
---

Use the number as information in a real exchange: hear it, repeat it, and confirm it.
