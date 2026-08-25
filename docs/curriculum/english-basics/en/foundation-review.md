---
id: en-a1-foundation-05-review
track: english-basics
locale: en
slug: foundation-review
title: Retrieve the English foundations
order: -1
published: true
cefr_level: a1
unit_id: en-a1-foundation-00
unit_title: "English foundations"
unit_order: 0
unit_can_do: "Hear and produce a small beginner sound set, use word stress, and build core be-sentences"
unit_role: review
can_do: "Retrieve the key sound, stress, and be-sentence patterns without rereading the lessons"
pattern: "listen → recall → produce"
objectives:
  - Retrieve a familiar sound contrast from audio
  - Recall one common word-stress pattern
  - Produce a short be-sentence from memory
vocab:
  - { word: "sit", ipa: "/sɪt/", gloss: "be seated" }
  - { word: "hotel", ipa: "/hoʊˈtel/", gloss: "a place to stay" }
  - { word: "here", ipa: "/hɪr/", gloss: "at this place" }
steps:
  - type: scene
    title: "No notes first"
    body: "Try the first answer from memory. If you miss it, use the feedback and repeat the target aloud once before continuing."
    imageUrl: "/language/scenes/english-word-stress.svg"
    imageAlt: "A word-stress beat diagram used as a visual cue for retrieval practice."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Are they here?" }
      - { speaker: "B", text: "No, they aren't." }
      - { speaker: "A", text: "Is Mai here?" }
      - { speaker: "B", text: "Yes, she is." }
  - type: listen
    prompt: "Listen once, then answer without looking back."
    text: "Are they here? No, they aren't."
  - type: practice
    id: en-f00-review-sound-1
    kind: audio_choice
    prompt: "Listen. Which word do you hear?"
    audioText: "sit"
    choices: ["sit", "seat", "set"]
    answer: "sit"
  - type: practice
    id: en-f00-review-stress-1
    kind: meaning_choice
    prompt: "Where is the main stress in hotel?"
    choices: ["first syllable", "second syllable", "both equally"]
    answer: "second syllable"
  - type: practice
    id: en-f00-review-produce-1
    kind: type_answer
    prompt: "Write one short sentence: Mai is here. Use the contraction She's."
    answer: "She's here"
    acceptedAnswers: ["She's here."]
    hints:
      - "Use She's + place word."
  - type: checkpoint
    items:
      - id: en-f00-review-check-1
        kind: dialogue_choice
        prompt: "“Are you Alex?” You are Alex. Choose the reply."
        choices: ["Yes, I am.", "Yes, I is.", "Yes, you are."]
        answer: "Yes, I am."
      - id: en-f00-review-check-2
        kind: fill_blank
        prompt: "Complete: They ___ not here."
        choices: ["am", "is", "are"]
        answer: "are"
exercise:
  type: dialogue_choice
  prompt: "Choose the correct reply to “Is she here?”"
  choices: ["Yes, she is.", "Yes, she are.", "Yes, I am."]
  answer: "Yes, she is."
  hints:
    - "The subject is she."
---

This review closes Foundation Unit 0 and hands the learner into the existing first-meeting unit without changing any published IDs there.
