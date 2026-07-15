---
id: sql-26-having
track: sql-fundamentals
locale: vi
slug: having-filter
title: Lọc nhóm với HAVING
order: 26
published: true
objectives:
  - Lọc nhóm đã gộp bằng HAVING
  - Phân biệt HAVING với WHERE
exercise:
  starter: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id;"
  hints:
    - "WHERE lọc dòng trước khi nhóm; HAVING lọc nhóm sau COUNT."
    - "Chỉ giữ nhóm có COUNT(*) ít nhất 2."
    - "Thử: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
  solution: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
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
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'Interstellar', 1), (3, 'The Matrix', 2);"
---

`GROUP BY` tạo các nhóm. Đôi khi bạn chỉ muốn nhóm thỏa một quy tắc — ví dụ đạo diễn có ít nhất hai phim. Bộ lọc đó thuộc `HAVING`, không phải `WHERE`, vì nó nhìn tổng nhóm sau khi đếm.

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
HAVING COUNT(*) >= 2
ORDER BY director_id;
```

- `GROUP BY director_id` tạo một nhóm cho mỗi đạo diễn.
- `COUNT(*)` đo mỗi nhóm.
- `HAVING COUNT(*) >= 2` chỉ giữ nhóm có từ hai phim trở lên.

Kết quả:

| director_id | movie_count |
| --- | --- |
| 1 | 2 |

## Lỗi thường gặp

- Đặt `COUNT(*) >= 2` trong `WHERE` — hàm gộp chưa sẵn sàng trước `GROUP BY`.
- Quên `GROUP BY` khi dùng `HAVING`.
- Bỏ `AS movie_count` khi cột kỳ vọng dùng tên đó.

## Thử ngay

Trả về mỗi `director_id` có ít nhất hai phim. Đặt tên cột đếm là `movie_count` và sắp xếp theo `director_id`.
