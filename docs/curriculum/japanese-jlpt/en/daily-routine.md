---
id: ja-n5-17-daily-routine
track: japanese-jlpt
locale: en
slug: daily-routine
title: Talk about a simple daily routine
order: 17
published: true
jlpt_level: n5
unit_id: ja-n5-routine-06
unit_title: "Talk about your day"
unit_order: 6
unit_can_do: "Ask when a familiar activity happens and answer with a simple time"
unit_role: lesson
can_do: "Ask what time someone gets up and say a simple morning or evening time"
pattern: "何時に起きますか。 / 午前七時に起きます。 / 十時に寝ます。"
objectives:
  - Ask when a daily action happens
  - Distinguish 午前 and 午後 in a short schedule
  - Answer with time + に + verb
vocab:
  - { surface: "朝", reading: "あさ", gloss: "morning" }
  - { surface: "午前", reading: "ごぜん", gloss: "a.m.; morning" }
  - { surface: "午後", reading: "ごご", gloss: "p.m.; afternoon" }
  - { surface: "起きる", reading: "おきる", gloss: "to get up" }
  - { surface: "寝る", reading: "ねる", gloss: "to sleep; go to bed" }
steps:
  - type: scene
    title: "Compare morning schedules"
    body: "A classmate asks when your day starts. Listen for the time, then answer about your own routine."
    visualKey: "daily-clock"
    imageAlt: "A simple clock and morning-to-evening routine timeline."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何時に起きますか。", reading: "なんじに おきますか。" }
      - { speaker: "B", text: "午前七時に起きます。", reading: "ごぜん しちじに おきます。" }
      - { speaker: "A", text: "何時に寝ますか。", reading: "なんじに ねますか。" }
      - { speaker: "B", text: "十時に寝ます。", reading: "じゅうじに ねます。" }
  - type: listen
    prompt: "Listen once. Is the first time in the morning or afternoon?"
    text: "午前七時に起きます。"
    reading: "ごぜん しちじに おきます。"
  - type: tip
    title: "Mark the time with に"
    body: "For a specific clock time, put に after the time: 七時に起きます. 午前 and 午後 tell you which part of the day."
  - type: teach
    items:
      - { form: "何時に起きますか。", reading: "なんじに おきますか。", gloss: "What time do you get up?", example: "何時に起きますか。" }
      - { form: "午前七時に起きます。", reading: "ごぜん しちじに おきます。", gloss: "I get up at 7 a.m.", example: "午前七時に起きます。" }
      - { form: "十時に寝ます。", reading: "じゅうじに ねます。", gloss: "I go to bed at ten.", example: "十時に寝ます。" }
  - type: practice
    id: ja-u06-routine-listen
    kind: audio_choice
    prompt: "Listen and choose the time."
    audioText: "午後三時です"
    choices: ["3 p.m.", "3 a.m.", "7 a.m."]
    answer: "3 p.m."
  - type: practice
    id: ja-u06-routine-reply
    kind: dialogue_choice
    prompt: "Someone asks 何時に起きますか。 You get up at seven. Which answer fits?"
    choices: ["七時に起きます。", "七時を起きます。", "七時に寝ますか。"]
    answer: "七時に起きます。"
  - type: practice
    id: ja-u06-routine-produce
    kind: type_answer
    prompt: "Type: I go to bed at ten."
    answer: "十時に寝ます"
    acceptedAnswers: ["十時に寝ます。"]
    hints:
      - "Use 十時 + に + 寝ます."
  - type: checkpoint
    items:
      - id: ja-u06-routine-check-am
        kind: meaning_choice
        prompt: "Which word marks a morning time?"
        choices: ["午前", "午後", "駅"]
        answer: "午前"
      - id: ja-u06-routine-check-question
        kind: listen_type
        prompt: "Listen and type the question."
        audioText: "何時に起きますか"
        answer: "何時に起きますか"
        acceptedAnswers: ["何時に起きますか。"]
exercise:
  type: type_answer
  prompt: "Say: I get up at seven."
  answer: "七時に起きます"
  acceptedAnswers: ["七時に起きます。"]
---

Use the time phrase to exchange real schedule information, not to recite clock vocabulary.
