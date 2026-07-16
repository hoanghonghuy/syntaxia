---
id: sql-06-insert
track: sql-fundamentals
locale: vi
slug: inserting-rows
title: Thêm hàng với INSERT
order: 9
published: true
objectives:
  - Chèn một hàng mới vào bảng
  - Kiểm tra bằng SELECT sau khi chèn
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "INSERT thêm một hàng; liệt kê cột rồi VALUES (...)."
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

Đến giờ bạn chỉ **đọc** dữ liệu. `INSERT` thêm một hàng mới — như nối thêm một dòng cuối sheet.

**movies** — trước khi bạn chèn (chỉ hai phim)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

Bạn sẽ thêm phim thứ ba: Dune (2021).

## Ví dụ mẫu

```sql
INSERT INTO movies (id, title, year)
VALUES (3, 'Dune', 2021);
```

| Phần | Nghĩa |
| --- | --- |
| `INSERT INTO movies` | Thêm hàng vào bảng này |
| `(id, title, year)` | Các cột bạn đang điền |
| `VALUES (3, 'Dune', 2021)` | Một giá trị mỗi cột, cùng thứ tự |

**movies** — sau khi chèn

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |
| 3 | Dune | 2021 |

Sandbox kiểm tra bảng bằng SELECT giúp bạn (sắp theo `id`).

## Lỗi thường gặp

- Dùng ngoặc kép cho chữ (`"Dune"`) — trong SQL, chuỗi dùng ngoặc đơn (`'Dune'`).
- Đặt giá trị sai thứ tự so với danh sách cột.
- Chỉ chạy `SELECT` mà không `INSERT` — grader tìm hàng mới trong bảng.

## Thử ngay

Chèn phim `id = 3`, `title = 'Dune'`, `year = 2021`.
