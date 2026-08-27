---
id: en-a1-24-where-things
track: english-basics
locale: en
slug: where-things
title: Ask where a familiar object is
order: 24
published: true
cefr_level: a1
unit_id: en-a1-home-07
unit_title: "Find things at home"
unit_order: 7
unit_can_do: "Say what is in a familiar room and ask where a common object is"
unit_role: lesson
can_do: "Ask where one familiar object is and understand a simple location answer"
pattern: "Where's the …? / It's on … / It's under … / It's in …"
objectives:
  - Ask where an object is
  - Understand on, under, and in in concrete room locations
  - Give one short location answer
vocab:
  - { word: "book", ipa: "/bʊk/", gloss: "something you read" }
  - { word: "computer", ipa: "/kəmˈpjuːtər/", gloss: "computer" }
  - { word: "door", ipa: "/dɔːr/", gloss: "room entrance" }
  - { word: "room", ipa: "/ruːm/", gloss: "part of a home or building" }
  - { word: "on", ipa: "/ɑːn/", gloss: "supported by or touching a surface" }
  - { word: "under", ipa: "/ˈʌndər/", gloss: "below something" }
  - { word: "in", ipa: "/ɪn/", gloss: "inside something" }
  - { word: "next to", ipa: "/nekst tə/", gloss: "beside something" }
  - { word: "where's", ipa: "/werz/", gloss: "short for where is; asks for a location" }
steps:
  - type: scene
    title: "Find the missing book"
    body: "You are ready to study but cannot see your book. Ask someone in the room where it is."
    visualKey: "home-room"
    imageAlt: "A book rests on a table in a simple bedroom."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Where's my book?" }
      - { speaker: "B", text: "It's on the table." }
      - { speaker: "A", text: "Next to the computer?" }
      - { speaker: "B", text: "Yes, on the table next to the computer." }
  - type: listen
    prompt: "Listen. Where is the book?"
    text: "It's on the table."
  - type: tip
    title: "Use one clear location phrase"
    body: "For a simple location, use It's on …, It's under …, or It's in …. You do not need a long description if one phrase identifies the place."
  - type: teach
    items:
      - { form: "Where's my book?", gloss: "ask for an object's location", example: "Where's my book?" }
      - { form: "It's on the table.", gloss: "object is supported by a surface", example: "It's on the table." }
      - { form: "It's under the chair.", gloss: "object is below something", example: "It's under the chair." }
      - { form: "It's in the bag.", gloss: "object is inside something", example: "It's in the bag." }
  - type: practice
    id: en-u07-where-context
    kind: dialogue_choice
    prompt: "You cannot find your book. Which question is natural?"
    choices: ["Where's my book?", "Do you have my book?", "Is this my book?"]
    answer: "Where's my book?"
  - type: practice
    id: en-u07-where-listen
    kind: audio_choice
    prompt: "Listen and choose the location."
    audioText: "It's under the chair."
    choices: ["under the chair", "on the table", "in the bag"]
    answer: "under the chair"
  - type: practice
    id: en-u07-where-produce
    kind: type_answer
    prompt: "The book is on the table. Answer: “Where's the book?”"
    answer: "It's on the table"
    acceptedAnswers: ["It's on the table.", "It is on the table", "It is on the table."]
    hints:
      - "Start with It's …"
  - type: checkpoint
    items:
      - id: en-u07-where-check-under
        kind: meaning_choice
        prompt: "Which phrase means the object is below the chair?"
        choices: ["under the chair", "on the chair", "in the chair"]
        answer: "under the chair"
      - id: en-u07-where-check-question
        kind: order_words
        prompt: "Build the location question."
        tokens: ["the book", "Where's"]
        answer: "Where's the book"
        acceptedAnswers: ["Where's the book?"]
exercise:
  type: type_answer
  prompt: "Say that the book is on the table."
  answer: "It's on the table"
  acceptedAnswers: ["It's on the table.", "It is on the table", "It is on the table."]
---

Location language is successful when the other person can find the object. Keep the answer concrete and short.
