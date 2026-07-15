---
id: sql-06-insert
track: sql-fundamentals
locale: vi
slug: inserting-rows
title: Thêm dòng với INSERT
order: 9
published: true
objectives:
  - Thêm một dòng mới vào bảng
  - Kiểm tra bằng SELECT sau khi thêm
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "INSERT thêm một dòng; liệt kê cột rồi VALUES (...)."
    - "Khớp thứ tự cột: id, title, year."
    - "Thử: INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);"
  solution: "INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Dune", 2021]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

Từ đầu đến giờ bạn chỉ **đọc** dữ liệu. `INSERT` thêm một dòng mới — như chèn thêm dòng cuối sheet.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

## Ví dụ mẫu

```sql
INSERT INTO movies (id, title, year) VALUES (3, 'Dune', 2021);
```

- `INSERT INTO movies` chỉ rõ bảng.
- `(id, title, year)` liệt kê các cột bạn đang điền.
- `VALUES (3, 'Dune', 2021)` cung cấp một giá trị cho mỗi cột, cùng thứ tự.

Sau khi thêm, bảng có ba phim. Sandbox sẽ kiểm tra bảng bằng SELECT giúp bạn.

## Lỗi thường gặp

- Dùng ngoặc kép cho chữ (`"Dune"`) — trong SQL, chuỗi dùng ngoặc đơn (`'Dune'`).
- Điền giá trị sai thứ tự so với danh sách cột.
- Chỉ chạy `SELECT` mà không `INSERT` — hệ thống tìm dòng mới trong bảng.

## Thử ngay

Thêm phim `id = 3`, `title = 'Dune'`, `year = 2021`.
