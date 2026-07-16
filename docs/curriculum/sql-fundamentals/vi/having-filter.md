---
id: sql-26-having
track: sql-fundamentals
locale: vi
slug: having-filter
title: Lọc nhóm với HAVING
order: 26
published: true
objectives:
  - Lọc nhóm đã gom bằng HAVING
  - Phân biệt HAVING (sau nhóm) với WHERE (trước nhóm)
  - Giữ chỉ các nhóm đạt quy tắc đếm
exercise:
  starter: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id;"
  hints:
    - "WHERE lọc dòng trước khi gom; HAVING lọc nhóm sau COUNT."
    - "Chỉ giữ nhóm có COUNT(*) ít nhất 2."
    - "Thử: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
  solution: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
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
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'Interstellar', 2014, 1), (3, 'The Matrix', 1999, 2), (4, 'Dune', 2021, 3);"
---

`GROUP BY` tạo các nhóm. Đôi khi bạn chỉ muốn nhóm đạt một quy tắc — ví dụ đạo diễn có ít nhất hai phim. Bộ lọc đó thuộc `HAVING`, không phải `WHERE`, vì nó nhìn tổng nhóm sau khi đếm.

**movies** (bảng đầy đủ)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | Interstellar | 2014 | 1 |
| 3 | The Matrix | 1999 | 2 |
| 4 | Dune | 2021 | 3 |

| director_id | movie_count | Đạt `HAVING COUNT(*) >= 2`? |
| --- | --- | --- |
| 1 | 2 | có |
| 2 | 1 | không |
| 3 | 1 | không |

## Ví dụ mẫu

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id
HAVING COUNT(*) >= 2
ORDER BY director_id;
```

- `GROUP BY director_id` tạo một nhóm mỗi đạo diễn.
- `COUNT(*)` đo mỗi nhóm.
- `HAVING COUNT(*) >= 2` chỉ giữ nhóm có từ hai phim trở lên.
- `WHERE` lọc **dòng** trước khi gom — chưa thấy được `COUNT(*)`.

Kết quả:

| director_id | movie_count |
| --- | --- |
| 1 | 2 |

## Lỗi thường gặp

- Đặt `COUNT(*) >= 2` trong `WHERE` — aggregate chưa sẵn sàng trước `GROUP BY`.
- Quên `GROUP BY` khi dùng `HAVING`.
- Thiếu `AS movie_count` khi cột mong đợi dùng tên đó.

## Thử ngay

Trả về mỗi `director_id` có ít nhất hai phim. Đặt tên cột đếm `movie_count` và sắp theo `director_id`.
