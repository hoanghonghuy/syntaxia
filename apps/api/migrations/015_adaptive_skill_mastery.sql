-- Adaptive Learning V1: immutable skill evidence plus current learner mastery.
-- Skill ids are authored stable strings in curriculum items; a separate taxonomy
-- table is intentionally deferred until cross-domain naming has proven stable.
CREATE TABLE IF NOT EXISTS skill_evidence (
    id BIGSERIAL PRIMARY KEY,
    review_log_id BIGINT NOT NULL REFERENCES language_review_logs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    item_key TEXT NOT NULL,
    skill_id TEXT NOT NULL CHECK (length(trim(skill_id)) > 0),
    source TEXT NOT NULL DEFAULT 'language_review' CHECK (source = 'language_review'),
    rating SMALLINT NOT NULL CHECK (rating BETWEEN 1 AND 4),
    observation_score DOUBLE PRECISION NOT NULL CHECK (observation_score BETWEEN 0 AND 100),
    observed_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (lesson_id, locale) REFERENCES lessons(id, locale) ON DELETE CASCADE,
    UNIQUE (review_log_id, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_skill_evidence_user_skill
    ON skill_evidence (user_id, track_id, locale, skill_id, observed_at DESC);

CREATE TABLE IF NOT EXISTS learner_skill_mastery (
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    locale TEXT NOT NULL,
    skill_id TEXT NOT NULL CHECK (length(trim(skill_id)) > 0),
    score DOUBLE PRECISION NOT NULL CHECK (score BETWEEN 0 AND 100),
    evidence_count BIGINT NOT NULL DEFAULT 1 CHECK (evidence_count > 0),
    last_evidence_at TIMESTAMPTZ NOT NULL,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, track_id, locale, skill_id)
);

CREATE INDEX IF NOT EXISTS idx_learner_skill_mastery_weakest
    ON learner_skill_mastery (user_id, track_id, locale, score ASC, skill_id ASC);
