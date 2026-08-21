---
id: sql-02-where
track: sql-fundamentals
locale: vi
slug: filtering-with-where
title: Lọc với WHERE
order: 4
published: true
can_do: "Lọc các hàng nguồn bằng điều kiện WHERE và dự đoán hàng nào được giữ lại"
objectives:
  - Tách việc chọn cột khỏi việc lọc hàng
  - Đánh giá phép so sánh số trên từng hàng
  - Dùng WHERE để chỉ giữ hàng thỏa điều kiện
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Đề đang hỏi hàng nào được giữ, vì vậy hãy thêm điều kiện WHERE sau FROM movies."
    - "So sánh cột year với 2000 bằng toán tử >."
    - "Dùng: SELECT title FROM movies WHERE year > 2000 ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year > 2000 ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Một truy vấn hữu ích thường cần ít hàng hơn, không chỉ ít cột hơn. `WHERE` biến điều kiện thành quyết định đúng/sai cho từng hàng nguồn.

## Mô hình tư duy

Tách trách nhiệm của các clause:

| Clause | Công việc chính |
| --- | --- |
| `SELECT` | Quyết định các cột kết quả |
| `FROM` | Chỉ ra bảng nguồn |
| `WHERE` | Quyết định hàng nguồn nào được giữ |

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Với `WHERE year > 2000`, hãy tưởng tượng kiểm tra từng hàng:

| title | `year > 2000` | Giữ? |
| --- | --- | --- |
| Inception | true | có |
| The Matrix | false | không |
| Dune | true | có |
| Interstellar | true | có |

## Dự đoán trước khi chạy

```sql
SELECT title
FROM movies
WHERE year > 2000;
```

Trước khi chạy, hãy tự nêu tên ba phim được giữ. Đồng thời dự đoán hình dạng: **1 cột, 3 hàng**.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE year > 2000
ORDER BY title;
```

Kết quả:

| title |
| --- |
| Dune |
| Inception |
| Interstellar |

Phép so sánh không thay đổi giá trị `year` được lưu. Nó chỉ quyết định hàng nào tham gia kết quả hiện tại.

## Tìm lỗi

Đề nói “phim phát hành sau năm 2000”, nhưng có người viết:

```sql
SELECT title
FROM movies
WHERE year = 2000;
```

`=` nghĩa là bằng chính xác. Nó không khớp 2010, 2014 hoặc 2021. Hãy dịch yêu cầu trước: “sau 2000” nghĩa là `year > 2000`.

## Lỗi thường gặp

- Chọn đúng cột nhưng quên điều kiện lọc hàng.
- Dùng `=` khi yêu cầu thực tế là `>`, `<`, `>=` hoặc `<=`.
- Đặt `WHERE` trước `FROM`; thứ tự clause là `SELECT ... FROM ... WHERE ...`.

## Thử ngay

Chỉ trả về `title` của các phim phát hành sau năm 2000, sắp theo `title`. Trước khi chạy, hãy xác định hàng nào sẽ bị loại.

## Tự kiểm tra

Nếu `SELECT` thay đổi cột nào xuất hiện, clause nào thay đổi hàng nào được giữ?

**Đáp án:** `WHERE`.
