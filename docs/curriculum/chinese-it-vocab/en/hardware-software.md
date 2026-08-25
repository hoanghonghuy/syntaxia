---
id: zh-it-01-hardware-software
track: chinese-it-vocab
locale: en
slug: hardware-software
title: Hardware and software
order: 1
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-device-support-01
unit_title: "Check a computer problem"
unit_order: 1
unit_can_do: "Ask whether a simple computer problem is hardware or software and mention the chip"
unit_role: lesson
can_do: "Ask whether a simple computer problem is hardware or software and mention the chip"
pattern: "硬件 / 软件 / 芯片"
objectives:
  - Distinguish 硬件 from 软件 in a support conversation
  - Recognize 芯片 when a physical component is discussed
vocab:
  - { hanzi: "硬件", pinyin: "yìngjiàn", gloss: "hardware" }
  - { hanzi: "软件", pinyin: "ruǎnjiàn", gloss: "software" }
  - { hanzi: "芯片", pinyin: "xīnpiàn", gloss: "microchip" }
steps:
  - type: scene
    title: "Repair desk"
    body: "A teammate brings in a computer that is not working. You need to decide whether to check software or physical hardware first."
    visualKey: "tech-repair-desk"
    imageAlt: "A repair desk with a computer screen, a physical chip, and a repair tool showing the contrast between software and hardware."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这台电脑有问题，是硬件还是软件？", reading: "zhè tái diànnǎo yǒu wèntí, shì yìngjiàn háishi ruǎnjiàn?" }
      - { speaker: "B", text: "我先检查软件，再检查硬件。", reading: "wǒ xiān jiǎnchá ruǎnjiàn, zài jiǎnchá yìngjiàn." }
      - { speaker: "A", text: "好，也看看芯片。", reading: "hǎo, yě kànkan xīnpiàn." }
  - type: listen
    prompt: "Listen first. What does B say they will check first?"
    text: "我先检查软件，再检查硬件。"
    reading: "wǒ xiān jiǎnchá ruǎnjiàn, zài jiǎnchá yìngjiàn."
  - type: tip
    title: "Use the contrast as one support phrase"
    body: "硬件 is physical hardware and 软件 is software. The pair is easy to remember because 硬 means hard and 软 means soft. 芯片 names the chip itself."
  - type: teach
    items:
      - { form: "硬件", reading: "yìngjiàn", gloss: "hardware", example: "是硬件还是软件？" }
      - { form: "软件", reading: "ruǎnjiàn", gloss: "software", example: "我先检查软件。" }
      - { form: "芯片", reading: "xīnpiàn", gloss: "microchip", example: "也看看芯片。" }
  - type: practice
    id: zh-it-hw-context-1
    kind: dialogue_choice
    prompt: "B wants to check the programs before the physical parts. Which reply matches?"
    choices: ["先检查软件。", "先换芯片。", "先检查硬件。"]
    answer: "先检查软件。"
    explanation: "软件 refers to software, while 硬件 and 芯片 refer to physical components."
  - type: practice
    id: zh-it-hw-listen-1
    kind: audio_choice
    prompt: "Listen and choose the component A asks B to look at too."
    audioText: "也看看芯片。"
    choices: ["芯片", "软件", "硬件"]
    answer: "芯片"
  - type: practice
    id: zh-it-hw-type-1
    kind: type_answer
    prompt: "Type the two Chinese characters for “hardware”."
    answer: "硬件"
    hints:
      - "The first character means hard: 硬."
      - "The second character is 件."
  - type: checkpoint
    items:
      - id: zh-it-hw-check-1
        kind: meaning_choice
        prompt: "Which term refers to programs rather than physical computer parts?"
        choices: ["软件", "硬件", "芯片"]
        answer: "软件"
      - id: zh-it-hw-check-2
        kind: dialogue_choice
        prompt: "A colleague asks 是硬件还是软件？ You think it is a software issue. Which short reply fits?"
        choices: ["是软件。", "是芯片。", "是硬件。"]
        answer: "是软件。"
exercise:
  type: type_answer
  prompt: "Type the Chinese term for hardware."
  answer: "硬件"
  hints:
    - "硬 means hard."
    - "Add 件 to make 硬件."
---

Use the guided support exchange above as one complete learning loop: identify the problem category, listen for the terms, produce one term from memory, and finish with the checkpoint.
