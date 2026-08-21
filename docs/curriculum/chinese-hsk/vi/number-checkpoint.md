---
id: zh-hsk-b1-u03-checkpoint
track: chinese-hsk
locale: vi
slug: number-checkpoint
title: "Checkpoint: xác nhận một số"
order: 4
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-number-03
unit_title: "Xác nhận một số"
unit_order: 3
unit_can_do: "Nghe, lặp lại và xác nhận một số hiệu đơn giản trong một lượt giao tiếp dịch vụ ngắn"
unit_role: checkpoint
can_do: "Xác nhận một số hiệu được nói ra với ít hỗ trợ"
pattern: "…号 / …号，对吗？ / 对。"
objectives:
  - "Nhận ra một số hiệu khi nghe"
  - "Lặp lại số hiệu để xác nhận"
steps:
  - type: scene
    title: "Một số ở quầy tiếp nhận"
    body: "Nhân viên đưa cho bạn một số thứ tự. Hãy xác nhận số trước khi rời quầy."
  - type: dialogue
    lines:
      - { speaker: "Staff", text: "五号。", reading: "wǔ hào" }
      - { speaker: "You", text: "五号，对吗？", reading: "wǔ hào, duì ma" }
      - { speaker: "Staff", text: "对。", reading: "duì" }
  - type: listen
    prompt: "Nghe trước. Bạn nghe số hiệu nào?"
    text: "八号。"
    reading: "bā hào"
  - type: practice
    id: zh-num-u03-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn số hiệu."
    audioText: "六号"
    choices: ["六号", "九号", "三号"]
    answer: "六号"
  - type: practice
    id: zh-num-u03-check-reply
    kind: dialogue_choice
    prompt: "Nhân viên nói 五号. Câu nào xác nhận điều bạn vừa nghe?"
    choices: ["五号，对吗？", "我叫五号。", "五号在哪里？"]
    answer: "五号，对吗？"
  - type: practice
    id: zh-num-u03-check-produce
    kind: type_answer
    prompt: "Gõ số hiệu “số chín”."
    answer: "九号"
    acceptedAnswers: ["九号。"]
    hints:
      - "九 đọc là jiǔ; thêm 号."
  - type: checkpoint
    items:
      - id: zh-num-u03-check-ten
        kind: audio_choice
        prompt: "Nghe và chọn số."
        audioText: "十"
        choices: ["十", "七", "四"]
        answer: "十"
      - id: zh-num-u03-check-confirm
        kind: dialogue_choice
        prompt: "Ai đó lặp lại 三号，对吗？ Câu ngắn nào xác nhận đúng?"
        choices: ["对。", "再见。", "我叫小明。"]
        answer: "对。"
exercise:
  type: type_answer
  prompt: "Gõ “số năm”."
  answer: "五号"
  acceptedAnswers: ["五号。"]
---

Dùng số như thông tin thật trong hội thoại: nghe, lặp lại rồi xác nhận.
