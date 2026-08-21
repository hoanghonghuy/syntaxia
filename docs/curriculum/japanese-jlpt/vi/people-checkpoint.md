---
id: ja-n5-u02-checkpoint
track: japanese-jlpt
locale: vi
slug: people-checkpoint
title: "Checkpoint: tự giới thiệu và nói về người thân"
order: 7
published: true
jlpt_level: n5
unit_id: ja-n5-people-02
unit_title: "Tự giới thiệu và nói về người thân"
unit_order: 2
unit_can_do: "Tự giới thiệu, hỏi tên và xác định một người thân trong đoạn trao đổi lịch sự ngắn"
unit_role: checkpoint
can_do: "Tự giới thiệu và xác định một người thân với ít hỗ trợ"
pattern: "わたしは…です。 / お名前は何ですか。 / この人はだれですか。 / 母です。"
objectives:
  - "Tự tạo một câu giới thiệu ngắn"
  - "Hỏi tên và xác định một người thân"
steps:
  - type: scene
    title: "Gặp nhau và xem ảnh"
    body: "Bạn gặp một bạn cùng lớp, hỏi tên nhau rồi giới thiệu một người trong ảnh gia đình."
  - type: dialogue
    lines:
      - { speaker: "A", text: "はじめまして。わたしはリンです。", reading: "はじめまして。わたしはリンです。" }
      - { speaker: "B", text: "お名前は何ですか。", reading: "おなまえはなんですか。" }
      - { speaker: "A", text: "リンです。この人は母です。", reading: "リンです。このひとはははです。" }
  - type: listen
    prompt: "Nghe trước. Người thân nào được nhắc tới?"
    text: "母です。"
    reading: "ははです。"
  - type: practice
    id: ja-people-u02-check-listen
    kind: audio_choice
    prompt: "Nghe. Bạn nghe người thân nào?"
    audioText: "兄です"
    choices: ["兄", "姉", "父"]
    answer: "兄"
  - type: practice
    id: ja-people-u02-check-name
    kind: dialogue_choice
    prompt: "Câu nào dùng để hỏi tên một cách lịch sự?"
    choices: ["お名前は何ですか。", "何番ですか。", "どこですか。"]
    answer: "お名前は何ですか。"
  - type: practice
    id: ja-people-u02-check-produce
    kind: type_answer
    prompt: "Tên bạn là リン. Hãy nhập một câu tự giới thiệu ngắn."
    answer: "わたしはリンです"
    acceptedAnswers: ["わたしはリンです。"]
    hints:
      - "Dùng わたしは + リン + です."
  - type: checkpoint
    items:
      - id: ja-people-u02-check-who
        kind: type_answer
        prompt: "Gõ câu hỏi: “Người này là ai?”"
        answer: "この人はだれですか"
        acceptedAnswers: ["この人はだれですか。"]
      - id: ja-people-u02-check-mother
        kind: listen_type
        prompt: "Nghe và gõ câu trả lời ngắn."
        audioText: "母です"
        answer: "母です"
        acceptedAnswers: ["母です。", "ははです", "ははです。"]
exercise:
  type: type_answer
  prompt: "Người trong ảnh là anh trai của bạn. Hãy nhập câu trả lời ngắn."
  answer: "兄です"
  acceptedAnswers: ["兄です。", "あにです", "あにです。"]
---

Checkpoint nối hai kỹ năng vào một đoạn giao tiếp xã hội, thay vì kiểm tra tên và từ gia đình riêng lẻ.
