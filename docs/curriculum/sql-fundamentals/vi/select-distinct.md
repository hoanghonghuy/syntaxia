---
id: sql-03-distinct
track: sql-fundamentals
locale: vi
slug: select-distinct
title: Giá trị duy nhất với DISTINCT
order: 3
published: true
objectives:
  - Loại bỏ giá trị trùng trong kết quả
  - Dùng SELECT DISTINCT trên một cột
exercise:
  starter: "SELECT director FROM movies;"
  hints:
    - "Không có DISTINCT, cùng một đạo diễn có thể xuất hiện nhiều lần."
    - "Đặt DISTINCT ngay sau SELECT."
    - "Thử: SELECT DISTINCT director FROM movies ORDER BY director;"
  solution: "SELECT DISTINCT director FROM movies ORDER BY director;"
  preview:
    columns: ["id", "director"]
    rows:
      - [1, "Nolan"]
      - [2, "Nolan"]
      - [3, "Wachowski"]
  expected:
    columns: ["director"]
    rows:
      - ["Nolan"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Nolan'), (2, 'Nolan'), (3, 'Wachowski');"
---

Một bảng có thể lặp cùng một giá trị ở nhiều hàng. Khi bạn chỉ cần mỗi giá trị một lần — ví dụ danh sách đạo diễn không trùng — hãy dùng `DISTINCT`.

| id | director |
| --- | --- |
| 1 | Nolan |
| 2 | Nolan |
| 3 | Wachowski |

## Ví dụ mẫu

```sql
SELECT DISTINCT director FROM movies ORDER BY director;
```

- Chỉ `SELECT director` sẽ trả về Nolan hai lần.
- `DISTINCT` giữ mỗi giá trị đạo diễn chỉ một lần.
- `ORDER BY director` sắp xếp danh sách để thứ tự kết quả ổn định (Nolan, rồi Wachowski).

Kết quả:

| director |
| --- |
| Nolan |
| Wachowski |

## Lỗi thường gặp

- Viết `SELECT director DISTINCT` — `DISTINCT` phải đứng ngay sau `SELECT`.
- Nghĩ `DISTINCT` luôn loại hàng trùng toàn bộ khi chọn nhiều cột — nó áp dụng cho tổ hợp các cột bạn liệt kê.
- Quên rằng không có `ORDER BY` thì thứ tự các giá trị distinct không được đảm bảo.

## Thử ngay

Liệt kê từng `director` khác nhau từ `movies`, sắp xếp theo `director`.
