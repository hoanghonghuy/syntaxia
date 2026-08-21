---
id: ja-n5-u03-checkpoint
track: japanese-jlpt
locale: en
slug: number-checkpoint
title: "Checkpoint: hear and give a number"
order: 9
published: true
jlpt_level: n5
unit_id: ja-n5-number-03
unit_title: "Hear and give a number"
unit_order: 3
unit_can_do: "Ask for and give a simple number from one to ten in a short exchange"
unit_role: checkpoint
can_do: "Understand a simple number and answer 何番ですか with minimal support"
pattern: "何番ですか。 / 八番です。"
objectives:
  - "Recognize a number by sound"
  - "Produce N番です as an answer"
steps:
  - type: scene
    title: "Orientation number"
    body: "Someone asks for your assigned number. Listen, confirm it, and give your own number."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何番ですか。", reading: "なんばんですか。" }
      - { speaker: "B", text: "七番です。", reading: "ななばんです。" }
      - { speaker: "A", text: "七番ですね。", reading: "ななばんですね。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
  - type: listen
    prompt: "Listen first. Which number do you hear?"
    text: "九番です。"
    reading: "きゅうばんです。"
  - type: practice
    id: ja-number-u03-check-listen
    kind: audio_choice
    prompt: "Listen and choose the number."
    audioText: "六番です"
    choices: ["六", "四", "八"]
    answer: "六"
  - type: practice
    id: ja-number-u03-check-question
    kind: dialogue_choice
    prompt: "Which question asks for a number?"
    choices: ["何番ですか。", "お名前は何ですか。", "どこですか。"]
    answer: "何番ですか。"
  - type: practice
    id: ja-number-u03-check-produce
    kind: type_answer
    prompt: "Your number is 4. Type the full answer."
    answer: "四番です"
    acceptedAnswers: ["四番です。", "よんばんです", "よんばんです。"]
    hints:
      - "Use 四 + 番 + です."
  - type: checkpoint
    items:
      - id: ja-number-u03-check-eight
        kind: listen_type
        prompt: "Listen and type the full answer."
        audioText: "八番です"
        answer: "八番です"
        acceptedAnswers: ["八番です。", "はちばんです", "はちばんです。"]
      - id: ja-number-u03-check-ten
        kind: type_answer
        prompt: "Your number is 10. Type the full answer."
        answer: "十番です"
        acceptedAnswers: ["十番です。", "じゅうばんです", "じゅうばんです。"]
exercise:
  type: type_answer
  prompt: "Your number is 7. Type the full answer."
  answer: "七番です"
  acceptedAnswers: ["七番です。", "ななばんです", "ななばんです。"]
---

The checkpoint treats numbers as spoken information to understand and return, not a sequence to recite.
