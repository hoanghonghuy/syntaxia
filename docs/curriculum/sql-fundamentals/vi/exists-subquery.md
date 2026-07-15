---
id: sql-27-exists
track: sql-fundamentals
locale: vi
slug: exists-subquery
title: Kiểm tra dòng liên quan với EXISTS
order: 27
published: true
objectives:
  - Dùng EXISTS với subquery tương quan
  - Chỉ trả về dòng cha có ít nhất một dòng con khớp
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "EXISTS kiểm tra xem SELECT bên trong có tìm được ít nhất một dòng hay không."
    - "Nối dòng movies bên trong với đạo diễn bên ngoài bằng m.director_id = d.id."
    - "Thử: SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  solution: "SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  preview:
    columns: ["directors.name", "has_movies"]
    rows:
      - ["Nolan", "yes"]
      - ["Villeneuve", "no"]
      - ["Wachowski", "yes"]
  expected:
    columns: ["name"]
    rows:
      - ["Nolan"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 1), (2, 'The Matrix', 2);"
---

Đôi khi bạn chỉ cần biết một dòng liên quan **có tồn tại** hay không, không cần biết dòng nào. `EXISTS` chạy một truy vấn nhỏ cho mỗi dòng ngoài và giữ dòng ngoài khi truy vấn trong tìm được ít nhất một khớp — như hỏi “đạo diễn này có phim nào không?” mà không liệt kê phim.

**directors**

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |
| 3 | Villeneuve |

**movies**

| id | title | director_id |
| --- | --- |
| 1 | Inception | 1 |
| 2 | The Matrix | 2 |

## Ví dụ mẫu

```sql
SELECT name
FROM directors d
WHERE EXISTS (
  SELECT 1
  FROM movies m
  WHERE m.director_id = d.id
)
ORDER BY name;
```

- Truy vấn ngoài đi qua từng đạo diễn (`d`).
- Truy vấn trong tìm bất kỳ phim nào có `director_id` khớp `d.id`.
- Villeneuve không có phim, nên `EXISTS` là false cho dòng đó.

Kết quả:

| name |
| --- |
| Nolan |
| Wachowski |

## Lỗi thường gặp

- Quên điều kiện tương quan (`m.director_id = d.id`) — khi đó mọi đạo diễn có thể khớp hoặc không ai khớp.
- Dùng `SELECT *` trong `EXISTS` rồi lo về cột — `EXISTS` chỉ quan tâm có dòng hay không; `SELECT 1` là thói quen rõ ràng.
- Nhầm `EXISTS` với `IN` — cả hai có thể dùng ở đây; bài này luyện dạng `EXISTS`.

## Thử ngay

Liệt kê `name` của mọi đạo diễn có ít nhất một phim. Sắp xếp theo `name`.
