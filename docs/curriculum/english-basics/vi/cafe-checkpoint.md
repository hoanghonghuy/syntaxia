---
id: en-a1-u04-checkpoint
track: english-basics
locale: vi
slug: cafe-checkpoint
title: "Kiểm tra: gọi món ở quán"
order: 11
published: true
cefr_level: a1
unit_id: en-a1-cafe-04
unit_title: "Gọi món ở quán cà phê"
unit_order: 4
unit_can_do: "Gọi một món lịch sự và kết thúc một lượt gọi món đơn giản"
unit_role: checkpoint
can_do: "Gọi một món và kết thúc lượt trao đổi ở quán với ít hỗ trợ"
pattern: "I'd like …, please. / Anything else? / That's all, thank you."
objectives:
  - Xác định món được gọi khi nghe
  - Đưa ra yêu cầu lịch sự
  - Đáp lại khi nhân viên hỏi có muốn thêm món không
steps:
  - type: scene
    title: "Hoàn thành một lượt gọi món"
    body: "Gọi một đồ uống rồi kết thúc lượt trao đổi khi nhân viên hỏi có muốn thêm món nào không."
  - type: dialogue
    lines:
      - { speaker: "Server", text: "What would you like?" }
      - { speaker: "You", text: "I'd like a coffee, please." }
      - { speaker: "Server", text: "Anything else?" }
      - { speaker: "You", text: "No, that's all. Thank you." }
  - type: listen
    prompt: "Nghe. Khách gọi món gì?"
    text: "I'd like tea, please."
  - type: practice
    id: en-u04-check-listen
    kind: audio_choice
    prompt: "Nghe rồi chọn món đúng."
    audioText: "I'd like bread, please."
    choices: ["bread", "water", "coffee"]
    answer: "bread"
  - type: practice
    id: en-u04-check-order
    kind: type_answer
    prompt: "Bạn muốn nước. Viết một câu gọi món lịch sự."
    answer: "I'd like water, please"
    acceptedAnswers: ["I'd like water, please.", "I'd like a water, please", "I'd like a water, please."]
    hints:
      - "Bắt đầu bằng I'd like."
  - type: practice
    id: en-u04-check-close
    kind: order_words
    prompt: "Sắp xếp thành câu kết thúc lượt gọi món."
    tokens: ["thank you", "that's all", "No,"]
    answer: "No, that's all, thank you"
    acceptedAnswers: ["No, that's all. Thank you.", "No, that's all, thank you."]
    hints:
      - "Bắt đầu bằng No."
  - type: checkpoint
    items:
      - id: en-u04-check-extra
        kind: dialogue_choice
        prompt: "Nhân viên hỏi “Anything else?” Bạn không muốn gọi thêm. Có thể nói gì?"
        choices: ["No, that's all. Thank you.", "Where's the café?", "This is my brother."]
        answer: "No, that's all. Thank you."
      - id: en-u04-check-polite
        kind: dialogue_choice
        prompt: "Câu nào là cách gọi trà lịch sự?"
        choices: ["I'd like a tea, please.", "Where is the tea?", "The tea is hot."]
        answer: "I'd like a tea, please."
exercise:
  type: type_answer
  prompt: "Gọi cà phê một cách lịch sự."
  answer: "I'd like a coffee, please"
  acceptedAnswers: ["I'd like a coffee, please.", "I'd like coffee, please", "I'd like coffee, please."]
---

Hoàn thành lượt giao tiếp dịch vụ bằng một yêu cầu rõ ràng và câu kết thúc phù hợp.
