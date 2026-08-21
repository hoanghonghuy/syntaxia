---
id: pg-22-filter
track: postgresql
locale: vi
slug: filter-clause
title: Aggregate có điều kiện với FILTER
order: 22
published: true
can_do: "Tính nhiều aggregate trên các subset hàng khác nhau bằng FILTER condition gắn vào từng aggregate call"
objectives:
  - Giải thích hàng nào đi vào từng aggregate
  - Đối chiếu aggregate FILTER với top-level WHERE
  - Tính total và conditional count trong cùng một result row
exercise:
  starter: "SELECT COUNT(*) AS total FROM movies;"
  hints:
    - "Giữ total không filter rồi thêm COUNT thứ hai cho modern movie."
    - "Chỉ gắn FILTER (WHERE year >= 2000) vào aggregate modern."
    - "Dùng: SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;"
  solution: "SELECT COUNT(*) AS total, COUNT(*) FILTER (WHERE year >= 2000) AS modern FROM movies;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
      - [4, "Dune", 2021]
  expected:
    columns: ["total", "modern"]
    rows:
      - [4, 3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016), (4, 'Dune', 2021);"
---

`FILTER` gắn row condition vào một aggregate riêng thay vì lọc toàn bộ query input. Nó đặc biệt hữu ích khi một output row cần nhiều metric trên các subset khác nhau.

## Mô hình tư duy

Cả bốn hàng đi tới aggregate stage:

| aggregate | các hàng nhận được | result |
| --- | --- | ---: |
| `COUNT(*)` | cả bốn | 4 |
| `COUNT(*) FILTER (WHERE year >= 2000)` | Inception, Arrival, Dune | 3 |

Top-level `WHERE year >= 2000` sẽ loại The Matrix trước **cả hai** aggregate, khiến count đầu không thể còn 4.

## Dự đoán trước khi chạy

Một result row: `total = 4`, `modern = 3`.

## Ví dụ mẫu

```sql
SELECT
  COUNT(*) AS total,
  COUNT(*) FILTER (WHERE year >= 2000) AS modern
FROM movies;
```

| total | modern |
| ---: | ---: |
| 4 | 3 |

## Tìm lỗi

```sql
SELECT COUNT(*) AS total, COUNT(*) AS modern
FROM movies
WHERE year >= 2000;
```

Cả hai count thành 3 vì top-level WHERE đã thu nhỏ shared input trước. Lỗi nằm ở vị trí filter, không phải syntax COUNT.

## Lỗi thường gặp

- Chuyển per-metric filter lên WHERE ngoài và làm đổi mọi metric.
- Quên keyword `WHERE` bên trong `FILTER (...)`.
- Chạy nhiều query tách biệt khi các conditional aggregate có thể diễn đạt rõ trong một result.

## Thử ngay

Trả cả total movie count và count movie từ năm 2000 trong một hàng.

## Tự kiểm tra

Vì sao FILTER có thể tốt hơn top-level WHERE khi tính một dashboard row có nhiều metric?

**Đáp án:** mỗi aggregate có thể nhận subset riêng trong khi aggregate khác vẫn thấy full input hoặc subset khác.
