---
id: js-04-string-methods
track: javascript-basics
locale: vi
slug: string-methods
title: Phương thức chuỗi hữu ích
order: 4
published: true
objectives:
  - Đọc độ dài chuỗi
  - Đổi hoa thường bằng toUpperCase và toLowerCase
  - Lấy một đoạn chữ bằng slice
---

Chuỗi không chỉ là nhãn trên hộp — đó là chữ bạn có thể **xem** và **chỉnh nhẹ**. JavaScript cho mỗi chuỗi vài công cụ nhỏ gọi là **phương thức** (method). Bạn gọi bằng dấu chấm sau chuỗi (hoặc biến đang giữ chữ).

| Phương thức / thuộc tính | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| `.length` | Bao nhiêu ký tự | `"hi".length` → `2` |
| `.toUpperCase()` | Bản chữ HOA | `"hi".toUpperCase()` → `"HI"` |
| `.toLowerCase()` | Bản chữ thường | `"HI".toLowerCase()` → `"hi"` |
| `.slice(start)` | Đoạn con từ vị trí | `"hello".slice(1)` → `"ello"` |

Chỉ số bắt đầu từ **0** — chữ đầu tiên là vị trí 0.

## Ví dụ mẫu

```javascript
const code = "Syntaxia";
const short = code.slice(0, 3);

console.log(code.length);
console.log(code.toLowerCase());
console.log(short);
```

- `.length` đếm mọi ký tự trong `code` → `8`.
- `.toLowerCase()` trả về chuỗi thường mới; `code` gốc không đổi.
- `.slice(0, 3)` lấy ký tự từ 0 đến trước 3 → `"Syn"`.

## Lỗi thường gặp

- Quên ngoặc `()` — `code.toUpperCase` không chạy công cụ.
- Tưởng phương thức đổi chuỗi gốc — chúng trả về **chuỗi mới**; gán vào biến nếu cần giữ.
- Nhầm chỉ số slice — vị trí `3` là ký tự **thứ tư**; điểm kết thúc slice không tính.

## Thử ngay

`code.slice(0, 3)` với `"Syntaxia"` cho ra ba chữ nào? Đọc to một lần, rồi đánh dấu hoàn thành bài.
