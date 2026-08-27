---
id: en-a1-u00-foundation-checkpoint
track: english-basics
locale: vi
slug: foundation-checkpoint
title: "Checkpoint nền tảng"
order: -2
published: true
cefr_level: a1
foundation_focus: integrated
unit_id: en-a1-foundation-00
unit_title: "Nền tảng tiếng Anh"
unit_order: 0
unit_can_do: "Nghe và xây dựng một nhóm nhỏ từ quen thuộc cùng các mẫu câu tiếng Anh cơ bản"
unit_role: checkpoint
can_do: "Kết hợp tín hiệu phát âm cơ bản với mẫu câu be và mẫu câu hỏi"
pattern: "nghe → chọn/ghép → trả lời"
objectives:
  - Kiểm tra khả năng nối âm-cách viết và nhận biết trọng âm từ
  - Tạo một câu đơn với be
  - Tạo và trả lời một câu hỏi cơ bản
steps:
  - type: scene
    title: "Trước cuộc trò chuyện đầu tiên"
    body: "Dùng công cụ âm và cấu trúc câu cùng lúc. Mục tiêu không phải accent hoàn hảo hay thuộc bảng ngữ pháp, mà là nền tảng nhỏ có thể gọi ra khi giao tiếp."
    visualKey: "classmates-meeting"
    imageAlt: "Hai bạn học chuẩn bị cho một cuộc trò chuyện giới thiệu ngắn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Hello. I'm Mai. I'm a student." }
      - { speaker: "B", text: "Hi, Mai. Are you from Hanoi?" }
      - { speaker: "A", text: "Yes, I am." }
      - { speaker: "B", text: "Do you like music?" }
      - { speaker: "A", text: "Yes, I do." }
  - type: listen
    prompt: "Nghe một lượt để hiểu ý, rồi nghe lại hello, student và các từ mở đầu câu hỏi Are, Do."
    text: "Hello. I'm Mai. I'm a student. Are you from Hanoi? Do you like music?"
  - type: tip
    title: "Gọi lại mẫu, đừng dịch từng từ"
    body: "Dùng các khối và khung câu: I'm …, Are you …?, Where are you …?, Do you like …?"
  - type: teach
    items:
      - { form: "hel-LO", reading: "/həˈloʊ/", gloss: "trọng âm từ", example: "Hello, Mai." }
      - { form: "I'm a student.", reading: "I + am + noun", gloss: "câu be cơ bản", example: "I'm a student." }
      - { form: "Are you …?", reading: "be + subject", gloss: "câu hỏi yes/no với be", example: "Are you from Hanoi?" }
      - { form: "Do you like …?", reading: "do + subject + verb", gloss: "câu hỏi yes/no với like", example: "Do you like music?" }
  - type: practice
    id: en-fnd-check-hear-hello
    kind: audio_choice
    prompt: "Mẫu trọng âm nào khớp với từ vừa nghe?"
    audioText: "hello"
    choices: ["hel-LO", "HEL-lo"]
    answer: "hel-LO"
  - type: practice
    id: en-fnd-check-build-be
    kind: order_words
    prompt: "Ghép câu."
    tokens: ["student", "a", "I'm"]
    answer: "I'm a student"
    acceptedAnswers: ["I'm a student."]
  - type: practice
    id: en-fnd-check-build-question
    kind: order_words
    prompt: "Ghép câu hỏi."
    tokens: ["you", "Are", "from", "Hanoi"]
    answer: "Are you from Hanoi"
    acceptedAnswers: ["Are you from Hanoi?"]
  - type: checkpoint
    items:
      - id: en-fnd-check-do
        kind: type_answer
        prompt: "Hoàn thành: “___ you like music?”"
        answer: "Do"
      - id: en-fnd-check-am
        kind: type_answer
        prompt: "Hoàn thành câu trả lời ngắn: “Yes, I ___.”"
        answer: "am"
exercise:
  type: type_answer
  prompt: "Hoàn thành: Yes, I ___."
  answer: "am"
---

Qua checkpoint này nghĩa là người học đã có nền để dùng lại các cấu trúc trong các unit giao tiếp.