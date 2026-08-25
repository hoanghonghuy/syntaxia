---
id: ja-n5-fnd-02-mora-length
track: japanese-jlpt
locale: en
slug: mora-length
title: Hear long vowels and small っ
order: -4
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Japanese foundation"
unit_order: 0
unit_can_do: "Read, hear, and build basic Japanese forms before the communicative units"
unit_role: lesson
foundation_focus: pronunciation
can_do: "Hear and type beginner words where vowel or consonant length matters"
pattern: "long vowel = extra timing / small っ = a brief blocked beat"
objectives:
  - Notice that Japanese timing can change a word form
  - Hear a long vowel in a familiar word
  - Read and type a word containing small っ
vocab:
  - { surface: "お母さん", reading: "おかあさん", gloss: "mother" }
  - { surface: "時計", reading: "とけい", gloss: "clock / watch" }
  - { surface: "切符", reading: "きっぷ", gloss: "ticket" }
  - { surface: "雑誌", reading: "ざっし", gloss: "magazine" }
  - { surface: "学校", reading: "がっこう", gloss: "school" }
steps:
  - type: scene
    title: "Keep the beat that is written"
    body: "You are reading short beginner words. Listen for length instead of compressing every kana into the same English-like rhythm."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "きっぷ。", reading: "きっぷ。" }
      - { speaker: "学生", text: "きっぷ。", reading: "きっぷ。" }
      - { speaker: "先生", text: "がっこう。", reading: "がっこう。" }
      - { speaker: "学生", text: "がっこう。", reading: "がっこう。" }
  - type: listen
    prompt: "Listen for the brief held timing before ぷ."
    text: "きっぷ"
    reading: "きっぷ"
  - type: tip
    title: "Length is part of the word"
    body: "A long vowel takes extra timing. Small っ marks a brief closure before the following consonant. Do not read きっぷ as きぷ."
  - type: teach
    items:
      - { form: "おかあさん", reading: "おかあさん", gloss: "long vowel timing appears in かあ", example: "お母さん" }
      - { form: "きっぷ", reading: "きっぷ", gloss: "small っ adds a brief held beat", example: "切符" }
      - { form: "がっこう", reading: "がっこう", gloss: "small っ plus a long-vowel spelling", example: "学校" }
  - type: practice
    id: ja-fnd-mora-hear-ticket
    kind: audio_choice
    prompt: "Listen and choose the written form you hear."
    audioText: "きっぷ"
    choices: ["きっぷ", "きぷ", "きゅぷ"]
    answer: "きっぷ"
  - type: practice
    id: ja-fnd-mora-type-ticket
    kind: listen_type
    prompt: "Listen and type the hiragana reading of 切符."
    audioText: "きっぷ"
    answer: "きっぷ"
  - type: practice
    id: ja-fnd-mora-type-school
    kind: type_answer
    prompt: "Type the hiragana reading of 学校."
    answer: "がっこう"
    hints:
      - "Keep both small っ and the final う."
  - type: checkpoint
    items:
      - id: ja-fnd-mora-check-small-tsu
        kind: meaning_choice
        prompt: "Which form correctly writes きっぷ?"
        choices: ["きっぷ", "きぷ", "きつぷ"]
        answer: "きっぷ"
      - id: ja-fnd-mora-check-mother
        kind: type_answer
        prompt: "Type the reading of お母さん."
        answer: "おかあさん"
exercise:
  type: type_answer
  prompt: "Type the reading of 学校."
  answer: "がっこう"
---

The aim is not technical phonetics. It is to preserve sound length well enough to hear, read, and produce beginner words accurately.
