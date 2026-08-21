---
id: js-02-numbers
track: javascript-basics
locale: vi
slug: numbers-and-operators
title: Number, operator và thứ tự đánh giá
order: 2
published: true
can_do: "Trace numeric expression qua type và operator precedence để dự đoán JavaScript value cuối"
objectives:
  - Dùng arithmetic operator với Number value
  - Áp dụng precedence nhân/chia trước cộng/trừ
  - Nhận ra khi string gây coercion thay vì numeric addition
exercise:
  starter: |
    const price = 12;
    const quantity = 3;
    // TODO: return the numeric total
  hints:
    - "Hai input đều là Number nên phép nhân là numeric."
    - "Dùng operator * giữa price và quantity."
    - "Dùng: return price * quantity;"
  solution: |
    const price = 12;
    const quantity = 3;
    return price * quantity;
  expected:
    type: returnValue
    value: 36
---

Bug số học thường là bug về type hoặc thứ tự evaluate chứ không phải do tính toán tay. Hãy trace cả operand và operator.

## Mô hình thực thi

Các operator số cơ bản:

| expression | result |
| --- | ---: |
| `2 + 3` | 5 |
| `10 - 4` | 6 |
| `3 * 2` | 6 |
| `5 / 2` | 2.5 |
| `2 + 3 * 4` | 14 |
| `(2 + 3) * 4` | 20 |

Nhân/chia có precedence cao hơn cộng/trừ; parentheses làm grouping intent tường minh.

## Trace từng bước

```javascript
const price = 12;
const quantity = 3;
const total = price * quantity;
```

| expression | type operand | result |
| --- | --- | --- |
| `price * quantity` | number × number | number `36` |

Đối chiếu `"12" + 3`: vì có string operand, `+` concatenate và tạo string `"123"`.

## Dự đoán trước khi chạy

Hai operand bài tập đều là number. Return value phải là **36**, type Number.

## Ví dụ mẫu

```javascript
const subtotal = 12 * 3;
const shipping = 5;
const total = subtotal + shipping;
console.log(total); // 41
```

Trace intermediate value thay vì cố tính cả expression dài trong đầu.

## Tìm lỗi

```javascript
const price = "12";
const quantity = 3;
return price + quantity;
```

Kết quả là `"123"`, không phải `15`. Syntax hợp lệ; bug nằm ở type/coercion. Sửa type ở boundary thay vì thêm conversion tùy tiện khắp code.

## Lỗi thường gặp

- Dùng `x` thay vì `*` để nhân.
- Nghĩ `+` luôn là numeric addition.
- Bỏ qua precedence rồi bắt người đọc tự đoán grouping intent.

## Thử ngay

Return tích số của `price` và `quantity`.

## Tự kiểm tra

Vì sao `"12" + 3` ra `"123"` còn `12 + 3` ra `15`?

**Đáp án:** expression đầu có string nên `+` nối chuỗi; expression sau có hai number nên `+` cộng số.
