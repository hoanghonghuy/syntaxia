---
id: js-01-variables
track: javascript-basics
locale: vi
slug: variables
title: Binding với const và let
order: 1
published: true
can_do: "Chọn const hay let dựa trên intent reassign và trace value mà binding trỏ tới theo thời gian"
objectives:
  - Ưu tiên const khi binding không reassign
  - Dùng let khi binding phải trỏ tới value mới sau đó
  - Phân biệt tên binding với value hiện tại
exercise:
  starter: |
    const name = "Syntaxia";
    // TODO: return how many characters are in name
  hints:
    - "Binding không cần reassign nên const phù hợp."
    - "String có property .length."
    - "Dùng: return name.length;"
  solution: |
    const name = "Syntaxia";
    return name.length;
  expected:
    type: returnValue
    value: 8
---

Variable giúp code đặt tên có nghĩa cho value. Trong JavaScript hiện đại, lựa chọn quan trọng thường là **binding** có cần reassign hay không.

## Mô hình thực thi

| khai báo | reassign binding? | cách dùng mặc định tốt |
| --- | --- | --- |
| `const x = value` | không | khi `x` luôn trỏ cùng value |
| `let x = value` | có | khi `x` cần trỏ sang value khác |

Ưu tiên `const` cho tới khi algorithm thực sự cần reassignment. Nhờ vậy changing state trở nên rõ ràng.

Một nuance quan trọng: `const` ngăn reassign binding; nó không tự deep-freeze object/array phía sau binding.

## Trace từng bước

```javascript
let score = 0;
score = score + 10;
const player = "Sam";
```

| bước | `score` | `player` |
| ---: | ---: | --- |
| sau declaration | 0 | chưa tạo |
| sau assignment | 10 | chưa tạo |
| sau const | 10 | Sam |

## Dự đoán trước khi chạy

`"Syntaxia"` có 8 ký tự. Bài chỉ đọc `name`, không reassign, nên `const` là declaration rõ hơn.

## Ví dụ mẫu

```javascript
const taxRate = 0.1;
let subtotal = 100;
subtotal = subtotal + 50;
const total = subtotal * (1 + taxRate);
```

Dùng `let` vì `subtotal` thay đổi; dùng `const` cho binding không đổi.

## Tìm lỗi

```javascript
const score = 0;
score = 10;
```

Dòng hai cố reassign const binding và sẽ throw. Khi debug, hỏi state có thực sự cần đổi không; nếu có hãy chọn `let` có chủ đích thay vì biến mọi variable thành mutable.

## Lỗi thường gặp

- Dùng `let` cho mọi variable dù không hề reassign.
- Nhầm assignment (`=`) với equality (`===`).
- Nghĩ `const` tự làm mọi nested value trong object/array immutable.

## Thử ngay

Return số ký tự của string `name` đang có.

## Tự kiểm tra

Khi nào nên chọn `let` thay vì `const`?

**Đáp án:** khi binding đó cần được reassign sang value khác trong quá trình chạy.
