---
id: js-04-string-methods
track: javascript-basics
locale: vi
slug: string-methods
title: Quan sát và biến đổi string
order: 4
published: true
can_do: "Trace string index và immutable transformation để dự đoán method result mà không nghĩ original string bị mutate"
objectives:
  - Đọc vị trí ký tự zero-based và length
  - Dùng slice với end index exclusive
  - Giải thích vì sao string method trả string mới
exercise:
  starter: |
    const code = "Syntaxia";
    // TODO: return the first three characters using slice
  hints:
    - "String index bắt đầu từ 0."
    - "slice(start, end) không lấy vị trí end."
    - "Dùng: return code.slice(0, 3);"
  solution: |
    const code = "Syntaxia";
    return code.slice(0, 3);
  expected:
    type: returnValue
    value: "Syn"
---

String có property và method để inspect hoặc suy ra text mới. Bản thân string value là immutable: transformation method tạo value string mới.

## Mô hình thực thi

Với `"Syntaxia"`:

| index | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| char | S | y | n | t | a | x | i | a |

`.length` là 8. `slice(0, 3)` bắt đầu index 0 và dừng **trước** index 3 nên ra `"Syn"`.

## Trace từng bước

```javascript
const code = "Syntaxia";
const short = code.slice(0, 3);
const upper = code.toUpperCase();
```

| binding | value |
| --- | --- |
| `code` | `"Syntaxia"` |
| `short` | `"Syn"` |
| `upper` | `"SYNTAXIA"` |

`code` vẫn giữ value gốc.

## Dự đoán trước khi chạy

Đánh dấu index 0, 1, 2 được lấy và 3 bị loại. Kết quả phải là `"Syn"`.

## Ví dụ mẫu

```javascript
const raw = "  Hello  ";
const cleaned = raw.trim().toLowerCase();
console.log(cleaned); // hello
```

Method có thể chain vì mỗi method trả một value để method tiếp theo xử lý.

## Tìm lỗi

```javascript
const code = "Syntaxia";
code.toUpperCase();
return code;
```

Nó trả `"Syntaxia"`, không phải uppercase. Method đã tạo string mới nhưng result bị bỏ qua.

## Lỗi thường gặp

- Off-by-one do zero-based index và slice end exclusive.
- Quên `()` khi gọi method như `toUpperCase()`.
- Nghĩ string method mutate original string.

## Thử ngay

Return ba ký tự đầu của `code` bằng `slice`.

## Tự kiểm tra

`code.toUpperCase()` có mutate string đang nằm trong `code` không?

**Đáp án:** không. Nó trả uppercase string mới; string gốc không đổi.
