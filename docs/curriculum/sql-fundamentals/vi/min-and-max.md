---
id: sql-12-minmax
track: sql-fundamentals
locale: vi
slug: min-and-max
title: Tìm cực trị với MIN và MAX
order: 12
published: true
can_do: "Rút gọn một cột số thành giá trị nhỏ nhất hoặc lớn nhất bằng MIN hay MAX"
objectives:
  - Nhận ra MIN và MAX là các hàm tổng hợp
  - Dự đoán số hàng mà aggregate không GROUP BY trả về
  - Chọn đúng cực trị theo yêu cầu
exercise:
  starter: "SELECT year FROM movies;"
  hints:
    - "Đề cần một giá trị tóm tắt, không phải danh sách mọi year."
    - "Dùng MAX(year) vì mới nhất nghĩa là year lớn nhất, rồi đặt tên newest_year."
    - "Dùng: SELECT MAX(year) AS newest_year FROM movies;"
  solution: "SELECT MAX(year) AS newest_year FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["newest_year"]
    rows:
      - [2021]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Có những câu hỏi không cần trả từng hàng mà cần một tóm tắt của nhiều hàng: “năm mới nhất là bao nhiêu?” hoặc “giá nhỏ nhất là bao nhiêu?”. `MIN` và `MAX` là aggregate, gom nhiều giá trị đầu vào thành một câu trả lời.

## Mô hình tư duy

Hãy nghĩ **nhiều giá trị -> một giá trị tóm tắt**.

| year |
| ---: |
| 2010 |
| 1999 |
| 2021 |
| 2014 |

Với tập này:

- `MIN(year)` -> `1999`
- `MAX(year)` -> `2021`

Không có `GROUP BY`, aggregate trên cả bảng tạo một hàng tóm tắt.

## Dự đoán trước khi chạy

```sql
SELECT MAX(year) AS newest_year
FROM movies;
```

Hãy dự đoán cả kích thước lẫn giá trị: **1 cột, 1 hàng, giá trị 2021**. Bốn hàng nguồn là đầu vào của phép tính, không phải mỗi hàng sẽ biến thành một hàng đầu ra.

## Ví dụ mẫu

```sql
SELECT MIN(year) AS oldest_year
FROM movies;
```

| oldest_year |
| ---: |
| 1999 |

`MIN` và `MAX` trả lời câu hỏi về một **giá trị cực trị**. Chúng không tự động kéo theo các cột khác của hàng chứa giá trị đó.

## Tìm lỗi

Vì sao câu này không trả lời “năm mới nhất” dưới dạng một giá trị duy nhất?

```sql
SELECT year
FROM movies
ORDER BY year DESC;
```

Nó chỉ sắp bốn year và vẫn trả bốn hàng. Sắp xếp và tổng hợp giải quyết hai bài toán khác nhau. Nếu câu trả lời cần là một year lớn nhất, dùng `MAX(year)`.

## Lỗi thường gặp

- Mong `MAX(year)` tự trả luôn title của phim có year đó.
- Quên ngoặc khi gọi hàm: phải là `MAX(year)`.
- Dùng `MIN` khi yêu cầu là lớn nhất/muộn nhất/mới nhất.

## Thử ngay

Trả về năm phát hành mới nhất dưới một cột tên `newest_year`. Trước khi chạy, hãy giải thích vì sao kết quả chỉ có một hàng.

## Tự kiểm tra

Khác biệt cốt lõi giữa `ORDER BY year DESC` và `MAX(year)` là gì?

**Đáp án:** `ORDER BY` giữ và sắp lại các hàng; `MAX` rút gọn các giá trị đầu vào thành một giá trị tóm tắt.
