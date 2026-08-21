---
id: ja-n5-u02-checkpoint
track: japanese-jlpt
locale: en
slug: people-checkpoint
title: "Checkpoint: introduce people"
order: 7
published: true
jlpt_level: n5
unit_id: ja-n5-people-02
unit_title: "Introduce yourself and people close to you"
unit_order: 2
unit_can_do: "Introduce yourself, ask a name, and identify a close family member in a short polite exchange"
unit_role: checkpoint
can_do: "Introduce yourself and identify a family member with minimal support"
pattern: "わたしは…です。 / お名前は何ですか。 / この人はだれですか。 / 母です。"
objectives:
  - "Produce a short self-introduction"
  - "Ask a name and identify a family member"
steps:
  - type: scene
    title: "Meet and show a photo"
    body: "You meet a classmate, exchange names, then show one person in a family photo."
  - type: dialogue
    lines:
      - { speaker: "A", text: "はじめまして。わたしはリンです。", reading: "はじめまして。わたしはリンです。" }
      - { speaker: "B", text: "お名前は何ですか。", reading: "おなまえはなんですか。" }
      - { speaker: "A", text: "リンです。この人は母です。", reading: "リンです。このひとはははです。" }
  - type: listen
    prompt: "Listen first. Which family member is mentioned?"
    text: "母です。"
    reading: "ははです。"
  - type: practice
    id: ja-people-u02-check-listen
    kind: audio_choice
    prompt: "Listen. Which family member do you hear?"
    audioText: "兄です"
    choices: ["兄", "姉", "父"]
    answer: "兄"
  - type: practice
    id: ja-people-u02-check-name
    kind: dialogue_choice
    prompt: "Which question politely asks a person's name?"
    choices: ["お名前は何ですか。", "何番ですか。", "どこですか。"]
    answer: "お名前は何ですか。"
  - type: practice
    id: ja-people-u02-check-produce
    kind: type_answer
    prompt: "Your name is リン. Type a short self-introduction."
    answer: "わたしはリンです"
    acceptedAnswers: ["わたしはリンです。"]
    hints:
      - "Use わたしは + リン + です."
  - type: checkpoint
    items:
      - id: ja-people-u02-check-who
        kind: type_answer
        prompt: "Type the question: “Who is this person?”"
        answer: "この人はだれですか"
        acceptedAnswers: ["この人はだれですか。"]
      - id: ja-people-u02-check-mother
        kind: listen_type
        prompt: "Listen and type the short answer."
        audioText: "母です"
        answer: "母です"
        acceptedAnswers: ["母です。", "ははです", "ははです。"]
exercise:
  type: type_answer
  prompt: "The person in your photo is your older brother. Type the short answer."
  answer: "兄です"
  acceptedAnswers: ["兄です。", "あにです", "あにです。"]
---

The checkpoint combines the two skills into one social exchange instead of testing names and family words separately.
