---
id: sql-05-and-or-not
track: sql-fundamentals
locale: vi
slug: and-or-not
title: Kết hợp bộ lọc với AND, OR, NOT
order: 5
published: true
can_do: "Kết hợp các điều kiện boolean và chọn AND, OR hoặc NOT theo đúng yêu cầu"
objectives:
  - Đánh giá hai điều kiện trên cùng một hàng
  - Dùng AND khi mọi điều kiện bắt buộc đều phải đúng
  - Giải thích OR và NOT thay đổi bộ lọc như thế nào
exercise:
  starter: "SELECT title FROM movies WHERE year > 2000;"
  hints:
    - "Điều kiện năm một mình vẫn giữ Dune, vì vậy cần thêm một điều kiện nữa."
    - "Dùng AND khi cả yêu cầu về year và director đều phải đúng trên cùng một hàng."
    - "Dùng: SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year > 2000 AND director = 'Nolan' ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Yêu cầu thực tế thường chứa các từ **và**, **hoặc**, **không**. Kỹ năng quan trọng là chuyển những từ đó thành điều kiện có thể kiểm tra trên từng hàng.

## Mô hình tư duy

Với hai điều kiện `A` và `B`:

| A | B | `A AND B` | `A OR B` |
| --- | --- | --- | --- |
| true | true | true | true |
| true | false | false | true |
| false | true | false | true |
| false | false | false | false |

`NOT A` đảo giá trị đúng/sai của `A`.

Áp dụng vào dữ liệu bài:

| title | `year > 2000` | `director = 'Nolan'` | Kết quả AND |
| --- | --- | --- | --- |
| Inception | true | true | giữ |
| The Matrix | false | false | bỏ |
| Interstellar | true | true | giữ |
| Dune | true | false | bỏ |

## Dự đoán trước khi chạy

```sql
SELECT title
FROM movies
WHERE year > 2000 AND director = 'Nolan';
```

Hãy dự đoán trước: **Inception** và **Interstellar** được giữ. Dune qua điều kiện năm nhưng trượt điều kiện đạo diễn nên `AND` loại nó.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE year > 2000 AND director = 'Nolan'
ORDER BY title;
```

| title |
| --- |
| Inception |
| Interstellar |

Chọn toán tử từ chính yêu cầu:

- **cả hai đều bắt buộc** -> `AND`
- **một trong hai là đủ** -> `OR`
- **loại trừ một điều kiện** -> `NOT`

Khi bộ lọc trộn `AND` và `OR`, dùng ngoặc để làm nhóm điều kiện rõ ràng và tránh giấu giả định về độ ưu tiên toán tử.

## Tìm lỗi

Yêu cầu là “sau 2000 **và** do Nolan đạo diễn”, nhưng truy vấn lại viết:

```sql
WHERE year > 2000 OR director = 'Nolan'
```

`OR` rộng hơn: Dune vẫn qua vì phim sau 2000 dù đạo diễn là Villeneuve. Đây không phải lỗi cú pháp mà là lỗi logic boolean so với yêu cầu.

## Lỗi thường gặp

- Dùng `OR` khi mọi điều kiện đều phải khớp.
- Quên dấu nháy đơn quanh giá trị text như `'Nolan'`.
- Trộn `AND` và `OR` mà không dùng ngoặc khi cách nhóm điều kiện không rõ ràng.

## Thử ngay

Trả về các tiêu đề phát hành sau 2000 **và** do Nolan đạo diễn, sắp theo title. Hãy đánh giá cả hai điều kiện trên Dune trước khi bấm Chạy.

## Tự kiểm tra

Toán tử nào thường làm bộ lọc chặt hơn khi bạn thêm một điều kiện bắt buộc?

**Đáp án:** `AND`, vì mọi điều kiện nối với nó đều phải đúng.
