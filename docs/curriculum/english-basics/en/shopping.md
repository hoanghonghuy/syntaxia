---
id: en-a1-20-shopping
track: english-basics
locale: en
slug: shopping
title: Choose and buy one item
order: 20
published: true
cefr_level: a1
unit_id: en-a1-shopping-06
unit_title: "Buy one simple item"
unit_order: 6
unit_can_do: "Ask the price of a familiar item, choose it, and complete a short purchase"
unit_role: lesson
can_do: "Say which item you want and close a simple purchase politely"
pattern: "I'd like this … / I'll take it. / Here you are. / Thank you."
objectives:
  - State which item you want
  - Accept a price and choose the item
  - Finish a short purchase politely
vocab:
  - { word: "small", ipa: "/smɔːl/", gloss: "not big" }
  - { word: "big", ipa: "/bɪɡ/", gloss: "large" }
  - { word: "please", ipa: "/pliːz/", gloss: "polite request word" }
  - { word: "thank you", ipa: "/ˈθæŋk juː/", gloss: "polite thanks" }
  - { word: "I'd like", ipa: "/aɪd laɪk/", gloss: "polite phrase for choosing or requesting an item" }
  - { word: "I'll take it", ipa: "/aɪl teɪk ɪt/", gloss: "says you have decided to buy the item" }
  - { word: "here you are", ipa: "/hɪr ju ɑːr/", gloss: "said when handing something to someone" }
steps:
  - type: scene
    title: "Buy the bag you chose"
    body: "You know the price. Now identify the bag you want and complete the purchase."
    visualKey: "shop-counter-request"
    imageAlt: "A customer chooses an item at a shop counter."
  - type: dialogue
    lines:
      - { speaker: "Customer", text: "I'd like this small bag, please." }
      - { speaker: "Clerk", text: "Sure. It's five dollars." }
      - { speaker: "Customer", text: "Okay. I'll take it." }
      - { speaker: "Clerk", text: "Here you are." }
      - { speaker: "Customer", text: "Thank you." }
  - type: listen
    prompt: "Listen. Does the customer buy the item?"
    text: "Okay. I'll take it."
  - type: tip
    title: "Choose, accept, close"
    body: "I'd like this … names your choice. I'll take it means you accept the item and price. Here you are and Thank you close the exchange."
  - type: teach
    items:
      - { form: "I'd like this bag, please.", gloss: "state your choice politely", example: "I'd like this small bag, please." }
      - { form: "I'll take it.", gloss: "accept the item", example: "Okay. I'll take it." }
      - { form: "Here you are.", gloss: "clerk gives the item", example: "Here you are." }
  - type: practice
    id: en-u06-shop-context
    kind: dialogue_choice
    prompt: "The price is okay and you want the bag. What can you say?"
    choices: ["I'll take it.", "What time is it?", "Who's that?"]
    answer: "I'll take it."
  - type: practice
    id: en-u06-shop-listen
    kind: audio_choice
    prompt: "Listen and choose what the customer wants."
    audioText: "I'd like this small bag, please."
    choices: ["small bag", "big bag", "water"]
    answer: "small bag"
  - type: practice
    id: en-u06-shop-produce
    kind: type_answer
    prompt: "You want the small bag. Ask for it politely."
    answer: "I'd like this small bag, please"
    acceptedAnswers: ["I'd like this small bag, please.", "I would like this small bag, please", "I would like this small bag, please."]
    hints:
      - "Use I'd like …, please."
  - type: checkpoint
    items:
      - id: en-u06-shop-check-take
        kind: dialogue_choice
        prompt: "Which line means you decide to buy the item?"
        choices: ["I'll take it.", "How much is it?", "See you at eight."]
        answer: "I'll take it."
      - id: en-u06-shop-check-close
        kind: dialogue_choice
        prompt: "The clerk gives you the bag. What is a natural reply?"
        choices: ["Thank you.", "Who are you?", "At five."]
        answer: "Thank you."
exercise:
  type: type_answer
  prompt: "Politely ask for the small bag."
  answer: "I'd like this small bag, please"
  acceptedAnswers: ["I'd like this small bag, please.", "I would like this small bag, please", "I would like this small bag, please."]
---

The useful outcome is a complete micro-transaction: identify the item, accept it, and close politely.
