---
id: js-05-arrays
track: javascript-basics
locale: vi
slug: arrays
title: Danh sách bằng mảng
order: 5
published: true
objectives:
  - Tạo mảng bằng dấu ngoặc vuông
  - Đọc một phần tử theo chỉ số bắt đầu từ 0
  - Thêm phần tử bằng push và đọc length
exercise:
  starter: |
    const fruits = ["apple", "pear", "orange"];
    fruits.push("mango");
    return fruits.length;
  hints:
    - "push thêm một phần tử vào cuối mảng."
    - "length đếm số phần tử trong danh sách."
    - "Có 3 quả, thêm 1 — tổng bao nhiêu?"
  solution: |
    const fruits = ["apple", "pear", "orange"];
    fruits.push("mango");
    return fruits.length;
  expected:
    type: returnValue
    value: 4
---

Danh sách mua sắm giữ nhiều tên theo thứ tự. **Mảng** (array) là danh sách có thứ tự trong JavaScript — nhiều giá trị dưới một tên biến.

| Ý | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| Tạo | Ngoặc vuông, phẩy | `["táo", "lê"]` |
| Chỉ số | Vị trí, bắt đầu 0 | phần tử đầu là `[0]` |
| `.length` | Bao nhiêu phần tử | `list.length` |
| `.push(item)` | Thêm vào cuối | `list.push("chuối")` |

## Ví dụ mẫu

```javascript
const fruits = ["apple", "pear", "orange"];

console.log(fruits[0]);
console.log(fruits.length);

fruits.push("mango");
console.log(fruits[fruits.length - 1]);
```

- `fruits[0]` là phần tử đầu → `"apple"`.
- `.length` là `3` trước khi push.
- `.push("mango")` thêm phần tử thứ tư; `fruits.length - 1` là chỉ số phần tử cuối.

## Lỗi thường gặp

- Dùng chỉ số 1 cho phần tử đầu — mảng bắt đầu từ **0**.
- Nhầm cú pháp mảng và object — mảng dùng `[ ]`, không phải `{ }`.
- Tưởng `push` trả về cả danh sách — nó trả về độ dài mới; đọc biến mảng để xem các phần tử.

## Thử ngay

`push("mango")` vào `fruits` rồi **return** `.length` mới trong sandbox. Đánh dấu hoàn thành khi checker báo đúng.
