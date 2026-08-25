---
id: ja-n5-u05-review
track: japanese-jlpt
locale: vi
slug: location-review
title: "Ôn tập: hỏi một địa điểm ở đâu"
order: 14
published: true
jlpt_level: n5
unit_id: ja-n5-location-05
unit_title: "Hỏi một địa điểm ở đâu"
unit_order: 5
unit_can_do: "Hỏi một địa điểm quen thuộc ở đâu và hiểu câu trả lời vị trí ngắn theo góc nhìn"
unit_role: review
can_do: "Nhớ lại câu hỏi vị trí và các từ theo góc nhìn với ít gợi ý"
pattern: "Nはどこですか。 / ここです。 / そこです。 / あそこです。"
objectives:
  - "Nhớ lại Nはどこですか từ trí nhớ"
  - "Chọn và tự tạo từ chỉ vị trí theo góc nhìn"
steps:
  - type: scene
    title: "Tìm một địa điểm khác"
    body: "Bạn cần tìm một địa điểm khác ở nhà ga. Hãy hỏi khi không có câu mẫu rồi hiểu câu trả lời ngắn."
  - type: dialogue
    lines:
      - { speaker: "A", text: "駅はどこですか。", reading: "えきはどこですか。" }
      - { speaker: "B", text: "そこです。", reading: "そこです。" }
      - { speaker: "A", text: "ありがとうございます。", reading: "ありがとうございます。" }
  - type: listen
    prompt: "Nghe và nhớ lại từ chỉ góc nhìn."
    text: "ここです。"
    reading: "ここです。"
  - type: practice
    id: ja-location-u05-review-listen
    kind: audio_choice
    prompt: "Nghe. Bạn nghe từ chỉ vị trí nào?"
    audioText: "そこです"
    choices: ["そこ", "ここ", "あそこ"]
    answer: "そこ"
  - type: practice
    id: ja-location-u05-review-question
    kind: type_answer
    prompt: "Gõ câu: “Nhà ga ở đâu?”"
    answer: "駅はどこですか"
    acceptedAnswers: ["駅はどこですか。"]
    hints:
      - "Dùng 駅 + は + どこ + ですか."
  - type: practice
    id: ja-location-u05-review-far
    kind: dialogue_choice
    prompt: "Địa điểm ở xa cả hai người. Câu trả lời nào phù hợp?"
    choices: ["あそこです。", "ここです。", "そこです。"]
    answer: "あそこです。"
  - type: checkpoint
    items:
      - id: ja-location-u05-review-restroom
        kind: listen_type
        prompt: "Nghe và gõ đầy đủ câu hỏi."
        audioText: "トイレはどこですか"
        answer: "トイレはどこですか"
        acceptedAnswers: ["トイレはどこですか。"]
      - id: ja-location-u05-review-here
        kind: type_answer
        prompt: "Địa điểm ở ngay cạnh bạn, người nói. Hãy nhập câu trả lời ngắn."
        answer: "ここです"
        acceptedAnswers: ["ここです。"]
exercise:
  type: type_answer
  prompt: "Địa điểm ở xa cả hai người. Hãy nhập câu trả lời ngắn."
  answer: "あそこです"
  acceptedAnswers: ["あそこです。"]
---

Phần ôn tập giảm phần hỗ trợ và vẫn giữ ここ・そこ・あそこ gắn với góc nhìn thay vì các bản dịch rời.
