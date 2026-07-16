---
id: sql-04-aggregate
track: sql-fundamentals
locale: vi
slug: group-by-aggregate
title: Đếm với GROUP BY
order: 25
published: true
objectives:
  - Gom dòng bằng GROUP BY
  - Đếm dòng mỗi nhóm bằng COUNT(*)
  - Đặt alias cho cột đếm để kết quả rõ ràng
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
      - [4, "Dune", 3]
  expected:
    columns: ["director_id", "movie_count"]
    rows:
      - [1, 2]
      - [2, 1]
      - [3, 1]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'Interstellar', 2014, 1), (3, 'The Matrix', 1999, 2), (4, 'Dune', 2021, 3);"
---

Đôi khi bạn cần tóm tắt, không phải từng dòng — giống pivot: “mỗi đạo diễn có bao nhiêu phim?”

**movies** (bảng đầy đủ)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | Interstellar | 2014 | 1 |
| 3 | The Matrix | 1999 | 2 |
| 4 | Dune | 2021 | 3 |

| director_id | title trong nhóm | count |
| --- | --- | --- |
| 1 | Inception, Interstellar | 2 |
| 2 | The Matrix | 1 |
| 3 | Dune | 1 |

## Ví dụ mẫu

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id
ORDER BY director_id;
```

- `GROUP BY director_id` gom dòng cùng đạo diễn.
- `COUNT(*)` đếm dòng trong mỗi nhóm.
- `AS movie_count` đặt tên cột kết quả để grader khớp được.
- `ORDER BY director_id` giữ thứ tự nhóm ổn định.
- Lọc nhóm sau khi gom sẽ học ở bài `having-filter`.

Kết quả:

| director_id | movie_count |
| --- | --- |
| 1 | 2 |
| 2 | 1 |
| 3 | 1 |

## Lỗi thường gặp

- Dùng `COUNT(*)` không có `GROUP BY` khi cần đếm **theo** đạo diễn — sẽ ra một tổng cho cả bảng.
- Chọn `title` cùng `COUNT(*)` mà không group theo `title` — thường gây lỗi.
- Quên `AS movie_count` khi kết quả mong đợi dùng tên cột đó.

## Thử ngay

Đếm phim theo `director_id`, sắp theo `director_id`. Đặt tên cột đếm là `movie_count`.
