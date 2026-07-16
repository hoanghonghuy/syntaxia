---
id: js-06-conditionals
track: javascript-basics
locale: vi
slug: conditionals
title: Ra quyết định với if và else
order: 6
published: true
objectives:
  - Chạy một nhánh khi điều kiện đúng
  - Dùng else cho nhánh còn lại
  - So sánh giá trị bằng ===
exercise:
  starter: |
    const lives = 0;
    if (lives === 0) {
      console.log("Game over");
    } else {
      console.log("Keep playing");
    }
  hints:
    - "Khi lives là 0, điều kiện if đúng."
    - "Chỉ khối if chạy — dùng console.log bên trong."
    - "In chính xác: Game over"
  solution: |
    const lives = 0;
    if (lives === 0) {
      console.log("Game over");
    } else {
      console.log("Keep playing");
    }
  expected:
    type: console
    lines:
      - "Game over"
---

Mỗi ngày bạn chọn: nếu trời mưa thì mang ô; không thì đi bình thường. **Điều kiện** (conditional) giúp code chọn tương tự.

| Thành phần | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| `if (test)` | Chạy khối khi test đúng | `if (score >= 10)` |
| `else` | Chạy khi test sai | `else { ... }` |
| `===` | Cùng giá trị và kiểu | `lives === 0` |

Dùng `===` (ba dấu bằng) để so sánh rõ ràng — kiểm tra cả giá trị **và** kiểu.

## Ví dụ mẫu

```javascript
const lives = 0;

if (lives === 0) {
  console.log("Game over");
} else {
  console.log("Keep playing");
}

const score = 12;
if (score >= 10) {
  console.log("You passed");
}
```

- Khi `lives` là `0`, chỉ khối `if` chạy.
- Khối `else` chạy khi test trong `if` sai.
- `if` thứ hai có thể đứng một mình — không bắt buộc có `else`.

## Lỗi thường gặp

- Dùng `=` trong test — đó là gán, không phải so sánh. Dùng `===`.
- Dùng `==` khi mới học — nên dùng `===` cho rõ.
- Quên `{ }` quanh nhiều dòng — ngoặc nhóm các dòng thuộc nhánh.

## Thử ngay

Với `lives` là `0`, chạy sandbox để console hiện **Game over**. Đánh dấu hoàn thành khi checker báo đúng.
