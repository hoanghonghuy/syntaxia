---
id: ja-n5-03-numbers
track: japanese-jlpt
locale: en
slug: numbers
title: Hear and give a simple number
order: 3
published: true
jlpt_level: n5
unit_id: ja-n5-number-03
unit_title: "Hear and give a number"
unit_order: 3
unit_can_do: "Ask for and give a simple number from one to ten in a short exchange"
unit_role: lesson
can_do: "Understand numbers one to ten and answer a simple number question"
pattern: "何番ですか。 / 八番です。"
objectives:
  - Recognize common readings for one to ten
  - Ask 何番ですか
  - Give a number with 番です
vocab:
  - { surface: "一", reading: "いち", gloss: "1" }
  - { surface: "二", reading: "に", gloss: "2" }
  - { surface: "三", reading: "さん", gloss: "3" }
  - { surface: "四", reading: "よん", gloss: "4" }
  - { surface: "五", reading: "ご", gloss: "5" }
  - { surface: "六", reading: "ろく", gloss: "6" }
  - { surface: "七", reading: "なな", gloss: "7" }
  - { surface: "八", reading: "はち", gloss: "8" }
  - { surface: "九", reading: "きゅう", gloss: "9" }
  - { surface: "十", reading: "じゅう", gloss: "10" }
  - { surface: "番", reading: "ばん", gloss: "number marker" }
steps:
  - type: scene
    title: "Check a class number"
    body: "At orientation, learners receive a number from one to ten. Ask for the number and give yours."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何番ですか。", reading: "なんばんですか。" }
      - { speaker: "B", text: "八番です。", reading: "はちばんです。" }
      - { speaker: "A", text: "八番ですね。", reading: "はちばんですね。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
  - type: listen
    prompt: "Listen for the number reading."
    text: "六番です。"
    reading: "ろくばんです。"
  - type: tip
    title: "Start with one common reading"
    body: "Some numbers have alternate readings in other contexts. This lesson uses よん, なな, and きゅう first, then later lessons can add context-specific variants."
  - type: teach
    items:
      - { form: "一・二・三", reading: "いち・に・さん", gloss: "1, 2, 3", example: "三番です。" }
      - { form: "四・五・六", reading: "よん・ご・ろく", gloss: "4, 5, 6", example: "六番です。" }
      - { form: "七・八", reading: "なな・はち", gloss: "7, 8", example: "八番です。" }
      - { form: "九・十", reading: "きゅう・じゅう", gloss: "9, 10", example: "十番です。" }
      - { form: "何番ですか。", reading: "なんばんですか。", gloss: "What number?", example: "何番ですか。" }
  - type: practice
    id: ja-numbers-listen-1
    kind: listen_type
    prompt: "Listen and type the number reading in hiragana."
    audioText: "はち"
    answer: "はち"
  - type: practice
    id: ja-numbers-meaning-1
    kind: meaning_choice
    prompt: "Which kanji is 8?"
    choices: ["八", "六", "十"]
    answer: "八"
  - type: practice
    id: ja-numbers-produce-1
    kind: type_answer
    prompt: "Your number is 8. Type the answer using the lesson pattern."
    answer: "八番です"
    acceptedAnswers: ["八番です。", "はちばんです", "はちばんです。"]
    hints:
      - "Use 八 + 番 + です."
  - type: checkpoint
    items:
      - id: ja-numbers-check-1
        kind: dialogue_choice
        prompt: "Which question asks for a number?"
        choices: ["何番ですか。", "お名前は何ですか。", "これをください。"]
        answer: "何番ですか。"
      - id: ja-numbers-check-2
        kind: dialogue_choice
        prompt: "Review: which sentence asks a person's name?"
        choices: ["お名前は何ですか。", "八番です。", "はい。"]
        answer: "お名前は何ですか。"
exercise:
  type: listen_type
  prompt: "Listen and type the reading."
  audioText: "ご"
  answer: "ご"
---

Numbers are used as information to hear and give, not only as a sequence to recite.
