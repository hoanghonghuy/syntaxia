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
  - Chỉ trả dòng cha có ít nhất một dòng con khớp
  - Nối dòng trong và ngoài bằng khóa chung
exercise:
  starter: "SELECT name FROM directors;"
  hints:
    - "EXISTS kiểm tra SELECT trong có tìm được ít nhất một dòng hay không."
    - "Nối dòng movies trong với đạo diễn ngoài bằng m.director_id = d.id."
    - "Thử: SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  solution: "SELECT name FROM directors d WHERE EXISTS (SELECT 1 FROM movies m WHERE m.director_id = d.id) ORDER BY name;"
  preview:
    columns: ["id", "name"]
    rows:
      - [1, "Nolan"]
      - [2, "Wachowski"]
      - [3, "Villeneuve"]
  expected:
    columns: ["name"]
    rows:
      - ["Nolan"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski'), (3, 'Villeneuve');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'Interstellar', 2014, 1), (3, 'The Matrix', 1999, 2);"
---

Đôi khi bạn chỉ cần biết dòng liên quan **có tồn tại** hay không, không cần biết dòng nào. `EXISTS` chạy một truy vấn nhỏ cho mỗi dòng ngoài và giữ dòng ngoài khi truy vấn trong tìm được ít nhất một khớp — như hỏi “đạo diễn này có phim nào không?” mà không liệt kê phim.

**directors** (bảng đầy đủ)

| id | name |
| --- | --- |
| 1 | Nolan |
| 2 | Wachowski |
| 3 | Villeneuve |

**movies** (bảng đầy đủ)

| id | title | year | director_id |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 1 |
| 2 | Interstellar | 2014 | 1 |
| 3 | The Matrix | 1999 | 2 |

| name | Có phim? | `EXISTS`? |
| --- | --- | --- |
| Nolan | Inception, Interstellar | true |
| Wachowski | The Matrix | true |
| Villeneuve | không | false |

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
- Villeneuve không có phim, nên `EXISTS` là false.
- `SELECT 1` trong `EXISTS` là đủ — chỉ quan tâm “có dòng nào không”, không quan tâm cột.

Kết quả:

| name |
| --- |
| Nolan |
| Wachowski |

## Lỗi thường gặp

- Quên tương quan (`m.director_id = d.id`) — mọi đạo diễn có thể khớp hoặc không ai khớp.
- Lo lắng về cột trong `SELECT *` bên trong `EXISTS` — `EXISTS` chỉ cần có dòng; thói quen tốt là `SELECT 1`.
- Nhầm `EXISTS` với `IN` — cả hai có thể dùng; bài này luyện dạng `EXISTS`.
- So sánh nhiều giá trị cùng lúc với `ANY` / `ALL` được học ở bài sau `any-all-subquery`.

## Thử ngay

Liệt kê `name` mọi đạo diễn có ít nhất một phim. Sắp theo `name`.
