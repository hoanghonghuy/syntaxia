---
id: zh-hsk-b1-u01-checkpoint
track: chinese-hsk
locale: en
slug: greetings-checkpoint
title: Greeting checkpoint
order: 2
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-greeting-01
unit_title: "Greet and close a short exchange"
unit_order: 1
unit_can_do: "Greet someone, thank them, and close a short exchange naturally"
unit_role: checkpoint
can_do: "Complete a short greeting exchange with minimal support"
pattern: "你好 / 谢谢 / 不客气 / 再见"
objectives:
  - Respond naturally to a greeting or thanks
  - Produce the key characters from memory
steps:
  - type: scene
    title: "Before class"
    body: "You meet a classmate before class and have only a few seconds to greet them."
    visualKey: "classmates-meeting"
    imageAlt: "Two classmates face each other before class and begin a short greeting."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "B", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "A", text: "谢谢你。", reading: "xiè xie nǐ" }
      - { speaker: "B", text: "不客气。", reading: "bú kè qi" }
      - { speaker: "A", text: "再见！", reading: "zài jiàn" }
  - type: listen
    prompt: "Listen first. Which reply follows 谢谢?"
    text: "不客气。"
    reading: "bú kè qi"
  - type: practice
    id: zh-u01-check-audio
    kind: audio_choice
    prompt: "Listen and choose what you hear."
    audioText: "再见"
    choices: ["再见", "谢谢", "你好"]
    answer: "再见"
  - type: practice
    id: zh-u01-check-reply
    kind: dialogue_choice
    prompt: "A says 谢谢. Choose the natural reply."
    choices: ["不客气。", "你好。", "再见。"]
    answer: "不客气。"
    explanation: "不客气 is the standard beginner reply to 谢谢 in this exchange."
  - type: practice
    id: zh-u01-check-type
    kind: type_answer
    prompt: "Type the characters for “hello”."
    answer: "你好"
    hints:
      - "The first character is 你."
      - "The second is 好."
  - type: checkpoint
    items:
      - id: zh-u01-check-close
        kind: meaning_choice
        prompt: "Which chunk closes the exchange?"
        choices: ["再见", "谢谢", "你好"]
        answer: "再见"
      - id: zh-u01-check-thanks
        kind: dialogue_choice
        prompt: "Someone helps you and you want to thank them. What can you say?"
        choices: ["谢谢你。", "不客气。", "再见。"]
        answer: "谢谢你。"
exercise:
  type: type_answer
  prompt: "Type the characters for “goodbye”."
  answer: "再见"
---

Use the characters and the whole exchange together. Pinyin is support, not a replacement for recognition.
