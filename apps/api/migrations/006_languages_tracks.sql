-- Languages category placeholder: Chinese (HSK) track metadata only — no lesson bodies yet.
-- Pedagogy for languages will differ from IT sandboxes; same Syntaxia shell/UI.
INSERT INTO tracks (id, title, description, category, level, sort_order) VALUES
    (
        'chinese-hsk',
        '{"en":"Chinese (HSK)","vi":"Tiếng Trung (HSK)"}',
        '{"en":"Chinese learning path mapped to HSK 3.0 — under development. Language pedagogy will differ from IT lessons; same app shell.","vi":"Lộ trình tiếng Trung theo HSK 3.0 — đang phát triển. Cách học ngôn ngữ sẽ khác bài IT; cùng giao diện app."}',
        'languages',
        'basic',
        100
    )
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    sort_order = EXCLUDED.sort_order;
