---
id: en-a1-u03-checkpoint
track: english-basics
locale: vi
slug: find-way-checkpoint
title: Kiểm tra: tìm đường và địa điểm
order: 9
published: true
cefr_level: a1
unit_id: en-a1-find-way-03
unit_title: "Tìm đường và địa điểm"
unit_order: 3
unit_can_do: "Xác nhận số phòng và hỏi vị trí một địa điểm quen thuộc"
unit_role: checkpoint
can_do: "Xác nhận số phòng, hỏi vị trí và hiểu một câu trả lời ngắn"
pattern: "Room eight? / Where's the …? / It's here. / It's over there."
objectives:
  - Xác nhận một con số vừa nghe
  - Hỏi một địa điểm ở đâu
  - Hiểu câu trả lời vị trí tối thiểu
steps:
  - type: scene
    title: "Tìm đúng nơi cần đến"
    body: "Nhân viên cho bạn số phòng. Sau khi xác nhận lại, hãy hỏi phòng đó ở đâu."
  - type: dialogue
    lines:
      - { speaker: "Staff", text: "Your class is in room six." }
      - { speaker: "You", text: "Room six?" }
      - { speaker: "Staff", text: "Yes." }
      - { speaker: "You", text: "Where's room six?" }
      - { speaker: "Staff", text: "It's over there." }
  - type: listen
    prompt: "Nghe cả số phòng và vị trí."
    text: "Room four. It's over there."
  - type: practice
    id: en-u03-check-number
    kind: listen_type
    prompt: "Nghe rồi nhập từ chỉ số phòng."
    audioText: "seven"
    answer: "seven"
    hints:
      - "Từ này bắt đầu bằng s-."
  - type: practice
    id: en-u03-check-confirm
    kind: dialogue_choice
    prompt: "Bạn nghe “Room nine.” Xác nhận lại thế nào?"
    choices: ["Room nine?", "Where nine?", "Who's nine?"]
    answer: "Room nine?"
  - type: practice
    id: en-u03-check-place
    kind: type_answer
    prompt: "Hỏi quán cà phê ở đâu."
    answer: "Where's the café?"
    acceptedAnswers: ["Where is the café?", "Where's the cafe?", "Where is the cafe?"]
    hints:
      - "Dùng Where's + địa điểm."
  - type: checkpoint
    items:
      - id: en-u03-check-location
        kind: audio_choice
        prompt: "Nghe. Cửa hàng ở đâu?"
        audioText: "It's here."
        choices: ["here", "over there", "room eight"]
        answer: "here"
      - id: en-u03-check-flow
        kind: dialogue_choice
        prompt: "Bạn đã xác nhận số phòng nhưng chưa biết phòng ở đâu. Câu tiếp theo nên là gì?"
        choices: ["Where's room six?", "Who's room six?", "Anything else?"]
        answer: "Where's room six?"
exercise:
  type: dialogue_choice
  prompt: "Bạn nghe “Room five.” Chọn cách xác nhận tự nhiên."
  choices: ["Room five?", "Five is where?", "Who's five?"]
  answer: "Room five?"
---

Dùng cụm chỉ số và vị trí như một lượt hỏi đường ngắn hoàn chỉnh.
