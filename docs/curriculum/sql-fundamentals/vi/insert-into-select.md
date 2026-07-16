---
id: sql-38-insert-select
track: sql-fundamentals
locale: vi
slug: insert-into-select
title: Sao chép hàng với INSERT INTO SELECT
order: 38
published: true
objectives:
  - Chèn hàng bằng cách SELECT từ bảng khác
  - Sao chép một phần đã lọc sang bảng đích
  - Nghĩ kiểu kiểm tra: SELECT sau INSERT để xem kết quả
exercise:
  starter: "SELECT title, year FROM archive;"
  hints:
    - "INSERT INTO archive (title, year) SELECT … sao chép hàng từ movies."
    - "Lọc bằng WHERE year >= 2010 để phim cũ không vào."
    - "Thử: INSERT INTO archive (title, year) SELECT title, year FROM movies WHERE year >= 2010;"
  solution: "INSERT INTO archive (title, year) SELECT title, year FROM movies WHERE year >= 2010;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["Dune", 2021]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Inception", 2010]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title, year FROM archive ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "CREATE TEMP TABLE archive (title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021);"
---

Đôi khi bạn đã có hàng trong một bảng và muốn **sao chép** một phần sang bảng khác — như copy vài dòng spreadsheet sang sheet thứ hai. `INSERT INTO … SELECT` làm việc đó trong một bước: không cần gõ từng giá trị bằng tay.

**movies** (nguồn — bảng đầy đủ)

| id | title | year |
| --- | --- | --- |
| 1 | The Matrix | 1999 |
| 2 | Inception | 2010 |
| 3 | Dune | 2021 |

**archive** (đích — lúc đầu trống)

| title | year |
| --- | --- |
| *(chưa có hàng)* |  |

Mục tiêu: chỉ copy phim từ năm **2010 trở đi** vào `archive`.

## Ví dụ mẫu

```sql
INSERT INTO archive (title, year)
SELECT title, year
FROM movies
WHERE year >= 2010;
```

- `INSERT INTO archive (title, year)` đặt tên cột đích.
- `SELECT title, year FROM movies` là nguồn giá trị.
- `WHERE year >= 2010` giữ Inception và Dune; bỏ The Matrix (1999).
- Sau khi chèn, kiểm tra bằng `SELECT title, year FROM archive ORDER BY title;`.

**archive** sau khi chèn:

| title | year |
| --- | --- |
| Dune | 2021 |
| Inception | 2010 |

## Lỗi thường gặp

- Quên liệt kê cột — nếu thứ tự cột khác, giá trị có thể vào sai chỗ; ghi rõ `(title, year)` ở cả hai bên.
- Dùng `VALUES` khi dữ liệu đã nằm trong bảng — `SELECT` mới đúng để sao chép.
- Chèn không lọc — mọi phim bị copy; dùng `WHERE` khi chỉ muốn một phần.

## Thử ngay

Copy `title` và `year` từ `movies` vào `archive` với `year >= 2010`. Checker đọc `archive` sắp theo `title`.
