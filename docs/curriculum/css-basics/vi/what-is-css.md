---
id: css-00-intro
track: css-basics
locale: vi
slug: what-is-css
title: CSS là gì?
order: 0
published: true
objectives:
  - Giải thích CSS bằng lời đơn giản (trang trí giao diện, không phải cấu trúc)
  - Phân biệt HTML (cấu trúc) với CSS (kiểu hiển thị)
  - Nhận biết cách gắn style vào trang ở mức khái niệm
exercise:
  mode: both
  starterHtml: |
    <h1>Welcome</h1>
  starter: |
    /* Style the h1 heading */
    
  hints:
    - Chọn h1 bằng selector kiểu thẻ.
    - Thêm thuộc tính color trong ngoặc nhọn.
    - Kết thúc khai báo bằng dấu chấm phẩy.
  solution: |
    h1 { color: teal; }
  expected:
    type: cssIncludes
    needles:
      - color
---

HTML nói *cái gì* nằm trên trang: tiêu đề, đoạn văn, liên kết. **CSS** (Cascading Style Sheets) nói trang *trông như thế nào*: màu chữ, khoảng cách, khung viền.

Hãy nghĩ HTML như khung xương và nhãn nội dung; CSS như lớp sơn, font và khoảng trống. Cùng một HTML có thể nhìn khác nhau khi đổi CSS — đó là ý của “stylesheet” (bảng kiểu).

Ba ý sẽ lặp lại suốt lộ trình:

| Ý | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| Selector | Chọn phần tử nào sẽ được style | `p`, `.note`, `#logo` |
| Property | Tên thuộc tính kiểu | `color`, `margin` |
| Value | Giá trị gán cho thuộc tính | `teal`, `16px` |

## Ví dụ mẫu

```html
<p class="note">Xin chào Syntaxia.</p>
```

```css
.note {
  color: teal;
}
```

- HTML dựng đoạn văn và gắn class `note`.
- CSS chọn `.note` rồi đặt `color` thành `teal`.
- Trình duyệt áp dụng màu chữ xanh ngọc cho đoạn đó.

CSS không thay thế HTML: bạn vẫn cần cấu trúc đúng; CSS chỉ điều khiển cách hiển thị.

## Lỗi thường gặp

- Nghĩ CSS tạo nội dung mới — CSS style những gì HTML đã có; không thay thẻ `<p>` bằng màu.
- Trộn vai trò với JavaScript — CSS trang trí; JavaScript thêm hành vi (bấm, tính toán).
- Mong trang “đẹp” chỉ bằng HTML — không có stylesheet, trình duyệt dùng kiểu mặc định rất thô.

## Thử ngay

Dùng sandbox bên dưới để tô màu tiêu đề. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
