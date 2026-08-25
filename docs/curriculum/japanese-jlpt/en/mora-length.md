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
can_do: "Hear and type beginner words where vowel or consonant length matters in hiragana or katakana"
pattern: "hiragana long vowel = extra kana timing / katakana ー = extra vowel timing / small っ = brief consonant closure"
objectives:
  - Notice that sound length is part of a Japanese word form
  - Read long-vowel spelling in hiragana and the ー long-vowel mark in katakana
  - Hear and type a word containing small っ
vocab:
  - { surface: "お母さん", reading: "おかあさん", gloss: "mother" }
  - { surface: "切符", reading: "きっぷ", gloss: "ticket" }
  - { surface: "雑誌", reading: "ざっし", gloss: "magazine" }
  - { surface: "学校", reading: "がっこう", gloss: "school" }
  - { surface: "コーヒー", reading: "コーヒー", gloss: "coffee" }
  - { surface: "スポーツ", reading: "スポーツ", gloss: "sports" }
steps:
  - type: scene
    title: "Keep the timing that is written"
    body: "You already know basic hiragana and katakana patterns. Now listen for timing that changes how a word is written and recognized."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "きっぷ。", reading: "きっぷ。" }
      - { speaker: "学生", text: "きっぷ。", reading: "きっぷ。" }
      - { speaker: "先生", text: "コーヒー。", reading: "こーひー。" }
      - { speaker: "学生", text: "コーヒー。", reading: "こーひー。" }
  - type: listen
    prompt: "Listen for the brief closure before ぷ."
    text: "きっぷ"
    reading: "きっぷ"
  - type: tip
    title: "Length is part of the word"
    body: "Hiragana can spell a long vowel with an extra vowel kana, as in おかあさん or がっこう. Katakana commonly writes extra vowel timing with ー, as in コーヒー. Small っ marks a brief closure before the following consonant; do not collapse きっぷ to きぷ."
  - type: teach
    items:
      - { form: "おかあさん", reading: "おかあさん", gloss: "the あ after か contributes extra vowel timing", example: "お母さん" }
      - { form: "きっぷ", reading: "きっぷ", gloss: "small っ marks a brief consonant closure", example: "切符" }
      - { form: "がっこう", reading: "がっこう", gloss: "small っ plus a long-vowel spelling with う", example: "学校" }
      - { form: "コーヒー / スポーツ", reading: "こーひー / すぽーつ", gloss: "katakana ー extends the preceding vowel timing", example: "コーヒー" }
  - type: practice
    id: ja-fnd-mora-hear-ticket
    kind: audio_choice
    prompt: "Listen and choose the written form you hear."
    audioText: "きっぷ"
    choices: ["きっぷ", "きぷ", "きつぷ"]
    answer: "きっぷ"
    explanation: "The small っ represents the brief closure before ぷ; full-size つ would be a different sequence."
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
      - id: ja-fnd-mora-check-coffee
        kind: listen_type
        prompt: "Listen and type the katakana word, keeping both long-vowel marks."
        audioText: "コーヒー"
        answer: "コーヒー"
exercise:
  type: type_answer
  prompt: "Type the reading of 学校."
  answer: "がっこう"
---

The goal is not technical phonetics. It is to preserve timing accurately enough to hear, read, and produce common beginner words in both kana scripts.
