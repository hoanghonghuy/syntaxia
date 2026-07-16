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
  - Đọc NULL bên phải là “không khớp”
  - Tìm dòng mồ côi bằng LEFT JOIN và IS NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "LEFT JOIN giữ mọi phim, kể cả khi director_id không khớp đạo diễn nào."
    - "Sau khi join, dòng không có đạo diễn sẽ có directors.id là NULL."
    - "Thử: SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  solution: "SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "The Matrix", 2]
      - [3, "Orphan", null]
  expected:
    columns: ["title"]
    rows:
      - ["Orphan"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Orphan', 2020, NULL);"
---

Đôi khi một phim chưa có đạo diễn — giống ô tra cứu trống trong Excel. `INNER JOIN` sẽ bỏ dòng đó. `LEFT JOIN` giữ mọi dòng bảng **trái** và điền `NULL` bên phải khi không khớp.

**directors** (bảng đầy đủ)

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |

**movies** (bảng đầy đủ)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | The Matrix | 1999 | 2 |
| 3 | Orphan | 2020 |  |

| title | Khớp trên LEFT JOIN? |
| --- | --- |
| Inception | Nolan |
| The Matrix | Wachowski |
| Orphan | không → `NULL` |

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
| The Matrix | Wachowski |

Kết quả chỉ orphan:

| title |
| --- |
| Orphan |

## Lỗi thường gặp

- Dùng `INNER JOIN` khi cần giữ dòng trái không khớp — orphan sẽ mất.
- Viết `WHERE directors.id = NULL` thay vì `IS NULL`.
- Join `movies.id = directors.id` thay vì `movies.director_id = directors.id`.

## Thử ngay

Liệt kê `title` mọi phim không có đạo diễn khớp (`directors.id IS NULL`).
