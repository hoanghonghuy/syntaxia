---
id: sql-24-union
track: sql-fundamentals
locale: vi
slug: union-queries
title: Ghép kết quả với UNION
order: 24
published: true
objectives:
  - Xếp chồng dòng từ hai câu SELECT bằng UNION
  - Hiểu UNION loại bỏ giá trị trùng
exercise:
  starter: "SELECT name FROM a;"
  hints:
    - "UNION xếp chồng các dòng từ hai kết quả SELECT thành một danh sách."
    - "Tên trùng xuất hiện ở cả hai bảng chỉ được giữ một lần."
    - "Thử: SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  solution: "SELECT name FROM a UNION SELECT name FROM b ORDER BY name;"
  preview:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
  expected:
    columns: ["name"]
    rows:
      - ["Ann"]
      - ["Bob"]
      - ["Cara"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE a (name TEXT);"
    - "CREATE TEMP TABLE b (name TEXT);"
    - "INSERT INTO a VALUES ('Ann'), ('Bob');"
    - "INSERT INTO b VALUES ('Bob'), ('Cara');"
---

Đôi khi bạn có hai danh sách giống nhau và muốn một danh sách gộp — như xếp chồng hai cột Excel thành một. `UNION` chạy hai câu `SELECT` rồi gộp các dòng. Giá trị trùng chỉ xuất hiện một lần.

**a**

| name |
| --- |
| Ann |
| Bob |

**b**

| name |
| --- |
| Bob |
| Cara |

## Ví dụ mẫu

```sql
SELECT name FROM a
UNION
SELECT name FROM b
ORDER BY name;
```

- Mỗi `SELECT` phải trả về cùng số cột với kiểu tương thích.
- `UNION` bỏ `Bob` trùng.
- `ORDER BY name` sắp xếp danh sách gộp.

Kết quả:

| name |
| --- |
| Ann |
| Bob |
| Cara |

## Lỗi thường gặp

- Dùng `UNION ALL` khi đề cần giá trị duy nhất — `UNION ALL` giữ bản trùng (xem bài `union-all` sau này).
- Chọn số cột khác nhau ở hai câu truy vấn — sẽ lỗi.
- Đặt `ORDER BY` chỉ trên `SELECT` đầu — hãy đặt sau toàn bộ `UNION`.

## Thử ngay

Trả về một danh sách `name` duy nhất đã sắp xếp từ bảng `a` và `b`.
