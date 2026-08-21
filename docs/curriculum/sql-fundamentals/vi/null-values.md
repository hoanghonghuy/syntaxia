---
id: sql-08-null
track: sql-fundamentals
locale: vi
slug: null-values
title: Dữ liệu thiếu với NULL
order: 8
published: true
can_do: "Tìm dữ liệu thiếu bằng IS NULL và giải thích vì sao phép bằng thông thường không khớp NULL"
objectives:
  - Phân biệt NULL với số 0, chuỗi rỗng và chuỗi 'NULL'
  - Suy luận NULL như một giá trị chưa biết hoặc bị thiếu trong điều kiện
  - Tìm dữ liệu thiếu bằng IS NULL
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Đề hỏi rating bị thiếu, không phải số 0 hay chữ 'NULL'."
    - "NULL được kiểm tra bằng IS NULL thay vì phép bằng thông thường."
    - "Dùng: SELECT title FROM movies WHERE rating IS NULL ORDER BY title;"
  solution: "SELECT title FROM movies WHERE rating IS NULL ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "rating"]
    rows:
      - [1, "Inception", 2010, 8.8]
      - [2, "The Matrix", 1999, null]
      - [3, "Dune", 2021, 8.0]
      - [4, "Old Cut", 1985, null]
  expected:
    columns: ["title"]
    rows:
      - ["Old Cut"]
      - ["The Matrix"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, rating DOUBLE PRECISION);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 8.8), (2, 'The Matrix', 1999, NULL), (3, 'Dune', 2021, 8.0), (4, 'Old Cut', 1985, NULL);"
---

Dữ liệu thực tế thường không đầy đủ. Một bộ phim có thể chưa được nhập rating. SQL biểu diễn sự thiếu vắng đó bằng `NULL`; nếu coi nó như số hoặc chuỗi thông thường, truy vấn rất dễ sai mà khó nhận ra.

## Mô hình tư duy

`NULL` nghĩa là giá trị ở hàng này **đang thiếu hoặc chưa biết**. Nó khác với một giá trị thật chỉ vì giá trị đó bằng 0 hoặc trống.

| Trạng thái lưu | Ý nghĩa |
| --- | --- |
| `8.8` | rating số đã biết |
| `0` | giá trị số đã biết và bằng 0 |
| `''` | chuỗi rỗng đã biết, nếu cột là text |
| `NULL` | chưa có giá trị được biết |

**movies**

| id | title | year | rating |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | 8.8 |
| 2 | The Matrix | 1999 | *(NULL)* |
| 3 | Dune | 2021 | 8.0 |
| 4 | Old Cut | 1985 | *(NULL)* |

Điều kiện SQL thường cho kết quả true hoặc false, nhưng phép so sánh có `NULL` có thể cho trạng thái logic thứ ba: **unknown**. `WHERE` chỉ giữ các hàng mà điều kiện thực sự là true.

## Dự đoán trước khi chạy

Câu sau sẽ làm gì?

```sql
SELECT title
FROM movies
WHERE rating = NULL;
```

Nó **không** có nghĩa “rating bị thiếu”. Với rating thiếu, `rating = NULL` cho kết quả unknown chứ không phải true, nên các hàng đó không được chọn.

Bây giờ dự đoán `rating IS NULL`: The Matrix và Old Cut phải được giữ.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE rating IS NULL
ORDER BY title;
```

Kết quả:

| title |
| --- |
| Old Cut |
| The Matrix |

`IS NULL` đặt câu hỏi đặc biệt “giá trị này có đang thiếu không?”. `IS NOT NULL` hỏi chiều ngược lại: “đã có giá trị chưa?”.

## Tìm lỗi

Muốn tìm phim chưa có rating nhưng lại viết:

```sql
WHERE rating = 0
```

Câu đó tìm các hàng có rating thật sự bằng số 0. Nó không nói gì về dữ liệu thiếu. Yêu cầu đúng phải dịch thành `rating IS NULL`.

## Lỗi thường gặp

- Viết `rating = NULL` thay vì `rating IS NULL`.
- Tìm chuỗi `'NULL'`; đó là text chứ không phải dữ liệu thiếu.
- Coi `NULL` như số 0 hoặc chuỗi rỗng, từ đó trộn “chưa biết” với một giá trị đã biết.

## Thử ngay

Trả về các `title` có `rating` bị thiếu, sắp theo `title`. Trước khi chạy, hãy xác định hai hàng chưa biết rating.

## Tự kiểm tra

Điều kiện nào tìm các hàng **đã có** rating?

**Đáp án:** `rating IS NOT NULL`.
