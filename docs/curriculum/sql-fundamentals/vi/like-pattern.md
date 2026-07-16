---
id: sql-15-like
track: sql-fundamentals
locale: vi
slug: like-pattern
title: Khớp chữ với LIKE
order: 15
published: true
objectives:
  - Lọc chữ theo mẫu
  - Dùng % làm ký tự đại diện
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "LIKE so sánh chữ với một mẫu; % nghĩa là “bất kỳ ký tự nào ở đây”."
    - "Tiêu đề bắt đầu bằng In khớp mẫu 'In%'."
    - "Thử: SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "Interstellar", 2014, "Nolan"]
      - [3, "The Matrix", 1999, "Wachowski"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'Interstellar', 2014, 'Nolan'), (3, 'The Matrix', 1999, 'Wachowski'), (4, 'Dune', 2021, 'Villeneuve');"
---

So sánh bằng (`=`) cần đúng cả chuỗi. `LIKE` cho phép khớp theo mẫu — ví dụ “tiêu đề bắt đầu bằng In”, giống bộ lọc “begins with” trong Excel.

**movies** (bảng đầy đủ)

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | Interstellar | 2014 | Nolan |
| 3 | The Matrix | 1999 | Wachowski |
| 4 | Dune | 2021 | Villeneuve |

| title | Bắt đầu bằng `In`? |
| --- | --- |
| Inception | có |
| Interstellar | có |
| The Matrix | không |
| Dune | không |

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE title LIKE 'In%'
ORDER BY title;
```

- `'In%'` nghĩa là: bắt đầu bằng `In`, rồi bất kỳ ký tự nào (hoặc không có). `%` là ký tự đại diện.
- Inception và Interstellar khớp; The Matrix và Dune thì không.
- `ORDER BY title` sắp tiêu đề khớp theo A→Z.

Kết quả:

| title |
| --- |
| Inception |
| Interstellar |

Ký tự đại diện `_` (đúng một ký tự) được học ở bài sau `sql-wildcards`.

## Lỗi thường gặp

- Dùng `=` với mẫu — `=` cần khớp đúng; mẫu cần `LIKE`.
- Quên `%` — chỉ `'In'` thì chỉ khớp đúng chữ `In`.
- Đặt `%` sai chỗ — `'%In'` nghĩa là “kết thúc bằng In”, không phải “bắt đầu bằng In”.

## Thử ngay

Liệt kê các `title` bắt đầu bằng `In`. Sắp xếp bằng `ORDER BY title`.
