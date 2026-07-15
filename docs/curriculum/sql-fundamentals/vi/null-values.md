---
id: sql-08-null
track: sql-fundamentals
locale: vi
slug: null-values
title: Dữ liệu thiếu với NULL
order: 8
published: true
objectives:
  - Hiểu NULL là dữ liệu thiếu, không phải số 0 hay chuỗi rỗng
  - Tìm hàng bằng IS NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Điểm còn thiếu được lưu là NULL — không phải chữ 'NULL' và không phải 0."
    - "Dùng IS NULL trong WHERE; = NULL không hoạt động như người mới thường nghĩ."
    - "Thử: SELECT title FROM movies WHERE rating IS NULL;"
  solution: "SELECT title FROM movies WHERE rating IS NULL;"
  preview:
    columns: ["id", "title", "rating"]
    rows:
      - [1, "Inception", 8.8]
      - [2, "The Matrix", null]
  expected:
    columns: ["title"]
    rows:
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, rating DOUBLE PRECISION);"
    - "INSERT INTO movies VALUES (1, 'Inception', 8.8), (2, 'The Matrix', NULL);"
---

Một số ô chưa có giá trị — giống ô trống trong Excel. Trong SQL, giá trị thiếu đó gọi là `NULL`. Nó không phải số 0, cũng không phải chữ “NULL”.

| id | title | rating |
| --- | --- | --- |
| 1 | Inception | 8.8 |
| 2 | The Matrix |  |

## Ví dụ mẫu

```sql
SELECT title FROM movies WHERE rating IS NULL;
```

- Inception có `rating` là `8.8`, nên không khớp bộ lọc này.
- The Matrix chưa có điểm (`NULL`), nên khớp `IS NULL`.
- Dùng `IS NULL` (hoặc `IS NOT NULL`) — so sánh bằng `= NULL` không chọn được giá trị thiếu.

Kết quả:

| title |
| --- |
| The Matrix |

## Lỗi thường gặp

- Viết `WHERE rating = NULL` — so sánh đó không tìm được giá trị thiếu; hãy dùng `IS NULL`.
- Tìm chuỗi `'NULL'` — đó là chữ, không phải giá trị thiếu.
- Coi `NULL` như `0` — số 0 là một số thật; `NULL` nghĩa là “chưa biết / chưa điền”.

## Thử ngay

Liệt kê `title` của mọi phim có `rating` còn thiếu (`IS NULL`).
