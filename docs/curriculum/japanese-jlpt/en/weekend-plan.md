---
id: ja-n5-26-weekend-plan
track: japanese-jlpt
locale: en
slug: weekend-plan
title: Make a simple weekend plan
order: 26
published: true
jlpt_level: n5
unit_id: ja-n5-weekend-09
unit_title: "Make a free-time plan"
unit_order: 9
unit_can_do: "Say a simple preference, invite someone, and agree on one plan"
unit_role: lesson
can_do: "Say what you like and invite a friend to a simple weekend activity"
pattern: "…が好きです。 / 日曜日、暇ですか。 / 映画を見ませんか。 / 一緒に行きましょう。"
objectives:
  - State one simple preference with 好きです
  - Ask whether someone is free
  - Make and accept a simple invitation
vocab:
  - { surface: "好き", reading: "すき", gloss: "liked; to like" }
  - { surface: "音楽", reading: "おんがく", gloss: "music" }
  - { surface: "映画", reading: "えいが", gloss: "movie" }
  - { surface: "スポーツ", reading: "スポーツ", gloss: "sports" }
  - { surface: "一緒", reading: "いっしょ", gloss: "together" }
  - { surface: "日曜日", reading: "にちようび", gloss: "Sunday" }
  - { surface: "暇", reading: "ひま", gloss: "free time; not busy" }
  - { surface: "会う", reading: "あう", gloss: "to meet" }
steps:
  - type: scene
    title: "Plan Sunday with a friend"
    body: "You are finishing class and want to make one simple plan for Sunday."
    visualKey: "weekend-plan"
    imageAlt: "Two friends compare a weekend calendar and choose a leisure activity."
  - type: dialogue
    lines:
      - { speaker: "A", text: "日曜日、暇ですか。", reading: "にちようび、ひまですか。" }
      - { speaker: "B", text: "はい、暇です。", reading: "はい、ひまです。" }
      - { speaker: "A", text: "映画が好きですか。", reading: "えいがが すきですか。" }
      - { speaker: "B", text: "はい、好きです。", reading: "はい、すきです。" }
      - { speaker: "A", text: "映画を見ませんか。", reading: "えいがを みませんか。" }
      - { speaker: "B", text: "いいですね。一緒に行きましょう。", reading: "いいですね。いっしょに いきましょう。" }
  - type: listen
    prompt: "Listen once. What activity is suggested?"
    text: "映画を見ませんか。"
    reading: "えいがを みませんか。"
  - type: tip
    title: "Use ませんか for a gentle invitation"
    body: "At beginner level, Verb-ませんか is a useful invitation: 映画を見ませんか. Agree with いいですね or 一緒に行きましょう."
  - type: teach
    items:
      - { form: "音楽が好きです。", reading: "おんがくが すきです。", gloss: "I like music.", example: "音楽が好きです。" }
      - { form: "日曜日、暇ですか。", reading: "にちようび、ひまですか。", gloss: "Are you free Sunday?", example: "日曜日、暇ですか。" }
      - { form: "映画を見ませんか。", reading: "えいがを みませんか。", gloss: "Would you like to see a movie?", example: "映画を見ませんか。" }
      - { form: "一緒に行きましょう。", reading: "いっしょに いきましょう。", gloss: "Let's go together.", example: "一緒に行きましょう。" }
  - type: practice
    id: ja-u09-weekend-listen
    kind: audio_choice
    prompt: "Listen. What is the invitation about?"
    audioText: "映画を見ませんか"
    choices: ["a movie", "homework", "a train"]
    answer: "a movie"
  - type: practice
    id: ja-u09-weekend-reply
    kind: dialogue_choice
    prompt: "A friend asks 映画を見ませんか。 You want to accept. Which reply fits?"
    choices: ["いいですね。一緒に行きましょう。", "次の駅で降ります。", "書いてください。"]
    answer: "いいですね。一緒に行きましょう。"
  - type: practice
    id: ja-u09-weekend-produce
    kind: type_answer
    prompt: "Type: Are you free Sunday?"
    answer: "日曜日、暇ですか"
    acceptedAnswers: ["日曜日、暇ですか。", "日曜日暇ですか", "日曜日暇ですか。"]
    hints:
      - "日曜日 + 暇ですか."
  - type: checkpoint
    items:
      - id: ja-u09-weekend-check-like
        kind: listen_type
        prompt: "Listen and type the preference statement."
        audioText: "音楽が好きです"
        answer: "音楽が好きです"
        acceptedAnswers: ["音楽が好きです。"]
      - id: ja-u09-weekend-check-together
        kind: meaning_choice
        prompt: "Which word means together?"
        choices: ["一緒", "午後", "切符"]
        answer: "一緒"
exercise:
  type: type_answer
  prompt: "Invite a friend to see a movie."
  answer: "映画を見ませんか"
  acceptedAnswers: ["映画を見ませんか。"]
---

The unit ends the foundation course with a real social action: express a preference, invite, and make one plan.
