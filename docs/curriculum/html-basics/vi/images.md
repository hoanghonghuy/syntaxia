---
id: html-06-images
track: html-basics
locale: vi
slug: images
title: Ảnh và alt text
order: 6
published: true
objectives:
  - Chèn ảnh bằng img với src và alt
  - Viết alt mô tả nội dung ảnh cho người không thấy hình
  - Hiểu vai trò width/height ở mức cơ bản
exercise:
  mode: html
  starter: |
    <!-- Add an image with src and alt -->
    
  hints:
    - Dùng một thẻ img (tự đóng).
    - src trỏ tới file ảnh.
    - alt mô tả ảnh cho khả năng truy cập.
  solution: |
    <img src="cat.png" alt="A cat">
  expected:
    type: htmlIncludes
    needles:
      - alt=
      - <img
---

Ảnh làm trang dễ hiểu hơn, nhưng ảnh cũng cần “chữ thay thế” khi không tải được hoặc khi dùng trình đọc màn hình. Thẻ `img` là phần tử *rỗng* (không có thẻ đóng); thông tin nằm ở thuộc tính.

| Thuộc tính | Vai trò |
| --- | --- |
| `src` | Đường dẫn tới tệp ảnh |
| `alt` | Mô tả ngắn nội dung ảnh (bắt buộc về mặt thực hành tốt) |
| `width` / `height` | Gợi ý kích thước hiển thị (pixel), giúp ổn định bố cục |

## Ví dụ mẫu

```html
<img
  src="cat.jpg"
  alt="Mèo tabby đang ngủ trên ghế sofa"
  width="400"
  height="300"
/>
```

- `src="cat.jpg"` trỏ tới tệp ảnh (ở đây là đường dẫn tương đối).
- `alt` mô tả *nội dung* ảnh bằng một câu ngắn — không viết “ảnh” hay “hình 1” nếu có thể nói rõ hơn.
- `width` và `height` cho trình duyệt biết tỉ lệ khung trước khi ảnh tải xong (tránh nhảy bố cục).
- Dấu `/` cuối là cách viết thẻ rỗng phổ biến; quan trọng hơn là có đủ `src` và `alt`.

Nếu ảnh chỉ trang trí và không mang thông tin, `alt=""` (rỗng) có thể hợp lý — nhưng với người mới, hãy luyện viết `alt` mô tả có ích trước.

## Lỗi thường gặp

- Quên `alt` — người dùng trình đọc màn hình và khi ảnh lỗi sẽ thiếu thông tin.
- Viết `alt="image"` / `alt="ảnh"` — không mô tả nội dung thật.
- Nhầm `img` cần thẻ đóng `</img>` — `img` là thẻ rỗng; không bọc nội dung bên trong.

## Thử ngay

Dùng sandbox bên dưới để thêm ảnh có src và alt. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
