---
id: ja-n5-u03-checkpoint
track: japanese-jlpt
locale: vi
slug: number-checkpoint
title: "Checkpoint: nghe và nói một con số"
order: 9
published: true
jlpt_level: n5
unit_id: ja-n5-number-03
unit_title: "Nghe và nói một con số"
unit_order: 3
unit_can_do: "Hỏi và nói một con số đơn giản từ một đến mười trong một đoạn trao đổi ngắn"
unit_role: checkpoint
can_do: "Hiểu một con số đơn giản và trả lời 何番ですか với ít hỗ trợ"
pattern: "何番ですか。 / 八番です。"
objectives:
  - "Nhận ra một con số khi nghe"
  - "Tự tạo N番です để trả lời"
steps:
  - type: scene
    title: "Số trong buổi hướng dẫn"
    body: "Có người hỏi số được phân cho bạn. Hãy nghe, xác nhận rồi nói số của mình."
  - type: dialogue
    lines:
      - { speaker: "A", text: "何番ですか。", reading: "なんばんですか。" }
      - { speaker: "B", text: "七番です。", reading: "ななばんです。" }
      - { speaker: "A", text: "七番ですね。", reading: "ななばんですね。" }
      - { speaker: "B", text: "はい。", reading: "はい。" }
  - type: listen
    prompt: "Nghe trước. Bạn nghe số nào?"
    text: "九番です。"
    reading: "きゅうばんです。"
  - type: practice
    id: ja-number-u03-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn số."
    audioText: "六番です"
    choices: ["六", "四", "八"]
    answer: "六"
  - type: practice
    id: ja-number-u03-check-question
    kind: dialogue_choice
    prompt: "Câu nào dùng để hỏi số?"
    choices: ["何番ですか。", "お名前は何ですか。", "どこですか。"]
    answer: "何番ですか。"
  - type: practice
    id: ja-number-u03-check-produce
    kind: type_answer
    prompt: "Số của bạn là 4. Hãy nhập đầy đủ câu trả lời."
    answer: "四番です"
    acceptedAnswers: ["四番です。", "よんばんです", "よんばんです。"]
    hints:
      - "Dùng 四 + 番 + です."
  - type: checkpoint
    items:
      - id: ja-number-u03-check-eight
        kind: listen_type
        prompt: "Nghe và nhập đầy đủ câu trả lời."
        audioText: "八番です"
        answer: "八番です"
        acceptedAnswers: ["八番です。", "はちばんです", "はちばんです。"]
      - id: ja-number-u03-check-ten
        kind: type_answer
        prompt: "Số của bạn là 10. Hãy nhập đầy đủ câu trả lời."
        answer: "十番です"
        acceptedAnswers: ["十番です。", "じゅうばんです", "じゅうばんです。"]
exercise:
  type: type_answer
  prompt: "Số của bạn là 7. Hãy nhập đầy đủ câu trả lời."
  answer: "七番です"
  acceptedAnswers: ["七番です。", "ななばんです", "ななばんです。"]
---

Checkpoint dùng số như thông tin cần nghe và trả lại, không phải một dãy để đọc thuộc lòng.
