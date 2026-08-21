---
id: pg-06-date
track: postgresql
locale: vi
slug: date-basics
title: DATE, TIMESTAMP và ý nghĩa múi giờ
order: 6
published: true
can_do: "Lọc DATE PostgreSQL bằng literal ISO có kiểu và chọn DATE hay timestamp dựa trên intent domain"
objectives:
  - So sánh DATE bằng typed ISO date literal
  - Phân biệt ngày lịch với giá trị timestamp
  - Nhận ra khi semantics múi giờ có ý nghĩa
exercise:
  starter: "SELECT title, released FROM movies;"
  hints:
    - "Cột lưu ngày lịch nên hãy so với DATE literal có kiểu."
    - "On or after cần >= và ngày ISO 2010-01-01."
    - "Dùng: SELECT title FROM movies WHERE released >= DATE '2010-01-01' ORDER BY released, title;"
  solution: "SELECT title FROM movies WHERE released >= DATE '2010-01-01' ORDER BY released, title;"
  preview:
    columns: ["id", "title", "released"]
    rows:
      - [1, "The Matrix", "1999-03-31"]
      - [2, "Inception", "2010-07-16"]
      - [3, "Dune", "2021-10-22"]
      - [4, "Arrival", "2016-11-11"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Arrival"]
      - ["Dune"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, released DATE);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', DATE '1999-03-31'), (2, 'Inception', DATE '2010-07-16'), (3, 'Dune', DATE '2021-10-22'), (4, 'Arrival', DATE '2016-11-11');"
---

Dữ liệu thời gian dễ mô hình hóa sai vì “một ngày” và “một thời điểm chính xác” là hai concept domain khác nhau.

## Mô hình tư duy

Chọn từ intent trước:

| kiểu | mô hình hóa |
| --- | --- |
| `DATE` | ngày lịch, không có giờ |
| `TIMESTAMP WITHOUT TIME ZONE` | ngày + giờ local, không có semantics chuyển múi giờ |
| `TIMESTAMP WITH TIME ZONE` (`timestamptz`) | một instant, cách hiển thị phụ thuộc time zone session |

`released` của bài là ngày phát hành theo lịch nên `DATE` phù hợp.

Ưu tiên ISO `YYYY-MM-DD` ở tài liệu và boundary ứng dụng vì rõ ràng, ít mơ hồ.

## Dự đoán trước khi chạy

Với `released >= DATE '2010-01-01'`, The Matrix bị loại. Khi sắp theo ngày phát hành, kết quả là Inception, Arrival, Dune.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE released >= DATE '2010-01-01'
ORDER BY released, title;
```

| title |
| --- |
| Inception |
| Arrival |
| Dune |

## Tìm lỗi

Một event toàn cầu như “payment được nhận tại thời điểm chính xác” lại lưu bằng `DATE`. SQL có thể vẫn chạy nhưng model đã làm mất giờ và ý nghĩa instant/time-zone.

```sql
CREATE TABLE payments (received_on DATE);
```

Với semantics instant, timestamp type—thường là `timestamptz` trong application system—là điểm bắt đầu phù hợp hơn.

## Lỗi thường gặp

- Dùng date string theo locale như `01/02/2026` ở system boundary.
- Nghĩ `timestamp without time zone` sẽ giữ source time-zone offset.
- Dùng timestamp cho domain thực sự chỉ cần ngày lịch hoặc dùng DATE khi instant mới là thứ quan trọng.

## Thử ngay

Trả các title phát hành từ `2010-01-01` trở đi, sắp theo ngày phát hành rồi title.

## Tự kiểm tra

Kiểu nào phù hợp nhất cho ngày sinh khi không quan tâm giờ trong ngày?

**Đáp án:** `DATE`.
