---
id: en-a1-u03-checkpoint
track: english-basics
locale: en
slug: find-way-checkpoint
title: Find your way checkpoint
order: 9
published: true
cefr_level: a1
unit_id: en-a1-find-way-03
unit_title: "Find your way"
unit_order: 3
unit_can_do: "Confirm a room number and ask where a common place is"
unit_role: checkpoint
can_do: "Confirm a room number, ask for a place, and understand a short location answer"
pattern: "Room eight? / Where's the …? / It's here. / It's over there."
objectives:
  - Confirm a number you hear
  - Ask where a place is
  - Understand a minimal location answer
steps:
  - type: scene
    title: "Get to the right place"
    body: "A staff member gives you a room number. After you confirm it, ask where the room is."
  - type: dialogue
    lines:
      - { speaker: "Staff", text: "Your class is in room six." }
      - { speaker: "You", text: "Room six?" }
      - { speaker: "Staff", text: "Yes." }
      - { speaker: "You", text: "Where's room six?" }
      - { speaker: "Staff", text: "It's over there." }
  - type: listen
    prompt: "Listen for both the number and the location."
    text: "Room four. It's over there."
  - type: practice
    id: en-u03-check-number
    kind: listen_type
    prompt: "Listen and type the room number word."
    audioText: "seven"
    answer: "seven"
    hints:
      - "It starts with s-."
  - type: practice
    id: en-u03-check-confirm
    kind: dialogue_choice
    prompt: "You hear “Room nine.” How do you confirm it?"
    choices: ["Room nine?", "Where nine?", "Who's nine?"]
    answer: "Room nine?"
  - type: practice
    id: en-u03-check-place
    kind: type_answer
    prompt: "Ask where the café is."
    answer: "Where's the café?"
    acceptedAnswers: ["Where is the café?", "Where's the cafe?", "Where is the cafe?"]
    hints:
      - "Use Where's + the place."
  - type: checkpoint
    items:
      - id: en-u03-check-location
        kind: audio_choice
        prompt: "Listen. Where is the shop?"
        audioText: "It's here."
        choices: ["here", "over there", "room eight"]
        answer: "here"
      - id: en-u03-check-flow
        kind: dialogue_choice
        prompt: "You confirmed the room number but do not know its location. What should you ask next?"
        choices: ["Where's room six?", "Who's room six?", "Anything else?"]
        answer: "Where's room six?"
exercise:
  type: dialogue_choice
  prompt: "You hear “Room five.” Choose the natural confirmation."
  choices: ["Room five?", "Five is where?", "Who's five?"]
  answer: "Room five?"
---

Use the number and location phrases as one short navigation exchange.
