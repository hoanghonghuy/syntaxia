---
id: pg-00-types
track: postgresql
locale: vi
slug: postgresql-types
title: Kiểu cột trong PostgreSQL
order: 0
published: true
objectives:
  - Nhận biết các kiểu cột PostgreSQL thường gặp
  - Lọc hàng bằng cột kiểu BOOLEAN
exercise:
  starter: "SELECT name, price FROM catalog;"
  hints:
    - "Thêm WHERE để chỉ giữ các hàng còn hàng trong kho."
    - "Cột in_stock là BOOLEAN — so sánh với true (không dùng dấu ngoặc)."
    - "Thử: SELECT name, price FROM catalog WHERE in_stock = true;"
  solution: "SELECT name, price FROM catalog WHERE in_stock = true;"
  preview:
    columns: ["id", "name", "price", "in_stock"]
    rows:
      - [1, "Notebook", 13, true]
      - [2, "Pencil", 1, false]
      - [3, "Eraser", 2, true]
  expected:
    columns: ["name", "price"]
    rows:
      - ["Notebook", 13]
      - ["Eraser", 2]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE catalog (id INTEGER, name TEXT, price INTEGER, in_stock BOOLEAN);"
    - "INSERT INTO catalog VALUES (1, 'Notebook', 13, true), (2, 'Pencil', 1, false), (3, 'Eraser', 2, true);"
---

Trong bảng tính, một cột có thể chứa số, chữ, hoặc giá trị có/không. PostgreSQL gọi quy tắc đó là **kiểu cột** (column type) — quy định giá trị nào được phép trong cột đó.

Các kiểu thường gặp:

| Kiểu | Nghĩa đơn giản | Ví dụ |
| --- | --- | --- |
| `INTEGER` | Số nguyên | `1`, `42` |
| `TEXT` | Chữ và nhãn | `'Notebook'` |
| `NUMERIC` | Số thập phân (bài sau) | `12.5` |
| `BOOLEAN` | Có/không | `true`, `false` |

Đây là danh sách sản phẩm tên `catalog` dùng `INTEGER`, `TEXT`, và `BOOLEAN`:

| id | name | price | in_stock |
| --- | --- | --- | --- |
| 1 | Notebook | 13 | true |
| 2 | Pencil | 1 | false |
| 3 | Eraser | 2 | true |

## Ví dụ mẫu

```sql
SELECT name, price FROM catalog WHERE in_stock = true;
```

- `in_stock` là cột `BOOLEAN`.
- `= true` chỉ giữ sản phẩm còn hàng.
- Pencil bị loại vì `in_stock` là `false`.

Kết quả:

| name | price |
| --- | --- |
| Notebook | 13 |
| Eraser | 2 |

## Lỗi thường gặp

- Bọc `true` trong dấu ngoặc (`'true'`) — đó là chữ, không phải boolean.
- Lọc theo `name` khi bài yêu cầu theo tình trạng kho.
- Nhầm tên kiểu (`INT` và `INTEGER` đều được trong PostgreSQL; đều là số nguyên).

## Thử ngay

Trả về `name` và `price` của mọi sản phẩm đang còn hàng.
