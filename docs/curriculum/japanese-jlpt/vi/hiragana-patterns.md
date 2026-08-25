---
id: ja-n5-fnd-01b-hiragana-patterns
track: japanese-jlpt
locale: vi
slug: hiragana-patterns
title: Đọc hiragana theo quy luật âm
order: -6
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: lesson
foundation_focus: reading
can_do: "Dùng quy luật hàng âm hiragana để đọc và gõ một nhóm từ sơ cấp thông dụng"
pattern: "hàng phụ âm + nguyên âm / ん / dakuten / ゃ・ゅ・ょ nhỏ"
objectives:
  - Dùng quy luật phụ âm + nguyên âm thay vì học từng ký tự như những hình rời rạc
  - Nhận ra dakuten làm thay đổi nhóm phụ âm, ví dụ き → ぎ
  - Đọc và gõ từ thông dụng có ん hoặc tổ hợp ゃ・ゅ・ょ nhỏ
vocab:
  - { surface: "いす", reading: "いす", gloss: "ghế" }
  - { surface: "かぎ", reading: "かぎ", gloss: "chìa khóa" }
  - { surface: "ここ", reading: "ここ", gloss: "ở đây" }
  - { surface: "そこ", reading: "そこ", gloss: "ở đó" }
  - { surface: "ください", reading: "ください", gloss: "xin / vui lòng cho" }
  - { surface: "しょうゆ", reading: "しょうゆ", gloss: "nước tương" }
steps:
  - type: scene
    title: "Nhìn ra hệ thống, không học 46 hình rời rạc"
    body: "Hiragana được tổ chức quanh các nguyên âm lặp lại. Hãy dùng quy luật hàng âm để giải mã vài từ hữu ích; các bài sau và FSRS sẽ tiếp tục mở rộng tập ký tự."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "かぎ。", reading: "かぎ。" }
      - { speaker: "学生", text: "かぎ。", reading: "かぎ。" }
      - { speaker: "先生", text: "ここ。", reading: "ここ。" }
      - { speaker: "学生", text: "ここ。", reading: "ここ。" }
  - type: listen
    prompt: "Nghe. Từ hiragana nào khớp với âm vừa nghe?"
    text: "かぎ"
    reading: "かぎ"
  - type: tip
    title: "Các hàng dùng lại cùng năm nguyên âm"
    body: "Ví dụ, か・き・く・け・こ kết hợp âm kiểu k với năm vị trí nguyên âm. Các hàng khác dùng cùng nguyên tắc. Dấu có thể đổi phụ âm: き thành ぎ. ゃ・ゅ・ょ nhỏ ghép với kana đứng trước, như しょ."
  - type: teach
    items:
      - { form: "か き く け こ / さ し す せ そ", reading: "か き く け こ / さ し す せ そ", gloss: "hai hàng phụ âm-nguyên âm thông dụng", example: "かぎ / そこ" }
      - { form: "た ち つ て と / な に ぬ ね の", reading: "た ち つ て と / な に ぬ ね の", gloss: "thêm các hàng âm cơ bản", example: "ください" }
      - { form: "は ひ ふ へ ほ / ま み む め も / や ゆ よ / ら り る れ ろ / わ を ん", reading: "は ひ ふ へ ほ / ま み む め も / や ゆ よ / ら り る れ ろ / わ を ん", gloss: "các hàng cơ bản còn lại và ん", example: "ほん" }
      - { form: "き → ぎ / しょ", reading: "き → ぎ / しょ", gloss: "dakuten đổi phụ âm; ょ nhỏ ghép với kana trước", example: "かぎ / しょうゆ" }
  - type: practice
    id: ja-fnd-hira-hear-kagi
    kind: audio_choice
    prompt: "Nghe và chọn từ hiragana khớp."
    audioText: "かぎ"
    choices: ["かぎ", "いす", "ここ"]
    answer: "かぎ"
  - type: practice
    id: ja-fnd-hira-type-koko
    kind: listen_type
    prompt: "Nghe và gõ từ bằng hiragana."
    audioText: "ここ"
    answer: "ここ"
  - type: practice
    id: ja-fnd-hira-produce-kudasai
    kind: type_answer
    prompt: "Gõ cụm hiragana ください."
    answer: "ください"
    hints:
      - "Bắt đầu bằng く."
      - "Hai kana cuối là さい."
  - type: checkpoint
    items:
      - id: ja-fnd-hira-check-row
        kind: meaning_choice
        prompt: "Đâu là hàng k trong hiragana?"
        choices: ["か き く け こ", "さ し す せ そ", "ア イ ウ エ オ"]
        answer: "か き く け こ"
      - id: ja-fnd-hira-check-shoyu
        kind: listen_type
        prompt: "Nghe và gõ từ có ょ nhỏ."
        audioText: "しょうゆ"
        answer: "しょうゆ"
exercise:
  type: listen_type
  prompt: "Nghe và gõ từ hiragana."
  audioText: "そこ"
  answer: "そこ"
---

Đây là nền tảng giải mã chữ, không phải bài kiểm tra bắt học thuộc toàn bộ bảng kana trong một trang. Từ vựng ở các bài sau sẽ tiếp tục củng cố các hàng âm bằng đọc, gõ và ôn cách quãng.
