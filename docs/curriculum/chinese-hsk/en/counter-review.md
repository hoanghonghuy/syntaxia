---
id: zh-hsk-b1-u05-review
track: chinese-hsk
locale: en
slug: counter-review
title: "Review: order at a counter"
order: 9
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-counter-05
unit_title: "Order at a counter"
unit_order: 5
unit_can_do: "Order a simple food or drink item and respond to a short follow-up at a counter"
unit_role: review
can_do: "Retrieve the request and follow-up chunks without a model"
pattern: "我要… / 还要…吗？ / 要，谢谢。"
objectives:
  - "Recall a usable 我要 request from sound"
  - "Respond naturally to a short add-on question"
steps:
  - type: scene
    title: "Order again from memory"
    body: "You return to the counter later. Make the short request again without copying the earlier model."
  - type: dialogue
    lines:
      - { speaker: "Server", text: "你要什么？", reading: "nǐ yào shén me" }
      - { speaker: "You", text: "我要苹果。", reading: "wǒ yào píng guǒ" }
      - { speaker: "Server", text: "还要水吗？", reading: "hái yào shuǐ ma" }
      - { speaker: "You", text: "要，谢谢。", reading: "yào, xiè xie" }
  - type: listen
    prompt: "Listen before reading. What is being requested?"
    text: "我要米饭。"
    reading: "wǒ yào mǐ fàn"
  - type: practice
    id: zh-counter-u05-review-listen
    kind: audio_choice
    prompt: "Listen and choose the item."
    audioText: "我要苹果。"
    choices: ["苹果", "茶", "水"]
    answer: "苹果"
  - type: practice
    id: zh-counter-u05-review-reply
    kind: dialogue_choice
    prompt: "The server asks 还要水吗？ You want water too. What do you say?"
    choices: ["要，谢谢。", "我是水。", "水在哪里？"]
    answer: "要，谢谢。"
  - type: practice
    id: zh-counter-u05-review-produce
    kind: type_answer
    prompt: "Type: “I want rice.”"
    answer: "我要米饭"
    acceptedAnswers: ["我要米饭。"]
    hints:
      - "Use 我要 + 米饭."
  - type: checkpoint
    items:
      - id: zh-counter-u05-review-hear
        kind: audio_choice
        prompt: "Listen. Which drink is requested?"
        audioText: "我要茶。"
        choices: ["茶", "水", "苹果"]
        answer: "茶"
      - id: zh-counter-u05-review-request
        kind: dialogue_choice
        prompt: "Which sentence is a direct counter request for water?"
        choices: ["我要水。", "我喝学校。", "水是我。"]
        answer: "我要水。"
exercise:
  type: type_answer
  prompt: "Type: “I want tea.”"
  answer: "我要茶"
  acceptedAnswers: ["我要茶。"]
---

Review is retrieval: rebuild the counter exchange and use the request chunk again without another vocabulary explanation.
