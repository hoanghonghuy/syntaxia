---
id: zh-hsk-b1-u00-tone-changes
track: chinese-hsk
locale: vi
slug: tone-changes
title: "Giữ cách viết, nghe biến điệu"
order: -3
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Nền tảng phát âm"
unit_order: 0
unit_can_do: "Nghe, nhận diện và tái tạo các mẫu âm tiết và thanh điệu nền tảng của tiếng Phổ thông"
unit_role: lesson
can_do: "Nhận ra biến điệu thanh 3 và 不 cơ bản mà không đổi cách ghi Pinyin chuẩn"
pattern: "dấu thanh chuẩn giữ nguyên; thanh bề mặt có thể đổi trong lời nói liền mạch"
objectives:
  - "Phân biệt Pinyin có dấu thanh chuẩn với biến đổi thanh thường gặp khi nói"
  - "Nhận ra mẫu 3 + 3 và mẫu 不 + thanh 4 cơ bản"
vocab:
  - { hanzi: "你好", pinyin: "nǐ hǎo", gloss: "xin chào" }
  - { hanzi: "很好", pinyin: "hěn hǎo", gloss: "rất tốt" }
  - { hanzi: "不是", pinyin: "bù shì", gloss: "không phải" }
steps:
  - type: scene
    title: "Lời nói liền mạch"
    body: "Dấu thanh trong từ điển cho biết thanh từ vựng. Khi nói tự nhiên, các thanh đứng cạnh nhau có thể làm âm nghe được thay đổi."
    imageUrl: "/language/scenes/mandarin-tone-flow.svg"
    imageAlt: "Pinyin chuẩn giữ nguyên trong khi mũi tên thể hiện biến điệu khi nói liền mạch."
  - type: listen
    prompt: "Nghe 你好 và 不是 trong khi vẫn nhìn dạng viết chuẩn."
    text: "你好。不是。"
    reading: "nǐ hǎo. bù shì."
  - type: tip
    title: "Không viết lại theo biến điệu"
    body: "Vẫn viết nǐ hǎo dù thanh 3 đầu thường biến đổi trước một thanh 3 khác. Vẫn viết bù shì dù 不 thường biến đổi trước thanh 4."
  - type: teach
    items:
      - { form: "你好", reading: "nǐ hǎo", gloss: "3 + 3; thanh 3 đầu biến đổi khi nói tự nhiên", example: "你好！" }
      - { form: "很好", reading: "hěn hǎo", gloss: "một mẫu 3 + 3 phổ biến khác", example: "很好。" }
      - { form: "不是", reading: "bù shì", gloss: "不 biến đổi khi nói trước thanh 4", example: "不是。" }
  - type: practice
    id: zh-pron-sandhi-write-nihao
    kind: audio_choice
    prompt: "Nghe 你好 tự nhiên. Cách viết Pinyin chuẩn là gì?"
    audioText: "你好"
    choices: ["nǐ hǎo", "ní hǎo", "nì hǎo"]
    answer: "nǐ hǎo"
  - type: practice
    id: zh-pron-sandhi-write-bushi
    kind: type_answer
    prompt: "Gõ Pinyin có dấu thanh chuẩn của 不是."
    answer: "bù shì"
    hints: ["Giữ dấu thanh từ vựng của 不.", "Không viết lại theo thanh bề mặt."]
  - type: practice
    id: zh-pron-sandhi-hear-henhao
    kind: audio_choice
    prompt: "Nghe 很好. Cách viết Pinyin nào cần được giữ?"
    audioText: "很好"
    choices: ["hěn hǎo", "hén hǎo", "hèn hǎo"]
    answer: "hěn hǎo"
  - type: checkpoint
    items:
      - id: zh-pron-sandhi-check-rule
        kind: meaning_choice
        prompt: "Khi có biến điệu theo ngữ cảnh, Pinyin chuẩn xử lý thế nào?"
        choices: ["Giữ dấu thanh từ vựng", "Viết lại mọi thanh bề mặt", "Bỏ toàn bộ dấu thanh"]
        answer: "Giữ dấu thanh từ vựng"
      - id: zh-pron-sandhi-check-bu
        kind: audio_choice
        prompt: "Nghe 不是. Cách viết chuẩn nào đúng?"
        audioText: "不是"
        choices: ["bù shì", "bú shì", "bǔ shì"]
        answer: "bù shì"
exercise:
  type: type_answer
  prompt: "Gõ Pinyin có dấu thanh chuẩn của 你好."
  answer: "nǐ hǎo"
---

Nhận biết lời nói liền mạch giúp tránh nhầm phát âm tự nhiên với một ngoại lệ chính tả.
