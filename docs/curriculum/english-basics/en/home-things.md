---
id: en-a1-23-home-things
track: english-basics
locale: en
slug: home-things
title: Say what is in a room
order: 23
published: true
cefr_level: a1
unit_id: en-a1-home-07
unit_title: "Find things at home"
unit_order: 7
unit_can_do: "Say what is in a familiar room and ask where a common object is"
unit_role: lesson
can_do: "Name a few common things in a room and say that one thing is there"
pattern: "There's a … / There are … / This is my …"
objectives:
  - Name common room objects
  - Use There's a … for one visible object
  - Describe a familiar room with two short sentences
vocab:
  - { word: "bedroom", ipa: "/ˈbedruːm/", gloss: "room for sleeping" }
  - { word: "bed", ipa: "/bed/", gloss: "furniture for sleeping" }
  - { word: "table", ipa: "/ˈteɪbəl/", gloss: "flat furniture surface" }
  - { word: "chair", ipa: "/tʃer/", gloss: "seat for one person" }
steps:
  - type: scene
    title: "Show someone your room"
    body: "A friend sees your room on a video call. Point out two familiar things."
    visualKey: "home-room"
    imageAlt: "A simple room with a bed, table, chair, and book."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Is this your bedroom?" }
      - { speaker: "B", text: "Yes. There's a bed by the wall." }
      - { speaker: "A", text: "And there's a table." }
      - { speaker: "B", text: "Yes, and a chair." }
  - type: listen
    prompt: "Listen. Which piece of furniture do you hear first?"
    text: "There's a bed by the wall."
  - type: tip
    title: "Use There's a … to point something out"
    body: "There's a … is a useful A1 chunk for one thing you can see: There's a bed. There's a table. Keep the description short and concrete."
  - type: teach
    items:
      - { form: "There's a bed.", gloss: "say one bed is present", example: "There's a bed by the wall." }
      - { form: "There's a table.", gloss: "say one table is present", example: "There's a table in my room." }
      - { form: "This is my bedroom.", gloss: "identify the room", example: "This is my bedroom." }
  - type: practice
    id: en-u07-home-context
    kind: dialogue_choice
    prompt: "You want to point out one bed in the room. Which sentence fits?"
    choices: ["There's a bed.", "Bed is who?", "At bed seven."]
    answer: "There's a bed."
  - type: practice
    id: en-u07-home-listen
    kind: audio_choice
    prompt: "Listen and choose the object."
    audioText: "There's a chair by the table."
    choices: ["chair", "bed", "door"]
    answer: "chair"
  - type: practice
    id: en-u07-home-produce
    kind: type_answer
    prompt: "Say that there is a table in your room."
    answer: "There's a table"
    acceptedAnswers: ["There's a table.", "There is a table", "There is a table."]
    hints:
      - "Start with There's a …"
  - type: checkpoint
    items:
      - id: en-u07-home-check-room
        kind: dialogue_choice
        prompt: "Which sentence identifies your bedroom?"
        choices: ["This is my bedroom.", "How much bedroom?", "Bedroom at eight."]
        answer: "This is my bedroom."
      - id: en-u07-home-check-one
        kind: order_words
        prompt: "Build the sentence for one chair."
        tokens: ["a chair", "There's"]
        answer: "There's a chair"
        acceptedAnswers: ["There's a chair."]
exercise:
  type: type_answer
  prompt: "Point out one bed in the room."
  answer: "There's a bed"
  acceptedAnswers: ["There's a bed.", "There is a bed", "There is a bed."]
---

Describe only what a listener needs to locate or recognize. The room is a communication scene, not a furniture vocabulary dump.
