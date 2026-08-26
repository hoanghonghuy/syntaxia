---
id: en-a1-u02-review
track: english-basics
locale: vi
slug: people-review
title: "Ôn tập: giới thiệu người"
order: 8
published: true
cefr_level: a1
unit_id: en-a1-people-02
unit_title: "Giới thiệu những người gần gũi"
unit_order: 2
unit_can_do: "Hỏi một người là ai và giới thiệu bạn bè hoặc người thân"
unit_role: review
can_do: "Nhớ lại cách xác định và giới thiệu một người mà không cần mẫu"
pattern: "Who's that? / This is … / He's my … / She's my …"
objectives:
  - Nhớ lại câu hỏi dùng để xác định một người
  - Nhớ lại cách giới thiệu bạn bè và người thân
  - Tự viết một câu giới thiệu ngắn
steps:
  - type: scene
    title: "Nhớ lại cách giới thiệu"
    body: "Bạn gặp lại những người quen. Hãy tự nhớ câu hỏi và cách giới thiệu phù hợp."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Who's that?" }
      - { speaker: "B", text: "That's Linh. She's my friend." }
      - { speaker: "A", text: "And who's this?" }
      - { speaker: "B", text: "This is my sister, Mai." }
  - type: listen
    prompt: "Nghe trước. Mối quan hệ nào được nhắc tới?"
    text: "This is my sister, Mai."
  - type: practice
    id: en-u02-review-listen
    kind: listen_type
    prompt: "Nghe rồi nhập từ chỉ mối quan hệ."
    audioText: "brother"
    answer: "brother"
    hints:
      - "Từ này bắt đầu bằng br-."
  - type: practice
    id: en-u02-review-build
    kind: order_words
    prompt: "Sắp xếp thành câu giới thiệu."
    tokens: ["friend", "my", "She's"]
    answer: "She's my friend"
    acceptedAnswers: ["She's my friend."]
    hints:
      - "Bắt đầu bằng She's."
  - type: practice
    id: en-u02-review-produce
    kind: type_answer
    prompt: "Mai là chị/em gái của bạn. Hãy giới thiệu Mai bằng “This is”."
    answer: "This is my sister Mai"
    acceptedAnswers: ["This is my sister, Mai", "This is my sister Mai.", "This is my sister, Mai."]
    hints:
      - "Dùng This is my + quan hệ + tên."
  - type: checkpoint
    items:
      - id: en-u02-review-who
        kind: dialogue_choice
        prompt: "Bạn không biết người ở phía bên kia phòng là ai. Có thể hỏi gì?"
        choices: ["Who's that?", "Where is that person?", "Anything else?"]
        answer: "Who's that?"
      - id: en-u02-review-intro
        kind: dialogue_choice
        prompt: "Câu nào giới thiệu Daniel tự nhiên?"
        choices: ["This is Daniel.", "Who's Daniel?", "Where's Daniel?"]
        answer: "This is Daniel."
exercise:
  type: dialogue_choice
  prompt: "Chọn câu giới thiệu tự nhiên."
  choices: ["This is my sister, Mai.", "Is Mai your sister?", "Where is Mai?"]
  answer: "This is my sister, Mai."
---

Ôn bằng cách tự nhớ câu hỏi và câu giới thiệu, không đọc lại phần giải thích.
