---
id: ja-n5-u05-checkpoint
track: japanese-jlpt
locale: vi
slug: location-checkpoint
title: "Checkpoint: hỏi một địa điểm ở đâu"
order: 13
published: true
jlpt_level: n5
unit_id: ja-n5-location-05
unit_title: "Hỏi một địa điểm ở đâu"
unit_order: 5
unit_can_do: "Hỏi một địa điểm quen thuộc ở đâu và hiểu câu trả lời vị trí ngắn theo góc nhìn"
unit_role: checkpoint
can_do: "Hỏi một địa điểm và hiểu ここ・そこ・あそこ với ít hỗ trợ"
pattern: "Nはどこですか。 / ここです。 / そこです。 / あそこです。"
objectives:
  - "Tự tạo câu hỏi vị trí"
  - "Hiểu câu trả lời ngắn dựa trên góc nhìn"
steps:
  - type: scene
    title: "Tại nhà ga"
    body: "Hỏi nhân viên nhà vệ sinh hoặc lối ra ở đâu rồi hiểu câu trả lời kèm chỉ hướng."
  - type: dialogue
    lines:
      - { speaker: "A", text: "すみません。トイレはどこですか。", reading: "すみません。トイレはどこですか。" }
      - { speaker: "B", text: "あそこです。", reading: "あそこです。" }
      - { speaker: "A", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe trước. Từ chỉ vị trí nào được dùng?"
    text: "そこです。"
    reading: "そこです。"
  - type: practice
    id: ja-location-u05-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn từ chỉ vị trí."
    audioText: "あそこです"
    choices: ["あそこ", "ここ", "そこ"]
    answer: "あそこ"
  - type: practice
    id: ja-location-u05-check-question
    kind: type_answer
    prompt: "Gõ câu: “Nhà vệ sinh ở đâu?”"
    answer: "トイレはどこですか"
    acceptedAnswers: ["トイレはどこですか。"]
    hints:
      - "Dùng トイレ + は + どこ + ですか."
  - type: practice
    id: ja-location-u05-check-near-speaker
    kind: dialogue_choice
    prompt: "Địa điểm ở ngay cạnh người nói. Câu trả lời nào phù hợp?"
    choices: ["ここです。", "そこです。", "あそこです。"]
    answer: "ここです。"
  - type: checkpoint
    items:
      - id: ja-location-u05-check-station
        kind: type_answer
        prompt: "Gõ câu hỏi: “Nhà ga ở đâu?”"
        answer: "駅はどこですか"
        acceptedAnswers: ["駅はどこですか。"]
      - id: ja-location-u05-check-far
        kind: listen_type
        prompt: "Nghe và gõ đầy đủ câu trả lời vị trí."
        audioText: "あそこです"
        answer: "あそこです"
        acceptedAnswers: ["あそこです。"]
exercise:
  type: type_answer
  prompt: "Địa điểm ở gần người nghe. Hãy nhập câu trả lời ngắn."
  answer: "そこです"
  acceptedAnswers: ["そこです。"]
---

Checkpoint giữ các từ chỉ vị trí gắn với góc nhìn và một câu hỏi địa điểm thực tế.
