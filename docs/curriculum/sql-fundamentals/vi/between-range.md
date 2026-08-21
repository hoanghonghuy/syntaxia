---
id: sql-17-between
track: sql-fundamentals
locale: vi
slug: between-range
title: Lọc khoảng với BETWEEN
order: 17
published: true
can_do: "Dùng BETWEEN cho khoảng bao gồm cả hai đầu và chuyển nó thành các phép so sánh biên tương đương"
objectives:
  - Đánh giá giá trị có nằm trong khoảng bao gồm hai biên hay không
  - Nhớ rằng cả hai endpoint của BETWEEN đều được tính
  - Phân biệt range với danh sách giá trị chính xác
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Yêu cầu gồm mọi year từ 2000 đến 2020, không phải chỉ hai giá trị chính xác."
    - "BETWEEN gồm cả hai biên: year BETWEEN 2000 AND 2020."
    - "Dùng: SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
  solution: "SELECT title FROM movies WHERE year BETWEEN 2000 AND 2020 ORDER BY title;"
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
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Yêu cầu dạng range nói rằng mọi giá trị nằm trong một khoảng đều có thể khớp. `BETWEEN` gói kiểm tra biên dưới và biên trên thành một predicate dễ đọc.

## Mô hình tư duy

Với các giá trị so sánh thông thường:

```sql
year BETWEEN 2000 AND 2020
```

là khoảng **bao gồm hai đầu**, tương đương:

```sql
year >= 2000 AND year <= 2020
```

Trace dữ liệu:

| title | year | nằm trong 2000–2020? |
| --- | ---: | --- |
| Inception | 2010 | có |
| The Matrix | 1999 | không — dưới biên dưới |
| Dune | 2021 | không — trên biên trên |
| Interstellar | 2014 | có |

## Dự đoán trước khi chạy

Nếu một hàng có `year = 2000` hoặc `year = 2020`, nó có khớp không? **Có**: BETWEEN gồm cả hai endpoint.

Dự đoán các hàng hiện tại được giữ: Inception và Interstellar.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE year BETWEEN 2000 AND 2020
ORDER BY title;
```

| title |
| --- |
| Inception |
| Interstellar |

Trong dạng tăng dần thông thường dùng ở đây, biên dưới đứng trước và biên trên đứng sau.

## Tìm lỗi

Muốn mọi year từ 2000 đến 2020 nhưng lại viết:

```sql
WHERE year IN (2000, 2020)
```

Câu đó chỉ khớp hai endpoint, không khớp các giá trị như 2010 hay 2014. IN mô tả danh sách hữu hạn; BETWEEN mô tả khoảng.

## Lỗi thường gặp

- Nghĩ hai đầu của BETWEEN bị loại trừ.
- Đảo biên dưới và biên trên.
- Nhầm một khoảng với danh sách các giá trị chính xác.

## Thử ngay

Trả về title có year từ 2000 đến 2020, bao gồm cả hai đầu, sắp theo title. Hãy trace từng year qua hai biên trước.

## Tự kiểm tra

Hai phép so sánh nào tương đương `x BETWEEN 10 AND 20` với số không NULL thông thường?

**Đáp án:** `x >= 10 AND x <= 20`.
