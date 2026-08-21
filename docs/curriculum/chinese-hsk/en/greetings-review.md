---
id: zh-hsk-b1-u01-review
track: chinese-hsk
locale: en
slug: greetings-review
title: Review: greetings
order: 3
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-greeting-01
unit_title: "Greet and close a short exchange"
unit_order: 1
unit_can_do: "Greet someone, thank them, and close a short exchange naturally"
unit_role: review
can_do: "Recall the greeting exchange from characters and audio"
pattern: "你好 / 谢谢 / 不客气 / 再见"
objectives:
  - Retrieve the core greeting chunks from memory
  - Connect audio, pinyin, and characters again
steps:
  - type: scene
    title: "Recall the exchange"
    body: "You see the same classmate again. Rebuild the greeting chunks without rereading the lesson."
    visualKey: "classmates-meeting"
    imageAlt: "Two classmates face each other in a classroom and prepare to speak again."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "B", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "A", text: "谢谢！", reading: "xiè xie" }
      - { speaker: "B", text: "不客气。", reading: "bú kè qi" }
  - type: listen
    prompt: "Listen before looking at the text. Which greeting do you hear?"
    text: "你好！"
    reading: "nǐ hǎo"
  - type: practice
    id: zh-u01-review-audio
    kind: audio_choice
    prompt: "Listen and choose what you hear."
    audioText: "谢谢"
    choices: ["谢谢", "你好", "再见"]
    answer: "谢谢"
  - type: practice
    id: zh-u01-review-reply
    kind: dialogue_choice
    prompt: "A says 谢谢. What should B say?"
    choices: ["不客气。", "你好。", "谢谢。"]
    answer: "不客气。"
  - type: practice
    id: zh-u01-review-type
    kind: type_answer
    prompt: "Type the characters for “goodbye”."
    answer: "再见"
    hints:
      - "Recall the two-character closing chunk."
  - type: checkpoint
    items:
      - id: zh-u01-review-open
        kind: meaning_choice
        prompt: "Which chunk opens the greeting?"
        choices: ["你好", "再见", "不客气"]
        answer: "你好"
      - id: zh-u01-review-thanks
        kind: dialogue_choice
        prompt: "Which pair is a natural thank-you exchange?"
        choices: ["谢谢 → 不客气", "你好 → 再见", "再见 → 谢谢"]
        answer: "谢谢 → 不客气"
exercise:
  type: dialogue_choice
  prompt: "Choose the natural reply to 谢谢."
  choices: ["不客气", "你好", "再见"]
  answer: "不客气"
---

Review by retrieval: hear it, recognize it, then produce the characters again.
