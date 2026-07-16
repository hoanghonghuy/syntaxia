---
id: sql-08-null
track: sql-fundamentals
locale: vi
slug: null-values
title: Dữ liệu thiếu với NULL
order: 8
published: true
objectives:
  - Coi NULL là dữ liệu thiếu, không phải số 0 hay chữ rỗng
  - Tìm hàng bằng IS NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Rating thiếu được lưu là NULL — không phải chữ 'NULL' và không phải 0."
    - "Dùng IS NULL trong WHERE; = NULL không hoạt động như người mới nghĩ."
    - "Thử: SELECT title FROM movies WHERE rating IS NULL ORDER BY title;"
  solution: "SELECT title FROM movies WHERE rating IS NULL ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "rating"]
    rows:
      - [1, "Inception", 2010, 8.8]
      - [2, "The Matrix", 1999, null]
      - [3, "Dune", 2021, 8.0]
      - [4, "Old Cut", 1985, null]
  expected:
    columns: ["title"]
    rows:
      - ["Old Cut"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, rating DOUBLE PRECISION);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 8.8), (2, 'The Matrix', 1999, NULL), (3, 'Dune', 2021, 8.0), (4, 'Old Cut', 1985, NULL);"
---

Một số ô chưa có giá trị — như ô trống trong spreadsheet. Trong SQL giá trị thiếu đó gọi là `NULL`. Không phải số 0, cũng không phải chữ “NULL”.

**movies** (bảng đầy đủ — ô rating trống là `NULL`)

| id | title | year | rating |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 8.8 |
| 2 | The Matrix | 1999 | *(thiếu)* |
| 3 | Dune | 2021 | 8.0 |
| 4 | Old Cut | 1985 | *(thiếu)* |

Hai phim có rating; hai phim không có.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE rating IS NULL
ORDER BY title;
```

- Inception (`8.8`) và Dune (`8.0`) có rating thật — không khớp.
- The Matrix và Old Cut có rating `NULL` — khớp `IS NULL`.
- Dùng `IS NULL` (hoặc `IS NOT NULL`) — so sánh `= NULL` không tìm được giá trị thiếu.

Kết quả:

| title |
| --- |
| Old Cut |
| The Matrix |

## Lỗi thường gặp

- Viết `WHERE rating = NULL` — so sánh đó không tìm được giá trị thiếu; dùng `IS NULL`.
- Tìm chữ `'NULL'` — đó là chuỗi, không phải giá trị thiếu.
- Coi `NULL` như `0` — số không là số thật; `NULL` nghĩa là “chưa biết / chưa điền”.

## Thử ngay

Liệt kê `title` mọi phim có `rating` thiếu (`IS NULL`), sắp theo `title`.
