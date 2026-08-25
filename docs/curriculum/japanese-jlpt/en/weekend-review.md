---
id: ja-n5-u09-review
track: japanese-jlpt
locale: en
slug: weekend-review
title: "Review: make a weekend plan"
order: 28
published: true
jlpt_level: n5
unit_id: ja-n5-weekend-09
unit_title: "Make a free-time plan"
unit_order: 9
unit_can_do: "Say a simple preference, invite someone, and agree on one plan"
unit_role: review
can_do: "Recall the preference and invitation chunks without a written model"
pattern: "…が好きです。 / …ませんか。 / 一緒に行きましょう。"
objectives:
  - Retrieve a preference sentence
  - Retrieve an invitation
  - Accept and close a simple plan
steps:
  - type: scene
    title: "Plan again from memory"
    body: "A friend is free this Sunday. Make the plan without looking at the earlier dialogue."
  - type: dialogue
    lines:
      - { speaker: "A", text: "日曜日、暇ですか。", reading: "にちようび、ひまですか。" }
      - { speaker: "B", text: "はい。映画を見ませんか。", reading: "はい。えいがを みませんか。" }
      - { speaker: "A", text: "いいですね。一緒に行きましょう。", reading: "いいですね。いっしょに いきましょう。" }
  - type: listen
    prompt: "Listen. Which leisure word do you hear?"
    text: "音楽が好きです。"
    reading: "おんがくが すきです。"
  - type: practice
    id: ja-u09-review-like
    kind: audio_choice
    prompt: "Listen. What does the speaker like?"
    audioText: "音楽が好きです"
    choices: ["music", "train", "homework"]
    answer: "music"
  - type: practice
    id: ja-u09-review-invite
    kind: type_answer
    prompt: "Invite someone to see a movie."
    answer: "映画を見ませんか"
    acceptedAnswers: ["映画を見ませんか。"]
  - type: practice
    id: ja-u09-review-accept
    kind: type_answer
    prompt: "Say: Let's go together."
    answer: "一緒に行きましょう"
    acceptedAnswers: ["一緒に行きましょう。"]
  - type: checkpoint
    items:
      - id: ja-u09-review-free
        kind: listen_type
        prompt: "Listen and type the availability question."
        audioText: "日曜日、暇ですか"
        answer: "日曜日、暇ですか"
        acceptedAnswers: ["日曜日、暇ですか。", "日曜日暇ですか", "日曜日暇ですか。"]
      - id: ja-u09-review-preference
        kind: type_answer
        prompt: "Say: I like sports."
        answer: "スポーツが好きです"
        acceptedAnswers: ["スポーツが好きです。"]
exercise:
  type: type_answer
  prompt: "Retrieve the movie invitation."
  answer: "映画を見ませんか"
  acceptedAnswers: ["映画を見ませんか。"]
---

The review closes the N5 foundation path by retrieving a complete social mini-exchange, not just isolated vocabulary.
