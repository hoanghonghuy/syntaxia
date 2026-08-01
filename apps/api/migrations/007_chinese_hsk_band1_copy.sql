-- chinese-hsk: Band 1 MVP copy (lessons ship under docs/curriculum/chinese-hsk/).
UPDATE tracks
SET
    title = '{"en":"Chinese (HSK)","vi":"Tiếng Trung (HSK)"}',
    description = '{"en":"HSK 3.0 Band 1 starter path — Mandarin with vi/en explain. Recognition, pinyin, and short drills (not IT sandboxes).","vi":"Lộ trình HSK 3.0 Band 1 — tiếng Trung giải thích vi/en. Nhận chữ, pinyin và bài luyện ngắn (không phải sandbox IT)."}'
WHERE id = 'chinese-hsk';
