---
id: ja-n5-u07-review
track: japanese-jlpt
locale: en
slug: classroom-review
title: "Review: classroom instructions"
order: 22
published: true
jlpt_level: n5
unit_id: ja-n5-classroom-07
unit_title: "Manage a simple class interaction"
unit_order: 7
unit_can_do: "Understand a short classroom instruction and ask for repetition when needed"
unit_role: review
can_do: "Recall the read/write instructions and repetition request without prompts"
pattern: "読んでください。 / 書いてください。 / もう一度お願いします。"
objectives:
  - Retrieve both action requests
  - Recognize the action from audio
  - Repair the interaction from memory
steps:
  - type: scene
    title: "A later class"
    body: "The same instruction pattern appears in a new class. Respond from memory."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "宿題を読んでください。", reading: "しゅくだいを よんでください。" }
      - { speaker: "学生", text: "すみません。もう一度お願いします。", reading: "すみません。もういちど おねがいします。" }
  - type: listen
    prompt: "Listen. Is the teacher asking for reading or writing?"
    text: "書いてください。"
    reading: "かいてください。"
  - type: practice
    id: ja-u07-review-listen
    kind: audio_choice
    prompt: "Listen and choose the requested action."
    audioText: "読んでください"
    choices: ["read", "write", "get up"]
    answer: "read"
  - type: practice
    id: ja-u07-review-write
    kind: type_answer
    prompt: "Type: Please write."
    answer: "書いてください"
    acceptedAnswers: ["書いてください。"]
  - type: practice
    id: ja-u07-review-repeat
    kind: type_answer
    prompt: "Ask for one repetition."
    answer: "もう一度お願いします"
    acceptedAnswers: ["もう一度お願いします。", "すみません。もう一度お願いします。"]
  - type: checkpoint
    items:
      - id: ja-u07-review-read
        kind: listen_type
        prompt: "Listen and type the instruction."
        audioText: "読んでください"
        answer: "読んでください"
        acceptedAnswers: ["読んでください。"]
      - id: ja-u07-review-homework
        kind: meaning_choice
        prompt: "Which item is homework?"
        choices: ["宿題", "切符", "時計"]
        answer: "宿題"
exercise:
  type: type_answer
  prompt: "Say: One more time, please."
  answer: "もう一度お願いします"
  acceptedAnswers: ["もう一度お願いします。"]
---

Delayed review turns the repair phrase into a reusable classroom tool rather than a one-off quiz answer.
