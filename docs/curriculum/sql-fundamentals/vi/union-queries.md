---
id: sql-24-union
track: sql-fundamentals
locale: vi
slug: union-queries
title: Ghép tập kết quả với UNION
order: 24
published: true
objectives:
  - Xếp chồng dòng từ hai SELECT bằng UNION
  - Hiểu UNION loại giá trị trùng
  - Đặt ORDER BY sau toàn bộ UNION
exercise:
  starter: "SELECT name FROM a;"
  hints:
    - "UNION xếp chồng dòng của hai kết quả SELECT thành một danh sách."
    - "Tên trùng xuất hiện ở cả hai bảng chỉ được giữ một lần."
    - "Thử: SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  solution: "SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
      - ["Dee"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
      - ["Dee"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE a (name TEXT);"
    - "CREATE TEMP TABLE b (name TEXT);"
    - "INSERT INTO a VALUES ('Ann'), ('Bob'), ('Cara');"
    - "INSERT INTO b VALUES ('Bob'), ('Cara'), ('Dee');"
---

Đôi khi bạn có hai danh sách giống nhau và muốn một danh sách gộp — như xếp chồng hai cột Excel. `UNION` chạy hai `SELECT` rồi gộp dòng. Giá trị trùng chỉ xuất hiện một lần.

**a** (bảng đầy đủ)

| name |
| --- |
| Ann |
| Bob |
| Cara |

**b** (bảng đầy đủ)

| name |
| --- |
| Bob |
| Cara |
| Dee |

| name | Trong `a`? | Trong `b`? | Sau `UNION`? |
| --- | --- | --- | --- |
| Ann | có | không | một lần |
| Bob | có | có | một lần (bỏ trùng) |
| Cara | có | có | một lần |
| Dee | không | có | một lần |

## Ví dụ mẫu

```sql
SELECT name FROM a
UNION
SELECT name FROM b
ORDER BY name;
```

- Mỗi `SELECT` phải trả cùng số cột với kiểu tương thích.
- `UNION` bỏ trùng `Bob` và `Cara`.
- `ORDER BY name` sắp danh sách gộp — đặt **sau** toàn bộ `UNION`.
- Để giữ mọi dòng kể cả trùng, dùng `UNION ALL` (bài `union-all`).

Kết quả:

| name |
| --- |
| Ann |
| Bob |
| Cara |
| Dee |

## Lỗi thường gặp

- Dùng `UNION ALL` khi đề cần giá trị duy nhất — `UNION ALL` giữ trùng (xem `union-all`).
- Hai `SELECT` khác số cột — gây lỗi.
- Đặt `ORDER BY` chỉ trên `SELECT` đầu — hãy đặt sau toàn bộ `UNION`.

## Thử ngay

Trả về một danh sách `name` duy nhất đã sắp từ bảng `a` và `b`.
