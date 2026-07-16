---
id: html-03-emphasis
track: html-basics
locale: vi
slug: emphasis-and-importance
title: Nhấn mạnh và tầm quan trọng
order: 3
published: true
objectives:
  - Phân biệt em (nhấn mạnh) và strong (tầm quan trọng)
  - Giải thích vì sao không dùng b/i chỉ để “làm đẹp”
  - Đặt đúng chỗ em/strong trong một câu
exercise:
  mode: html
  starter: |
    <!-- Wrap words with em and strong inside a paragraph -->
    
  hints:
    - Bọc một từ bằng em để nhấn giọng.
    - Bọc từ khác bằng strong để đánh dấu quan trọng.
    - Giữ cả hai trong một phần tử p.
  solution: |
    <p><em>quietly</em> and <strong>important</strong></p>
  expected:
    type: htmlTags
    tags:
      - tag: em
        minCount: 1
      - tag: strong
        minCount: 1
---

Trong văn bản, đôi khi bạn *nhấn giọng* một từ, đôi khi bạn muốn nói từ đó **quan trọng**. HTML có thẻ riêng cho hai ý này: `em` và `strong`.

Trình duyệt thường hiện `em` nghiêng và `strong` đậm — nhưng ý nghĩa ngữ nghĩa mới là điểm chính, không chỉ kiểu chữ.

| Thẻ | Ý nghĩa | Hiện thường thấy |
| --- | --- | --- |
| `em` | Nhấn mạnh / đổi trọng tâm câu | Nghiêng |
| `strong` | Tầm quan trọng, cảnh báo, chú ý mạnh | Đậm |
| `i` / `b` | Chủ yếu về hình thức (ít dùng khi mới học) | Nghiêng / đậm |

## Ví dụ mẫu

```html
<p>Hãy nộp bài <em>trước thứ Sáu</em>.</p>
<p><strong>Cảnh báo:</strong> không chia sẻ mật khẩu.</p>
```

- Trong câu đầu, `em` nhấn phần thời hạn — trọng tâm câu nằm ở “trước thứ Sáu”.
- Trong câu sau, `strong` đánh dấu cảnh báo quan trọng.
- Có thể lồng thẻ chữ trong `p`, miễn cấu trúc vẫn rõ.

## Lỗi thường gặp

- Bọc cả đoạn dài trong `strong` chỉ để chữ đậm — mất ý “quan trọng”; nên tô đúng vài từ/cụm cần nhấn.
- Dùng `b`/`i` thay `strong`/`em` khi đang học ý nghĩa — với người mới, ưu tiên `em` và `strong`.
- Nhầm `em` với “chữ nghiêng trang trí” — nếu chỉ muốn kiểu chữ, sau này dùng CSS.

## Thử ngay

Dùng sandbox bên dưới để đánh dấu nhấn mạnh và tầm quan trọng bằng em và strong. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
