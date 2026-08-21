---
id: sql-03-distinct
track: sql-fundamentals
locale: vi
slug: select-distinct
title: Giá trị duy nhất với DISTINCT
order: 3
published: true
can_do: "Trả về các hàng kết quả duy nhất bằng DISTINCT và giải thích thế nào được xem là trùng"
objectives:
  - Loại giá trị trùng trong kết quả một cột
  - Dự đoán DISTINCT làm thay đổi số hàng kết quả như thế nào
  - Hiểu DISTINCT áp dụng cho tổ hợp cột đã chọn
exercise:
  starter: "SELECT director FROM movies;"
  hints:
    - "Kết quả director thông thường chứa Nolan hai lần."
    - "Đặt DISTINCT ngay sau SELECT để các hàng kết quả trùng nhau được gộp lại."
    - "Dùng: SELECT DISTINCT director FROM movies ORDER BY director;"
  solution: "SELECT DISTINCT director FROM movies ORDER BY director;"
  preview:
    columns: ["id", "title", "director"]
    rows:
      - [1, "Inception", "Nolan"]
      - [2, "Interstellar", "Nolan"]
      - [3, "The Matrix", "Wachowski"]
      - [4, "Dune", "Villeneuve"]
  expected:
    columns: ["director"]
    rows:
      - ["Nolan"]
      - ["Villeneuve"]
      - ["Wachowski"]
sandbox_seed:
  ddl:
    - "CREATE TEMP TABLE movies (id INT, title TEXT, director TEXT);"
    - "INSERT INTO movies VALUES (1, 'Inception', 'Nolan'), (2, 'Interstellar', 'Nolan'), (3, 'The Matrix', 'Wachowski'), (4, 'Dune', 'Villeneuve');"
---

Giá trị lặp là chuyện bình thường trong dữ liệu lưu trữ. Hai phim có thể cùng đạo diễn. Câu hỏi là **kết quả truy vấn** cần mọi lần xuất hiện hay chỉ cần danh sách duy nhất.

## Mô hình tư duy

`DISTINCT` loại các **hàng kết quả** trùng nhau sau khi danh sách SELECT đã xác định hình dạng của hàng đó.

**movies**

| id | title | director |
| --- | --- | --- |
| 1 | Inception | Nolan |
| 2 | Interstellar | Nolan |
| 3 | The Matrix | Wachowski |
| 4 | Dune | Villeneuve |

`SELECT director` thông thường tạo bốn hàng kết quả vì có bốn phim. Hai hàng trong số đó cùng chứa Nolan.

## Dự đoán trước khi chạy

```sql
SELECT DISTINCT director
FROM movies;
```

Nếu hàng trùng bị gộp, những giá trị nào còn lại?

- Nolan xuất hiện hai lần ở bảng nguồn nhưng một lần trong kết quả distinct.
- Villeneuve xuất hiện một lần.
- Wachowski xuất hiện một lần.

Vì vậy kết quả phải có **3 hàng**, không phải 4.

## Ví dụ mẫu

```sql
SELECT DISTINCT director
FROM movies
ORDER BY director;
```

| director |
| --- |
| Nolan |
| Villeneuve |
| Wachowski |

`ORDER BY director` làm thứ tự hiển thị rõ ràng. Nó tách biệt với `DISTINCT`: một bên bỏ hàng kết quả trùng, một bên sắp xếp.

## Tìm lỗi

Giả sử mục tiêu thật sự là “mỗi đạo diễn một hàng”. Vì sao câu này không đạt mục tiêu?

```sql
SELECT DISTINCT director, title
FROM movies;
```

Hàng kết quả bây giờ là các cặp như `(Nolan, Inception)` và `(Nolan, Interstellar)`. Hai cặp đó khác nhau nên cả hai vẫn tồn tại. `DISTINCT` so sánh **toàn bộ hàng đã chọn**, không chỉ cột đầu tiên.

## Lỗi thường gặp

- Viết `SELECT director DISTINCT`; `DISTINCT` đứng ngay sau `SELECT`.
- Nghĩ `DISTINCT` xóa giá trị trùng khỏi bảng lưu trữ. Nó chỉ thay đổi kết quả truy vấn hiện tại.
- Thêm nhiều cột đầu ra rồi thắc mắc vì sao một giá trị vẫn xuất hiện nhiều lần.

## Thử ngay

Trả về mỗi `director` đúng một lần, sắp theo `director`.

## Tự kiểm tra

`SELECT DISTINCT director, title` có đảm bảo mỗi đạo diễn chỉ còn một hàng không?

**Đáp án:** không. Tính duy nhất được xét trên tổ hợp `(director, title)` đã chọn.
