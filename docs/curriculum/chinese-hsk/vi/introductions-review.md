---
id: zh-hsk-b1-u02-review
track: chinese-hsk
locale: vi
slug: introductions-review
title: "Ôn tập: giới thiệu"
order: 16
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-people-02
unit_title: "Giới thiệu bản thân và người gần gũi"
unit_order: 2
unit_can_do: "Trao đổi tên và giới thiệu bạn bè hoặc người thân"
unit_role: review
can_do: "Nhớ lại cách hỏi tên và giới thiệu người thân mà không cần mẫu"
pattern: "你叫什么名字？ / 我叫… / 这是我…"
objectives:
  - "Nhớ lại câu hỏi và câu trả lời về tên"
  - "Nhận ra lời giới thiệu người thân khi nghe"
  - "Tự viết một câu giới thiệu bằng chữ Hán"
steps:
  - type: scene
    title: "Giới thiệu lại"
    body: "Bạn gặp lại những người bạn học. Hãy tự nhớ câu hỏi tên và cách giới thiệu người thân mà không xem lại ví dụ cũ."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你叫什么名字？", reading: "nǐ jiào shén me míng zi" }
      - { speaker: "B", text: "我叫安娜。", reading: "wǒ jiào ān nà" }
      - { speaker: "A", text: "这是谁？", reading: "zhè shì shéi" }
      - { speaker: "B", text: "这是我哥哥。", reading: "zhè shì wǒ gē ge" }
  - type: listen
    prompt: "Nghe trước. Người thân nào được nhắc tới?"
    text: "这是我姐姐。"
    reading: "zhè shì wǒ jiě jie"
  - type: practice
    id: zh-u02-review-listen
    kind: audio_choice
    prompt: "Nghe rồi chọn người thân đúng."
    audioText: "这是我妈妈。"
    choices: ["妈妈", "爸爸", "哥哥"]
    answer: "妈妈"
  - type: practice
    id: zh-u02-review-reply
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你叫什么名字？ Câu nào tự nhiên?"
    choices: ["我叫安娜。", "这是我爸爸。", "不客气。"]
    answer: "我叫安娜。"
  - type: practice
    id: zh-u02-review-produce
    kind: type_answer
    prompt: "Gõ câu: “Đây là mẹ tôi.”"
    answer: "这是我妈妈"
    acceptedAnswers: ["这是我妈妈。"]
    hints:
      - "Dùng 这是我 + 妈妈."
  - type: checkpoint
    items:
      - id: zh-u02-review-name
        kind: dialogue_choice
        prompt: "Câu nào dùng để hỏi tên?"
        choices: ["你叫什么名字？", "这是谁？", "几点了？"]
        answer: "你叫什么名字？"
      - id: zh-u02-review-pronoun
        kind: audio_choice
        prompt: "Nghe. Chữ nào khớp với đại từ trong câu?"
        audioText: "他叫小明。"
        choices: ["他", "她", "我"]
        answer: "他"
exercise:
  type: type_answer
  prompt: "Bạn tên 小红. Gõ câu đầy đủ."
  answer: "我叫小红"
  acceptedAnswers: ["我叫小红。"]
---

Ôn bằng cách tự nhớ chữ Hán và mẫu câu thay vì đọc lại phần giải thích.
