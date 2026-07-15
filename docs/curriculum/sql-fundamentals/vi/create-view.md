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
exercise:
  starter: "CREATE TEMP VIEW modern_movies AS "
  hints:
    - "View lưu một SELECT dưới một tên — sau đó truy vấn như bảng."
    - "Trong sandbox này dùng CREATE TEMP VIEW vì bảng gốc là bảng tạm."
    - "Thử: CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
  solution: "CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "Matrix", 1999]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM modern_movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'Matrix', 1999);"
---

**View** là một `SELECT` đã lưu với tên. Bạn truy vấn nó như bảng, nhưng nó không giữ bản sao riêng của các dòng — nó chạy lại truy vấn.

Bảng gốc `movies`:

| id | title | year |
| --- | --- | --- |
| 1 | Inception | 2010 |
| 2 | Matrix | 1999 |

```sql
CREATE VIEW modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

- `CREATE VIEW` đặt tên cho truy vấn đã lưu.
- `AS` mở đầu `SELECT` định nghĩa view.
- Sau đó: `SELECT title FROM modern_movies;` chỉ trả tiêu đề từ năm 2000 trở đi.

Trong sandbox, bảng gốc là bảng tạm, nên dùng `CREATE TEMP VIEW` (cùng ý tưởng view thường, phạm vi phiên làm việc).

## Ví dụ mẫu

```sql
CREATE TEMP VIEW modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

- `modern_movies` là tên view.
- Bộ lọc giữ Inception (2010) và bỏ Matrix (1999).
- Hệ thống chấm điểm bằng SELECT từ view.

## Lỗi thường gặp

- Chỉ viết `CREATE VIEW` thiếu `TEMP` ở đây — bảng tạm cần view tạm trong sandbox này.
- Quên `AS` trước `SELECT`.
- Lọc sai so sánh (`>` thay vì `>=` khi bài gồm năm 2000).

## Thử ngay

Tạo view tạm `modern_movies` chọn `title` từ các phim có `year >= 2000`.
