---
id: en-a1-01-greetings
track: english-basics
locale: en
slug: greetings
title: Meet someone and say hello
order: 1
published: true
cefr_level: a1
unit_id: en-a1-meeting-01
unit_title: "Meet someone"
unit_order: 1
unit_can_do: "Start, sustain, and close a short first meeting"
unit_role: lesson
can_do: "Greet someone, exchange a name, and end a short meeting politely"
pattern: "Hi, I'm … / Nice to meet you. / See you."
objectives:
  - Start a simple first meeting
  - Say your name and respond naturally
  - End the exchange politely
vocab:
  - { word: "hi", ipa: "/haɪ/", gloss: "a common greeting" }
  - { word: "hello", ipa: "/həˈloʊ/", gloss: "a neutral greeting" }
  - { word: "I'm", ipa: "/aɪm/", gloss: "short for I am" }
  - { word: "nice to meet you", ipa: "/naɪs tə miːt juː/", gloss: "said at a first meeting" }
  - { word: "see you", ipa: "/siː juː/", gloss: "a casual goodbye" }
steps:
  - type: scene
    title: "First day at a class"
    body: "You sit next to someone you have not met before. Start a short conversation."
    visualKey: "classmates-meeting"
    imageAlt: "Two students sit near each other in a classroom and turn toward each other to start talking."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hi, I'm Alex." }
      - { speaker: "B", text: "Hi, Alex. I'm Mai." }
      - { speaker: "A", text: "Nice to meet you, Mai." }
      - { speaker: "B", text: "Nice to meet you too." }
      - { speaker: "A", text: "See you later." }
      - { speaker: "B", text: "See you!" }
  - type: listen
    prompt: "Listen to the first line and notice how the speaker gives a name."
    text: "Hi, I'm Alex."
  - type: tip
    title: "Use whole chunks"
    body: "I'm + name is a natural short introduction. Nice to meet you is a fixed phrase for a first meeting."
  - type: teach
    items:
      - { form: "Hi, I'm …", reading: "/haɪ aɪm/", gloss: "introduce yourself", example: "Hi, I'm Mai." }
      - { form: "Nice to meet you.", reading: "/naɪs tə miːt juː/", gloss: "respond at a first meeting", example: "Nice to meet you, Alex." }
      - { form: "See you.", reading: "/siː juː/", gloss: "casual goodbye", example: "See you later." }
  - type: practice
    id: greet-scene-1
    kind: image_choice
    prompt: "Which picture best fits “Hi, I'm Alex.”?"
    choices: ["meeting", "leaving", "studying"]
    choiceMedia:
      - { value: "meeting", visualKey: "classmates-meeting", alt: "Two students turn toward each other and begin talking in class." }
      - { value: "leaving", visualKey: "student-leaving", alt: "One student walks toward the classroom door to leave." }
      - { value: "studying", visualKey: "student-studying", alt: "One student sits alone at a desk and reads a book." }
    answer: "meeting"
    explanation: "“Hi, I'm Alex.” starts a meeting, so the two students greeting each other fit the sentence."
  - type: practice
    id: greet-response-1
    kind: dialogue_choice
    prompt: "Someone says: “Hi, I'm Alex.” What is a natural reply?"
    choices: ["Hi, Alex. I'm Mai.", "Thank you, Alex.", "Goodbye, Alex."]
    answer: "Hi, Alex. I'm Mai."
    explanation: "At a first meeting, return the greeting and give your name."
  - type: practice
    id: greet-build-1
    kind: order_words
    prompt: "Build a short introduction."
    tokens: ["I'm", "Mai", "Hi,"]
    answer: "Hi, I'm Mai"
    acceptedAnswers: ["Hi, I'm Mai."]
    hints:
      - "Start with the greeting."
      - "Use I'm before the name."
  - type: practice
    id: greet-produce-1
    kind: type_answer
    prompt: "Your name is Linh. Introduce yourself with “Hi”."
    answer: "Hi, I'm Linh"
    acceptedAnswers: ["Hi, I'm Linh.", "Hi! I'm Linh."]
    hints:
      - "Use: Hi, I'm + name."
  - type: checkpoint
    items:
      - id: greet-check-1
        kind: meaning_choice
        prompt: "Which phrase fits a first meeting?"
        choices: ["Nice to meet you.", "Nice to see you again.", "You're welcome."]
        answer: "Nice to meet you."
      - id: greet-check-2
        kind: dialogue_choice
        prompt: "Your class ends. What can you say to the person you just met?"
        choices: ["See you!", "I'm sorry!", "Please!"]
        answer: "See you!"
exercise:
  type: dialogue_choice
  prompt: "Choose the natural first-meeting reply."
  choices: ["Hi, I'm Mai.", "See you later.", "You're welcome."]
  answer: "Hi, I'm Mai."
  hints:
    - "Return the greeting, then say your name."
---

The guided session above is the lesson. The short text here is intentionally secondary to listening, interaction, production, and later review.
