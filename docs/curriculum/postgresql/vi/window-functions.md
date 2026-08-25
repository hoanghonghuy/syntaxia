---
id: pg-20-window
track: postgresql
locale: vi
slug: window-functions
title: Ngữ cảnh hàng với window function
order: 20
published: true
can_do: "Dùng window function để tính trên các hàng liên quan mà không collapse từng input row thành group summary"
objectives:
  - Đối chiếu window calculation với aggregate GROUP BY
  - Định nghĩa window ordering độc lập với thứ tự output cuối
  - Thêm tie-breaker xác định cho ROW_NUMBER
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "ROW_NUMBER giữ mọi movie row và thêm một số được tính."
    - "Đặt year và id trong OVER (ORDER BY ...) để numbering xác định."
    - "Dùng: SELECT title, year, ROW_NUMBER() OVER (ORDER BY year, id) AS rn FROM movies ORDER BY rn;"
  solution: "SELECT title, year, ROW_NUMBER() OVER (ORDER BY year, id) AS rn FROM movies ORDER BY rn;"
  preview:
    columns: ["id", "title", "year"]
    rows:
      - [1, "The Matrix", 1999]
      - [2, "Inception", 2010]
      - [3, "Arrival", 2016]
  expected:
    columns: ["title", "year", "rn"]
    rows:
      - ["The Matrix", 1999, 1]
      - ["Inception", 2010, 2]
      - ["Arrival", 2016, 3]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INTEGER, title TEXT, year INTEGER);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999), (2, 'Inception', 2010), (3, 'Arrival', 2016);"
---

Window function tính toán với ngữ cảnh các hàng khác nhưng vẫn giữ danh tính của từng hàng hiện tại. Đây là khác biệt cốt lõi với aggregate thông thường đi kèm `GROUP BY`.

## Mô hình tư duy

So sánh hình dạng output:

| ý tưởng query | input rows | output rows |
| --- | ---: | ---: |
| `COUNT(*)` cả bảng | 3 | 1 |
| `GROUP BY year` | 3 | một hàng mỗi group |
| `ROW_NUMBER() OVER (...)` | 3 | 3 |

`OVER (...)` định nghĩa window context. `ORDER BY` bên trong điều khiển cách window function tính; `ORDER BY` ngoài cùng điều khiển cách hiển thị result row.

## Dự đoán trước khi chạy

Sort theo year rồi id: Matrix → 1, Inception → 2, Arrival → 3. Không source row nào biến mất.

## Ví dụ mẫu

```sql
SELECT
  title,
  year,
  ROW_NUMBER() OVER (ORDER BY year, id) AS rn
FROM movies
ORDER BY rn;
```

| title | year | rn |
| --- | ---: | ---: |
| The Matrix | 1999 | 1 |
| Inception | 2010 | 2 |
| Arrival | 2016 | 3 |

Muốn ranking theo nhóm, thêm `PARTITION BY`; `RANK`, `LAG`, `LEAD` và window aggregate đều dùng cùng mental model `OVER`.

## Tìm lỗi

```sql
SELECT title, ROW_NUMBER() OVER () AS rn
FROM movies;
```

Query hợp lệ nhưng numbering không có tiêu chí order. Nếu row number đại diện ranking, cần order xác định thay vì phụ thuộc row order tình cờ.

## Lỗi thường gặp

- Thay yêu cầu window bằng GROUP BY rồi làm mất individual rows.
- Nghĩ window `ORDER BY` tự đảm bảo thứ tự hiển thị cuối.
- Rank các giá trị tie mà không có tie-breaker khi numbering ổn định là quan trọng.

## Thử ngay

Trả từng movie với `rn` theo year và id, rồi hiển thị theo row number đó.

## Tự kiểm tra

Thêm `ROW_NUMBER() OVER (...)` vào SELECT đơn giản làm row count thay đổi thế nào?

**Đáp án:** row count giữ nguyên; window function thêm context tính toán cho từng hàng thay vì collapse các hàng.
