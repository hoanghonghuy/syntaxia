-- chinese-it-vocab: specialty MVP copy (lessons under docs/curriculum/chinese-it-vocab/).
UPDATE tracks
SET
    title = '{"en":"Chinese IT Vocab","vi":"Từ vựng IT tiếng Trung"}',
    description = '{"en":"Specialty Chinese tech terminology with vi/en explain — starter path mapped from open IT glossaries (szdict). Recognition drills (not HSK Band pacing; not IT sandboxes).","vi":"Chuyên đề thuật ngữ IT tiếng Trung giải thích vi/en — lộ trình khởi đầu map từ glossary mở (szdict). Bài nhận chữ (không theo nhịp HSK Band; không phải sandbox IT)."}'
WHERE id = 'chinese-it-vocab';
