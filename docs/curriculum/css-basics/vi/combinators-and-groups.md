---
id: css-03-combinators
track: css-basics
locale: vi
slug: combinators-and-groups
title: Combinator và danh sách selector
order: 3
published: true
objectives:
  - Phân biệt descendant (khoảng trắng) và child (`>`)
  - Nhận biết sibling (`+`, `~`) ở mức cơ bản
  - Nhóm nhiều selector bằng dấu phẩy
exercise:
  mode: both
  starterHtml: |
    <article><p>A</p></article>
  starter: |
    /* Style paragraphs inside article */
    
  hints:
    - "Selector con cháu: article rồi dấu cách rồi p."
    - Thêm khai báo color.
    - Dấu cách nghĩa là “bên trong”, không chỉ con trực tiếp.
  solution: |
    article p { color: green; }
  expected:
    type: cssIncludes
    needles:
      - article p
---

**Combinator** nối các phần selector để mô tả *quan hệ* giữa phần tử: nằm bên trong, là con trực tiếp, hoặc là anh/em kế bên. **Danh sách selector** dùng dấu phẩy để áp cùng style cho nhiều selector khác nhau.

| Cú pháp | Tên thường gọi | Ý nghĩa đơn giản |
| --- | --- | --- |
| `A B` | Descendant | `B` nằm đâu đó trong `A` |
| `A > B` | Child | `B` là con *trực tiếp* của `A` |
| `A + B` | Adjacent sibling | `B` đứng ngay sau `A` cùng cấp |
| `A ~ B` | General sibling | `B` đứng sau `A` cùng cấp (không nhất thiết sát) |
| `A, B` | Selector list | Style cho cả `A` và `B` |

## Ví dụ mẫu

```html
<article>
  <h2>Ghi chú</h2>
  <p>Mở đầu.</p>
  <p class="tip">Mẹo nhỏ.</p>
</article>
<p>Ngoài article.</p>
```

```css
article p {
  color: #333;
}

article > p {
  margin-left: 8px;
}

h2 + p {
  font-weight: bold;
}

h2, .tip {
  color: teal;
}
```

- `article p` chọn mọi `p` bên trong `article` (kể cả lồng sâu hơn — ở đây là con trực tiếp).
- `article > p` chỉ `p` là con trực tiếp của `article`.
- `h2 + p` chọn đoạn “Mở đầu.” vì nó đứng ngay sau `h2`.
- `h2, .tip` cùng màu `teal` cho tiêu đề và phần tử class `tip`.

Đoạn “Ngoài article.” không khớp `article p`.

## Lỗi thường gặp

- Nhầm khoảng trắng `article p` với `article > p` — descendant rộng hơn; child chặt hơn.
- Quên rằng `+` chỉ khớp phần tử *ngay sau* — có thẻ xen giữa thì `h2 + p` không khớp.
- Viết `h2 .tip` (có khoảng trắng) khi muốn danh sách — khoảng trắng là descendant; danh sách dùng dấu phẩy: `h2, .tip`.

## Thử ngay

Dùng sandbox bên dưới để chọn p bên trong article. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
