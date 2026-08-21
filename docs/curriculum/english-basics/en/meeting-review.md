---
id: en-a1-u01-review
track: english-basics
locale: en
slug: meeting-review
title: "Review: meet someone"
order: 3
published: true
cefr_level: a1
unit_id: en-a1-meeting-01
unit_title: "Meet someone"
unit_order: 1
unit_can_do: "Start, sustain, and close a short first meeting"
unit_role: review
can_do: "Recall the first-meeting chunks without a model"
pattern: "Hi, I'm … / Nice to meet you. / See you."
objectives:
  - Retrieve the greeting and introduction from memory
  - Close the exchange naturally
steps:
  - type: scene
    title: "Recall the exchange"
    body: "You recognize a classmate you met earlier. Rebuild the useful first-meeting chunks from memory."
    visualKey: "classmates-meeting"
    imageAlt: "Two students face each other in a classroom and prepare to speak."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hi, I'm Maya." }
      - { speaker: "B", text: "Hi, Maya. I'm An." }
      - { speaker: "A", text: "Nice to meet you." }
      - { speaker: "B", text: "Nice to meet you too." }
  - type: listen
    prompt: "Listen before reading the answer. Which greeting and introduction do you hear?"
    text: "Hi, I'm Maya."
  - type: practice
    id: en-u01-review-listen
    kind: audio_choice
    prompt: "Listen and choose the line you hear."
    audioText: "Nice to meet you"
    choices: ["Nice to meet you.", "See you later.", "Hi, I'm Maya."]
    answer: "Nice to meet you."
  - type: practice
    id: en-u01-review-build
    kind: order_words
    prompt: "Build the introduction."
    tokens: ["I'm", "An", "Hi,"]
    answer: "Hi, I'm An"
    acceptedAnswers: ["Hi, I'm An."]
    hints:
      - "Greeting first."
      - "Then I'm + name."
  - type: practice
    id: en-u01-review-produce
    kind: type_answer
    prompt: "Write a casual goodbye using “See you”."
    answer: "See you"
    acceptedAnswers: ["See you.", "See you!", "See you later", "See you later."]
    hints:
      - "Start with See you."
  - type: checkpoint
    items:
      - id: en-u01-review-reply
        kind: dialogue_choice
        prompt: "A says: “Nice to meet you.” What is the natural reply?"
        choices: ["Nice to meet you too.", "I'm goodbye.", "Thank yesterday."]
        answer: "Nice to meet you too."
      - id: en-u01-review-open
        kind: dialogue_choice
        prompt: "Which line can open a first meeting?"
        choices: ["Hi, I'm An.", "See you yesterday.", "You're welcome, goodbye."]
        answer: "Hi, I'm An."
exercise:
  type: dialogue_choice
  prompt: "Choose the natural reply to “Nice to meet you.”"
  choices: ["Nice to meet you too.", "See you yesterday.", "Thank please."]
  answer: "Nice to meet you too."
---

Review is retrieval, not another explanation. Rebuild the chunks and use them again.
