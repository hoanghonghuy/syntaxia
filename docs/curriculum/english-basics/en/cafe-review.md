---
id: en-a1-u04-review
track: english-basics
locale: en
slug: cafe-review
title: "Review: order at a café"
order: 12
published: true
cefr_level: a1
unit_id: en-a1-cafe-04
unit_title: "Order at a café"
unit_order: 4
unit_can_do: "Order one item politely and finish a simple café exchange"
unit_role: review
can_do: "Recall a polite order and close the exchange without a model"
pattern: "I'd like …, please. / Anything else? / That's all, thank you."
objectives:
  - Retrieve the polite request chunk
  - Recognize the server's follow-up
  - Recall how to close the order
steps:
  - type: scene
    title: "Order again from memory"
    body: "You return to the café. Make a short order without looking at the earlier model."
  - type: dialogue
    lines:
      - { speaker: "Server", text: "What would you like?" }
      - { speaker: "You", text: "I'd like water, please." }
      - { speaker: "Server", text: "Anything else?" }
      - { speaker: "You", text: "No, that's all. Thank you." }
  - type: listen
    prompt: "Listen first. Which item do you hear?"
    text: "I'd like coffee, please."
  - type: practice
    id: en-u04-review-listen
    kind: listen_type
    prompt: "Listen and type the item."
    audioText: "tea"
    answer: "tea"
    hints:
      - "It starts with t-."
  - type: practice
    id: en-u04-review-build
    kind: order_words
    prompt: "Build the polite request."
    tokens: ["please", "coffee", "I'd like"]
    answer: "I'd like coffee please"
    acceptedAnswers: ["I'd like coffee, please.", "I'd like coffee, please"]
    hints:
      - "Start with I'd like."
  - type: practice
    id: en-u04-review-produce
    kind: type_answer
    prompt: "The server asks “Anything else?” You want nothing more. Write your reply."
    answer: "No, that's all. Thank you."
    acceptedAnswers: ["No, that's all, thank you.", "That's all, thank you.", "That's all, thank you"]
    hints:
      - "Use that's all to finish."
  - type: checkpoint
    items:
      - id: en-u04-review-order
        kind: dialogue_choice
        prompt: "Which line orders water politely?"
        choices: ["I'd like water, please.", "Where is the water?", "The water is cold."]
        answer: "I'd like water, please."
      - id: en-u04-review-close
        kind: dialogue_choice
        prompt: "Which line finishes the order?"
        choices: ["That's all, thank you.", "Room five?", "This is my sister."]
        answer: "That's all, thank you."
exercise:
  type: type_answer
  prompt: "Order tea politely."
  answer: "I'd like tea, please"
  acceptedAnswers: ["I'd like tea, please.", "I'd like a tea, please", "I'd like a tea, please."]
---

Retrieve the request and closing chunks as one short café exchange.
