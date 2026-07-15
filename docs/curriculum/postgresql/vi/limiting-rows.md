---
id: pg-01-limit
track: postgresql
locale: vi
slug: limiting-rows
title: Giới hạn số hàng với LIMIT
order: 1
published: true
objectives:
  - Giới hạn số hàng mà truy vấn trả về
  - Kết hợp ORDER BY với LIMIT
exercise:
  starter: "SELECT title, year FROM movies ORDER BY year DESC;"
  hints:
    - "Thêm LIMIT ở cuối để chỉ giữ N hàng đầu sau khi sắp xếp."
    - "Bạn cần hai phim mới nhất, nên dùng LIMIT 2."
    - "Thử: SELECT title, year FROM movies ORDER BY year DESC LIMIT 2;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC LIMIT 2;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Dune", 2021]
      - [4, "Arrival", 2016]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Arrival", 2016]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021), (4, 'Arrival', 2016);"
---

Đôi khi bảng có rất nhiều hàng, nhưng bạn chỉ cần một mẫu ngắn — giống nhìn phần đầu của cột đã sắp xếp trong bảng tính. Trong SQL, `LIMIT` dừng kết quả sau một số hàng cố định.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Dune | 2021 |
| 4 | Arrival | 2016 |

## Ví dụ mẫu

```sql
SELECT title, year FROM movies ORDER BY year DESC LIMIT 2;
```

- `ORDER BY year DESC` sắp mới nhất trước.
- `LIMIT 2` chỉ giữ hai hàng đầu sau khi sắp xếp.
- Không có `ORDER BY`, `LIMIT` vẫn cắt số lượng, nhưng “mới nhất” sẽ không còn ý nghĩa rõ.

Kết quả:

| title | year |
| --- | --- |
| Dune | 2021 |
| Arrival | 2016 |

## Lỗi thường gặp

- Đặt `LIMIT` trước `ORDER BY` — `LIMIT` phải ở cuối.
- Dùng `LIMIT 1` khi bài yêu cầu hai hàng.
- Quên `DESC` khi cần “mới nhất trước”.

## Thử ngay

Liệt kê `title` và `year` của **hai phim mới nhất**.
