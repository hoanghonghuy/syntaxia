---
id: sql-16-in
track: sql-fundamentals
locale: vi
slug: in-list
title: Khớp danh sách với IN
order: 16
published: true
can_do: "Dùng IN để kiểm tra một giá trị có thuộc tập hữu hạn các giá trị chính xác và phân biệt với khoảng liên tục"
objectives:
  - Đánh giá membership của từng hàng trong một danh sách
  - Viết gọn nhiều phép OR bằng IN
  - Phân biệt IN với BETWEEN
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Yêu cầu nêu hai year chính xác, nên dùng danh sách membership thay vì khoảng."
    - "Lọc year bằng IN (1999, 2010)."
    - "Dùng: SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year IN (1999, 2010) ORDER BY title;"
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
      - ["Inception"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Một yêu cầu có thể nêu nhiều **lựa chọn chính xác**: “1999 hoặc 2010”. `IN` diễn đạt membership trong tập hữu hạn đó mà không cần lặp đi lặp lại cùng một cột.

## Mô hình tư duy

Với year không NULL, câu này:

```sql
year IN (1999, 2010)
```

diễn đạt cùng phép membership với:

```sql
year = 1999 OR year = 2010
```

Trace các hàng:

| title | year | thuộc `{1999, 2010}`? |
| --- | ---: | --- |
| Inception | 2010 | có |
| The Matrix | 1999 | có |
| Dune | 2021 | không |
| Interstellar | 2014 | không |

## Dự đoán trước khi chạy

Hãy dự đoán hai title qua `year IN (1999, 2010)`. Chú ý rằng 2005 **không** khớp chỉ vì nằm giữa hai số đó; IN kiểm tra membership chính xác.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE year IN (1999, 2010)
ORDER BY title;
```

| title |
| --- |
| Inception |
| The Matrix |

Dùng IN khi yêu cầu cho một tập rời rạc. Dùng predicate dạng range khi mọi giá trị nằm giữa hai biên đều được phép.

## Tìm lỗi

Vì sao câu này không diễn đạt membership của hai giá trị?

```sql
WHERE year = (1999, 2010)
```

`=` so sánh với một giá trị/biểu thức. Kiểm tra membership của danh sách phải dùng `IN (...)`.

## Lỗi thường gặp

- Dùng `=` với danh sách trong ngoặc.
- Dùng IN khi yêu cầu thật sự là một khoảng liên tục.
- Quên rằng các phần tử text trong IN cần dấu nháy chuỗi.

## Thử ngay

Trả về title có year chính xác là 1999 hoặc 2010, sắp theo title. Đánh giá cả bốn hàng trước khi chạy.

## Tự kiểm tra

`year IN (1999, 2010)` có khớp year 2000 không?

**Đáp án:** không. Chỉ các giá trị được liệt kê rõ trong danh sách mới khớp.
