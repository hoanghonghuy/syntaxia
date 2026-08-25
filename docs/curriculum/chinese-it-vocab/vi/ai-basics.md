---
id: zh-it-03-ai-basics
track: chinese-it-vocab
locale: vi
slug: ai-basics
title: Nền tảng AI
order: 3
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-ai-project-03
unit_title: "Mô tả một dự án AI"
unit_order: 3
unit_can_do: "Nói một dự án dùng AI hoặc machine learning và xác định thuật toán cùng mô hình của dự án"
unit_role: lesson
can_do: "Nói một dự án dùng AI hoặc machine learning và xác định thuật toán cùng mô hình của dự án"
pattern: "人工智能 / 机器学习 / 算法 / 模型"
objectives:
  - Phân biệt lĩnh vực rộng 人工智能 với 机器学习
  - Nhận ra 算法 và 模型 khi trao đổi cách một dự án ML hoạt động
vocab:
  - { hanzi: "人工智能", pinyin: "réngōng zhìnéng", gloss: "trí tuệ nhân tạo (AI)" }
  - { hanzi: "机器学习", pinyin: "jīqì xuéxí", gloss: "học máy (machine learning)" }
  - { hanzi: "算法", pinyin: "suànfǎ", gloss: "thuật toán" }
  - { hanzi: "模型", pinyin: "móxíng", gloss: "mô hình" }
steps:
  - type: scene
    title: "Review dự án"
    body: "Một nhóm đang review tính năng AI. Cần giải thích dự án có dùng machine learning hay không và thuật toán liên quan thế nào tới mô hình."
    visualKey: "ai-project-flow"
    imageAlt: "Luồng công nghệ đơn giản nối đầu vào, bước thuật toán và bước mô hình bằng các mũi tên."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个项目用人工智能吗？", reading: "zhège xiàngmù yòng réngōng zhìnéng ma?" }
      - { speaker: "B", text: "对，我们用机器学习训练模型。", reading: "duì, wǒmen yòng jīqì xuéxí xùnliàn móxíng." }
      - { speaker: "A", text: "算法也要调整吗？", reading: "suànfǎ yě yào tiáozhěng ma?" }
      - { speaker: "B", text: "要，算法会影响模型。", reading: "yào, suànfǎ huì yǐngxiǎng móxíng." }
  - type: listen
    prompt: "Nghe trước. B nói nhóm dùng gì để huấn luyện mô hình?"
    text: "我们用机器学习训练模型。"
    reading: "wǒmen yòng jīqì xuéxí xùnliàn móxíng."
  - type: tip
    title: "Gắn bốn thuật ngữ vào cùng một mô hình dự án"
    body: "人工智能 là lĩnh vực AI rộng hơn. 机器学习 là machine learning. 算法 là thuật toán hoặc quy trình, còn 模型 là mô hình được hệ thống huấn luyện hoặc sử dụng. Hãy học vai trò của chúng trong dự án thay vì bốn nhãn rời rạc."
  - type: teach
    items:
      - { form: "人工智能", reading: "réngōng zhìnéng", gloss: "trí tuệ nhân tạo", example: "这个项目用人工智能吗？" }
      - { form: "机器学习", reading: "jīqì xuéxí", gloss: "học máy", example: "我们用机器学习。" }
      - { form: "算法", reading: "suànfǎ", gloss: "thuật toán", example: "算法也要调整吗？" }
      - { form: "模型", reading: "móxíng", gloss: "mô hình", example: "训练模型。" }
  - type: practice
    id: zh-it-ai-context-1
    kind: dialogue_choice
    prompt: "A hỏi dự án có dùng AI không. Câu nào mô tả một luồng ML phù hợp?"
    choices: ["我们用机器学习训练模型。", "我们先扫码付款。", "我们只换芯片。"]
    answer: "我们用机器学习训练模型。"
    explanation: "机器学习 và 模型 nằm trong chính luồng dự án đang được trao đổi."
  - type: practice
    id: zh-it-ai-listen-1
    kind: audio_choice
    prompt: "Nghe và chọn thuật ngữ mà B nói có thể ảnh hưởng tới mô hình."
    audioText: "算法会影响模型。"
    choices: ["算法", "人工智能", "机器学习"]
    answer: "算法"
  - type: practice
    id: zh-it-ai-type-1
    kind: type_answer
    prompt: "Gõ bốn chữ Hán có nghĩa là “machine learning”."
    answer: "机器学习"
    hints:
      - "Nửa đầu là 机器, máy móc."
      - "Nửa sau là 学习, học."
  - type: checkpoint
    items:
      - id: zh-it-ai-check-1
        kind: meaning_choice
        prompt: "Thuật ngữ nào chỉ lĩnh vực rộng “trí tuệ nhân tạo”?"
        choices: ["人工智能", "机器学习", "算法"]
        answer: "人工智能"
      - id: zh-it-ai-check-2
        kind: dialogue_choice
        prompt: "A hỏi 算法也要调整吗？ Câu nào trả lời rằng thuật toán có thể ảnh hưởng mô hình?"
        choices: ["要，算法会影响模型。", "不用，扫码就可以。", "这是互联网。"]
        answer: "要，算法会影响模型。"
exercise:
  type: type_answer
  prompt: "Gõ từ tiếng Trung có nghĩa là “thuật toán”."
  answer: "算法"
  hints:
    - "Chữ đầu là 算."
    - "Chữ sau là 法."
---

Mục tiêu là diễn đạt được một mối quan hệ nhỏ trong dự án AI bằng tiếng Trung, không chỉ dịch bốn nhãn tiếng Anh. Hãy nghe thuật ngữ trong ngữ cảnh, tự nhớ lại một từ rồi hoàn thành checkpoint review dự án.
