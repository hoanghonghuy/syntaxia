---
id: js-08-functions
track: javascript-basics
locale: vi
slug: functions
title: Function, parameter và return value
order: 8
published: true
can_do: "Trace function call từ argument sang parameter binding rồi return value và cách caller sử dụng"
objectives:
  - Phân biệt function definition với function call
  - Map argument vào parameter của một call
  - Phân biệt return value với log value
exercise:
  starter: |
    function add(a, b) {
      // TODO: return the sum of a and b
    }
    console.log(add(4, 5));
  hints:
    - "Khi add(4, 5) chạy, a thành 4 và b thành 5 trong call đó."
    - "Function phải return value để console.log nhận được nó."
    - "Dùng: return a + b;"
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

Function đóng gói behavior sau một tên. Để hiểu function, hãy trace boundary giữa **caller** và **function call**.

## Mô hình thực thi

Với call:

```javascript
add(4, 5)
```

```text
caller truyền argument 4, 5
        ↓
parameter binding a=4, b=5
        ↓
function body execute
        ↓
return value 9
        ↓
caller nhận 9
```

Parameter là tên trong function definition; argument là actual value được truyền trong một call cụ thể.

## Trace từng bước

```javascript
function add(a, b) {
  return a + b;
}
console.log(add(4, 5));
```

| bước | value/effect |
| ---: | --- |
| gọi `add(4, 5)` | `a = 4`, `b = 5` |
| evaluate `a + b` | `9` |
| `return 9` | function-call expression trở thành `9` |
| `console.log(...)` | log `9` |

## Dự đoán trước khi chạy

Dự đoán thứ `console.log` nhận, không chỉ việc xảy ra trong function: một Number value `9`.

## Ví dụ mẫu

```javascript
function fullName(first, last) {
  return `${first} ${last}`;
}

const label = fullName("Ada", "Lovelace");
console.log(label);
```

Function tính value; caller quyết định làm gì với returned value đó.

## Tìm lỗi

```javascript
function add(a, b) {
  a + b;
}
console.log(add(4, 5));
```

Expression được evaluate rồi bỏ đi. Không có explicit return thì function return `undefined`. Logging và returning là hai responsibility khác nhau.

## Lỗi thường gặp

- Nhầm parameter name với argument value được truyền vào call.
- Log trong function khi caller cần reusable returned value.
- Quên `return` rồi phải debug `undefined` ở call site.

## Thử ngay

Làm `add(4, 5)` return `9` để `console.log` hiện có in nó ra.

## Tự kiểm tra

Khác biệt giữa `return value` và `console.log(value)` là gì?

**Đáp án:** `return` gửi value về caller; `console.log` chỉ tạo console output như side effect.
