---
id: sql-01-syntax
track: sql-fundamentals
locale: vi
slug: sql-syntax
title: Cú pháp SQL cơ bản
order: 1
published: true
can_do: "Nhận ra cấu trúc cơ bản của SELECT và xác định cột đầu ra cùng bảng nguồn"
objectives:
  - Đọc câu SELECT cơ bản theo đúng thứ tự các thành phần
  - Phân biệt từ khóa SQL với tên bảng và tên cột
  - Trả về một cột từ bảng
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Truy vấn cơ bản ghi cột đầu ra sau SELECT và nguồn dữ liệu sau FROM."
    - "Đầu ra chỉ cần title; movies vẫn là bảng nguồn."
    - "Dùng: SELECT title FROM movies ORDER BY title;"
  solution: "SELECT title FROM movies ORDER BY title;"
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
      - ["Dune"]
      - ["Inception"]
      - ["Interstellar"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Cú pháp SQL dễ nhớ hơn khi biết từng phần chịu trách nhiệm việc gì. Chưa cần học cả một bộ grammar dài; trước tiên chỉ cần nắm hình dạng của một yêu cầu nhỏ.

## Mô hình tư duy

Một truy vấn bảng cơ bản có hai quyết định chính:

| Câu hỏi | Phần SQL | Ví dụ |
| --- | --- | --- |
| Kết quả cần hiện gì? | `SELECT ...` | `SELECT title` |
| Dữ liệu lấy từ đâu? | `FROM ...` | `FROM movies` |

Các từ như `SELECT`, `FROM` là từ khóa mô tả thao tác. Các tên như `title`, `movies` trỏ tới đối tượng trong dữ liệu.

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

## Dự đoán trước khi chạy

Xét truy vấn:

```sql
SELECT title
FROM movies;
```

Trước khi chạy, hãy dự đoán **hình dạng** kết quả chứ chưa cần quan tâm thứ tự hiển thị chính xác.

- Kết quả có **1 cột** vì chỉ chọn `title`.
- Kết quả có **4 hàng** vì chưa có điều kiện lọc hàng.

Tách “cột đầu ra” và “các hàng nguồn” như vậy sẽ rất hữu ích ở các bài SQL sau.

## Ví dụ mẫu

Bài tập dùng phiên bản dưới đây để grader nhận thứ tự hàng ổn định:

```sql
SELECT title
FROM movies
ORDER BY title;
```

| title |
| --- |
| Dune |
| Inception |
| Interstellar |
| The Matrix |

Hiện tại hãy tập trung vào `SELECT title FROM movies`. `ORDER BY title` chỉ làm thứ tự hiển thị rõ ràng; bài sau sẽ học riêng về sắp xếp.

Từ khóa SQL thường được viết hoa để dễ đọc, nhưng viết hoa là quy ước chứ không phải lý do câu lệnh chạy được. Dấu chấm phẩy đánh dấu kết thúc một statement và là thói quen tốt, nhất là khi gửi nhiều statement.

## Tìm lỗi

Câu này sai ở đâu?

```sql
FROM movies
SELECT title;
```

Grammar của SQL yêu cầu danh sách `SELECT` đứng trước nguồn `FROM`. Database không tự đổi thứ tự clause theo cách diễn đạt tự nhiên của người đọc.

## Lỗi thường gặp

- Đảo thứ tự clause vì nghĩ theo câu “từ movies, lấy title”. SQL vẫn bắt đầu bằng `SELECT`.
- Nhầm `title` là bảng hoặc `movies` là cột.
- Nghĩ từ khóa phải viết hoa mới chạy. Cách viết nhất quán giúp dễ đọc; cấu trúc câu lệnh mới là phần bắt buộc.

## Thử ngay

Trả về duy nhất cột `title` từ `movies`, sắp theo `title`. Trước khi chạy, dự đoán số cột và số hàng.

## Tự kiểm tra

Trong `SELECT title FROM movies`, token nào là cột và token nào là bảng?

**Đáp án:** `title` là cột đầu ra; `movies` là bảng nguồn.
