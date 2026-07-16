---
id: js-07-loops
track: javascript-basics
locale: vi
slug: loops
title: Lặp công việc bằng vòng lặp
order: 7
published: true
objectives:
  - Lặp code bằng vòng for
  - Dùng biến đếm i
  - Duyệt từng phần tử mảng theo chỉ số
exercise:
  starter: |
    let total = 0;
    // Dùng vòng for để cộng 1, 2 và 3 vào total
    return total;
  hints:
    - "Vòng lặp cộng lần lượt 1, 2, 3 vào total."
    - "Dùng return sau khi vòng lặp kết thúc."
    - "1 + 2 + 3 là đáp án."
  solution: |
    let total = 0;
    for (let n = 1; n <= 3; n++) {
      total = total + n;
    }
    return total;
  expected:
    type: returnValue
    value: 6
---

Rửa mười dĩa theo cùng một thao tác rất mệt. **Vòng lặp** (loop) lặp một khối code nhỏ cho mỗi bước — cùng mẫu, nhiều lần.

| Thành phần | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| `for (...)` | Lặp có kiểm soát | `for (let i = 0; i < 3; i++)` |
| `i` | Biến đếm, thường bắt đầu 0 | `i++` cộng 1 mỗi vòng |
| `array[i]` | Phần tử ở vị trí `i` | `names[i]` trong vòng |

Vòng `for` thường có ba phần: bắt đầu (`let i = 0`), tiếp tục khi (`i < length`), bước (`i++`).

## Ví dụ mẫu

```javascript
const names = ["Ana", "Bo", "Cy"];

for (let i = 0; i < names.length; i++) {
  console.log(i + ": " + names[i]);
}

let total = 0;
for (let n = 1; n <= 3; n++) {
  total = total + n;
}
console.log(total);
```

- Vòng đầu in mỗi tên kèm chỉ số.
- `names.length` là `3`, nên `i` chạy `0`, `1`, `2` rồi dừng.
- Vòng thứ hai cộng `1 + 2 + 3` vào `total` → `6`.

## Lỗi thường gặp

- Lệch một — `i < length` dừng đúng chỉ số cuối; `i <= length` vượt quá mảng.
- Dùng `i` ngoài vòng — `let i` trong `for` chỉ sống trong khối vòng.
- Vòng vô hạn — nếu biến đếm không tiến (`thiếu i++`), vòng không bao giờ kết thúc.

## Thử ngay

Return tổng `1 + 2 + 3` bằng vòng `for` như ví dụ mẫu. Đánh dấu hoàn thành khi checker hiện **6**.
