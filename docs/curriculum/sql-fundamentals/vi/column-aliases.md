---
id: sql-18-aliases
track: sql-fundamentals
locale: vi
slug: column-aliases
title: Đổi tên cột kết quả với AS
order: 18
published: true
can_do: "Đặt tên tạm rõ ràng cho biểu thức kết quả bằng AS mà không thay đổi schema lưu trữ"
objectives:
  - Tách tên cột lưu trữ khỏi nhãn kết quả
  - Đặt alias cho nhiều cột SELECT
  - Nhận ra alias là tên đầu ra của truy vấn chứ không phải schema change
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Đề thay đổi nhãn kết quả, không đổi tên cột lưu trữ."
    - "Viết title AS film_name và year AS release_year."
    - "Dùng: SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  solution: "SELECT title AS film_name, year AS release_year FROM movies ORDER BY release_year;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["film_name", "release_year"]
    rows:
      - ["The Matrix", 1999]
      - ["Inception", 2010]
      - ["Interstellar", 2014]
      - ["Dune", 2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Schema database thường dùng tên ngắn hoặc kỹ thuật, trong khi báo cáo hay API có thể cần nhãn đầu ra dễ hiểu hơn. Alias thay đổi **tên được expose bởi kết quả truy vấn này**, không sửa định nghĩa bảng lưu trữ.

## Mô hình tư duy

Tách identity của nguồn khỏi nhãn đầu ra:

| Biểu thức nguồn | Alias | Tiêu đề kết quả |
| --- | --- | --- |
| `title` | `film_name` | `film_name` |
| `year` | `release_year` | `release_year` |

Sau khi query xong, bảng nguồn vẫn có các cột tên `title` và `year`.

## Dự đoán trước khi chạy

```sql
SELECT title AS film_name,
       year AS release_year
FROM movies;
```

Dự đoán phần nào thay đổi và phần nào không:

- tiêu đề kết quả: đổi thành `film_name`, `release_year`
- giá trị kết quả: không đổi
- schema lưu trữ: không đổi

## Ví dụ mẫu

```sql
SELECT title AS film_name,
       year AS release_year
FROM movies
ORDER BY release_year;
```

| film_name | release_year |
| --- | ---: |
| The Matrix | 1999 |
| Inception | 2010 |
| Interstellar | 2014 |
| Dune | 2021 |

PostgreSQL cho phép dùng alias kết quả này trong `ORDER BY`, giúp tên đầu ra cần dùng dễ đọc hơn ở đây.

## Tìm lỗi

Sau khi chạy SELECT có `title AS film_name`, người học nghĩ alias đã trở thành tên cột lưu trữ và viết query mới:

```sql
SELECT film_name
FROM movies;
```

Không đúng: bảng gốc vẫn có `title`, không có `film_name`. Alias thường chỉ sống trong context query/kết quả nơi nó được định nghĩa.

## Lỗi thường gặp

- Coi AS như thao tác đổi tên schema vĩnh viễn.
- Quên alias chính xác mà hợp đồng kết quả hoặc grader yêu cầu.
- Giả định alias dùng được ở mọi clause hoặc trong các query độc lập sau đó.

## Thử ngay

Trả `title` dưới tên `film_name` và `year` dưới tên `release_year`, sắp theo `release_year`. Hãy dự đoán hai tiêu đề cột đầu ra trước khi chạy.

## Tự kiểm tra

`SELECT title AS film_name FROM movies` có đổi tên cột được lưu trong `movies` không?

**Đáp án:** không. Nó chỉ đổi nhãn kết quả của query đó.
