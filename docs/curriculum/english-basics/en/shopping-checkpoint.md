---
id: en-a1-u06-checkpoint
track: english-basics
locale: en
slug: shopping-checkpoint
title: Shopping checkpoint
order: 21
published: true
cefr_level: a1
unit_id: en-a1-shopping-06
unit_title: "Buy one simple item"
unit_order: 6
unit_can_do: "Ask the price of a familiar item, choose it, and complete a short purchase"
unit_role: checkpoint
can_do: "Ask a price, state a choice, and close a simple purchase with minimal support"
pattern: "How much is this? / I'd like this … / I'll take it. / Thank you."
objectives:
  - Ask a price
  - Understand a price and choose an item
  - Finish a purchase politely
steps:
  - type: scene
    title: "Buy one item without a script"
    body: "At a small shop, ask the price of a bag, choose it, and finish the exchange."
    visualKey: "shop-counter-request"
    imageAlt: "A customer and clerk complete a purchase at a small counter."
  - type: dialogue
    lines:
      - { speaker: "Customer", text: "How much is this bag?" }
      - { speaker: "Clerk", text: "It's six dollars." }
      - { speaker: "Customer", text: "Okay. I'll take it." }
      - { speaker: "Clerk", text: "Here you are." }
      - { speaker: "Customer", text: "Thank you." }
  - type: listen
    prompt: "Listen. What does the customer decide?"
    text: "Okay. I'll take it."
  - type: practice
    id: en-u06-check-listen
    kind: audio_choice
    prompt: "Listen and choose the price."
    audioText: "It's six dollars."
    choices: ["$5", "$6", "$8"]
    answer: "$6"
  - type: practice
    id: en-u06-check-question
    skills: ["en.communication.price-question"]
    kind: type_answer
    prompt: "Ask the price of a bag beside you."
    answer: "How much is this bag"
    acceptedAnswers: ["How much is this bag?", "How much is this?"]
  - type: practice
    id: en-u06-check-purchase
    skills: ["en.communication.purchase-decision", "en.communication.shopping"]
    kind: type_answer
    prompt: "The price is okay. Say that you will buy it."
    answer: "I'll take it"
    acceptedAnswers: ["I'll take it.", "I will take it", "I will take it."]
    hints:
      - "Use take it."
  - type: checkpoint
    items:
      - id: en-u06-check-choice
        kind: dialogue_choice
        prompt: "Which line politely names the item you want?"
        choices: ["I'd like this bag, please.", "How much is this bag?", "Is this the small bag?"]
        answer: "I'd like this bag, please."
      - id: en-u06-check-thanks
        kind: dialogue_choice
        prompt: "The clerk says “Here you are.” What closes the exchange?"
        choices: ["Thank you.", "How much?", "What time?"]
        answer: "Thank you."
exercise:
  type: type_answer
  prompt: "The bag costs six dollars and you want it. Say your decision."
  answer: "I'll take it"
  acceptedAnswers: ["I'll take it.", "I will take it", "I will take it."]
---

The checkpoint requires a complete buying flow: price → decision → polite close.
