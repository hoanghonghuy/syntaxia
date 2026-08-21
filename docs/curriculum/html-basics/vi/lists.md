---
id: html-04-lists
track: html-basics
locale: vi
slug: lists
title: Danh sách
order: 4
published: true
can_do: "Chọn cấu trúc unordered, ordered hoặc description list dựa trên quan hệ giữa các item và lồng list item đúng cách"
objectives:
  - Chọn loại list dựa trên việc thứ tự có ý nghĩa hay không
  - Đặt li đúng bên trong ul hoặc ol
  - Nhận biết cấu trúc term-description bằng dl, dt và dd
exercise:
  mode: html
  starter: |
    <!-- TODO: tạo unordered list có ít nhất hai item -->
  hints:
    - Dùng ul vì các item luyện tập này không cần số thứ tự.
    - Mỗi item phải nằm trong một phần tử li.
    - Tạo <ul> với ít nhất hai phần tử con <li>...</li>.
  solution: |
    <ul>
      <li>Water</li>
      <li>Flour</li>
    </ul>
  expected:
    type: htmlTags
    tags:
      - tag: ul
        minCount: 1
      - tag: li
        minCount: 2
---

List diễn tả mối quan hệ giữa nhiều item. Quyết định quan trọng là **thứ tự có mang ý nghĩa hay không**, không phải thích nhìn bullet hay số hơn.

## Mô hình tư duy

```text
unordered: ul -> li, li, li
ordered:   ol -> li, li, li
description: dl -> dt + dd, dt + dd
```

`ul` và `ol` là container; item thực tế nằm trong các phần tử `li`.

## Dự đoán cấu trúc khi render

Các bước của một công thức nấu ăn vẫn có ý nghĩa khi đọc “bước 1, bước 2, bước 3”. Danh sách đồ cần mua thường không cần thứ tự. Hãy đoán cái nào dùng `ol`, cái nào dùng `ul` trước khi viết markup.

## Ví dụ mẫu

```html
<ul>
  <li>Nước</li>
  <li>Bột</li>
</ul>

<ol>
  <li>Trộn bột.</li>
  <li>Để nghỉ 30 phút.</li>
</ol>

<dl>
  <dt>HTML</dt>
  <dd>Markup dùng cho cấu trúc tài liệu.</dd>
</dl>
```

Lựa chọn phần tử giữ nguyên ý nghĩa quan hệ kể cả khi CSS sau này đổi marker.

## Tìm lỗi

```html
<ul>
  Nước
  <li>Bột</li>
</ul>
```

`Nước` đang là text trần chứ không phải list item. Mỗi item cần là `li`; list lồng nhau cũng nên nằm bên trong một `li`, không đứng ngang hàng với item.

## Lỗi thường gặp

- Dùng `ol` chỉ vì thích số dù thứ tự không có ý nghĩa.
- Đặt text item trực tiếp dưới `ul` hoặc `ol`.
- Tự gõ ký tự bullet thay vì tạo cấu trúc list thật.

## Thử ngay

Tạo một unordered list có ít nhất hai item và quan sát cấu trúc danh sách trong preview.

## Tự kiểm tra

Khi nào nên dùng ordered list?

**Đáp án:** khi vị trí/thứ tự của các item có ý nghĩa, như quy trình hoặc bảng xếp hạng.
