---
id: sql-04-aggregate
track: sql-fundamentals
locale: vi
slug: group-by-aggregate
title: Đếm theo nhóm với GROUP BY
order: 25
published: true
can_do: "Chia các hàng thành nhóm và tính một aggregate cho mỗi nhóm"
objectives:
  - Tạo group từ các giá trị key bằng nhau
  - Áp COUNT(*) trong từng group
  - Phân biệt aggregate cả bảng với aggregate theo nhóm
exercise:
  starter: "SELECT director_id FROM movies;"
  hints:
    - "Đề cần một count cho mỗi director, không phải một count của cả bảng."
    - "GROUP BY director_id tạo bucket; COUNT(*) tóm tắt từng bucket."
    - "Dùng: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id ORDER BY director_id;"
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

Block C dùng aggregate để tóm tắt toàn bộ tập đầu vào. `GROUP BY` đổi đơn vị tổng hợp: trước tiên chia hàng thành bucket, sau đó tính tóm tắt trong từng bucket.

## Mô hình tư duy

Suy nghĩ theo hai bước: **bucket -> aggregate**.

| group key | hàng trong bucket | `COUNT(*)` |
| ---: | --- | ---: |
| 1 | Inception, Interstellar | 2 |
| 2 | The Matrix | 1 |
| 3 | Dune | 1 |

Kết quả có **một hàng cho mỗi group**, không phải một hàng cho mỗi phim và cũng không phải một hàng cho cả bảng.

## Dự đoán trước khi chạy

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id;
```

Dự đoán ba hàng với count `2, 1, 1`. So với `SELECT COUNT(*) FROM movies` chỉ trả một count toàn bảng là `4`.

## Ví dụ mẫu

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id
ORDER BY director_id;
```

| director_id | movie_count |
| ---: | ---: |
| 1 | 2 |
| 2 | 1 |
| 3 | 1 |

`director_id` được phép đứng cạnh aggregate vì nó là grouping key: mỗi hàng output đại diện một giá trị key.

## Tìm lỗi

```sql
SELECT title, COUNT(*)
FROM movies
GROUP BY director_id;
```

Một group director có thể chứa nhiều title khác nhau, nên SQL không thể chọn tùy ý một title đại diện. Hãy chọn grouping key và aggregate, hoặc chủ động đổi cách group.

## Lỗi thường gặp

- Quên GROUP BY và chỉ nhận một tổng của cả bảng.
- SELECT cột không group, không aggregate nhưng có nhiều giá trị trong group.
- Nghĩ GROUP BY tự sắp output; thứ tự cần `ORDER BY`.

## Thử ngay

Đếm phim theo `director_id`, đặt count là `movie_count`, sắp theo director ID. Hãy tự dựng ba bucket trước khi chạy.

## Tự kiểm tra

Điều gì quyết định số hàng của kết quả grouped aggregate?

**Đáp án:** số group khác nhau được GROUP BY tạo ra, trước khi xét các filter group như HAVING.
