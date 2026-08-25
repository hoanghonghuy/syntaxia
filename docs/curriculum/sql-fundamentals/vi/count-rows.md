---
id: sql-13-count
track: sql-fundamentals
locale: vi
slug: count-rows
title: Đếm hàng với COUNT
order: 13
published: true
can_do: "Đếm số hàng nguồn bằng COUNT(*) và phân biệt với việc đếm giá trị không NULL của một cột"
objectives:
  - Dùng COUNT(*) để đếm hàng
  - Dự đoán kết quả scalar của aggregate
  - Phân biệt COUNT(*) với COUNT(column)
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Đề hỏi có bao nhiêu hàng, không phải danh sách title."
    - "COUNT(*) đếm mọi hàng; đặt tên kết quả là movie_count."
    - "Dùng: SELECT COUNT(*) AS movie_count FROM movies;"
  solution: "SELECT COUNT(*) AS movie_count FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["movie_count"]
    rows:
      - [4]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Khi câu hỏi là “bao nhiêu?”, trả hết các hàng rồi tự đếm là thừa. `COUNT` cho database tính số lượng trực tiếp.

## Mô hình tư duy

`COUNT(*)` coi mỗi hàng nguồn là một đơn vị để đếm.

| hàng nguồn | đóng góp vào `COUNT(*)`? |
| --- | --- |
| Inception | +1 |
| The Matrix | +1 |
| Dune | +1 |
| Interstellar | +1 |

Bốn hàng đầu vào trở thành một kết quả aggregate: `4`.

Một điểm nối với bài NULL trước đó:

- `COUNT(*)` đếm hàng.
- `COUNT(rating)` đếm các hàng mà `rating` **không NULL**.

## Dự đoán trước khi chạy

```sql
SELECT COUNT(*) AS movie_count
FROM movies;
```

Dự đoán: **một hàng** chứa `4`. Aggregate không trả bốn hàng mỗi hàng số 1; nó tóm tắt cả tập.

## Ví dụ mẫu

```sql
SELECT COUNT(*) AS movie_count
FROM movies;
```

| movie_count |
| ---: |
| 4 |

Alias giúp ý nghĩa của con số duy nhất này rõ ràng với người đọc hoặc API consumer.

## Tìm lỗi

Một bảng có bốn hàng nhưng một hàng có `rating = NULL`. Vì sao câu này có thể trả `3` trong khi `COUNT(*)` trả `4`?

```sql
SELECT COUNT(rating)
FROM movies;
```

`COUNT(column)` bỏ qua NULL trong biểu thức đó. Nếu yêu cầu là số hàng, dùng `COUNT(*)`.

## Lỗi thường gặp

- Dùng `COUNT(column)` khi yêu cầu thật là “số hàng”.
- Mong COUNT vừa trả các hàng gốc vừa trả số lượng.
- Nhầm COUNT với SUM; COUNT đếm phần tử, SUM cộng các số.

## Thử ngay

Đếm tất cả hàng trong `movies` và trả một cột tên `movie_count`.

## Tự kiểm tra

Nếu một hàng tồn tại nhưng một cột trong hàng là NULL, `COUNT(*)` có vẫn đếm hàng đó không?

**Đáp án:** có. `COUNT(*)` đếm hàng bất kể bên trong có NULL hay không.
