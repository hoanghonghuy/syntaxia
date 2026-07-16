---
id: js-00-intro
track: javascript-basics
locale: vi
slug: what-is-javascript
title: JavaScript là gì?
order: 0
published: true
objectives:
  - Giải thích JavaScript bằng lời đơn giản
  - Nhìn một đoạn mã ngắn lưu giá trị và hiện thông báo
  - Chạy console.log đầu tiên trong sandbox JS
exercise:
  starter: |
    let name = "Ada";
    // In lời chào: Hello, Ada
  hints:
    - "Dùng console.log để in thông báo."
    - "Nối chữ bằng + giữa chuỗi trong ngoặc và biến name."
    - "Dòng kết quả phải là Hello, Ada (có dấu phẩy sau Hello)."
  solution: |
    let name = "Ada";
    console.log("Hello, " + name);
  expected:
    type: console
    lines:
      - "Hello, Ada"
---

Một trang web có thể hiện chữ và hình ảnh. **JavaScript** là ngôn ngữ giúp trang *làm* việc — nhớ một tên, tính tổng, hoặc đổi nội dung sau khi bạn bấm.

Bạn không cần là lập trình viên để bắt đầu. Hãy nghĩ JavaScript như một danh sách hướng dẫn ngắn mà trình duyệt làm lần lượt.

Đây là “giấy ghi chú” các ý sẽ dùng:

| Ý | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| Giá trị (value) | Một mẩu thông tin | `"Ada"`, `3` |
| Biến (variable) | Hộp có nhãn chứa giá trị | `name` |
| Câu lệnh (statement) | Một hướng dẫn, thường kết thúc bằng `;` | `let name = "Ada";` |

## Ví dụ mẫu

```javascript
let name = "Ada";
console.log("Hello, " + name);
```

- `let name = "Ada";` tạo hộp có nhãn `name` và đặt chữ Ada vào trong.
- `console.log(...)` nhờ công cụ trình duyệt hiện một thông báo (cách phổ biến để kiểm tra khi học).
- `"Hello, " + name` nối hai đoạn chữ thành một câu.

Nếu chạy trong console trình duyệt, bạn sẽ thấy: `Hello, Ada`.

## Lỗi thường gặp

- Nghĩ JavaScript giống HTML hoặc CSS — HTML dựng cấu trúc trang, CSS trang trí, JavaScript thêm hành vi.
- Quên dấu ngoặc quanh chữ (`Ada` thay vì `"Ada"`) — không có ngoặc, trình duyệt tìm một tên không tồn tại.
- Mong Syntaxia chạy JS trong sandbox SQL — trình chạy đó chỉ dành cho SQL; dùng **sandbox JavaScript** bên dưới trên lộ trình này.

## Thử ngay

Chạy sandbox: in `Hello, Ada` bằng `console.log` và biến `name`. Khi checker báo đúng, đánh dấu hoàn thành bài.
