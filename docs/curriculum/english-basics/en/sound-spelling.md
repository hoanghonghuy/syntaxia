---
id: en-a1-u00-sound-spelling
track: english-basics
locale: en
slug: sound-spelling
title: "Hear the word, then read the spelling"
order: -9
published: true
cefr_level: a1
foundation_focus: pronunciation
unit_id: en-a1-foundation-00
unit_title: "English foundation"
unit_order: 0
unit_can_do: "Hear and build a small set of familiar English words and basic sentence patterns"
unit_role: lesson
can_do: "Connect a familiar English word with its spelling and a simple sound reference"
pattern: "sound ↔ word ↔ spelling"
objectives:
  - Notice that English letters and sounds are related but not one-to-one
  - Use audio first and IPA only as a supporting reference
  - Hear and reproduce a small set of familiar A1 words
vocab:
  - { word: "hi", ipa: "/haɪ/", gloss: "greeting" }
  - { word: "meet", ipa: "/miːt/", gloss: "see someone for the first time" }
  - { word: "name", ipa: "/neɪm/", gloss: "what someone is called" }
  - { word: "this", ipa: "/ðɪs/", gloss: "points to something near" }
steps:
  - type: scene
    title: "Sound before spelling"
    body: "Listen to a familiar word first. Then connect what you heard to the written form. IPA is a reference, not a second spelling system to memorise."
    imageUrl: "/language/scenes/english-sound-spelling.svg"
    imageAlt: "The word meet points to a simple sound breakdown, showing spelling and pronunciation as connected but different."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hi, I'm Mia." }
      - { speaker: "B", text: "Hi, Mia. Nice to meet you." }
  - type: listen
    prompt: "Listen for the whole words before looking at the sound symbols."
    text: "hi, meet, name, this"
  - type: tip
    title: "Do not pronounce letter by letter"
    body: "English spelling gives clues, but a word is learned as a sound-and-meaning unit. Listen, imitate, then use the spelling to remember it."
  - type: teach
    items:
      - { form: "hi", reading: "/haɪ/", gloss: "one syllable", example: "Hi, I'm Mia." }
      - { form: "meet", reading: "/miːt/", gloss: "the two e letters represent one long vowel sound here", example: "Nice to meet you." }
      - { form: "name", reading: "/neɪm/", gloss: "the final e changes the vowel pattern here", example: "My name is Mia." }
  - type: practice
    id: en-fnd-sound-hear-meet
    kind: audio_choice
    prompt: "Listen. Which written word matches?"
    audioText: "meet"
    choices: ["meet", "met", "mate"]
    answer: "meet"
    explanation: "The target word is meet /miːt/."
  - type: practice
    id: en-fnd-sound-hear-name
    kind: audio_choice
    prompt: "Listen. Which word do you hear?"
    audioText: "name"
    choices: ["name", "namee", "nem"]
    answer: "name"
    explanation: "Learn the standard spelling together with the spoken word."
  - type: practice
    id: en-fnd-sound-type-hi
    kind: type_answer
    prompt: "Type the greeting you hear."
    audioText: "hi"
    answer: "hi"
    acceptedAnswers: ["Hi", "Hi!"]
    hints:
      - "It is one short greeting."
      - "It starts with h."
  - type: checkpoint
    items:
      - id: en-fnd-sound-check-this
        kind: audio_choice
        prompt: "Listen and choose the word."
        audioText: "this"
        choices: ["this", "these", "dis"]
        answer: "this"
      - id: en-fnd-sound-check-meet
        kind: type_answer
        prompt: "Type the word you hear."
        audioText: "meet"
        answer: "meet"
exercise:
  type: type_answer
  prompt: "Type the word you hear: meet."
  answer: "meet"
---

This session establishes the rule used by the rest of the course: learn a word through sound, meaning, and spelling together.
