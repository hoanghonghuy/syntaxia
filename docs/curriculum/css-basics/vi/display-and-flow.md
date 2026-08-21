---
id: css-10-display
track: css-basics
locale: vi
slug: display-and-flow
title: Display và normal flow
order: 10
published: true
can_do: "Dự đoán block, inline, inline-block và none tham gia normal flow thế nào và chọn inline-block khi cần inline placement cùng box sizing"
objectives:
  - So sánh outer behavior của block và inline
  - Dùng inline-block cho inline-level box cần dimension
  - Hiểu display none loại box khỏi layout
exercise:
  mode: both
  starterHtml: |
    <span class="badge">A</span>
    <span>following text</span>
  starter: |
    /* TODO: giữ .badge trong dòng nhưng cho nó width và padding dạng box */
  hints:
    - Plain inline box không dùng width giống inline-block.
    - Dùng display: inline-block để badge vẫn ở inline flow và nhận dimension.
    - Set display: inline-block; width: 3rem; padding: 0.5rem;.
  solution: |
    .badge { display: inline-block; width: 3rem; padding: 0.5rem; }
  expected:
    type: cssRules
    rules:
      - selector: .badge
        declarations:
          display: inline-block
          width: 3rem
          padding: 0.5rem
---

`display` thay đổi cách một box tham gia layout. Hãy bắt đầu từ **normal flow** trước khi dùng layout system phức tạp.

## Mô hình tư duy

| Value | Behavior đơn giản hóa |
| --- | --- |
| `block` | bắt đầu dòng mới, outer flow kiểu block |
| `inline` | tham gia trong text line |
| `inline-block` | outer flow inline + dimension dạng box |
| `none` | không sinh box trong layout |

Cách format nội dung bên trong và cách box tham gia bên ngoài có liên quan nhưng không hoàn toàn là một khái niệm.

## Dự đoán kết quả hiển thị

`span` mặc định inline. Chỉ set width có thể không tạo geometry badge như mong đợi. Đổi sang `inline-block` giúp nó vẫn nằm cạnh text nhưng nhận declared width.

## Ví dụ mẫu

```css
.badge {
  display: inline-block;
  width: 3rem;
  padding: 0.5rem;
}
```

`display: none` khác với content chỉ trong suốt: nó loại box khỏi layout thay vì đơn thuần làm không nhìn thấy.

## Tìm lỗi

```css
.badge { width: 3rem; }
```

Nếu element vẫn là inline box, requested width không áp dụng như normal block dimension. Hãy inspect display behavior trước khi nghĩ width bị lỗi.

## Lỗi thường gặp

- Xem block/inline chỉ là nhãn hình thức.
- Dùng `display: none` khi nội dung vẫn cần tồn tại cho interaction hỗ trợ.
- Set width cho inline content rồi giả định block sizing rule áp dụng y nguyên.

## Thử ngay

Biến badge thành inline-block với dimension yêu cầu.

## Tự kiểm tra

Lợi ích chính của `inline-block` trong ví dụ là gì?

**Đáp án:** nó vẫn tham gia inline flow nhưng nhận box dimension như width.
