---
id: sql-26-having
track: sql-fundamentals
locale: vi
slug: having-filter
title: Lọc nhóm với HAVING
order: 26
published: true
can_do: "Chọn WHERE hay HAVING dựa trên giai đoạn dữ liệu mà điều kiện đang nói tới"
objectives:
  - Phân biệt lọc từng hàng với lọc nhóm
  - Theo dõi luồng WHERE -> GROUP BY -> aggregate -> HAVING
  - Chỉ giữ các nhóm thỏa điều kiện tổng hợp
exercise:
  starter: "SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id;"
  hints:
    - "Điều kiện nói về COUNT(*) của từng nhóm nên phải chạy sau khi nhóm."
    - "Dùng HAVING COUNT(*) >= 2 sau GROUP BY director_id."
    - "Dùng: SELECT director_id, COUNT(*) AS movie_count FROM movies GROUP BY director_id HAVING COUNT(*) >= 2 ORDER BY director_id;"
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

`WHERE` và `HAVING` đều dùng để lọc nhưng hoạt động ở hai giai đoạn khác nhau. Cách chọn chắc nhất là hỏi: **điều kiện đang nói về hàng dữ liệu gốc hay kết quả tổng hợp của một nhóm?**

## Mô hình tư duy

Hãy theo pipeline thay vì học thuộc tên mệnh đề:

| Giai đoạn | Lúc này có gì? | Bộ lọc thường dùng |
| --- | --- | --- |
| hàng nguồn | từng phim | `WHERE year >= 2000` |
| nhóm | một bucket cho mỗi `director_id` | `GROUP BY director_id` |
| tóm tắt nhóm | `COUNT(*)` của từng bucket | `HAVING COUNT(*) >= 2` |

Với dữ liệu bài này:

| director_id | các hàng trong nhóm | count |
| ---: | --- | ---: |
| 1 | Inception, Interstellar | 2 |
| 2 | The Matrix | 1 |
| 3 | Dune | 1 |

Yêu cầu “đạo diễn có ít nhất hai phim” chỉ kiểm tra được sau khi các count đã được tạo.

## Dự đoán trước khi chạy

Với `HAVING COUNT(*) >= 2`, chỉ nhóm `director_id = 1` sống sót. Hãy dự đoán luôn hình dạng kết quả: **2 cột × 1 hàng**.

## Ví dụ mẫu

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
GROUP BY director_id
HAVING COUNT(*) >= 2
ORDER BY director_id;
```

| director_id | movie_count |
| ---: | ---: |
| 1 | 2 |

Đọc theo thứ tự xử lý: bắt đầu từ các hàng, tạo bucket theo đạo diễn, đếm từng bucket rồi loại các bucket có count nhỏ hơn 2.

## Tìm lỗi

Vì sao truy vấn sau sai với yêu cầu?

```sql
SELECT director_id, COUNT(*) AS movie_count
FROM movies
WHERE COUNT(*) >= 2
GROUP BY director_id;
```

`WHERE` chạy trước khi aggregate của nhóm tồn tại nên chưa thể dùng `COUNT(*)` ở đó. Điều kiện dựa trên aggregate phải chuyển sang `HAVING`.

## Lỗi thường gặp

- Đặt điều kiện aggregate trong `WHERE` thay vì `HAVING`.
- Coi `HAVING` là thay thế cho mọi `WHERE`; điều kiện trên từng hàng vẫn nên ở `WHERE`.
- Quên rằng `HAVING` lọc các nhóm đã tạo, vì vậy `GROUP BY` phải đúng với nhóm muốn phân tích.

## Thử ngay

Trả về các `director_id` có ít nhất hai phim. Đặt tên count là `movie_count` và sắp theo `director_id`. Trước khi chạy, hãy xác định giai đoạn nào tạo ra count.

## Tự kiểm tra

“Phim phát hành sau 2000” nên lọc ở đâu, còn “đạo diễn có ít nhất hai phim” nên lọc ở đâu?

**Đáp án:** `WHERE` cho điều kiện từng hàng; `HAVING` cho điều kiện aggregate của nhóm.
