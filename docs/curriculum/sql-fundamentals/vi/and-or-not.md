---
id: sql-05-and-or-not
track: sql-fundamentals
locale: vi
slug: and-or-not
title: Kết hợp điều kiện với AND, OR, NOT
order: 5
published: true
objectives:
  - Kết hợp hai điều kiện bằng AND
  - Chỉ giữ các hàng thỏa mọi bộ lọc yêu cầu
exercise:
  starter: "SELECT title FROM movies WHERE year > 2000;"
  hints:
    - "Chỉ year > 2000 vẫn gồm mọi phim sau năm 2000, không chỉ của Nolan."
    - "Nối điều kiện thứ hai bằng AND để cả hai đều phải đúng."
    - "Thử: SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Interstellar', 2014, 'Nolan');"
---

Một bộ lọc thường chưa đủ. `AND` chỉ giữ hàng khi **mọi** điều kiện đều đúng — giống áp dụng hai bộ lọc Excel cùng lúc.

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Interstellar | 2014 | Nolan |

## Ví dụ mẫu

```sql
SELECT title FROM movies
WHERE year > 2000 AND director = 'Nolan'
ORDER BY title;
```

- `year > 2000` loại The Matrix (1999).
- `director = 'Nolan'` chỉ giữ phim của Nolan trong phần còn lại.
- `AND` yêu cầu cả hai điều kiện đều đúng: Inception và Interstellar.
- `ORDER BY title` sắp xếp tên phim theo alphabet.

`OR` giữ hàng nếu **một trong hai** điều kiện đúng. `NOT` đảo điều kiện (đúng thành sai). Bài này tập trung vào `AND`.

## Lỗi thường gặp

- Dùng `OR` khi ý là “phải thỏa cả hai” — `OR` làm kết quả rộng hơn; `AND` làm hẹp lại.
- So sánh chữ không có dấu nháy (`director = Nolan`) — giá trị chữ cần dấu nháy đơn: `'Nolan'`.
- Quên rằng chỉ `year > 2000` vẫn trả về mọi phim sau 2000, kể cả không phải của Nolan.

## Thử ngay

Liệt kê các `title` có `year` lớn hơn 2000 **và** `director` là `'Nolan'`, sắp xếp theo `title`.
