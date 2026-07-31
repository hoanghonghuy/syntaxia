-- Repair track i18n JSON corrupted by non-UTF8 migrate pipes (Windows → docker psql).
-- Safe to re-run: ON CONFLICT updates title/description.
INSERT INTO tracks (id, title, description, category, level, sort_order) VALUES
    ('sql-fundamentals', '{"en":"SQL Fundamentals","vi":"SQL cơ bản"}', '{"en":"Portable SQL aligned with SQLBolt","vi":"SQL chuẩn theo SQLBolt"}', 'sql', 'basic', 1),
    ('postgresql', '{"en":"PostgreSQL","vi":"PostgreSQL"}', '{"en":"PostgreSQL from basics to advanced","vi":"PostgreSQL từ cơ bản đến nâng cao"}', 'sql', 'intermediate', 2),
    ('html-basics', '{"en":"HTML Basics","vi":"HTML cơ bản"}', '{"en":"Semantic HTML mapped from the MDN Learn curriculum","vi":"HTML ngữ nghĩa theo lộ trình MDN Learn"}', 'web', 'basic', 5),
    ('css-basics', '{"en":"CSS Basics","vi":"CSS cơ bản"}', '{"en":"CSS fundamentals and Flexbox intro mapped from MDN Learn","vi":"Nền tảng CSS và Flexbox cơ bản theo MDN Learn"}', 'web', 'basic', 6),
    ('javascript-basics', '{"en":"JavaScript Basics","vi":"JavaScript cơ bản"}', '{"en":"Core language basics mapped from MDN JavaScript First Steps","vi":"Nền tảng ngôn ngữ theo MDN JavaScript First Steps"}', 'code', 'basic', 10),
    ('chinese-hsk', '{"en":"Chinese (HSK)","vi":"Tiếng Trung (HSK)"}', '{"en":"Chinese learning path mapped to HSK 3.0 — under development. Language pedagogy will differ from IT lessons; same app shell.","vi":"Lộ trình tiếng Trung theo HSK 3.0 — đang phát triển. Cách học ngôn ngữ sẽ khác bài IT; cùng giao diện app."}', 'languages', 'basic', 100)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    sort_order = EXCLUDED.sort_order;
