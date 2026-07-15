---
id: pg-12-jsonb
track: postgresql
locale: vi
slug: jsonb-basics
title: Đọc trường JSONB
order: 12
published: true
objectives:
  - Lưu dữ liệu có cấu trúc trong cột JSONB
  - Lấy trường chữ bằng ->>
exercise:
  starter: "SELECT data FROM profiles;"
  hints:
    - "->> đọc một khóa JSON và trả về chữ thường."
    - "Chọn trường name từ cột data."
    - "Thử: SELECT data->>'name' AS name FROM profiles;"
  solution: "SELECT data->>'name' AS name FROM profiles;"
  preview:
    columns: ["id", "data"]
    rows:
      - [1, "{\"name\": \"Ana\", \"city\": \"Hanoi\"}"]
      - [2, "{\"name\": \"Ben\", \"city\": \"Hue\"}"]
  expected:
    columns: ["name"]
    rows:
      - ["Ana"]
      - ["Ben"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE profiles (id INTEGER, data JSONB);"
    - "INSERT INTO profiles VALUES (1, '{\"name\": \"Ana\", \"city\": \"Hanoi\"}'::jsonb), (2, '{\"name\": \"Ben\", \"city\": \"Hue\"}'::jsonb);"
---

Đôi khi một ô chứa một tài liệu nhỏ lồng nhau — tên, thành phố, và thêm — thay vì nhiều cột riêng. Kiểu `JSONB` của PostgreSQL lưu JSON dạng nhị phân, truy vấn hiệu quả. Toán tử `->>` lấy một khóa ra thành chữ thường.

| id | data |
| --- | --- |
| 1 | `{"name": "Ana", "city": "Hanoi"}` |
| 2 | `{"name": "Ben", "city": "Hue"}` |

## Ví dụ mẫu

```sql
SELECT data->>'name' AS name FROM profiles;
```

- `data` là cột `JSONB`.
- `->>'name'` đọc khóa `name` và trả về chữ (không phải JSON lồng).
- `->` (một mũi tên) trả về JSON; `->>` trả về chữ — nên dùng `->>` khi muốn cột chuỗi bình thường.

Kết quả:

| name |
| --- |
| Ana |
| Ben |

## Lỗi thường gặp

- Dùng `->` khi cần kết quả chữ để chấm hoặc hiển thị.
- Sai chính tả khóa JSON (`'Name'` thay vì `'name'`).
- Coi `data` như cột `TEXT` với `LIKE` thay vì toán tử JSON.

## Thử ngay

Trả về `name` của mỗi hồ sơ từ cột JSONB `data` (đặt alias cột là `name`).
