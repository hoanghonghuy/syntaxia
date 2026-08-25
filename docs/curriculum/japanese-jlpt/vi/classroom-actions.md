---
id: ja-n5-20-classroom-actions
track: japanese-jlpt
locale: vi
slug: classroom-actions
title: Làm theo chỉ dẫn đơn giản trong lớp
order: 20
published: true
jlpt_level: n5
unit_id: ja-n5-classroom-07
unit_title: "Xử lý một tương tác đơn giản trong lớp"
unit_order: 7
unit_can_do: "Hiểu một chỉ dẫn ngắn trong lớp và xin nhắc lại khi cần"
unit_role: lesson
can_do: "Hiểu chỉ dẫn đọc/viết và xin giáo viên nói lại một lần"
pattern: "読んでください。 / 書いてください。 / もう一度お願いします。"
objectives:
  - Hiểu một yêu cầu lớp học đơn giản kết thúc bằng ください
  - Phân biệt 読む và 書く từ ngữ cảnh
  - Xin nhắc lại một cách lịch sự
vocab:
  - { surface: "授業", reading: "じゅぎょう", gloss: "tiết học; lớp học" }
  - { surface: "宿題", reading: "しゅくだい", gloss: "bài tập về nhà" }
  - { surface: "読む", reading: "よむ", gloss: "đọc" }
  - { surface: "書く", reading: "かく", gloss: "viết" }
  - { surface: "先生", reading: "せんせい", gloss: "giáo viên" }
  - { surface: "教室", reading: "きょうしつ", gloss: "phòng học" }
  - { surface: "もう一度", reading: "もういちど", gloss: "một lần nữa" }
steps:
  - type: scene
    title: "Giáo viên giao nhiệm vụ tiếp theo"
    body: "Trong giờ học, giáo viên đưa ra một chỉ dẫn ngắn. Bạn cần làm đúng hoặc xin nhắc lại."
    visualKey: "student-studying"
    imageAlt: "Người học ngồi ở bàn, đọc và viết trong lớp."
  - type: dialogue
    lines:
      - { speaker: "先生", text: "この文章を読んでください。", reading: "この ぶんしょうを よんでください。" }
      - { speaker: "学生", text: "すみません。もう一度お願いします。", reading: "すみません。もういちど おねがいします。" }
      - { speaker: "先生", text: "この文章を読んでください。", reading: "この ぶんしょうを よんでください。" }
      - { speaker: "学生", text: "はい。", reading: "はい。" }
  - type: listen
    prompt: "Nghe một lần. Giáo viên yêu cầu đọc hay viết?"
    text: "この文章を読んでください。"
    reading: "この ぶんしょうを よんでください。"
  - type: tip
    title: "Dùng thể て + ください cho yêu cầu đơn giản"
    body: "Ở N5, hãy nghe hành động đứng trước ください. 読んでください là hãy đọc; 書いてください là hãy viết."
  - type: teach
    items:
      - { form: "読んでください。", reading: "よんでください。", gloss: "Hãy đọc.", example: "この文章を読んでください。" }
      - { form: "書いてください。", reading: "かいてください。", gloss: "Hãy viết.", example: "名前を書いてください。" }
      - { form: "もう一度お願いします。", reading: "もういちど おねがいします。", gloss: "Xin nhắc lại một lần.", example: "すみません。もう一度お願いします。" }
  - type: practice
    id: ja-u07-class-listen
    kind: audio_choice
    prompt: "Nghe. Người học cần làm gì?"
    audioText: "名前を書いてください"
    choices: ["viết", "đọc", "rời đi"]
    answer: "viết"
  - type: practice
    id: ja-u07-class-reply
    kind: dialogue_choice
    prompt: "Bạn không nghe rõ giáo viên. Câu nào hữu ích?"
    choices: ["もう一度お願いします。", "駅はどこですか。", "十時に寝ます。"]
    answer: "もう一度お願いします。"
  - type: practice
    id: ja-u07-class-produce
    kind: type_answer
    prompt: "Gõ: Hãy đọc."
    answer: "読んでください"
    acceptedAnswers: ["読んでください。"]
    hints:
      - "Dùng 読んで + ください."
  - type: checkpoint
    items:
      - id: ja-u07-class-check-write
        kind: listen_type
        prompt: "Nghe và gõ lại chỉ dẫn."
        audioText: "書いてください"
        answer: "書いてください"
        acceptedAnswers: ["書いてください。"]
      - id: ja-u07-class-check-homework
        kind: meaning_choice
        prompt: "Từ nào nghĩa là bài tập về nhà?"
        choices: ["宿題", "電車", "午後"]
        answer: "宿題"
exercise:
  type: type_answer
  prompt: "Xin giáo viên nói lại một lần."
  answer: "もう一度お願いします"
  acceptedAnswers: ["もう一度お願いします。", "すみません。もう一度お願いします。"]
---

Mục tiêu là sống được trong tương tác lớp học: nhận đúng hành động và sửa hội thoại khi nghe hụt.
