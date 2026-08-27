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
can_do: "Gợi lại hiragana, katakana, nhịp âm và mẫu câu cốt lõi sau một khoảng trễ"
pattern: "nghe -> đọc/gõ cả hai hệ kana -> xây câu -> gợi lại sau"
objectives:
  - Gợi lại dạng hiragana hoặc katakana từ âm
  - Giữ small っ hoặc cách viết nguyên âm dài
  - Xây lại một câu lịch sự cơ bản
  - Nhớ lại một tương phản phát âm trợ từ quan trọng
vocab:
  - { surface: "朝", reading: "あさ", gloss: "buổi sáng" }
  - { surface: "カメラ", reading: "カメラ", gloss: "máy ảnh" }
  - { surface: "切符", reading: "きっぷ", gloss: "vé" }
  - { surface: "学校", reading: "がっこう", gloss: "trường học" }
  - { surface: "学生", reading: "がくせい", gloss: "học sinh / sinh viên" }
  - { surface: "水", reading: "みず", gloss: "nước" }
steps:
  - type: scene
    title: "Gợi lại trước Unit 1"
    body: "Tự gợi lại cả hai hệ chữ, nhịp âm và nền tảng câu để các hội thoại sau không phụ thuộc liên tục vào phần hỗ trợ."
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
    prompt: "Nghe rồi gõ cách đọc hiragana."
    audioText: "がっこう"
    answer: "がっこう"
  - type: practice
    id: ja-fnd-review-katakana-camera
    kind: listen_type
    prompt: "Nghe và gõ từ bằng katakana."
    audioText: "カメラ"
    answer: "カメラ"
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
      - id: ja-fnd-review-topic-sound
        kind: meaning_choice
        prompt: "Trợ từ chủ đề は trong 私は学生です được phát âm thế nào?"
        choices: ["わ", "は", "が"]
        answer: "わ"
      - id: ja-fnd-review-kana-morning
        kind: type_answer
        prompt: "Gõ cách đọc của 朝."
        answer: "あさ"
exercise:
  type: type_answer
  prompt: "Gõ cách đọc của 学校."
  answer: "がっこう"
---

Các item ổn định này đi vào cùng hệ thống FSRS như các unit N5 phía sau, bao gồm cả hai hệ kana thay vì coi phần chữ viết là một đoạn giới thiệu dùng xong rồi bỏ.
