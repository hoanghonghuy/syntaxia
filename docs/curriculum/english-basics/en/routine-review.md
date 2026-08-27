---
id: en-a1-u05-review
track: english-basics
locale: en
slug: routine-review
title: "Review: talk about your day"
order: 18
published: true
cefr_level: a1
unit_id: en-a1-routine-05
unit_title: "Talk about your day"
unit_order: 5
unit_can_do: "Ask about a simple daily schedule and say when familiar activities happen"
unit_role: review
can_do: "Retrieve time and routine phrases without a model"
pattern: "What time do you …? / I … at … / Then I …"
objectives:
  - Recall a time question
  - Retrieve a routine sentence from listening
  - Produce a two-step schedule from memory
steps:
  - type: scene
    title: "Tell the routine again"
    body: "A few days later, explain the same morning routine without looking back at the lesson."
    visualKey: "student-studying"
    imageAlt: "A learner recalling a simple daily schedule."
  - type: dialogue
    lines:
      - { speaker: "A", text: "What time do you start your day?" }
      - { speaker: "B", text: "I have breakfast at seven. Then I go to work at eight." }
  - type: listen
    prompt: "Listen and retrieve the second activity."
    text: "I have breakfast at seven. Then I go to school at eight."
  - type: practice
    id: en-u05-review-listen
    kind: listen_type
    prompt: "Listen and type the activity after breakfast."
    audioText: "Then I go to school."
    answer: "go to school"
    acceptedAnswers: ["I go to school", "Then I go to school", "Then I go to school."]
    hints:
      - "The destination is school."
  - type: practice
    id: en-u05-review-question
    kind: order_words
    prompt: "Build the question about breakfast time."
    tokens: ["do you", "What time", "have breakfast"]
    answer: "What time do you have breakfast"
    acceptedAnswers: ["What time do you have breakfast?"]
  - type: practice
    id: en-u05-review-produce
    kind: type_answer
    prompt: "Without a model: write two morning actions with times 7:00 and 8:00."
    answer: "I have breakfast at seven. Then I go to school at eight."
    acceptedAnswers: ["I have breakfast at seven then I go to school at eight", "I have breakfast at seven, then I go to school at eight."]
    hints:
      - "Use at before each time."
  - type: checkpoint
    items:
      - id: en-u05-review-at
        kind: meaning_choice
        prompt: "Which small word belongs before a clock time?"
        choices: ["at", "on", "from"]
        answer: "at"
      - id: en-u05-review-then
        kind: dialogue_choice
        prompt: "Which phrase naturally moves to the next routine action?"
        choices: ["Then I …", "Before that, I …", "What time do you …?"]
        answer: "Then I …"
exercise:
  type: type_answer
  prompt: "Recall one complete schedule sentence: you go to work at eight."
  answer: "I go to work at eight"
  acceptedAnswers: ["I go to work at eight."]
---

This review is retrieval practice: reconstruct a useful daily schedule rather than rereading the lesson text.
