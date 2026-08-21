---
id: css-01-syntax
track: css-basics
locale: vi
slug: css-syntax
title: Rule, selector và declaration
order: 1
published: true
can_do: "Viết một CSS rule hoàn chỉnh có selector và nhiều property-value declaration, đồng thời chẩn đoán declaration sai cú pháp"
objectives:
  - Đọc ranh giới giữa selector và declaration block
  - Viết property-value pair bằng colon và semicolon
  - Phân biệt CSS source với HTML markup
exercise:
  mode: both
  starterHtml: |
    <p class="note">Read me</p>
  starter: |
    /* TODO: làm .note màu xanh và chữ đậm */
  hints:
    - Class selector bắt đầu bằng dấu chấm: .note.
    - Đặt cả hai declaration trong cùng một cặp braces.
    - Dùng color: blue; và font-weight: bold;.
  solution: |
    .note {
      color: blue;
      font-weight: bold;
    }
  expected:
    type: cssRules
    rules:
      - selector: .note
        declarations:
          color: blue
          font-weight: bold
---

CSS syntax nhỏ gọn, nhưng punctuation quyết định cấu trúc mà parser đọc được.

## Mô hình tư duy

```text
selector {
  property: value;
  property: value;
}
```

Selector chọn target; braces chứa declaration block; colon tách property khỏi value; semicolon tách các declaration.

## Dự đoán kết quả hiển thị

```css
.note {
  color: blue;
  font-weight: bold;
}
```

Hãy dự đoán hai đặc tính độc lập của paragraph match selector: text màu blue và weight bold.

## Ví dụ mẫu

```css
.note {
  color: navy;
  line-height: 1.5;
}
```

External stylesheet và `<style>` nội bộ dùng cùng CSS rule syntax; chỉ khác nơi đặt source.

## Tìm lỗi

```css
.note {
  color = blue
  font-weight: bold;
}
```

`color = blue` không phải CSS declaration. Cần dùng colon. Thiếu separator cũng có thể khiến declaration phía sau bị bỏ qua.

## Lỗi thường gặp

- Dùng `=` thay cho `:`.
- Trộn HTML tag vào file `.css`.
- Nghĩ chỉ cần declaration mà không cần selector/rule block.

## Thử ngay

Viết một rule `.note` đặt cả hai property yêu cầu. Structured grader kiểm tra hai declaration nằm đúng trên selector đó.

## Tự kiểm tra

Selector quyết định gì, còn declaration quyết định gì?

**Đáp án:** selector quyết định element nào match; declaration quyết định style property mà các element đó nhận.
