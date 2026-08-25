---
id: zh-hsk-b1-u04-review
track: chinese-hsk
locale: vi
slug: study-review
title: "Ôn lại: lên kế hoạch khi nào và ở đâu để học"
order: 8
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-study-04
unit_title: "Lên kế hoạch khi nào và ở đâu để học"
unit_order: 4
unit_can_do: "Nói khi nào và ở đâu mình học tiếng Trung và xác nhận một kế hoạch học đơn giản"
unit_role: review
can_do: "Tự nhớ lại một câu thời gian–nơi chốn–học mà không cần mẫu"
pattern: "我明天…在…学习汉语。"
objectives:
  - "Nhớ lại cụm thời gian và nơi chốn từ âm thanh"
  - "Tự dựng lại một câu kế hoạch học đầy đủ"
steps:
  - type: scene
    title: "Nhớ lại kế hoạch"
    body: "Sau đó một bạn học lại hỏi kế hoạch học của bạn. Hãy trả lời mà không chép theo mẫu."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你明天下午学习汉语吗？", reading: "nǐ míng tiān xià wǔ xué xí hàn yǔ ma" }
      - { speaker: "B", text: "学习。我明天下午在学校学习汉语。", reading: "xué xí. wǒ míng tiān xià wǔ zài xué xiào xué xí hàn yǔ" }
      - { speaker: "A", text: "好，明天见。", reading: "hǎo, míng tiān jiàn" }
  - type: listen
    prompt: "Nghe trước khi đọc. Xác định cả thời gian và nơi chốn."
    text: "我今天上午在学校学习汉语。"
    reading: "wǒ jīn tiān shàng wǔ zài xué xiào xué xí hàn yǔ"
  - type: practice
    id: zh-study-u04-review-listen
    kind: audio_choice
    prompt: "Nghe. Bạn nghe kế hoạch nào?"
    audioText: "我明天下午在学校学习汉语。"
    choices: ["明天下午 + 学校", "今天上午 + 家", "昨天晚上 + 商店"]
    answer: "明天下午 + 学校"
  - type: practice
    id: zh-study-u04-review-reply
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你明天上午在哪里学习汉语？ Câu nào trả lời đầy đủ?"
    choices: ["我明天上午在学校学习汉语。", "明天。", "学校。"]
    answer: "我明天上午在学校学习汉语。"
  - type: practice
    id: zh-study-u04-review-produce
    kind: type_answer
    prompt: "Gõ câu: “Tôi học tiếng Trung ở trường vào chiều nay.”"
    answer: "我今天下午在学校学习汉语"
    acceptedAnswers: ["我今天下午在学校学习汉语。"]
    hints:
      - "Dùng 我 + 今天下午 + 在学校 + 学习汉语."
  - type: checkpoint
    items:
      - id: zh-study-u04-review-when
        kind: audio_choice
        prompt: "Nghe. Bạn nghe cụm thời gian nào?"
        audioText: "明天上午"
        choices: ["明天上午", "今天晚上", "昨天下午"]
        answer: "明天上午"
      - id: zh-study-u04-review-where
        kind: dialogue_choice
        prompt: "Câu nào cho biết việc học xảy ra ở đâu?"
        choices: ["我在学校学习汉语。", "我是学生。", "明天见。"]
        answer: "我在学校学习汉语。"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Tôi học vào chiều mai.”"
  answer: "我明天下午学习"
  acceptedAnswers: ["我明天下午学习。"]
---

Ôn lại là tự truy xuất: ghép khi nào + ở đâu + học thành một câu, không quay lại học danh sách từ rời.
