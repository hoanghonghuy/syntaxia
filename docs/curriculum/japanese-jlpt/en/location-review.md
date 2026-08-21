---
id: ja-n5-u05-review
track: japanese-jlpt
locale: en
slug: location-review
title: "Review: ask where a place is"
order: 14
published: true
jlpt_level: n5
unit_id: ja-n5-location-05
unit_title: "Ask where a place is"
unit_order: 5
unit_can_do: "Ask where a common place is and understand a short location answer based on viewpoint"
unit_role: review
can_do: "Recall the location question and viewpoint words with little scaffolding"
pattern: "Nはどこですか。 / ここです。 / そこです。 / あそこです。"
objectives:
  - "Retrieve Nはどこですか from memory"
  - "Choose and produce the location word from viewpoint"
steps:
  - type: scene
    title: "Find another place"
    body: "You need another place at the station. Ask without a written model and understand the short answer."
  - type: dialogue
    lines:
      - { speaker: "A", text: "駅はどこですか。", reading: "えきはどこですか。" }
      - { speaker: "B", text: "そこです。", reading: "そこです。" }
      - { speaker: "A", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen and recall the viewpoint word."
    text: "ここです。"
    reading: "ここです。"
  - type: practice
    id: ja-location-u05-review-listen
    kind: audio_choice
    prompt: "Listen. Which location word do you hear?"
    audioText: "そこです"
    choices: ["そこ", "ここ", "あそこ"]
    answer: "そこ"
  - type: practice
    id: ja-location-u05-review-question
    kind: type_answer
    prompt: "Type: “Where is the station?”"
    answer: "駅はどこですか"
    acceptedAnswers: ["駅はどこですか。"]
    hints:
      - "Use 駅 + は + どこ + ですか."
  - type: practice
    id: ja-location-u05-review-far
    kind: dialogue_choice
    prompt: "The place is away from both people. Which answer fits?"
    choices: ["あそこです。", "ここです。", "そこです。"]
    answer: "あそこです。"
  - type: checkpoint
    items:
      - id: ja-location-u05-review-restroom
        kind: listen_type
        prompt: "Listen and type the full question."
        audioText: "トイレはどこですか"
        answer: "トイレはどこですか"
        acceptedAnswers: ["トイレはどこですか。"]
      - id: ja-location-u05-review-here
        kind: type_answer
        prompt: "The place is next to you, the speaker. Type the short answer."
        answer: "ここです"
        acceptedAnswers: ["ここです。"]
exercise:
  type: type_answer
  prompt: "The place is far from both people. Type the short answer."
  answer: "あそこです"
  acceptedAnswers: ["あそこです。"]
---

This review removes most support and keeps ここ・そこ・あそこ tied to viewpoint rather than isolated translations.
