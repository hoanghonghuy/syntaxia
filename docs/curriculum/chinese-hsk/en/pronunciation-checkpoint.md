---
id: zh-hsk-b1-u00-checkpoint
track: chinese-hsk
locale: en
slug: pronunciation-checkpoint
title: "Pronunciation foundation checkpoint"
order: -2
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Pronunciation foundation"
unit_order: 0
unit_can_do: "Hear, identify, and reproduce core Mandarin syllable and tone patterns"
unit_role: checkpoint
can_do: "Choose and produce tone-marked Pinyin for beginner Mandarin sounds without a reference table"
pattern: "syllable parts -> tone -> standard spelling"
objectives: ["Check Pinyin syllable decoding", "Check tone recognition and standard spelling under connected speech"]
steps:
  - type: scene
    title: "Sound check"
    body: "No dialogue to memorize here. Use your ear and the Pinyin system itself."
    imageUrl: "/language/scenes/mandarin-tone-ladder.svg"
    imageAlt: "The Mandarin tone ladder used as a compact listening checkpoint reference."
  - type: listen
    prompt: "Listen once before answering: 你, 好, 是, 吗."
    text: "你，好，是，吗"
    reading: "nǐ, hǎo, shì, ma"
  - type: practice
    id: zh-pron-checkpoint-hear-hao
    kind: audio_choice
    prompt: "Listen to 好. Choose the correct Pinyin."
    audioText: "好"
    choices: ["hǎo", "háo", "hào"]
    answer: "hǎo"
  - type: practice
    id: zh-pron-checkpoint-neutral-ma
    kind: type_answer
    prompt: "Type the Pinyin for neutral-tone 吗."
    answer: "ma"
  - type: practice
    id: zh-pron-checkpoint-spell-nihao
    kind: type_answer
    prompt: "Type the standard tone-marked Pinyin for 你好."
    answer: "nǐ hǎo"
  - type: checkpoint
    items:
      - id: zh-pron-checkpoint-tone-shi
        kind: audio_choice
        prompt: "Listen to 是. Choose its Pinyin."
        audioText: "是"
        choices: ["shī", "shí", "shì"]
        answer: "shì"
      - id: zh-pron-checkpoint-sandhi-rule
        kind: meaning_choice
        prompt: "Do you respell nǐ hǎo as ní hǎo because of the spoken 3 + 3 change?"
        choices: ["No — keep nǐ hǎo", "Yes — always write ní hǎo", "Remove both tone marks"]
        answer: "No — keep nǐ hǎo"
exercise:
  type: type_answer
  prompt: "Type the standard Pinyin for 你好."
  answer: "nǐ hǎo"
---

This checkpoint verifies the sound system before communicative unit 1 begins.
