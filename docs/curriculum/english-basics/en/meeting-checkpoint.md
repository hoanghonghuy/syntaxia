---
id: en-a1-u01-checkpoint
track: english-basics
locale: en
slug: meeting-checkpoint
title: First meeting checkpoint
order: 2
published: true
cefr_level: a1
unit_id: en-a1-meeting-01
unit_title: "Meet someone"
unit_order: 1
unit_can_do: "Start, sustain, and close a short first meeting"
unit_role: checkpoint
can_do: "Complete a short first meeting with minimal support"
pattern: "Hi, I'm … / Nice to meet you. / See you."
objectives:
  - Respond naturally at a first meeting
  - Introduce yourself without copying a model
steps:
  - type: scene
    title: "One more first meeting"
    body: "You arrive early for class and meet another student for the first time."
    visualKey: "classmates-meeting"
    imageAlt: "Two students face each other before class and begin a short conversation."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hi, I'm Sam." }
      - { speaker: "B", text: "Hi, Sam. I'm Linh." }
      - { speaker: "A", text: "Nice to meet you." }
      - { speaker: "B", text: "Nice to meet you too." }
      - { speaker: "A", text: "See you later." }
      - { speaker: "B", text: "See you!" }
  - type: listen
    prompt: "Listen first. What does B say after “Nice to meet you”?"
    text: "Nice to meet you too."
  - type: practice
    id: en-u01-check-reply
    kind: dialogue_choice
    prompt: "Someone says: “Hi, I'm Sam.” Choose the natural reply."
    choices: ["Hi, Sam. I'm Linh.", "See you yesterday.", "Thank you, Sam."]
    answer: "Hi, Sam. I'm Linh."
    explanation: "Return the greeting and give your name."
  - type: practice
    id: en-u01-check-listen
    kind: listen_type
    prompt: "Listen and type the goodbye you hear."
    audioText: "See you later"
    answer: "See you later"
    acceptedAnswers: ["See you later."]
    hints:
      - "It starts with See."
  - type: practice
    id: en-u01-check-produce
    kind: type_answer
    prompt: "Your name is Nam. Introduce yourself with “Hi”."
    answer: "Hi, I'm Nam"
    acceptedAnswers: ["Hi, I'm Nam.", "Hi! I'm Nam."]
    hints:
      - "Use Hi, I'm + name."
  - type: checkpoint
    items:
      - id: en-u01-check-close
        kind: dialogue_choice
        prompt: "Class is starting. Which line closes the short exchange naturally?"
        choices: ["See you later.", "Nice yesterday.", "You're welcome."]
        answer: "See you later."
      - id: en-u01-check-meet
        kind: meaning_choice
        prompt: "Which phrase belongs to a first meeting?"
        choices: ["Nice to meet you.", "Good night yesterday.", "No problem tomorrow."]
        answer: "Nice to meet you."
exercise:
  type: type_answer
  prompt: "Introduce yourself as Nam."
  answer: "Hi, I'm Nam"
  acceptedAnswers: ["Hi, I'm Nam.", "Hi! I'm Nam."]
---

Use the exchange, not isolated words. The checkpoint checks whether you can carry the short meeting yourself.
