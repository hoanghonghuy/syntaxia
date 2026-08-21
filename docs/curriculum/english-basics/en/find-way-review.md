---
id: en-a1-u03-review
track: english-basics
locale: en
slug: find-way-review
title: Review: find your way
order: 10
published: true
cefr_level: a1
unit_id: en-a1-find-way-03
unit_title: "Find your way"
unit_order: 3
unit_can_do: "Confirm a room number and ask where a common place is"
unit_role: review
can_do: "Recall the number-confirmation and location phrases without a model"
pattern: "Room eight? / Where's the …? / It's here. / It's over there."
objectives:
  - Retrieve a number from listening
  - Recall how to confirm it
  - Ask for and understand a simple location
steps:
  - type: scene
    title: "Find the room again"
    body: "You return another day and need to find a room without looking at the previous examples."
  - type: dialogue
    lines:
      - { speaker: "Staff", text: "Room three." }
      - { speaker: "You", text: "Room three?" }
      - { speaker: "Staff", text: "Yes." }
      - { speaker: "You", text: "Where's room three?" }
      - { speaker: "Staff", text: "It's here." }
  - type: listen
    prompt: "Listen first. Which number do you hear?"
    text: "Room eight."
  - type: practice
    id: en-u03-review-number
    kind: listen_type
    prompt: "Listen and type the number word."
    audioText: "eight"
    answer: "eight"
    hints:
      - "It starts with e-."
  - type: practice
    id: en-u03-review-build
    kind: order_words
    prompt: "Build the location question."
    tokens: ["café?", "the", "Where's"]
    answer: "Where's the café?"
    acceptedAnswers: ["Where's the cafe?"]
    hints:
      - "Start with Where's."
  - type: practice
    id: en-u03-review-produce
    kind: type_answer
    prompt: "The park is farther away. Write the short location answer."
    answer: "It's over there"
    acceptedAnswers: ["It's over there.", "It is over there", "It is over there."]
    hints:
      - "Use over there."
  - type: checkpoint
    items:
      - id: en-u03-review-confirm
        kind: dialogue_choice
        prompt: "You hear “Room two.” Which reply confirms it?"
        choices: ["Room two?", "Who's two?", "This is two."]
        answer: "Room two?"
      - id: en-u03-review-here
        kind: audio_choice
        prompt: "Listen. Where is it?"
        audioText: "It's here."
        choices: ["here", "over there", "five"]
        answer: "here"
exercise:
  type: type_answer
  prompt: "Ask where the shop is."
  answer: "Where's the shop?"
  acceptedAnswers: ["Where is the shop?"]
---

Retrieve the short navigation exchange from memory.
