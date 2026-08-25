---
id: ja-n5-u06-review
track: japanese-jlpt
locale: en
slug: routine-review
title: "Review: talk about your day"
order: 19
published: true
jlpt_level: n5
unit_id: ja-n5-routine-06
unit_title: "Talk about your day"
unit_order: 6
unit_can_do: "Ask when a familiar activity happens and answer with a simple time"
unit_role: review
can_do: "Recall the routine question and produce a time answer without a model"
pattern: "何時に…ますか。 / …時に…ます。"
objectives:
  - Retrieve the time question
  - Distinguish morning and afternoon from audio
  - Produce a routine answer from memory
steps:
  - type: scene
    title: "Answer from memory"
    body: "A friend asks about your schedule again. Respond without looking back at the lesson."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何時に寝ますか。", reading: "なんじに ねますか。" }
      - { speaker: "B", text: "十時に寝ます。", reading: "じゅうじに ねます。" }
  - type: listen
    prompt: "Listen. Which part of the day do you hear?"
    text: "午後四時です。"
    reading: "ごご よじです。"
  - type: practice
    id: ja-u06-review-part
    kind: audio_choice
    prompt: "Listen and choose morning or afternoon."
    audioText: "午前八時です"
    choices: ["morning", "afternoon", "night"]
    answer: "morning"
  - type: practice
    id: ja-u06-review-question
    kind: type_answer
    prompt: "Type: What time do you get up?"
    answer: "何時に起きますか"
    acceptedAnswers: ["何時に起きますか。"]
    hints:
      - "何時 + に + 起きますか."
  - type: practice
    id: ja-u06-review-answer
    kind: type_answer
    prompt: "Say: I get up at eight."
    answer: "八時に起きます"
    acceptedAnswers: ["八時に起きます。"]
  - type: checkpoint
    items:
      - id: ja-u06-review-bed
        kind: listen_type
        prompt: "Listen and type the full bedtime statement."
        audioText: "十一時に寝ます"
        answer: "十一時に寝ます"
        acceptedAnswers: ["十一時に寝ます。"]
      - id: ja-u06-review-particle
        kind: dialogue_choice
        prompt: "Which is natural?"
        choices: ["七時に起きます。", "七時を起きます。", "七時で起きます。"]
        answer: "七時に起きます。"
exercise:
  type: type_answer
  prompt: "Answer from memory: I go to bed at ten."
  answer: "十時に寝ます"
  acceptedAnswers: ["十時に寝ます。"]
---

Delayed retrieval keeps the schedule pattern available for later listening and conversation.
