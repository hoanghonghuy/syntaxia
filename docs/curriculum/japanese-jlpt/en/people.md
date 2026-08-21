---
id: ja-n5-02-people
track: japanese-jlpt
locale: en
slug: people
title: Say your name and ask a name
order: 2
published: true
jlpt_level: n5
unit_id: ja-n5-people-02
unit_title: "Introduce yourself and people close to you"
unit_order: 2
unit_can_do: "Introduce yourself, ask a name, and identify a close family member in a short polite exchange"
unit_role: lesson
can_do: "Say your name with です and ask another person's name politely"
pattern: "わたしは … です。 / お名前は何ですか。"
objectives:
  - Introduce yourself with わたしは … です
  - Ask お名前は何ですか
  - Notice that です gives the sentence a polite neutral style
vocab:
  - { surface: "わたし", reading: "わたし", gloss: "I / me" }
  - { surface: "名前", reading: "なまえ", gloss: "name" }
  - { surface: "何", reading: "なん", gloss: "what" }
  - { surface: "です", reading: "です", gloss: "polite copula / sentence ending" }
  - { surface: "はじめまして", reading: "はじめまして", gloss: "said when meeting someone for the first time" }
steps:
  - type: scene
    title: "Meet a classmate"
    body: "It is your first Japanese class. Introduce yourself and ask the person next to you for their name."
  - type: dialogue
    lines:
      - { speaker: "A", text: "はじめまして。わたしはリンです。", reading: "はじめまして。わたしはリンです。" }
      - { speaker: "B", text: "はじめまして。わたしはゆきです。", reading: "はじめまして。わたしはゆきです。" }
      - { speaker: "A", text: "お名前は何ですか。", reading: "おなまえはなんですか。" }
      - { speaker: "B", text: "ゆきです。", reading: "ゆきです。" }
  - type: listen
    prompt: "Listen first. What sentence ending do you hear after the speaker's name?"
    text: "わたしはゆきです。"
    reading: "わたしはゆきです。"
  - type: tip
    title: "Keep the polite frame together"
    body: "For this starter stage, treat わたしは + name + です as one reliable self-introduction frame. お名前は何ですか is a polite way to ask a person's name."
  - type: teach
    items:
      - { form: "わたしはリンです。", reading: "わたしはリンです。", gloss: "I am Linh.", example: "わたしはリンです。" }
      - { form: "お名前は何ですか。", reading: "おなまえはなんですか。", gloss: "What is your name?", example: "お名前は何ですか。" }
      - { form: "はじめまして。", reading: "はじめまして。", gloss: "Nice to meet you / first-time greeting.", example: "はじめまして。" }
  - type: practice
    id: ja-people-dialogue-1
    kind: dialogue_choice
    prompt: "You meet Yuki for the first time. Which self-introduction is natural at this level?"
    choices: ["はじめまして。わたしはリンです。", "これをください。", "いいえ、リン。"]
    answer: "はじめまして。わたしはリンです。"
  - type: practice
    id: ja-people-listen-1
    kind: listen_type
    prompt: "Listen and type the sentence you hear."
    audioText: "ゆきです"
    answer: "ゆきです"
    acceptedAnswers: ["ゆきです。"]
  - type: practice
    id: ja-people-produce-1
    kind: type_answer
    prompt: "Your name is リン. Type “I am Linh” using the lesson frame."
    answer: "わたしはリンです"
    acceptedAnswers: ["わたしはリンです。"]
    hints:
      - "Use わたしは + リン + です."
  - type: checkpoint
    items:
      - id: ja-people-check-1
        kind: meaning_choice
        prompt: "Which question asks a person's name?"
        choices: ["お名前は何ですか。", "これをください。", "ありがとうございます。"]
        answer: "お名前は何ですか。"
      - id: ja-people-check-2
        kind: dialogue_choice
        prompt: "Review: you point to an item you want in a shop. What can you say?"
        choices: ["これをください。", "わたしはこれです。", "お名前は？"]
        answer: "これをください。"
exercise:
  type: dialogue_choice
  prompt: "Choose the polite name question."
  choices: ["お名前は何ですか。", "名前ください。", "何これですか。"]
  answer: "お名前は何ですか。"
---

The lesson keeps kana reading support close to the Japanese while teaching a polite sentence frame, rather than treating わたし or 名前 as isolated glossary entries.
