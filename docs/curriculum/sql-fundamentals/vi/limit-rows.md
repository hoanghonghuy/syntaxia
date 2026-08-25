---
id: sql-07-limit
track: sql-fundamentals
locale: vi
slug: limit-rows
title: Giới hạn hàng với LIMIT
order: 7
published: true
can_do: "Tạo truy vấn top-N xác định bằng cách sắp xếp trước rồi giới hạn số hàng"
objectives:
  - Giới hạn số hàng trả về bằng LIMIT
  - Giải thích vì sao truy vấn top-N cần thứ tự rõ ràng
  - Kết hợp ORDER BY và LIMIT đúng thứ tự clause
exercise:
  starter: "SELECT title FROM movies ORDER BY year DESC;"
  hints:
    - "Các hàng đã được xếp mới nhất trước; việc còn lại là giới hạn số hàng kết quả."
    - "Thêm LIMIT ở cuối truy vấn với số lượng được yêu cầu là 2."
    - "Dùng: SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
  solution: "SELECT title FROM movies ORDER BY year DESC LIMIT 2;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

“Lấy cho tôi hai hàng” và “lấy cho tôi hai hàng mới nhất” là hai yêu cầu khác nhau. `LIMIT` kiểm soát số lượng; `ORDER BY` làm cho số lượng đó có ý nghĩa xác định.

## Mô hình tư duy

Với truy vấn top-N, hãy suy nghĩ theo hai giai đoạn:

1. **Sắp các hàng ứng viên** theo tiêu chí xếp hạng cần thiết.
2. **Lấy N hàng đầu** từ kết quả đã sắp.

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

Sau khi sắp `year DESC`:

| vị trí | title | year |
| --- | --- | --- |
| 1 | Dune | 2021 |
| 2 | Interstellar | 2014 |
| 3 | Inception | 2010 |
| 4 | The Matrix | 1999 |

`LIMIT 2` sau đó giữ vị trí 1 và 2.

## Dự đoán trước khi chạy

```sql
SELECT title
FROM movies
ORDER BY year DESC
LIMIT 2;
```

Trước khi chạy, hãy xác định thao tác nào quyết định **ai đứng đầu** và thao tác nào quyết định **còn bao nhiêu hàng**.

Dự đoán: `ORDER BY year DESC` xếp hạng phim; `LIMIT 2` trả Dune và Interstellar.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
ORDER BY year DESC
LIMIT 2;
```

| title |
| --- |
| Dune |
| Interstellar |

Chỉ dùng `LIMIT 2` vẫn có thể trả hai hàng, nhưng không diễn đạt được “hai phim mới nhất”. Yêu cầu top-N cần cả thứ tự lẫn giới hạn.

## Tìm lỗi

Vì sao câu này sai cú pháp?

```sql
SELECT title
FROM movies
LIMIT 2
ORDER BY year DESC;
```

Trong PostgreSQL/sandbox SQL hiện tại, thứ tự viết clause của SELECT đặt `ORDER BY` trước `LIMIT`. Hãy mô tả cách xếp hạng trước, rồi mới giới hạn số hàng.

## Lỗi thường gặp

- Chỉ dùng `LIMIT` cho yêu cầu “top”, “mới nhất”, “cao nhất”, “thấp nhất”.
- Đảo vị trí `ORDER BY` và `LIMIT` trong statement.
- Viết `LIMIT = 2`; `LIMIT` nhận trực tiếp con số.

## Thử ngay

Trả về hai tiêu đề phim mới nhất. Trước khi chạy, hãy trace pipeline hai bước: xếp cả bốn phim trước, rồi giữ hai phim.

## Tự kiểm tra

Vì sao `ORDER BY` quan trọng trong truy vấn top-N?

**Đáp án:** nó xác định những hàng nào được coi là N hàng đầu; `LIMIT` chỉ giới hạn số lượng trả về.
