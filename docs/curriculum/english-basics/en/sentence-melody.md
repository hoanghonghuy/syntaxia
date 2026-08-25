---
id: en-a1-u00-sentence-melody
track: english-basics
locale: en
slug: sentence-melody
title: "Hear the shape of a short sentence"
order: -5
published: true
cefr_level: a1
foundation_focus: pronunciation
unit_id: en-a1-foundation-00
unit_title: "English foundation"
unit_order: 0
unit_can_do: "Hear and build a small set of familiar English words and basic sentence patterns"
unit_role: lesson
can_do: "Use simple stress and intonation cues to distinguish a statement from a basic question"
pattern: "statement / yes-no question / wh-question"
objectives:
  - Hear the phrase as a whole instead of isolated words
  - Notice common beginner intonation patterns
  - Keep important words clear while small grammar words stay lighter
vocab:
  - { word: "from", ipa: "/frəm/", gloss: "shows origin" }
  - { word: "student", ipa: "/ˈstuːdənt/", gloss: "a person who studies" }
  - { word: "where", ipa: "/wer/", gloss: "asks about place" }
steps:
  - type: scene
    title: "Listen to the whole phrase"
    body: "English meaning comes from words and from how the phrase is shaped. These beginner patterns are useful listening guides, not rigid rules for every speaker."
    imageUrl: "/language/scenes/english-sentence-melody.svg"
    imageAlt: "Three short English sentences show typical falling and rising intonation shapes."
  - type: dialogue
    lines:
      - { speaker: "A", text: "I'm Mai." }
      - { speaker: "B", text: "Are you a student?" }
      - { speaker: "A", text: "Yes, I am." }
      - { speaker: "B", text: "Where are you from?" }
      - { speaker: "A", text: "I'm from Hanoi." }
  - type: listen
    prompt: "Listen for the difference between a statement and the two questions."
    text: "I'm Mai. Are you a student? Where are you from?"
  - type: tip
    title: "Content words carry the message"
    body: "In short phrases, names, nouns and key verbs usually stay clear. Small words such as am, are and from may sound lighter in natural speech."
  - type: teach
    items:
      - { form: "I'm Mai.", reading: "statement: usually settles", gloss: "gives information", example: "I'm Mai." }
      - { form: "Are you a student?", reading: "yes/no question: often rises", gloss: "asks for yes or no", example: "Are you a student?" }
      - { form: "Where are you from?", reading: "wh-question: often falls", gloss: "asks for specific information", example: "Where are you from?" }
  - type: practice
    id: en-fnd-melody-statement
    kind: dialogue_choice
    prompt: "Which line gives information rather than asking?"
    choices: ["I'm Mai.", "Are you Mai?", "Where are you from?"]
    answer: "I'm Mai."
  - type: practice
    id: en-fnd-melody-question
    kind: dialogue_choice
    prompt: "Which line is a yes/no question?"
    choices: ["Are you a student?", "I'm a student.", "Where are you from?"]
    answer: "Are you a student?"
  - type: practice
    id: en-fnd-melody-build
    kind: order_words
    prompt: "Build the place question."
    tokens: ["from", "you", "Where", "are"]
    answer: "Where are you from"
    acceptedAnswers: ["Where are you from?"]
    hints:
      - "Start with Where."
      - "Put are before you."
  - type: checkpoint
    items:
      - id: en-fnd-melody-check-statement
        kind: dialogue_choice
        prompt: "Which line is a statement?"
        choices: ["I'm from Hanoi.", "Are you from Hanoi?", "Where are you from?"]
        answer: "I'm from Hanoi."
      - id: en-fnd-melody-check-question
        kind: type_answer
        prompt: "Type the question that asks about origin."
        answer: "Where are you from"
        acceptedAnswers: ["Where are you from?"]
exercise:
  type: type_answer
  prompt: "Type the question: Where are you from?"
  answer: "Where are you from"
---

The goal is intelligibility and listening awareness, not imitation of one accent.