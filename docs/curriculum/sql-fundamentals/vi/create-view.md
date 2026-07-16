---
id: sql-35-view
track: sql-fundamentals
locale: vi
slug: create-view
title: Truy vấn đã lưu với view
order: 35
published: true
objectives:
  - Tạo view lọc dòng
  - Truy vấn view như một bảng
  - Dùng CREATE TEMP VIEW khi bảng gốc là temporary
exercise:
  starter: "CREATE TEMP VIEW modern_movies AS "
  hints:
    - "View lưu một SELECT dưới một tên — sau đó truy vấn như bảng."
    - "Trong sandbox này dùng CREATE TEMP VIEW vì bảng gốc là temporary."
    - "Thử: CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
  solution: "CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Interstellar", 2014]
      - [4, "Dune", 2021]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM modern_movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Interstellar', 2014), (4, 'Dune', 2021);"
---

**View** là một `SELECT` đã lưu với tên. Bạn truy vấn nó như bảng, nhưng nó không lưu bản sao dòng riêng — nó chạy lại truy vấn.

**movies** (bảng gốc)

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | The Matrix | 1999 |
| 3 | Interstellar | 2014 |
| 4 | Dune | 2021 |

| title | year | Trong `modern_movies` (`year >= 2000`)? |
| --- | --- | --- |
| Inception | 2010 | có |
| The Matrix | 1999 | không |
| Interstellar | 2014 | có |
| Dune | 2021 | có |

```sql
CREATE VIEW modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

Trong sandbox này bảng gốc là temporary, nên dùng `CREATE TEMP VIEW` (cùng ý với view thường, phạm vi phiên).

## Ví dụ mẫu

```sql
CREATE TEMP VIEW modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

- `modern_movies` là tên view.
- Bộ lọc giữ title từ năm 2000 trở đi và bỏ The Matrix (1999).
- Grader sau đó chọn từ view: `SELECT title FROM modern_movies ORDER BY title`.

Kết quả từ view:

| title |
| --- |
| Dune |
| Inception |
| Interstellar |

## Lỗi thường gặp

- Chỉ viết `CREATE VIEW` thiếu `TEMP` ở đây — bảng gốc tạm cần view tạm trong sandbox này.
- Quên `AS` trước `SELECT`.
- Lọc sai so sánh (`>` thay vì `>=` khi đề gồm năm 2000).

## Thử ngay

Tạo temporary view `modern_movies` chọn `title` từ movies với `year >= 2000`.
