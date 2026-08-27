---
id: en-a1-foundation-01-sound-spelling
track: english-basics
locale: en
slug: sound-spelling
title: Hear the sound before trusting the spelling
order: -5
published: true
cefr_level: a1
unit_id: en-a1-foundation-00
unit_title: "English foundations"
unit_order: 0
unit_can_do: "Hear and produce a small beginner sound set, use word stress, and build core be-sentences"
unit_role: lesson
can_do: "Distinguish and reproduce a small set of familiar English vowel contrasts with careful guidance"
pattern: "spelling → listen → sound"
objectives:
  - Treat spelling as a clue rather than a perfect pronunciation rule
  - Hear a basic short/long vowel contrast in familiar words
  - Use IPA only as optional listening support
vocab:
  - { word: "sit", ipa: "/sɪt/", gloss: "be seated" }
  - { word: "seat", ipa: "/siːt/", gloss: "a place to sit" }
  - { word: "live", ipa: "/lɪv/", gloss: "have your home somewhere" }
  - { word: "leave", ipa: "/liːv/", gloss: "go away" }
steps:
  - type: scene
    title: "Listen before you read"
    body: "English spelling is useful, but the same letters do not always tell you the exact sound. Listen first, then connect the sound to the written word."
    imageUrl: "/language/scenes/english-sound-spelling.svg"
    imageAlt: "A diagram connecting written words sit and seat to their different spoken vowel sounds."
  - type: dialogue
    lines:
      - { speaker: "Teacher", text: "Please sit here." }
      - { speaker: "Learner", text: "This seat?" }
      - { speaker: "Teacher", text: "Yes. Sit in this seat." }
  - type: listen
    prompt: "Listen for the two different vowel sounds."
    text: "Sit in this seat."
  - type: tip
    title: "Use your ear first"
    body: "The letters i and ea look different, but the important beginner habit is simpler: hear the word, imitate it, then connect it to spelling. IPA such as /ɪ/ and /iː/ is only a support label."
  - type: teach
    items:
      - { form: "sit", reading: "/sɪt/", gloss: "short vowel", example: "Please sit here." }
      - { form: "seat", reading: "/siːt/", gloss: "longer vowel", example: "This seat is free." }
      - { form: "live / leave", reading: "/lɪv/ · /liːv/", gloss: "another useful listening contrast", example: "I live here. / I leave at eight." }
  - type: practice
    id: en-f00-sound-listen-1
    kind: audio_choice
    prompt: "Listen. Which word do you hear?"
    audioText: "seat"
    choices: ["sit", "seat", "set"]
    answer: "seat"
    explanation: "The vowel is /iː/, the sound in seat."
  - type: practice
    id: en-f00-sound-context-1
    kind: dialogue_choice
    prompt: "Someone points to a chair and says, “This ___ is free.” Which word fits?"
    choices: ["seat", "sit", "leave"]
    answer: "seat"
    explanation: "Seat is the noun for the place you sit."
  - type: practice
    id: en-f00-sound-produce-1
    kind: type_answer
    prompt: "Write the word with /ɪ/: “Please ___ here.”"
    answer: "sit"
    hints:
      - "The verb is /sɪt/."
  - type: checkpoint
    items:
      - id: en-f00-sound-check-1
        kind: audio_choice
        prompt: "Listen and choose the word."
        audioText: "live"
        choices: ["live", "leave", "love"]
        answer: "live"
      - id: en-f00-sound-check-2
        kind: meaning_choice
        prompt: "Which statement is the best pronunciation habit?"
        choices: ["Listen first, then connect sound and spelling.", "Guess every sound from spelling only.", "Ignore spoken English and read silently."]
        answer: "Listen first, then connect sound and spelling."
exercise:
  type: audio_choice
  prompt: "Listen and choose the word you hear."
  audioText: "seat"
  choices: ["sit", "seat", "set"]
  answer: "seat"
  hints:
    - "Listen for /iː/."
---

This foundation lesson builds a listening habit rather than trying to teach the entire English sound system at once.
