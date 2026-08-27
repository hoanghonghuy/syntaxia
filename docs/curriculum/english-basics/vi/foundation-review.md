---
id: en-a1-u00-foundation-review
track: english-basics
locale: vi
slug: foundation-review
title: "Ôn tập nền tảng"
order: -1
published: true
cefr_level: a1
foundation_focus: integrated
unit_id: en-a1-foundation-00
unit_title: "Nền tảng tiếng Anh"
unit_order: 0
unit_can_do: "Nghe và xây dựng một nhóm nhỏ từ quen thuộc cùng các mẫu câu tiếng Anh cơ bản"
unit_role: review
can_do: "Gọi lại từ trí nhớ các mẫu âm, trọng âm, be và câu hỏi cốt lõi mà không cần đọc lại bài"
pattern: "gọi lại → tự tạo → tiếp tục"
objectives:
  - Gọi lại tín hiệu phát âm quen thuộc từ trí nhớ
  - Tạo lại các khung câu be và câu hỏi cơ bản
  - Chuẩn bị cho delayed retrieval qua FSRS ở các buổi sau
steps:
  - type: scene
    title: "Nhớ lại trước khi đi tiếp"
    body: "Thử dùng ngôn ngữ từ trí nhớ trước. Nếu khựng lại, dùng hint rồi tạo lại cả cụm một lần nữa."
    visualKey: "classmates-meeting"
    imageAlt: "Hai bạn học tiếp tục cuộc trò chuyện đơn giản bằng các khung câu beginner quen thuộc."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hi. I'm Mai." }
      - { speaker: "B", text: "Hi, Mai. Are you a student?" }
      - { speaker: "A", text: "Yes, I am." }
      - { speaker: "B", text: "Where are you from?" }
      - { speaker: "A", text: "I'm from Hanoi." }
  - type: listen
    prompt: "Nghe một lượt, rồi lặp lại đoạn trao đổi ngắn mà không nhìn chữ."
    text: "Hi. I'm Mai. Are you a student? Yes, I am. Where are you from? I'm from Hanoi."
  - type: tip
    title: "Độ chính xác tăng nhờ gọi lại"
    body: "Ở A1, khả năng kiểm soát ngôn ngữ còn giới hạn là bình thường. Gọi lại ổn định một nhóm cấu trúc hữu ích có giá trị hơn việc chỉ nhận ra một danh sách ngữ pháp dài."
  - type: teach
    items:
      - { form: "I'm …", reading: "/aɪm/", gloss: "subject + be", example: "I'm Mai." }
      - { form: "Are you …?", reading: "/ɑr juː/", gloss: "câu hỏi be", example: "Are you a student?" }
      - { form: "Where are you from?", reading: "/wer ɑr juː frəm/", gloss: "câu hỏi nơi xuất thân", example: "Where are you from?" }
  - type: practice
    id: en-fnd-review-hear
    kind: audio_choice
    prompt: "Từ viết nào khớp với audio?"
    audioText: "meet"
    choices: ["meet", "met", "mate"]
    answer: "meet"
  - type: practice
    id: en-fnd-review-be
    kind: type_answer
    prompt: "Hoàn thành: “She ___ a teacher.”"
    answer: "is"
    hints:
      - "Chủ ngữ là she."
      - "Dùng dạng ngôi ba số ít của be."
  - type: practice
    id: en-fnd-review-question
    kind: order_words
    prompt: "Ghép câu hỏi nơi xuất thân."
    tokens: ["you", "from", "Where", "are"]
    answer: "Where are you from"
    acceptedAnswers: ["Where are you from?"]
  - type: checkpoint
    items:
      - id: en-fnd-review-check-do
        kind: type_answer
        prompt: "Hoàn thành: “___ you like coffee?”"
        answer: "Do"
      - id: en-fnd-review-check-answer
        kind: dialogue_choice
        prompt: "Có người hỏi “Are you a student?” Chọn câu trả lời khẳng định ngắn."
        choices: ["Yes, I am.", "Yes, I do.", "Yes, I is."]
        answer: "Yes, I am."
exercise:
  type: dialogue_choice
  prompt: "Chọn câu trả lời đúng cho “Are you a student?”"
  choices: ["Yes, I am.", "Yes, I do.", "Yes, I are."]
  answer: "Yes, I am."
---

Bài review này kết thúc Unit 0 và đưa các assessment ID ổn định vào cùng luồng FSRS của những unit English phía sau.