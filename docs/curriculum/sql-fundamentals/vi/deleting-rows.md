---
id: sql-08-delete
track: sql-fundamentals
locale: vi
slug: deleting-rows
title: Xóa hàng với DELETE
order: 11
published: true
objectives:
  - Xóa hàng bằng DELETE
  - Bảo vệ dữ liệu bằng WHERE
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "DELETE FROM bảng WHERE điều_kiện xóa các hàng khớp."
    - "Luôn có WHERE để không xóa cả bảng."
    - "Thử: DELETE FROM movies WHERE year < 2000;"
  solution: "DELETE FROM movies WHERE year < 2000;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Old Cut", 1985, "Unknown"]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [3, "Dune", 2021]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Old Cut', 1985, 'Unknown');"
---

`DELETE` xóa cả hàng. Giống `UPDATE`, luôn thêm `WHERE` để không xóa sạch bảng.

**movies** — trước khi xóa (bốn phim)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Old Cut | 1985 | Unknown |

Phim trước năm 2000 phải đi: The Matrix và Old Cut.

## Ví dụ mẫu

```sql
DELETE FROM movies
WHERE year < 2000;
```

- `DELETE FROM movies` chỉ bảng.
- `WHERE year < 2000` chọn hàng cần xóa.
- The Matrix (1999) và Old Cut (1985) bị xóa; Inception và Dune còn lại.

**movies** — sau khi xóa (checker đọc)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 3 | Dune | 2021 |

## Lỗi thường gặp

- Chạy `DELETE FROM movies;` không `WHERE` — xóa mọi hàng.
- Dùng `>` thay vì `<` khi đề nói “trước” một năm.
- Nhầm `DELETE` (xóa hàng) với `UPDATE` (đổi ô).

## Thử ngay

Xóa các phim phát hành trước năm 2000.
