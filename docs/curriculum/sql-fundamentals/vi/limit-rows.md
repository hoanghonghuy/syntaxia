---
id: sql-07-limit
track: sql-fundamentals
locale: vi
slug: limit-rows
title: Giới hạn hàng với LIMIT
order: 7
published: true
objectives:
  - Giới hạn số hàng truy vấn trả về
  - Kết hợp ORDER BY với LIMIT cho danh sách top-N
exercise:
  starter: "SELECT title FROM movies ORDER BY year DESC;"
  hints:
    - "ORDER BY year DESC xếp phim mới nhất trước, nhưng vẫn trả mọi hàng."
    - "Thêm LIMIT n ở cuối để chỉ giữ n hàng đầu sau khi sắp."
    - "Thử: SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
  solution: "SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Đôi khi bạn chỉ cần vài hàng đầu — hai phim mới nhất, không phải cả danh mục. `LIMIT` giới hạn số hàng trả về **sau** khi sắp xếp.

**movies** (bảng đầy đủ)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

Sau `ORDER BY year DESC` thứ tự là: Dune → Interstellar → Inception → The Matrix.  
`LIMIT 2` chỉ giữ hai hàng đầu của danh sách đó.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
ORDER BY year DESC
LIMIT 2;
```

- `ORDER BY year DESC` sắp mới nhất trước.
- `LIMIT 2` chỉ giữ hai hàng đầu của danh sách đã sắp.
- Không có `ORDER BY`, `LIMIT` vẫn cắt số lượng, nhưng hàng nào được lấy không còn nghĩa “mới nhất”.

Kết quả:

| title |
| --- |
| Dune |
| Interstellar |

## Lỗi thường gặp

- Đặt `LIMIT` trước `ORDER BY` — `LIMIT` ở cuối câu lệnh.
- Chỉ dùng `LIMIT` khi đề yêu cầu mới nhất hoặc top — hãy sắp trước, rồi giới hạn.
- Viết `LIMIT = 2` — dùng `LIMIT 2` không có dấu bằng.

## Thử ngay

Trả về hai tiêu đề phim mới nhất: sắp theo `year` giảm dần, rồi chỉ giữ hai hàng.
