---
id: sql-05-order
track: sql-fundamentals
locale: vi
slug: order-by
title: Sắp xếp với ORDER BY
order: 6
published: true
can_do: "Sắp xếp kết quả truy vấn theo một cột với thứ tự tăng dần hoặc giảm dần"
objectives:
  - Giải thích vì sao thứ tự hàng không được đảm bảo nếu thiếu ORDER BY
  - Sắp xếp theo một cột liên quan tới kết quả
  - Chọn ASC hoặc DESC theo yêu cầu
exercise:
  starter: "SELECT title, year FROM movies;"
  hints:
    - "Đề thay đổi thứ tự hàng chứ không lọc hàng; hãy thêm ORDER BY sau các clause nguồn/lọc."
    - "Sắp theo year và dùng DESC khi muốn mới/lớn nhất trước."
    - "Dùng: SELECT title, year FROM movies ORDER BY year DESC;"
  solution: "SELECT title, year FROM movies ORDER BY year DESC;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "The Matrix", 1999, "Wachowski"]
      - [2, "Inception", 2010, "Nolan"]
      - [3, "Interstellar", 2014, "Nolan"]
      - [4, "Dune", 2021, "Villeneuve"]
  expected:
    columns: ["title", "year"]
    rows:
      - ["Dune", 2021]
      - ["Interstellar", 2014]
      - ["Inception", 2010]
      - ["The Matrix", 1999]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'The Matrix', 1999, 'Wachowski'), (2, 'Inception', 2010, 'Nolan'), (3, 'Interstellar', 2014, 'Nolan'), (4, 'Dune', 2021, 'Villeneuve');"
---

Một tập kết quả không có ý nghĩa “mới nhất trước” nếu truy vấn không chỉ rõ thứ tự đó. `ORDER BY` biến thứ tự thành một phần của yêu cầu thay vì dựa vào thứ tự tình cờ đang thấy.

## Mô hình tư duy

Sắp xếp thay đổi **vị trí**, không thay đổi **thành viên** của tập kết quả.

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | The Matrix | 1999 | Wachowski |
| 2 | Inception | 2010 | Nolan |
| 3 | Interstellar | 2014 | Nolan |
| 4 | Dune | 2021 | Villeneuve |

Nếu chọn cả bốn hàng, `ORDER BY year DESC` vẫn giữ đủ bốn nhưng sắp theo `year` từ lớn xuống nhỏ.

| Hướng | Cách hiểu với số | Thứ tự năm ở đây |
| --- | --- | --- |
| `ASC` | nhỏ -> lớn | 1999 -> 2010 -> 2014 -> 2021 |
| `DESC` | lớn -> nhỏ | 2021 -> 2014 -> 2010 -> 1999 |

## Dự đoán trước khi chạy

```sql
SELECT title, year
FROM movies
ORDER BY year DESC;
```

Hãy viết bốn năm theo thứ tự bạn kỳ vọng **trước khi** chạy. Hàng đầu phải là phim năm 2021; hàng cuối là phim năm 1999.

## Ví dụ mẫu

```sql
SELECT title, year
FROM movies
ORDER BY year DESC;
```

| title | year |
| --- | --- |
| Dune | 2021 |
| Interstellar | 2014 |
| Inception | 2010 |
| The Matrix | 1999 |

`ASC` là hướng mặc định nếu không ghi rõ, nhưng viết hướng cụ thể giúp ý định dễ đọc hơn khi yêu cầu sắp xếp quan trọng.

## Tìm lỗi

Clause này có đủ ý nhưng sai thứ tự:

```sql
ORDER BY DESC year
```

Biểu thức/cột sắp xếp đứng trước, sau đó mới tới hướng: `ORDER BY year DESC`.

## Lỗi thường gặp

- Coi thứ tự bảng đang hiển thị là thứ tự truy vấn được đảm bảo.
- Quên `DESC` khi yêu cầu nói mới nhất, lớn nhất hoặc cao nhất trước.
- Đặt `ORDER BY` trước `WHERE`; trong câu SELECT, phần sắp xếp đứng sau phần lọc hàng.

## Thử ngay

Trả về `title` và `year` của mọi phim, sắp từ mới nhất đến cũ nhất. Trước khi chạy, hãy dự đoán hàng đầu và hàng cuối.

## Tự kiểm tra

`ORDER BY` có loại các hàng không thỏa điều kiện không?

**Đáp án:** không. `WHERE` quyết định hàng nào tồn tại trong kết quả; `ORDER BY` chỉ sắp các hàng còn lại.
