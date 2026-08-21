---
id: en-a1-u02-checkpoint
track: english-basics
locale: en
slug: people-checkpoint
title: People checkpoint
order: 7
published: true
cefr_level: a1
unit_id: en-a1-people-02
unit_title: "Introduce people close to you"
unit_order: 2
unit_can_do: "Ask who someone is and introduce a friend or family member"
unit_role: checkpoint
can_do: "Identify someone and introduce a friend or family member with minimal support"
pattern: "Who's that? / This is … / He's my … / She's my …"
objectives:
  - Ask who someone is
  - Introduce a person by name or relationship
  - Add one short relationship detail
steps:
  - type: scene
    title: "Introduce two people"
    body: "A classmate notices two people in a photo. Answer who they are, then introduce one person by name."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Who's that?" }
      - { speaker: "B", text: "That's Mai. She's my friend." }
      - { speaker: "A", text: "And who's this?" }
      - { speaker: "B", text: "This is my brother, Nam." }
  - type: listen
    prompt: "Listen. What relationship do you hear?"
    text: "She's my friend."
  - type: practice
    id: en-u02-check-listen
    kind: audio_choice
    prompt: "Listen and choose the relationship."
    audioText: "He's my brother."
    choices: ["brother", "friend", "father"]
    answer: "brother"
  - type: practice
    id: en-u02-check-reply
    kind: dialogue_choice
    prompt: "Someone asks “Who's that?” Anna is your friend. What is a natural reply?"
    choices: ["That's Anna. She's my friend.", "This friend is who?", "Anna is room five."]
    answer: "That's Anna. She's my friend."
    explanation: "Identify the person first, then add the relationship."
  - type: practice
    id: en-u02-check-produce
    kind: type_answer
    prompt: "Nam is your brother. Introduce him using “This is”."
    answer: "This is my brother Nam"
    acceptedAnswers: ["This is my brother, Nam", "This is my brother Nam.", "This is my brother, Nam."]
    hints:
      - "Use This is my + relationship + name."
  - type: checkpoint
    items:
      - id: en-u02-check-question
        kind: dialogue_choice
        prompt: "Which question asks who a person is?"
        choices: ["Who's that?", "Where's that?", "How many is that?"]
        answer: "Who's that?"
      - id: en-u02-check-family
        kind: meaning_choice
        prompt: "Which phrase identifies your female sibling?"
        choices: ["my sister", "my mother", "my friend"]
        answer: "my sister"
exercise:
  type: type_answer
  prompt: "Introduce Nam as your brother."
  answer: "This is my brother Nam"
  acceptedAnswers: ["This is my brother, Nam", "This is my brother Nam.", "This is my brother, Nam."]
---

Use the same short patterns to identify and introduce real people.
