---
id: sql-21-right-join
track: sql-fundamentals
locale: vi
slug: right-join
title: Giữ hàng không khớp với RIGHT JOIN
order: 21
published: true
can_do: "Suy luận RIGHT JOIN như quy tắc giữ bên phải và nhận ra LEFT JOIN tương đương khi đổi thứ tự bảng"
objectives:
  - Giữ các hàng không match của input bên phải
  - Phát hiện match bên trái bị thiếu bằng IS NULL
  - Liên hệ RIGHT JOIN với LEFT JOIN khi hoán đổi bảng
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "Bảng cần giữ là directors và nó nằm bên phải."
    - "Director không có phim sẽ có movies.id là NULL sau join."
    - "Dùng: SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  solution: "SELECT directors.name FROM movies RIGHT JOIN directors ON movies.director_id = directors.id WHERE movies.id IS NULL;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
      - [2, "Wachowski"]
      - [3, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Villeneuve"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Interstellar', 2014, 1);"
---

RIGHT JOIN không có cơ chế match mới; nó vẫn dùng `ON`, chỉ thay đổi phía nào được giữ khi không có match.

## Mô hình tư duy

| Dạng join | Hàng không match được giữ |
| --- | --- |
| `A LEFT JOIN B` | A |
| `A RIGHT JOIN B` | B |

Ở đây `directors` bên phải nên cả Villeneuve vẫn xuất hiện dù không có movie match; khi đó `movies.id` là NULL.

## Dự đoán trước khi chạy

FULL result của RIGHT JOIN phải vẫn có Villeneuve với movie NULL. `WHERE movies.id IS NULL` sau đó cô lập đúng director này.

## Ví dụ mẫu

```sql
SELECT directors.name
FROM movies
RIGHT JOIN directors
  ON movies.director_id = directors.id
WHERE movies.id IS NULL;
```

| name |
| --- |
| Villeneuve |

Cùng logic có thể viết dễ đọc hơn với bảng đổi chỗ:

```sql
SELECT directors.name
FROM directors
LEFT JOIN movies
  ON movies.director_id = directors.id
WHERE movies.id IS NULL;
```

## Tìm lỗi

“RIGHT JOIN chỉ trả cột của bảng phải” là sai. Các match vẫn tạo hàng chứa cột từ **cả hai** input; RIGHT chỉ quy định cách xử lý hàng không match bên phải.

## Lỗi thường gặp

- Nghĩ RIGHT JOIN dùng một quan hệ khác LEFT JOIN.
- Kiểm tra NULL bằng `= NULL`.
- Dùng RIGHT JOIN khi đổi thứ tự bảng và LEFT JOIN giúp team đọc dễ hơn.

## Thử ngay

Trả các director không có phim match. Trước khi chạy, hãy viết lại trong đầu thành LEFT JOIN tương đương để xác nhận phía cần giữ.

## Tự kiểm tra

Cách viết lại khái niệm đơn giản nhất của `A RIGHT JOIN B` là gì?

**Đáp án:** `B LEFT JOIN A` với cùng quan hệ match nhưng hoán đổi input.
