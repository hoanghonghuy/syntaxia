---
id: ja-n5-u02-review
track: japanese-jlpt
locale: vi
slug: people-review
title: "Ôn tập: tự giới thiệu và nói về người thân"
order: 8
published: true
jlpt_level: n5
unit_id: ja-n5-people-02
unit_title: "Tự giới thiệu và nói về người thân"
unit_order: 2
unit_can_do: "Tự giới thiệu, hỏi tên và xác định một người thân trong đoạn trao đổi lịch sự ngắn"
unit_role: review
can_do: "Nhớ lại khung hỏi tên và nói về gia đình với ít gợi ý"
pattern: "わたしは…です。 / お名前は何ですか。 / この人はだれですか。 / 父です。"
objectives:
  - "Nhớ lại khung hỏi tên lịch sự"
  - "Nhớ lại từ chỉ gia đình của mình trong đúng bối cảnh"
steps:
  - type: scene
    title: "Gặp lại"
    body: "Bạn gặp lại một người, tự giới thiệu ngắn rồi cho xem một ảnh gia đình."
  - type: dialogue
    lines:
      - { speaker: "A", text: "わたしはリンです。", reading: "わたしはリンです。" }
      - { speaker: "B", text: "お名前は何ですか。", reading: "おなまえはなんですか。" }
      - { speaker: "A", text: "リンです。この人は父です。", reading: "リンです。このひとはちちです。" }
  - type: listen
    prompt: "Nghe và nhớ lại người thân."
    text: "姉です。"
    reading: "あねです。"
  - type: practice
    id: ja-people-u02-review-listen
    kind: audio_choice
    prompt: "Nghe. Người thân nào được nhắc tới?"
    audioText: "父です"
    choices: ["父", "母", "兄"]
    answer: "父"
  - type: practice
    id: ja-people-u02-review-name
    kind: dialogue_choice
    prompt: "Câu nào hỏi tên một cách lịch sự?"
    choices: ["お名前は何ですか。", "この人はだれですか。", "何番ですか。"]
    answer: "お名前は何ですか。"
  - type: practice
    id: ja-people-u02-review-produce
    kind: type_answer
    prompt: "Tên bạn là ゆき. Hãy nhập một câu tự giới thiệu ngắn."
    answer: "わたしはゆきです"
    acceptedAnswers: ["わたしはゆきです。"]
    hints:
      - "Dùng わたしは + ゆき + です."
  - type: checkpoint
    items:
      - id: ja-people-u02-review-who
        kind: listen_type
        prompt: "Nghe và gõ câu hỏi."
        audioText: "この人はだれですか"
        answer: "この人はだれですか"
        acceptedAnswers: ["この人はだれですか。"]
      - id: ja-people-u02-review-sister
        kind: type_answer
        prompt: "Người này là chị gái của bạn. Hãy nhập câu trả lời ngắn."
        answer: "姉です"
        acceptedAnswers: ["姉です。", "あねです", "あねです。"]
exercise:
  type: type_answer
  prompt: "Người này là mẹ của bạn. Hãy nhập câu trả lời ngắn."
  answer: "母です"
  acceptedAnswers: ["母です。", "ははです", "ははです。"]
---

Phần ôn tập giảm gợi ý và yêu cầu nhớ lại các khung giao tiếp tương tự từ trí nhớ.
