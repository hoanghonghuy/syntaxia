---
id: sql-15-like
track: sql-fundamentals
locale: vi
slug: like-pattern
title: Khớp mẫu chữ với LIKE
order: 15
published: true
can_do: "Chuyển yêu cầu khớp mẫu text thành LIKE với wildcard đặt đúng vị trí"
objectives:
  - Phân biệt so sánh chính xác với khớp mẫu
  - Trace chuỗi nào khớp một LIKE pattern
  - Dùng % cho một chuỗi ký tự có độ dài bất kỳ
exercise:
  starter: "SELECT title FROM movies;"
  hints:
    - "Yêu cầu nói bắt đầu bằng chứ không phải bằng chính xác, vì vậy dùng LIKE."
    - "Đặt % sau In vì phần đuôi có thể là bất kỳ chuỗi ký tự nào."
    - "Dùng: SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;"
  solution: "SELECT title FROM movies WHERE title LIKE 'In%' ORDER BY title;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "Interstellar", 2014, "Nolan"]
      - [3, "The Matrix", 1999, "Wachowski"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title"]
    rows:
      - ["Inception"]
      - ["Interstellar"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'Interstellar', 2014, 'Nolan'), (3, 'The Matrix', 1999, 'Wachowski'), (4, 'Dune', 2021, 'Villeneuve');"
---

Yêu cầu về text không phải lúc nào cũng là so sánh bằng chính xác. “Bắt đầu bằng In” mô tả một **mẫu**, nên truy vấn phải thể hiện phần nào cố định và phần nào được phép thay đổi.

## Mô hình tư duy

Trong LIKE pattern, `%` nghĩa là “có thể có từ 0 ký tự trở lên ở đây”. Vị trí của nó làm thay đổi ý nghĩa.

| Pattern | Cách đọc |
| --- | --- |
| `'In%'` | bắt đầu bằng `In` |
| `'%In'` | kết thúc bằng `In` |
| `'%In%'` | chứa `In` ở đâu đó |

Áp `'In%'` lên dữ liệu:

| title | khớp? |
| --- | --- |
| Inception | có |
| Interstellar | có |
| The Matrix | không |
| Dune | không |

## Dự đoán trước khi chạy

```sql
SELECT title
FROM movies
WHERE title LIKE 'In%';
```

Hãy dự đoán hai hàng được giữ trước khi chạy. Đồng thời chú ý pattern nằm trong dấu nháy vì nó là text literal.

## Ví dụ mẫu

```sql
SELECT title
FROM movies
WHERE title LIKE 'In%'
ORDER BY title;
```

| title |
| --- |
| Inception |
| Interstellar |

Trong PostgreSQL, `LIKE` thông thường phân biệt hoa/thường với các giá trị text này; không nên ngầm cho rằng `'in%'` sẽ khớp giống hệt. `ILIKE` là đặc trưng PostgreSQL nên để ở track PostgreSQL.

## Tìm lỗi

Yêu cầu là “bắt đầu bằng In”, nhưng truy vấn viết:

```sql
WHERE title LIKE '%In'
```

Wildcard nằm sai phía. Pattern này cho phép phần đầu tùy ý và bắt chuỗi phải **kết thúc** bằng `In`.

## Lỗi thường gặp

- Dùng `=` với text có wildcard rồi mong pattern matching.
- Đặt `%` sai vị trí khiến “bắt đầu bằng” thành “kết thúc bằng” hoặc “chứa”.
- Giả định mọi hệ SQL đều khớp chữ không phân biệt hoa/thường.

## Thử ngay

Trả về title bắt đầu bằng `In`, sắp theo title. Trước khi chạy, tự thử pattern trên cả bốn chuỗi.

## Tự kiểm tra

Pattern nào diễn đạt “chứa `Matrix` ở bất kỳ vị trí nào”?

**Đáp án:** `'%Matrix%'`.
