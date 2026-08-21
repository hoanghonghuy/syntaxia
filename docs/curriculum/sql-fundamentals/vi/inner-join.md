---
id: sql-03-join
track: sql-fundamentals
locale: vi
slug: inner-join
title: Kết hợp bảng với INNER JOIN
order: 19
published: true
can_do: "Ghép các hàng liên quan từ hai bảng bằng điều kiện ON và dự đoán kết quả kết hợp"
objectives:
  - Xác định cột quan hệ trỏ sang bảng còn lại
  - Trace các cặp hàng thỏa điều kiện join
  - Chọn cột từ cả hai hàng đã match
exercise:
  starter: "SELECT movies.title FROM movies;"
  hints:
    - "Quan hệ là movies.director_id -> directors.id."
    - "Dùng INNER JOIN directors ON movies.director_id = directors.id."
    - "Dùng: SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id ORDER BY movies.title;"
  solution: "SELECT movies.title, directors.name FROM movies INNER JOIN directors ON movies.director_id = directors.id ORDER BY movies.title;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "The Matrix", 2]
      - [3, "Interstellar", 1]
  expected:
    columns: ["title", "name"]
    rows:
      - ["Inception", "Nolan"]
      - ["Interstellar", "Nolan"]
      - ["The Matrix", "Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Interstellar', 2014, 1);"
---

Dữ liệu quan hệ thường được tách để không lặp tên đạo diễn trong mọi hàng phim. JOIN dựng lại góc nhìn cần dùng bằng cách match các hàng liên quan tại thời điểm truy vấn.

## Mô hình tư duy

Đừng nghĩ “trộn hai bảng”. Hãy nghĩ **tạo các cặp hàng hợp lệ theo quy tắc `ON`**.

| movie | director_id | directors.id khớp | name |
| --- | ---: | ---: | --- |
| Inception | 1 | 1 | Nolan |
| The Matrix | 2 | 2 | Wachowski |
| Interstellar | 1 | 1 | Nolan |

Quy tắc quan hệ là `movies.director_id = directors.id`.

## Dự đoán trước khi chạy

```sql
SELECT movies.title, directors.name
FROM movies
INNER JOIN directors
  ON movies.director_id = directors.id;
```

Dự đoán: **2 cột, 3 hàng**. Dataset này có match cho mọi phim. Với INNER JOIN, hàng không tạo được cặp hợp lệ sẽ không nằm trong kết quả.

## Ví dụ mẫu

```sql
SELECT movies.title, directors.name
FROM movies
INNER JOIN directors
  ON movies.director_id = directors.id
ORDER BY movies.title;
```

| title | name |
| --- | --- |
| Inception | Nolan |
| Interstellar | Nolan |
| The Matrix | Wachowski |

`ON` quyết định các hàng liên quan; `SELECT` quyết định cột nào từ các cặp đó xuất hiện.

## Tìm lỗi

```sql
ON movies.id = directors.id
```

`movies.id` là định danh phim, không phải tham chiếu đạo diễn. Quan hệ nằm ở `movies.director_id`; match hai primary ID độc lập chỉ tạo các cặp tình cờ sai nghĩa.

## Lỗi thường gặp

- Join các cột vì giá trị trông giống nhau thay vì theo quan hệ thật.
- Không qualify tên cột khi hai bảng có tên cột trùng nhau.
- Mong hàng không match vẫn tồn tại trong INNER JOIN.

## Thử ngay

Trả title của từng phim cùng name đạo diễn, sắp theo title. Trước khi chạy, trace ba cặp `director_id -> id`.

## Tự kiểm tra

`ON` chủ yếu định nghĩa điều gì?

**Đáp án:** quy tắc quyết định hàng của hai input nào được phép ghép thành một cặp.
