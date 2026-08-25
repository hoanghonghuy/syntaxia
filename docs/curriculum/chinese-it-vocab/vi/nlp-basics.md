---
id: zh-it-05-nlp-basics
track: chinese-it-vocab
locale: vi
slug: nlp-basics
title: Ngôn ngữ và NLP
order: 5
published: true
specialty: it-vocab
source: szdict
unit_id: zh-it-nlp-project-05
unit_title: "Giải thích một dự án mô hình ngôn ngữ"
unit_order: 5
unit_can_do: "Nói một dự án làm NLP, nhắc tới mô hình ngôn ngữ hoặc word vector và giải thích rằng ngữ cảnh quan trọng"
unit_role: lesson
can_do: "Nói một dự án làm NLP, nhắc tới mô hình ngôn ngữ hoặc word vector và giải thích rằng ngữ cảnh quan trọng"
pattern: "自然语言处理 / 语言模型 / 词向量 / 上下文"
objectives:
  - Nhận ra 自然语言处理 và 语言模型 trong trao đổi về dự án
  - Liên hệ 词向量 với 上下文 thay vì học chúng như hai mục glossary tách rời
vocab:
  - { hanzi: "自然语言处理", pinyin: "zìrán yǔyán chǔlǐ", gloss: "xử lý ngôn ngữ tự nhiên (NLP)" }
  - { hanzi: "语言模型", pinyin: "yǔyán móxíng", gloss: "mô hình ngôn ngữ" }
  - { hanzi: "词向量", pinyin: "cí xiàngliàng", gloss: "word vector / vector từ" }
  - { hanzi: "上下文", pinyin: "shàngxiàwén", gloss: "ngữ cảnh" }
steps:
  - type: scene
    title: "Trao đổi về dự án NLP"
    body: "Một nhóm đang xem tính năng xử lý câu. Một token được làm nổi bật cùng phần văn bản xung quanh vì ngữ cảnh có thể làm thay đổi cách hiểu ngôn ngữ."
    visualKey: "nlp-context-window"
    imageAlt: "Ba nhóm token văn bản nằm theo thứ tự, nhóm giữa được làm nổi bật để nhấn mạnh một từ và ngữ cảnh xung quanh."
  - type: dialogue
    lines:
      - { speaker: "A", text: "这个项目做自然语言处理吗？", reading: "zhège xiàngmù zuò zìrán yǔyán chǔlǐ ma?" }
      - { speaker: "B", text: "对，我们在训练语言模型。", reading: "duì, wǒmen zài xùnliàn yǔyán móxíng." }
      - { speaker: "A", text: "词向量也会用到吗？", reading: "cí xiàngliàng yě huì yòngdào ma?" }
      - { speaker: "B", text: "会，上下文很重要。", reading: "huì, shàngxiàwén hěn zhòngyào." }
  - type: listen
    prompt: "Nghe trước. Nhóm đang huấn luyện thứ gì?"
    text: "我们在训练语言模型。"
    reading: "wǒmen zài xùnliàn yǔyán móxíng."
  - type: tip
    title: "Đọc các thuật ngữ như một cuộc trao đổi NLP"
    body: "自然语言处理 là NLP. 语言模型 là mô hình ngôn ngữ. 词向量 là word vector và 上下文 là ngữ cảnh. Trong trao đổi kỹ thuật, 上下文 đặc biệt hữu ích vì nó diễn đạt vai trò của phần văn bản xung quanh đối với cách hiểu."
  - type: teach
    items:
      - { form: "自然语言处理", reading: "zìrán yǔyán chǔlǐ", gloss: "xử lý ngôn ngữ tự nhiên", example: "这个项目做自然语言处理吗？" }
      - { form: "语言模型", reading: "yǔyán móxíng", gloss: "mô hình ngôn ngữ", example: "训练语言模型。" }
      - { form: "词向量", reading: "cí xiàngliàng", gloss: "word vector", example: "词向量也会用到吗？" }
      - { form: "上下文", reading: "shàngxiàwén", gloss: "ngữ cảnh", example: "上下文很重要。" }
  - type: practice
    id: zh-it-nlp-context-1
    kind: dialogue_choice
    prompt: "A hỏi đây có phải dự án NLP không. Câu trả lời nào mô tả công việc hiện tại của nhóm?"
    choices: ["我们在训练语言模型。", "我们在换芯片。", "我们在扫码付款。"]
    answer: "我们在训练语言模型。"
    explanation: "语言模型 là thuật ngữ mô hình ngôn ngữ được dùng trong chính trao đổi về dự án NLP."
  - type: practice
    id: zh-it-nlp-listen-1
    kind: audio_choice
    prompt: "Nghe và chọn thứ mà B nói là quan trọng."
    audioText: "上下文很重要。"
    choices: ["上下文", "词向量", "语言模型"]
    answer: "上下文"
  - type: practice
    id: zh-it-nlp-type-1
    kind: type_answer
    prompt: "Gõ cụm tiếng Trung có nghĩa là “xử lý ngôn ngữ tự nhiên”."
    answer: "自然语言处理"
    hints:
      - "Bắt đầu bằng 自然语言, ngôn ngữ tự nhiên."
      - "Kết thúc bằng 处理, xử lý."
  - type: checkpoint
    items:
      - id: zh-it-nlp-check-1
        kind: meaning_choice
        prompt: "Thuật ngữ nào có nghĩa là “word vector”?"
        choices: ["词向量", "上下文", "语言模型"]
        answer: "词向量"
      - id: zh-it-nlp-check-2
        kind: dialogue_choice
        prompt: "A hỏi 词向量也会用到吗？ Câu nào trả lời rằng ngữ cảnh rất quan trọng?"
        choices: ["会，上下文很重要。", "会，先扫码。", "不会，这是硬件。"]
        answer: "会，上下文很重要。"
exercise:
  type: type_answer
  prompt: "Gõ từ tiếng Trung có nghĩa là “mô hình ngôn ngữ”."
  answer: "语言模型"
  hints:
    - "Nửa đầu là 语言, ngôn ngữ."
    - "Nửa sau là 模型, mô hình."
---

Bài học giờ đi theo một cuộc trao đổi dự án NLP: xác định loại tác vụ, nghe xem nhóm đang huấn luyện gì, tự nhớ lại thuật ngữ và dùng “ngữ cảnh” trong một mối quan hệ kỹ thuật có nghĩa.
