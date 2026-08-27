---
id: en-a1-foundation-04-checkpoint
track: english-basics
locale: en
slug: foundation-checkpoint
title: English foundations checkpoint
order: -2
published: true
cefr_level: a1
unit_id: en-a1-foundation-00
unit_title: "English foundations"
unit_order: 0
unit_can_do: "Hear and produce a small beginner sound set, use word stress, and build core be-sentences"
unit_role: checkpoint
can_do: "Show that you can hear a basic contrast, identify stress, and build a simple be-sentence before Unit 1"
pattern: "sound + stress + be"
objectives:
  - Check a beginner sound contrast
  - Check familiar word stress
  - Check am/is/are in statements and questions
vocab:
  - { word: "seat", ipa: "/siːt/", gloss: "a place to sit" }
  - { word: "water", ipa: "/ˈwɔːtər/", gloss: "a drink" }
  - { word: "ready", ipa: "/ˈredi/", gloss: "prepared" }
steps:
  - type: scene
    title: "Foundation gate before your first meeting"
    body: "Complete one short mixed check. The goal is intelligible sound and a usable sentence, not perfect accent or grammar terminology."
    imageUrl: "/language/scenes/english-be-sentence.svg"
    imageAlt: "A simple English sentence builder with pronouns and forms of be."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Are you ready?" }
      - { speaker: "B", text: "Yes, I am." }
      - { speaker: "A", text: "Water?" }
      - { speaker: "B", text: "Yes, water, please." }
  - type: listen
    prompt: "Listen for both the word and its stress."
    text: "Water, please."
  - type: practice
    id: en-f00-gate-sound-1
    kind: audio_choice
    prompt: "Listen. Which word do you hear?"
    audioText: "seat"
    choices: ["sit", "seat", "set"]
    answer: "seat"
  - type: practice
    id: en-f00-gate-stress-1
    kind: meaning_choice
    prompt: "Which stress pattern is correct for water?"
    choices: ["WA-ter", "wa-TER", "equal stress"]
    answer: "WA-ter"
  - type: practice
    id: en-f00-gate-be-1
    kind: fill_blank
    prompt: "Complete: We ___ ready."
    choices: ["am", "is", "are"]
    answer: "are"
  - type: checkpoint
    items:
      - id: en-f00-gate-check-1
        kind: order_words
        prompt: "Build the question."
        tokens: ["you", "Are", "ready"]
        answer: "Are you ready"
        acceptedAnswers: ["Are you ready?"]
      - id: en-f00-gate-check-2
        kind: dialogue_choice
        prompt: "Someone asks, “Are you Mai?” You are not Mai. Which reply fits?"
        choices: ["No, I'm not.", "No, I isn't.", "No, you aren't."]
        answer: "No, I'm not."
exercise:
  type: fill_blank
  prompt: "Complete: She ___ here."
  choices: ["am", "is", "are"]
  answer: "is"
  hints:
    - "She uses is."
---

Passing this checkpoint means the learner has enough sound and sentence foundation to start the communicative sequence.
