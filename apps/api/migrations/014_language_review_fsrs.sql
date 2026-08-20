-- Persistent per-item memory state for language learning (FSRS-6).
CREATE TABLE IF NOT EXISTS language_review_cards (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    item_key TEXT NOT NULL,
    due_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    stability DOUBLE PRECISION NOT NULL DEFAULT 0,
    difficulty DOUBLE PRECISION NOT NULL DEFAULT 0,
    scheduled_days BIGINT NOT NULL DEFAULT 0 CHECK (scheduled_days >= 0),
    reps BIGINT NOT NULL DEFAULT 0 CHECK (reps >= 0),
    lapses BIGINT NOT NULL DEFAULT 0 CHECK (lapses >= 0),
    state SMALLINT NOT NULL DEFAULT 0 CHECK (state BETWEEN 0 AND 3),
    last_review_at TIMESTAMPTZ,
    remaining_steps INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, lesson_id, locale, item_key)
);

CREATE INDEX IF NOT EXISTS idx_language_review_cards_due
    ON language_review_cards (user_id, track_id, locale, due_at);

CREATE TABLE IF NOT EXISTS language_review_logs (
    id BIGSERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    track_id TEXT NOT NULL,
    lesson_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    item_key TEXT NOT NULL,
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 4),
    response_ms INT CHECK (response_ms IS NULL OR response_ms >= 0),
    reviewed_at TIMESTAMPTZ NOT NULL,
    due_before TIMESTAMPTZ NOT NULL,
    due_after TIMESTAMPTZ NOT NULL,
    state_before SMALLINT NOT NULL,
    state_after SMALLINT NOT NULL,
    stability_before DOUBLE PRECISION NOT NULL,
    stability_after DOUBLE PRECISION NOT NULL,
    difficulty_before DOUBLE PRECISION NOT NULL,
    difficulty_after DOUBLE PRECISION NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_language_review_logs_user_reviewed
    ON language_review_logs (user_id, reviewed_at DESC);
