---
id: ja-n5-u08-checkpoint
track: japanese-jlpt
locale: vi
slug: train-checkpoint
title: Checkpoint đi tàu
order: 24
published: true
jlpt_level: n5
unit_id: ja-n5-train-08
unit_title: "Di chuyển bằng tàu"
unit_order: 8
unit_can_do: "Kiểm tra điểm đến của một chuyến tàu đơn giản và hiểu phải xuống ở đâu hoặc lúc nào"
unit_role: checkpoint
can_do: "Lấy thông tin điểm đến và nơi xuống từ một hội thoại ngắn ở ga"
pattern: "この電車は…に行きますか。 / 次の駅で降ります。"
objectives:
  - Xác nhận điểm đến
  - Phân biệt 乗る và 降りる
  - Tự tạo một câu hỏi ở ga
steps:
  - type: scene
    title: "Chọn đúng tàu"
    body: "Có hai tàu ở sân ga. Hỏi trước khi lên và nghe thông tin ga tiếp theo."
  - type: dialogue
    lines:
      - { speaker: "A", text: "この電車は新宿駅に行きますか。", reading: "この でんしゃは しんじゅくえきに いきますか。" }
      - { speaker: "B", text: "はい。次の駅です。", reading: "はい。つぎの えきです。" }
  - type: listen
    prompt: "Nghe. Điểm đến có phải ga tiếp theo không?"
    text: "はい。次の駅です。"
    reading: "はい。つぎの えきです。"
  - type: practice
    id: ja-u08-check-next
    kind: audio_choice
    prompt: "Nghe. Bạn nghe thông tin ga nào?"
    audioText: "次の駅です"
    choices: ["ga tiếp theo", "ga cuối", "không có ga"]
    answer: "ga tiếp theo"
  - type: practice
    id: ja-u08-check-verb
    kind: dialogue_choice
    prompt: "Bạn đang rời tàu. Động từ nào phù hợp?"
    choices: ["降ります", "乗ります", "起きます"]
    answer: "降ります"
  - type: practice
    id: ja-u08-check-produce
    kind: type_answer
    prompt: "Gõ: Tàu này có đi Tokyo Station không?"
    answer: "この電車は東京駅に行きますか"
    acceptedAnswers: ["この電車は東京駅に行きますか。"]
    hints:
      - "この電車は + tên ga + に行きますか."
  - type: checkpoint
    items:
      - id: ja-u08-check-off
        kind: listen_type
        prompt: "Nghe và gõ chỉ dẫn."
        audioText: "次の駅で降ります"
        answer: "次の駅で降ります"
        acceptedAnswers: ["次の駅で降ります。"]
      - id: ja-u08-check-ticket
        kind: meaning_choice
        prompt: "Từ nào nghĩa là vé?"
        choices: ["切符", "宿題", "午後"]
        answer: "切符"
exercise:
  type: type_answer
  prompt: "Nói: Xuống ở ga tiếp theo."
  answer: "次の駅で降ります"
  acceptedAnswers: ["次の駅で降ります。"]
---

Checkpoint buộc người học nhớ câu hỏi di chuyển và hành động dựa trên thông tin nghe ngắn.
