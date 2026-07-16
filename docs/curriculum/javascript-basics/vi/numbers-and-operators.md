---
id: js-02-numbers
track: javascript-basics
locale: vi
slug: numbers-and-operators
title: Số và toán tử cơ bản
order: 2
published: true
objectives:
  - Dùng +, -, *, / với số
  - Lưu kết quả phép tính vào biến
  - Đọc biểu thức ngắn và dùng ngoặc khi cần
exercise:
  starter: |
    const price = 12;
    const quantity = 3;
    // return tổng (price * quantity)
  hints:
    - "Nhân price với quantity bằng *."
    - "Dùng return để trả số về cho checker."
    - "12 nhân 3 là đáp án."
  solution: |
    const price = 12;
    const quantity = 3;
    return price * quantity;
  expected:
    type: returnValue
    value: 36
---

Máy tính kết hợp số với ký hiệu như + và ×. JavaScript cũng vậy nhờ **toán tử** (operator). Bạn viết số và ký hiệu; trình duyệt tính kết quả.

Các toán tử thường gặp:

| Ký hiệu | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| `+` | Cộng | `2 + 3` → `5` |
| `-` | Trừ | `10 - 4` → `6` |
| `*` | Nhân | `3 * 2` → `6` |
| `/` | Chia | `8 / 2` → `4` |

## Ví dụ mẫu

```javascript
const price = 12;
const quantity = 3;
const total = price * quantity;

console.log(total);
console.log((price + 2) * quantity);
```

- `price * quantity` nhân 12 với 3 và lưu `36` vào `total`.
- Ngoặc `(price + 2)` chạy trước, rồi nhân với `quantity` → `42`.
- Không có ngoặc thì nhân trước cộng — ngoặc làm thứ tự rõ ràng.

## Lỗi thường gặp

- Dùng chữ `x` để nhân — trong JavaScript nhân là `*`, không phải chữ x.
- Nối chữ nhầm (`"12" + 3` thành `"123"`) — dấu ngoặc kép tạo chữ, không phải số.
- Quên `/` có thể ra số thập phân (`5 / 2` là `2.5`).

## Thử ngay

Return tổng `price * quantity` trong sandbox (cùng số như ví dụ mẫu). Khi checker báo **Đúng rồi**, đánh dấu hoàn thành.
