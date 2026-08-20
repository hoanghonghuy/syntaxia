---
id: ja-n5-06-places
track: japanese-jlpt
locale: en
slug: places
title: Ask where a place is
order: 6
published: true
jlpt_level: n5
can_do: "Ask where a common place is and understand ここ・そこ・あそこ in a short answer"
pattern: "トイレはどこですか。 / ここです。 / あそこです。"
objectives:
  - Ask N はどこですか
  - Understand ここ, そこ, and あそこ relative to the speakers
  - Give a minimal location answer with です
vocab:
  - { surface: "どこ", reading: "どこ", gloss: "where" }
  - { surface: "ここ", reading: "ここ", gloss: "here, near the speaker" }
  - { surface: "そこ", reading: "そこ", gloss: "there, near the listener" }
  - { surface: "あそこ", reading: "あそこ", gloss: "over there, away from both" }
  - { surface: "トイレ", reading: "トイレ", gloss: "toilet / restroom" }
  - { surface: "駅", reading: "えき", gloss: "station" }
  - { surface: "店", reading: "みせ", gloss: "shop / store" }
steps:
  - type: scene
    title: "Find the restroom"
    body: "You are at a station and need the restroom. Ask a staff member where it is and understand a pointing answer."
  - type: dialogue
    lines:
      - { speaker: "A", text: "すみません。トイレはどこですか。", reading: "すみません。トイレはどこですか。" }
      - { speaker: "B", text: "あそこです。", reading: "あそこです。" }
      - { speaker: "A", text: "あそこですか。", reading: "あそこですか。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
      - { speaker: "A", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen for the location word in the answer."
    text: "あそこです。"
    reading: "あそこです。"
  - type: tip
    title: "The three place words depend on viewpoint"
    body: "ここ is near the speaker, そこ is near the listener, and あそこ is away from both. Learn them with a physical scene or pointing gesture, not as three detached translations."
  - type: teach
    items:
      - { form: "トイレはどこですか。", reading: "トイレはどこですか。", gloss: "Where is the restroom?", example: "トイレはどこですか。" }
      - { form: "ここです。", reading: "ここです。", gloss: "It is here.", example: "ここです。" }
      - { form: "そこです。", reading: "そこです。", gloss: "It is there near you.", example: "そこです。" }
      - { form: "あそこです。", reading: "あそこです。", gloss: "It is over there.", example: "あそこです。" }
  - type: practice
    id: ja-places-dialogue-1
    kind: dialogue_choice
    prompt: "You need the restroom. Which question asks for its location?"
    choices: ["トイレはどこですか。", "トイレをください。", "トイレはだれですか。"]
    answer: "トイレはどこですか。"
  - type: practice
    id: ja-places-listen-1
    kind: audio_choice
    prompt: "Listen. Which location word do you hear?"
    audioText: "ここです"
    choices: ["ここ", "そこ", "あそこ"]
    answer: "ここ"
  - type: practice
    id: ja-places-produce-1
    kind: type_answer
    prompt: "Type the Japanese question “Where is the restroom?”"
    answer: "トイレはどこですか"
    acceptedAnswers: ["トイレはどこですか。"]
    hints:
      - "Use トイレ + は + どこ + ですか."
  - type: checkpoint
    items:
      - id: ja-places-check-1
        kind: meaning_choice
        prompt: "The place is away from both speakers. Which answer fits while pointing?"
        choices: ["あそこです。", "ここです。", "母です。"]
        answer: "あそこです。"
      - id: ja-places-check-2
        kind: dialogue_choice
        prompt: "Review: at a counter you want tea. What can you say?"
        choices: ["お茶をください。", "お茶はどこですか。", "お茶はだれですか。"]
        answer: "お茶をください。"
exercise:
  type: dialogue_choice
  prompt: "Choose the location question."
  choices: ["駅はどこですか。", "駅をください。", "駅はだれですか。"]
  answer: "駅はどこですか。"
---

This starter lesson ties demonstrative place words to viewpoint and pointing, which is essential to their meaning in Japanese.
