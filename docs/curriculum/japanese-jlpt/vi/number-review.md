---
id: ja-n5-u03-review
track: japanese-jlpt
locale: vi
slug: number-review
title: "Ôn tập: nghe và nói một con số"
order: 10
published: true
jlpt_level: n5
unit_id: ja-n5-number-03
unit_title: "Nghe và nói một con số"
unit_order: 3
unit_can_do: "Hỏi và nói một con số đơn giản từ một đến mười trong một đoạn trao đổi ngắn"
unit_role: review
can_do: "Nhớ lại câu hỏi số và tự tạo câu trả lời có số từ trí nhớ"
pattern: "何番ですか。 / 七番です。 / 十番です。"
objectives:
  - "Nhớ lại 何番ですか khi không có câu mẫu"
  - "Nhớ cách đọc số trong câu trả lời với 番です"
steps:
  - type: scene
    title: "Kiểm tra số nhanh"
    body: "Nhân viên hỏi lại số của bạn. Hãy trả lời khi không có câu mẫu viết sẵn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何番ですか。", reading: "なんばんですか。" }
      - { speaker: "B", text: "九番です。", reading: "きゅうばんです。" }
      - { speaker: "A", text: "九番ですね。", reading: "きゅうばんですね。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
  - type: listen
    prompt: "Nghe và nhớ lại đầy đủ câu trả lời có số."
    text: "四番です。"
    reading: "よんばんです。"
  - type: practice
    id: ja-number-u03-review-listen
    kind: audio_choice
    prompt: "Nghe. Bạn nghe số nào?"
    audioText: "十番です"
    choices: ["十", "七", "九"]
    answer: "十"
  - type: practice
    id: ja-number-u03-review-question
    kind: dialogue_choice
    prompt: "Câu nào dùng để hỏi số?"
    choices: ["何番ですか。", "この人はだれですか。", "お名前は何ですか。"]
    answer: "何番ですか。"
  - type: practice
    id: ja-number-u03-review-produce
    kind: type_answer
    prompt: "Số của bạn là 9. Hãy nhập đầy đủ câu trả lời."
    answer: "九番です"
    acceptedAnswers: ["九番です。", "きゅうばんです", "きゅうばんです。"]
    hints:
      - "Dùng 九 + 番 + です."
  - type: checkpoint
    items:
      - id: ja-number-u03-review-seven
        kind: listen_type
        prompt: "Nghe và nhập đầy đủ câu trả lời."
        audioText: "七番です"
        answer: "七番です"
        acceptedAnswers: ["七番です。", "ななばんです", "ななばんです。"]
      - id: ja-number-u03-review-question-type
        kind: type_answer
        prompt: "Gõ câu hỏi: “Số mấy?”"
        answer: "何番ですか"
        acceptedAnswers: ["何番ですか。", "なんばんですか", "なんばんですか。"]
exercise:
  type: type_answer
  prompt: "Số của bạn là 6. Hãy nhập đầy đủ câu trả lời."
  answer: "六番です"
  acceptedAnswers: ["六番です。", "ろくばんです", "ろくばんです。"]
---

Phần ôn tập giảm hỗ trợ và yêu cầu nhớ lại câu hỏi cùng câu trả lời có số từ trí nhớ.
