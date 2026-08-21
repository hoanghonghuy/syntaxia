---
id: sql-01-select
track: sql-fundamentals
locale: vi
slug: select-queries
title: Viết truy vấn SELECT
order: 2
published: true
can_do: "Chọn chính xác các cột mà truy vấn trả về mà không thay đổi tập hàng nguồn"
objectives:
  - Chọn nhiều hơn một cột cụ thể
  - Dự đoán hình dạng cột của kết quả từ danh sách SELECT
  - Phân biệt chọn cột rõ ràng với SELECT *
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "Đề yêu cầu hai cột đầu ra cụ thể, không phải mọi cột."
    - "Thay * bằng title, year sau SELECT."
    - "Dùng: SELECT title, year FROM movies ORDER BY title;"
  solution: "SELECT title, year FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Inception", 2010]
      - ["Interstellar", 2014]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Ứng dụng thực tế hiếm khi cần mọi cột. Chỉ trả những gì màn hình, báo cáo hoặc API cần giúp kết quả dễ hiểu hơn và làm hợp đồng của truy vấn rõ ràng hơn.

## Mô hình tư duy

Hãy coi danh sách `SELECT` là **hình dạng đầu ra**.

**Bảng nguồn: movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

So sánh các yêu cầu:

| Danh sách SELECT | Các cột kết quả |
| --- | --- |
| `*` | `id`, `title`, `year`, `director` |
| `title` | `title` |
| `title, year` | `title`, `year` |

Ở giai đoạn này, thay danh sách SELECT làm thay đổi **cột**, không làm thay đổi những hàng nguồn nào tồn tại trong kết quả.

## Dự đoán trước khi chạy

```sql
SELECT title, year
FROM movies;
```

Hãy dự đoán kích thước kết quả:

- **2 cột**: `title`, `year`
- **4 hàng**: mỗi phim một hàng vì chưa có `WHERE`

`id` và `director` không bị xóa khỏi dữ liệu lưu trữ; chúng chỉ không nằm trong kết quả này.

## Ví dụ mẫu

```sql
SELECT title, year
FROM movies
ORDER BY title;
```

Kết quả:

| title | year |
| --- | --- |
| Dune | 2021 |
| Inception | 2010 |
| Interstellar | 2014 |
| The Matrix | 1999 |

Dấu phẩy tách các biểu thức trong danh sách SELECT. Thứ tự từ trái sang phải của chúng cũng là thứ tự cột trong kết quả.

`ORDER BY title` chỉ được thêm để kết quả bài tập có thứ tự xác định; phần sắp xếp sẽ có bài riêng.

## Tìm lỗi

Câu này trông gần đúng nhưng không thật sự yêu cầu hai cột đầu ra:

```sql
SELECT title year
FROM movies;
```

Thiếu dấu phẩy, SQL có thể hiểu `year` là alias của `title` thay vì cột thứ hai. Muốn hai cột, hãy tách rõ `title, year`.

## Lỗi thường gặp

- Giữ `*` khi đề yêu cầu các cột cụ thể.
- Quên dấu phẩy giữa các cột được chọn.
- Nghĩ `SELECT title, year` tự động lọc bớt hàng. Lọc hàng là trách nhiệm riêng của `WHERE`.

## Thử ngay

Sửa truy vấn khởi đầu để kết quả có đúng hai cột `title`, `year` cho mọi phim, sắp theo `title`.

## Tự kiểm tra

Nếu bảng có mười cột nhưng danh sách SELECT chỉ ghi ba tên cột, kết quả có bao nhiêu cột?

**Đáp án:** ba. Danh sách SELECT quyết định hình dạng cột đầu ra.
