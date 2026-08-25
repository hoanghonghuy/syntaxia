---
id: zh-hsk-b1-u04-checkpoint
track: chinese-hsk
locale: en
slug: study-checkpoint
title: "Checkpoint: plan when and where you study"
order: 7
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-study-04
unit_title: "Plan when and where you study"
unit_order: 4
unit_can_do: "Say when and where you study Chinese and confirm a simple study plan"
unit_role: checkpoint
can_do: "Combine a simple study time and place with minimal support"
pattern: "我明天上午在学校学习汉语。"
objectives:
  - "Identify the time and place in a spoken study plan"
  - "Produce one complete time-place-action sentence"
steps:
  - type: scene
    title: "Confirm tomorrow's study plan"
    body: "A classmate asks when and where you will study Chinese tomorrow. Answer with one complete short sentence."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你明天上午在哪里学习汉语？", reading: "nǐ míng tiān shàng wǔ zài nǎ lǐ xué xí hàn yǔ" }
      - { speaker: "B", text: "我明天上午在学校学习汉语。", reading: "wǒ míng tiān shàng wǔ zài xué xiào xué xí hàn yǔ" }
      - { speaker: "A", text: "上午，对吗？", reading: "shàng wǔ, duì ma" }
      - { speaker: "B", text: "对。", reading: "duì" }
  - type: listen
    prompt: "Listen for both the time and the place."
    text: "我明天下午在学校学习汉语。"
    reading: "wǒ míng tiān xià wǔ zài xué xiào xué xí hàn yǔ"
  - type: practice
    id: zh-study-u04-check-listen
    kind: audio_choice
    prompt: "Listen. Which time and place do you hear?"
    audioText: "我明天上午在学校学习汉语。"
    choices: ["明天上午 + 学校", "今天下午 + 家", "明天晚上 + 商店"]
    answer: "明天上午 + 学校"
  - type: practice
    id: zh-study-u04-check-reply
    kind: dialogue_choice
    prompt: "Someone asks 你在哪里学习汉语？ Which answer says you study at school?"
    choices: ["我在学校学习汉语。", "我是学校。", "我去老师。"]
    answer: "我在学校学习汉语。"
  - type: practice
    id: zh-study-u04-check-produce
    kind: type_answer
    prompt: "Type: “I study Chinese at school tomorrow morning.”"
    answer: "我明天上午在学校学习汉语"
    acceptedAnswers: ["我明天上午在学校学习汉语。"]
    hints:
      - "Use 我 + 明天上午 + 在学校 + 学习汉语."
  - type: checkpoint
    items:
      - id: zh-study-u04-check-time
        kind: audio_choice
        prompt: "Listen. When does the person study?"
        audioText: "我明天下午学习。"
        choices: ["明天下午", "今天上午", "昨天晚上"]
        answer: "明天下午"
      - id: zh-study-u04-check-place
        kind: dialogue_choice
        prompt: "Which sentence places the study action at school?"
        choices: ["我在学校学习汉语。", "我是学生学校。", "我学习学校是。"]
        answer: "我在学校学习汉语。"
exercise:
  type: type_answer
  prompt: "Type: “I study Chinese at school.”"
  answer: "我在学校学习汉语"
  acceptedAnswers: ["我在学校学习汉语。"]
---

The checkpoint tests whether time and place can work together inside one useful study plan.
