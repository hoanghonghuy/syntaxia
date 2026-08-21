---
id: zh-hsk-b1-u04-review
track: chinese-hsk
locale: en
slug: study-review
title: "Review: plan when and where you study"
order: 8
published: true
hsk_band: 1
hsk_version: "3.0"
unit_id: zh-hsk-b1-study-04
unit_title: "Plan when and where you study"
unit_order: 4
unit_can_do: "Say when and where you study Chinese and confirm a simple study plan"
unit_role: review
can_do: "Retrieve a time-place-study sentence without a model"
pattern: "我明天…在…学习汉语。"
objectives:
  - "Recall time and place chunks from sound"
  - "Rebuild a complete study-plan sentence"
steps:
  - type: scene
    title: "Recall the plan"
    body: "Later, a classmate asks about your study plan again. Answer without copying a model."
  - type: dialogue
    lines:
      - { speaker: "A", text: "你明天下午学习汉语吗？", reading: "nǐ míng tiān xià wǔ xué xí hàn yǔ ma" }
      - { speaker: "B", text: "学习。我明天下午在学校学习汉语。", reading: "xué xí. wǒ míng tiān xià wǔ zài xué xiào xué xí hàn yǔ" }
      - { speaker: "A", text: "好，明天见。", reading: "hǎo, míng tiān jiàn" }
  - type: listen
    prompt: "Listen before reading. Identify both the time and place."
    text: "我今天上午在学校学习汉语。"
    reading: "wǒ jīn tiān shàng wǔ zài xué xiào xué xí hàn yǔ"
  - type: practice
    id: zh-study-u04-review-listen
    kind: audio_choice
    prompt: "Listen. Which plan do you hear?"
    audioText: "我明天下午在学校学习汉语。"
    choices: ["明天下午 + 学校", "今天上午 + 家", "昨天晚上 + 商店"]
    answer: "明天下午 + 学校"
  - type: practice
    id: zh-study-u04-review-reply
    kind: dialogue_choice
    prompt: "Someone asks 你明天上午在哪里学习汉语？ Which answer is complete?"
    choices: ["我明天上午在学校学习汉语。", "明天。", "学校。"]
    answer: "我明天上午在学校学习汉语。"
  - type: practice
    id: zh-study-u04-review-produce
    kind: type_answer
    prompt: "Type: “I study Chinese at school this afternoon.”"
    answer: "我今天下午在学校学习汉语"
    acceptedAnswers: ["我今天下午在学校学习汉语。"]
    hints:
      - "Use 我 + 今天下午 + 在学校 + 学习汉语."
  - type: checkpoint
    items:
      - id: zh-study-u04-review-when
        kind: audio_choice
        prompt: "Listen. Which time expression do you hear?"
        audioText: "明天上午"
        choices: ["明天上午", "今天晚上", "昨天下午"]
        answer: "明天上午"
      - id: zh-study-u04-review-where
        kind: dialogue_choice
        prompt: "Which answer tells where the study happens?"
        choices: ["我在学校学习汉语。", "我是学生。", "明天见。"]
        answer: "我在学校学习汉语。"
exercise:
  type: type_answer
  prompt: "Type: “I study tomorrow afternoon.”"
  answer: "我明天下午学习"
  acceptedAnswers: ["我明天下午学习。"]
---

Review is retrieval: rebuild when + where + study as one sentence instead of revisiting separate word lists.
