---
id: css-11-lists-links
track: css-basics
locale: vi
slug: styling-lists-and-links
title: Style navigation mà không mất semantics
order: 11
published: true
can_do: "Restyle navigation bằng list/link semantic trong khi vẫn giữ focus behavior dễ nhận biết và tách list presentation khỏi link presentation"
objectives:
  - Bỏ list marker mà không thay đổi list semantics
  - Style link qua descendant selector
  - Giữ focus indicator rõ ràng
exercise:
  mode: both
  starterHtml: |
    <ul class="menu"><li><a href="/home">Home</a></li><li><a href="/docs">Docs</a></li></ul>
  starter: |
    /* TODO: bỏ marker, bỏ underline bình thường và thêm focus outline */
  hints:
    - Style list container và anchor bằng selector riêng.
    - Dùng list-style: none trên .menu và text-decoration: none trên .menu a.
    - Thêm .menu a:focus { outline: 2px solid blue; } để keyboard focus vẫn nhìn thấy.
  solution: |
    .menu { list-style: none; }
    .menu a { text-decoration: none; }
    .menu a:focus { outline: 2px solid blue; }
  expected:
    type: cssRules
    rules:
      - selector: .menu
        declarations:
          list-style: none
      - selector: .menu a
        declarations:
          text-decoration: none
      - selector: .menu a:focus
        declarations:
          outline: 2px solid blue
---

CSS có thể đổi rất mạnh appearance của navigation mà không cần vứt bỏ list/link semantics bên dưới.

## Mô hình tư duy

```text
HTML semantics giữ nguyên: ul -> li -> a
CSS presentation thay đổi: marker, decoration, interaction state
```

Giữ styling responsibility trên selector match đúng box hoặc state liên quan.

## Dự đoán kết quả hiển thị

Bỏ `list-style` làm bullet biến mất nhưng HTML vẫn là list. Bỏ underline thông thường thay visual treatment của link, nên hover/focus rõ ràng càng quan trọng.

## Ví dụ mẫu

```css
.menu { list-style: none; }
.menu a { text-decoration: none; }
.menu a:focus { outline: 2px solid blue; }
```

Presentation không phải lý do để thay semantic link bằng element không phải link.

## Tìm lỗi

```css
.menu { text-decoration: none; }
```

Trong task này `text-decoration` cần áp dụng lên anchor. Chỉ style list container không mô tả đúng intended link rule; hãy target `.menu a` rõ ràng.

## Lỗi thường gặp

- Xóa mọi visual cue của link mà không thêm interaction state hữu ích.
- Thay list/link markup bằng generic div chỉ để style navigation.
- Áp declaration lên sai box trong structure.

## Thử ngay

Restyle semantic navigation và giữ focus state nhìn thấy được.

## Tự kiểm tra

`list-style: none` có biến `ul` thành HTML không còn là list không?

**Đáp án:** không. Nó đổi presentation chứ không đổi document semantics.
