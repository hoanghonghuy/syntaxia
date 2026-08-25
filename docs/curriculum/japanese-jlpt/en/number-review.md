---
id: ja-n5-u03-review
track: japanese-jlpt
locale: en
slug: number-review
title: "Review: hear and give a number"
order: 10
published: true
jlpt_level: n5
unit_id: ja-n5-number-03
unit_title: "Hear and give a number"
unit_order: 3
unit_can_do: "Ask for and give a simple number from one to ten in a short exchange"
unit_role: review
can_do: "Recall the number question and produce a numbered answer from memory"
pattern: "何番ですか。 / 七番です。 / 十番です。"
objectives:
  - "Recall 何番ですか without a model"
  - "Retrieve number readings inside 番です answers"
steps:
  - type: scene
    title: "Quick number check"
    body: "A staff member asks your number again. Answer without a written model."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何番ですか。", reading: "なんばんですか。" }
      - { speaker: "B", text: "九番です。", reading: "きゅうばんです。" }
      - { speaker: "A", text: "九番ですね。", reading: "きゅうばんですね。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
  - type: listen
    prompt: "Listen and recall the full numbered answer."
    text: "四番です。"
    reading: "よんばんです。"
  - type: practice
    id: ja-number-u03-review-listen
    kind: audio_choice
    prompt: "Listen. Which number do you hear?"
    audioText: "十番です"
    choices: ["十", "七", "九"]
    answer: "十"
  - type: practice
    id: ja-number-u03-review-question
    kind: dialogue_choice
    prompt: "Which line asks for a number?"
    choices: ["何番ですか。", "この人はだれですか。", "お名前は何ですか。"]
    answer: "何番ですか。"
  - type: practice
    id: ja-number-u03-review-produce
    kind: type_answer
    prompt: "Your number is 9. Type the full answer."
    answer: "九番です"
    acceptedAnswers: ["九番です。", "きゅうばんです", "きゅうばんです。"]
    hints:
      - "Use 九 + 番 + です."
  - type: checkpoint
    items:
      - id: ja-number-u03-review-seven
        kind: listen_type
        prompt: "Listen and type the full answer."
        audioText: "七番です"
        answer: "七番です"
        acceptedAnswers: ["七番です。", "ななばんです", "ななばんです。"]
      - id: ja-number-u03-review-question-type
        kind: type_answer
        prompt: "Type the question: “What number?”"
        answer: "何番ですか"
        acceptedAnswers: ["何番ですか。", "なんばんですか", "なんばんですか。"]
exercise:
  type: type_answer
  prompt: "Your number is 6. Type the full answer."
  answer: "六番です"
  acceptedAnswers: ["六番です。", "ろくばんです", "ろくばんです。"]
---

This review reduces support and asks the learner to retrieve the question and numbered answer from memory.
