---
id: pg-23-explain
track: postgresql
locale: vi
slug: explain-basics
title: Đọc query plan PostgreSQL với EXPLAIN
order: 23
published: true
can_do: "Đọc concept EXPLAIN PostgreSQL cơ bản và phân biệt planner estimate với measurement từ EXPLAIN ANALYZE"
objectives:
  - Đọc plan như cây execution node
  - Phân biệt estimated cost/rows với actual execution metric
  - Dùng EXPLAIN ANALYZE cẩn thận vì nó thực sự execute statement
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Sandbox grade query result ổn định thay vì plan text phụ thuộc môi trường."
    - "Trả title theo alphabet xác định sau khi học plan example."
    - "Dùng: SELECT title FROM movies ORDER BY title;"
  solution: "SELECT title FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999);"
---

Planner PostgreSQL biến SQL statement thành cây execution node. `EXPLAIN` cho xem proposed plan; `EXPLAIN ANALYZE` chạy statement rồi bổ sung measurement thực tế.

## Mô hình tư duy

Một plan line đơn giản:

```text
Seq Scan on movies  (cost=0.00..12.00 rows=2 width=32)
```

Đọc concept, không học thuộc con số:

| field | nghĩa |
| --- | --- |
| node type | operation như Seq Scan, Index Scan, Sort, Hash Join |
| `cost` | planner estimate theo cost unit nội bộ, không phải millisecond |
| `rows` | số hàng node ước lượng emit |
| `width` | độ rộng output row trung bình ước lượng theo byte |

Plan thay đổi theo statistics, data volume, configuration và version PostgreSQL. Plan của toy table không phải bằng chứng cho production scale.

## Dự đoán trước khi chạy

Với bảng rất nhỏ và query cần mọi row, sequential scan là plan hợp lý. Nhưng không biến điều đó thành guarantee: bài học là đọc reasoning của planner chứ không học thuộc một node.

## Ví dụ mẫu

```sql
EXPLAIN SELECT title
FROM movies
ORDER BY title;
```

Plan có thể gồm scan + sort. Với `EXPLAIN ANALYZE`, PostgreSQL thực sự execute statement và có thể báo actual time/rows cùng buffers khi được yêu cầu.

Sandbox grade SELECT deterministic bình thường vì exact plan text cố ý phụ thuộc môi trường:

```sql
SELECT title FROM movies ORDER BY title;
```

## Tìm lỗi

“Cost 100 nghĩa là query mất 100 ms” là sai. Planner cost dùng abstract unit có thể cấu hình. Muốn so estimate với thực tế, dùng `EXPLAIN ANALYZE` trên môi trường/data đại diện—và nhớ mutation sẽ thật sự được execute.

## Lỗi thường gặp

- So cost trực tiếp với elapsed milliseconds.
- Lấy một local plan trên data nhỏ làm bằng chứng cho production.
- Chạy `EXPLAIN ANALYZE` trên mutation mà không nhận ra mutation thực sự xảy ra.

## Thử ngay

Sau khi hiểu plan model, chạy SELECT deterministic mà sandbox yêu cầu. Trong thực tế, so estimate với data đại diện trước khi optimize.

## Tự kiểm tra

Khác biệt an toàn quan trọng nhất giữa `EXPLAIN` và `EXPLAIN ANALYZE` là gì?

**Đáp án:** `EXPLAIN ANALYZE` thực sự execute statement; EXPLAIN thường chỉ lập plan.
