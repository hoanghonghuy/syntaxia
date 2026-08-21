---
id: html-06-images
track: html-basics
locale: vi
slug: images
title: Ảnh và text alternative
order: 6
published: true
can_do: "Nhúng ảnh với source hợp lệ và chọn text alternative phù hợp dựa trên việc ảnh mang thông tin hay chỉ mang tính trang trí"
objectives:
  - Dùng img với src và thuộc tính alt
  - Viết alt hữu ích cho ảnh mang thông tin
  - Nhận biết alt rỗng là pattern có chủ đích cho ảnh thuần trang trí
exercise:
  mode: html
  starter: |
    <!-- TODO: thêm cat.png với mô tả alt có thông tin -->
  hints:
    - Dùng phần tử img; nó không bọc nội dung con.
    - src xác định file ảnh và alt cung cấp text alternative.
    - Mẫu hợp lệ là <img src="cat.png" alt="A cat sitting by a window">.
  solution: |
    <img src="cat.png" alt="A cat sitting by a window">
  expected:
    type: htmlTags
    tags:
      - tag: img
        minCount: 1
        requiredAttrs: [src, alt]
---

Một ảnh có hai cách biểu diễn song song: tài nguyên hình ảnh được tải từ `src` và **text alternative** dùng khi ảnh không thể hoặc không nên được tiếp nhận bằng thị giác.

## Mô hình tư duy

```text
img
├─ src -> tài nguyên hình ảnh
└─ alt -> text alternative / semantic fallback
```

`img` là void element: có attribute nhưng không có nội dung con và không cần thẻ đóng `</img>` trong HTML.

## Dự đoán cấu trúc khi render

```html
<img src="seedling.jpg" alt="Cây cà chua non trong chậu đất nung">
```

Hãy dự đoán điều gì còn giữ được ý nghĩa nếu ảnh tải lỗi hoặc được đọc bằng công cụ không trực quan: alt vẫn truyền đạt nội dung. Với ảnh hoàn toàn trang trí và không thêm thông tin, `alt=""` có thể được dùng có chủ đích.

## Ví dụ mẫu

```html
<img
  src="tomato-seedling.jpg"
  alt="Cây cà chua non trong chậu đất nung"
  width="640"
  height="480">
```

`width` và `height` có thể giúp trình duyệt giữ trước không gian theo tỉ lệ ảnh khi đang tải. Chúng không thay thế responsive CSS sau này.

## Tìm lỗi

```html
<img src="chart.png" alt="image">
```

Attribute có tồn tại nhưng mô tả làm mất toàn bộ ý nghĩa của biểu đồ. Chất lượng alt phụ thuộc vai trò của ảnh trong ngữ cảnh, không phải chỉ tick đủ attribute.

## Lỗi thường gặp

- Bỏ hẳn thuộc tính `alt`.
- Dùng tên file hoặc từ chung chung như “image” thay cho ý nghĩa hữu ích.
- Viết alt dài gây nhiễu cho ảnh thuần trang trí thay vì cân nhắc `alt=""`.

## Thử ngay

Thêm `cat.png` cùng text alternative có thông tin. Grader giờ yêu cầu cả `src` và `alt` nằm trên phần tử `img` thật.

## Tự kiểm tra

Có phải mọi ảnh đều cần alt dài và không rỗng?

**Đáp án:** không. Ảnh mang thông tin cần alternative hữu ích; ảnh thuần trang trí thường dùng `alt=""`.
