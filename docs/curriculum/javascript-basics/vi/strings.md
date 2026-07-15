---
id: js-03-strings
track: javascript-basics
locale: vi
slug: strings
title: Tạo và nối chuỗi chữ
order: 3
published: true
objectives:
  - Lưu chữ trong chuỗi bằng dấu ngoặc
  - Nối hai chuỗi bằng +
  - Phân biệt chữ với số
---

Chữ trên trang web là **văn bản**. Trong JavaScript, một đoạn chữ gọi là **chuỗi** (string). Bạn bọc chữ trong dấu ngoặc để máy biết đó là chữ, không phải tên lệnh.

| Kiểu | Ví dụ | Nghĩa đơn giản |
| --- | --- | --- |
| Ngoặc kép | `"Xin chào"` | Chữ trong `"..."` |
| Ngoặc đơn | `'Xin chào'` | Cùng ý với `'...'` |

Chọn một kiểu và giữ nhất quán trong script ngắn. Với người mới, hai kiểu hoạt động giống nhau.

## Ví dụ mẫu

```javascript
const greeting = "Xin chào";
const name = "Sam";
const message = greeting + ", " + name + "!";

console.log(message);
console.log("Điểm: " + 10);
```

- `"Xin chào"` và `"Sam"` là chuỗi — chữ có dấu ngoặc.
- `+` giữa các chuỗi **nối** chúng thành một chuỗi dài hơn.
- `"Điểm: " + 10` nối chữ với số; JavaScript chuyển `10` thành chữ để nối.

## Lỗi thường gặp

- Quên dấu ngoặc — `Hello` không có ngoặc được coi là nhãn, không phải chữ, và gây lỗi.
- Dùng ngoặc cong từ Word (`“Hello”`) — dùng `"` hoặc `'` thẳng trên bàn phím.
- Tưởng `+` luôn cộng số — `"2" + 3` thành `"23"` vì một bên là chữ.

## Thử ngay

Trong ví dụ mẫu, `message` sau khi nối là đoạn chữ đầy đủ nào? Đọc to một lần, rồi đánh dấu hoàn thành bài.
