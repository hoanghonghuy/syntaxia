---
id: ja-n5-u06-checkpoint
track: japanese-jlpt
locale: en
slug: routine-checkpoint
title: Daily routine checkpoint
order: 18
published: true
jlpt_level: n5
unit_id: ja-n5-routine-06
unit_title: "Talk about your day"
unit_order: 6
unit_can_do: "Ask when a familiar activity happens and answer with a simple time"
unit_role: checkpoint
can_do: "Understand and produce a simple routine time with minimal support"
pattern: "何時に…ますか。 / …時に…ます。"
objectives:
  - Extract a clock time from a short routine statement
  - Choose に for a specific time
  - Produce one complete routine answer
steps:
  - type: scene
    title: "Check a classmate's schedule"
    body: "You hear two short routine facts and need the exact times."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何時に起きますか。", reading: "なんじに おきますか。" }
      - { speaker: "B", text: "午前六時に起きます。", reading: "ごぜん ろくじに おきます。" }
      - { speaker: "A", text: "何時に寝ますか。", reading: "なんじに ねますか。" }
      - { speaker: "B", text: "十一時に寝ます。", reading: "じゅういちじに ねます。" }
  - type: listen
    prompt: "Listen for the bedtime."
    text: "十一時に寝ます。"
    reading: "じゅういちじに ねます。"
  - type: practice
    id: ja-u06-check-listen
    kind: audio_choice
    prompt: "Listen. When does the person get up?"
    audioText: "午前六時に起きます"
    choices: ["6 a.m.", "6 p.m.", "11 p.m."]
    answer: "6 a.m."
  - type: practice
    id: ja-u06-check-particle
    kind: dialogue_choice
    prompt: "Complete the natural time phrase: 七時___起きます。"
    choices: ["に", "を", "で"]
    answer: "に"
  - type: practice
    id: ja-u06-check-produce
    kind: type_answer
    prompt: "Type: I go to bed at eleven."
    answer: "十一時に寝ます"
    acceptedAnswers: ["十一時に寝ます。"]
    hints:
      - "Time + に + 寝ます."
  - type: checkpoint
    items:
      - id: ja-u06-check-am-pm
        kind: meaning_choice
        prompt: "午後三時 means which time?"
        choices: ["3 p.m.", "3 a.m.", "7 a.m."]
        answer: "3 p.m."
      - id: ja-u06-check-recall
        kind: listen_type
        prompt: "Listen and type the full answer."
        audioText: "七時に起きます"
        answer: "七時に起きます"
        acceptedAnswers: ["七時に起きます。"]
exercise:
  type: type_answer
  prompt: "Say: I get up at six."
  answer: "六時に起きます"
  acceptedAnswers: ["六時に起きます。"]
---

The checkpoint tests information extraction and a complete spoken-style answer, not isolated time matching.
