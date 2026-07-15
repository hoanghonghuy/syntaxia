---
id: sql-04-aggregate
track: sql-fundamentals
locale: vi
slug: group-by-aggregate
title: Đếm với GROUP BY
order: 25
published: true
objectives:
  - Đếm số dòng theo nhóm
  - Dùng GROUP BY với COUNT
exercise:
  starter: "SELECT director_id FROM movies;"
  hints:
    - "COUNT(*) đếm số dòng trong mỗi nhóm."
    - "GROUP BY director_id gom các dòng cùng đạo diễn."
    - "Thử: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id ORDER BY director_id;"
  solution: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id ORDER BY director_id;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "Interstellar", 1]
      - [3, "The Matrix", 2]
  expected:
    columns: ["director_id", "movie_count"]
    rows:
      - [1, 2]
      - [2, 1]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'Interstellar', 1), (3, 'The Matrix', 2);"
---

Đôi khi bạn cần tóm tắt, không phải từng dòng — giống pivot: “mỗi đạo diễn có bao nhiêu phim?”

| id | title | director_id |
| --- | --- | --- |
| 1 | Inception | 1 |
| 2 | Interstellar | 1 |
| 3 | The Matrix | 2 |

## Ví dụ mẫu

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id
ORDER BY director_id;
```

- `GROUP BY director_id` gom các dòng cùng đạo diễn.
- `COUNT(*)` đếm dòng trong mỗi nhóm.
- `AS movie_count` đặt tên cột kết quả để hệ thống chấm điểm khớp được.
- `ORDER BY director_id` giữ thứ tự nhóm ổn định.

Kết quả:

| director_id | movie_count |
| --- | --- |
| 1 | 2 |
| 2 | 1 |

## Lỗi thường gặp

- Dùng `COUNT(*)` mà không có `GROUP BY` khi cần đếm **theo từng** đạo diễn — sẽ ra một tổng cho cả bảng.
- Chọn thêm `title` cùng `COUNT(*)` mà không gom theo `title` — thường gây lỗi.
- Quên `AS movie_count` khi kết quả kỳ vọng dùng đúng tên cột đó.

## Thử ngay

Đếm số phim theo `director_id`, sắp theo `director_id`. Đặt tên cột đếm là `movie_count`.
