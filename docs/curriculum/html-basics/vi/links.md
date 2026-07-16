---
id: html-05-links
track: html-basics
locale: vi
slug: links
title: Tạo liên kết
order: 5
published: true
objectives:
  - Tạo liên kết bằng thẻ a và thuộc tính href
  - Phân biệt URL tuyệt đối và đường dẫn tương đối
  - Viết chữ liên kết rõ ràng (không chỉ “bấm vào đây”)
---

Liên kết (link) đưa người đọc sang trang khác hoặc vị trí khác. Trong HTML, thẻ `a` (anchor) cùng thuộc tính `href` tạo liên kết.

| Thành phần | Vai trò | Ví dụ |
| --- | --- | --- |
| `<a>` … `</a>` | Phần tử liên kết | chữ người dùng bấm |
| `href` | Đích đến | URL hoặc đường dẫn tệp |
| Tuyệt đối | Địa chỉ đầy đủ | `https://example.com` |
| Tương đối | Đường dẫn trong cùng site | `about.html`, `../index.html` |

## Ví dụ mẫu

```html
<p>
  Đọc
  <a href="https://developer.mozilla.org/">tài liệu MDN</a>
  để học thêm.
</p>
<p>
  Xem thêm trang
  <a href="about.html">Giới thiệu</a>
  trong cùng thư mục.
</p>
```

- `href` chứa đích; chữ giữa `<a>` và `</a>` là phần người dùng nhìn và kích hoạt.
- Liên kết MDN dùng URL tuyệt đối (bắt đầu bằng `https://`).
- `about.html` là đường dẫn tương đối — trình duyệt tìm tệp gần trang hiện tại.
- Chữ liên kết nên mô tả đích (“tài liệu MDN”), không nên chỉ viết “bấm vào đây”.

## Lỗi thường gặp

- Quên `href` hoặc viết sai tên thuộc tính (`hrf`) — liên kết không đi được.
- Để trống chữ trong `<a></a>` — người dùng không thấy gì để bấm.
- Dùng URL tuyệt đối cho mọi trang nội bộ khi đang học cấu trúc thư mục — hãy luyện cả đường dẫn tương đối.

## Thử ngay

Trong ví dụ mẫu, chỉ ra liên kết nào tuyệt đối, liên kết nào tương đối, và chữ hiển thị của mỗi liên kết là gì. Rồi đánh dấu hoàn thành bài.
