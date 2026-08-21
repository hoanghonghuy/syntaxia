---
id: pg-21-cte
track: postgresql
locale: vi
slug: common-table-expressions
title: Cấu trúc query với WITH (CTE)
order: 21
published: true
can_do: "Dùng CTE như named query step đồng thời tách readability/scope khỏi giả định về execution performance"
objectives:
  - Đặt tên intermediate query result bằng WITH
  - Trace data flow từ CTE sang query sử dụng nó
  - Không coi mọi CTE là optimization boundary tự động
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Tạo named result recent chứa movie từ 2010 trở đi."
    - "Outer SELECT phải đọc từ recent, không dựng lại filter."
    - "Dùng: WITH recent AS (SELECT title, year FROM movies WHERE year >= 2010) SELECT title FROM recent ORDER BY title;"
  solution: "WITH recent AS (SELECT title, year FROM movies WHERE year >= 2010) SELECT title FROM recent ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
      - [4, "Dune", 2021]
  expected:
    columns: ["title"]
    rows:
      - ["Arrival"]
      - ["Dune"]
      - ["Inception"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016), (4, 'Dune', 2021);"
---

Common table expression gắn tên cho một query step trong phạm vi một statement. Dùng nó để lộ intent và chia logic phức tạp thành các stage dễ hiểu.

## Mô hình tư duy

```text
base table movies
      |
      v
CTE recent: filter year >= 2010
      |
      v
outer query: project title + order
```

Tên CTE là relation trong scope query, không phải table vĩnh viễn và cũng không tự động là performance optimization.

PostgreSQL hiện đại đôi khi có thể fold CTE non-recursive, side-effect-free vào parent query; trong trường hợp khác materialization có thể có ý nghĩa. Hãy dùng CTE trước hết cho cấu trúc rõ, rồi đọc plan khi performance quan trọng.

## Dự đoán trước khi chạy

The Matrix không vào `recent`. Outer query thấy Arrival, Dune, Inception rồi sắp alphabet.

## Ví dụ mẫu

```sql
WITH recent AS (
  SELECT title, year
  FROM movies
  WHERE year >= 2010
)
SELECT title
FROM recent
ORDER BY title;
```

| title |
| --- |
| Arrival |
| Dune |
| Inception |

## Tìm lỗi

Một query bị chia thành năm CTE chỉ vì “CTE nhanh hơn”. Tiền đề đó không an toàn. Readability và execution planning là hai concern khác nhau; hãy dùng `EXPLAIN` để verify performance claim thay vì suy ra từ hình dạng syntax.

```text
WITH step1 AS (...), step2 AS (...), step3 AS (...) ...
```

## Lỗi thường gặp

- Định nghĩa CTE rồi lại vô tình query base table.
- Nghĩ CTE tồn tại sau khi statement kết thúc.
- Coi CTE syntax là cam kết optimization/materialization.

## Thử ngay

Tạo CTE `recent` cho movie từ 2010, sau đó select title theo alphabet.

## Tự kiểm tra

Lý do an toàn nhất để đưa CTE vào application SQL là gì?

**Đáp án:** để đặt tên và cấu trúc query step rõ ràng; ảnh hưởng performance phải kiểm tra bằng planner chứ không nên giả định.
