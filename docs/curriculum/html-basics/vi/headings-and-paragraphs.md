---
id: html-02-headings
track: html-basics
locale: vi
slug: headings-and-paragraphs
title: Tiêu đề và đoạn văn
order: 2
published: true
objectives:
  - Dùng h1–h6 để tạo khung đề mục có thứ bậc
  - Viết đoạn văn bằng thẻ p
  - Tránh nhảy cấp tiêu đề (ví dụ h1 rồi h3)
---

Khi đọc sách hoặc tài liệu, bạn nhìn tiêu đề lớn rồi tiêu đề nhỏ hơn. HTML cũng vậy: **tiêu đề** (`h1`–`h6`) tạo khung đề mục; **đoạn văn** (`p`) chứa câu chữ thường.

Thứ bậc tiêu đề giúp người đọc (và trình đọc màn hình) hiểu cấu trúc, không chỉ để chữ to/nhỏ.

| Thẻ | Vai trò thường gặp |
| --- | --- |
| `h1` | Tiêu đề chính của trang (thường một cái) |
| `h2` | Mục lớn dưới `h1` |
| `h3`–`h6` | Mục con sâu hơn |
| `p` | Một đoạn văn bản |

## Ví dụ mẫu

```html
<h1>Học HTML cơ bản</h1>
<p>HTML đánh dấu cấu trúc nội dung trên trang web.</p>
<h2>Tiêu đề và đoạn</h2>
<p>Dùng heading để chia mục; dùng paragraph để viết câu.</p>
```

- `h1` là đề chính của trang.
- Mỗi `p` là một đoạn riêng; trình duyệt thường thêm khoảng cách giữa các đoạn.
- `h2` nằm dưới `h1` — không nhảy từ `h1` sang `h3` nếu chưa có `h2`.

## Lỗi thường gặp

- Dùng heading chỉ vì muốn chữ to — nên dùng CSS để chỉnh kích thước; heading mang ý nghĩa cấu trúc.
- Nhảy cấp (`h1` rồi `h3`) — khung đề mục bị “lủng”, khó theo dõi bằng bàn phím / trình đọc màn hình.
- Nhồi nhiều đoạn vào một `p` bằng cách xuống dòng tay trong mã — mỗi ý đoạn nên là một thẻ `p` (hoặc danh sách nếu là list).

## Thử ngay

Đọc lại ví dụ: đếm có bao nhiêu heading và bao nhiêu paragraph; kiểm tra thứ bậc có liền mạch không. Rồi đánh dấu hoàn thành bài.
