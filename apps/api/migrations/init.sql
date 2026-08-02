-- Schema + sandbox role
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TYPE user_role AS ENUM ('admin', 'learner');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT,
    display_name TEXT NOT NULL DEFAULT '',
    role user_role NOT NULL DEFAULT 'learner',
    google_id TEXT UNIQUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE tracks (
    id TEXT PRIMARY KEY,
    title JSONB NOT NULL DEFAULT '{}',
    description JSONB NOT NULL DEFAULT '{}',
    category TEXT NOT NULL DEFAULT 'sql',
    level TEXT NOT NULL DEFAULT 'basic',
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE lessons (
    id TEXT NOT NULL,
    locale TEXT NOT NULL DEFAULT 'en',
    track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    slug TEXT NOT NULL,
    title TEXT NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    objectives JSONB NOT NULL DEFAULT '[]',
    drive_file_id TEXT,
    body_md TEXT NOT NULL DEFAULT '',
    body_html TEXT NOT NULL DEFAULT '',
    exercise JSONB NOT NULL DEFAULT '{}',
    sandbox_seed JSONB NOT NULL DEFAULT '{}',
    published BOOLEAN NOT NULL DEFAULT false,
    version INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (id, locale),
    UNIQUE (track_id, slug, locale)
);

CREATE TABLE lesson_progress (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false,
    completed_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, lesson_id, locale),
    FOREIGN KEY (lesson_id, locale) REFERENCES lessons(id, locale) ON DELETE CASCADE
);

CREATE TABLE lesson_notes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    body TEXT NOT NULL DEFAULT '',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (lesson_id, locale) REFERENCES lessons(id, locale) ON DELETE CASCADE
);

CREATE INDEX idx_lessons_track ON lessons(track_id, locale, sort_order);
CREATE INDEX idx_lesson_notes_user ON lesson_notes(user_id, lesson_id, locale);

-- Restricted sandbox role: CONNECT + TEMP only (no permanent table access)
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_roles WHERE rolname = 'syntaxia_sandbox') THEN
        CREATE ROLE syntaxia_sandbox LOGIN PASSWORD 'syntaxia_sandbox';
    END IF;
END
$$;

DO $$
BEGIN
  EXECUTE format('GRANT CONNECT ON DATABASE %I TO syntaxia_sandbox', current_database());
END
$$;
REVOKE ALL ON SCHEMA public FROM syntaxia_sandbox;
GRANT USAGE ON SCHEMA public TO syntaxia_sandbox;
DO $$
BEGIN
  ALTER ROLE syntaxia_sandbox NOSUPERUSER NOCREATEDB NOCREATEROLE;
EXCEPTION
  WHEN insufficient_privilege THEN
    -- Neon/managed PG: cannot toggle SUPERUSER attribute
    ALTER ROLE syntaxia_sandbox NOCREATEDB NOCREATEROLE;
END
$$;
-- TEMP tables are allowed by default for LOGIN roles; revoke table privileges if any
DO $$
DECLARE r RECORD;
BEGIN
  FOR r IN SELECT tablename FROM pg_tables WHERE schemaname = 'public' LOOP
    EXECUTE format('REVOKE ALL ON TABLE public.%I FROM syntaxia_sandbox', r.tablename);
  END LOOP;
END
$$;

INSERT INTO tracks (id, title, description, category, level, sort_order) VALUES
    ('sql-fundamentals', '{"en":"SQL Fundamentals","vi":"SQL cơ bản"}', '{"en":"Portable SQL aligned with SQLBolt","vi":"SQL chuẩn theo SQLBolt"}', 'sql', 'basic', 1),
    ('postgresql', '{"en":"PostgreSQL","vi":"PostgreSQL"}', '{"en":"PostgreSQL from basics to advanced","vi":"PostgreSQL từ cơ bản đến nâng cao"}', 'sql', 'intermediate', 2),
    ('html-basics', '{"en":"HTML Basics","vi":"HTML cơ bản"}', '{"en":"Semantic HTML mapped from the MDN Learn curriculum","vi":"HTML ngữ nghĩa theo lộ trình MDN Learn"}', 'web', 'basic', 5),
    ('css-basics', '{"en":"CSS Basics","vi":"CSS cơ bản"}', '{"en":"CSS fundamentals and Flexbox intro mapped from MDN Learn","vi":"Nền tảng CSS và Flexbox cơ bản theo MDN Learn"}', 'web', 'basic', 6),
    ('javascript-basics', '{"en":"JavaScript Basics","vi":"JavaScript cơ bản"}', '{"en":"Core language basics mapped from MDN JavaScript First Steps","vi":"Nền tảng ngôn ngữ theo MDN JavaScript First Steps"}', 'code', 'basic', 10),
    ('chinese-hsk', '{"en":"Chinese (HSK)","vi":"Tiếng Trung (HSK)"}', '{"en":"HSK 3.0 Band 1 starter path — Mandarin with vi/en explain. Recognition, pinyin, and short drills (not IT sandboxes).","vi":"Lộ trình HSK 3.0 Band 1 — tiếng Trung giải thích vi/en. Nhận chữ, pinyin và bài luyện ngắn (không phải sandbox IT)."}', 'languages', 'basic', 100),
    ('english-basics', '{"en":"English Basics","vi":"Tiếng Anh cơ bản"}', '{"en":"CEFR A1 starter path — English with vi/en explain. Recognition, optional IPA, and short drills (not IT sandboxes).","vi":"Lộ trình CEFR A1 — tiếng Anh giải thích vi/en. Nhận từ, IPA tùy chọn và bài luyện ngắn (không phải sandbox IT)."}', 'languages', 'basic', 110),
    ('japanese-jlpt', '{"en":"Japanese (JLPT)","vi":"Tiếng Nhật (JLPT)"}', '{"en":"JLPT N5 starter path — Japanese with vi/en explain. Recognition, kana readings, and short drills (not IT sandboxes).","vi":"Lộ trình JLPT N5 — tiếng Nhật giải thích vi/en. Nhận chữ, kana và bài luyện ngắn (không phải sandbox IT)."}', 'languages', 'basic', 120),
    ('chinese-it-vocab', '{"en":"Chinese IT Vocab","vi":"Từ vựng IT tiếng Trung"}', '{"en":"Specialty Chinese tech terminology with vi/en explain — starter path mapped from open IT glossaries (szdict). Recognition drills (not HSK Band pacing; not IT sandboxes).","vi":"Chuyên đề thuật ngữ IT tiếng Trung giải thích vi/en — lộ trình khởi đầu map từ glossary mở (szdict). Bài nhận chữ (không theo nhịp HSK Band; không phải sandbox IT)."}', 'languages', 'basic', 130)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category,
    level = EXCLUDED.level,
    sort_order = EXCLUDED.sort_order;
