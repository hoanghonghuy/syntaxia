---
id: zh-it-04-deep-learning
track: chinese-it-vocab
locale: vi
slug: deep-learning
title: Deep learning
order: 4
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-model-training-04
unit_title: "Báo cáo một vấn đề khi huấn luyện mô hình"
unit_order: 4
unit_can_do: "Nói mô hình dùng deep learning hoặc mạng nơ-ron và cảnh báo overfitting trong quá trình huấn luyện"
unit_role: lesson
can_do: "Nói mô hình dùng deep learning hoặc mạng nơ-ron và cảnh báo overfitting trong quá trình huấn luyện"
pattern: "深度学习 / 神经网络 / 训练 / 过拟合"
objectives:
  - Liên hệ 深度学习 với 神经网络 trong trao đổi về mô hình
  - Nhận ra 训练 và dùng 过拟合 như một rủi ro huấn luyện cụ thể
vocab:
  - { hanzi: "深度学习", pinyin: "shēndù xuéxí", gloss: "deep learning" }
  - { hanzi: "神经网络", pinyin: "shénjīng wǎngluò", gloss: "mạng nơ-ron" }
  - { hanzi: "训练", pinyin: "xùnliàn", gloss: "huấn luyện" }
  - { hanzi: "过拟合", pinyin: "guò nǐhé", gloss: "overfitting / quá khớp" }
steps:
  - type: scene
    title: "Màn hình huấn luyện"
    body: "Hai đường học trên màn hình bắt đầu tách xa nhau. Một đồng đội đang báo cáo cách mô hình được huấn luyện và liệu dấu hiệu overfitting có xuất hiện hay không."
    visualKey: "model-training-monitor"
    imageAlt: "Màn hình huấn luyện mô hình có hai đường học ban đầu gần nhau rồi tách ra, gợi ý rủi ro overfitting."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个模型用深度学习吗？", reading: "zhège móxíng yòng shēndù xuéxí ma?" }
      - { speaker: "B", text: "对，是神经网络。", reading: "duì, shì shénjīng wǎngluò." }
      - { speaker: "A", text: "训练效果怎么样？", reading: "xùnliàn xiàoguǒ zěnmeyàng?" }
      - { speaker: "B", text: "训练效果不错，但要注意过拟合。", reading: "xùnliàn xiàoguǒ búcuò, dàn yào zhùyì guò nǐhé." }
  - type: listen
    prompt: "Nghe trước. B nói nhóm cần chú ý rủi ro nào?"
    text: "训练效果不错，但要注意过拟合。"
    reading: "xùnliàn xiàoguǒ búcuò, dàn yào zhùyì guò nǐhé."
  - type: tip
    title: "Biến từ vựng thành một câu báo cáo trạng thái"
    body: "深度学习 là deep learning, 神经网络 là mạng nơ-ron. 训练 là quá trình huấn luyện và 过拟合 là overfitting. Cách dùng có ích trong công việc là nói mô hình dùng gì và rủi ro nào cần chú ý, không chỉ đọc tên bốn thuật ngữ."
  - type: teach
    items:
      - { form: "深度学习", reading: "shēndù xuéxí", gloss: "deep learning", example: "这个模型用深度学习吗？" }
      - { form: "神经网络", reading: "shénjīng wǎngluò", gloss: "mạng nơ-ron", example: "是神经网络。" }
      - { form: "训练", reading: "xùnliàn", gloss: "huấn luyện", example: "训练效果怎么样？" }
      - { form: "过拟合", reading: "guò nǐhé", gloss: "overfitting", example: "要注意过拟合。" }
  - type: practice
    id: zh-it-dl-context-1
    kind: dialogue_choice
    prompt: "A hỏi mô hình có dùng deep learning không. Câu ngắn nào xác định loại mô hình phù hợp?"
    choices: ["对，是神经网络。", "对，先扫码。", "对，是互联网。"]
    answer: "对，是神经网络。"
    explanation: "神经网络 là thuật ngữ mạng nơ-ron được dùng trong chính trao đổi về mô hình."
  - type: practice
    id: zh-it-dl-listen-1
    kind: audio_choice
    prompt: "Nghe và chọn vấn đề huấn luyện mà B cảnh báo."
    audioText: "要注意过拟合。"
    choices: ["过拟合", "训练", "神经网络"]
    answer: "过拟合"
  - type: practice
    id: zh-it-dl-type-1
    kind: type_answer
    prompt: "Gõ từ tiếng Trung có nghĩa là “mạng nơ-ron”."
    answer: "神经网络"
    hints:
      - "Từ bắt đầu bằng 神经, neural."
      - "Kết thúc bằng 网络, network."
  - type: checkpoint
    items:
      - id: zh-it-dl-check-1
        kind: meaning_choice
        prompt: "Thuật ngữ nào có nghĩa là “deep learning”?"
        choices: ["深度学习", "训练", "过拟合"]
        answer: "深度学习"
      - id: zh-it-dl-check-2
        kind: dialogue_choice
        prompt: "A hỏi 训练效果怎么样？ Câu nào báo kết quả tốt nhưng vẫn cảnh báo overfitting?"
        choices: ["训练效果不错，但要注意过拟合。", "打开微信，再扫码。", "算法就是互联网。"]
        answer: "训练效果不错，但要注意过拟合。"
exercise:
  type: type_answer
  prompt: "Gõ từ tiếng Trung có nghĩa là “overfitting”."
  answer: "过拟合"
  hints:
    - "Từ bắt đầu bằng 过."
    - "Hai chữ còn lại là 拟合."
---

Hãy coi bài này như một cập nhật trạng thái huấn luyện rất ngắn: xác định deep learning và mạng nơ-ron, nghe rủi ro, tự nhớ lại một thuật ngữ rồi hoàn thành checkpoint.
