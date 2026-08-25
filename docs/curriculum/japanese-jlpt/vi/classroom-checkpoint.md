---
id: ja-n5-u07-checkpoint
track: japanese-jlpt
locale: vi
slug: classroom-checkpoint
title: Checkpoint tương tác lớp học
order: 21
published: true
jlpt_level: n5
unit_id: ja-n5-classroom-07
unit_title: "Xử lý một tương tác đơn giản trong lớp"
unit_order: 7
unit_can_do: "Hiểu một chỉ dẫn ngắn trong lớp và xin nhắc lại khi cần"
unit_role: checkpoint
can_do: "Lấy đúng hành động được yêu cầu và xử lý khi nghe hụt chỉ dẫn"
pattern: "…てください。 / もう一度お願いします。"
objectives:
  - Lấy được hành động đọc/viết từ audio chậm
  - Phản hồi khi không nghe rõ chỉ dẫn
  - Tự tạo một yêu cầu không nhìn mẫu
steps:
  - type: scene
    title: "Chỉ dẫn tiếp theo"
    body: "Giáo viên luân phiên giao nhiệm vụ đọc và viết. Hãy nghe từ chỉ hành động."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "本を読んでください。", reading: "ほんを よんでください。" }
      - { speaker: "学生", text: "はい。", reading: "はい。" }
      - { speaker: "先生", text: "次に、名前を書いてください。", reading: "つぎに、なまえを かいてください。" }
  - type: listen
    prompt: "Nghe hành động thứ hai."
    text: "名前を書いてください。"
    reading: "なまえを かいてください。"
  - type: practice
    id: ja-u07-check-action
    kind: audio_choice
    prompt: "Nghe. Hành động nào được yêu cầu?"
    audioText: "本を読んでください"
    choices: ["đọc", "viết", "ngủ"]
    answer: "đọc"
  - type: practice
    id: ja-u07-check-repair
    kind: dialogue_choice
    prompt: "Bạn nghe hụt chỉ dẫn. Có thể nói gì?"
    choices: ["もう一度お願いします。", "お茶をください。", "ここです。"]
    answer: "もう一度お願いします。"
  - type: practice
    id: ja-u07-check-produce
    kind: type_answer
    prompt: "Gõ: Hãy viết."
    answer: "書いてください"
    acceptedAnswers: ["書いてください。"]
    hints:
      - "書いて + ください."
  - type: checkpoint
    items:
      - id: ja-u07-check-read
        kind: listen_type
        prompt: "Nghe và gõ lại chỉ dẫn ngắn."
        audioText: "読んでください"
        answer: "読んでください"
        acceptedAnswers: ["読んでください。"]
      - id: ja-u07-check-class
        kind: meaning_choice
        prompt: "授業 trong ngữ cảnh này gần nhất với nghĩa nào?"
        choices: ["lớp/tiết học", "tàu điện", "giờ đi ngủ"]
        answer: "lớp/tiết học"
exercise:
  type: type_answer
  prompt: "Xin nhắc lại một lần."
  answer: "もう一度お願いします"
  acceptedAnswers: ["もう一度お願いします。"]
---

Checkpoint mô phỏng đúng kiểu nghe ngắn và lấy thông tin cần thiết ở trình độ đầu vào.
