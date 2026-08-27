---
id: ja-n5-fnd-01-kana-sounds
track: japanese-jlpt
locale: en
slug: kana-sounds
title: Connect kana with Japanese sounds
order: -7
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Japanese foundation"
unit_order: 0
unit_can_do: "Read, hear, and build basic Japanese forms before the communicative units"
unit_role: lesson
foundation_focus: pronunciation
can_do: "Hear the five basic Japanese vowel sounds and type short readings built from kana already introduced"
pattern: "あ・い・う・え・お / ア・イ・ウ・エ・オ"
objectives:
  - Connect the five basic vowel kana with their sounds
  - Recognize that hiragana and katakana represent the same Japanese sound units with different shapes
  - Type short readings only after the kana used in them have been introduced
vocab:
  - { surface: "朝", reading: "あさ", gloss: "morning" }
  - { surface: "家", reading: "いえ", gloss: "home / house" }
  - { surface: "上", reading: "うえ", gloss: "above / on" }
  - { surface: "会う", reading: "あう", gloss: "meet" }
  - { surface: "青", reading: "あお", gloss: "blue / green signal color" }
steps:
  - type: scene
    title: "Sound before a full kana chart"
    body: "Start with the five vowel sounds, then build only a few readings from kana you have actually seen. The next lesson expands the hiragana rows."
    imageUrl: "/language/scenes/japanese-vowel-kana.svg"
    imageAlt: "Five paired tiles connect each hiragana vowel with its matching katakana vowel: あ with ア, い with イ, う with ウ, え with エ, and お with オ."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "あ。い。う。え。お。", reading: "あ。い。う。え。お。" }
      - { speaker: "学生", text: "あ。い。う。え。お。", reading: "あ。い。う。え。お。" }
      - { speaker: "先生", text: "いえ。あお。", reading: "いえ。あお。" }
      - { speaker: "学生", text: "いえ。あお。", reading: "いえ。あお。" }
  - type: listen
    prompt: "Listen first. Which vowel kana do you hear?"
    text: "う"
    reading: "う"
  - type: tip
    title: "Kana are sound symbols"
    body: "Link the sound directly to kana. Hiragana あ and katakana ア represent the same vowel sound. Romaji can help with keyboard input temporarily, but it is not the target writing system."
  - type: teach
    items:
      - { form: "あ い う え お", reading: "あ い う え お", gloss: "five basic hiragana vowel kana", example: "いえ / うえ / あう / あお" }
      - { form: "ア イ ウ エ オ", reading: "あ い う え お", gloss: "matching katakana vowel kana", example: "ア / イ / ウ / エ / オ" }
      - { form: "さ", reading: "さ", gloss: "one consonant-vowel example; the next lesson expands the rows", example: "あ + さ → あさ" }
  - type: practice
    id: ja-fnd-kana-hear-asa
    kind: audio_choice
    prompt: "Listen and choose the matching reading."
    audioText: "あさ"
    choices: ["あさ", "いえ", "あお"]
    answer: "あさ"
  - type: practice
    id: ja-fnd-kana-hear-ie
    kind: listen_type
    prompt: "Listen and type the vowel-only reading."
    audioText: "いえ"
    answer: "いえ"
  - type: practice
    id: ja-fnd-kana-write-au
    kind: type_answer
    prompt: "Type the hiragana reading of 会う."
    answer: "あう"
    hints:
      - "Both kana come from the vowel row."
  - type: checkpoint
    items:
      - id: ja-fnd-kana-check-vowels
        kind: meaning_choice
        prompt: "Which row contains the five basic hiragana vowel kana?"
        choices: ["あ い う え お", "か き く け こ", "ア カ サ タ ナ"]
        answer: "あ い う え お"
      - id: ja-fnd-kana-check-ao
        kind: type_answer
        prompt: "Type the hiragana reading of 青."
        answer: "あお"
exercise:
  type: type_answer
  prompt: "Type the hiragana reading of 上."
  answer: "うえ"
---

This first node deliberately does not pretend that five vowels equal kana mastery. It establishes the sound-symbol principle; the following hiragana and katakana nodes expand the script before later production tasks depend on it.
