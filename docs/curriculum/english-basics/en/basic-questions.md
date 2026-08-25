---
id: en-a1-u00-basic-questions
track: english-basics
locale: en
slug: basic-questions
title: "Build a basic English question"
order: -3
published: true
cefr_level: a1
foundation_focus: grammar
unit_id: en-a1-foundation-00
unit_title: "English foundation"
unit_order: 0
unit_can_do: "Hear and build a small set of familiar English words and basic sentence patterns"
unit_role: lesson
can_do: "Build and answer simple be-questions, wh-questions, and one common do-question"
pattern: "be + subject …? / wh + be …? / do + subject + verb …?"
objectives:
  - Put be before the subject in a yes/no question
  - Start simple information questions with a wh-word
  - Use do before the subject with a basic lexical verb such as like
vocab:
  - { word: "where", ipa: "/wer/", gloss: "asks about place" }
  - { word: "what", ipa: "/wʌt/", gloss: "asks for information" }
  - { word: "like", ipa: "/laɪk/", gloss: "enjoy or prefer" }
  - { word: "music", ipa: "/ˈmjuːzɪk/", gloss: "organised sound" }
steps:
  - type: scene
    title: "Ask, then listen for the answer"
    body: "A beginner question changes the sentence frame. Learn the frame as a reusable pattern instead of translating word by word."
    visualKey: "classmates-meeting"
    imageAlt: "Two classmates ask and answer simple questions during a first conversation."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Are you a student?" }
      - { speaker: "B", text: "Yes, I am." }
      - { speaker: "A", text: "Where are you from?" }
      - { speaker: "B", text: "I'm from Hanoi." }
      - { speaker: "A", text: "Do you like music?" }
      - { speaker: "B", text: "Yes, I do." }
  - type: listen
    prompt: "Listen for the question starter: Are, Where, and Do."
    text: "Are you a student? Where are you from? Do you like music?"
  - type: tip
    title: "Do not keep statement order"
    body: "With be, move be before the subject: You are a student → Are you a student? With a lexical verb such as like, use do: You like music → Do you like music?"
  - type: teach
    items:
      - { form: "Are you …?", reading: "/ɑr juː/", gloss: "yes/no question with be", example: "Are you a student?" }
      - { form: "Where are you …?", reading: "/wer ɑr juː/", gloss: "asks for place/origin", example: "Where are you from?" }
      - { form: "Do you like …?", reading: "/duː juː laɪk/", gloss: "yes/no question with like", example: "Do you like music?" }
  - type: practice
    id: en-fnd-q-be
    kind: order_words
    prompt: "Build the yes/no question."
    tokens: ["a", "student", "you", "Are"]
    answer: "Are you a student"
    acceptedAnswers: ["Are you a student?"]
    hints:
      - "Put Are first."
      - "Then use you."
  - type: practice
    id: en-fnd-q-where
    kind: order_words
    prompt: "Build the origin question."
    tokens: ["from", "are", "Where", "you"]
    answer: "Where are you from"
    acceptedAnswers: ["Where are you from?"]
  - type: practice
    id: en-fnd-q-like
    kind: type_answer
    prompt: "Complete the question: “___ you like music?”"
    answer: "Do"
    acceptedAnswers: ["do"]
    hints:
      - "The main verb is like, not be."
      - "Use the helper before you."
  - type: checkpoint
    items:
      - id: en-fnd-q-check-be
        kind: dialogue_choice
        prompt: "Which sentence is a correct question?"
        choices: ["Are you tired?", "You are tired?", "Do you are tired?"]
        answer: "Are you tired?"
      - id: en-fnd-q-check-like
        kind: type_answer
        prompt: "Complete: “___ you like coffee?”"
        answer: "Do"
exercise:
  type: type_answer
  prompt: "Complete: ___ you like music?"
  answer: "Do"
---

This session gives the learner only the high-frequency question frames needed by the A1 units that follow.