---
id: sql-08-delete
track: sql-fundamentals
locale: vi
slug: deleting-rows
title: Xóa dòng với DELETE
order: 11
published: true
objectives:
  - Xóa dòng bằng DELETE
  - Bảo vệ dữ liệu bằng WHERE
exercise:
  starter: "SELECT id, title, year FROM movies ORDER BY id;"
  hints:
    - "DELETE FROM bảng WHERE điều_kiện sẽ xóa các dòng khớp."
    - "Luôn có WHERE để không xóa sạch cả bảng."
    - "Thử: DELETE FROM movies WHERE year < 2000;"
  solution: "DELETE FROM movies WHERE year < 2000;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT id, title, year FROM movies ORDER BY id;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

`DELETE` xóa cả dòng. Giống `UPDATE`, luôn thêm `WHERE` để không xóa sạch bảng.

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |

## Ví dụ mẫu

```sql
DELETE FROM movies WHERE year < 2000;
```

- `DELETE FROM movies` chỉ rõ bảng.
- `WHERE year < 2000` chỉ xóa các dòng khớp điều kiện.
- The Matrix (1999) bị xóa; Inception (2010) còn lại.

## Lỗi thường gặp

- Chạy `DELETE FROM movies;` không có `WHERE` — xóa hết mọi dòng.
- Dùng `>` thay vì `<` khi đề nói “trước” một năm.
- Nhầm `DELETE` (xóa dòng) với `UPDATE` (đổi ô).

## Thử ngay

Xóa các phim phát hành trước năm 2000.
