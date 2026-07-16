---
id: js-08-functions
track: javascript-basics
locale: vi
slug: functions
title: Khối tái sử dụng bằng hàm
order: 8
published: true
objectives:
  - Định nghĩa hàm bằng function và tên
  - Truyền giá trị vào qua tham số
  - Gọi hàm và dùng giá trị return
exercise:
  starter: |
    function add(a, b) {
      return a + b;
    }
    console.log(add(4, 5));
  hints:
    - "Gọi add với 4 và 5."
    - "console.log in ra panel kết quả."
    - "Dòng mong đợi chỉ là số 9."
  solution: |
    function add(a, b) {
      return a + b;
    }
    console.log(add(4, 5));
  expected:
    type: console
    lines:
      - "9"
---

Thẻ công thức nấu ăn giữ các bước bạn làm lại bất cứ lúc nào. **Hàm** (function) là khối code có tên, dùng lại được. Bạn **gọi** hàm khi cần thực hiện việc đó.

| Thành phần | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| `function name()` | Định nghĩa khối | `function greet() { ... }` |
| Tham số | Đầu vào người gọi truyền | `function add(a, b)` |
| `return` | Trả kết quả ra | `return a + b` |
| Gọi hàm | Chạy hàm | `greet()` hoặc `add(2, 3)` |

## Ví dụ mẫu

```javascript
function greet(name) {
  return "Hello, " + name + "!";
}

function add(a, b) {
  return a + b;
}

console.log(greet("Sam"));
const sum = add(4, 5);
console.log(sum);
```

- `greet` nhận một tham số `name` và trả về chuỗi.
- `add` nhận hai số và trả về tổng.
- `greet("Sam")` chạy hàm một lần và dùng chuỗi trả về.
- `add(4, 5)` trả về `9`, lưu trong `sum`.

## Lỗi thường gặp

- Gọi hàm trước khi định nghĩa — trong script ngắn, đặt hàm phía trên chỗ gọi.
- Quên `return` — hàm chạy nhưng trả về `undefined` khi bạn mong có giá trị.
- Nhầm tham số và đối số — tham số là tên trong định nghĩa; đối số là giá trị truyền khi gọi.

## Thử ngay

Chạy sandbox: `add(4, 5)` phải in **9** ra console. Khi checker báo đúng, đánh dấu hoàn thành — bạn đã xong phần đọc JavaScript Basics.
