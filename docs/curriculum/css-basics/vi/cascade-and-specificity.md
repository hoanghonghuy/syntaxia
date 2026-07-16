---
id: css-05-cascade
track: css-basics
locale: vi
slug: cascade-and-specificity
title: Cascade và specificity
order: 5
published: true
objectives:
  - Giải thích cascade: nhiều rule cùng nhắm một phần tử
  - So sánh specificity cơ bản giữa type, class và id
  - Nhận biết inheritance (thừa kế) với color và font
exercise:
  mode: both
  starterHtml: |
    <p class="note">Hi</p>
  starter: |
    /* Make .note purple */
    
  hints:
    - Selector class mạnh hơn tên thẻ trần.
    - "Dùng .note { } để chọn đoạn p."
    - Đặt color thành giá trị bạn muốn.
  solution: |
    .note { color: purple; }
  expected:
    type: cssIncludes
    needles:
      - .note
      - color
---

Khi nhiều rule cùng nhắm một phần tử, trình duyệt không “chọn ngẫu nhiên”. **Cascade** (xếp tầng) quyết định rule nào thắng dựa trên nguồn, độ cụ thể (**specificity**), rồi thứ tự trong stylesheet. Một số property còn **inherit** (thừa kế) từ phần tử cha — ví dụ `color` và `font-family` thường lan xuống chữ bên trong.

| Ý | Nghĩa đơn giản |
| --- | --- |
| Cascade | Cách giải xung đột giữa nhiều rule |
| Specificity | “Độ nặng” của selector (id > class > type, ở mức cơ bản) |
| Inheritance | Con có thể nhận một số kiểu từ cha |

Thứ tự specificity đơn giản để nhớ: `#id` mạnh hơn `.class`, và `.class` mạnh hơn `p` (type).

## Ví dụ mẫu

```html
<p id="lead" class="note">Chào mừng.</p>
```

```css
p {
  color: black;
  font-family: Georgia, serif;
}

.note {
  color: teal;
}

#lead {
  color: navy;
}
```

- Cả ba rule đều có thể ảnh hưởng tới đoạn văn.
- `#lead` cụ thể hơn `.note` và `p`, nên `color` cuối cùng là `navy`.
- `font-family` từ rule `p` vẫn áp dụng (không bị rule màu ghi đè) và chữ bên trong thừa kế font đó.

Nếu hai rule cùng specificity, rule khai báo *sau* trong stylesheet thường thắng.

## Lỗi thường gặp

- Dùng quá nhiều `#id` chỉ để “thắng” style — specificity cao làm stylesheet khó bảo trì; ưu tiên class khi có thể.
- Nghĩ rule nào viết trước luôn thắng — với cùng phần tử, specificity và thứ tự đều quan trọng.
- Nhầm mọi property đều thừa kế — `margin` và `padding` thường *không* thừa kế như `color`.

## Thử ngay

Dùng sandbox bên dưới để đặt màu chữ cho .note. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
