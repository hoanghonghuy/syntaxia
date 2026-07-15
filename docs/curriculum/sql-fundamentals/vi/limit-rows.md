---
id: sql-07-limit
track: sql-fundamentals
locale: vi
slug: limit-rows
title: Giới hạn số hàng với LIMIT
order: 7
published: true
objectives:
  - Giới hạn số hàng mà truy vấn trả về
  - Kết hợp ORDER BY với LIMIT để lấy danh sách top-N
exercise:
  starter: "SELECT title FROM movies ORDER BY year DESC;"
  hints:
    - "ORDER BY year DESC đưa phim mới nhất lên trước, nhưng vẫn trả về mọi hàng."
    - "Thêm LIMIT n ở cuối để chỉ giữ n hàng đầu sau khi sắp xếp."
    - "Thử: SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
  solution: "SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Dune", 2021]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021);"
---

Đôi khi bạn chỉ cần vài hàng đầu — hai phim mới nhất, không phải cả danh mục. `LIMIT` giới hạn số hàng trả về sau khi sắp xếp.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Dune | 2021 |

## Ví dụ mẫu

```sql
SELECT title FROM movies ORDER BY year DESC LIMIT 2;
```

- `ORDER BY year DESC` sắp mới nhất trước: Dune (2021), Inception (2010), The Matrix (1999).
- `LIMIT 2` chỉ giữ hai hàng đầu của danh sách đã sắp.
- Không có `ORDER BY`, `LIMIT` vẫn cắt số lượng, nhưng “hàng nào” không còn nghĩa “mới nhất”.

Kết quả:

| title |
| --- |
| Dune |
| Inception |

## Lỗi thường gặp

- Đặt `LIMIT` trước `ORDER BY` — `LIMIT` phải đứng ở cuối câu lệnh.
- Chỉ dùng `LIMIT` khi bài yêu cầu mới nhất hoặc top — hãy sắp xếp trước, rồi mới giới hạn.
- Viết `LIMIT = 2` — đúng là `LIMIT 2`, không có dấu bằng.

## Thử ngay

Trả về hai tên phim mới nhất: sắp theo `year` giảm dần, rồi chỉ giữ hai hàng.
