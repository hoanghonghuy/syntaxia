---
id: pg-21-cte
track: postgresql
locale: vi
slug: common-table-expressions
title: Các bước có tên với WITH (CTE)
order: 21
published: true
objectives:
  - Đặt tên kết quả tạm bằng WITH
  - Truy vấn kết quả đó trong cùng câu lệnh
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "WITH name AS (SELECT …) định nghĩa kết quả tạm có tên."
    - "Rồi SELECT từ tên đó như một bảng."
    - "Thử: WITH recent AS (SELECT title, year FROM movies WHERE year >= 2010) SELECT title FROM recent ORDER BY title;"
  solution: "WITH recent AS (SELECT title, year FROM movies WHERE year >= 2010) SELECT title FROM recent ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
      - [4, "Dune", 2021]
  expected:
    columns: ["title"]
    rows:
      - ["Arrival"]
      - ["Dune"]
      - ["Inception"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016), (4, 'Dune', 2021);"
---

Câu truy vấn dài dễ hơn khi bạn đặt tên bước trung gian — như vùng có nhãn trong bảng tính. **CTE** (common table expression) dùng `WITH name AS (…)` để định nghĩa bước đó, rồi `SELECT` từ nó trong cùng câu lệnh.

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Arrival | 2016 |
| 4 | Dune | 2021 |

## Ví dụ mẫu

```sql
WITH recent AS (
  SELECT title, year FROM movies WHERE year >= 2010
)
SELECT title FROM recent ORDER BY title;
```

- `WITH recent AS (…)` tạo kết quả tạm tên `recent` gồm phim từ 2010 trở đi.
- `SELECT` ngoài chỉ đọc từ `recent`.
- The Matrix (1999) không vào `recent`, nên không xuất hiện.

Kết quả:

| title |
| --- |
| Arrival |
| Dune |
| Inception |

## Lỗi thường gặp

- Quên `SELECT` ngoài sau định nghĩa CTE.
- Chỉ tham chiếu bảng gốc, bỏ qua tên CTE mà bài yêu cầu.
- Bỏ `ORDER BY title` khi thứ tự kỳ vọng là theo alphabet.

## Thử ngay

Định nghĩa CTE `recent` cho phim có `year >= 2010`, rồi trả về `title` sắp theo title.
