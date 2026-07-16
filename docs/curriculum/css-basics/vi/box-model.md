---
id: css-06-box
track: css-basics
locale: vi
slug: box-model
title: Box model
order: 6
published: true
objectives:
  - Đặt tên bốn lớp: content, padding, border, margin
  - Phân biệt khoảng trong (padding) và khoảng ngoài (margin)
  - Biết box-sizing: border-box giúp tính kích thước dễ hơn
---

Mọi phần tử trên trang được trình duyệt vẽ như một **box** (hộp). **Box model** gồm bốn lớp từ trong ra ngoài: nội dung (content), đệm trong (padding), viền (border), và khoảng ngoài (margin).

Hiểu box model giúp bạn đoán vì sao khối “to hơn” số `width` bạn gõ — trừ khi dùng `box-sizing: border-box`.

| Lớp | Vai trò |
| --- | --- |
| Content | Chữ, ảnh, hoặc nội dung bên trong |
| Padding | Khoảng trống *trong* viền, quanh content |
| Border | Đường viền quanh padding |
| Margin | Khoảng trống *ngoài* viền, đẩy các hộp khác ra |

## Ví dụ mẫu

```html
<div class="card">Ghi chú ngắn</div>
```

```css
.card {
  width: 200px;
  padding: 16px;
  border: 2px solid teal;
  margin: 12px;
  box-sizing: border-box;
}
```

- `width: 200px` với `box-sizing: border-box` nghĩa là **tổng** chiều ngang kể cả padding và border khoảng 200px (content co lại cho vừa).
- `padding: 16px` tạo khoảng thở bên trong viền.
- `border: 2px solid teal` vẽ viền xanh ngọc.
- `margin: 12px` đẩy hộp ra xa các phần tử xung quanh.

Không có `border-box`, nhiều trình duyệt mặc định cộng padding/border *ngoài* `width` — hộp thực tế rộng hơn 200px.

## Lỗi thường gặp

- Nhầm padding với margin — padding nằm trong viền; margin nằm ngoài.
- Quên `box-sizing` rồi bất ngờ layout “tràn” — thử `border-box` khi đặt `width` cố định.
- Đặt `margin` lớn để “đệm chữ trong hộp” — đệm trong hộp là `padding`.

## Thử ngay

Nhìn rule `.card` và nói từng dòng thuộc lớp nào của box model. Rồi đánh dấu hoàn thành bài.
