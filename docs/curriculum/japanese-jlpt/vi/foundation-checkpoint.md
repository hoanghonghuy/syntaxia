---
id: ja-n5-fnd-04-foundation-checkpoint
track: japanese-jlpt
locale: vi
slug: foundation-checkpoint
title: Kiểm tra nền tảng tiếng Nhật
order: -2
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: checkpoint
foundation_focus: checkpoint
can_do: "Kết hợp hiragana, katakana, nhịp âm và vai trò câu cơ bản mà không cần hướng dẫn từng bước"
pattern: "nghe -> kana -> nhịp âm -> trợ từ/dạng lịch sự -> tạo câu"
objectives:
  - Gợi lại hiragana và katakana từ âm nghe được
  - Giữ small っ và cách viết nguyên âm dài
  - Chọn và tạo mẫu câu với trợ từ cơ bản
  - Nhận ra cách phát âm của trợ từ chủ đề は
vocab:
  - { surface: "駅", reading: "えき", gloss: "nhà ga" }
  - { surface: "カメラ", reading: "カメラ", gloss: "máy ảnh" }
  - { surface: "切符", reading: "きっぷ", gloss: "vé" }
  - { surface: "学校", reading: "がっこう", gloss: "trường học" }
  - { surface: "学生", reading: "がくせい", gloss: "học sinh / sinh viên" }
  - { surface: "水", reading: "みず", gloss: "nước" }
steps:
  - type: scene
    title: "Dùng nền tảng mà không nhìn bảng"
    body: "Checkpoint này trộn cả hai hệ kana, nhịp âm và xây câu trước khi vào Unit 1."
  - type: dialogue
    lines:
      - { speaker: "A", text: "学校に行きます。", reading: "がっこうに いきます。" }
      - { speaker: "B", text: "学校で水を飲みます。", reading: "がっこうで みずを のみます。" }
  - type: listen
    prompt: "Nghe và giữ small っ trong từ vừa nghe."
    text: "きっぷ"
    reading: "きっぷ"
  - type: practice
    id: ja-fnd-check-hear-ticket
    kind: listen_type
    prompt: "Nghe rồi gõ từ hiragana."
    audioText: "きっぷ"
    answer: "きっぷ"
  - type: practice
    id: ja-fnd-check-read-station
    kind: type_answer
    prompt: "Gõ cách đọc của 駅."
    answer: "えき"
  - type: practice
    id: ja-fnd-check-katakana-camera
    kind: listen_type
    prompt: "Nghe và gõ từ bằng katakana."
    audioText: "カメラ"
    answer: "カメラ"
  - type: practice
    id: ja-fnd-check-build-school
    kind: order_words
    prompt: "Ghép câu: Đi đến trường."
    tokens: ["学校に", "行きます"]
    answer: "学校に行きます"
    acceptedAnswers: ["学校に行きます。"]
  - type: checkpoint
    items:
      - id: ja-fnd-check-particle-object
        kind: meaning_choice
        prompt: "Chọn trợ từ tân ngữ còn thiếu: 水＿飲みます。"
        choices: ["を", "に", "で"]
        answer: "を"
      - id: ja-fnd-check-topic-sound
        kind: meaning_choice
        prompt: "Trong 私は学生です, trợ từ chủ đề は được phát âm thế nào?"
        choices: ["わ", "は", "が"]
        answer: "わ"
      - id: ja-fnd-check-write-school
        kind: type_answer
        prompt: "Gõ cách đọc của 学校."
        answer: "がっこう"
exercise:
  type: type_answer
  prompt: "Gõ: Tôi là học sinh/sinh viên."
  answer: "私は学生です"
  acceptedAnswers: ["私は学生です。"]
---

Hãy vượt qua checkpoint bằng cách tự gợi lại dạng từ và mẫu câu, không dựa vào việc đọc lại bảng kana hay bảng trợ từ. Cả hiragana lẫn katakana giờ đều tham gia checkpoint nền tảng trước Unit 1.
