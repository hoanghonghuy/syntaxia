---
id: ja-n5-20-classroom-actions
track: japanese-jlpt
locale: en
slug: classroom-actions
title: Follow simple classroom instructions
order: 20
published: true
jlpt_level: n5
unit_id: ja-n5-classroom-07
unit_title: "Manage a simple class interaction"
unit_order: 7
unit_can_do: "Understand a short classroom instruction and ask for repetition when needed"
unit_role: lesson
can_do: "Understand read/write instructions and ask the teacher to say something again"
pattern: "読んでください。 / 書いてください。 / もう一度お願いします。"
objectives:
  - Understand a simple classroom request ending in ください
  - Distinguish 読む and 書く from context
  - Ask politely for one repetition
vocab:
  - { surface: "授業", reading: "じゅぎょう", gloss: "lesson; class" }
  - { surface: "宿題", reading: "しゅくだい", gloss: "homework" }
  - { surface: "読む", reading: "よむ", gloss: "to read" }
  - { surface: "書く", reading: "かく", gloss: "to write" }
  - { surface: "先生", reading: "せんせい", gloss: "teacher" }
  - { surface: "教室", reading: "きょうしつ", gloss: "classroom" }
  - { surface: "もう一度", reading: "もういちど", gloss: "once more; again" }
steps:
  - type: scene
    title: "A teacher gives the next task"
    body: "During class, the teacher gives one short instruction. You need to act correctly or ask for repetition."
    visualKey: "student-studying"
    imageAlt: "A learner at a desk reading and writing during class."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "この文章を読んでください。", reading: "この ぶんしょうを よんでください。" }
      - { speaker: "学生", text: "すみません。もう一度お願いします。", reading: "すみません。もういちど おねがいします。" }
      - { speaker: "先生", text: "この文章を読んでください。", reading: "この ぶんしょうを よんでください。" }
      - { speaker: "学生", text: "はい。", reading: "はい。" }
  - type: listen
    prompt: "Listen once. Does the teacher ask the learner to read or write?"
    text: "この文章を読んでください。"
    reading: "この ぶんしょうを よんでください。"
  - type: tip
    title: "Use て-form + ください for a simple request"
    body: "At N5, listen for the action before ください. 読んでください means please read; 書いてください means please write."
  - type: teach
    items:
      - { form: "読んでください。", reading: "よんでください。", gloss: "Please read.", example: "この文章を読んでください。" }
      - { form: "書いてください。", reading: "かいてください。", gloss: "Please write.", example: "名前を書いてください。" }
      - { form: "もう一度お願いします。", reading: "もういちど おねがいします。", gloss: "One more time, please.", example: "すみません。もう一度お願いします。" }
  - type: practice
    id: ja-u07-class-listen
    kind: audio_choice
    prompt: "Listen. What should the learner do?"
    audioText: "名前を書いてください"
    choices: ["write", "read", "leave"]
    answer: "write"
  - type: practice
    id: ja-u07-class-reply
    kind: dialogue_choice
    prompt: "You did not hear the teacher. Which reply is useful?"
    choices: ["もう一度お願いします。", "駅はどこですか。", "十時に寝ます。"]
    answer: "もう一度お願いします。"
  - type: practice
    id: ja-u07-class-produce
    kind: type_answer
    prompt: "Type: Please read."
    answer: "読んでください"
    acceptedAnswers: ["読んでください。"]
    hints:
      - "Use 読んで + ください."
  - type: checkpoint
    items:
      - id: ja-u07-class-check-write
        kind: listen_type
        prompt: "Listen and type the instruction."
        audioText: "書いてください"
        answer: "書いてください"
        acceptedAnswers: ["書いてください。"]
      - id: ja-u07-class-check-homework
        kind: meaning_choice
        prompt: "Which word means homework?"
        choices: ["宿題", "電車", "午後"]
        answer: "宿題"
exercise:
  type: type_answer
  prompt: "Ask the teacher to say it once more."
  answer: "もう一度お願いします"
  acceptedAnswers: ["もう一度お願いします。", "すみません。もう一度お願いします。"]
---

The learning target is classroom survival: identify the requested action and repair the interaction when you miss it.
