---
id: sql-20-left-join
track: sql-fundamentals
locale: vi
slug: left-join
title: Giữ dòng không khớp với LEFT JOIN
order: 20
published: true
objectives:
  - Giữ mọi dòng bảng trái kể cả khi bên phải không khớp
  - Tìm dòng mồ côi bằng LEFT JOIN và IS NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "LEFT JOIN giữ mọi phim, kể cả khi director_id không khớp đạo diễn nào."
    - "Sau khi join, dòng không có đạo diễn sẽ có directors.id là NULL."
    - "Thử: SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  solution: "SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  preview:
    columns: ["movies.title", "directors.name"]
    rows:
      - ["Inception", "Nolan"]
      - ["Orphan", null]
  expected:
    columns: ["title"]
    rows:
      - ["Orphan"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'Orphan', NULL);"
---

Đôi khi một phim chưa có đạo diễn — giống ô tra cứu trống trong Excel. `INNER JOIN` sẽ bỏ dòng đó. `LEFT JOIN` giữ mọi dòng bảng trái và điền `NULL` bên phải khi không khớp.

**movies**

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |
| 2 | Orphan |  |

**directors**

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |

## Ví dụ mẫu

```sql
SELECT movies.title, directors.name
FROM movies
LEFT JOIN directors ON movies.director_id = directors.id
ORDER BY movies.title;
```

- `LEFT JOIN directors` bắt đầu từ `movies` rồi gắn đạo diễn khớp.
- Orphan không có `director_id`, nên `directors.name` là `NULL`.
- Lọc `WHERE directors.id IS NULL` chỉ giữ phim không khớp được.

Kết quả join đầy đủ (trước khi lọc orphan):

| title | name |
| --- | --- |
| Inception | Nolan |
| Orphan |  |

## Lỗi thường gặp

- Dùng `INNER JOIN` khi cần giữ dòng trái không khớp — orphan sẽ biến mất.
- Viết `WHERE directors.id = NULL` thay vì `IS NULL`.
- JOIN nhầm `movies.id = directors.id` thay vì `movies.director_id = directors.id`.

## Thử ngay

Liệt kê `title` của mọi phim không có đạo diễn khớp (`directors.id IS NULL`).
