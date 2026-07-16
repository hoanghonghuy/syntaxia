---
id: css-02-selectors
track: css-basics
locale: vi
slug: type-class-id-selectors
title: Selector type, class và ID
order: 2
published: true
objectives:
  - Dùng type selector theo tên thẻ
  - Dùng class selector với dấu chấm và thuộc tính class
  - Dùng id selector với dấu # và thuộc tính id
---

**Selector** chọn phần tử HTML nào nhận style. Ba loại cơ bản nhất: **type** (theo tên thẻ), **class** (theo nhóm), **id** (theo một phần tử duy nhất trên trang).

Class linh hoạt: nhiều phần tử có thể cùng `class`. Id nên là duy nhất — một `id` cho một phần tử.

| Loại | Cú pháp CSS | Khớp với HTML |
| --- | --- | --- |
| Type | `p` | mọi thẻ `<p>` |
| Class | `.note` | `class="note"` |
| ID | `#logo` | `id="logo"` |

## Ví dụ mẫu

```html
<p>Đoạn thường.</p>
<p class="note">Đoạn ghi chú.</p>
<p id="footer-note">Một dòng cuối trang.</p>
```

```css
p {
  color: #333;
}

.note {
  color: teal;
}

#footer-note {
  font-weight: bold;
}
```

- `p { ... }` style mọi đoạn văn (type).
- `.note` chỉ đoạn có `class="note"` — màu `teal` ghi đè màu chung của `p` cho phần tử đó (bài cascade sẽ giải thích rõ hơn).
- `#footer-note` chỉ phần tử có `id="footer-note"`.

Trong HTML, class viết không có dấu chấm (`class="note"`); trong CSS, class bắt đầu bằng `.`.

## Lỗi thường gặp

- Viết `.note` trong HTML (`class=".note"`) — thuộc tính chỉ cần tên `note`, không có dấu chấm.
- Dùng cùng một `id` trên nhiều phần tử — id phải duy nhất; muốn nhóm thì dùng class.
- Nhầm `p.note` với `.note` quá sớm — `p.note` chỉ khớp `<p class="note">`; bài sau sẽ nói combinator và nhóm.

## Thử ngay

Với HTML mẫu, nói rõ rule nào áp vào đoạn nào. Rồi đánh dấu hoàn thành bài.
