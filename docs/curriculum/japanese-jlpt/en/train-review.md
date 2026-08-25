---
id: ja-n5-u08-review
track: japanese-jlpt
locale: en
slug: train-review
title: "Review: travel by train"
order: 25
published: true
jlpt_level: n5
unit_id: ja-n5-train-08
unit_title: "Travel by train"
unit_order: 8
unit_can_do: "Check a simple train destination and understand where or when to get off"
unit_role: review
can_do: "Recall the destination question and get-off instruction without a written model"
pattern: "この電車は…に行きますか。 / 次の駅で降ります。"
objectives:
  - Retrieve the destination question
  - Recognize the next-stop instruction
  - Produce the get-off sentence from memory
steps:
  - type: scene
    title: "A different platform"
    body: "You are travelling again. Ask and respond using the same travel chunks from memory."
  - type: dialogue
    lines:
      - { speaker: "A", text: "この電車は東京駅に行きますか。", reading: "この でんしゃは とうきょうえきに いきますか。" }
      - { speaker: "B", text: "はい。次の駅です。", reading: "はい。つぎの えきです。" }
  - type: listen
    prompt: "Listen for the action at the next station."
    text: "次の駅で降ります。"
    reading: "つぎの えきで おります。"
  - type: practice
    id: ja-u08-review-action
    kind: audio_choice
    prompt: "Listen. What action do you hear?"
    audioText: "電車に乗ります"
    choices: ["board/ride", "get off", "write"]
    answer: "board/ride"
  - type: practice
    id: ja-u08-review-question
    kind: type_answer
    prompt: "Ask whether this train goes to Tokyo Station."
    answer: "この電車は東京駅に行きますか"
    acceptedAnswers: ["この電車は東京駅に行きますか。"]
  - type: practice
    id: ja-u08-review-off
    kind: type_answer
    prompt: "Say: Get off at the next station."
    answer: "次の駅で降ります"
    acceptedAnswers: ["次の駅で降ります。"]
  - type: checkpoint
    items:
      - id: ja-u08-review-next
        kind: listen_type
        prompt: "Listen and type the short answer."
        audioText: "次の駅です"
        answer: "次の駅です"
        acceptedAnswers: ["次の駅です。"]
      - id: ja-u08-review-ticket
        kind: meaning_choice
        prompt: "You need a train ticket. Which word should you recognize?"
        choices: ["切符", "授業", "朝"]
        answer: "切符"
exercise:
  type: type_answer
  prompt: "Retrieve the get-off instruction."
  answer: "次の駅で降ります"
  acceptedAnswers: ["次の駅で降ります。"]
---

The delayed review keeps the travel chunks available for a future station interaction.
