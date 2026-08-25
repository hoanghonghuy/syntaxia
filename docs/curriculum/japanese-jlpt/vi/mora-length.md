---
id: ja-n5-fnd-02-mora-length
track: japanese-jlpt
locale: vi
slug: mora-length
title: Nghe âm kéo dài và small っ
order: -4
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: lesson
foundation_focus: pronunciation
can_do: "Nghe và gõ từ cơ bản khi độ dài nguyên âm hoặc phụ âm có ý nghĩa"
pattern: "âm dài = thêm nhịp / small っ = chặn ngắn trước phụ âm sau"
objectives:
  - Nhận ra độ dài âm là một phần của dạng từ tiếng Nhật
  - Nghe một nguyên âm kéo dài trong từ quen thuộc
  - Đọc và gõ từ có small っ
vocab:
  - { surface: "お母さん", reading: "おかあさん", gloss: "mẹ" }
  - { surface: "時計", reading: "とけい", gloss: "đồng hồ" }
  - { surface: "切符", reading: "きっぷ", gloss: "vé" }
  - { surface: "雑誌", reading: "ざっし", gloss: "tạp chí" }
  - { surface: "学校", reading: "がっこう", gloss: "trường học" }
steps:
  - type: scene
    title: "Giữ đúng nhịp được viết"
    body: "Bạn đang đọc các từ cơ bản. Hãy nghe độ dài thay vì đọc mọi kana với cùng một nhịp ngắn."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "きっぷ。", reading: "きっぷ。" }
      - { speaker: "学生", text: "きっぷ。", reading: "きっぷ。" }
      - { speaker: "先生", text: "がっこう。", reading: "がっこう。" }
      - { speaker: "学生", text: "がっこう。", reading: "がっこう。" }
  - type: listen
    prompt: "Nghe khoảng chặn ngắn trước âm ぷ."
    text: "きっぷ"
    reading: "きっぷ"
  - type: tip
    title: "Độ dài là một phần của từ"
    body: "Nguyên âm dài cần thêm thời lượng. Small っ tạo một khoảng chặn ngắn trước phụ âm tiếp theo. Không đọc きっぷ thành きぷ."
  - type: teach
    items:
      - { form: "おかあさん", reading: "おかあさん", gloss: "phần かあ có thời lượng nguyên âm dài", example: "お母さん" }
      - { form: "きっぷ", reading: "きっぷ", gloss: "small っ tạo nhịp chặn ngắn", example: "切符" }
      - { form: "がっこう", reading: "がっこう", gloss: "có small っ và cách viết âm dài", example: "学校" }
  - type: practice
    id: ja-fnd-mora-hear-ticket
    kind: audio_choice
    prompt: "Nghe và chọn dạng viết đúng."
    audioText: "きっぷ"
    choices: ["きっぷ", "きぷ", "きゅぷ"]
    answer: "きっぷ"
  - type: practice
    id: ja-fnd-mora-type-ticket
    kind: listen_type
    prompt: "Nghe rồi gõ cách đọc hiragana của 切符."
    audioText: "きっぷ"
    answer: "きっぷ"
  - type: practice
    id: ja-fnd-mora-type-school
    kind: type_answer
    prompt: "Gõ cách đọc hiragana của 学校."
    answer: "がっこう"
    hints:
      - "Giữ cả small っ và う ở cuối."
  - type: checkpoint
    items:
      - id: ja-fnd-mora-check-small-tsu
        kind: meaning_choice
        prompt: "Dạng nào viết đúng きっぷ?"
        choices: ["きっぷ", "きぷ", "きつぷ"]
        answer: "きっぷ"
      - id: ja-fnd-mora-check-mother
        kind: type_answer
        prompt: "Gõ cách đọc của お母さん."
        answer: "おかあさん"
exercise:
  type: type_answer
  prompt: "Gõ cách đọc của 学校."
  answer: "がっこう"
---

Mục tiêu không phải học ngữ âm học hàn lâm, mà là giữ độ dài đủ chính xác để nghe, đọc và tạo các từ cơ bản.
