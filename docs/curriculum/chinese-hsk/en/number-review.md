---
id: zh-hsk-b1-u03-review
track: chinese-hsk
locale: en
slug: number-review
title: "Review: confirm a number"
order: 5
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-number-03
unit_title: "Confirm a number"
unit_order: 3
unit_can_do: "Hear, repeat, and confirm a simple numbered label in a short service exchange"
unit_role: review
can_do: "Retrieve numbered-label chunks without a model"
pattern: "…号 / …号，对吗？ / 对。"
objectives:
  - "Recall number characters from sound"
  - "Rebuild the confirmation exchange"
steps:
  - type: scene
    title: "Recall the number"
    body: "You hear a numbered label again later. Rebuild the useful confirmation chunks from memory."
  - type: dialogue
    lines:
      - { speaker: "Staff", text: "七号。", reading: "qī hào" }
      - { speaker: "You", text: "七号，对吗？", reading: "qī hào, duì ma" }
      - { speaker: "Staff", text: "对。", reading: "duì" }
  - type: listen
    prompt: "Listen before reading. Which label do you hear?"
    text: "四号。"
    reading: "sì hào"
  - type: practice
    id: zh-num-u03-review-listen
    kind: audio_choice
    prompt: "Listen and choose the label."
    audioText: "九号"
    choices: ["九号", "六号", "二号"]
    answer: "九号"
  - type: practice
    id: zh-num-u03-review-reply
    kind: dialogue_choice
    prompt: "You hear 八号 and want to check it. What do you say?"
    choices: ["八号，对吗？", "八号是谁？", "我要八号。"]
    answer: "八号，对吗？"
  - type: practice
    id: zh-num-u03-review-produce
    kind: type_answer
    prompt: "Type the label “number six”."
    answer: "六号"
    acceptedAnswers: ["六号。"]
    hints:
      - "六 is liù; add 号."
  - type: checkpoint
    items:
      - id: zh-num-u03-review-hear
        kind: audio_choice
        prompt: "Listen and choose the number."
        audioText: "二"
        choices: ["二", "八", "十"]
        answer: "二"
      - id: zh-num-u03-review-close
        kind: dialogue_choice
        prompt: "After you confirm the correct number, which answer means “correct”?"
        choices: ["对。", "哪里？", "谢谢你。"]
        answer: "对。"
exercise:
  type: type_answer
  prompt: "Type “number eight”."
  answer: "八号"
  acceptedAnswers: ["八号。"]
---

Review means retrieving the sound-character-label connection and the confirmation chunk without another explanation.
