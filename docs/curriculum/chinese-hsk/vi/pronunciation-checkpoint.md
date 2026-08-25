---
id: zh-hsk-b1-u00-checkpoint
track: chinese-hsk
locale: vi
slug: pronunciation-checkpoint
title: "Checkpoint nền tảng phát âm"
order: -2
published: true
hsk_band: 1
hsk_version: "3.0"
foundation_focus: pronunciation
unit_id: zh-hsk-b1-pronunciation-00
unit_title: "Nền tảng phát âm"
unit_order: 0
unit_can_do: "Nghe, nhận diện và tái tạo các mẫu âm tiết và thanh điệu nền tảng của tiếng Phổ thông"
unit_role: checkpoint
can_do: "Chọn và tạo Pinyin có dấu thanh cho các âm cơ bản mà không cần bảng tham chiếu"
pattern: "phần âm tiết -> thanh điệu -> cách viết chuẩn"
objectives: ["Kiểm tra khả năng giải mã âm tiết Pinyin", "Kiểm tra nhận diện thanh và cách viết chuẩn khi có biến điệu"]
steps:
  - type: scene
    title: "Kiểm tra âm thanh"
    body: "Không có hội thoại để học thuộc. Chỉ dùng tai nghe và chính hệ thống Pinyin."
    imageUrl: "/language/scenes/mandarin-tone-ladder.svg"
    imageAlt: "Thang thanh điệu tiếng Phổ thông dùng làm điểm tựa cho checkpoint nghe."
  - type: listen
    prompt: "Nghe một lần trước khi trả lời: 你, 好, 是, 吗."
    text: "你，好，是，吗"
    reading: "nǐ, hǎo, shì, ma"
  - type: practice
    id: zh-pron-checkpoint-hear-hao
    kind: audio_choice
    prompt: "Nghe 好. Chọn Pinyin đúng."
    audioText: "好"
    choices: ["hǎo", "háo", "hào"]
    answer: "hǎo"
  - type: practice
    id: zh-pron-checkpoint-neutral-ma
    kind: type_answer
    prompt: "Gõ Pinyin của 吗 ở thanh nhẹ."
    answer: "ma"
  - type: practice
    id: zh-pron-checkpoint-spell-nihao
    kind: type_answer
    prompt: "Gõ Pinyin có dấu thanh chuẩn của 你好."
    answer: "nǐ hǎo"
  - type: checkpoint
    items:
      - id: zh-pron-checkpoint-tone-shi
        kind: audio_choice
        prompt: "Nghe 是. Chọn Pinyin đúng."
        audioText: "是"
        choices: ["shī", "shí", "shì"]
        answer: "shì"
      - id: zh-pron-checkpoint-sandhi-rule
        kind: meaning_choice
        prompt: "Có viết nǐ hǎo thành ní hǎo chỉ vì biến điệu 3 + 3 khi nói không?"
        choices: ["Không — giữ nǐ hǎo", "Có — luôn viết ní hǎo", "Bỏ cả hai dấu thanh"]
        answer: "Không — giữ nǐ hǎo"
exercise:
  type: type_answer
  prompt: "Gõ Pinyin chuẩn của 你好."
  answer: "nǐ hǎo"
---

Checkpoint này xác minh nền tảng âm thanh trước khi bắt đầu unit giao tiếp 1.
