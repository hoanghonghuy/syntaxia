---
id: en-a1-u04-checkpoint
track: english-basics
locale: en
slug: cafe-checkpoint
title: Café checkpoint
order: 11
published: true
cefr_level: a1
unit_id: en-a1-cafe-04
unit_title: "Order at a café"
unit_order: 4
unit_can_do: "Order one item politely and finish a simple café exchange"
unit_role: checkpoint
can_do: "Order one item and close a short café exchange with minimal support"
pattern: "I'd like …, please. / Anything else? / That's all, thank you."
objectives:
  - Identify the item in an order
  - Make a polite request
  - Respond when the server asks about another item
steps:
  - type: scene
    title: "Make a complete order"
    body: "Order one drink, then finish the exchange when the server asks whether you want anything else."
  - type: dialogue
    lines:
      - { speaker: "Server", text: "What would you like?" }
      - { speaker: "You", text: "I'd like a coffee, please." }
      - { speaker: "Server", text: "Anything else?" }
      - { speaker: "You", text: "No, that's all. Thank you." }
  - type: listen
    prompt: "Listen. Which item does the customer order?"
    text: "I'd like tea, please."
  - type: practice
    id: en-u04-check-listen
    kind: audio_choice
    prompt: "Listen and choose the item."
    audioText: "I'd like bread, please."
    choices: ["bread", "water", "coffee"]
    answer: "bread"
  - type: practice
    id: en-u04-check-order
    kind: type_answer
    prompt: "You want water. Write a polite order."
    answer: "I'd like water, please"
    acceptedAnswers: ["I'd like water, please.", "I'd like a water, please", "I'd like a water, please."]
    hints:
      - "Start with I'd like."
  - type: practice
    id: en-u04-check-close
    kind: order_words
    prompt: "Build the line that finishes the order."
    tokens: ["thank you", "that's all", "No,"]
    answer: "No, that's all, thank you"
    acceptedAnswers: ["No, that's all. Thank you.", "No, that's all, thank you."]
    hints:
      - "Start with No."
  - type: checkpoint
    items:
      - id: en-u04-check-extra
        kind: dialogue_choice
        prompt: "The server asks “Anything else?” You do not want more. What can you say?"
        choices: ["No, that's all. Thank you.", "Where's the café?", "This is my brother."]
        answer: "No, that's all. Thank you."
      - id: en-u04-check-polite
        kind: dialogue_choice
        prompt: "Which line is a polite order for tea?"
        choices: ["I'd like a tea, please.", "Where is the tea?", "The tea is hot."]
        answer: "I'd like a tea, please."
exercise:
  type: type_answer
  prompt: "Order coffee politely."
  answer: "I'd like a coffee, please"
  acceptedAnswers: ["I'd like a coffee, please.", "I'd like coffee, please", "I'd like coffee, please."]
---

Complete the service exchange with a request and a clear close.
