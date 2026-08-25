---
id: ja-n5-u07-review
track: japanese-jlpt
locale: vi
slug: classroom-review
title: "Ôn tập: chỉ dẫn trong lớp"
order: 22
published: true
jlpt_level: n5
unit_id: ja-n5-classroom-07
unit_title: "Xử lý một tương tác đơn giản trong lớp"
unit_order: 7
unit_can_do: "Hiểu một chỉ dẫn ngắn trong lớp và xin nhắc lại khi cần"
unit_role: review
can_do: "Nhớ lại chỉ dẫn đọc/viết và câu xin nhắc lại mà không cần gợi ý"
pattern: "読んでください。 / 書いてください。 / もう一度お願いします。"
objectives:
  - Nhớ lại cả hai yêu cầu hành động
  - Nhận ra hành động từ audio
  - Tự sửa hội thoại từ trí nhớ
steps:
  - type: scene
    title: "Một buổi học khác"
    body: "Mẫu chỉ dẫn cũ xuất hiện trong buổi học mới. Trả lời từ trí nhớ."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "宿題を読んでください。", reading: "しゅくだいを よんでください。" }
      - { speaker: "学生", text: "すみません。もう一度お願いします。", reading: "すみません。もういちど おねがいします。" }
  - type: listen
    prompt: "Nghe. Giáo viên yêu cầu đọc hay viết?"
    text: "書いてください。"
    reading: "かいてください。"
  - type: practice
    id: ja-u07-review-listen
    kind: audio_choice
    prompt: "Nghe và chọn hành động được yêu cầu."
    audioText: "読んでください"
    choices: ["đọc", "viết", "thức dậy"]
    answer: "đọc"
  - type: practice
    id: ja-u07-review-write
    kind: type_answer
    prompt: "Gõ: Hãy viết."
    answer: "書いてください"
    acceptedAnswers: ["書いてください。"]
  - type: practice
    id: ja-u07-review-repeat
    kind: type_answer
    prompt: "Xin nhắc lại một lần."
    answer: "もう一度お願いします"
    acceptedAnswers: ["もう一度お願いします。", "すみません。もう一度お願いします。"]
  - type: checkpoint
    items:
      - id: ja-u07-review-read
        kind: listen_type
        prompt: "Nghe và gõ chỉ dẫn."
        audioText: "読んでください"
        answer: "読んでください"
        acceptedAnswers: ["読んでください。"]
      - id: ja-u07-review-homework
        kind: meaning_choice
        prompt: "Mục nào là bài tập về nhà?"
        choices: ["宿題", "切符", "時計"]
        answer: "宿題"
exercise:
  type: type_answer
  prompt: "Nói: Xin nhắc lại một lần."
  answer: "もう一度お願いします"
  acceptedAnswers: ["もう一度お願いします。"]
---

Ôn cách quãng biến câu xin nhắc lại thành công cụ lớp học có thể tái sử dụng, không phải đáp án dùng một lần.
