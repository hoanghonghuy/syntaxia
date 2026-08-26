---
id: en-a1-u06-review
track: english-basics
locale: en
slug: shopping-review
title: "Review: buy one item"
order: 22
published: true
cefr_level: a1
unit_id: en-a1-shopping-06
unit_title: "Buy one simple item"
unit_order: 6
unit_can_do: "Ask the price of a familiar item, choose it, and complete a short purchase"
unit_role: review
can_do: "Retrieve the price question and purchase decision without a model"
pattern: "How much is this? / It's … / I'll take it. / Thank you."
objectives:
  - Recall the price question
  - Understand a price from listening
  - Retrieve the purchase decision and polite close
steps:
  - type: scene
    title: "Buy the item again from memory"
    body: "Return to the shop later and complete the same micro-transaction without the earlier dialogue."
    visualKey: "shop-counter-request"
    imageAlt: "A customer recalls a simple purchase at a shop counter."
  - type: dialogue
    lines:
      - { speaker: "Customer", text: "How much is this?" }
      - { speaker: "Clerk", text: "It's eight dollars." }
      - { speaker: "Customer", text: "Okay. I'll take it. Thank you." }
  - type: listen
    prompt: "Listen and retrieve the price."
    text: "It's eight dollars."
  - type: practice
    id: en-u06-review-listen
    kind: listen_type
    prompt: "Listen and type the number you hear."
    audioText: "eight"
    answer: "eight"
    acceptedAnswers: ["8"]
  - type: practice
    id: en-u06-review-question
    kind: order_words
    prompt: "Build the price question."
    tokens: ["is", "How much", "this"]
    answer: "How much is this"
    acceptedAnswers: ["How much is this?"]
  - type: practice
    id: en-u06-review-produce
    kind: type_answer
    prompt: "The price is fine and you want the item. Write the purchase decision."
    answer: "I'll take it"
    acceptedAnswers: ["I'll take it.", "I will take it", "I will take it."]
    hints:
      - "Use I'll …"
  - type: checkpoint
    items:
      - id: en-u06-review-choice
        kind: dialogue_choice
        prompt: "Which line politely states your choice?"
        choices: ["I'd like this, please.", "How much is this?", "Is this the small bag?"]
        answer: "I'd like this, please."
      - id: en-u06-review-close
        kind: dialogue_choice
        prompt: "Which word closes the purchase politely?"
        choices: ["Thank you.", "How much is this?", "I'll take it."]
        answer: "Thank you."
exercise:
  type: type_answer
  prompt: "Recall the price question."
  answer: "How much is this"
  acceptedAnswers: ["How much is this?"]
---

Retrieve the complete transaction logic from memory: ask → understand → decide → close.
