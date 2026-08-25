---
id: en-a1-u08-checkpoint
track: english-basics
locale: en
slug: free-time-checkpoint
title: Free-time checkpoint
order: 29
published: true
cefr_level: a1
unit_id: en-a1-free-time-08
unit_title: "Make a simple free-time plan"
unit_order: 8
unit_can_do: "Say what you like doing and make or answer a simple invitation with a time and place"
unit_role: checkpoint
can_do: "State one preference, invite someone, and agree on a simple meeting time with minimal support"
pattern: "I like … / Do you want to …? / Yes, let's … / At … / See you there."
objectives:
  - State a familiar preference
  - Make and accept an invitation
  - Agree on a time and place
steps:
  - type: scene
    title: "Turn a shared hobby into a plan"
    body: "You discover that a friend likes the same activity. Invite them and agree on when and where to meet."
    visualKey: "weekend-plan"
    imageAlt: "Two friends connect a shared hobby to a park meeting time."
  - type: dialogue
    lines:
      - { speaker: "A", text: "I like games. Do you?" }
      - { speaker: "B", text: "Yes, I do." }
      - { speaker: "A", text: "Do you want to go to the park on Saturday?" }
      - { speaker: "B", text: "Yes, let's meet at three." }
  - type: listen
    prompt: "Listen. What time do they agree to meet?"
    text: "Let's meet at three."
  - type: practice
    id: en-u08-check-listen
    kind: audio_choice
    prompt: "Listen and choose the meeting time."
    audioText: "Let's meet at three."
    choices: ["3:00", "5:00", "8:00"]
    answer: "3:00"
  - type: practice
    id: en-u08-check-like
    kind: type_answer
    prompt: "State that you like games."
    answer: "I like games"
    acceptedAnswers: ["I like games."]
  - type: practice
    id: en-u08-check-invite
    kind: type_answer
    prompt: "Invite a friend to go to the park."
    answer: "Do you want to go to the park"
    acceptedAnswers: ["Do you want to go to the park?", "Do you want to go to the park with me?", "Do you want to go to the park with me"]
    hints:
      - "Use Do you want to …?"
  - type: checkpoint
    items:
      - id: en-u08-check-accept
        kind: dialogue_choice
        prompt: "Which reply accepts a simple invitation?"
        choices: ["Yes, let's go.", "It's under the chair.", "I'll take it."]
        answer: "Yes, let's go."
      - id: en-u08-check-finish
        kind: dialogue_choice
        prompt: "You agreed on Saturday at three in the park. Which line closes the plan?"
        choices: ["See you there.", "How much is this?", "This is my bedroom."]
        answer: "See you there."
exercise:
  type: type_answer
  prompt: "Invite someone to the park."
  answer: "Do you want to go to the park"
  acceptedAnswers: ["Do you want to go to the park?", "Do you want to go to the park with me?", "Do you want to go to the park with me"]
---

The checkpoint requires a social outcome: a shared activity becomes a concrete plan.
