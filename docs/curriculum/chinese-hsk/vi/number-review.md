---
id: zh-hsk-b1-u03-review
track: chinese-hsk
locale: vi
slug: number-review
title: "Ôn lại: xác nhận một số"
order: 5
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-number-03
unit_title: "Xác nhận một số"
unit_order: 3
unit_can_do: "Nghe, lặp lại và xác nhận một số hiệu đơn giản trong một lượt giao tiếp dịch vụ ngắn"
unit_role: review
can_do: "Tự nhớ lại các cụm dùng cho số hiệu mà không cần mẫu"
pattern: "…号 / …号，对吗？ / 对。"
objectives:
  - "Nhớ lại chữ số từ âm thanh"
  - "Tự dựng lại lượt xác nhận số"
steps:
  - type: scene
    title: "Nhớ lại số"
    body: "Sau đó bạn lại nghe một số hiệu. Hãy tự dựng lại các cụm xác nhận hữu ích từ trí nhớ."
  - type: dialogue
    lines:
      - { speaker: "Staff", text: "七号。", reading: "qī hào" }
      - { speaker: "You", text: "七号，对吗？", reading: "qī hào, duì ma" }
      - { speaker: "Staff", text: "对。", reading: "duì" }
  - type: listen
    prompt: "Nghe trước khi đọc. Bạn nghe số hiệu nào?"
    text: "四号。"
    reading: "sì hào"
  - type: practice
    id: zh-num-u03-review-listen
    kind: audio_choice
    prompt: "Nghe và chọn số hiệu."
    audioText: "九号"
    choices: ["九号", "六号", "二号"]
    answer: "九号"
  - type: practice
    id: zh-num-u03-review-reply
    kind: dialogue_choice
    prompt: "Bạn nghe 八号 và muốn kiểm tra lại. Bạn nói gì?"
    choices: ["八号，对吗？", "八号是谁？", "我要八号。"]
    answer: "八号，对吗？"
  - type: practice
    id: zh-num-u03-review-produce
    kind: type_answer
    prompt: "Gõ số hiệu “số sáu”."
    answer: "六号"
    acceptedAnswers: ["六号。"]
    hints:
      - "六 đọc là liù; thêm 号."
  - type: checkpoint
    items:
      - id: zh-num-u03-review-hear
        kind: audio_choice
        prompt: "Nghe và chọn số."
        audioText: "二"
        choices: ["二", "八", "十"]
        answer: "二"
      - id: zh-num-u03-review-close
        kind: dialogue_choice
        prompt: "Sau khi bạn xác nhận đúng số, câu nào có nghĩa “đúng”?"
        choices: ["对。", "哪里？", "谢谢你。"]
        answer: "对。"
exercise:
  type: type_answer
  prompt: "Gõ “số tám”."
  answer: "八号"
  acceptedAnswers: ["八号。"]
---

Ôn lại là tự truy xuất liên kết âm thanh–chữ Hán–số hiệu và cụm xác nhận, không phải đọc thêm một lần giải thích.
