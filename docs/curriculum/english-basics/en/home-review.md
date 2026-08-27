---
id: en-a1-u07-review
track: english-basics
locale: en
slug: home-review
title: "Review: find things at home"
order: 26
published: true
cefr_level: a1
unit_id: en-a1-home-07
unit_title: "Find things at home"
unit_order: 7
unit_can_do: "Say what is in a familiar room and ask where a common object is"
unit_role: review
can_do: "Retrieve one room description and one location exchange without a model"
pattern: "There's a … / Where's the …? / It's on / under / in …"
objectives:
  - Recall a room-description chunk
  - Retrieve a location question
  - Produce a location answer from memory
steps:
  - type: scene
    title: "Find the book again"
    body: "Later, reconstruct the same room exchange from memory."
    visualKey: "home-room"
    imageAlt: "A simple bedroom used for location recall."
  - type: dialogue
    lines:
      - { speaker: "A", text: "There's a table by the bed." }
      - { speaker: "B", text: "Where's the book?" }
      - { speaker: "A", text: "It's on the table." }
  - type: listen
    prompt: "Listen and retrieve the object location."
    text: "It's under the chair."
  - type: practice
    id: en-u07-review-listen
    kind: listen_type
    prompt: "Listen and type the location phrase."
    audioText: "under the chair"
    answer: "under the chair"
  - type: practice
    id: en-u07-review-question
    kind: order_words
    prompt: "Build the location question."
    tokens: ["my book", "Where's"]
    answer: "Where's my book"
    acceptedAnswers: ["Where's my book?"]
  - type: practice
    id: en-u07-review-produce
    kind: type_answer
    prompt: "Without a model, say that the book is on the table."
    answer: "It's on the table"
    acceptedAnswers: ["It's on the table.", "It is on the table", "It is on the table."]
    hints:
      - "Use It's + preposition + place."
  - type: checkpoint
    items:
      - id: en-u07-review-there
        kind: dialogue_choice
        prompt: "Which line points out one bed in a room?"
        choices: ["There's a bed.", "Where's the bed?", "The bed is upstairs."]
        answer: "There's a bed."
      - id: en-u07-review-in
        kind: meaning_choice
        prompt: "Which phrase says the book is inside the bag?"
        choices: ["in the bag", "on the bag", "under the bag"]
        answer: "in the bag"
exercise:
  type: type_answer
  prompt: "Recall the question used to find your book."
  answer: "Where's my book"
  acceptedAnswers: ["Where's my book?"]
---

Retrieve the description and location chunks as a useful find-the-object exchange.
