---
id: ja-n5-fnd-01b-hiragana-patterns
track: japanese-jlpt
locale: en
slug: hiragana-patterns
title: Read hiragana by sound patterns
order: -6
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Japanese foundation"
unit_order: 0
unit_can_do: "Read, hear, and build basic Japanese forms before the communicative units"
unit_role: lesson
foundation_focus: reading
can_do: "Use hiragana sound-row patterns to read and type a small set of common beginner words"
pattern: "consonant + vowel rows / ん / dakuten / small ゃ・ゅ・ょ"
objectives:
  - Use the consonant-plus-vowel row pattern instead of memorizing unrelated symbols
  - Notice how dakuten changes a sound family, such as き → ぎ
  - Read and type common words that use ん or a small ゃ・ゅ・ょ combination
vocab:
  - { surface: "いす", reading: "いす", gloss: "chair" }
  - { surface: "かぎ", reading: "かぎ", gloss: "key" }
  - { surface: "ここ", reading: "ここ", gloss: "here" }
  - { surface: "そこ", reading: "そこ", gloss: "there" }
  - { surface: "ください", reading: "ください", gloss: "please / please give" }
  - { surface: "しょうゆ", reading: "しょうゆ", gloss: "soy sauce" }
steps:
  - type: scene
    title: "See a system, not 46 unrelated shapes"
    body: "Hiragana is organized around recurring vowel sounds. Use the row pattern to decode a few useful words, then let later lessons and review expand the set."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "かぎ。", reading: "かぎ。" }
      - { speaker: "学生", text: "かぎ。", reading: "かぎ。" }
      - { speaker: "先生", text: "ここ。", reading: "ここ。" }
      - { speaker: "学生", text: "ここ。", reading: "ここ。" }
  - type: listen
    prompt: "Listen. Which hiragana word matches the sound?"
    text: "かぎ"
    reading: "かぎ"
  - type: tip
    title: "Rows reuse the same five vowels"
    body: "For example, か・き・く・け・こ add a k-like consonant to the five vowel positions. Other rows reuse the same idea. Marks can change the consonant: き becomes ぎ. Small ゃ・ゅ・ょ combine with the kana before them, as in しょ."
  - type: teach
    items:
      - { form: "か き く け こ / さ し す せ そ", reading: "か き く け こ / さ し す せ そ", gloss: "two common consonant-vowel rows", example: "かぎ / そこ" }
      - { form: "た ち つ て と / な に ぬ ね の", reading: "た ち つ て と / な に ぬ ね の", gloss: "more row patterns", example: "ください" }
      - { form: "は ひ ふ へ ほ / ま み む め も / や ゆ よ / ら り る れ ろ / わ を ん", reading: "は ひ ふ へ ほ / ま み む め も / や ゆ よ / ら り る れ ろ / わ を ん", gloss: "remaining basic row shapes and ん", example: "ほん" }
      - { form: "き → ぎ / しょ", reading: "き → ぎ / しょ", gloss: "dakuten changes a consonant; small ょ combines with the previous kana", example: "かぎ / しょうゆ" }
  - type: practice
    id: ja-fnd-hira-hear-kagi
    kind: audio_choice
    prompt: "Listen and choose the matching hiragana word."
    audioText: "かぎ"
    choices: ["かぎ", "いす", "ここ"]
    answer: "かぎ"
  - type: practice
    id: ja-fnd-hira-type-koko
    kind: listen_type
    prompt: "Listen and type the word in hiragana."
    audioText: "ここ"
    answer: "ここ"
  - type: practice
    id: ja-fnd-hira-produce-kudasai
    kind: type_answer
    prompt: "Type the hiragana chunk ください."
    answer: "ください"
    hints:
      - "Begin with く."
      - "The final two kana are さい."
  - type: checkpoint
    items:
      - id: ja-fnd-hira-check-row
        kind: meaning_choice
        prompt: "Which is the k-row in hiragana?"
        choices: ["か き く け こ", "さ し す せ そ", "ア イ ウ エ オ"]
        answer: "か き く け こ"
      - id: ja-fnd-hira-check-shoyu
        kind: listen_type
        prompt: "Listen and type the word with small ょ."
        audioText: "しょうゆ"
        answer: "しょうゆ"
exercise:
  type: listen_type
  prompt: "Listen and type the hiragana word."
  audioText: "そこ"
  answer: "そこ"
---

This is a decoding foundation, not a one-page memorization test for the whole script. Later words keep reinforcing the same rows through reading, typing, and spaced retrieval.
