---
id: pg-14-coalesce
track: postgresql
locale: vi
slug: coalesce-nullif
title: Bù giá trị thiếu với COALESCE
order: 14
published: true
objectives:
  - Thay NULL bằng giá trị dự phòng bằng COALESCE
  - Ưu tiên nickname nếu có, không thì dùng name
exercise:
  starter: "SELECT name, nickname FROM people;"
  hints:
    - "COALESCE trả về đối số đầu tiên không phải NULL."
    - "Thử nickname trước, rồi mới tới name."
    - "Thử: SELECT COALESCE(nickname, name) AS label FROM people;"
  solution: "SELECT COALESCE(nickname, name) AS label FROM people;"
  preview:
    columns: ["id", "name", "nickname"]
    rows:
      - [1, "Ana Nguyen", "Ana"]
      - [2, "Ben Tran", null]
      - [3, "Chi Le", "Chi"]
  expected:
    columns: ["label"]
    rows:
      - ["Ana"]
      - ["Ben Tran"]
      - ["Chi"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE people (id INTEGER, name TEXT, nickname TEXT);"
    - "INSERT INTO people VALUES (1, 'Ana Nguyen', 'Ana'), (2, 'Ben Tran', NULL), (3, 'Chi Le', 'Chi');"
---

Tên hiển thị thường ưu tiên biệt danh ngắn, nhưng một số người không có. `COALESCE` đi từ trái sang phải và trả về giá trị đầu tiên không phải `NULL` — như “dùng ô này, không thì ô kia”.

| id | name | nickname |
| --- | --- | --- |
| 1 | Ana Nguyen | Ana |
| 2 | Ben Tran | *(null)* |
| 3 | Chi Le | Chi |

## Ví dụ mẫu

```sql
SELECT COALESCE(nickname, name) AS label FROM people;
```

- `COALESCE(nickname, name)` dùng `nickname` khi có.
- Với Ben, `nickname` là `NULL`, nên dùng `name`.
- `NULLIF(a, b)` liên quan: trả về `NULL` khi `a` bằng `b` (hữu ích để biến chuỗi rỗng thành `NULL` trước `COALESCE`).

Kết quả:

| label |
| --- |
| Ana |
| Ben Tran |
| Chi |

## Lỗi thường gặp

- Đặt `name` trước `nickname` nên biệt danh không bao giờ thắng.
- Dùng `ISNULL` của database khác — PostgreSQL dùng `COALESCE`.
- Quên alias khi bài kỳ vọng cột tên `label`.

## Thử ngay

Trả về cột `label`: `nickname` của mỗi người, hoặc `name` khi thiếu biệt danh.
