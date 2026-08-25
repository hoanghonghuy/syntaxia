---
id: ja-n5-fnd-01-kana-sounds
track: japanese-jlpt
locale: vi
slug: kana-sounds
title: Nối kana với âm tiếng Nhật
order: -7
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: lesson
foundation_focus: pronunciation
can_do: "Nghe năm nguyên âm cơ bản tiếng Nhật và gõ các cách đọc ngắn chỉ dùng kana đã được giới thiệu"
pattern: "あ・い・う・え・お / ア・イ・ウ・エ・オ"
objectives:
  - Nối năm kana nguyên âm cơ bản với âm tương ứng
  - Nhận ra hiragana và katakana biểu diễn cùng các đơn vị âm tiếng Nhật bằng hình dạng khác nhau
  - Chỉ gõ cách đọc sau khi các kana dùng trong từ đã được giới thiệu
vocab:
  - { surface: "朝", reading: "あさ", gloss: "buổi sáng" }
  - { surface: "家", reading: "いえ", gloss: "nhà" }
  - { surface: "上", reading: "うえ", gloss: "phía trên / trên" }
  - { surface: "会う", reading: "あう", gloss: "gặp" }
  - { surface: "青", reading: "あお", gloss: "màu xanh / màu xanh của tín hiệu" }
steps:
  - type: scene
    title: "Âm trước, chưa vội học cả bảng kana"
    body: "Bắt đầu bằng năm nguyên âm, rồi chỉ tạo vài cách đọc từ những kana đã thật sự nhìn thấy. Bài tiếp theo mới mở rộng các hàng hiragana."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "あ。い。う。え。お。", reading: "あ。い。う。え。お。" }
      - { speaker: "学生", text: "あ。い。う。え。お。", reading: "あ。い。う。え。お。" }
      - { speaker: "先生", text: "あさ。", reading: "あさ。" }
      - { speaker: "学生", text: "あさ。", reading: "あさ。" }
  - type: listen
    prompt: "Nghe trước. Bạn nghe kana nguyên âm nào?"
    text: "う"
    reading: "う"
  - type: tip
    title: "Kana là ký hiệu âm"
    body: "Nối trực tiếp âm với kana. Hiragana あ và katakana ア biểu diễn cùng một nguyên âm. Romaji có thể hỗ trợ nhập liệu tạm thời, nhưng không phải hệ chữ đích cần học."
  - type: teach
    items:
      - { form: "あ い う え お", reading: "あ い う え お", gloss: "năm kana nguyên âm hiragana cơ bản", example: "いえ / うえ / あう / あお" }
      - { form: "ア イ ウ エ オ", reading: "あ い う え お", gloss: "các kana nguyên âm katakana tương ứng", example: "ア / イ / ウ / エ / オ" }
      - { form: "さ", reading: "さ", gloss: "một ví dụ phụ âm-nguyên âm; bài tiếp theo sẽ mở rộng các hàng", example: "あ + さ → あさ" }
  - type: practice
    id: ja-fnd-kana-hear-asa
    kind: audio_choice
    prompt: "Nghe và chọn cách đọc khớp."
    audioText: "あさ"
    choices: ["あさ", "いえ", "あお"]
    answer: "あさ"
  - type: practice
    id: ja-fnd-kana-hear-ie
    kind: listen_type
    prompt: "Nghe và gõ cách đọc chỉ gồm các kana nguyên âm."
    audioText: "いえ"
    answer: "いえ"
  - type: practice
    id: ja-fnd-kana-write-au
    kind: type_answer
    prompt: "Gõ cách đọc hiragana của 会う."
    answer: "あう"
    hints:
      - "Cả hai kana đều thuộc hàng nguyên âm."
  - type: checkpoint
    items:
      - id: ja-fnd-kana-check-vowels
        kind: meaning_choice
        prompt: "Hàng nào chứa năm kana nguyên âm hiragana cơ bản?"
        choices: ["あ い う え お", "か き く け こ", "ア カ サ タ ナ"]
        answer: "あ い う え お"
      - id: ja-fnd-kana-check-ao
        kind: type_answer
        prompt: "Gõ cách đọc hiragana của 青."
        answer: "あお"
exercise:
  type: type_answer
  prompt: "Gõ cách đọc hiragana của 上."
  answer: "うえ"
---

Bài đầu tiên này cố ý không giả định rằng biết năm nguyên âm là đã biết kana. Nó đặt nền móng âm-ký tự; hai bài hiragana và katakana sau đó mới mở rộng hệ chữ trước khi các bài sau yêu cầu sản xuất nhiều hơn.
