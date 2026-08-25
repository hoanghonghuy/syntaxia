---
id: en-a1-u00-sentence-melody
track: english-basics
locale: vi
slug: sentence-melody
title: "Nghe đường nét của một câu ngắn"
order: -5
published: true
cefr_level: a1
foundation_focus: pronunciation
unit_id: en-a1-foundation-00
unit_title: "Nền tảng tiếng Anh"
unit_order: 0
unit_can_do: "Nghe và xây dựng một nhóm nhỏ từ quen thuộc cùng các mẫu câu tiếng Anh cơ bản"
unit_role: lesson
can_do: "Dùng trọng âm và ngữ điệu cơ bản để phân biệt câu kể với câu hỏi đơn giản"
pattern: "câu kể / câu hỏi yes-no / câu hỏi wh"
objectives:
  - Nghe cả cụm thay vì từng từ rời
  - Nhận biết các mẫu ngữ điệu beginner phổ biến
  - Giữ các từ mang nội dung rõ hơn và để từ ngữ pháp nhẹ hơn
vocab:
  - { word: "from", ipa: "/frəm/", gloss: "chỉ nguồn gốc" }
  - { word: "student", ipa: "/ˈstuːdənt/", gloss: "học sinh/sinh viên" }
  - { word: "where", ipa: "/wer/", gloss: "hỏi về nơi chốn" }
steps:
  - type: scene
    title: "Nghe cả cụm"
    body: "Ý nghĩa tiếng Anh đến từ cả từ vựng và đường nét của câu. Các mẫu sau là gợi ý nghe hữu ích, không phải quy tắc cứng cho mọi người nói."
    imageUrl: "/language/scenes/english-sentence-melody.svg"
    imageAlt: "Ba câu tiếng Anh ngắn hiển thị các đường ngữ điệu lên và xuống thường gặp."
  - type: dialogue
    lines:
      - { speaker: "A", text: "I'm Mai." }
      - { speaker: "B", text: "Are you a student?" }
      - { speaker: "A", text: "Yes, I am." }
      - { speaker: "B", text: "Where are you from?" }
      - { speaker: "A", text: "I'm from Hanoi." }
  - type: listen
    prompt: "Nghe sự khác nhau giữa câu kể và hai câu hỏi."
    text: "I'm Mai. Are you a student? Where are you from?"
  - type: tip
    title: "Từ nội dung mang thông tin chính"
    body: "Trong cụm ngắn, tên, danh từ và động từ chính thường rõ hơn. Các từ nhỏ như am, are và from có thể nhẹ hơn trong lời nói tự nhiên."
  - type: teach
    items:
      - { form: "I'm Mai.", reading: "câu kể: thường hạ xuống", gloss: "đưa thông tin", example: "I'm Mai." }
      - { form: "Are you a student?", reading: "câu hỏi yes/no: thường lên", gloss: "hỏi để trả lời yes hoặc no", example: "Are you a student?" }
      - { form: "Where are you from?", reading: "câu hỏi wh: thường hạ xuống", gloss: "hỏi thông tin cụ thể", example: "Where are you from?" }
  - type: practice
    id: en-fnd-melody-statement
    kind: dialogue_choice
    prompt: "Câu nào đưa thông tin thay vì hỏi?"
    choices: ["I'm Mai.", "Are you Mai?", "Where are you from?"]
    answer: "I'm Mai."
  - type: practice
    id: en-fnd-melody-question
    kind: dialogue_choice
    prompt: "Câu nào là câu hỏi yes/no?"
    choices: ["Are you a student?", "I'm a student.", "Where are you from?"]
    answer: "Are you a student?"
  - type: practice
    id: en-fnd-melody-build
    kind: order_words
    prompt: "Ghép câu hỏi nơi xuất thân."
    tokens: ["from", "you", "Where", "are"]
    answer: "Where are you from"
    acceptedAnswers: ["Where are you from?"]
    hints:
      - "Bắt đầu bằng Where."
      - "Đặt are trước you."
  - type: checkpoint
    items:
      - id: en-fnd-melody-check-statement
        kind: dialogue_choice
        prompt: "Câu nào là câu kể?"
        choices: ["I'm from Hanoi.", "Are you from Hanoi?", "Where are you from?"]
        answer: "I'm from Hanoi."
      - id: en-fnd-melody-check-question
        kind: type_answer
        prompt: "Gõ câu hỏi về nơi xuất thân."
        answer: "Where are you from"
        acceptedAnswers: ["Where are you from?"]
exercise:
  type: type_answer
  prompt: "Gõ câu hỏi: Where are you from?"
  answer: "Where are you from"
---

Mục tiêu là nói dễ hiểu và nghe được mẫu câu, không phải bắt chước tuyệt đối một giọng cụ thể.