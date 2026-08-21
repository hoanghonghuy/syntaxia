---
id: sql-20-left-join
track: sql-fundamentals
locale: vi
slug: left-join
title: Giữ hàng không khớp với LEFT JOIN
order: 20
published: true
can_do: "Giữ mọi hàng của bảng trái bằng LEFT JOIN và phát hiện hàng không tìm được match bên phải"
objectives:
  - Phân biệt LEFT JOIN với INNER JOIN
  - Đọc các cột NULL bên phải như kết quả không match
  - Dùng LEFT JOIN + IS NULL như anti-join
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Bắt đầu từ movies và giữ mọi phim bằng LEFT JOIN."
    - "Phim không match director sẽ có directors.id = NULL trong kết quả join."
    - "Dùng: SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  solution: "SELECT movies.title FROM movies LEFT JOIN directors ON movies.director_id = directors.id WHERE directors.id IS NULL;"
  preview:
    columns: ["id", "title", "director_id"]
    rows:
      - [1, "Inception", 1]
      - [2, "The Matrix", 2]
      - [3, "Orphan", null]
  expected:
    columns: ["title"]
    rows:
      - ["Orphan"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE directors (id INT, name TEXT);"
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director_id INT);"
    - "INSERT INTO directors VALUES (1, 'Nolan'), (2, 'Wachowski');"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 1), (2, 'The Matrix', 1999, 2), (3, 'Orphan', 2020, NULL);"
---

INNER JOIN trả lời “cho tôi các match”. LEFT JOIN rộng hơn: “bắt đầu với mọi hàng bên trái, gắn match nếu có, nhưng vẫn giữ hàng nếu không có”.

## Mô hình tư duy

Từ **LEFT** là quy tắc bảo toàn. Với `FROM movies LEFT JOIN directors`, mọi hàng `movies` phải sống qua bước join.

| movie | match director | phần bên phải |
| --- | --- | --- |
| Inception | Nolan | có dữ liệu |
| The Matrix | Wachowski | có dữ liệu |
| Orphan | không | các cột director thành NULL |

NULL ở đây biểu diễn “không có hàng bên phải match”, không phải một director giả được lưu trong bảng.

## Dự đoán trước khi chạy

Trước khi filter, LEFT JOIN trả **3 hàng**, gồm cả Orphan. Sau đó `WHERE directors.id IS NULL` loại các match và giữ đúng hàng thất bại khi lookup.

## Ví dụ mẫu

```sql
SELECT movies.title
FROM movies
LEFT JOIN directors
  ON movies.director_id = directors.id
WHERE directors.id IS NULL;
```

| title |
| --- |
| Orphan |

Đây là mẫu **anti-join** phổ biến: giữ bên trái rồi chọn nơi bên phải không xuất hiện.

## Tìm lỗi

Nếu đổi LEFT JOIN thành INNER JOIN, Orphan bị loại ngay ở bước join. Vì vậy đến `WHERE directors.id IS NULL` sẽ không còn hàng orphan nào để tìm.

## Lỗi thường gặp

- Dùng INNER JOIN rồi cố tìm match bị thiếu.
- Viết `directors.id = NULL` thay vì `IS NULL`.
- Quên bảng nào đang nằm ở phía trái được bảo toàn.

## Thử ngay

Trả title của mọi phim không có director match. Hãy hình dung kết quả LEFT JOIN đầy đủ trước rồi mới áp NULL filter.

## Tự kiểm tra

Trong `movies LEFT JOIN directors`, input nào được đảm bảo giữ các hàng không match?

**Đáp án:** `movies`, tức input bên trái.
