---
id: en-a1-u07-checkpoint
track: english-basics
locale: en
slug: home-checkpoint
title: Home checkpoint
order: 25
published: true
cefr_level: a1
unit_id: en-a1-home-07
unit_title: "Find things at home"
unit_order: 7
unit_can_do: "Say what is in a familiar room and ask where a common object is"
unit_role: checkpoint
can_do: "Describe one room object and ask or answer where another object is with minimal support"
pattern: "There's a … / Where's the …? / It's on / under / in …"
objectives:
  - Point out one object in a room
  - Ask where another object is
  - Give a clear location answer
steps:
  - type: scene
    title: "Help a friend find a book"
    body: "A friend sees the room but cannot find the book. Describe one object, then give the book's location."
    visualKey: "home-room"
    imageAlt: "A simple room where a book can be found on a table."
  - type: dialogue
    lines:
      - { speaker: "A", text: "There's a table by the bed." }
      - { speaker: "B", text: "Where's the book?" }
      - { speaker: "A", text: "It's on the table." }
  - type: listen
    prompt: "Listen and choose where the book is."
    text: "The book is on the table."
  - type: practice
    id: en-u07-check-listen
    kind: audio_choice
    prompt: "Listen and choose the location."
    audioText: "It's in the bag."
    choices: ["in the bag", "under the chair", "on the table"]
    answer: "in the bag"
  - type: practice
    id: en-u07-check-describe
    kind: type_answer
    prompt: "Point out one chair in the room."
    answer: "There's a chair"
    acceptedAnswers: ["There's a chair.", "There is a chair", "There is a chair."]
  - type: practice
    id: en-u07-check-locate
    kind: type_answer
    prompt: "The book is under the chair. Answer: “Where's the book?”"
    answer: "It's under the chair"
    acceptedAnswers: ["It's under the chair.", "It is under the chair", "It is under the chair."]
    hints:
      - "Use It's + location."
  - type: checkpoint
    items:
      - id: en-u07-check-question
        kind: dialogue_choice
        prompt: "Which question asks for an object's location?"
        choices: ["Where's the book?", "How much is the book?", "What time is the book?"]
        answer: "Where's the book?"
      - id: en-u07-check-surface
        kind: meaning_choice
        prompt: "The book rests on top of the table. Which phrase fits?"
        choices: ["on the table", "under the table", "in the table"]
        answer: "on the table"
exercise:
  type: type_answer
  prompt: "Say that the book is under the chair."
  answer: "It's under the chair"
  acceptedAnswers: ["It's under the chair.", "It is under the chair", "It is under the chair."]
---

The checkpoint combines existence and location so the learner can actually help someone find a familiar object.
