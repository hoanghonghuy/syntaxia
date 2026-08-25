---
id: en-a1-u05-review
track: english-basics
locale: vi
slug: routine-review
title: "Ôn tập: nói về một ngày của mình"
order: 18
published: true
cefr_level: a1
unit_id: en-a1-routine-05
unit_title: "Nói về một ngày của mình"
unit_order: 5
unit_can_do: "Hỏi về lịch sinh hoạt đơn giản và nói khi nào các hoạt động quen thuộc diễn ra"
unit_role: review
can_do: "Tự nhớ lại cách hỏi giờ và nói lịch sinh hoạt mà không cần mẫu"
pattern: "What time do you …? / I … at … / Then I …"
objectives:
  - Nhớ lại câu hỏi giờ
  - Nghe và nhớ lại một câu về lịch sinh hoạt
  - Tự tạo lịch hai bước từ trí nhớ
steps:
  - type: scene
    title: "Kể lại lịch sinh hoạt"
    body: "Vài ngày sau, hãy kể lại cùng một lịch buổi sáng mà không nhìn bài trước."
    visualKey: "student-studying"
    imageAlt: "Một người học nhớ lại lịch sinh hoạt đơn giản."
  - type: dialogue
    lines:
      - { speaker: "A", text: "What time do you start your day?" }
      - { speaker: "B", text: "I have breakfast at seven. Then I go to work at eight." }
  - type: listen
    prompt: "Nghe và nhớ lại hoạt động thứ hai."
    text: "I have breakfast at seven. Then I go to school at eight."
  - type: practice
    id: en-u05-review-listen
    kind: listen_type
    prompt: "Nghe và gõ hoạt động sau bữa sáng."
    audioText: "Then I go to school."
    answer: "go to school"
    acceptedAnswers: ["I go to school", "Then I go to school", "Then I go to school."]
    hints:
      - "Điểm đến là school."
  - type: practice
    id: en-u05-review-question
    kind: order_words
    prompt: "Ghép câu hỏi về giờ ăn sáng."
    tokens: ["do you", "What time", "have breakfast"]
    answer: "What time do you have breakfast"
    acceptedAnswers: ["What time do you have breakfast?"]
  - type: practice
    id: en-u05-review-produce
    kind: type_answer
    prompt: "Không nhìn mẫu: viết hai hoạt động buổi sáng lúc 7:00 và 8:00."
    answer: "I have breakfast at seven. Then I go to school at eight."
    acceptedAnswers: ["I have breakfast at seven then I go to school at eight", "I have breakfast at seven, then I go to school at eight."]
    hints:
      - "Dùng at trước mỗi mốc giờ."
  - type: checkpoint
    items:
      - id: en-u05-review-at
        kind: meaning_choice
        prompt: "Từ ngắn nào đứng trước giờ cụ thể?"
        choices: ["at", "on", "from"]
        answer: "at"
      - id: en-u05-review-then
        kind: dialogue_choice
        prompt: "Cụm nào tự nhiên để chuyển sang hoạt động tiếp theo?"
        choices: ["Then I …", "Who I …", "At then …"]
        answer: "Then I …"
exercise:
  type: type_answer
  prompt: "Nhớ lại một câu lịch hoàn chỉnh: bạn đi làm lúc 8 giờ."
  answer: "I go to work at eight"
  acceptedAnswers: ["I go to work at eight."]
---

Đây là bài ôn truy hồi: tự dựng lại một lịch sinh hoạt hữu ích thay vì đọc lại nội dung cũ.
