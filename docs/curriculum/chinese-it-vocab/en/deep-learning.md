---
id: zh-it-04-deep-learning
track: chinese-it-vocab
locale: en
slug: deep-learning
title: Deep learning
order: 4
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-model-training-04
unit_title: "Report a model-training concern"
unit_order: 4
unit_can_do: "Say that a model uses deep learning or a neural network and flag overfitting during training"
unit_role: lesson
can_do: "Say that a model uses deep learning or a neural network and flag overfitting during training"
pattern: "深度学习 / 神经网络 / 训练 / 过拟合"
objectives:
  - Connect 深度学习 with 神经网络 in a model discussion
  - Recognize 训练 and use 过拟合 as a concrete training risk
vocab:
  - { hanzi: "深度学习", pinyin: "shēndù xuéxí", gloss: "deep learning" }
  - { hanzi: "神经网络", pinyin: "shénjīng wǎngluò", gloss: "neural network" }
  - { hanzi: "训练", pinyin: "xùnliàn", gloss: "training; to train" }
  - { hanzi: "过拟合", pinyin: "guò nǐhé", gloss: "overfitting" }
steps:
  - type: scene
    title: "Training monitor"
    body: "Two training curves on a monitor start to diverge. A teammate is reporting how the model is trained and whether overfitting may be appearing."
    visualKey: "model-training-monitor"
    imageAlt: "A model-training monitor with two learning curves that begin together and then diverge, suggesting an overfitting risk."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个模型用深度学习吗？", reading: "zhège móxíng yòng shēndù xuéxí ma?" }
      - { speaker: "B", text: "对，是神经网络。", reading: "duì, shì shénjīng wǎngluò." }
      - { speaker: "A", text: "训练效果怎么样？", reading: "xùnliàn xiàoguǒ zěnmeyàng?" }
      - { speaker: "B", text: "训练效果不错，但要注意过拟合。", reading: "xùnliàn xiàoguǒ búcuò, dàn yào zhùyì guò nǐhé." }
  - type: listen
    prompt: "Listen first. Which risk does B say the team should watch?"
    text: "训练效果不错，但要注意过拟合。"
    reading: "xùnliàn xiàoguǒ búcuò, dàn yào zhùyì guò nǐhé."
  - type: tip
    title: "Turn the vocabulary into a status update"
    body: "深度学习 is deep learning and 神经网络 is neural network. 训练 is the training process. 过拟合 is overfitting. The useful workplace pattern is not just naming them, but saying what the model uses and what risk needs attention."
  - type: teach
    items:
      - { form: "深度学习", reading: "shēndù xuéxí", gloss: "deep learning", example: "这个模型用深度学习吗？" }
      - { form: "神经网络", reading: "shénjīng wǎngluò", gloss: "neural network", example: "是神经网络。" }
      - { form: "训练", reading: "xùnliàn", gloss: "training", example: "训练效果怎么样？" }
      - { form: "过拟合", reading: "guò nǐhé", gloss: "overfitting", example: "要注意过拟合。" }
  - type: practice
    id: zh-it-dl-context-1
    kind: dialogue_choice
    prompt: "A asks whether the model uses deep learning. Which short reply identifies the model type?"
    choices: ["对，是神经网络。", "对，先扫码。", "对，是互联网。"]
    answer: "对，是神经网络。"
    explanation: "神经网络 is the neural-network term used in the model discussion."
  - type: practice
    id: zh-it-dl-listen-1
    kind: audio_choice
    prompt: "Listen and choose the training problem B warns about."
    audioText: "要注意过拟合。"
    choices: ["过拟合", "训练", "神经网络"]
    answer: "过拟合"
  - type: practice
    id: zh-it-dl-type-1
    kind: type_answer
    prompt: "Type the Chinese term for “neural network”."
    answer: "神经网络"
    hints:
      - "It starts with 神经, neural."
      - "It ends with 网络, network."
  - type: checkpoint
    items:
      - id: zh-it-dl-check-1
        kind: meaning_choice
        prompt: "Which term means “deep learning”?"
        choices: ["深度学习", "训练", "过拟合"]
        answer: "深度学习"
      - id: zh-it-dl-check-2
        kind: dialogue_choice
        prompt: "A asks 训练效果怎么样？ Which reply reports a good result but still flags overfitting?"
        choices: ["训练效果不错，但要注意过拟合。", "打开微信，再扫码。", "算法就是互联网。"]
        answer: "训练效果不错，但要注意过拟合。"
exercise:
  type: type_answer
  prompt: "Type the Chinese term for “overfitting”."
  answer: "过拟合"
  hints:
    - "It begins with 过."
    - "The remaining two characters are 拟合."
---

Treat the lesson as a tiny model-training status update: identify deep learning and the neural network, listen for the risk, retrieve a term yourself, and close with the checkpoint.
