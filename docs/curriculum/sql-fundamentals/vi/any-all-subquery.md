---
id: sql-39-any-all
track: sql-fundamentals
locale: vi
slug: any-all-subquery
title: So sánh với ANY và ALL
order: 39
published: true
can_do: "Đánh giá một giá trị với subquery một cột bằng ANY cho ít nhất một và ALL cho mọi giá trị trả về"
objectives:
  - Tách result set của subquery khỏi phép so sánh bên ngoài
  - Hiểu ANY là ít nhất một phép so sánh đúng
  - Đối chiếu ANY với ALL bằng giá trị cụ thể
exercise:
  starter: "SELECT title, rating FROM movies;"
  hints:
    - "Đánh giá subquery trước: favorites trả rating 9 và 8."
    - "= ANY nghĩa là rating chỉ cần bằng một giá trị trong tập đó."
    - "Dùng: SELECT title, rating FROM movies WHERE rating = ANY (SELECT rating FROM favorites) ORDER BY title;"
  solution: "SELECT title, rating FROM movies WHERE rating = ANY (SELECT rating FROM favorites) ORDER BY title;"
  preview:
    columns: ["title", "rating"]
    rows:
      - ["Inception", 9]
      - ["Dune", 8]
  expected:
    columns: ["title", "rating"]
    rows:
      - ["Dune", 8]
      - ["Inception", 9]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, rating INT);"
    - "CREATE TEMP TABLE favorites (rating INT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 7), (2, 'Inception', 9), (3, 'Dune', 8), (4, 'Old Film', 5);"
    - "INSERT INTO favorites VALUES (9), (8);"
---

`ANY` và `ALL` kết hợp toán tử so sánh với một tập giá trị do subquery trả về. Cách học chắc nhất là đánh giá **tập bên trong trước**, rồi mới so sánh giá trị ngoài với tập đó.

## Mô hình tư duy

Query bên trong:

```sql
SELECT rating FROM favorites;
```

trả `{9, 8}`.

So sánh một giá trị:

| movie rating | `= ANY {9,8}` | `> ALL {9,8}` |
| ---: | --- | --- |
| 9 | true | false |
| 8 | true | false |
| 7 | false | false |
| 10 | false | true |

`ANY` nghĩa là **ít nhất một** phép so sánh true. `ALL` yêu cầu phép so sánh true với **mọi** giá trị.

## Dự đoán trước khi chạy

Với `rating = ANY ({9,8})`, Inception (9) và Dune (8) sống sót; rating 7 và 5 bị loại.

## Ví dụ mẫu

```sql
SELECT title, rating
FROM movies
WHERE rating = ANY (
  SELECT rating FROM favorites
)
ORDER BY title;
```

| title | rating |
| --- | ---: |
| Dune | 8 |
| Inception | 9 |

Với equality, `= ANY (...)` thường thể hiện membership tương tự `IN (...)`; dạng tường minh giúp hiểu các toán tử khác như `> ALL (...)`.

## Tìm lỗi

```sql
WHERE rating = ALL (SELECT rating FROM favorites)
```

Một rating phải đồng thời bằng cả 9 **và** 8 nên không movie nào pass. Keyword thay đổi lượng từ logic, không chỉ thay cách viết.

## Lỗi thường gặp

- Đọc `ANY`/`ALL` trước khi xác định subquery thực tế trả gì.
- Dùng `ALL` khi yêu cầu là “khớp ít nhất một”.
- Trả nhiều cột từ subquery trong khi phép so sánh cần một cột giá trị.

## Thử ngay

Liệt kê title và rating của movie có rating bằng bất kỳ favorite rating nào, sắp theo title. Viết tập `{9,8}` trước khi đánh giá các hàng ngoài.

## Tự kiểm tra

`score > ALL (subquery)` yêu cầu gì?

**Đáp án:** `score` phải lớn hơn mọi giá trị mà subquery trả về.
