---
id: ja-n5-fnd-01-kana-sounds
track: japanese-jlpt
locale: vi
slug: kana-sounds
title: Nối kana với âm tiếng Nhật
order: -5
published: true
jlpt_level: n5
unit_id: ja-n5-foundation-00
unit_title: "Nền tảng tiếng Nhật"
unit_order: 0
unit_can_do: "Đọc, nghe và tạo các dạng tiếng Nhật cơ bản trước các unit giao tiếp"
unit_role: lesson
foundation_focus: pronunciation
can_do: "Nghe một từ tiếng Nhật đơn giản và gõ cách đọc hiragana của từ đó"
pattern: "あ・い・う・え・お / ア・イ・ウ・エ・オ"
objectives:
  - Nối năm kana nguyên âm cơ bản với âm tương ứng
  - Nhận ra hiragana và katakana biểu diễn các đơn vị âm tiếng Nhật
  - Nghe rồi gõ một từ quen thuộc bằng hiragana
vocab:
  - { surface: "朝", reading: "あさ", gloss: "buổi sáng" }
  - { surface: "家", reading: "いえ", gloss: "nhà" }
  - { surface: "上", reading: "うえ", gloss: "phía trên / trên" }
  - { surface: "駅", reading: "えき", gloss: "nhà ga" }
  - { surface: "お茶", reading: "おちゃ", gloss: "trà" }
steps:
  - type: scene
    title: "Đọc âm, không học thuộc nhãn romaji"
    body: "Bạn nghe các từ tiếng Nhật ngắn rồi nối âm với kana. Romaji không phải hệ chữ đích cần học."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "あさ。", reading: "あさ。" }
      - { speaker: "学生", text: "あさ。", reading: "あさ。" }
      - { speaker: "先生", text: "えき。", reading: "えき。" }
      - { speaker: "学生", text: "えき。", reading: "えき。" }
  - type: listen
    prompt: "Nghe trước khi đọc. Bạn nghe từ hiragana nào?"
    text: "あさ"
    reading: "あさ"
  - type: tip
    title: "Kana biểu diễn các đơn vị âm"
    body: "Hãy nối trực tiếp âm nghe được với kana. Chỉ dùng romaji như hỗ trợ nhập liệu tạm thời khi thật sự cần."
  - type: teach
    items:
      - { form: "あ い う え お", reading: "あ い う え お", gloss: "hàng nguyên âm hiragana cơ bản", example: "あさ / いえ / うえ / えき / おちゃ" }
      - { form: "ア イ ウ エ オ", reading: "あ い う え お", gloss: "hàng nguyên âm katakana tương ứng", example: "ア / イ / ウ / エ / オ" }
  - type: practice
    id: ja-fnd-kana-hear-asa
    kind: audio_choice
    prompt: "Nghe và chọn cách đọc khớp với âm."
    audioText: "あさ"
    choices: ["あさ", "いえ", "えき"]
    answer: "あさ"
  - type: practice
    id: ja-fnd-kana-hear-eki
    kind: listen_type
    prompt: "Nghe rồi gõ từ bằng hiragana."
    audioText: "えき"
    answer: "えき"
  - type: practice
    id: ja-fnd-kana-write-ie
    kind: type_answer
    prompt: "Gõ cách đọc hiragana của 家."
    answer: "いえ"
    hints:
      - "Bắt đầu bằng い."
  - type: checkpoint
    items:
      - id: ja-fnd-kana-check-vowels
        kind: meaning_choice
        prompt: "Hàng nào chứa năm kana nguyên âm hiragana cơ bản?"
        choices: ["あ い う え お", "か き く け こ", "ア カ サ タ ナ"]
        answer: "あ い う え お"
      - id: ja-fnd-kana-check-ocha
        kind: type_answer
        prompt: "Gõ cách đọc của お茶."
        answer: "おちゃ"
exercise:
  type: type_answer
  prompt: "Gõ cách đọc hiragana của 駅."
  answer: "えき"
---

Mục tiêu là nối trực tiếp âm với kana. Các bài sau vẫn có reading để hỗ trợ, nhưng bản thân kana phải dần trở thành thứ người học đọc được.
