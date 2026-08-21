---
id: js-00-intro
track: javascript-basics
locale: vi
slug: what-is-javascript
title: JavaScript là gì?
order: 0
published: true
can_do: "Trace một chương trình JavaScript nhỏ từ value sang variable rồi tới output quan sát được"
objectives:
  - Phân biệt behavior JavaScript với structure HTML và presentation CSS
  - Trace statement theo thứ tự thực thi
  - Tạo output quan sát được bằng console.log
exercise:
  starter: |
    const name = "Ada";
    // TODO: log exactly: Hello, Ada
  hints:
    - "Value Ada đã nằm trong name; việc còn lại là tạo output."
    - "Dùng console.log(...) và template literal có ${name}."
    - "Dùng: console.log(`Hello, ${name}`);"
  solution: |
    const name = "Ada";
    console.log(`Hello, ${name}`);
  expected:
    type: console
    lines:
      - "Hello, Ada"
---

JavaScript là ngôn ngữ lập trình tạo behavior và logic cho trải nghiệm web. Cùng ngôn ngữ đó cũng chạy ngoài trang web như server hoặc tooling; API khả dụng sẽ phụ thuộc runtime.

## Mô hình thực thi

Trước mắt, hãy đọc script nhỏ như chuỗi instruction:

```text
source code -> evaluate statement 1 -> cập nhật program state -> evaluate statement 2 -> kết quả quan sát được
```

Ba building block:

| ý tưởng | ví dụ | vai trò |
| --- | --- | --- |
| value | `"Ada"`, `42`, `true` | thông tin |
| binding | `const name = "Ada"` | đặt tên cho value |
| statement | `console.log(name)` | thực hiện instruction |

HTML mô tả cấu trúc, CSS mô tả presentation, JavaScript đánh giá logic và phản ứng với state/event thay đổi.

## Trace từng bước

```javascript
const name = "Ada";
console.log(`Hello, ${name}`);
```

| bước | state / effect |
| ---: | --- |
| 1 | binding `name` trỏ tới string `"Ada"` |
| 2 | template literal đọc `name` và tạo `"Hello, Ada"` |
| 3 | `console.log` đưa string đó ra console output |

## Dự đoán trước khi chạy

Trước khi Run, viết chính xác dòng output gồm cả dấu phẩy và space: `Hello, Ada`.

## Ví dụ mẫu

```javascript
const language = "JavaScript";
const message = `Learning ${language}`;
console.log(message);
```

Program tạo value, suy ra value mới, rồi tạo side effect quan sát được bằng log.

## Tìm lỗi

```javascript
const name = Ada;
console.log(`Hello, ${name}`);
```

`Ada` không có quote sẽ được hiểu là identifier. Nếu không có binding tên Ada, execution lỗi trước khi log thành công. Khi debug, hãy hỏi token đó phải là **data** hay **identifier**.

## Lỗi thường gặp

- Nghĩ JavaScript, HTML và CSS có cùng trách nhiệm.
- Chỉ nhìn dòng cuối thay vì trace value đi tới đó như nào.
- Bỏ quote khỏi string data rồi vô tình biến thành identifier lookup.

## Thử ngay

Hoàn thành sandbox để log chính xác `Hello, Ada` bằng binding `name` đã có.

## Tự kiểm tra

Khác biệt chính giữa value `"Ada"` và identifier `name` là gì?

**Đáp án:** value là dữ liệu; identifier là tên mà program dùng để tham chiếu value.
