---
id: ja-n5-fnd-03-core-sentences
track: japanese-jlpt
locale: vi
slug: core-sentences
title: Xây câu tiếng Nhật cơ bản
order: -3
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: lesson
foundation_focus: grammar
can_do: "Tạo một câu lịch sự ngắn với trợ từ phù hợp và です hoặc ます"
pattern: "A は B です。 / N を Vます。 / Place に 行きます。 / Place で Vます。"
objectives:
  - Dùng は để đánh dấu chủ đề trong câu nhận định cơ bản
  - Dùng を với tân ngữ trực tiếp và に với đích đến
  - Dùng で cho nơi diễn ra hành động
vocab:
  - { surface: "私", reading: "わたし", gloss: "tôi" }
  - { surface: "学生", reading: "がくせい", gloss: "học sinh / sinh viên" }
  - { surface: "水", reading: "みず", gloss: "nước" }
  - { surface: "学校", reading: "がっこう", gloss: "trường học" }
  - { surface: "行く", reading: "いく", gloss: "đi" }
  - { surface: "飲む", reading: "のむ", gloss: "uống" }
steps:
  - type: scene
    title: "Xây câu từ vai trò của từng phần"
    body: "Trước khi vào hội thoại dài hơn, bạn cần vài khung câu tái sử dụng được. Hãy chú ý quan hệ mà mỗi trợ từ biểu thị."
  - type: dialogue
    lines:
      - { speaker: "A", text: "私は学生です。", reading: "わたしは がくせいです。" }
      - { speaker: "B", text: "私は学校に行きます。", reading: "わたしは がっこうに いきます。" }
      - { speaker: "A", text: "学校で水を飲みます。", reading: "がっこうで みずを のみます。" }
  - type: listen
    prompt: "Nghe. Trợ từ nào đứng trước 学校 để đánh dấu đích đến?"
    text: "学校に行きます。"
    reading: "がっこうに いきます。"
  - type: tip
    title: "Trợ từ biểu thị quan hệ"
    body: "Học trợ từ ngay trong câu ngắn: は đánh dấu chủ đề, を đánh dấu tân ngữ trực tiếp, に chỉ đích đến và で chỉ nơi diễn ra hành động."
  - type: teach
    items:
      - { form: "私は学生です。", reading: "わたしは がくせいです。", gloss: "Tôi là học sinh/sinh viên.", example: "私は学生です。" }
      - { form: "水を飲みます。", reading: "みずを のみます。", gloss: "Uống nước.", example: "水を飲みます。" }
      - { form: "学校に行きます。", reading: "がっこうに いきます。", gloss: "Đi đến trường.", example: "学校に行きます。" }
  - type: practice
    id: ja-fnd-grammar-topic
    kind: order_words
    prompt: "Ghép câu: Tôi là học sinh/sinh viên."
    tokens: ["私は", "学生です"]
    answer: "私は学生です"
    acceptedAnswers: ["私は学生です。"]
  - type: practice
    id: ja-fnd-grammar-object
    kind: dialogue_choice
    prompt: "Câu nào nói đúng việc uống nước?"
    choices: ["水を飲みます。", "水に飲みます。", "水は行きます。"]
    answer: "水を飲みます。"
  - type: practice
    id: ja-fnd-grammar-destination
    kind: type_answer
    prompt: "Gõ: Đi đến trường."
    answer: "学校に行きます"
    acceptedAnswers: ["学校に行きます。"]
    hints:
      - "Dùng に trước 行きます."
  - type: checkpoint
    items:
      - id: ja-fnd-grammar-check-de
        kind: meaning_choice
        prompt: "Trợ từ nào chỉ nơi diễn ra hành động trong 学校＿勉強します?"
        choices: ["で", "を", "は"]
        answer: "で"
      - id: ja-fnd-grammar-check-topic
        kind: type_answer
        prompt: "Gõ: Tôi là học sinh/sinh viên."
        answer: "私は学生です"
        acceptedAnswers: ["私は学生です。"]
exercise:
  type: type_answer
  prompt: "Gõ: Đi đến trường."
  answer: "学校に行きます"
  acceptedAnswers: ["学校に行きます。"]
---

Đây là các khung câu khởi đầu để tạo câu, không phải bảng trợ từ đầy đủ. Các unit sau sẽ tái sử dụng chúng trong tình huống thật.
