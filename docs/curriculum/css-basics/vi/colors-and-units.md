---
id: css-07-units
track: css-basics
locale: vi
slug: colors-and-units
title: Màu sắc và relative unit
order: 7
published: true
can_do: "Chọn cách biểu diễn màu và relative length unit, rồi dự đoán text dùng rem thay đổi thế nào theo root font size"
objectives:
  - Nhận biết các cú pháp màu phổ biến
  - Phân biệt fixed và relative length unit
  - Dùng rem cho text size có khả năng scale
exercise:
  mode: both
  starterHtml: |
    <p class="note">Readable note</p>
  starter: |
    /* TODO: làm .note màu #0b57d0 và cỡ 1.25rem */
  hints:
    - Đặt cả hai declaration trên selector .note.
    - Dùng color cho hex color và font-size cho cỡ chữ.
    - Dùng .note { color: #0b57d0; font-size: 1.25rem; }.
  solution: |
    .note { color: #0b57d0; font-size: 1.25rem; }
  expected:
    type: cssRules
    rules:
      - selector: .note
        declarations:
          color: "#0b57d0"
          font-size: 1.25rem
---

CSS value không chỉ là con số. **Loại value và mốc tham chiếu** quyết định cách trình duyệt resolve nó.

## Mô hình tư duy

| Value | Mốc tham chiếu |
| --- | --- |
| `16px` | CSS pixel length |
| `1em` | font size của chính element |
| `1rem` | font size của root element |
| `50%` | percentage basis phụ thuộc property |
| `#0b57d0`, `rgb(...)`, color keyword | color value |

Relative unit biểu diễn quan hệ thay vì một kích thước cố định duy nhất.

## Dự đoán kết quả hiển thị

Nếu root font size là `16px`, `1.25rem` resolve thành `20px`. Nếu môi trường người dùng tăng root size, text dùng rem cũng scale theo.

## Ví dụ mẫu

```css
.note {
  color: #0b57d0;
  font-size: 1.25rem;
}
```

Chọn unit dựa trên mốc nó tham chiếu, không phải vì một cú pháp nào đó luôn “responsive”. Percentage, `em` và `rem` có basis khác nhau.

## Tìm lỗi

```css
.note { font-size: 1.25; }
```

Phần lớn length property cần unit với giá trị khác zero. Con số này không tự có nghĩa là `rem` hay `px`.

## Lỗi thường gặp

- Nghĩ mọi percentage đều tương đối với cùng một thứ.
- Bỏ unit khỏi non-zero length.
- Chọn text size fixed quá nhỏ làm mất khả năng scale typography.

## Thử ngay

Áp dụng đúng color và rem size cho `.note`, rồi dự đoán resolved size trước khi preview.

## Tự kiểm tra

`rem` tương đối với cái gì?

**Đáp án:** font size của root element.
