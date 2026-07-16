---
id: sql-05-and-or-not
track: sql-fundamentals
locale: vi
slug: and-or-not
title: Kết hợp bộ lọc với AND, OR, NOT
order: 5
published: true
objectives:
  - Kết hợp hai điều kiện bằng AND
  - Chỉ giữ hàng thỏa mọi bộ lọc bắt buộc
exercise:
  starter: "SELECT title FROM movies WHERE year > 2000;"
  hints:
    - "year > 2000 một mình vẫn gồm mọi phim sau 2000, không chỉ của Nolan."
    - "Nối điều kiện thứ hai bằng AND để cả hai đều phải đúng."
    - "Thử: SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Một bộ lọc thường chưa đủ. `AND` chỉ giữ hàng khi **mọi** điều kiện đều đúng — như hai bộ lọc Excel áp cùng lúc.

**movies** (bảng đầy đủ)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

Duyệt bảng bằng tay:

| title | year > 2000? | director = Nolan? | Cả hai (AND)? |
| --- | --- | --- | --- |
| Inception | có | có | **giữ** |
| The Matrix | không | không | bỏ |
| Interstellar | có | có | **giữ** |
| Dune | có | không | bỏ (trượt điều kiện đạo diễn) |

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE year > 2000 AND director = 'Nolan'
ORDER BY title;
```

- `year > 2000` loại The Matrix (1999).
- `director = 'Nolan'` loại Dune (Villeneuve), dù Dune sau năm 2000.
- `AND` đòi cả hai điều kiện: chỉ Inception và Interstellar.
- `ORDER BY title` sắp tiêu đề theo alphabet.

Kết quả:

| title |
| --- |
| Inception |
| Interstellar |

`OR` giữ hàng nếu **một trong hai** điều kiện đúng (sẽ gồm cả Dune). `NOT` đảo điều kiện. Bài này tập trung vào `AND`.

## Lỗi thường gặp

- Dùng `OR` khi ý là “cả hai phải khớp” — `OR` mở rộng kết quả; `AND` thu hẹp.
- So sánh chữ không có ngoặc (`director = Nolan`) — giá trị chữ cần ngoặc đơn: `'Nolan'`.
- Quên rằng `year > 2000` một mình vẫn trả về Dune — cần thêm `AND director = 'Nolan'`.

## Thử ngay

Liệt kê tiêu đề có `year` lớn hơn 2000 **và** `director` là `'Nolan'`, sắp theo `title`.
