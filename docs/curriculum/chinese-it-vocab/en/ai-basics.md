---
id: zh-it-03-ai-basics
track: chinese-it-vocab
locale: en
slug: ai-basics
title: AI basics
order: 3
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-ai-project-03
unit_title: "Describe an AI project"
unit_order: 3
unit_can_do: "Say that a project uses AI or machine learning and identify its algorithm and model"
unit_role: lesson
can_do: "Say that a project uses AI or machine learning and identify its algorithm and model"
pattern: "人工智能 / 机器学习 / 算法 / 模型"
objectives:
  - Distinguish the broad field 人工智能 from 机器学习
  - Recognize 算法 and 模型 when discussing how an ML project works
vocab:
  - { hanzi: "人工智能", pinyin: "réngōng zhìnéng", gloss: "artificial intelligence (AI)" }
  - { hanzi: "机器学习", pinyin: "jīqì xuéxí", gloss: "machine learning (ML)" }
  - { hanzi: "算法", pinyin: "suànfǎ", gloss: "algorithm" }
  - { hanzi: "模型", pinyin: "móxíng", gloss: "model" }
steps:
  - type: scene
    title: "Project review"
    body: "A team is reviewing an AI feature. They need to explain whether the project uses machine learning and how the algorithm relates to the model."
    visualKey: "ai-project-flow"
    imageAlt: "A simple technology workflow connects an input, an algorithm stage, and a model stage with arrows."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个项目用人工智能吗？", reading: "zhège xiàngmù yòng réngōng zhìnéng ma?" }
      - { speaker: "B", text: "对，我们用机器学习训练模型。", reading: "duì, wǒmen yòng jīqì xuéxí xùnliàn móxíng." }
      - { speaker: "A", text: "算法也要调整吗？", reading: "suànfǎ yě yào tiáozhěng ma?" }
      - { speaker: "B", text: "要，算法会影响模型。", reading: "yào, suànfǎ huì yǐngxiǎng móxíng." }
  - type: listen
    prompt: "Listen first. What does B say the team uses to train the model?"
    text: "我们用机器学习训练模型。"
    reading: "wǒmen yòng jīqì xuéxí xùnliàn móxíng."
  - type: tip
    title: "Keep the four terms in one project model"
    body: "人工智能 is the broad AI field. 机器学习 is machine learning. 算法 is an algorithm or procedure, and 模型 is the model produced or used by the system. Learn them as roles in a project, not four isolated labels."
  - type: teach
    items:
      - { form: "人工智能", reading: "réngōng zhìnéng", gloss: "artificial intelligence", example: "这个项目用人工智能吗？" }
      - { form: "机器学习", reading: "jīqì xuéxí", gloss: "machine learning", example: "我们用机器学习。" }
      - { form: "算法", reading: "suànfǎ", gloss: "algorithm", example: "算法也要调整吗？" }
      - { form: "模型", reading: "móxíng", gloss: "model", example: "训练模型。" }
  - type: practice
    id: zh-it-ai-context-1
    kind: dialogue_choice
    prompt: "A asks whether the project uses AI. Which reply describes an ML workflow?"
    choices: ["我们用机器学习训练模型。", "我们先扫码付款。", "我们只换芯片。"]
    answer: "我们用机器学习训练模型。"
    explanation: "机器学习 and 模型 belong to the project workflow being discussed."
  - type: practice
    id: zh-it-ai-listen-1
    kind: audio_choice
    prompt: "Listen and choose the term B says can affect the model."
    audioText: "算法会影响模型。"
    choices: ["算法", "人工智能", "机器学习"]
    answer: "算法"
  - type: practice
    id: zh-it-ai-type-1
    kind: type_answer
    prompt: "Type the four Chinese characters for “machine learning”."
    answer: "机器学习"
    hints:
      - "The first half is 机器, machine."
      - "The second half is 学习, learning."
  - type: checkpoint
    items:
      - id: zh-it-ai-check-1
        kind: meaning_choice
        prompt: "Which term names the broad field “artificial intelligence”?"
        choices: ["人工智能", "机器学习", "算法"]
        answer: "人工智能"
      - id: zh-it-ai-check-2
        kind: dialogue_choice
        prompt: "A asks 算法也要调整吗？ Which reply says the algorithm can affect the model?"
        choices: ["要，算法会影响模型。", "不用，扫码就可以。", "这是互联网。"]
        answer: "要，算法会影响模型。"
exercise:
  type: type_answer
  prompt: "Type the Chinese term for “algorithm”."
  answer: "算法"
  hints:
    - "The first character is 算."
    - "The second is 法."
---

The goal is to explain a tiny AI project relationship in Chinese, not merely translate four English labels. Listen for the terms in context, retrieve one from memory, and finish the project-review checkpoint.
