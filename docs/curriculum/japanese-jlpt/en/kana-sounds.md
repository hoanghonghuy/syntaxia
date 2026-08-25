---
id: ja-n5-fnd-01-kana-sounds
track: japanese-jlpt
locale: en
slug: kana-sounds
title: Connect kana with Japanese sounds
order: -5
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Japanese foundation"
unit_order: 0
unit_can_do: "Read, hear, and build basic Japanese forms before the communicative units"
unit_role: lesson
foundation_focus: pronunciation
can_do: "Hear a simple Japanese word and type its hiragana reading"
pattern: "あ・い・う・え・お / ア・イ・ウ・エ・オ"
objectives:
  - Connect the five basic vowel kana with their sounds
  - Notice that hiragana and katakana represent Japanese sound units
  - Type a familiar word in hiragana after hearing it
vocab:
  - { surface: "朝", reading: "あさ", gloss: "morning" }
  - { surface: "家", reading: "いえ", gloss: "home / house" }
  - { surface: "上", reading: "うえ", gloss: "above / on" }
  - { surface: "駅", reading: "えき", gloss: "station" }
  - { surface: "お茶", reading: "おちゃ", gloss: "tea" }
steps:
  - type: scene
    title: "Read sounds, not romaji labels"
    body: "You hear short Japanese words and connect the sounds to kana. Romaji is not the target writing system."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "あさ。", reading: "あさ。" }
      - { speaker: "学生", text: "あさ。", reading: "あさ。" }
      - { speaker: "先生", text: "えき。", reading: "えき。" }
      - { speaker: "学生", text: "えき。", reading: "えき。" }
  - type: listen
    prompt: "Listen before reading. Which hiragana word do you hear?"
    text: "あさ"
    reading: "あさ"
  - type: tip
    title: "Kana represent sound units"
    body: "Start by linking what you hear directly to kana. Use romaji only as temporary input help when necessary."
  - type: teach
    items:
      - { form: "あ い う え お", reading: "あ い う え お", gloss: "basic hiragana vowel row", example: "あさ / いえ / うえ / えき / おちゃ" }
      - { form: "ア イ ウ エ オ", reading: "あ い う え お", gloss: "matching katakana vowel row", example: "ア / イ / ウ / エ / オ" }
  - type: practice
    id: ja-fnd-kana-hear-asa
    kind: audio_choice
    prompt: "Listen and choose the matching reading."
    audioText: "あさ"
    choices: ["あさ", "いえ", "えき"]
    answer: "あさ"
  - type: practice
    id: ja-fnd-kana-hear-eki
    kind: listen_type
    prompt: "Listen and type the word in hiragana."
    audioText: "えき"
    answer: "えき"
  - type: practice
    id: ja-fnd-kana-write-ie
    kind: type_answer
    prompt: "Type the hiragana reading of 家."
    answer: "いえ"
    hints:
      - "It begins with い."
  - type: checkpoint
    items:
      - id: ja-fnd-kana-check-vowels
        kind: meaning_choice
        prompt: "Which row contains the five basic hiragana vowel kana?"
        choices: ["あ い う え お", "か き く け こ", "ア カ サ タ ナ"]
        answer: "あ い う え お"
      - id: ja-fnd-kana-check-ocha
        kind: type_answer
        prompt: "Type the reading of お茶."
        answer: "おちゃ"
exercise:
  type: type_answer
  prompt: "Type the hiragana reading of 駅."
  answer: "えき"
---

The goal is a direct sound-to-kana connection. Later lessons keep readings as support, but kana itself becomes part of what you can read.
