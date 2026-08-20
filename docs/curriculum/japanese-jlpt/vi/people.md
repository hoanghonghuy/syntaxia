---
id: ja-n5-02-people
track: japanese-jlpt
locale: vi
slug: people
title: Nói tên và hỏi tên
order: 2
published: true
jlpt_level: n5
can_do: "Nói tên của mình với です và hỏi tên người khác một cách lịch sự"
pattern: "わたしは … です。 / お名前は何ですか。"
objectives:
  - Tự giới thiệu bằng わたしは … です
  - Hỏi お名前は何ですか
  - Nhận ra です tạo phong cách lịch sự, trung tính cho câu
vocab:
  - { surface: "わたし", reading: "わたし", gloss: "tôi" }
  - { surface: "名前", reading: "なまえ", gloss: "tên" }
  - { surface: "何", reading: "なん", gloss: "gì" }
  - { surface: "です", reading: "です", gloss: "đuôi câu lịch sự / hệ từ" }
  - { surface: "はじめまして", reading: "はじめまして", gloss: "lời chào khi gặp lần đầu" }
steps:
  - type: scene
    title: "Gặp bạn cùng lớp"
    body: "Đây là buổi học tiếng Nhật đầu tiên. Hãy tự giới thiệu rồi hỏi tên người ngồi cạnh."
  - type: dialogue
    lines:
      - { speaker: "A", text: "はじめまして。わたしはリンです。", reading: "はじめまして。わたしはリンです。" }
      - { speaker: "B", text: "はじめまして。わたしはゆきです。", reading: "はじめまして。わたしはゆきです。" }
      - { speaker: "A", text: "お名前は何ですか。", reading: "おなまえはなんですか。" }
      - { speaker: "B", text: "ゆきです。", reading: "ゆきです。" }
  - type: listen
    prompt: "Nghe trước. Sau tên người nói có đuôi câu nào?"
    text: "わたしはゆきです。"
    reading: "わたしはゆきです。"
  - type: tip
    title: "Giữ nguyên cả khung câu lịch sự"
    body: "Ở giai đoạn mở đầu, hãy học わたしは + tên + です như một khung tự giới thiệu ổn định. お名前は何ですか là cách lịch sự để hỏi tên người khác."
  - type: teach
    items:
      - { form: "わたしはリンです。", reading: "わたしはリンです。", gloss: "Tôi là Linh.", example: "わたしはリンです。" }
      - { form: "お名前は何ですか。", reading: "おなまえはなんですか。", gloss: "Bạn tên là gì?", example: "お名前は何ですか。" }
      - { form: "はじめまして。", reading: "はじめまして。", gloss: "Rất vui được gặp bạn / lời chào lần đầu.", example: "はじめまして。" }
  - type: practice
    id: ja-people-dialogue-1
    kind: dialogue_choice
    prompt: "Bạn gặp Yuki lần đầu. Câu tự giới thiệu nào tự nhiên ở trình độ này?"
    choices: ["はじめまして。わたしはリンです。", "これをください。", "いいえ、リン。"]
    answer: "はじめまして。わたしはリンです。"
  - type: practice
    id: ja-people-listen-1
    kind: listen_type
    prompt: "Nghe rồi nhập câu bạn vừa nghe."
    audioText: "ゆきです"
    answer: "ゆきです"
    acceptedAnswers: ["ゆきです。"]
  - type: practice
    id: ja-people-produce-1
    kind: type_answer
    prompt: "Tên bạn là リン. Hãy nhập câu “Tôi là Linh” theo khung của bài."
    answer: "わたしはリンです"
    acceptedAnswers: ["わたしはリンです。"]
    hints:
      - "Dùng わたしは + リン + です."
  - type: checkpoint
    items:
      - id: ja-people-check-1
        kind: meaning_choice
        prompt: "Câu nào dùng để hỏi tên người khác?"
        choices: ["お名前は何ですか。", "これをください。", "ありがとうございます。"]
        answer: "お名前は何ですか。"
      - id: ja-people-check-2
        kind: dialogue_choice
        prompt: "Ôn lại: bạn chỉ vào món đồ muốn mua. Có thể nói gì?"
        choices: ["これをください。", "わたしはこれです。", "お名前は？"]
        answer: "これをください。"
exercise:
  type: dialogue_choice
  prompt: "Chọn câu hỏi tên lịch sự."
  choices: ["お名前は何ですか。", "名前ください。", "何これですか。"]
  answer: "お名前は何ですか。"
---

Bài học giữ phần cách đọc kana sát với tiếng Nhật và dạy một khung câu lịch sự hoàn chỉnh, thay vì học riêng lẻ わたし hay 名前 như mục từ điển.
