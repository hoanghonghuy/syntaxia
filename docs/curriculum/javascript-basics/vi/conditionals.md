---
id: js-06-conditionals
track: javascript-basics
locale: vi
slug: conditionals
title: Rẽ nhánh với if và else
order: 6
published: true
can_do: "Trace boolean condition vào đúng một branch và dùng strict equality để tránh coercion ngoài ý muốn"
objectives:
  - Evaluate condition trước khi chọn branch
  - Dùng strict equality cho comparison rõ type
  - Phân biệt assignment với comparison
exercise:
  starter: |
    const lives = 0;
    // TODO: if lives is 0 log "Game over", otherwise log "Keep playing"
  hints:
    - "Evaluate lives === 0 trước; lives đang là number 0 nên kết quả true."
    - "Chỉ branch khớp được log một dòng."
    - "Dùng if/else với lives === 0 và console.log('Game over') ở true branch."
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

Conditional biến một boolean decision thành control flow. Kỹ năng quan trọng không phải thuộc braces mà là dự đoán **path nào execute và vì sao**.

## Mô hình thực thi

```text
evaluate condition
    |
    +-- true  -> execute if block
    |
    +-- false -> execute else block
```

Với equality, `===` so sánh mà không thực hiện type coercion như `==`.

## Trace từng bước

```javascript
const lives = 0;
if (lives === 0) {
  console.log("Game over");
} else {
  console.log("Keep playing");
}
```

| bước | result |
| ---: | --- |
| đọc `lives` | number `0` |
| evaluate `lives === 0` | `true` |
| chạy `if` block | log `Game over` |
| `else` block | bỏ qua |

## Dự đoán trước khi chạy

Chính xác một console line: `Game over`. Hai branch không cùng chạy trong một lần if/else evaluate.

## Ví dụ mẫu

```javascript
const age = 20;

if (age >= 18) {
  console.log("adult");
} else {
  console.log("minor");
}
```

Comparison tạo boolean; boolean điều khiển branch.

## Tìm lỗi

```javascript
let lives = 3;
if (lives = 0) {
  console.log("Game over");
}
```

`=` gán value mới chứ không compare. Assignment expression evaluate thành `0`, là falsy, nên branch bị skip—đồng thời `lives` cũng bị đổi. Đây vừa là state bug vừa là control-flow bug.

## Lỗi thường gặp

- Viết assignment `=` khi intent là comparison.
- Dùng coercive `==` mà không hiểu conversion nó cho phép.
- Đọc code như thể cả hai branch cùng chạy thay vì trace condition trước.

## Thử ngay

Hoàn thành if/else để `lives = 0` tạo đúng `Game over`.

## Tự kiểm tra

Khác biệt cốt lõi giữa `=` và `===` là gì?

**Đáp án:** `=` gán value; `===` so sánh value và type mà không dùng coercive equality conversion.
