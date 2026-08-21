---
id: zh-hsk-b1-u01-review
track: chinese-hsk
locale: vi
slug: greetings-review
title: "Ôn tập: chào hỏi"
order: 3
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-greeting-01
unit_title: "Chào hỏi và kết thúc một lượt giao tiếp"
unit_order: 1
unit_can_do: "Chào một người, cảm ơn và kết thúc một lượt giao tiếp ngắn một cách tự nhiên"
unit_role: review
can_do: "Nhớ lại lượt chào hỏi từ chữ Hán và âm thanh"
pattern: "你好 / 谢谢 / 不客气 / 再见"
objectives:
  - Nhớ lại các cụm chào hỏi chính
  - Nối lại âm thanh, pinyin và chữ Hán
steps:
  - type: scene
    title: "Nhớ lại lượt giao tiếp"
    body: "Bạn gặp lại cùng một bạn học. Hãy nhớ lại các cụm chào hỏi mà không đọc lại bài trước."
    visualKey: "classmates-meeting"
    imageAlt: "Hai bạn học quay sang nhau trong lớp và chuẩn bị trò chuyện lại."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "B", text: "你好！", reading: "nǐ hǎo" }
      - { speaker: "A", text: "谢谢！", reading: "xiè xie" }
      - { speaker: "B", text: "不客气。", reading: "bú kè qi" }
  - type: listen
    prompt: "Nghe trước khi nhìn chữ. Bạn nghe lời chào nào?"
    text: "你好！"
    reading: "nǐ hǎo"
  - type: practice
    id: zh-u01-review-audio
    kind: audio_choice
    prompt: "Nghe và chọn cụm bạn nghe được."
    audioText: "谢谢"
    choices: ["谢谢", "你好", "再见"]
    answer: "谢谢"
  - type: practice
    id: zh-u01-review-reply
    kind: dialogue_choice
    prompt: "A nói 谢谢. B nên đáp lại thế nào?"
    choices: ["不客气。", "你好。", "谢谢。"]
    answer: "不客气。"
  - type: practice
    id: zh-u01-review-type
    kind: type_answer
    prompt: "Gõ chữ Hán của “tạm biệt”."
    answer: "再见"
    hints:
      - "Nhớ lại cụm kết thúc gồm hai chữ."
  - type: checkpoint
    items:
      - id: zh-u01-review-open
        kind: meaning_choice
        prompt: "Cụm nào mở đầu lời chào?"
        choices: ["你好", "再见", "不客气"]
        answer: "你好"
      - id: zh-u01-review-thanks
        kind: dialogue_choice
        prompt: "Cặp nào là một lượt cảm ơn tự nhiên?"
        choices: ["谢谢 → 不客气", "你好 → 再见", "再见 → 谢谢"]
        answer: "谢谢 → 不客气"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu đáp tự nhiên cho 谢谢."
  choices: ["不客气", "你好", "再见"]
  answer: "不客气"
---

Ôn bằng truy hồi: nghe, nhận ra, rồi tự tạo lại chữ Hán.
