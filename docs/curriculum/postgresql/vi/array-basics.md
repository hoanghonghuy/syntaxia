---
id: pg-13-array
track: postgresql
locale: vi
slug: array-basics
title: Lọc với mảng (array)
order: 13
published: true
objectives:
  - Lưu danh sách giá trị trong cột ARRAY
  - Kiểm tra phần tử bằng ANY
exercise:
  starter: "SELECT title, tags FROM courses;"
  hints:
    - "ANY kiểm tra một giá trị có xuất hiện trong mảng không."
    - "Đặt giá trị tìm ở bên trái: 'sql' = ANY(tags)."
    - "Thử: SELECT title FROM courses WHERE 'sql' = ANY(tags);"
  solution: "SELECT title FROM courses WHERE 'sql' = ANY(tags);"
  preview:
    columns: ["id", "title", "tags"]
    rows:
      - [1, "SQL Basics", "{sql,beginner}"]
      - [2, "Vue Intro", "{vue,frontend}"]
      - [3, "Postgres Tips", "{sql,postgres}"]
  expected:
    columns: ["title"]
    rows:
      - ["SQL Basics"]
      - ["Postgres Tips"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE courses (id INTEGER, title TEXT, tags TEXT[]);"
    - "INSERT INTO courses VALUES (1, 'SQL Basics', ARRAY['sql','beginner']), (2, 'Vue Intro', ARRAY['vue','frontend']), (3, 'Postgres Tips', ARRAY['sql','postgres']);"
---

Danh sách thẻ thường là nhiều nhãn trên một hàng. PostgreSQL có thể lưu đó trong cột **array** (`TEXT[]`). Để hỏi “danh sách này có chứa `sql` không?”, dùng `= ANY(tags)`.

| id | title | tags |
| --- | --- | --- |
| 1 | SQL Basics | sql, beginner |
| 2 | Vue Intro | vue, frontend |
| 3 | Postgres Tips | sql, postgres |

## Ví dụ mẫu

```sql
SELECT title FROM courses WHERE 'sql' = ANY(tags);
```

- `tags` là cột mảng `TEXT[]`.
- `'sql' = ANY(tags)` đúng khi `sql` xuất hiện đâu đó trong mảng.
- Vue Intro bị loại vì thẻ không có `sql`.

Kết quả:

| title |
| --- |
| SQL Basics |
| Postgres Tips |

## Lỗi thường gặp

- Viết `tags = 'sql'` — so sánh cả mảng với một chuỗi.
- Đặt `ANY` sai phía so sánh.
- Dùng chữ phân tách bằng dấu phẩy thay vì kiểu mảng thật.

## Thử ngay

Trả về `title` của mọi khóa học có mảng `tags` chứa `'sql'`.
