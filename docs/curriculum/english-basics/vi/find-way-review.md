---
id: en-a1-u03-review
track: english-basics
locale: vi
slug: find-way-review
title: Ôn tập: tìm đường và địa điểm
order: 10
published: true
cefr_level: a1
unit_id: en-a1-find-way-03
unit_title: "Tìm đường và địa điểm"
unit_order: 3
unit_can_do: "Xác nhận số phòng và hỏi vị trí một địa điểm quen thuộc"
unit_role: review
can_do: "Nhớ lại cách xác nhận số và hỏi vị trí mà không cần mẫu"
pattern: "Room eight? / Where's the …? / It's here. / It's over there."
objectives:
  - Nhớ lại con số từ phần nghe
  - Nhớ cách xác nhận lại
  - Hỏi và hiểu vị trí đơn giản
steps:
  - type: scene
    title: "Tìm lại phòng học"
    body: "Bạn quay lại vào một ngày khác và cần tìm phòng mà không nhìn lại ví dụ cũ."
  - type: dialogue
    lines:
      - { speaker: "Staff", text: "Room three." }
      - { speaker: "You", text: "Room three?" }
      - { speaker: "Staff", text: "Yes." }
      - { speaker: "You", text: "Where's room three?" }
      - { speaker: "Staff", text: "It's here." }
  - type: listen
    prompt: "Nghe trước. Bạn nghe thấy số nào?"
    text: "Room eight."
  - type: practice
    id: en-u03-review-number
    kind: listen_type
    prompt: "Nghe rồi nhập từ chỉ số."
    audioText: "eight"
    answer: "eight"
    hints:
      - "Từ này bắt đầu bằng e-."
  - type: practice
    id: en-u03-review-build
    kind: order_words
    prompt: "Sắp xếp thành câu hỏi vị trí."
    tokens: ["café?", "the", "Where's"]
    answer: "Where's the café?"
    acceptedAnswers: ["Where's the cafe?"]
    hints:
      - "Bắt đầu bằng Where's."
  - type: practice
    id: en-u03-review-produce
    kind: type_answer
    prompt: "Công viên ở xa hơn. Viết câu trả lời vị trí ngắn."
    answer: "It's over there"
    acceptedAnswers: ["It's over there.", "It is over there", "It is over there."]
    hints:
      - "Dùng over there."
  - type: checkpoint
    items:
      - id: en-u03-review-confirm
        kind: dialogue_choice
        prompt: "Bạn nghe “Room two.” Câu nào xác nhận lại?"
        choices: ["Room two?", "Who's two?", "This is two."]
        answer: "Room two?"
      - id: en-u03-review-here
        kind: audio_choice
        prompt: "Nghe. Địa điểm ở đâu?"
        audioText: "It's here."
        choices: ["here", "over there", "five"]
        answer: "here"
exercise:
  type: type_answer
  prompt: "Hỏi cửa hàng ở đâu."
  answer: "Where's the shop?"
  acceptedAnswers: ["Where is the shop?"]
---

Ôn bằng cách tự nhớ lại lượt xác nhận số và hỏi vị trí.
