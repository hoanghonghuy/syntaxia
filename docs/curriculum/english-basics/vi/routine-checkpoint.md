---
id: en-a1-u05-checkpoint
track: english-basics
locale: vi
slug: routine-checkpoint
title: Checkpoint lịch sinh hoạt
order: 17
published: true
cefr_level: a1
unit_id: en-a1-routine-05
unit_title: "Nói về một ngày của mình"
unit_order: 5
unit_can_do: "Hỏi về lịch sinh hoạt đơn giản và nói khi nào các hoạt động quen thuộc diễn ra"
unit_role: checkpoint
can_do: "Hỏi giờ của một thói quen và nói lịch hai bước với rất ít hỗ trợ"
pattern: "What time do you …? / I … at … / Then I …"
objectives:
  - Hiểu giờ trong một lịch sinh hoạt đơn giản
  - Hỏi khi nào một hoạt động quen thuộc diễn ra
  - Tự nói một chuỗi hai bước trong ngày
steps:
  - type: scene
    title: "Lên lịch buổi sáng"
    body: "Bạn và một bạn cùng lớp cần so sánh lịch buổi sáng trước khi gặp nhau."
    visualKey: "student-studying"
    imageAlt: "Một người học xem lịch buổi sáng ngắn ở bàn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "What time do you have breakfast?" }
      - { speaker: "B", text: "At seven. Then I go to school at eight." }
      - { speaker: "A", text: "Great. See you at eight." }
  - type: listen
    prompt: "Nghe. Hoạt động nào diễn ra trước?"
    text: "I have breakfast at seven. Then I go to school at eight."
  - type: practice
    id: en-u05-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn hoạt động đầu tiên."
    audioText: "I have breakfast at seven. Then I go to work at eight."
    choices: ["have breakfast", "go to work", "go home"]
    answer: "have breakfast"
  - type: practice
    id: en-u05-check-reply
    kind: dialogue_choice
    prompt: "Có người hỏi “What time do you go to work?” Bạn đi làm lúc 8:00. Câu nào tự nhiên?"
    choices: ["I go to work at eight.", "I work is eight.", "At work who?"]
    answer: "I go to work at eight."
  - type: practice
    id: en-u05-check-produce
    kind: type_answer
    prompt: "Nói: bạn ăn sáng lúc 7 giờ, sau đó đi học lúc 8 giờ."
    answer: "I have breakfast at seven. Then I go to school at eight."
    acceptedAnswers: ["I have breakfast at seven then I go to school at eight", "I have breakfast at seven, then I go to school at eight."]
    hints:
      - "Bắt đầu bằng I have breakfast at seven."
      - "Dùng Then I … cho hoạt động tiếp theo."
  - type: checkpoint
    items:
      - id: en-u05-check-time-question
        kind: dialogue_choice
        prompt: "Câu nào hỏi khi nào một thói quen diễn ra?"
        choices: ["What time do you have breakfast?", "What breakfast is time?", "Who is breakfast?"]
        answer: "What time do you have breakfast?"
      - id: en-u05-check-time-phrase
        kind: order_words
        prompt: "Ghép câu chỉ giờ."
        tokens: ["at eight", "I go", "to school"]
        answer: "I go to school at eight"
        acceptedAnswers: ["I go to school at eight."]
exercise:
  type: type_answer
  prompt: "Viết lịch buổi sáng hai bước: ăn sáng lúc 7 giờ, đi học lúc 8 giờ."
  answer: "I have breakfast at seven. Then I go to school at eight."
  acceptedAnswers: ["I have breakfast at seven then I go to school at eight", "I have breakfast at seven, then I go to school at eight."]
---

Hoàn thành checkpoint như một cuộc trao đổi lịch ngắn, không phải các từ chỉ giờ rời rạc.
