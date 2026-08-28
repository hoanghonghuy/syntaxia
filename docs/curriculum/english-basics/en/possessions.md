---
id: en-a1-32-possessions
track: english-basics
locale: en
slug: possessions
title: Say what everyday things you have
order: 32
published: true
cefr_level: a1
unit_id: en-a1-personal-09
unit_title: "Share simple personal details"
unit_order: 9
unit_can_do: "Give and ask for a few basic personal details and say what everyday things you have"
unit_role: lesson
can_do: "Say that you have a familiar object and ask whether another person has one"
pattern: "I have a … / Do you have a …? / Yes, I do. / No, I don't."
objectives:
  - Say that you have a familiar everyday object
  - Ask whether another person has an object
  - Give a short yes or no answer to a have-question
vocab:
  - { word: "have", ipa: "/hæv/", gloss: "possess or carry something" }
  - { word: "phone", ipa: "/foʊn/", gloss: "mobile phone" }
  - { word: "bag", ipa: "/bæɡ/", gloss: "bag" }
  - { word: "book", ipa: "/bʊk/", gloss: "book" }
  - { word: "bike", ipa: "/baɪk/", gloss: "bicycle" }
steps:
  - type: scene
    title: "Check which everyday things are available"
    body: "You and a classmate are getting ready to leave. Say what you have with you and ask about one familiar object."
    visualKey: "home-room"
    imageAlt: "A familiar room provides everyday objects that two learners can talk about having."
  - type: dialogue
    lines:
      - { speaker: "A", text: "I have a phone and a bag." }
      - { speaker: "B", text: "Do you have a book?" }
      - { speaker: "A", text: "Yes, I do." }
      - { speaker: "B", text: "Do you have a bike?" }
      - { speaker: "A", text: "No, I don't." }
  - type: listen
    prompt: "Listen. Which object does the speaker say they have?"
    text: "I have a book."
  - type: tip
    title: "Use have for a thing, and do for the question"
    body: "Say I have + object. Ask Do you have + object? The short answers are Yes, I do and No, I don't."
  - type: teach
    items:
      - { form: "I have a book.", gloss: "say that you have an object", example: "I have a book." }
      - { form: "Do you have a phone?", gloss: "ask whether someone has an object", example: "Do you have a phone?" }
      - { form: "Yes, I do.", gloss: "short positive answer", example: "Yes, I do." }
      - { form: "No, I don't.", gloss: "short negative answer", example: "No, I don't." }
  - type: practice
    id: en-u09-have-context
    skills: ["en.grammar.possession", "en.communication.possession"]
    kind: dialogue_choice
    prompt: "Someone asks “Do you have a bike?” You do not. Which reply answers the question?"
    choices: ["No, I don't.", "I'm twenty-two years old.", "I live in Hanoi."]
    answer: "No, I don't."
  - type: practice
    id: en-u09-have-listen
    skills: ["en.listening.possession", "en.grammar.possession"]
    kind: audio_choice
    prompt: "Listen and choose the object the speaker has."
    audioText: "I have a book."
    choices: ["book", "phone", "bike"]
    answer: "book"
  - type: practice
    id: en-u09-have-produce
    skills: ["en.production.possession", "en.grammar.possession"]
    kind: type_answer
    prompt: "Say that you have a book."
    answer: "I have a book"
    acceptedAnswers: ["I have a book."]
    hints:
      - "Use I have + object."
  - type: checkpoint
    items:
      - id: en-u09-have-check-question
        skills: ["en.grammar.do-question", "en.communication.possession"]
        kind: type_answer
        prompt: "Ask whether the other person has a phone."
        answer: "Do you have a phone"
        acceptedAnswers: ["Do you have a phone?", "Do you have a phone"]
      - id: en-u09-have-check-yes
        skills: ["en.grammar.do-question", "en.communication.possession"]
        kind: dialogue_choice
        prompt: "You have the book. Which short reply answers “Do you have a book?”"
        choices: ["Yes, I do.", "Yes, I am.", "Yes, I live here."]
        answer: "Yes, I do."
exercise:
  type: type_answer
  prompt: "Say that you have a book."
  answer: "I have a book"
  acceptedAnswers: ["I have a book."]
---

Keep have concrete at this stage: familiar objects make the grammar useful without adding an abstract possession system.
