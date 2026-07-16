---
id: sql-36-wildcards
track: sql-fundamentals
locale: vi
slug: sql-wildcards
title: Ký tự đại diện % và _
order: 36
published: true
objectives:
  - Dùng % để khớp mọi số lượng ký tự
  - Dùng _ để khớp đúng một ký tự
  - Kết hợp ký tự đại diện trong mẫu LIKE
exercise:
  starter: "SELECT code FROM products;"
  hints:
    - "LIKE với ký tự đại diện lọc chữ theo mẫu, không phải so khớp tuyệt đối."
    - "Gạch dưới _ khớp đúng một ký tự — A_C khớp ABC nhưng không khớp AC."
    - "Thử: SELECT code FROM products WHERE code LIKE 'A_C' ORDER BY code;"
  solution: "SELECT code FROM products WHERE code LIKE 'A_C' ORDER BY code;"
  preview:
    columns: ["code"]
    rows:
      - ["ABC"]
      - ["A1C"]
      - ["AC"]
      - ["AXYC"]
  expected:
    columns: ["code"]
    rows:
      - ["A1C"]
      - ["ABC"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE products (id INT, code TEXT, name TEXT);"
    - "INSERT INTO products VALUES (1, 'ABC', 'Alpha'), (2, 'A1C', 'Beta'), (3, 'AC', 'Short'), (4, 'AXYC', 'Long'), (5, 'ZBC', 'Other');"
---

`LIKE` dùng **ký tự đại diện** (wildcard) — ký tự đặc biệt thay cho “chữ gì đó” trong chuỗi. Giống bộ lọc Excel khi bạn gõ `A?C` và `?` nghĩa là “đúng một chữ cái bất kỳ”.

| Ký tự đại diện | Nghĩa đơn giản | Mẫu ví dụ | Khớp |
| --- | --- | --- | --- |
| `%` | Mọi ký tự (không hoặc nhiều) | `'In%'` | `In`, `Inception`, `Interstellar` |
| `_` | Đúng **một** ký tự | `'A_C'` | `ABC`, `A1C` — không khớp `AC`, không khớp `AXYC` |

**products** (bảng đầy đủ bạn sẽ truy vấn)

| id | code | name |
| --- | --- | --- |
| 1 | ABC | Alpha |
| 2 | A1C | Beta |
| 3 | AC | Short |
| 4 | AXYC | Long |
| 5 | ZBC | Other |

## Ví dụ mẫu

Tìm mọi sản phẩm có `code` đúng ba ký tự: bắt đầu bằng `A`, kết thúc bằng `C`, và **một** ký tự ở giữa.

```sql
SELECT code
FROM products
WHERE code LIKE 'A_C'
ORDER BY code;
```

- `'A_C'` nghĩa là: chữ `A`, rồi đúng một ký tự (`_`), rồi chữ `C`.
- `ABC` và `A1C` khớp.
- `AC` quá ngắn (không có ký tự giữa).
- `AXYC` có hai ký tự giữa `A` và `C`, nên không khớp.
- `ZBC` không bắt đầu bằng `A`.

Kết quả:

| code |
| --- |
| A1C |
| ABC |

So với `%` (độ dài giữa tùy ý):

```sql
SELECT code FROM products WHERE code LIKE 'A%C' ORDER BY code;
```

Mẫu đó còn gồm cả `AC` và `AXYC`, vì `%` có thể là rỗng hoặc nhiều ký tự.

## Lỗi thường gặp

- Nhầm `%` với `_` — `%` là “độ dài bất kỳ”; `_` là “đúng một”.
- Nghĩ `_` là “tùy chọn” — `_` luôn chiếm đúng một ký tự.
- Quên dấu ngoặc — mẫu là chữ: `'A_C'`, không phải `A_C` không có ngoặc.

## Thử ngay

Liệt kê mọi `code` khớp mẫu `A_C` (A, một ký tự, C). Sắp xếp theo `code`.
