---
id: zh-hsk-b1-03-numbers
track: chinese-hsk
locale: en
slug: numbers
title: "Hear and confirm simple numbers"
order: 3
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-number-03
unit_title: "Confirm a number"
unit_order: 3
unit_can_do: "Hear, repeat, and confirm a simple numbered label in a short service exchange"
unit_role: lesson
can_do: "Recognize numbers in short spoken information and confirm a simple number"
pattern: "零 / 一 / 二 / 三 / … / 十 / 百"
objectives:
  - "Recognize 0–10 in speech and writing"
  - "Use 号 with a simple number"
vocab:
  - { hanzi: "零", pinyin: "líng", gloss: "zero" }
  - { hanzi: "一", pinyin: "yī", gloss: "one" }
  - { hanzi: "二", pinyin: "èr", gloss: "two" }
  - { hanzi: "三", pinyin: "sān", gloss: "three" }
  - { hanzi: "四", pinyin: "sì", gloss: "four" }
  - { hanzi: "五", pinyin: "wǔ", gloss: "five" }
  - { hanzi: "六", pinyin: "liù", gloss: "six" }
  - { hanzi: "七", pinyin: "qī", gloss: "seven" }
  - { hanzi: "八", pinyin: "bā", gloss: "eight" }
  - { hanzi: "九", pinyin: "jiǔ", gloss: "nine" }
  - { hanzi: "十", pinyin: "shí", gloss: "ten" }
  - { hanzi: "百", pinyin: "bǎi", gloss: "hundred" }
  - { hanzi: "号", pinyin: "hào", gloss: "number / label" }
steps:
  - type: scene
    title: "Situation"
    body: "At a reception desk, you need to confirm a numbered room or ticket."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你是三号吗？", reading: "nǐ shì sān hào ma" }
      - { speaker: "B", text: "是，我是三号。", reading: "shì, wǒ shì sān hào" }
      - { speaker: "A", text: "三号，对吗？", reading: "sān hào, duì ma" }
      - { speaker: "B", text: "对。", reading: "duì" }
  - type: listen
    prompt: "Listen before reading. Which number did you hear?"
    text: "三号。"
    reading: "sān hào"
  - type: tip
    title: "Numbers are also information"
    body: "Do not learn the list only by sight. Connect sound, character, and meaning. 号 labels a numbered item such as a room or queue number."
  - type: teach
    items:
      - { form: "一 / 二 / 三", reading: "yī / èr / sān", gloss: "one / two / three", example: "一、二、三。" }
      - { form: "四 / 五 / 六", reading: "sì / wǔ / liù", gloss: "four / five / six", example: "四、五、六。" }
      - { form: "七 / 八 / 九 / 十", reading: "qī / bā / jiǔ / shí", gloss: "seven / eight / nine / ten", example: "七、八、九、十。" }
      - { form: "三号", reading: "sān hào", gloss: "number three", example: "我是三号。" }
  - type: practice
    id: zh-num-listen-1
    kind: audio_choice
    prompt: "Listen and choose the number."
    audioText: "五"
    choices: ["五", "三", "八"]
    answer: "五"
  - type: practice
    id: zh-num-meaning-1
    kind: meaning_choice
    prompt: "Which character means 10?"
    choices: ["十", "百", "零"]
    answer: "十"
  - type: practice
    id: zh-num-type-1
    kind: type_answer
    prompt: "Type the character for 3."
    answer: "三"
    hints:
      - "Pinyin: sān."
  - type: checkpoint
    items:
      - id: zh-num-check-1
        kind: audio_choice
        prompt: "Listen: which label do you hear?"
        audioText: "三号"
        choices: ["三号", "五号", "十号"]
        answer: "三号"
      - id: zh-num-check-2
        kind: dialogue_choice
        prompt: "Review: someone asks 你叫什么名字？ What can you say?"
        choices: ["我叫小明。", "三号。", "不客气。"]
        answer: "我叫小明。"
exercise:
  type: dialogue_choice
  prompt: "Which character means 5?"
  choices: ["五", "三", "八"]
  answer: "五"
---

The guided session above is the lesson. Pinyin supports early reading, while listening, characters, interaction, production, and later review remain the learning loop.
