---
id: js-07-loops
track: javascript-basics
locale: vi
slug: loops
title: Lặp và accumulator với loop
order: 7
published: true
can_do: "Trace từng loop iteration, update accumulator an toàn và chọn for...of khi chỉ cần collection value"
objectives:
  - Trace changing state qua các loop iteration
  - Dùng for...of để iterate trực tiếp array value
  - Nhận ra off-by-one và loop không terminate
exercise:
  starter: |
    const values = [1, 2, 3];
    let total = 0;
    // TODO: add every value into total with a loop
    return total;
  hints:
    - "for...of cho trực tiếp từng array value; bài này không cần index."
    - "Mỗi iteration update total bằng cách cộng current value."
    - "Dùng: for (const value of values) { total += value; }"
  solution: |
    const values = [1, 2, 3];
    let total = 0;
    for (const value of values) {
      total += value;
    }
    return total;
  expected:
    type: returnValue
    value: 6
---

Loop lặp một rule trong khi state thay đổi từ iteration này sang iteration khác. Cách hiểu tốt là trace state sau **từng iteration**.

## Mô hình thực thi

Với collection value, `for...of` có thể đọc là:

```text
với mỗi value trong iterable -> chạy body một lần với value đó
```

Classic `for (initial; condition; step)` phù hợp khi cần index/control tường minh. `for...of` phù hợp khi chính value là thứ cần xử lý.

## Trace từng bước

```javascript
const values = [1, 2, 3];
let total = 0;

for (const value of values) {
  total += value;
}
```

| iteration | `value` | total trước | total sau |
| ---: | ---: | ---: | ---: |
| 1 | 1 | 0 | 1 |
| 2 | 2 | 1 | 3 |
| 3 | 3 | 3 | 6 |

Invariant của accumulator: sau mỗi iteration, `total` bằng tổng tất cả value đã xử lý tới lúc đó.

## Dự đoán trước khi chạy

Dự đoán state sequence `0 → 1 → 3 → 6`, rồi return value cuối `6`.

## Ví dụ mẫu

```javascript
const prices = [5, 10, 2];
let total = 0;

for (const price of prices) {
  total += price;
}

console.log(total); // 17
```

## Tìm lỗi

```javascript
const values = [1, 2, 3];
let total = 0;
for (let i = 0; i <= values.length; i++) {
  total += values[i];
}
```

Khi `i === values.length`, `values[i]` là `undefined`. Cộng nó với number tạo `NaN`. Đây là off-by-one boundary bug điển hình. Nếu cần index, index hợp lệ cuối là `length - 1`.

## Lỗi thường gặp

- Không update accumulator bên trong loop.
- Dùng `<= length` khi index array rồi đi quá một vị trí.
- Dùng `for...in` khi intent là array value; `for...of` diễn đạt intent trực tiếp hơn.

## Thử ngay

Dùng loop cộng mọi value `[1, 2, 3]` vào `total` và return `6`.

## Tự kiểm tra

Vì sao `for...of` phù hợp bài này?

**Đáp án:** algorithm cần trực tiếp từng array value và không cần numeric index.
