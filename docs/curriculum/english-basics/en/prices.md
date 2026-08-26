---
id: en-a1-19-prices
track: english-basics
locale: en
slug: prices
title: Ask how much something costs
order: 19
published: true
cefr_level: a1
unit_id: en-a1-shopping-06
unit_title: "Buy one simple item"
unit_order: 6
unit_can_do: "Ask the price of a familiar item, choose it, and complete a short purchase"
unit_role: lesson
can_do: "Ask the price of one item and understand a simple whole-number price"
pattern: "How much is this? / It's … / How much is that?"
objectives:
  - Ask a simple price question
  - Distinguish this and that in a shop exchange
  - Understand a short whole-number price
vocab:
  - { word: "money", ipa: "/ˈmʌni/", gloss: "what you pay with" }
  - { word: "shop", ipa: "/ʃɑːp/", gloss: "place where you buy things" }
  - { word: "bag", ipa: "/bæɡ/", gloss: "container you can carry" }
  - { word: "buy", ipa: "/baɪ/", gloss: "pay to get something" }
  - { word: "how much", ipa: "/haʊ mʌtʃ/", gloss: "asks about a price" }
  - { word: "this", ipa: "/ðɪs/", gloss: "points to an item near you" }
  - { word: "that", ipa: "/ðæt/", gloss: "points to an item farther away" }
  - { word: "dollar", ipa: "/ˈdɑːlər/", gloss: "a currency unit used in the sample prices" }
steps:
  - type: scene
    title: "Check a price before buying"
    body: "You are at a small shop. Point to one item, ask its price, and decide whether to buy it."
    visualKey: "shop-counter-request"
    imageAlt: "A customer points to an item at a shop counter while speaking to the clerk."
  - type: dialogue
    lines:
      - { speaker: "Customer", text: "How much is this bag?" }
      - { speaker: "Clerk", text: "It's five dollars." }
      - { speaker: "Customer", text: "Five dollars? Okay, thank you." }
  - type: listen
    prompt: "Listen once. What price do you hear?"
    text: "It's five dollars."
  - type: tip
    title: "Ask about the item you mean"
    body: "Use How much is this? for an item near you and How much is that? for an item farther away. The other person can answer with It's + price."
  - type: teach
    items:
      - { form: "How much is this?", gloss: "ask the price of a nearby item", example: "How much is this bag?" }
      - { form: "How much is that?", gloss: "ask the price of a farther item", example: "How much is that?" }
      - { form: "It's five dollars.", gloss: "give a simple price", example: "It's five dollars." }
  - type: practice
    id: en-u06-price-context
    kind: dialogue_choice
    prompt: "You point to a bag beside you. Which question is natural?"
    choices: ["How much is this bag?", "Where is this bag?", "Do you like this bag?"]
    answer: "How much is this bag?"
  - type: practice
    id: en-u06-price-listen
    kind: audio_choice
    prompt: "Listen and choose the price."
    audioText: "It's eight dollars."
    choices: ["$5", "$8", "$10"]
    answer: "$8"
  - type: practice
    id: en-u06-price-produce
    kind: type_answer
    prompt: "Ask the price of a bag near you."
    answer: "How much is this bag"
    acceptedAnswers: ["How much is this bag?", "How much is this?"]
    hints:
      - "Start with How much …"
  - type: checkpoint
    items:
      - id: en-u06-price-check-reply
        kind: dialogue_choice
        prompt: "The customer asks “How much is this?” Which reply gives a price?"
        choices: ["It's six dollars.", "It's my sister.", "It's at six."]
        answer: "It's six dollars."
      - id: en-u06-price-check-that
        kind: meaning_choice
        prompt: "Which word can point to an item farther away?"
        choices: ["that", "today", "then"]
        answer: "that"
exercise:
  type: type_answer
  prompt: "Ask the price of the item beside you."
  answer: "How much is this"
  acceptedAnswers: ["How much is this?", "How much is this item?", "How much is this item"]
---

Use the question to make a real buying decision; the number matters because it changes what you do next.
