---
id: en-a1-u07-checkpoint
track: english-basics
locale: vi
slug: home-checkpoint
title: Checkpoint đồ vật trong nhà
order: 25
published: true
cefr_level: a1
unit_id: en-a1-home-07
unit_title: "Tìm đồ vật ở nhà"
unit_order: 7
unit_can_do: "Nói những gì có trong một phòng quen thuộc và hỏi vị trí của một đồ vật thường gặp"
unit_role: checkpoint
can_do: "Mô tả một đồ vật trong phòng và hỏi hoặc trả lời vị trí đồ vật khác với rất ít hỗ trợ"
pattern: "There's a … / Where's the …? / It's on / under / in …"
objectives:
  - Chỉ ra một đồ vật trong phòng
  - Hỏi vị trí một đồ vật khác
  - Trả lời vị trí rõ ràng
steps:
  - type: scene
    title: "Giúp bạn tìm sách"
    body: "Một người bạn nhìn thấy căn phòng nhưng không tìm thấy sách. Hãy mô tả một đồ vật rồi nói vị trí cuốn sách."
    visualKey: "home-room"
    imageAlt: "Một căn phòng đơn giản nơi cuốn sách nằm trên bàn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "There's a table by the bed." }
      - { speaker: "B", text: "Where's the book?" }
      - { speaker: "A", text: "It's on the table." }
  - type: listen
    prompt: "Nghe và chọn vị trí cuốn sách."
    text: "The book is on the table."
  - type: practice
    id: en-u07-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn vị trí."
    audioText: "It's in the bag."
    choices: ["in the bag", "under the chair", "on the table"]
    answer: "in the bag"
  - type: practice
    id: en-u07-check-describe
    kind: type_answer
    prompt: "Chỉ ra một chiếc ghế trong phòng."
    answer: "There's a chair"
    acceptedAnswers: ["There's a chair.", "There is a chair", "There is a chair."]
  - type: practice
    id: en-u07-check-locate
    kind: type_answer
    prompt: "Cuốn sách ở dưới ghế. Trả lời: “Where's the book?”"
    answer: "It's under the chair"
    acceptedAnswers: ["It's under the chair.", "It is under the chair", "It is under the chair."]
    hints:
      - "Dùng It's + vị trí."
  - type: checkpoint
    items:
      - id: en-u07-check-question
        kind: dialogue_choice
        prompt: "Câu nào hỏi vị trí một đồ vật?"
        choices: ["Where's the book?", "How much is the book?", "What time is the book?"]
        answer: "Where's the book?"
      - id: en-u07-check-surface
        kind: meaning_choice
        prompt: "Cuốn sách nằm trên mặt bàn. Cụm nào phù hợp?"
        choices: ["on the table", "under the table", "in the table"]
        answer: "on the table"
exercise:
  type: type_answer
  prompt: "Nói rằng cuốn sách ở dưới ghế."
  answer: "It's under the chair"
  acceptedAnswers: ["It's under the chair.", "It is under the chair", "It is under the chair."]
---

Checkpoint kết hợp “có đồ vật” và “đồ vật ở đâu” để người học thực sự giúp người khác tìm một vật quen thuộc.
