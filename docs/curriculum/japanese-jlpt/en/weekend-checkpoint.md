---
id: ja-n5-u09-checkpoint
track: japanese-jlpt
locale: en
slug: weekend-checkpoint
title: Weekend plan checkpoint
order: 27
published: true
jlpt_level: n5
unit_id: ja-n5-weekend-09
unit_title: "Make a free-time plan"
unit_order: 9
unit_can_do: "Say a simple preference, invite someone, and agree on one plan"
unit_role: checkpoint
can_do: "Understand a short invitation and produce one acceptance or invitation"
pattern: "…が好きです。 / …ませんか。 / 一緒に行きましょう。"
objectives:
  - Extract the invited activity from audio
  - Recognize an acceptance
  - Produce a simple invitation
steps:
  - type: scene
    title: "Choose a Sunday activity"
    body: "A friend suggests one activity. Listen for what it is and respond."
  - type: dialogue
    lines:
      - { speaker: "A", text: "日曜日、暇ですか。", reading: "にちようび、ひまですか。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
      - { speaker: "A", text: "映画を見ませんか。", reading: "えいがを みませんか。" }
      - { speaker: "B", text: "いいですね。", reading: "いいですね。" }
  - type: listen
    prompt: "Listen. What does the speaker suggest?"
    text: "映画を見ませんか。"
    reading: "えいがを みませんか。"
  - type: practice
    id: ja-u09-check-activity
    kind: audio_choice
    prompt: "Listen and choose the activity."
    audioText: "映画を見ませんか"
    choices: ["movie", "train", "homework"]
    answer: "movie"
  - type: practice
    id: ja-u09-check-accept
    kind: dialogue_choice
    prompt: "Which reply accepts the invitation naturally?"
    choices: ["いいですね。", "いいえ、駅です。", "午後をください。"]
    answer: "いいですね。"
  - type: practice
    id: ja-u09-check-produce
    kind: type_answer
    prompt: "Invite someone to see a movie."
    answer: "映画を見ませんか"
    acceptedAnswers: ["映画を見ませんか。"]
    hints:
      - "映画を見 + ませんか."
  - type: checkpoint
    items:
      - id: ja-u09-check-free
        kind: listen_type
        prompt: "Listen and type the availability question."
        audioText: "日曜日、暇ですか"
        answer: "日曜日、暇ですか"
        acceptedAnswers: ["日曜日、暇ですか。", "日曜日暇ですか", "日曜日暇ですか。"]
      - id: ja-u09-check-like
        kind: meaning_choice
        prompt: "Which sentence says 'I like music'?"
        choices: ["音楽が好きです。", "音楽で降ります。", "音楽を書いてください。"]
        answer: "音楽が好きです。"
exercise:
  type: type_answer
  prompt: "Say: Let's go together."
  answer: "一緒に行きましょう"
  acceptedAnswers: ["一緒に行きましょう。"]
---

The checkpoint tests whether the learner can turn preference language into an actual social exchange.
