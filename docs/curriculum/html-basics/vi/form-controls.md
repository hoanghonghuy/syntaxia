---
id: html-10-controls
track: html-basics
locale: vi
slug: form-controls
title: Thêm điều khiển form
order: 10
published: true
objectives:
  - Dùng checkbox, radio, select và textarea
  - Hiểu required yêu cầu người dùng điền trước khi gửi
  - Chọn đúng loại điều khiển theo kiểu dữ liệu cần thu
exercise:
  mode: html
  starter: |
    <!-- Add a checkbox and a select menu -->
    
  hints:
    - 'Checkbox dùng input type="checkbox".'
    - Select bọc các phần tử option.
    - Cả hai có thể nằm trong cùng một đoạn.
  solution: |
    <label><input type="checkbox"> Agree</label>
    <select><option>One</option></select>
  expected:
    type: htmlIncludes
    needles:
      - 'type="checkbox"'
      - <select
---

Ngoài ô chữ một dòng, form còn có hộp chọn, nút chọn một phương án, danh sách thả, và ô nhiều dòng. Mỗi loại phù hợp một kiểu câu hỏi.

| Điều khiển | Khi nào dùng |
| --- | --- |
| `input type="checkbox"` | Chọn nhiều mục độc lập (đúng/sai từng cái) |
| `input type="radio"` | Chọn đúng một trong nhóm cùng `name` |
| `select` + `option` | Chọn một (hoặc vài) mục từ danh sách |
| `textarea` | Văn bản dài, nhiều dòng |
| `required` | Bắt buộc điền/chọn trước khi gửi |

## Ví dụ mẫu

```html
<form>
  <fieldset>
    <legend>Sở thích</legend>
    <label><input type="checkbox" name="interest" value="html" /> HTML</label>
    <label><input type="checkbox" name="interest" value="css" /> CSS</label>
  </fieldset>

  <fieldset>
    <legend>Cấp độ</legend>
    <label><input type="radio" name="level" value="beginner" required /> Mới bắt đầu</label>
    <label><input type="radio" name="level" value="intermediate" /> Trung bình</label>
  </fieldset>

  <label for="city">Thành phố</label>
  <select id="city" name="city" required>
    <option value="">-- Chọn --</option>
    <option value="hn">Hà Nội</option>
    <option value="hcm">TP. Hồ Chí Minh</option>
  </select>

  <label for="note">Ghi chú</label>
  <textarea id="note" name="note" rows="4"></textarea>

  <button type="submit">Gửi</button>
</form>
```

- Checkbox: có thể tick nhiều; cùng `name` vẫn độc lập từng ô.
- Radio cùng `name="level"`: chỉ chọn được một cấp độ; `required` trên một radio trong nhóm thường đủ để bắt buộc chọn nhóm.
- `select` hiển thị danh sách; `option` rỗng `-- Chọn --` nhắc người dùng chọn.
- `textarea` cho ghi chú dài; `rows` gợi ý chiều cao.
- `fieldset` / `legend` nhóm câu hỏi liên quan (hữu ích cho tiếp cận).

## Lỗi thường gặp

- Cho radio khác `name` trong cùng một câu hỏi “chọn một” — người dùng có thể chọn nhiều.
- Dùng checkbox khi chỉ được chọn một phương án — hãy dùng radio hoặc `select`.
- Quên `required` trên trường bắt buộc rồi tự hỏi sao form vẫn gửi khi trống (trình duyệt có thể không chặn).

## Thử ngay

Dùng sandbox bên dưới để thêm checkbox và menu select. Khi bộ kiểm tra báo **Correct**, đánh dấu hoàn thành bài.
