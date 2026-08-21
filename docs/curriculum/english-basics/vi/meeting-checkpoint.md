---
id: en-a1-u01-checkpoint
track: english-basics
locale: vi
slug: meeting-checkpoint
title: Checkpoint: gặp lần đầu
order: 2
published: true
cefr_level: a1
unit_id: en-a1-meeting-01
unit_title: "Gặp một người"
unit_order: 1
unit_can_do: "Mở đầu, duy trì và kết thúc một cuộc gặp ngắn"
unit_role: checkpoint
can_do: "Hoàn thành một cuộc gặp ngắn lần đầu với ít gợi ý"
pattern: "Hi, I'm … / Nice to meet you. / See you."
objectives:
  - Đáp lại tự nhiên khi gặp lần đầu
  - Tự giới thiệu mà không cần chép mẫu
steps:
  - type: scene
    title: "Một cuộc gặp mới"
    body: "Bạn đến lớp sớm và gặp một học sinh khác lần đầu."
    visualKey: "classmates-meeting"
    imageAlt: "Hai học sinh quay sang nhau trước giờ học và bắt đầu một cuộc trò chuyện ngắn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hi, I'm Sam." }
      - { speaker: "B", text: "Hi, Sam. I'm Linh." }
      - { speaker: "A", text: "Nice to meet you." }
      - { speaker: "B", text: "Nice to meet you too." }
      - { speaker: "A", text: "See you later." }
      - { speaker: "B", text: "See you!" }
  - type: listen
    prompt: "Nghe trước. B nói gì sau câu “Nice to meet you”?"
    text: "Nice to meet you too."
  - type: practice
    id: en-u01-check-reply
    kind: dialogue_choice
    prompt: "Một người nói: “Hi, I'm Sam.” Chọn câu đáp tự nhiên."
    choices: ["Hi, Sam. I'm Linh.", "See you yesterday.", "Thank you, Sam."]
    answer: "Hi, Sam. I'm Linh."
    explanation: "Đáp lại lời chào rồi nói tên của mình."
  - type: practice
    id: en-u01-check-listen
    kind: listen_type
    prompt: "Nghe và nhập lời tạm biệt bạn vừa nghe."
    audioText: "See you later"
    answer: "See you later"
    acceptedAnswers: ["See you later."]
    hints:
      - "Câu bắt đầu bằng See."
  - type: practice
    id: en-u01-check-produce
    kind: type_answer
    prompt: "Tên bạn là Nam. Hãy tự giới thiệu, bắt đầu bằng “Hi”."
    answer: "Hi, I'm Nam"
    acceptedAnswers: ["Hi, I'm Nam.", "Hi! I'm Nam."]
    hints:
      - "Dùng Hi, I'm + tên."
  - type: checkpoint
    items:
      - id: en-u01-check-close
        kind: dialogue_choice
        prompt: "Lớp sắp bắt đầu. Câu nào kết thúc cuộc nói chuyện tự nhiên?"
        choices: ["See you later.", "Nice yesterday.", "You're welcome."]
        answer: "See you later."
      - id: en-u01-check-meet
        kind: meaning_choice
        prompt: "Cụm nào dùng khi gặp lần đầu?"
        choices: ["Nice to meet you.", "Good night yesterday.", "No problem tomorrow."]
        answer: "Nice to meet you."
exercise:
  type: type_answer
  prompt: "Hãy tự giới thiệu với tên Nam."
  answer: "Hi, I'm Nam"
  acceptedAnswers: ["Hi, I'm Nam.", "Hi! I'm Nam."]
---

Hãy dùng cả lượt giao tiếp thay vì nhớ từng từ rời. Checkpoint kiểm tra khả năng tự thực hiện cuộc gặp ngắn.
