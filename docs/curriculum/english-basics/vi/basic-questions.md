---
id: en-a1-u00-basic-questions
track: english-basics
locale: vi
slug: basic-questions
title: "Tạo câu hỏi tiếng Anh cơ bản"
order: -3
published: true
cefr_level: a1
foundation_focus: grammar
unit_id: en-a1-foundation-00
unit_title: "Nền tảng tiếng Anh"
unit_order: 0
unit_can_do: "Nghe và xây dựng một nhóm nhỏ từ quen thuộc cùng các mẫu câu tiếng Anh cơ bản"
unit_role: lesson
can_do: "Tạo và trả lời câu hỏi be, câu hỏi wh và một mẫu câu hỏi do phổ biến"
pattern: "be + subject …? / wh + be …? / do + subject + verb …?"
objectives:
  - Đặt be trước chủ ngữ trong câu hỏi yes/no
  - Bắt đầu câu hỏi thông tin đơn giản bằng từ để hỏi
  - Dùng do trước chủ ngữ với động từ cơ bản như like
vocab:
  - { word: "where", ipa: "/wer/", gloss: "hỏi nơi chốn" }
  - { word: "what", ipa: "/wʌt/", gloss: "hỏi thông tin" }
  - { word: "like", ipa: "/laɪk/", gloss: "thích" }
  - { word: "music", ipa: "/ˈmjuːzɪk/", gloss: "âm nhạc" }
steps:
  - type: scene
    title: "Hỏi rồi nghe câu trả lời"
    body: "Câu hỏi cơ bản thay đổi khung câu. Học cả khung như một mẫu có thể dùng lại thay vì dịch từng từ."
    visualKey: "classmates-meeting"
    imageAlt: "Hai bạn học hỏi và trả lời các câu đơn giản trong cuộc trò chuyện đầu tiên."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Are you a student?" }
      - { speaker: "B", text: "Yes, I am." }
      - { speaker: "A", text: "Where are you from?" }
      - { speaker: "B", text: "I'm from Hanoi." }
      - { speaker: "A", text: "Do you like music?" }
      - { speaker: "B", text: "Yes, I do." }
  - type: listen
    prompt: "Nghe từ mở đầu câu hỏi: Are, Where và Do."
    text: "Are you a student? Where are you from? Do you like music?"
  - type: tip
    title: "Không giữ nguyên trật tự câu kể"
    body: "Với be, đưa be lên trước chủ ngữ: You are a student → Are you a student? Với động từ như like, dùng do: You like music → Do you like music?"
  - type: teach
    items:
      - { form: "Are you …?", reading: "/ɑr juː/", gloss: "câu hỏi yes/no với be", example: "Are you a student?" }
      - { form: "Where are you …?", reading: "/wer ɑr juː/", gloss: "hỏi nơi chốn/nguồn gốc", example: "Where are you from?" }
      - { form: "Do you like …?", reading: "/duː juː laɪk/", gloss: "câu hỏi yes/no với like", example: "Do you like music?" }
  - type: practice
    id: en-fnd-q-be
    kind: order_words
    prompt: "Ghép câu hỏi yes/no."
    tokens: ["a", "student", "you", "Are"]
    answer: "Are you a student"
    acceptedAnswers: ["Are you a student?"]
    hints:
      - "Đặt Are ở đầu."
      - "Sau đó là you."
  - type: practice
    id: en-fnd-q-where
    kind: order_words
    prompt: "Ghép câu hỏi nơi xuất thân."
    tokens: ["from", "are", "Where", "you"]
    answer: "Where are you from"
    acceptedAnswers: ["Where are you from?"]
  - type: practice
    id: en-fnd-q-like
    kind: type_answer
    prompt: "Hoàn thành câu hỏi: “___ you like music?”"
    answer: "Do"
    acceptedAnswers: ["do"]
    hints:
      - "Động từ chính là like, không phải be."
      - "Dùng trợ động từ trước you."
  - type: checkpoint
    items:
      - id: en-fnd-q-check-be
        kind: dialogue_choice
        prompt: "Câu nào là câu hỏi đúng?"
        choices: ["Are you tired?", "You are tired?", "Do you are tired?"]
        answer: "Are you tired?"
      - id: en-fnd-q-check-like
        kind: type_answer
        prompt: "Hoàn thành: “___ you like coffee?”"
        answer: "Do"
exercise:
  type: type_answer
  prompt: "Hoàn thành: ___ you like music?"
  answer: "Do"
---

Bài này chỉ đưa vào các khung câu hỏi tần suất cao mà những unit A1 phía sau sẽ cần.