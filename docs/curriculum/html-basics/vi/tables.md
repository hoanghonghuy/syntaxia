---
id: html-08-tables
track: html-basics
locale: vi
slug: tables
title: Data table có khả năng truy cập
order: 8
published: true
can_do: "Biểu diễn dữ liệu hai chiều bằng table có caption, header cell rõ ràng và body row thay vì dùng table để layout trang"
objectives:
  - Tách caption, header row và body row của table
  - Dùng th với scope theo cột cho header cell
  - Chỉ dùng table cho quan hệ dữ liệu thực sự dạng bảng
exercise:
  mode: html
  starter: |
    <!-- TODO: tạo table có caption, thead, tbody, hai column header và một data row -->
  hints:
    - Bắt đầu bằng table và thêm caption mô tả dataset.
    - Đặt hai th có scope="col" trong một row của thead.
    - Thêm tbody với một tr chứa hai td data cell.
  solution: |
    <table>
      <caption>Workshop seats</caption>
      <thead>
        <tr><th scope="col">Name</th><th scope="col">Seats</th></tr>
      </thead>
      <tbody>
        <tr><td>Alex</td><td>2</td></tr>
      </tbody>
    </table>
  expected:
    type: htmlTags
    tags:
      - tag: table
        minCount: 1
      - tag: caption
        minCount: 1
      - tag: thead
        minCount: 1
      - tag: tbody
        minCount: 1
      - tag: tr
        minCount: 2
      - tag: th
        minCount: 2
        attrEquals:
          scope: col
      - tag: td
        minCount: 2
---

Data table mã hóa một quan hệ hai chiều. Mục tiêu không phải vẽ các ô; mục tiêu là để mỗi data cell có thể được hiểu trong quan hệ với header hàng/cột của nó.

## Mô hình tư duy

```text
table
├─ caption -> dataset này là gì?
├─ thead
│  └─ tr -> th(scope=col), th(scope=col)
└─ tbody
   └─ tr -> td, td
```

Một grid giống spreadsheet là ứng viên tốt cho table. Navigation và layout tổng thể của trang thì không.

## Dự đoán cấu trúc khi render

Trước khi preview, hãy lần theo cell `2` nằm dưới header `Seats`. Câu hỏi ngữ nghĩa là “header nào mô tả cell này?”, không chỉ “cột nào nhìn thẳng hàng?”.

## Ví dụ mẫu

```html
<table>
  <caption>Số chỗ workshop</caption>
  <thead>
    <tr>
      <th scope="col">Tên</th>
      <th scope="col">Số chỗ</th>
    </tr>
  </thead>
  <tbody>
    <tr><td>Alex</td><td>2</td></tr>
  </tbody>
</table>
```

`caption` gọi tên dataset; `thead`/`tbody` thể hiện các group; `th scope="col"` đánh dấu rõ hai column header.

## Tìm lỗi

```html
<table>
  <tr><td>Tên</td><td>Số chỗ</td></tr>
  <tr><td>Alex</td><td>2</td></tr>
</table>
```

Nó có thể nhìn giống grid nhưng hàng đầu chỉ là data cell bình thường. Dùng header cell và cấu trúc thật để công cụ hiểu được quan hệ dữ liệu.

## Lỗi thường gặp

- Dùng table để layout toàn bộ trang.
- Làm hàng đầu in đậm nhưng vẫn để `td` thay vì `th`.
- Bỏ caption dù dataset cần ngữ cảnh.

## Thử ngay

Tạo table nhỏ có khả năng truy cập như yêu cầu. Grader kiểm tra group và scoped column header chứ không chỉ sự tồn tại của tag `table`.

## Tự kiểm tra

`scope="col"` trên `th` truyền đạt điều gì?

**Đáp án:** header cell đó mô tả các cell trong cột của nó.
