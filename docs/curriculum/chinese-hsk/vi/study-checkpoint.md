---
id: zh-hsk-b1-u04-checkpoint
track: chinese-hsk
locale: vi
slug: study-checkpoint
title: "Checkpoint: lên kế hoạch khi nào và ở đâu để học"
order: 7
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-study-04
unit_title: "Lên kế hoạch khi nào và ở đâu để học"
unit_order: 4
unit_can_do: "Nói khi nào và ở đâu mình học tiếng Trung và xác nhận một kế hoạch học đơn giản"
unit_role: checkpoint
can_do: "Kết hợp thời gian và nơi học đơn giản với ít hỗ trợ"
pattern: "我明天上午在学校学习汉语。"
objectives:
  - "Nhận ra thời gian và nơi chốn trong một kế hoạch học được nói ra"
  - "Tự tạo một câu đầy đủ theo thứ tự thời gian–nơi chốn–hành động"
steps:
  - type: scene
    title: "Xác nhận kế hoạch học ngày mai"
    body: "Một bạn học hỏi ngày mai bạn học tiếng Trung khi nào và ở đâu. Hãy trả lời bằng một câu ngắn đầy đủ."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你明天上午在哪里学习汉语？", reading: "nǐ míng tiān shàng wǔ zài nǎ lǐ xué xí hàn yǔ" }
      - { speaker: "B", text: "我明天上午在学校学习汉语。", reading: "wǒ míng tiān shàng wǔ zài xué xiào xué xí hàn yǔ" }
      - { speaker: "A", text: "上午，对吗？", reading: "shàng wǔ, duì ma" }
      - { speaker: "B", text: "对。", reading: "duì" }
  - type: listen
    prompt: "Nghe cả thời gian lẫn nơi chốn."
    text: "我明天下午在学校学习汉语。"
    reading: "wǒ míng tiān xià wǔ zài xué xiào xué xí hàn yǔ"
  - type: practice
    id: zh-study-u04-check-listen
    kind: audio_choice
    prompt: "Nghe. Bạn nghe thời gian và nơi chốn nào?"
    audioText: "我明天上午在学校学习汉语。"
    choices: ["明天上午 + 学校", "今天下午 + 家", "明天晚上 + 商店"]
    answer: "明天上午 + 学校"
  - type: practice
    id: zh-study-u04-check-reply
    kind: dialogue_choice
    prompt: "Ai đó hỏi 你在哪里学习汉语？ Câu nào nói bạn học ở trường?"
    choices: ["我在学校学习汉语。", "我是学校。", "我去老师。"]
    answer: "我在学校学习汉语。"
  - type: practice
    id: zh-study-u04-check-produce
    kind: type_answer
    prompt: "Gõ câu: “Tôi học tiếng Trung ở trường vào sáng mai.”"
    answer: "我明天上午在学校学习汉语"
    acceptedAnswers: ["我明天上午在学校学习汉语。"]
    hints:
      - "Dùng 我 + 明天上午 + 在学校 + 学习汉语."
  - type: checkpoint
    items:
      - id: zh-study-u04-check-time
        kind: audio_choice
        prompt: "Nghe. Người này học khi nào?"
        audioText: "我明天下午学习。"
        choices: ["明天下午", "今天上午", "昨天晚上"]
        answer: "明天下午"
      - id: zh-study-u04-check-place
        kind: dialogue_choice
        prompt: "Câu nào đặt hành động học ở trường?"
        choices: ["我在学校学习汉语。", "我是学生学校。", "我学习学校是。"]
        answer: "我在学校学习汉语。"
exercise:
  type: type_answer
  prompt: "Gõ câu: “Tôi học tiếng Trung ở trường.”"
  answer: "我在学校学习汉语"
  acceptedAnswers: ["我在学校学习汉语。"]
---

Checkpoint kiểm tra việc ghép thời gian và nơi chốn vào cùng một kế hoạch học hữu ích.
