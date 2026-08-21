---
id: en-a1-u02-checkpoint
track: english-basics
locale: vi
slug: people-checkpoint
title: Kiểm tra: giới thiệu người
order: 7
published: true
cefr_level: a1
unit_id: en-a1-people-02
unit_title: "Giới thiệu những người gần gũi"
unit_order: 2
unit_can_do: "Hỏi một người là ai và giới thiệu bạn bè hoặc người thân"
unit_role: checkpoint
can_do: "Xác định một người và giới thiệu bạn bè hoặc người thân với ít hỗ trợ"
pattern: "Who's that? / This is … / He's my … / She's my …"
objectives:
  - Hỏi một người là ai
  - Giới thiệu một người bằng tên hoặc quan hệ
  - Nói thêm một thông tin ngắn về quan hệ
steps:
  - type: scene
    title: "Giới thiệu hai người"
    body: "Một người bạn cùng lớp nhìn thấy hai người trong ảnh. Hãy nói họ là ai rồi giới thiệu một người bằng tên."
  - type: dialogue
    lines:
      - { speaker: "A", text: "Who's that?" }
      - { speaker: "B", text: "That's Mai. She's my friend." }
      - { speaker: "A", text: "And who's this?" }
      - { speaker: "B", text: "This is my brother, Nam." }
  - type: listen
    prompt: "Nghe và xác định mối quan hệ được nhắc tới."
    text: "She's my friend."
  - type: practice
    id: en-u02-check-listen
    kind: audio_choice
    prompt: "Nghe rồi chọn mối quan hệ đúng."
    audioText: "He's my brother."
    choices: ["brother", "friend", "father"]
    answer: "brother"
  - type: practice
    id: en-u02-check-reply
    kind: dialogue_choice
    prompt: "Có người hỏi “Who's that?” Anna là bạn của bạn. Câu nào tự nhiên?"
    choices: ["That's Anna. She's my friend.", "This friend is who?", "Anna is room five."]
    answer: "That's Anna. She's my friend."
    explanation: "Xác định người đó trước rồi nói thêm mối quan hệ."
  - type: practice
    id: en-u02-check-produce
    kind: type_answer
    prompt: "Nam là anh/em trai của bạn. Hãy giới thiệu Nam bằng “This is”."
    answer: "This is my brother Nam"
    acceptedAnswers: ["This is my brother, Nam", "This is my brother Nam.", "This is my brother, Nam."]
    hints:
      - "Dùng This is my + quan hệ + tên."
  - type: checkpoint
    items:
      - id: en-u02-check-question
        kind: dialogue_choice
        prompt: "Câu nào dùng để hỏi một người là ai?"
        choices: ["Who's that?", "Where's that?", "How many is that?"]
        answer: "Who's that?"
      - id: en-u02-check-family
        kind: meaning_choice
        prompt: "Cụm nào chỉ chị/em gái của mình?"
        choices: ["my sister", "my mother", "my friend"]
        answer: "my sister"
exercise:
  type: type_answer
  prompt: "Giới thiệu Nam là anh/em trai của bạn."
  answer: "This is my brother Nam"
  acceptedAnswers: ["This is my brother, Nam", "This is my brother Nam.", "This is my brother, Nam."]
---

Dùng các mẫu câu ngắn để xác định và giới thiệu người thật trong tình huống.
