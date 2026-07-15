---
id: pg-04-boolean
track: postgresql
locale: vi
slug: boolean-filters
title: Lọc bằng cột BOOLEAN
order: 4
published: true
objectives:
  - Dùng cột BOOLEAN trong WHERE
  - So sánh với true / false không dùng dấu ngoặc
exercise:
  starter: "SELECT name, active FROM members;"
  hints:
    - "Chỉ giữ hàng có active bằng true."
    - "So sánh cột BOOLEAN với true — không bọc true trong ngoặc."
    - "Thử: SELECT name FROM members WHERE active = true;"
  solution: "SELECT name FROM members WHERE active = true;"
  preview:
    columns: ["id", "name", "active"]
    rows:
      - [1, "Ana", true]
      - [2, "Ben", false]
      - [3, "Chi", true]
      - [4, "Dee", false]
  expected:
    columns: ["name"]
    rows:
      - ["Ana"]
      - ["Chi"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE members (id INTEGER, name TEXT, active BOOLEAN);"
    - "INSERT INTO members VALUES (1, 'Ana', true), (2, 'Ben', false), (3, 'Chi', true), (4, 'Dee', false);"
---

Danh sách thành viên thường có cột có/không: còn hoạt động hay không. Trong PostgreSQL kiểu đó là `BOOLEAN`, và bạn lọc bằng `WHERE` như các cột khác — nhưng so sánh với `true` hoặc `false`, không phải với chữ.

| id | name | active |
| --- | --- | --- |
| 1 | Ana | true |
| 2 | Ben | false |
| 3 | Chi | true |
| 4 | Dee | false |

## Ví dụ mẫu

```sql
SELECT name FROM members WHERE active = true;
```

- `active` là cột `BOOLEAN`.
- `= true` chỉ giữ thành viên đang hoạt động.
- Ben và Dee bị loại vì `active` là `false`.

Kết quả:

| name |
| --- |
| Ana |
| Chi |

Bạn cũng có thể viết `WHERE active` (cùng nghĩa với `= true`) hoặc `WHERE NOT active` cho hàng không hoạt động. Khi mới học, nên viết rõ ràng.

## Lỗi thường gặp

- Viết `'true'` trong ngoặc — đó là chữ, không phải boolean.
- Dùng `1` / `0` như một số dialect khác.
- Chọn mọi cột khi bài chỉ hỏi `name`.

## Thử ngay

Trả về `name` của mọi thành viên đang hoạt động.
