---
id: en-a1-u02-review
track: english-basics
locale: en
slug: people-review
title: Review: introduce people
order: 8
published: true
cefr_level: a1
unit_id: en-a1-people-02
unit_title: "Introduce people close to you"
unit_order: 2
unit_can_do: "Ask who someone is and introduce a friend or family member"
unit_role: review
can_do: "Recall how to identify and introduce a person without a model"
pattern: "Who's that? / This is … / He's my … / She's my …"
objectives:
  - Retrieve the question for identifying a person
  - Recall friend and family introductions
  - Produce one short introduction from memory
steps:
  - type: scene
    title: "Recall the introductions"
    body: "You see familiar people again. Rebuild the useful questions and introductions from memory."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Who's that?" }
      - { speaker: "B", text: "That's Linh. She's my friend." }
      - { speaker: "A", text: "And who's this?" }
      - { speaker: "B", text: "This is my sister, Mai." }
  - type: listen
    prompt: "Listen first. Which relationship do you hear?"
    text: "This is my sister, Mai."
  - type: practice
    id: en-u02-review-listen
    kind: listen_type
    prompt: "Listen and type the relationship word."
    audioText: "brother"
    answer: "brother"
    hints:
      - "It starts with br-."
  - type: practice
    id: en-u02-review-build
    kind: order_words
    prompt: "Build the introduction."
    tokens: ["friend", "my", "She's"]
    answer: "She's my friend"
    acceptedAnswers: ["She's my friend."]
    hints:
      - "Start with She's."
  - type: practice
    id: en-u02-review-produce
    kind: type_answer
    prompt: "Mai is your sister. Introduce her using “This is”."
    answer: "This is my sister Mai"
    acceptedAnswers: ["This is my sister, Mai", "This is my sister Mai.", "This is my sister, Mai."]
    hints:
      - "Use This is my + relationship + name."
  - type: checkpoint
    items:
      - id: en-u02-review-who
        kind: dialogue_choice
        prompt: "You do not know the person across the room. What can you ask?"
        choices: ["Who's that?", "Room that?", "Anything else?"]
        answer: "Who's that?"
      - id: en-u02-review-intro
        kind: dialogue_choice
        prompt: "Which line naturally introduces Daniel?"
        choices: ["This is Daniel.", "Daniel who this?", "Where's Daniel friend?"]
        answer: "This is Daniel."
exercise:
  type: dialogue_choice
  prompt: "Choose the natural introduction."
  choices: ["This is my sister, Mai.", "My sister this Mai.", "Who's my Mai sister?"]
  answer: "This is my sister, Mai."
---

Review by retrieving the question and introduction, not by rereading the explanation.
