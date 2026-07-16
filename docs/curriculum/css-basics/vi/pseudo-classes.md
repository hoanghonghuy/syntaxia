---
id: css-04-pseudo
track: css-basics
locale: vi
slug: pseudo-classes
title: Pseudo-class cho liên kết
order: 4
published: true
objectives:
  - Giải thích pseudo-class là trạng thái hoặc điều kiện của phần tử
  - Style liên kết với :link, :visited, :hover, :focus
  - Hiểu :focus giúp bàn phím và tiếp cận
---

**Pseudo-class** (lớp giả) chọn phần tử theo *trạng thái* — ví dụ liên kết chưa mở, đã mở, đang hover chuột, hoặc đang có focus bàn phím — mà không cần thêm class trong HTML.

Với liên kết (`<a href="...">`), các pseudo-class phổ biến nhất là trạng thái liên kết và tương tác.

| Pseudo-class | Khi nào khớp |
| --- | --- |
| `:link` | Liên kết chưa thăm (unvisited) |
| `:visited` | Liên kết đã thăm |
| `:hover` | Con trỏ đang nằm trên phần tử |
| `:focus` | Phần tử đang nhận focus (tab bàn phím, click vào ô nhập…) |

## Ví dụ mẫu

```html
<p><a href="https://example.com">Tài liệu mẫu</a></p>
```

```css
a:link {
  color: navy;
}

a:visited {
  color: purple;
}

a:hover {
  text-decoration: underline;
}

a:focus {
  outline: 2px solid teal;
}
```

- `a:link` đặt màu cho liên kết chưa mở.
- `a:visited` đổi màu sau khi đã thăm (trình duyệt nhớ ở mức riêng tư có giới hạn).
- `a:hover` thêm gạch chân khi rê chuột.
- `a:focus` hiện viền rõ khi focus — quan trọng cho người dùng bàn phím.

Thứ tự khai báo các trạng thái liên kết thường được khuyên là link → visited → hover → focus (dễ nhớ: LVHF) để tránh bị ghi đè ngoài ý muốn.

## Lỗi thường gặp

- Chỉ style `:hover` mà bỏ `:focus` — người chỉ dùng bàn phím khó biết đang đứng ở liên kết nào.
- Viết `a:hover` như class HTML (`class="hover"`) — pseudo-class chỉ nằm trong CSS, sau dấu `:`.
- Quên `href` trên `<a>` — không phải liên kết thật thì hành vi `:link` / `:visited` có thể không như mong đợi.

## Thử ngay

Đọc lại bảng bốn trạng thái và nói mỗi cái xảy ra khi nào. Rồi đánh dấu hoàn thành bài.
