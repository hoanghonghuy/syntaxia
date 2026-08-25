---
id: ja-n5-u07-checkpoint
track: japanese-jlpt
locale: en
slug: classroom-checkpoint
title: Classroom checkpoint
order: 21
published: true
jlpt_level: n5
unit_id: ja-n5-classroom-07
unit_title: "Manage a simple class interaction"
unit_order: 7
unit_can_do: "Understand a short classroom instruction and ask for repetition when needed"
unit_role: checkpoint
can_do: "Pick out the requested classroom action and repair a missed instruction"
pattern: "…てください。 / もう一度お願いします。"
objectives:
  - Extract read/write from slow classroom audio
  - Respond to a missed instruction
  - Produce one request without a model
steps:
  - type: scene
    title: "The next instruction"
    body: "The teacher alternates between reading and writing tasks. Listen for the action word."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "本を読んでください。", reading: "ほんを よんでください。" }
      - { speaker: "学生", text: "はい。", reading: "はい。" }
      - { speaker: "先生", text: "次に、名前を書いてください。", reading: "つぎに、なまえを かいてください。" }
  - type: listen
    prompt: "Listen for the second action."
    text: "名前を書いてください。"
    reading: "なまえを かいてください。"
  - type: practice
    id: ja-u07-check-action
    kind: audio_choice
    prompt: "Listen. Which action is requested?"
    audioText: "本を読んでください"
    choices: ["read", "write", "sleep"]
    answer: "read"
  - type: practice
    id: ja-u07-check-repair
    kind: dialogue_choice
    prompt: "You missed the instruction. What can you say?"
    choices: ["もう一度お願いします。", "お茶をください。", "ここです。"]
    answer: "もう一度お願いします。"
  - type: practice
    id: ja-u07-check-produce
    kind: type_answer
    prompt: "Type: Please write."
    answer: "書いてください"
    acceptedAnswers: ["書いてください。"]
    hints:
      - "書いて + ください."
  - type: checkpoint
    items:
      - id: ja-u07-check-read
        kind: listen_type
        prompt: "Listen and type the short instruction."
        audioText: "読んでください"
        answer: "読んでください"
        acceptedAnswers: ["読んでください。"]
      - id: ja-u07-check-class
        kind: meaning_choice
        prompt: "授業 most directly refers to what here?"
        choices: ["class/lesson", "train", "bedtime"]
        answer: "class/lesson"
exercise:
  type: type_answer
  prompt: "Ask for one repetition."
  answer: "もう一度お願いします"
  acceptedAnswers: ["もう一度お願いします。"]
---

This checkpoint mirrors the short, information-focused classroom listening expected at beginner level.
