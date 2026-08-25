---
id: zh-it-05-nlp-basics
track: chinese-it-vocab
locale: en
slug: nlp-basics
title: Language and NLP
order: 5
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-nlp-project-05
unit_title: "Explain a language-model project"
unit_order: 5
unit_can_do: "Say that a project does NLP, mention a language model or word vectors, and explain that context matters"
unit_role: lesson
can_do: "Say that a project does NLP, mention a language model or word vectors, and explain that context matters"
pattern: "自然语言处理 / 语言模型 / 词向量 / 上下文"
objectives:
  - Recognize 自然语言处理 and 语言模型 in a project conversation
  - Connect 词向量 with 上下文 without treating either as an isolated glossary item
vocab:
  - { hanzi: "自然语言处理", pinyin: "zìrán yǔyán chǔlǐ", gloss: "natural language processing (NLP)" }
  - { hanzi: "语言模型", pinyin: "yǔyán móxíng", gloss: "language model" }
  - { hanzi: "词向量", pinyin: "cí xiàngliàng", gloss: "word vector" }
  - { hanzi: "上下文", pinyin: "shàngxiàwén", gloss: "context" }
steps:
  - type: scene
    title: "NLP project discussion"
    body: "A team is looking at a sentence-processing feature. One token is highlighted together with the text around it because the surrounding context changes how language is interpreted."
    visualKey: "nlp-context-window"
    imageAlt: "Three groups of text tokens are shown in sequence, with the middle group highlighted to emphasize a word and its surrounding context."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个项目做自然语言处理吗？", reading: "zhège xiàngmù zuò zìrán yǔyán chǔlǐ ma?" }
      - { speaker: "B", text: "对，我们在训练语言模型。", reading: "duì, wǒmen zài xùnliàn yǔyán móxíng." }
      - { speaker: "A", text: "词向量也会用到吗？", reading: "cí xiàngliàng yě huì yòngdào ma?" }
      - { speaker: "B", text: "会，上下文很重要。", reading: "huì, shàngxiàwén hěn zhòngyào." }
  - type: listen
    prompt: "Listen first. What is the team training?"
    text: "我们在训练语言模型。"
    reading: "wǒmen zài xùnliàn yǔyán móxíng."
  - type: tip
    title: "Read the terms as one NLP conversation"
    body: "自然语言处理 is NLP. 语言模型 is a language model. 词向量 is a word vector, and 上下文 is context. In technical discussion, 上下文 is especially useful because it explains why surrounding text matters to interpretation."
  - type: teach
    items:
      - { form: "自然语言处理", reading: "zìrán yǔyán chǔlǐ", gloss: "natural language processing", example: "这个项目做自然语言处理吗？" }
      - { form: "语言模型", reading: "yǔyán móxíng", gloss: "language model", example: "训练语言模型。" }
      - { form: "词向量", reading: "cí xiàngliàng", gloss: "word vector", example: "词向量也会用到吗？" }
      - { form: "上下文", reading: "shàngxiàwén", gloss: "context", example: "上下文很重要。" }
  - type: practice
    id: zh-it-nlp-context-1
    kind: dialogue_choice
    prompt: "A asks whether this is an NLP project. Which reply describes the team's current work?"
    choices: ["我们在训练语言模型。", "我们在换芯片。", "我们在扫码付款。"]
    answer: "我们在训练语言模型。"
    explanation: "语言模型 is the language-model term used in the NLP project exchange."
  - type: practice
    id: zh-it-nlp-listen-1
    kind: audio_choice
    prompt: "Listen and choose what B says is important."
    audioText: "上下文很重要。"
    choices: ["上下文", "词向量", "语言模型"]
    answer: "上下文"
  - type: practice
    id: zh-it-nlp-type-1
    kind: type_answer
    prompt: "Type the Chinese term for “natural language processing”."
    answer: "自然语言处理"
    hints:
      - "Start with 自然语言, natural language."
      - "Finish with 处理, processing."
  - type: checkpoint
    items:
      - id: zh-it-nlp-check-1
        kind: meaning_choice
        prompt: "Which term means “word vector”?"
        choices: ["词向量", "上下文", "语言模型"]
        answer: "词向量"
      - id: zh-it-nlp-check-2
        kind: dialogue_choice
        prompt: "A asks 词向量也会用到吗？ Which reply says that context is important?"
        choices: ["会，上下文很重要。", "会，先扫码。", "不会，这是硬件。"]
        answer: "会，上下文很重要。"
exercise:
  type: type_answer
  prompt: "Type the Chinese term for “language model”."
  answer: "语言模型"
  hints:
    - "The first half is 语言, language."
    - "The second half is 模型, model."
---

The lesson now follows an NLP project conversation: identify the task, listen for what is being trained, recall a target term, and use context as part of a meaningful technical exchange.
