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
  - Biết bài học Syntaxia dùng ví dụ để đọc (chưa có trình chạy JS)
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
- Mong Syntaxia chạy JS trong sandbox SQL — trình chạy đó chỉ dành cho SQL; các bài này dạy bằng ví dụ cho đến khi có sandbox JS.

## Thử ngay

Đọc lại ví dụ mẫu. Bằng lời của bạn, hộp có nhãn `name` đang giữ gì? Khi sẵn sàng, đánh dấu hoàn thành bài và sang phần biến.
