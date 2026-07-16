---
id: sql-39-any-all
track: sql-fundamentals
locale: vi
slug: any-all-subquery
title: So sánh với ANY và ALL
order: 39
published: true
objectives:
  - Dùng = ANY với danh sách từ subquery
  - Hiểu ALL là “so với mọi giá trị”
  - Đọc subquery trả về một cột số
exercise:
  starter: "SELECT title, rating FROM movies;"
  hints:
    - "ANY so một giá trị với từng kết quả của subquery."
    - "rating = ANY (SELECT …) giữ phim có rating nằm trong danh sách đó."
    - "Thử: SELECT title, rating FROM movies WHERE rating = ANY (SELECT rating FROM favorites) ORDER BY title;"
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

`EXISTS` hỏi “có ít nhất một hàng liên quan không?”. `ANY` và `ALL` hỏi khác: so giá trị này với **một danh sách** từ subquery — như kiểm tra điểm có nằm trong shortlist “rating yêu thích” không.

| Toán tử | Nghĩa đơn giản | Ý ví dụ |
| --- | --- | --- |
| `= ANY (…)` | Bằng **ít nhất một** giá trị trong danh sách | rating là 8 hoặc 9 |
| `> ALL (…)` | Lớn hơn **mọi** giá trị trong danh sách | rating vượt mọi favorite |

**movies** (bảng đầy đủ)

| id | title | rating |
| --- | --- | --- |
| 1 | The Matrix | 7 |
| 2 | Inception | 9 |
| 3 | Dune | 8 |
| 4 | Old Film | 5 |

**favorites** (danh sách rating bạn quan tâm)

| rating |
| --- |
| 9 |
| 8 |

## Ví dụ mẫu

Giữ phim có `rating` bằng **bất kỳ** rating yêu thích nào (8 hoặc 9).

```sql
SELECT title, rating
FROM movies
WHERE rating = ANY (
  SELECT rating FROM favorites
)
ORDER BY title;
```

- Subquery `SELECT rating FROM favorites` trả về danh sách `9`, `8`.
- `rating = ANY (…)` đúng khi rating phim là 9 **hoặc** 8.
- The Matrix (7) và Old Film (5) bị loại.

Kết quả:

| title | rating |
| --- | --- |
| Dune | 8 |
| Inception | 9 |

**Ghi chú:** `= ANY (…)` thường giống `IN (…)` khi so bằng. Bài này luyện cách viết `ANY` theo lộ trình W3Schools.

Để so sánh, `rating > ALL (SELECT rating FROM favorites)` nghĩa là “cao hơn cả 8 và 9” — chỉ rating 10+ mới qua. Đó không phải bài tập hôm nay.

## Lỗi thường gặp

- Viết `= ALL` khi ý là “một trong các giá trị này” — `ALL` là mọi giá trị; danh sách thành viên dùng `ANY` hoặc `IN`.
- Subquery trả nhiều cột — `ANY` cần một cột giá trị để so.
- Quên ngoặc quanh subquery.

## Thử ngay

Liệt kê `title` và `rating` của phim có rating bằng **bất kỳ** favorite rating nào. Sắp theo `title`.
