---
id: sql-03-distinct
track: sql-fundamentals
locale: vi
slug: select-distinct
title: Giá trị duy nhất với DISTINCT
order: 3
published: true
objectives:
  - Loại giá trị trùng trong kết quả
  - Dùng SELECT DISTINCT trên một cột
exercise:
  starter: "SELECT director FROM movies;"
  hints:
    - "Không có DISTINCT, cùng một đạo diễn có thể xuất hiện nhiều lần."
    - "Đặt DISTINCT ngay sau SELECT."
    - "Thử: SELECT DISTINCT director FROM movies ORDER BY director;"
  solution: "SELECT DISTINCT director FROM movies ORDER BY director;"
  preview:
    columns: ["id", "title", "director"]
    rows:
      - [1, "Inception", "Nolan"]
      - [2, "Interstellar", "Nolan"]
      - [3, "The Matrix", "Wachowski"]
      - [4, "Dune", "Villeneuve"]
  expected:
    columns: ["director"]
    rows:
      - ["Nolan"]
      - ["Villeneuve"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 'Nolan'), (2, 'Interstellar', 'Nolan'), (3, 'The Matrix', 'Wachowski'), (4, 'Dune', 'Villeneuve');"
---

Một bảng có thể lặp cùng giá trị trên nhiều hàng. Khi bạn chỉ cần mỗi giá trị một lần — như danh sách đạo diễn không trùng — dùng `DISTINCT`.

**movies** (bảng đầy đủ — chú ý Nolan xuất hiện hai lần)

| id | title | director |
| --- | --- | --- |
| 1 | Inception | Nolan |
| 2 | Interstellar | Nolan |
| 3 | The Matrix | Wachowski |
| 4 | Dune | Villeneuve |

Nếu chọn `director` không có `DISTINCT`, Nolan hiện hai lần (mỗi phim một lần).

## Ví dụ mẫu

```sql
SELECT DISTINCT director
FROM movies
ORDER BY director;
```

- `SELECT director` đơn thuần sẽ trả Nolan, Nolan, Wachowski, Villeneuve.
- `DISTINCT` giữ mỗi giá trị đạo diễn chỉ một lần.
- `ORDER BY director` sắp A→Z để thứ tự kết quả ổn định.

Kết quả:

| director |
| --- |
| Nolan |
| Villeneuve |
| Wachowski |

## Lỗi thường gặp

- Viết `SELECT director DISTINCT` — `DISTINCT` phải đứng ngay sau `SELECT`.
- Nghĩ `DISTINCT` luôn bỏ cả hàng trùng khi chọn nhiều cột — nó áp dụng cho tổ hợp các cột bạn liệt kê.
- Quên rằng không có `ORDER BY` thì thứ tự giá trị distinct không được đảm bảo.

## Thử ngay

Liệt kê mỗi `director` khác nhau từ `movies`, sắp theo `director`.
