---
id: ja-n5-fnd-02-mora-length
track: japanese-jlpt
locale: vi
slug: mora-length
title: Nghe nguyên âm dài và small っ
order: -4
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: lesson
foundation_focus: pronunciation
can_do: "Nghe và gõ từ cơ bản khi độ dài nguyên âm hoặc phụ âm có ý nghĩa trong hiragana hay katakana"
pattern: "hiragana: kana bổ sung tạo thời lượng nguyên âm dài / katakana: ー kéo dài nguyên âm / small っ: chặn ngắn trước phụ âm"
objectives:
  - Nhận ra độ dài âm là một phần của dạng từ tiếng Nhật
  - Đọc cách viết nguyên âm dài trong hiragana và dấu kéo dài ー trong katakana
  - Nghe và gõ từ có small っ
vocab:
  - { surface: "お母さん", reading: "おかあさん", gloss: "mẹ" }
  - { surface: "切符", reading: "きっぷ", gloss: "vé" }
  - { surface: "雑誌", reading: "ざっし", gloss: "tạp chí" }
  - { surface: "学校", reading: "がっこう", gloss: "trường học" }
  - { surface: "コーヒー", reading: "コーヒー", gloss: "cà phê" }
  - { surface: "スポーツ", reading: "スポーツ", gloss: "thể thao" }
steps:
  - type: scene
    title: "Giữ đúng thời lượng được viết"
    body: "Bạn đã biết các quy luật hiragana và katakana cơ bản. Bây giờ hãy nghe thời lượng âm có thể làm thay đổi cách viết và cách nhận ra từ."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "きっぷ。", reading: "きっぷ。" }
      - { speaker: "学生", text: "きっぷ。", reading: "きっぷ。" }
      - { speaker: "先生", text: "コーヒー。", reading: "こーひー。" }
      - { speaker: "学生", text: "コーヒー。", reading: "こーひー。" }
  - type: listen
    prompt: "Nghe khoảng chặn ngắn trước âm ぷ."
    text: "きっぷ"
    reading: "きっぷ"
  - type: tip
    title: "Độ dài là một phần của từ"
    body: "Hiragana có thể viết nguyên âm dài bằng một kana nguyên âm bổ sung, như おかあさん hoặc がっこう. Katakana thường dùng ー để biểu thị thêm thời lượng nguyên âm, như コーヒー. Small っ tạo một khoảng chặn ngắn trước phụ âm tiếp theo; đừng rút きっぷ thành きぷ."
  - type: teach
    items:
      - { form: "おかあさん", reading: "おかあさん", gloss: "あ sau か góp thêm thời lượng nguyên âm", example: "お母さん" }
      - { form: "きっぷ", reading: "きっぷ", gloss: "small っ đánh dấu khoảng chặn phụ âm ngắn", example: "切符" }
      - { form: "がっこう", reading: "がっこう", gloss: "small っ cùng cách viết nguyên âm dài bằng う", example: "学校" }
      - { form: "コーヒー / スポーツ", reading: "こーひー / すぽーつ", gloss: "ー trong katakana kéo dài thời lượng nguyên âm trước", example: "コーヒー" }
  - type: practice
    id: ja-fnd-mora-hear-ticket
    kind: audio_choice
    prompt: "Nghe và chọn dạng viết vừa nghe."
    audioText: "きっぷ"
    choices: ["きっぷ", "きぷ", "きつぷ"]
    answer: "きっぷ"
    explanation: "Small っ biểu thị khoảng chặn ngắn trước ぷ; つ cỡ đầy đủ sẽ là một chuỗi âm khác."
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
      - id: ja-fnd-mora-check-coffee
        kind: listen_type
        prompt: "Nghe và gõ từ katakana, giữ đủ cả hai dấu kéo dài."
        audioText: "コーヒー"
        answer: "コーヒー"
exercise:
  type: type_answer
  prompt: "Gõ cách đọc của 学校."
  answer: "がっこう"
---

Mục tiêu không phải ngữ âm học hàn lâm, mà là giữ thời lượng đủ chính xác để nghe, đọc và tạo các từ cơ bản trong cả hai hệ kana.
