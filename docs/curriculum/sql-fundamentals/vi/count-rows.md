---
id: sql-13-count
track: sql-fundamentals
locale: vi
slug: count-rows
title: Đếm hàng với COUNT
order: 13
published: true
objectives:
  - Đếm số hàng trong bảng
  - Đặt tên cột kết quả bằng AS
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "COUNT(*) đếm mọi hàng trong bảng."
    - "Thường nên đặt tên cột, ví dụ movie_count."
    - "Thử: SELECT COUNT(*) AS movie_count FROM movies;"
  solution: "SELECT COUNT(*) AS movie_count FROM movies;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["The Matrix", 1999]
      - ["Dune", 2021]
  expected:
    columns: ["movie_count"]
    rows:
      - [3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Dune', 2021);"
---

Excel có thể cho biết bạn có bao nhiêu hàng. Trong SQL, `COUNT` trả lời “bao nhiêu?” mà không cần liệt kê từng hàng.

| title | year |
| --- | --- |
| Inception | 2010 |
| The Matrix | 1999 |
| Dune | 2021 |

## Ví dụ mẫu

```sql
SELECT COUNT(*) AS movie_count FROM movies;
```

- `COUNT(*)` đếm mọi hàng trong `movies`.
- Bảng có ba phim, nên kết quả là `3`.
- `AS movie_count` gắn nhãn rõ ràng cho số đó.

Kết quả:

| movie_count |
| --- |
| 3 |

## Lỗi thường gặp

- Viết `COUNT(title)` khi ý là “mọi hàng” — `COUNT(*)` đếm hàng; `COUNT(cột)` bỏ qua `NULL` ở cột đó.
- Mong đợi danh sách tiêu đề — `COUNT` trả về một số, không phải tên phim.
- Quên `AS` khi bài yêu cầu tên cột cụ thể như `movie_count`.

## Thử ngay

Đếm số phim trong bảng. Trả về một cột tên `movie_count`.
