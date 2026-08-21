---
id: sql-35-view
track: sql-fundamentals
locale: vi
slug: create-view
title: Query tái sử dụng với view
order: 35
published: true
can_do: "Đưa một query tái sử dụng thành view và xem view như interface suy ra từ dữ liệu gốc"
objectives:
  - Phân biệt định nghĩa view với một bảng được sao chép
  - Tạo view từ SELECT
  - Query interface suy ra và dự đoán các hàng của nó
exercise:
  starter: "CREATE TEMP VIEW modern_movies AS "
  hints:
    - "Định nghĩa một SELECT có tên; đừng copy hàng sang bảng khác."
    - "Base table tạm nên sandbox này cần temporary view."
    - "Dùng: CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
  solution: "CREATE TEMP VIEW modern_movies AS SELECT title FROM movies WHERE year >= 2000;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "Inception", 2010]
      - [2, "The Matrix", 1999]
      - [3, "Interstellar", 2014]
      - [4, "Dune", 2021]
  expected:
    columns: ["title"]
    rows:
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  allow_mutations: true
  verify_sql: "SELECT title FROM modern_movies ORDER BY title;"
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010), (2, 'The Matrix', 1999), (3, 'Interstellar', 2014), (4, 'Dune', 2021);"
---

View gắn một tên tái sử dụng cho một query. Hãy xem nó như **interface suy ra** từ dữ liệu gốc thay vì một bản copy phải tự đồng bộ bằng tay.

## Mô hình tư duy

Bảng gốc:

| title | year |
| --- | ---: |
| Inception | 2010 |
| The Matrix | 1999 |
| Interstellar | 2014 |
| Dune | 2021 |

Định nghĩa view:

```text
movies -> lọc year >= 2000 -> lấy title -> modern_movies
```

Các hàng dự kiến: Dune, Inception, Interstellar. The Matrix bị loại bởi định nghĩa view.

## Dự đoán trước khi chạy

Sau khi tạo view, `SELECT title FROM modern_movies ORDER BY title` phải trả ba hàng. Không cần INSERT riêng vào `modern_movies`.

## Ví dụ mẫu

```sql
CREATE TEMP VIEW modern_movies AS
SELECT title
FROM movies
WHERE year >= 2000;
```

Sandbox dùng temporary view vì base table là temporary. Concept cốt lõi giống `CREATE VIEW` thông thường.

## Tìm lỗi

```sql
CREATE TEMP TABLE modern_movies AS
SELECT title FROM movies WHERE year >= 2000;
```

Câu này tạo một table snapshot, không phải view được yêu cầu. Ban đầu chúng có thể trông giống nhau nhưng semantics dữ liệu khác nhau.

## Lỗi thường gặp

- Nhầm view với bảng sao chép dữ liệu.
- Quên `AS` trước SELECT định nghĩa.
- Viết sai ranh giới filter (`>` thay vì `>=`).

## Thử ngay

Tạo temporary view `modern_movies` chứa title có `year >= 2000`. Dự đoán ba hàng trước khi chạy.

## Tự kiểm tra

Thứ gì quyết định các hàng nhìn thấy qua view?

**Đáp án:** câu SELECT được lưu làm định nghĩa view.
