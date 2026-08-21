---
id: sql-28-case
track: sql-fundamentals
locale: vi
slug: case-expression
title: Gắn nhãn hàng với CASE
order: 28
published: true
can_do: "Chuyển các điều kiện có thứ tự thành CASE để tạo giá trị cho từng hàng kết quả"
objectives:
  - Đánh giá điều kiện CASE cho từng hàng
  - Hiểu nhánh khớp đầu tiên và vai trò của ELSE
  - Tạo cột kết quả suy ra mà không thay đổi dữ liệu lưu trữ
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Giá trị era được suy ra từ year của từng hàng."
    - "Dùng WHEN year < 2000 THEN 'classic' và ELSE 'modern'."
    - "Dùng: SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
  solution: "SELECT title, CASE WHEN year < 2000 THEN 'classic' ELSE 'modern' END AS era FROM movies ORDER BY title;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Interstellar", 2014]
      - [4, "Dune", 2021]
  expected:
    columns: ["title", "era"]
    rows:
      - ["Dune", "modern"]
      - ["Inception", "modern"]
      - ["Interstellar", "modern"]
      - ["The Matrix", "classic"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Interstellar', 2014), (4, 'Dune', 2021);"
---

`CASE` tạo một giá trị từ điều kiện ngay khi query chạy. Nó giống cột `IF` trong spreadsheet hơn là `UPDATE`: dữ liệu movie được lưu không hề thay đổi.

## Mô hình tư duy

Với mỗi hàng đầu vào, đi qua các nhánh `WHEN` từ trên xuống. **Nhánh true đầu tiên thắng**; nếu không nhánh nào khớp, `ELSE` là giá trị dự phòng.

| title | year | `year < 2000` | `era` suy ra |
| --- | ---: | --- | --- |
| The Matrix | 1999 | true | classic |
| Inception | 2010 | false | modern |
| Interstellar | 2014 | false | modern |
| Dune | 2021 | false | modern |

Cột `era` chỉ tồn tại trong kết quả. Nó không được thêm vào bảng `movies`.

## Dự đoán trước khi chạy

```sql
SELECT title,
       CASE WHEN year < 2000 THEN 'classic'
            ELSE 'modern'
       END AS era
FROM movies;
```

Dự đoán bốn hàng và hai cột đầu ra. Chỉ The Matrix phải nhận `classic`.

## Ví dụ mẫu

```sql
SELECT
  title,
  CASE
    WHEN year < 2000 THEN 'classic'
    ELSE 'modern'
  END AS era
FROM movies
ORDER BY title;
```

| title | era |
| --- | --- |
| Dune | modern |
| Inception | modern |
| Interstellar | modern |
| The Matrix | classic |

`END` đóng biểu thức; `AS era` đặt tên cột kết quả được suy ra.

## Tìm lỗi

Một truy vấn viết:

```sql
CASE
  WHEN year >= 2000 THEN 'classic'
  ELSE 'modern'
END
```

Cú pháp hợp lệ nhưng logic nhãn bị đảo. Khi debug `CASE`, hãy thử các hàng đại diện ở hai phía ranh giới thay vì chỉ kiểm tra query có chạy hay không.

## Lỗi thường gặp

- Quên `END` hoặc alias mà kết quả cần.
- Đảo chiều phép so sánh khiến câu SQL chạy được nhưng gắn nhãn sai.
- Nghĩ `CASE` sửa dữ liệu lưu; thông thường nó chỉ tạo giá trị cho kết quả query hiện tại.

## Thử ngay

Trả về title của từng phim cùng `era`: `classic` khi `year < 2000`, còn lại là `modern`. Sắp theo title và tự kiểm tra ranh giới năm 2000 trước khi chạy.

## Tự kiểm tra

Nếu nhiều điều kiện `WHEN` cùng true, kết quả nào được dùng?

**Đáp án:** kết quả của nhánh `WHEN` true đầu tiên.
