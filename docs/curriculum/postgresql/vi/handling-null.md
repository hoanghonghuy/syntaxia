---
id: pg-02-null
track: postgresql
locale: vi
slug: handling-null
title: Tìm giá trị thiếu với NULL
order: 2
published: true
objectives:
  - Hiểu NULL là “chưa biết / thiếu”, không phải chuỗi rỗng
  - Lọc bằng IS NULL và IS NOT NULL
exercise:
  starter: "SELECT name, email FROM contacts;"
  hints:
    - "Dùng IS NULL (không dùng = NULL) để tìm giá trị thiếu."
    - "Chỉ giữ cột name trong kết quả."
    - "Thử: SELECT name FROM contacts WHERE email IS NULL;"
  solution: "SELECT name FROM contacts WHERE email IS NULL;"
  preview:
    columns: ["id", "name", "email"]
    rows:
      - [1, "Ana", "ana@example.com"]
      - [2, "Ben", null]
      - [3, "Chi", "chi@example.com"]
      - [4, "Dee", null]
  expected:
    columns: ["name"]
    rows:
      - ["Ben"]
      - ["Dee"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE contacts (id INTEGER, name TEXT, email TEXT);"
    - "INSERT INTO contacts VALUES (1, 'Ana', 'ana@example.com'), (2, 'Ben', NULL), (3, 'Chi', 'chi@example.com'), (4, 'Dee', NULL);"
---

Trong danh bạ, một số người có thể chưa có email. Trong SQL, ô trống đó thường được lưu là `NULL` — nghĩa là “chưa biết” hoặc “chưa cung cấp”, khác với chuỗi rỗng `''`.

| id | name | email |
| --- | --- | --- |
| 1 | Ana | ana@example.com |
| 2 | Ben | *(null)* |
| 3 | Chi | chi@example.com |
| 4 | Dee | *(null)* |

## Ví dụ mẫu

```sql
SELECT name FROM contacts WHERE email IS NULL;
```

- `IS NULL` giữ các hàng mà cột chưa có giá trị.
- `IS NOT NULL` giữ các hàng đã có giá trị.
- Viết `email = NULL` **không** hoạt động như người mới thường nghĩ — hãy dùng `IS NULL`.

Kết quả:

| name |
| --- |
| Ben |
| Dee |

## Lỗi thường gặp

- Dùng `= NULL` hoặc `!= NULL` — so sánh với `NULL` cần `IS NULL` / `IS NOT NULL`.
- Nhầm `NULL` với chuỗi rỗng `''`.
- Chọn mọi cột khi bài chỉ yêu cầu `name`.

## Thử ngay

Liệt kê `name` của mọi liên hệ mà `email` đang thiếu.
