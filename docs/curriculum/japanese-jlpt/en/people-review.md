---
id: ja-n5-u02-review
track: japanese-jlpt
locale: en
slug: people-review
title: "Review: introduce people"
order: 8
published: true
jlpt_level: n5
unit_id: ja-n5-people-02
unit_title: "Introduce yourself and people close to you"
unit_order: 2
unit_can_do: "Introduce yourself, ask a name, and identify a close family member in a short polite exchange"
unit_role: review
can_do: "Recall the name and family frames with little scaffolding"
pattern: "わたしは…です。 / お名前は何ですか。 / この人はだれですか。 / 父です。"
objectives:
  - "Recall the polite name frame"
  - "Recall own-family labels in context"
steps:
  - type: scene
    title: "Meet again"
    body: "You meet someone again and briefly introduce yourself before showing a family photo."
  - type: dialogue
    lines:
      - { speaker: "A", text: "わたしはリンです。", reading: "わたしはリンです。" }
      - { speaker: "B", text: "お名前は何ですか。", reading: "おなまえはなんですか。" }
      - { speaker: "A", text: "リンです。この人は父です。", reading: "リンです。このひとはちちです。" }
  - type: listen
    prompt: "Listen and recall the family member."
    text: "姉です。"
    reading: "あねです。"
  - type: practice
    id: ja-people-u02-review-listen
    kind: audio_choice
    prompt: "Listen. Which family member is mentioned?"
    audioText: "父です"
    choices: ["父", "母", "兄"]
    answer: "父"
  - type: practice
    id: ja-people-u02-review-name
    kind: dialogue_choice
    prompt: "Which line politely asks a person's name?"
    choices: ["お名前は何ですか。", "この人はだれですか。", "何番ですか。"]
    answer: "お名前は何ですか。"
  - type: practice
    id: ja-people-u02-review-produce
    kind: type_answer
    prompt: "Your name is ゆき. Type a short self-introduction."
    answer: "わたしはゆきです"
    acceptedAnswers: ["わたしはゆきです。"]
    hints:
      - "Use わたしは + ゆき + です."
  - type: checkpoint
    items:
      - id: ja-people-u02-review-who
        kind: listen_type
        prompt: "Listen and type the question."
        audioText: "この人はだれですか"
        answer: "この人はだれですか"
        acceptedAnswers: ["この人はだれですか。"]
      - id: ja-people-u02-review-sister
        kind: type_answer
        prompt: "The person is your older sister. Type the short answer."
        answer: "姉です"
        acceptedAnswers: ["姉です。", "あねです", "あねです。"]
exercise:
  type: type_answer
  prompt: "The person is your mother. Type the short answer."
  answer: "母です"
  acceptedAnswers: ["母です。", "ははです", "ははです。"]
---

This review reduces prompts and asks the learner to retrieve the same social frames from memory.
