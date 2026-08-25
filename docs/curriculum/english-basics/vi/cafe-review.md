---
id: en-a1-u04-review
track: english-basics
locale: vi
slug: cafe-review
title: "Ôn tập: gọi món ở quán"
order: 12
published: true
cefr_level: a1
unit_id: en-a1-cafe-04
unit_title: "Gọi món ở quán cà phê"
unit_order: 4
unit_can_do: "Gọi một món lịch sự và kết thúc một lượt gọi món đơn giản"
unit_role: review
can_do: "Nhớ lại cách gọi món lịch sự và kết thúc lượt trao đổi mà không cần mẫu"
pattern: "I'd like …, please. / Anything else? / That's all, thank you."
objectives:
  - Nhớ lại cụm yêu cầu lịch sự
  - Nhận ra câu hỏi tiếp theo của nhân viên
  - Nhớ cách kết thúc lượt gọi món
steps:
  - type: scene
    title: "Tự nhớ cách gọi món"
    body: "Bạn quay lại quán. Hãy hoàn thành một lượt gọi món ngắn mà không nhìn lại mẫu cũ."
  - type: dialogue
    lines:
      - { speaker: "Server", text: "What would you like?" }
      - { speaker: "You", text: "I'd like water, please." }
      - { speaker: "Server", text: "Anything else?" }
      - { speaker: "You", text: "No, that's all. Thank you." }
  - type: listen
    prompt: "Nghe trước. Bạn nghe thấy món nào?"
    text: "I'd like coffee, please."
  - type: practice
    id: en-u04-review-listen
    kind: listen_type
    prompt: "Nghe rồi nhập tên món."
    audioText: "tea"
    answer: "tea"
    hints:
      - "Từ này bắt đầu bằng t-."
  - type: practice
    id: en-u04-review-build
    kind: order_words
    prompt: "Sắp xếp thành câu yêu cầu lịch sự."
    tokens: ["please", "coffee", "I'd like"]
    answer: "I'd like coffee please"
    acceptedAnswers: ["I'd like coffee, please.", "I'd like coffee, please"]
    hints:
      - "Bắt đầu bằng I'd like."
  - type: practice
    id: en-u04-review-produce
    kind: type_answer
    prompt: "Nhân viên hỏi “Anything else?” Bạn không muốn gọi thêm. Viết câu trả lời."
    answer: "No, that's all. Thank you."
    acceptedAnswers: ["No, that's all, thank you.", "That's all, thank you.", "That's all, thank you"]
    hints:
      - "Dùng that's all để kết thúc."
  - type: checkpoint
    items:
      - id: en-u04-review-order
        kind: dialogue_choice
        prompt: "Câu nào dùng để gọi nước lịch sự?"
        choices: ["I'd like water, please.", "Where's water?", "Who's water?"]
        answer: "I'd like water, please."
      - id: en-u04-review-close
        kind: dialogue_choice
        prompt: "Câu nào kết thúc lượt gọi món?"
        choices: ["That's all, thank you.", "Room five?", "This is my sister."]
        answer: "That's all, thank you."
exercise:
  type: type_answer
  prompt: "Gọi trà một cách lịch sự."
  answer: "I'd like tea, please"
  acceptedAnswers: ["I'd like tea, please.", "I'd like a tea, please", "I'd like a tea, please."]
---

Ôn bằng cách tự nhớ cụm yêu cầu và cụm kết thúc như một lượt gọi món hoàn chỉnh.
