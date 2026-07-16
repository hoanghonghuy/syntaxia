---
id: html-01-document
track: html-basics
locale: vi
slug: document-structure
title: Cấu trúc tài liệu và phần head
order: 1
published: true
objectives:
  - Nhận biết khung trang: doctype, html, head, body
  - Giải thích vai trò của charset, title và lang
  - Phân biệt nội dung trong head với nội dung trong body
exercise:
  mode: html
  starter: |
    <!DOCTYPE html>
    <!-- Complete html, head with title, and body -->
    
  hints:
    - Thêm các phần tử html, head, body và title.
    - Đặt meta charset và title trong head.
    - Đặt nội dung hiển thị trong body.
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
    tags:
      - tag: html
        minCount: 1
      - tag: head
        minCount: 1
      - tag: body
        minCount: 1
      - tag: title
        minCount: 1
---

Một tệp HTML không chỉ là vài thẻ rời. Nó là một *tài liệu* có khung cố định: khai báo loại tài liệu, phần thông tin cho trình duyệt (head), và phần nội dung người dùng nhìn thấy (body).

Hãy nghĩ như tờ giấy có phần tiêu đề hồ sơ (meta) và phần nội dung chính.

| Phần | Vai trò | Người dùng có thấy trực tiếp? |
| --- | --- | --- |
| `<!DOCTYPE html>` | Báo đây là HTML5 | Không |
| `<html>` | Gốc toàn trang | Không (bao ngoài) |
| `<head>` | Tiêu đề tab, mã hóa chữ, liên kết CSS… | Thường không (trừ `title` trên tab) |
| `<body>` | Chữ, ảnh, form… hiện trên trang | Có |

## Ví dụ mẫu

```html
<!DOCTYPE html>
<html lang="vi">
  <head>
    <meta charset="utf-8" />
    <title>Bài học đầu tiên</title>
  </head>
  <body>
    <p>Nội dung trang nằm ở đây.</p>
  </body>
</html>
```

- `<!DOCTYPE html>` báo trình duyệt dùng chế độ HTML hiện đại.
- `lang="vi"` trên `<html>` nói ngôn ngữ chính của trang (hữu ích cho trình đọc màn hình và công cụ).
- `<meta charset="utf-8" />` giúp hiện đúng dấu tiếng Việt và ký tự đặc biệt.
- `<title>` là chữ trên tab trình duyệt và khi đánh dấu trang.
- Mọi thứ người học nhìn trên trang thường nằm trong `<body>`.

## Lỗi thường gặp

- Đặt đoạn văn hoặc ảnh trong `<head>` — head dành cho metadata; nội dung nhìn thấy thuộc `body`.
- Quên `charset` rồi thấy tiếng Việt bị “lỗi font” / ký tự lạ.
- Bỏ `lang` hoặc để sai ngôn ngữ — không làm trang “sập”, nhưng kém hỗ trợ tiếp cận và dịch thuật.

## Thử ngay

Dùng sandbox bên dưới để hoàn thiện khung tài liệu HTML tối thiểu. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
