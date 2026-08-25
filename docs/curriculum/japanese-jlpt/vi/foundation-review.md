---
id: ja-n5-fnd-05-foundation-review
track: japanese-jlpt
locale: vi
slug: foundation-review
title: Ôn truy hồi nền tảng tiếng Nhật
order: -1
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: review
foundation_focus: review
can_do: "Gợi lại kana, độ dài âm và mẫu câu cốt lõi sau một khoảng trễ"
pattern: "nghe -> đọc/gõ -> xây câu -> gợi lại sau"
objectives:
  - Gợi lại cách đọc kana từ âm
  - Giữ small っ hoặc cách viết âm dài
  - Xây lại một câu lịch sự cơ bản
vocab:
  - { surface: "朝", reading: "あさ", gloss: "buổi sáng" }
  - { surface: "切符", reading: "きっぷ", gloss: "vé" }
  - { surface: "学校", reading: "がっこう", gloss: "trường học" }
  - { surface: "学生", reading: "がくせい", gloss: "học sinh / sinh viên" }
  - { surface: "水", reading: "みず", gloss: "nước" }
steps:
  - type: scene
    title: "Gợi lại trước Unit 1"
    body: "Tự gợi lại nền tảng để các hội thoại sau không phụ thuộc liên tục vào phần hỗ trợ."
  - type: dialogue
    lines:
      - { speaker: "A", text: "私は学生です。", reading: "わたしは がくせいです。" }
      - { speaker: "B", text: "学校に行きます。", reading: "がっこうに いきます。" }
  - type: listen
    prompt: "Nghe rồi gõ điều bạn nghe thấy mà không nhìn lại bài trước."
    text: "がっこう"
    reading: "がっこう"
  - type: practice
    id: ja-fnd-review-hear-school
    kind: listen_type
    prompt: "Nghe rồi gõ từ."
    audioText: "がっこう"
    answer: "がっこう"
  - type: practice
    id: ja-fnd-review-read-ticket
    kind: type_answer
    prompt: "Gõ cách đọc của 切符."
    answer: "きっぷ"
  - type: practice
    id: ja-fnd-review-build-student
    kind: order_words
    prompt: "Ghép câu: Tôi là học sinh/sinh viên."
    tokens: ["私は", "学生です"]
    answer: "私は学生です"
    acceptedAnswers: ["私は学生です。"]
  - type: checkpoint
    items:
      - id: ja-fnd-review-particle-ni
        kind: meaning_choice
        prompt: "Chọn trợ từ chỉ đích đến: 学校＿行きます。"
        choices: ["に", "を", "で"]
        answer: "に"
      - id: ja-fnd-review-kana-morning
        kind: type_answer
        prompt: "Gõ cách đọc của 朝."
        answer: "あさ"
exercise:
  type: type_answer
  prompt: "Gõ cách đọc của 学校."
  answer: "がっこう"
---

Các item ổn định này đi vào cùng hệ thống FSRS như các unit N5 phía sau.
