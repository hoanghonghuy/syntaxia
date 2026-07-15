---
id: pg-22-filter
track: postgresql
locale: vi
slug: filter-clause
title: Đếm có điều kiện với FILTER
order: 22
published: true
objectives:
  - Đếm chỉ hàng khớp bằng FILTER
  - Kết hợp aggregate với logic giống WHERE bên trong
exercise:
  starter: "SELECT COUNT(*) FROM movies;"
  hints:
    - "FILTER (WHERE …) giới hạn hàng mà aggregate nhìn thấy."
    - "Giữ COUNT(*) nhưng thêm FILTER cho year >= 2000."
    - "Thử: SELECT COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;"
  solution: "SELECT COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
      - [4, "Dune", 2021]
  expected:
    columns: ["modern"]
    rows:
      - [3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016), (4, 'Dune', 2021);"
---

Bạn đã biết `COUNT(*)`. Đôi khi bạn muốn một tổng chỉ đếm hàng khớp điều kiện — không dùng `WHERE` riêng sẽ ẩn các aggregate khác. Mệnh đề `FILTER` của PostgreSQL gắn điều kiện đó vào chính aggregate.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Arrival | 2016 |
| 4 | Dune | 2021 |

## Ví dụ mẫu

```sql
SELECT COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;
```

- `COUNT(*)` vẫn đếm hàng.
- `FILTER (WHERE year >= 2000)` chỉ gồm phim từ năm 2000 trở đi.
- The Matrix (1999) bị bỏ; còn ba phim hiện đại.

Kết quả:

| modern |
| --- |
| 3 |

Cách di động: `COUNT(CASE WHEN year >= 2000 THEN 1 END)`. `FILTER` là cú pháp PostgreSQL rõ hơn cho cùng ý.

## Lỗi thường gặp

- Chỉ đặt điều kiện năm ở `WHERE` ngoài khi bài yêu cầu `FILTER`.
- Quên alias `modern`.
- Viết `FILTER year >= 2000` thiếu `WHERE` trong ngoặc.

## Thử ngay

Trả về một cột `modern`: bao nhiêu phim có `year >= 2000`, dùng `FILTER`.
