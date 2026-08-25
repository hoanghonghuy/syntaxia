---
id: en-a1-u00-word-stress
track: english-basics
locale: en
slug: word-stress
title: "Put the beat on the right syllable"
order: -6
published: true
cefr_level: a1
foundation_focus: pronunciation
unit_id: en-a1-foundation-00
unit_title: "English foundation"
unit_order: 0
unit_can_do: "Hear and build a small set of familiar English words and basic sentence patterns"
unit_role: lesson
can_do: "Hear and reproduce the main stress in a few familiar two-syllable words"
pattern: "one stronger syllable"
objectives:
  - Hear that syllables are not always equally strong
  - Reproduce the main stress in familiar beginner words
  - Use stress as part of learning a new word
vocab:
  - { word: "hello", ipa: "/həˈloʊ/", gloss: "greeting" }
  - { word: "teacher", ipa: "/ˈtiːtʃər/", gloss: "a person who teaches" }
  - { word: "coffee", ipa: "/ˈkɔːfi/", gloss: "a drink" }
steps:
  - type: scene
    title: "Find the beat"
    body: "Listen for the syllable that sounds clearer and stronger. Word stress helps familiar words stay intelligible."
    imageUrl: "/language/scenes/english-word-stress.svg"
    imageAlt: "Hello, teacher, and coffee show one syllable larger and stronger than the other."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hello. I'm Mia." }
      - { speaker: "B", text: "Hello, Mia. I'm your teacher." }
      - { speaker: "A", text: "Nice to meet you." }
  - type: listen
    prompt: "Listen to the strong syllable in each word."
    text: "hello, teacher, coffee"
  - type: tip
    title: "Stress is part of the word"
    body: "Do not make every syllable equally strong. Learn the beat together with the word, just as you learn its spelling."
  - type: teach
    items:
      - { form: "hello", reading: "hel-LO", gloss: "stress the second syllable", example: "Hello, Mia." }
      - { form: "teacher", reading: "TEA-cher", gloss: "stress the first syllable", example: "I'm a teacher." }
      - { form: "coffee", reading: "COF-fee", gloss: "stress the first syllable", example: "Coffee, please." }
  - type: practice
    id: en-fnd-stress-hello
    kind: audio_choice
    prompt: "Which stress pattern matches hello?"
    audioText: "hello"
    choices: ["hel-LO", "HEL-lo", "hel-lo equally"]
    answer: "hel-LO"
    explanation: "The second syllable carries the main stress."
  - type: practice
    id: en-fnd-stress-teacher
    kind: audio_choice
    prompt: "Which stress pattern matches teacher?"
    audioText: "teacher"
    choices: ["TEA-cher", "tea-CHER", "tea-cher equally"]
    answer: "TEA-cher"
  - type: practice
    id: en-fnd-stress-type-coffee
    kind: type_answer
    prompt: "Type the word you hear."
    audioText: "coffee"
    answer: "coffee"
    hints:
      - "The first syllable is stronger."
      - "It is a common drink."
  - type: checkpoint
    items:
      - id: en-fnd-stress-check-hello
        kind: audio_choice
        prompt: "Choose the natural stress for hello."
        audioText: "hello"
        choices: ["hel-LO", "HEL-lo"]
        answer: "hel-LO"
      - id: en-fnd-stress-check-teacher
        kind: type_answer
        prompt: "Type the job word you hear."
        audioText: "teacher"
        answer: "teacher"
exercise:
  type: type_answer
  prompt: "Type the word you hear: teacher."
  answer: "teacher"
---

This session treats stress as part of vocabulary knowledge rather than optional pronunciation polish.