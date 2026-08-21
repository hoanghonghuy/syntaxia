---
id: ja-n5-u05-checkpoint
track: japanese-jlpt
locale: en
slug: location-checkpoint
title: "Checkpoint: ask where a place is"
order: 13
published: true
jlpt_level: n5
unit_id: ja-n5-location-05
unit_title: "Ask where a place is"
unit_order: 5
unit_can_do: "Ask where a common place is and understand a short location answer based on viewpoint"
unit_role: checkpoint
can_do: "Ask for a place and understand ここ・そこ・あそこ with minimal support"
pattern: "Nはどこですか。 / ここです。 / そこです。 / あそこです。"
objectives:
  - "Produce a location question"
  - "Interpret a short viewpoint-based answer"
steps:
  - type: scene
    title: "At the station"
    body: "Ask a staff member where the restroom or station exit is and understand the pointing answer."
  - type: dialogue
    lines:
      - { speaker: "A", text: "すみません。トイレはどこですか。", reading: "すみません。トイレはどこですか。" }
      - { speaker: "B", text: "あそこです。", reading: "あそこです。" }
      - { speaker: "A", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Listen first. Which location word is used?"
    text: "そこです。"
    reading: "そこです。"
  - type: practice
    id: ja-location-u05-check-listen
    kind: audio_choice
    prompt: "Listen and choose the location word."
    audioText: "あそこです"
    choices: ["あそこ", "ここ", "そこ"]
    answer: "あそこ"
  - type: practice
    id: ja-location-u05-check-question
    kind: type_answer
    prompt: "Type: “Where is the restroom?”"
    answer: "トイレはどこですか"
    acceptedAnswers: ["トイレはどこですか。"]
    hints:
      - "Use トイレ + は + どこ + ですか."
  - type: practice
    id: ja-location-u05-check-near-speaker
    kind: dialogue_choice
    prompt: "The place is right next to the speaker. Which answer fits?"
    choices: ["ここです。", "そこです。", "あそこです。"]
    answer: "ここです。"
  - type: checkpoint
    items:
      - id: ja-location-u05-check-station
        kind: type_answer
        prompt: "Type the question: “Where is the station?”"
        answer: "駅はどこですか"
        acceptedAnswers: ["駅はどこですか。"]
      - id: ja-location-u05-check-far
        kind: listen_type
        prompt: "Listen and type the full location answer."
        audioText: "あそこです"
        answer: "あそこです"
        acceptedAnswers: ["あそこです。"]
exercise:
  type: type_answer
  prompt: "The place is near the listener. Type the short answer."
  answer: "そこです"
  acceptedAnswers: ["そこです。"]
---

The checkpoint keeps location words tied to viewpoint and a real location question.
