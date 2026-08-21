---
id: js-05-arrays
track: javascript-basics
locale: vi
slug: arrays
title: Array, index và mutation
order: 5
published: true
can_do: "Trace array trước/sau mutation đồng thời phân biệt const binding với array mutable mà binding đang tham chiếu"
objectives:
  - Đọc array index bắt đầu từ 0
  - Mutate array bằng push và quan sát state mới
  - Giải thích vì sao const array binding vẫn có thể tham chiếu array đã mutate
exercise:
  starter: |
    const fruits = ["apple", "pear", "orange"];
    // TODO: add "mango" to the end, then return fruits.length
  hints:
    - "push mutate array hiện tại bằng cách thêm một phần tử cuối."
    - "const binding fruits không bị reassign; array mà nó tham chiếu thay đổi."
    - "Dùng: fruits.push('mango'); rồi return fruits.length;"
  solution: |
    const fruits = ["apple", "pear", "orange"];
    fruits.push("mango");
    return fruits.length;
  expected:
    type: returnValue
    value: 4
---

Array lưu một dãy value có thứ tự. Học array cần trace cả **vị trí** lẫn **state change**.

## Mô hình thực thi

```javascript
const fruits = ["apple", "pear", "orange"];
```

| index | 0 | 1 | 2 |
| ---: | --- | --- | --- |
| value | apple | pear | orange |

`fruits.length` là `3`; index hợp lệ cuối là `length - 1`, tức `2`.

Declaration dùng `const`, nhưng const bảo vệ **binding** khỏi reassign. Nó không làm array được tham chiếu trở thành immutable.

## Trace từng bước

```javascript
const fruits = ["apple", "pear", "orange"];
fruits.push("mango");
```

| thời điểm | state array | length |
| --- | --- | ---: |
| trước `push` | apple, pear, orange | 3 |
| sau `push` | apple, pear, orange, mango | 4 |

`push` mutate array và trả new length.

## Dự đoán trước khi chạy

Trước khi execute, dự đoán `fruits[3]` thành `"mango"` và `fruits.length` thành `4`.

## Ví dụ mẫu

```javascript
const queue = ["A", "B"];
const newLength = queue.push("C");

console.log(queue);     // ["A", "B", "C"]
console.log(newLength); // 3
```

Returned number và mutated array là hai value khác nhau.

## Tìm lỗi

```javascript
const fruits = ["apple", "pear"];
const result = fruits.push("mango");
return result[0];
```

`result` là number chứ không phải array. Method đã đổi `fruits` rồi trả new length. Khi debug method call, hãy tách hai câu hỏi: **state nào đổi? method return gì?**

## Lỗi thường gặp

- Coi index `1` là phần tử đầu thay vì index `0`.
- Nghĩ `const` làm contents của array immutable.
- Nghĩ `push()` trả cả array thay vì new length.

## Thử ngay

Append `"mango"` vào array hiện có và return length mới.

## Tự kiểm tra

Vì sao `fruits.push(...)` vẫn chạy khi `fruits` khai báo bằng `const`?

**Đáp án:** binding không bị reassign; chính array object được tham chiếu đang mutate.
