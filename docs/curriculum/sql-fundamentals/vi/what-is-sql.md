---
id: sql-00-intro
track: sql-fundamentals
locale: vi
slug: what-is-sql
title: Dữ liệu và SQL là gì?
order: 0
published: true
can_do: "Đọc một bảng dữ liệu và chạy truy vấn trả về toàn bộ cột và hàng của bảng"
objectives:
  - Nhìn bảng dữ liệu như tập hợp hàng và cột thay vì một khái niệm cơ sở dữ liệu trừu tượng
  - Phân biệt bảng nguồn, câu truy vấn SQL và kết quả truy vấn
  - Chạy truy vấn SELECT đầu tiên trong sandbox
exercise:
  starter: "SELECT * FROM movies;"
  hints:
    - "Đề yêu cầu mọi cột, vì vậy hãy giữ dấu *."
    - "Sau FROM phải là tên bảng nguồn: movies."
    - "Dùng: SELECT * FROM movies;"
  solution: "SELECT * FROM movies;"
  preview:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
  expected:
    columns: ["id", "title", "year", "director"]
    rows:
      - [1, "Inception", 2010, "Nolan"]
      - [2, "The Matrix", 1999, "Wachowski"]
      - [3, "Dune", 2021, "Villeneuve"]
      - [4, "Interstellar", 2014, "Nolan"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, year INT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 2010, 'Nolan'), (2, 'The Matrix', 1999, 'Wachowski'), (3, 'Dune', 2021, 'Villeneuve'), (4, 'Interstellar', 2014, 'Nolan');"
---

Cơ sở dữ liệu sẽ bớt trừu tượng nếu bắt đầu từ một bảng cụ thể. Hãy coi `movies` như một spreadsheet mà ứng dụng có thể hỏi bằng câu lệnh, thay vì một sheet phải tự kéo và lọc bằng tay.

## Mô hình tư duy

Tách ba thứ sau ra khỏi nhau:

| Thành phần | Nó là gì |
| --- | --- |
| **Bảng** | Dữ liệu được lưu theo cột và hàng |
| **Truy vấn** | Yêu cầu mô tả dữ liệu bạn muốn lấy |
| **Kết quả** | Câu trả lời dạng bảng được tạo ra từ truy vấn |

Đây là bảng nguồn của bài:

**movies**

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Mỗi hàng biểu diễn một bộ phim. Mỗi cột biểu diễn cùng một loại thông tin cho các phim.

## Dự đoán trước khi chạy

Nhìn truy vấn này nhưng chưa bấm Chạy:

```sql
SELECT * FROM movies;
```

Hãy dự đoán hai điều:

- Kết quả có bao nhiêu cột?
- Kết quả có bao nhiêu hàng?

Dấu `*` nghĩa là mọi cột hiện có, và truy vấn chưa lọc hàng nào. Vì vậy dự đoán đúng là **4 cột và 4 hàng**.

## Ví dụ mẫu

```sql
SELECT *
FROM movies;
```

Đọc truy vấn theo từng vai trò:

- `SELECT` bắt đầu yêu cầu dữ liệu đầu ra.
- `*` yêu cầu mọi cột.
- `FROM movies` chỉ ra bảng nguồn.

Kết quả:

| id | title | year | director |
| --- | --- | --- | --- |
| 1 | Inception | 2010 | Nolan |
| 2 | The Matrix | 1999 | Wachowski |
| 3 | Dune | 2021 | Villeneuve |
| 4 | Interstellar | 2014 | Nolan |

Kết quả giống bảng nguồn vì truy vấn này lấy mọi cột và chưa loại hàng nào. Những bài sau sẽ thay đổi hình dạng hoặc số hàng của kết quả.

## Tìm lỗi

Vì sao câu này không tương đương?

```sql
SELECT movies;
```

`movies` là **tên bảng**, không phải một biểu thức cột để trả về. Truy vấn cũng không dùng `FROM` để chỉ nguồn dữ liệu. Với bài này, hình dạng đúng là `SELECT ... FROM movies`.

## Lỗi thường gặp

- Nhầm tên bảng với tên cột.
- Gõ `movie` thay vì `movies`; identifier phải khớp với schema.
- Nghĩ rằng SQL luôn trả hàng theo một thứ tự có ý nghĩa. Bài `ORDER BY` sẽ làm thứ tự trở thành yêu cầu rõ ràng.

## Thử ngay

Dùng sandbox để trả về **mọi cột và mọi hàng** của `movies`. Trước khi bấm Chạy, tự nói xem bạn kỳ vọng kết quả có hình dạng thế nào.

## Tự kiểm tra

Phần nào trong `SELECT * FROM movies` cho SQL biết dữ liệu đến từ đâu?

**Đáp án:** `FROM movies` chỉ ra bảng nguồn.
