---
id: sql-01-select
track: sql-fundamentals
locale: vi
slug: select-queries
title: Viết truy vấn SELECT
order: 2
published: true
objectives:
  - Chọn cột cụ thể bằng SELECT
  - Đọc tên bảng và tên cột
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "Liệt kê chỉ các cột bạn cần sau SELECT, cách nhau bằng dấu phẩy."
    - "Đừng giữ dấu * nếu bạn muốn cột cụ thể."
    - "Thử: SELECT title, year FROM movies ORDER BY title;"
  solution: "SELECT title, year FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Inception", 2010]
      - ["Interstellar", 2014]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Thường bạn không cần mọi cột. Hãy nghĩ như ẩn cột trong spreadsheet để chỉ còn **title** và **year**.

**movies** (bảng đầy đủ — bốn cột)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

`SELECT *` sẽ trả về cả bốn cột. Hôm nay bạn chỉ hỏi hai cột.

## Ví dụ mẫu

```sql
SELECT title, year
FROM movies
ORDER BY title;
```

- Sau `SELECT`, ghi các cột bạn muốn (`title`, `year`), cách nhau bằng dấu phẩy.
- `FROM movies` vẫn nghĩa là “nhìn vào bảng này”.
- `ORDER BY title` sắp hàng theo tiêu đề để grader thấy thứ tự ổn định.

Kết quả:

| title | year |
| --- | --- |
| Dune | 2021 |
| Inception | 2010 |
| Interstellar | 2014 |
| The Matrix | 1999 |

Cột `id` và `director` không hiện, vì bạn không hỏi chúng.

## Lỗi thường gặp

- Giữ `SELECT *` khi đề yêu cầu cột cụ thể — grader kiểm tra tên cột.
- Đặt khoảng trắng hoặc ngoặc quanh tên cột không cần thiết (`"title"` thường không cần ở đây).
- Đảo thứ tự: `FROM movies SELECT title` không hợp lệ — `SELECT` đứng trước.

## Thử ngay

Đổi truy vấn khởi đầu để chỉ trả về `title` và `year` cho mọi phim, sắp theo `title`.
