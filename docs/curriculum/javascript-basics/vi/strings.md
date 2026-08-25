---
id: js-03-strings
track: javascript-basics
locale: vi
slug: strings
title: String và template literal
order: 3
published: true
can_do: "Xây string dễ đọc từ literal và value bằng template literal đồng thời dự đoán chính xác text kết quả"
objectives:
  - Phân biệt string data với identifier và number
  - Chèn value vào template literal bằng ${...}
  - Dự đoán chính xác spacing và punctuation
exercise:
  starter: |
    const greeting = "Hello";
    const name = "Sam";
    // TODO: build and return "Hello, Sam!"
  hints:
    - "Template literal dùng backtick thay vì chuỗi quote-plus."
    - "Chèn binding bằng ${greeting} và ${name}."
    - "Dùng: return `${greeting}, ${name}!`;"
  solution: |
    const greeting = "Hello";
    const name = "Sam";
    return `${greeting}, ${name}!`;
  expected:
    type: returnValue
    value: "Hello, Sam!"
---

String là dữ liệu text. Template literal JavaScript hiện đại làm interpolation tường minh và giảm bug punctuation/spacing khi message có dynamic value.

## Mô hình thực thi

| syntax | ví dụ | result |
| --- | --- | --- |
| quoted literal | `"Hello"` | string `Hello` |
| template literal | `` `Hello` `` | string `Hello` |
| interpolation | `` `Hello, ${name}` `` | chèn current value của `name` |

Template literal dùng backtick. `${expression}` được evaluate, chuyển để interpolate vào string rồi chèn vào text xung quanh.

## Trace từng bước

```javascript
const greeting = "Hello";
const name = "Sam";
const message = `${greeting}, ${name}!`;
```

| phần | đóng góp |
| --- | --- |
| `${greeting}` | `Hello` |
| `, ` | dấu phẩy + một space |
| `${name}` | `Sam` |
| `!` | dấu chấm than |

Value cuối: `"Hello, Sam!"`.

## Dự đoán trước khi chạy

Đếm punctuation và whitespace trước Run. Checker so exact returned string.

## Ví dụ mẫu

```javascript
const product = "Notebook";
const quantity = 2;
const message = `${quantity} × ${product}`;
console.log(message); // 2 × Notebook
```

Dùng quoted literal bình thường khi không cần interpolation; template literal phù hợp khi chèn value.

## Tìm lỗi

```javascript
const message = "Hello, ${name}!";
```

Double quote tạo normal string nên `${name}` vẫn là text literal. Interpolation cần backtick.

## Lỗi thường gặp

- Dùng smart quote từ word processor thay vì quote/backtick JavaScript.
- Quên interpolation chỉ hoạt động trong template literal.
- Mất space/punctuation khi nối nhiều đoạn bằng `+`.

## Thử ngay

Return chính xác `Hello, Sam!` bằng template literal và hai binding có sẵn.

## Tự kiểm tra

Muốn `${name}` được interpolate thì string phải được bao bằng gì?

**Đáp án:** backtick để tạo template literal.
