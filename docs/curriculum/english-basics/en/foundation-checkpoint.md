---
id: en-a1-u00-foundation-checkpoint
track: english-basics
locale: en
slug: foundation-checkpoint
title: "Foundation checkpoint"
order: -2
published: true
cefr_level: a1
foundation_focus: integrated
unit_id: en-a1-foundation-00
unit_title: "English foundation"
unit_order: 0
unit_can_do: "Hear and build a small set of familiar English words and basic sentence patterns"
unit_role: checkpoint
can_do: "Combine beginner pronunciation cues with basic be and question patterns"
pattern: "hear → choose/build → answer"
objectives:
  - Check sound-spelling and word-stress awareness
  - Build a simple be sentence
  - Build and answer a simple question
steps:
  - type: scene
    title: "Before your first conversation"
    body: "Use the sound and sentence tools together. The goal is not perfect accent or a grammar table; it is a small foundation you can retrieve while communicating."
    visualKey: "classmates-meeting"
    imageAlt: "Two classmates prepare for a short introductory conversation."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hello. I'm Mai. I'm a student." }
      - { speaker: "B", text: "Hi, Mai. Are you from Hanoi?" }
      - { speaker: "A", text: "Yes, I am." }
      - { speaker: "B", text: "Do you like music?" }
      - { speaker: "A", text: "Yes, I do." }
  - type: listen
    prompt: "Listen once for meaning, then once for hello, student, and the question starters Are and Do."
    text: "Hello. I'm Mai. I'm a student. Are you from Hanoi? Do you like music?"
  - type: tip
    title: "Retrieve, do not translate every word"
    body: "Use chunks and sentence frames: I'm …, Are you …?, Where are you …?, Do you like …?"
  - type: teach
    items:
      - { form: "hel-LO", reading: "/həˈloʊ/", gloss: "word stress", example: "Hello, Mai." }
      - { form: "I'm a student.", reading: "I + am + noun", gloss: "basic be sentence", example: "I'm a student." }
      - { form: "Are you …?", reading: "be + subject", gloss: "yes/no question with be", example: "Are you from Hanoi?" }
      - { form: "Do you like …?", reading: "do + subject + verb", gloss: "yes/no question with like", example: "Do you like music?" }
  - type: practice
    id: en-fnd-check-hear-hello
    kind: audio_choice
    prompt: "Which stress pattern matches the word you hear?"
    audioText: "hello"
    choices: ["hel-LO", "HEL-lo"]
    answer: "hel-LO"
  - type: practice
    id: en-fnd-check-build-be
    kind: order_words
    prompt: "Build the sentence."
    tokens: ["student", "a", "I'm"]
    answer: "I'm a student"
    acceptedAnswers: ["I'm a student."]
  - type: practice
    id: en-fnd-check-build-question
    kind: order_words
    prompt: "Build the question."
    tokens: ["you", "Are", "from", "Hanoi"]
    answer: "Are you from Hanoi"
    acceptedAnswers: ["Are you from Hanoi?"]
  - type: checkpoint
    items:
      - id: en-fnd-check-do
        kind: type_answer
        prompt: "Complete: “___ you like music?”"
        answer: "Do"
      - id: en-fnd-check-am
        kind: type_answer
        prompt: "Complete the short answer: “Yes, I ___.”"
        answer: "am"
exercise:
  type: type_answer
  prompt: "Complete: Yes, I ___."
  answer: "am"
---

Passing this checkpoint means the learner is ready to use the same foundations inside the communicative units.