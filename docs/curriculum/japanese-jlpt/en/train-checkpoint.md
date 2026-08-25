---
id: ja-n5-u08-checkpoint
track: japanese-jlpt
locale: en
slug: train-checkpoint
title: Train travel checkpoint
order: 24
published: true
jlpt_level: n5
unit_id: ja-n5-train-08
unit_title: "Travel by train"
unit_order: 8
unit_can_do: "Check a simple train destination and understand where or when to get off"
unit_role: checkpoint
can_do: "Extract destination and get-off information from a short station exchange"
pattern: "この電車は…に行きますか。 / 次の駅で降ります。"
objectives:
  - Confirm a destination
  - Distinguish 乗る and 降りる
  - Produce one station question
steps:
  - type: scene
    title: "Choose the correct train"
    body: "Two trains are at the platform. Ask before boarding and listen for the next stop."
  - type: dialogue
    lines:
      - { speaker: "A", text: "この電車は新宿駅に行きますか。", reading: "この でんしゃは しんじゅくえきに いきますか。" }
      - { speaker: "B", text: "はい。次の駅です。", reading: "はい。つぎの えきです。" }
  - type: listen
    prompt: "Listen. Is the destination the next station?"
    text: "はい。次の駅です。"
    reading: "はい。つぎの えきです。"
  - type: practice
    id: ja-u08-check-next
    kind: audio_choice
    prompt: "Listen. Which station information do you hear?"
    audioText: "次の駅です"
    choices: ["next station", "last station", "no station"]
    answer: "next station"
  - type: practice
    id: ja-u08-check-verb
    kind: dialogue_choice
    prompt: "You are leaving the train. Which verb matches?"
    choices: ["降ります", "乗ります", "起きます"]
    answer: "降ります"
  - type: practice
    id: ja-u08-check-produce
    kind: type_answer
    prompt: "Type: Does this train go to Tokyo Station?"
    answer: "この電車は東京駅に行きますか"
    acceptedAnswers: ["この電車は東京駅に行きますか。"]
    hints:
      - "この電車は + station + に行きますか."
  - type: checkpoint
    items:
      - id: ja-u08-check-off
        kind: listen_type
        prompt: "Listen and type the instruction."
        audioText: "次の駅で降ります"
        answer: "次の駅で降ります"
        acceptedAnswers: ["次の駅で降ります。"]
      - id: ja-u08-check-ticket
        kind: meaning_choice
        prompt: "Which word means ticket?"
        choices: ["切符", "宿題", "午後"]
        answer: "切符"
exercise:
  type: type_answer
  prompt: "Say: Get off at the next station."
  answer: "次の駅で降ります"
  acceptedAnswers: ["次の駅で降ります。"]
---

The checkpoint requires the learner to retrieve the travel question and act on short listening information.
