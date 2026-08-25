---
id: zh-hsk-b1-u10-checkpoint
track: chinese-hsk
locale: vi
slug: weather-checkpoint
title: "Checkpoint: nói về thời tiết"
order: 17
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-weather-10
unit_title: "Nói về thời tiết hôm nay"
unit_order: 10
unit_can_do: "Hỏi thời tiết đơn giản, hiểu câu trả lời ngắn và dùng thông tin đó cho một kế hoạch cơ bản"
unit_role: checkpoint
can_do: "Lấy một thông tin thời tiết và tự tạo câu trả lời đơn giản với ít hỗ trợ"
pattern: "天气怎么样？ / 很冷 / 很热 / 下雨"
objectives:
  - Lấy thông tin nóng/lạnh/mưa từ audio ngắn
  - Chọn câu trả lời tự nhiên cho câu hỏi thời tiết
  - Tự tạo một câu thời tiết đầy đủ
steps:
  - type: scene
    title: "Kiểm tra trước khi ra ngoài"
    body: "Một người bạn hỏi thời tiết. Nghe thông tin chính rồi trả lời tự nhiên."
  - type: dialogue
    lines:
      - { speaker: "A", text: "今天天气怎么样？", reading: "jīn tiān tiān qì zěn me yàng" }
      - { speaker: "B", text: "今天很热。", reading: "jīn tiān hěn rè" }
  - type: listen
    prompt: "Nghe. Trời nóng, lạnh hay mưa?"
    text: "今天很热。"
    reading: "jīn tiān hěn rè"
  - type: practice
    id: zh-weather-u10-check-listen
    kind: audio_choice
    prompt: "Nghe và chọn thông tin thời tiết."
    audioText: "今天下雨。"
    choices: ["下雨", "很热", "很冷"]
    answer: "下雨"
  - type: practice
    id: zh-weather-u10-check-reply
    kind: dialogue_choice
    prompt: "Câu nào trả lời tự nhiên cho 今天天气怎么样？"
    choices: ["今天很冷。", "我是天气。", "天气多少钱？"]
    answer: "今天很冷。"
  - type: practice
    id: zh-weather-u10-check-produce
    kind: type_answer
    prompt: "Gõ: “Hôm nay nóng.”"
    answer: "今天很热"
    acceptedAnswers: ["今天很热。"]
    hints:
      - "Dùng 今天 + 很热."
  - type: checkpoint
    items:
      - id: zh-weather-u10-check-rain
        kind: listen_type
        prompt: "Nghe và gõ cả câu."
        audioText: "今天下雨。"
        answer: "今天下雨"
        acceptedAnswers: ["今天下雨。"]
      - id: zh-weather-u10-check-tomorrow
        kind: dialogue_choice
        prompt: "Câu ngắn nào chuyển chủ đề sang ngày mai?"
        choices: ["明天呢？", "谁呢？", "多少钱呢？"]
        answer: "明天呢？"
exercise:
  type: type_answer
  prompt: "Nói: Hôm nay lạnh."
  answer: "今天很冷"
  acceptedAnswers: ["今天很冷。"]
---

Checkpoint yêu cầu vừa lấy thông tin hữu ích vừa tạo câu trả lời đầy đủ ở mức cơ bản.
