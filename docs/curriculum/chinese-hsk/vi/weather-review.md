---
id: zh-hsk-b1-u10-review
track: chinese-hsk
locale: vi
slug: weather-review
title: "Ôn tập: nói về thời tiết"
order: 18
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-weather-10
unit_title: "Nói về thời tiết hôm nay"
unit_order: 10
unit_can_do: "Hỏi thời tiết đơn giản, hiểu câu trả lời ngắn và dùng thông tin đó cho một kế hoạch cơ bản"
unit_role: review
can_do: "Nhớ lại câu hỏi và câu trả lời về thời tiết từ trí nhớ"
pattern: "今天天气怎么样？ / 今天很冷。 / 今天下雨。"
objectives:
  - Nhớ lại câu hỏi thời tiết
  - Nhận ra một thông tin thời tiết từ audio
  - Tự tạo câu trả lời mà không nhìn mẫu
steps:
  - type: scene
    title: "Kiểm tra lại thời tiết"
    body: "Một người bạn hỏi lại vào ngày khác. Trả lời mà không nhìn bài trước."
  - type: dialogue
    lines:
      - { speaker: "A", text: "今天天气怎么样？", reading: "jīn tiān tiān qì zěn me yàng" }
      - { speaker: "B", text: "今天下雨。", reading: "jīn tiān xià yǔ" }
  - type: listen
    prompt: "Nghe và xác định thời tiết."
    text: "今天很冷。"
    reading: "jīn tiān hěn lěng"
  - type: practice
    id: zh-weather-u10-review-listen
    kind: audio_choice
    prompt: "Nghe. Bạn nghe thông tin nào?"
    audioText: "今天很冷。"
    choices: ["很冷", "很热", "下雨"]
    answer: "很冷"
  - type: practice
    id: zh-weather-u10-review-question
    kind: dialogue_choice
    prompt: "Câu nào hỏi thời tiết?"
    choices: ["今天天气怎么样？", "你叫什么名字？", "你怎么去？"]
    answer: "今天天气怎么样？"
  - type: practice
    id: zh-weather-u10-review-produce
    kind: type_answer
    prompt: "Gõ từ trí nhớ: “Hôm nay trời mưa.”"
    answer: "今天下雨"
    acceptedAnswers: ["今天下雨。"]
  - type: checkpoint
    items:
      - id: zh-weather-u10-review-hot
        kind: type_answer
        prompt: "Gõ: “Hôm nay nóng.”"
        answer: "今天很热"
        acceptedAnswers: ["今天很热。"]
      - id: zh-weather-u10-review-cold
        kind: listen_type
        prompt: "Nghe và gõ cả câu."
        audioText: "今天很冷。"
        answer: "今天很冷"
        acceptedAnswers: ["今天很冷。"]
exercise:
  type: type_answer
  prompt: "Hỏi từ trí nhớ: Hôm nay thời tiết thế nào?"
  answer: "今天天气怎么样"
  acceptedAnswers: ["今天天气怎么样？"]
---

Ôn cách quãng giữ cặp hỏi-đáp thời tiết sẵn sàng cho lần dùng thực tế sau.
