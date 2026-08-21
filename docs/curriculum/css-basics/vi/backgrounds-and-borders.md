---
id: css-09-backgrounds
track: css-basics
locale: vi
slug: backgrounds-and-borders
title: Surface, border và corner
order: 9
published: true
can_do: "Tạo card surface bằng cách dự đoán box layer nào nhận background, border và corner rounding"
objectives:
  - Phân biệt background fill với border edge
  - Dùng border shorthand theo width-style-color
  - Bo border box bằng border-radius
exercise:
  mode: both
  starterHtml: |
    <div class="card">Card content</div>
  starter: |
    /* TODO: cho .card background sáng, border 1px và corner 8px */
  hints:
    - background-color fill phía sau content và padding.
    - Border shorthand có thể gộp width, style và color.
    - Dùng background-color: #eef; border: 1px solid #ccd; border-radius: 8px;.
  solution: |
    .card {
      background-color: #eef;
      border: 1px solid #ccd;
      border-radius: 8px;
    }
  expected:
    type: cssRules
    rules:
      - selector: .card
        declarations:
          background-color: "#eef"
          border: 1px solid #ccd
          border-radius: 8px
---

Background và border nằm ở các phần khác nhau của box. Hiểu layer giúp tránh kiểu style bằng cách thử ngẫu nhiên property.

## Mô hình tư duy

```text
border edge
└─ background paint phía sau content + padding (và vùng dưới border tùy clipping)
```

`border-radius` đổi hình học border box và background được clip theo corner tùy background clipping rule.

## Dự đoán kết quả hiển thị

Card có background nhưng chưa có border vẫn có surface fill. Thêm `1px solid` tạo edge nhìn thấy. Thêm radius làm corner của edge đó bo tròn.

## Ví dụ mẫu

```css
.card {
  background-color: #eef;
  border: 1px solid #ccd;
  border-radius: 8px;
}
```

Shorthand hữu ích khi cố ý set các thành phần cùng lúc; longhand rõ hơn khi chỉ đổi một phần.

## Tìm lỗi

```css
.card { border: #ccd; }
```

Visible border hữu ích cần border style như `solid`; shorthand không chỉ có một color value.

## Lỗi thường gặp

- Mong background color tự tạo border edge.
- Quên border style trong shorthand.
- Dùng radius rất lớn mà không hiểu box geometry đang được bo.

## Thử ngay

Tạo card surface với đủ ba declaration như yêu cầu.

## Tự kiểm tra

Property nào tạo khoảng trống bên trong border: background, padding hay margin?

**Đáp án:** padding.
