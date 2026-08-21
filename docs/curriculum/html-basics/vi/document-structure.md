---
id: html-01-document
track: html-basics
locale: vi
slug: document-structure
title: Cấu trúc tài liệu và phần head
order: 1
published: true
can_do: "Tạo bộ khung HTML hoàn chỉnh, đặt metadata trong head và giữ nội dung hiển thị trong body"
objectives:
  - Theo dõi quan hệ cha-con trong bộ khung HTML tối thiểu
  - Đặt language, charset và title đúng vị trí
  - Phân biệt metadata của tài liệu với nội dung hiển thị trong body
exercise:
  mode: html
  starter: |
    <!DOCTYPE html>
    <!-- TODO: thêm html lang, metadata trong head, title và body -->
  hints:
    - Root là <html lang="en">, bên trong có head và body.
    - Đặt <meta charset="utf-8"> và <title> trong head; nội dung nhìn thấy đặt trong body.
    - Hoàn thiện với doctype, html, head, meta charset, title, body và thẻ đóng html.
  solution: |
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>My Page</title>
    </head>
    <body>
      <p>Hello</p>
    </body>
    </html>
  expected:
    type: htmlTags
    sourceIncludes:
      - "<!DOCTYPE html>"
    tags:
      - tag: html
        minCount: 1
        requiredAttrs: [lang]
      - tag: head
        minCount: 1
      - tag: meta
        minCount: 1
        requiredAttrs: [charset]
        attrEquals:
          charset: utf-8
      - tag: title
        minCount: 1
      - tag: body
        minCount: 1
---

Một tài liệu web có hai nhóm trách nhiệm khác nhau: **metadata mô tả tài liệu** và **nội dung được hiển thị trong trang**. Bộ khung rõ ràng giúp hai nhóm này luôn đúng chỗ.

## Mô hình tư duy

```text
Document
├─ <!DOCTYPE html>
└─ html[lang]
   ├─ head
   │  ├─ meta charset
   │  └─ title
   └─ body
      └─ nội dung hiển thị
```

`head` và `body` là hai phần tử cùng cấp bên trong `html`. Title của tab là metadata; `h1` trong body mới là nội dung hiện trên trang.

## Dự đoán cấu trúc khi render

Với đoạn sau, hãy dự đoán chữ nào xuất hiện **trong trang** và chữ nào nằm ở **tab trình duyệt**:

```html
<head><title>Ghi chú khu vườn</title></head>
<body><h1>Cà chua</h1></body>
```

`Cà chua` là nội dung trang; `Ghi chú khu vườn` là metadata dùng cho tab/bookmark.

## Ví dụ mẫu

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="utf-8">
    <title>Ghi chú khu vườn</title>
  </head>
  <body>
    <h1>Cà chua</h1>
  </body>
</html>
```

`lang` giúp các công cụ hiểu ngôn ngữ; UTF-8 biểu diễn văn bản hiện đại an toàn; `title` nhận diện tài liệu bên ngoài phần body.

## Tìm lỗi

```html
<body>
  <meta charset="utf-8">
  <title>Ghi chú khu vườn</title>
  <h1>Cà chua</h1>
</body>
```

Metadata đang nằm trong vùng nội dung. Chuyển metadata của tài liệu vào `head`; chỉ giữ nội dung người dùng đọc hoặc tương tác trong body.

## Lỗi thường gặp

- Xem `<title>` và `<h1>` như hai cách viết tương đương.
- Bỏ qua ngôn ngữ của trang dù đã biết rõ.
- Đặt metadata vào body chỉ vì preview nhìn vẫn có vẻ ổn.

## Thử ngay

Tạo bộ khung tài liệu tối thiểu hoàn chỉnh. Checker giờ kiểm tra cả doctype, language, UTF-8, title, head và body chứ không chỉ đếm container.

## Tự kiểm tra

Khai báo character encoding nên nằm ở đâu?

**Đáp án:** trong `head`, bằng meta charset như `<meta charset="utf-8">`.
