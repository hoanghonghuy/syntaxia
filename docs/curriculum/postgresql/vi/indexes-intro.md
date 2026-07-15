---
id: pg-16-indexes
track: postgresql
locale: vi
slug: indexes-intro
title: Chỉ mục (index) trong PostgreSQL
order: 16
published: true
objectives:
  - Tạo index trên một cột
  - Hiểu index giúp tìm nhanh mà không đổi dữ liệu hàng
exercise:
  starter: "CREATE INDEX movies_title_idx ON "
  hints:
    - "Index là trợ giúp tra cứu — các hàng trong bảng vẫn như cũ."
    - "Đặt tên index, rồi ON bảng (cột)."
    - "Thử: CREATE INDEX movies_title_idx ON movies (title);"
  solution: "CREATE INDEX movies_title_idx ON movies (title);"
  preview:
    columns: ["id", "title"]
    rows:
      - [1, "Inception"]
      - [2, "The Matrix"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception'), (2, 'The Matrix');"
---

**Index** giúp PostgreSQL tìm hàng nhanh hơn — như mục lục sách chỉ tới trang mà không viết lại chương. Tạo index không đổi dữ liệu bạn thấy trong `SELECT`; nó thêm cấu trúc hỗ trợ phía sau.

| id | title |
| --- | --- |
| 1 | Inception |
| 2 | The Matrix |

## Ví dụ mẫu

```sql
CREATE INDEX movies_title_idx ON movies (title);
```

- `movies_title_idx` là tên rõ ràng bạn chọn.
- `ON movies (title)` dựng index trên cột `title`.
- Sau này, lọc như `WHERE title = 'Inception'` có thể dùng index này (bộ lập kế hoạch quyết định).

Trong sandbox này, câu được chấm là `CREATE INDEX`. Một `SELECT` theo sau xác nhận bảng vẫn đọc được.

## Lỗi thường gặp

- Quên tên index.
- Index sai cột.
- Kỳ vọng `CREATE INDEX` trả về hàng phim — máy chấm kiểm tra bảng sau đó.

## Thử ngay

Tạo index tên `movies_title_idx` trên `movies(title)`.
