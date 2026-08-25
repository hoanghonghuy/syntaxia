---
id: en-a1-u08-review
track: english-basics
locale: en
slug: free-time-review
title: "Review: make a free-time plan"
order: 30
published: true
cefr_level: a1
unit_id: en-a1-free-time-08
unit_title: "Make a simple free-time plan"
unit_order: 8
unit_can_do: "Say what you like doing and make or answer a simple invitation with a time and place"
unit_role: review
can_do: "Retrieve a preference and invitation sequence without a model"
pattern: "I like … / Do you want to …? / Yes, let's … / See you there."
objectives:
  - Recall a simple preference
  - Retrieve an invitation question
  - Reconstruct an accepted plan from memory
steps:
  - type: scene
    title: "Make the plan again from memory"
    body: "Later, recreate a short weekend plan without looking back at the previous dialogue."
    visualKey: "weekend-plan"
    imageAlt: "Two friends recall a simple weekend activity, time, and place."
  - type: dialogue
    lines:
      - { speaker: "A", text: "I like to read. Do you?" }
      - { speaker: "B", text: "Yes, I do." }
      - { speaker: "A", text: "Do you want to go to the park on Saturday?" }
      - { speaker: "B", text: "Yes. See you there at three." }
  - type: listen
    prompt: "Listen and retrieve the day."
    text: "Let's go to the park on Saturday."
  - type: practice
    id: en-u08-review-listen
    kind: listen_type
    prompt: "Listen and type the day."
    audioText: "Saturday"
    answer: "Saturday"
    acceptedAnswers: ["saturday"]
  - type: practice
    id: en-u08-review-like
    kind: type_answer
    prompt: "Recall one preference: you like to read."
    answer: "I like to read"
    acceptedAnswers: ["I like to read.", "I like reading", "I like reading."]
  - type: practice
    id: en-u08-review-invite
    kind: type_answer
    prompt: "Without a model, invite a friend to the park."
    answer: "Do you want to go to the park"
    acceptedAnswers: ["Do you want to go to the park?", "Do you want to go to the park with me?", "Do you want to go to the park with me"]
    hints:
      - "Start with Do you want to …"
  - type: checkpoint
    items:
      - id: en-u08-review-agree
        kind: dialogue_choice
        prompt: "Which line accepts the plan?"
        choices: ["Yes, let's go.", "There's a table.", "It's five dollars."]
        answer: "Yes, let's go."
      - id: en-u08-review-place
        kind: dialogue_choice
        prompt: "Which line shows the meeting place is already understood?"
        choices: ["See you there.", "How much is that?", "Where's the book?"]
        answer: "See you there."
exercise:
  type: type_answer
  prompt: "Recall the invitation to the park."
  answer: "Do you want to go to the park"
  acceptedAnswers: ["Do you want to go to the park?", "Do you want to go to the park with me?", "Do you want to go to the park with me"]
---

This review closes the foundation course by retrieving language that produces a real shared plan.
