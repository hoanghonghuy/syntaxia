---
id: ja-n5-u08-review
track: japanese-jlpt
locale: vi
slug: train-review
title: "Ôn tập: di chuyển bằng tàu"
order: 25
published: true
jlpt_level: n5
unit_id: ja-n5-train-08
unit_title: "Di chuyển bằng tàu"
unit_order: 8
unit_can_do: "Kiểm tra điểm đến của một chuyến tàu đơn giản và hiểu phải xuống ở đâu hoặc lúc nào"
unit_role: review
can_do: "Nhớ lại câu hỏi điểm đến và chỉ dẫn xuống tàu mà không nhìn mẫu"
pattern: "この電車は…に行きますか。 / 次の駅で降ります。"
objectives:
  - Nhớ lại câu hỏi điểm đến
  - Nhận ra chỉ dẫn ga tiếp theo
  - Tự tạo câu xuống tàu từ trí nhớ
steps:
  - type: scene
    title: "Một sân ga khác"
    body: "Bạn lại đi tàu. Hỏi và đáp bằng các cụm di chuyển đã học từ trí nhớ."
  - type: dialogue
    lines:
      - { speaker: "A", text: "この電車は東京駅に行きますか。", reading: "この でんしゃは とうきょうえきに いきますか。" }
      - { speaker: "B", text: "はい。次の駅です。", reading: "はい。つぎの えきです。" }
  - type: listen
    prompt: "Nghe hành động ở ga tiếp theo."
    text: "次の駅で降ります。"
    reading: "つぎの えきで おります。"
  - type: practice
    id: ja-u08-review-action
    kind: audio_choice
    prompt: "Nghe. Bạn nghe hành động nào?"
    audioText: "電車に乗ります"
    choices: ["lên/đi tàu", "xuống tàu", "viết"]
    answer: "lên/đi tàu"
  - type: practice
    id: ja-u08-review-question
    kind: type_answer
    prompt: "Hỏi tàu này có đi Tokyo Station không."
    answer: "この電車は東京駅に行きますか"
    acceptedAnswers: ["この電車は東京駅に行きますか。"]
  - type: practice
    id: ja-u08-review-off
    kind: type_answer
    prompt: "Nói: Xuống ở ga tiếp theo."
    answer: "次の駅で降ります"
    acceptedAnswers: ["次の駅で降ります。"]
  - type: checkpoint
    items:
      - id: ja-u08-review-next
        kind: listen_type
        prompt: "Nghe và gõ câu trả lời ngắn."
        audioText: "次の駅です"
        answer: "次の駅です"
        acceptedAnswers: ["次の駅です。"]
      - id: ja-u08-review-ticket
        kind: meaning_choice
        prompt: "Bạn cần vé tàu. Từ nào cần nhận ra?"
        choices: ["切符", "授業", "朝"]
        answer: "切符"
exercise:
  type: type_answer
  prompt: "Nhớ lại chỉ dẫn xuống tàu."
  answer: "次の駅で降ります"
  acceptedAnswers: ["次の駅で降ります。"]
---

Ôn cách quãng giữ các cụm di chuyển sẵn sàng cho lần tương tác ở ga sau.
