---
id: pg-01-limit
track: postgresql
locale: vi
slug: limiting-rows
title: Top-N xác định với LIMIT
order: 1
published: true
can_do: "Xây top-N query PostgreSQL có kết quả xác định bằng cách định nghĩa thứ tự đầy đủ trước LIMIT"
objectives:
  - Giải thích vì sao LIMIT một mình không định nghĩa hàng nào đứng đầu
  - Định nghĩa ORDER BY xác định cho yêu cầu top-N
  - Áp dụng LIMIT sau khi sắp xếp
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Top-N chỉ có nghĩa sau khi thứ tự kết quả đã được định nghĩa."
    - "Sắp mới nhất trước; title có thể phá tie một cách xác định."
    - "Dùng: SELECT title, year FROM movies ORDER BY year DESC, title ASC LIMIT 2;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC, title ASC LIMIT 2;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Dune", 2021]
      - [4, "Arrival", 2016]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Arrival", 2016]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021), (4, 'Arrival', 2016);"
---

`LIMIT` kiểm soát **bao nhiêu** hàng PostgreSQL trả về. Một mình nó không định nghĩa **hàng nào** được xem là đứng trước.

## Mô hình tư duy

Top-N là hai bước:

```text
các hàng khớp -> ORDER BY xác định -> lấy N hàng đầu bằng LIMIT
```

Với “hai phim mới nhất”:

| title | year | hạng sau `year DESC` |
| --- | ---: | ---: |
| Dune | 2021 | 1 |
| Arrival | 2016 | 2 |
| Inception | 2010 | 3 |
| The Matrix | 1999 | 4 |

Sort key phụ như `title ASC` giúp xử lý tie ổn định nếu hai phim cùng năm.

## Dự đoán trước khi chạy

Sau khi sắp mới nhất trước, hai hàng đầu phải là Dune và Arrival. `LIMIT 2` giữ đúng hai hàng đó.

## Ví dụ mẫu

```sql
SELECT title, year
FROM movies
ORDER BY year DESC, title ASC
LIMIT 2;
```

| title | year |
| --- | ---: |
| Dune | 2021 |
| Arrival | 2016 |

PostgreSQL có thể chọn execution plan khác nhau theo LIMIT/OFFSET, nên không được biến thứ tự không khai báo thành contract ngầm.

## Tìm lỗi

```sql
SELECT title, year
FROM movies
LIMIT 2;
```

Query chỉ yêu cầu tối đa hai hàng, chưa hề định nghĩa “mới nhất”. Nếu một lần chạy tình cờ ra đúng hai phim mong muốn thì đó không phải đảm bảo.

## Lỗi thường gặp

- Xem thứ tự insert như sort order ngầm.
- Dùng LIMIT cho ranking nghiệp vụ mà không ORDER BY.
- Chỉ dùng sort key không unique khi tie phải được giải quyết nhất quán.

## Thử ngay

Trả hai phim mới nhất bằng thứ tự xác định và `LIMIT 2`.

## Tự kiểm tra

Thứ gì làm “hai hàng đầu” có ý nghĩa nghiệp vụ: `LIMIT 2` hay `ORDER BY ... LIMIT 2`?

**Đáp án:** `ORDER BY ... LIMIT 2`, vì ORDER BY định nghĩa hàng nào đứng đầu.
