---
id: sql-36-wildcards
track: sql-fundamentals
locale: vi
slug: sql-wildcards
title: Ký tự đại diện % và _
order: 36
published: true
can_do: "Chuyển yêu cầu về hình dạng chuỗi thành LIKE pattern với % cho độ dài bất kỳ và _ cho đúng một ký tự"
objectives:
  - Phân biệt % và _ theo số ký tự chúng có thể khớp
  - Trace LIKE pattern với từng chuỗi ứng viên
  - Xây pattern từ yêu cầu hình dạng text
exercise:
  starter: "SELECT code FROM products;"
  hints:
    - "Hình dạng cần tìm là A + đúng một ký tự + C."
    - "Dùng _ cho đúng một ký tự; % sẽ cho phép 0 hoặc nhiều ký tự."
    - "Dùng: SELECT code FROM products WHERE code LIKE 'A_C' ORDER BY code;"
  solution: "SELECT code FROM products WHERE code LIKE 'A_C' ORDER BY code;"
  preview:
    columns: ["code"]
    rows:
      - ["ABC"]
      - ["A1C"]
      - ["AC"]
      - ["AXYC"]
  expected:
    columns: ["code"]
    rows:
      - ["A1C"]
      - ["ABC"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE products (id INT, code TEXT, name TEXT);"
    - "INSERT INTO products VALUES (1, 'ABC', 'Alpha'), (2, 'A1C', 'Beta'), (3, 'AC', 'Short'), (4, 'AXYC', 'Long'), (5, 'ZBC', 'Other');"
---

Wildcard giúp `LIKE` mô tả **hình dạng** của text thay vì một chuỗi chính xác. Điểm cốt lõi là hiểu mỗi wildcard có thể “ăn” bao nhiêu ký tự.

## Mô hình tư duy

| wildcard | khớp bao nhiêu ký tự | ví dụ | nghĩa |
| --- | --- | --- | --- |
| `%` | 0 hoặc nhiều | `'A%C'` | đầu A, cuối C, phần giữa dài tùy ý |
| `_` | đúng 1 | `'A_C'` | A, một ký tự giữa, C |

Trace dữ liệu bài tập:

| code | `LIKE 'A_C'` | lý do |
| --- | --- | --- |
| ABC | true | B lấp `_` |
| A1C | true | 1 lấp `_` |
| AC | false | thiếu ký tự cho `_` |
| AXYC | false | có hai ký tự giữa |
| ZBC | false | sai ký tự đầu |

## Dự đoán trước khi chạy

Trước khi chạy, dự đoán đúng hai hàng cho `'A_C'`: `A1C` và `ABC`. So với `'A%C'`, pattern kia còn khớp cả `AC` và `AXYC`.

## Ví dụ mẫu

```sql
SELECT code
FROM products
WHERE code LIKE 'A_C'
ORDER BY code;
```

| code |
| --- |
| A1C |
| ABC |

Pattern là dữ liệu text nên vẫn phải đặt trong dấu nháy đơn.

## Tìm lỗi

Yêu cầu là “đúng một ký tự giữa A và C”, nhưng query viết:

```sql
WHERE code LIKE 'A%C'
```

Nó quá rộng vì `%` có thể khớp 0, 1 hoặc nhiều ký tự. Khi debug wildcard, hãy chủ động thử cả chuỗi quá ngắn và quá dài.

## Lỗi thường gặp

- Đảo nghĩa `%` và `_`.
- Nghĩ `_` là tùy chọn trong khi nó bắt buộc đúng một ký tự.
- Chỉ test một chuỗi phải pass mà không test false positive ở biên.

## Thử ngay

Liệt kê mọi code khớp `A_C`, sắp theo code. Hãy phân loại cả năm code nguồn trước khi chạy.

## Tự kiểm tra

Wildcard nào phù hợp với “suffix dài tùy ý, kể cả không có ký tự nào”?

**Đáp án:** `%`, vì nó khớp từ 0 ký tự trở lên.
