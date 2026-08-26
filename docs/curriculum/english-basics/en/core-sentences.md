---
id: en-a1-u00-core-sentences
track: english-basics
locale: en
slug: core-sentences
title: "Build a simple sentence with be"
order: -4
published: true
cefr_level: a1
foundation_focus: grammar
unit_id: en-a1-foundation-00
unit_title: "English foundation"
unit_order: 0
unit_can_do: "Hear and build a small set of familiar words and basic English sentence patterns"
unit_role: lesson
can_do: "Build a short one-clause sentence with a subject pronoun and the verb be"
pattern: "subject + be + name / noun / adjective"
objectives:
  - Use I, you, he, she, we, and they as basic subjects
  - Match am, is, and are to the subject
  - Use common contractions in short spoken sentences
vocab:
  - { word: "I", ipa: "/aɪ/", gloss: "the speaker" }
  - { word: "you", ipa: "/juː/", gloss: "the person or people spoken to" }
  - { word: "student", ipa: "/ˈstuːdənt/", gloss: "a person who studies" }
  - { word: "teacher", ipa: "/ˈtiːtʃər/", gloss: "a person who teaches" }
  - { word: "tired", ipa: "/ˈtaɪərd/", gloss: "needing rest" }
steps:
  - type: scene
    title: "Build the sentence in three parts"
    body: "Choose the subject, match it with am, is, or are, then add a name, noun, or simple adjective. The middle slot changes with the subject."
    imageUrl: "/language/scenes/english-be-sentence-frame.svg"
    imageAlt: "Three sentence-building rows show I pointing to am and a student, She pointing to is and a teacher, and They pointing to are and students."
  - type: dialogue
    lines:
      - { speaker: "A", text: "I'm Mai. I'm a student." }
      - { speaker: "B", text: "I'm Alex. You're in my class." }
      - { speaker: "A", text: "She is our teacher." }
      - { speaker: "B", text: "Yes. She's very friendly." }
  - type: listen
    prompt: "Listen for am, are, and is. Notice the contractions I'm, you're, and she's."
    text: "I'm Mai. You're in my class. She's our teacher."
  - type: tip
    title: "The verb changes with the subject"
    body: "Use I am, he/she/it is, and you/we/they are. In everyday speech, contractions such as I'm, you're and she's are common."
  - type: teach
    items:
      - { form: "I am / I'm", reading: "/aɪ æm/ /aɪm/", gloss: "speaker + be", example: "I'm a student." }
      - { form: "you are / you're", reading: "/juː ɑr/ /jʊr/", gloss: "listener + be", example: "You're Alex." }
      - { form: "he/she is", reading: "/hiː ɪz/ /ʃiː ɪz/", gloss: "third-person singular + be", example: "She's a teacher." }
      - { form: "we/they are", reading: "/wiː ɑr/ /ðeɪ ɑr/", gloss: "plural subject + be", example: "We're students." }
  - type: practice
    id: en-fnd-be-i
    kind: order_words
    prompt: "Build the sentence."
    tokens: ["a", "student", "I'm"]
    answer: "I'm a student"
    acceptedAnswers: ["I'm a student."]
    hints:
      - "Start with I'm."
      - "Use a before student."
  - type: practice
    id: en-fnd-be-she
    kind: dialogue_choice
    prompt: "Choose the correct sentence about one woman."
    choices: ["She is a teacher.", "She are a teacher.", "She am a teacher."]
    answer: "She is a teacher."
    explanation: "Use is with she."
  - type: practice
    id: en-fnd-be-you
    kind: type_answer
    prompt: "Alex is speaking to Mai. Complete: “___ a student.”"
    answer: "You're"
    acceptedAnswers: ["You are", "you are", "you're"]
    hints:
      - "The subject is you."
      - "Use you are or its contraction."
  - type: checkpoint
    items:
      - id: en-fnd-be-check-they
        kind: dialogue_choice
        prompt: "Choose the correct plural sentence."
        choices: ["They are students.", "They is students.", "They am students."]
        answer: "They are students."
      - id: en-fnd-be-check-i
        kind: type_answer
        prompt: "Complete: “I ___ tired.”"
        answer: "am"
exercise:
  type: type_answer
  prompt: "Complete: I ___ a student."
  answer: "am"
---

This grammar is taught as a sentence-building tool that the communicative units reuse immediately.
