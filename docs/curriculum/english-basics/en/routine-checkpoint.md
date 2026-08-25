---
id: en-a1-u05-checkpoint
track: english-basics
locale: en
slug: routine-checkpoint
title: Daily routine checkpoint
order: 17
published: true
cefr_level: a1
unit_id: en-a1-routine-05
unit_title: "Talk about your day"
unit_order: 5
unit_can_do: "Ask about a simple daily schedule and say when familiar activities happen"
unit_role: checkpoint
can_do: "Ask for a routine time and give a short two-step schedule with minimal support"
pattern: "What time do you …? / I … at … / Then I …"
objectives:
  - Understand a simple routine time
  - Ask when a familiar activity happens
  - Produce a two-step daily sequence
steps:
  - type: scene
    title: "Plan the morning"
    body: "You and a classmate need to compare your morning schedule before meeting."
    visualKey: "student-studying"
    imageAlt: "A learner checking a short morning schedule at a desk."
  - type: dialogue
    lines:
      - { speaker: "A", text: "What time do you have breakfast?" }
      - { speaker: "B", text: "At seven. Then I go to school at eight." }
      - { speaker: "A", text: "Great. See you at eight." }
  - type: listen
    prompt: "Listen. Which activity happens first?"
    text: "I have breakfast at seven. Then I go to school at eight."
  - type: practice
    id: en-u05-check-listen
    kind: audio_choice
    prompt: "Listen and choose the first activity."
    audioText: "I have breakfast at seven. Then I go to work at eight."
    choices: ["have breakfast", "go to work", "go home"]
    answer: "have breakfast"
  - type: practice
    id: en-u05-check-reply
    kind: dialogue_choice
    prompt: "Someone asks, “What time do you go to work?” You go at 8:00. Which reply is natural?"
    choices: ["I go to work at eight.", "I work is eight.", "At work who?"]
    answer: "I go to work at eight."
  - type: practice
    id: en-u05-check-produce
    kind: type_answer
    prompt: "Say: you have breakfast at seven, then you go to school at eight."
    answer: "I have breakfast at seven. Then I go to school at eight."
    acceptedAnswers: ["I have breakfast at seven then I go to school at eight", "I have breakfast at seven, then I go to school at eight."]
    hints:
      - "Start with I have breakfast at seven."
      - "Use Then I … for the next activity."
  - type: checkpoint
    items:
      - id: en-u05-check-time-question
        kind: dialogue_choice
        prompt: "Which question asks when a routine happens?"
        choices: ["What time do you have breakfast?", "What breakfast is time?", "Who is breakfast?"]
        answer: "What time do you have breakfast?"
      - id: en-u05-check-time-phrase
        kind: order_words
        prompt: "Build the time sentence."
        tokens: ["at eight", "I go", "to school"]
        answer: "I go to school at eight"
        acceptedAnswers: ["I go to school at eight."]
exercise:
  type: type_answer
  prompt: "Write a two-step morning: breakfast at seven, school at eight."
  answer: "I have breakfast at seven. Then I go to school at eight."
  acceptedAnswers: ["I have breakfast at seven then I go to school at eight", "I have breakfast at seven, then I go to school at eight."]
---

Complete the checkpoint as a short schedule exchange, not as isolated time vocabulary.
