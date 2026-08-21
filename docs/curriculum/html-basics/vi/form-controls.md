---
id: html-10-controls
track: html-basics
locale: vi
slug: form-controls
title: Chọn và nhóm form control
order: 10
published: true
can_do: "Chọn checkbox, radio, select và textarea theo interaction model và nhóm đúng các radio loại trừ nhau bằng một name chung"
objectives:
  - Chọn control phù hợp với loại câu trả lời cần thu thập
  - Nhóm radio choice bằng một name chung
  - Kết hợp select, option và textarea trong form có cấu trúc
exercise:
  mode: html
  starter: |
    <!-- TODO: tạo form có checkbox, hai radio cùng group, select có hai option và textarea -->
  hints:
    - Dùng input type="checkbox" cho lựa chọn yes/no độc lập và hai input type="radio" cho lựa chọn một trong nhiều.
    - Hai radio phải dùng cùng name để trình duyệt coi chúng là một group.
    - Thêm select chứa ít nhất hai option và một textarea cho ghi chú nhiều dòng.
  solution: |
    <form>
      <label><input type="checkbox" name="newsletter"> Newsletter</label>
      <label><input type="radio" name="plan" value="basic"> Basic</label>
      <label><input type="radio" name="plan" value="pro"> Pro</label>
      <select name="role">
        <option>Developer</option>
        <option>Designer</option>
      </select>
      <textarea name="notes"></textarea>
    </form>
  expected:
    type: htmlTags
    tags:
      - tag: form
        minCount: 1
      - tag: input
        minCount: 1
        attrEquals:
          type: checkbox
      - tag: input
        minCount: 2
        requiredAttrs: [name]
        attrEquals:
          type: radio
      - tag: select
        minCount: 1
      - tag: option
        minCount: 2
      - tag: textarea
        minCount: 1
    relations:
      - kind: sharedAttributeValue
        tag: input
        attr: name
        minCount: 2
        attrEquals:
          type: radio
---

Form control mã hóa các **interaction model** khác nhau. Chọn đúng control giúp trình duyệt có hành vi hữu ích ngay cả trước khi viết JavaScript.

## Mô hình tư duy

| Dạng câu hỏi | Control |
| --- | --- |
| lựa chọn yes/no độc lập | checkbox |
| chọn đúng một trong một nhóm nhỏ | radio dùng chung một `name` |
| chọn một giá trị từ danh sách dài hơn | `select` + `option` |
| text tự do nhiều dòng | `textarea` |

Nhóm radio là một phần của cấu trúc dữ liệu: `name` chung nói rằng các control này trả lời cùng một câu hỏi.

## Dự đoán cấu trúc khi render

Hai radio có `name="plan"` tạo một group. Hãy dự đoán khi người dùng chọn Basic rồi chọn Pro: Pro được chọn và Basic bị bỏ chọn. Nếu name khác nhau, trình duyệt không còn biết chúng loại trừ nhau.

## Ví dụ mẫu

```html
<label><input type="checkbox" name="newsletter"> Newsletter</label>

<label><input type="radio" name="plan" value="basic"> Basic</label>
<label><input type="radio" name="plan" value="pro"> Pro</label>

<select name="role">
  <option>Developer</option>
  <option>Designer</option>
</select>

<textarea name="notes"></textarea>
```

Loại control phải xuất phát từ dạng câu trả lời, không phải widget nào nhìn tiện nhất.

## Tìm lỗi

```html
<input type="radio" name="basic" value="basic">
<input type="radio" name="pro" value="pro">
```

Đây là hai radio group độc lập vì name khác nhau. Cả hai cần cùng tên câu hỏi, ví dụ `name="plan"`.

## Lỗi thường gặp

- Dùng radio cho các toggle độc lập mà người dùng cần chọn nhiều mục.
- Đặt mỗi radio option một `name` khác nhau.
- Dùng input một dòng cho ghi chú dài thay vì `textarea`.

## Thử ngay

Tạo bộ control tích hợp như starter. Grader giờ xác minh ít nhất hai radio input dùng chung một `name` không rỗng.

## Tự kiểm tra

Điều gì khiến hai radio input thuộc cùng một nhóm loại trừ nhau?

**Đáp án:** chúng dùng chung giá trị `name`.
