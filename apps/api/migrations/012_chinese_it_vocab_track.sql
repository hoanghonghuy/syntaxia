-- Languages: Chinese IT vocabulary specialty track (placeholder).
-- No lesson bodies until szdict/MIT-mapped chinese-it-vocab-map + OpenSpec content MVP.
INSERT INTO tracks (id, title, description, category, level, sort_order) VALUES
    (
        'chinese-it-vocab',
        '{"en":"Chinese IT Vocab","vi":"Từ vựng IT tiếng Trung"}',
        '{"en":"Specialty Chinese tech terminology with vi/en explain — under development. Mapped from open IT glossaries (not HSK Band pacing; not IT sandboxes).","vi":"Chuyên đề thuật ngữ IT tiếng Trung giải thích vi/en — đang phát triển. Map từ glossary mở (không theo nhịp HSK Band; không phải sandbox IT)."}',
        'languages',
        'basic',
        130
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    sort_order = EXCLUDED.sort_order;
