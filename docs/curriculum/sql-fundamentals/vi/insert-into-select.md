---
id: sql-38-insert-select
track: sql-fundamentals
locale: vi
slug: insert-into-select
title: Sao chép hàng với INSERT INTO SELECT
order: 38
published: true
can_do: "Đưa kết quả query vào bảng đích bằng cách ghép cột đích với output SELECT và kiểm tra trạng thái sau mutation"
objectives:
  - Xem output SELECT như nguồn hàng cho INSERT
  - Ghép cột đích với biểu thức nguồn
  - Dự đoán và verify bảng đích sau khi copy có lọc
exercise:
  starter: "SELECT title, year FROM archive;"
  hints:
    - "Đích cần title và year; SELECT nguồn phải trả hai giá trị đó theo cùng thứ tự."
    - "Lọc movies nguồn bằng year >= 2010 trước khi insert."
    - "Dùng: INSERT INTO archive (title, year) SELECT title, year FROM movies WHERE year >= 2010;"
  solution: "INSERT INTO archive (title, year) SELECT title, year FROM movies WHERE year >= 2010;"
  preview:
    columns: ["title", "year"]
    rows:
      - ["Inception", 2010]
      - ["Dune", 2021]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Inception", 2010]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title, year FROM archive ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "CREATE TEMP TABLE archive (title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Dune', 2021);"
---

`INSERT` không nhất thiết phải nhận dữ liệu từ `VALUES (...)`. Một `SELECT` có thể tạo cả tập hàng để insert, rất hữu ích khi copy, archive hoặc biến đổi dữ liệu theo tập hợp.

## Mô hình tư duy

Hãy nhìn như pipeline:

```text
movies -> WHERE year >= 2010 -> SELECT title, year -> INSERT vào archive(title, year)
```

Trace từng hàng:

| movie nguồn | qua filter? | được insert? |
| --- | --- | --- |
| The Matrix, 1999 | không | không |
| Inception, 2010 | có | có |
| Dune, 2021 | có | có |

Danh sách cột đích `(title, year)` phải khớp vị trí với hai biểu thức SELECT tạo ra.

## Dự đoán trước khi chạy

`archive` ban đầu rỗng. Dự đoán after-state đầy đủ: đúng hai hàng, Inception 2010 và Dune 2021.

## Ví dụ mẫu

```sql
INSERT INTO archive (title, year)
SELECT title, year
FROM movies
WHERE year >= 2010;
```

Sau đó verify:

```sql
SELECT title, year
FROM archive
ORDER BY title;
```

| title | year |
| --- | ---: |
| Dune | 2021 |
| Inception | 2010 |

## Tìm lỗi

```sql
INSERT INTO archive (title, year)
SELECT year, title FROM movies WHERE year >= 2010;
```

Các biểu thức nguồn bị đảo so với cột đích. Mutation theo tập hợp vẫn cần suy luận rõ giá trị nào đi vào cột nào.

## Lỗi thường gặp

- Ghép sai vị trí cột đích và biểu thức SELECT.
- Quên filter nguồn và copy quá nhiều hàng.
- Chỉ kiểm tra câu lệnh chạy được mà không verify after-state của bảng đích.

## Thử ngay

Copy title và year của các movie từ 2010 trở đi vào `archive`. Dự đoán toàn bộ trạng thái đích trước, rồi chạy và verify.

## Tự kiểm tra

Trong `INSERT INTO dest (a, b) SELECT x, y ...`, giá trị nguồn nào đi vào `b`?

**Đáp án:** `y`, vì biểu thức SELECT ánh xạ theo vị trí với danh sách cột đích.
