---
id: pg-15-distinct
track: postgresql
locale: vi
slug: distinct-on
title: Một hàng mỗi nhóm với DISTINCT ON
order: 15
published: true
objectives:
  - Giữ một hàng mỗi khóa với DISTINCT ON
  - Kết hợp DISTINCT ON với ORDER BY
exercise:
  starter: "SELECT director, title, year FROM movies ORDER BY director, year DESC;"
  hints:
    - "DISTINCT ON (director) giữ hàng đầu tiên cho mỗi đạo diễn."
    - "ORDER BY phải bắt đầu bằng cùng biểu thức với DISTINCT ON, rồi tiêu chí chọn hàng thắng."
    - "Thử: SELECT DISTINCT ON (director) director, title FROM movies ORDER BY director, year DESC;"
  solution: "SELECT DISTINCT ON (director) director, title FROM movies ORDER BY director, year DESC;"
  preview:
    columns: ["id", "director", "title", "year"]
    rows:
      - [1, "Nolan", "Inception", 2010]
      - [2, "Nolan", "Interstellar", 2014]
      - [3, "Villeneuve", "Arrival", 2016]
      - [4, "Villeneuve", "Dune", 2021]
  expected:
    columns: ["director", "title"]
    rows:
      - ["Nolan", "Interstellar"]
      - ["Villeneuve", "Dune"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, director TEXT, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Nolan', 'Inception', 2010), (2, 'Nolan', 'Interstellar', 2014), (3, 'Villeneuve', 'Arrival', 2016), (4, 'Villeneuve', 'Dune', 2021);"
---

Bạn có thể muốn “phim mới nhất mỗi đạo diễn” — một hàng mỗi người, không phải mọi phim. `DISTINCT ON (cột)` của PostgreSQL giữ hàng đầu tiên cho mỗi giá trị khác nhau của cột đó, sau khi sắp xếp.

| id | director | title | year |
| --- | --- | --- | --- |
| 1 | Nolan | Inception | 2010 |
| 2 | Nolan | Interstellar | 2014 |
| 3 | Villeneuve | Arrival | 2016 |
| 4 | Villeneuve | Dune | 2021 |

## Ví dụ mẫu

```sql
SELECT DISTINCT ON (director) director, title
FROM movies
ORDER BY director, year DESC;
```

- `DISTINCT ON (director)` giữ một hàng mỗi đạo diễn.
- `ORDER BY director, year DESC` phải bắt đầu bằng `director`, rồi năm mới nhất trước để hàng giữ lại là phim mới nhất.
- Không có `ORDER BY` khớp, hàng được giữ không có ý nghĩa rõ.

Kết quả:

| director | title |
| --- | --- |
| Nolan | Interstellar |
| Villeneuve | Dune |

Đây là dạng đặc thù PostgreSQL; SQL di động thường dùng hàm cửa sổ hoặc subquery.

## Lỗi thường gặp

- Quên `ORDER BY` bắt đầu bằng cùng cột với `DISTINCT ON`.
- Chỉ sắp theo `year` mà không có `director` trước.
- Kỳ vọng mọi phim xuất hiện — `DISTINCT ON` cố ý bỏ phần dư.

## Thử ngay

Với mỗi `director`, trả về `director` và `title` của phim mới nhất.
