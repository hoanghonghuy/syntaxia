-- Adaptive Learning V1 P1.1: deterministic server-graded language attempts.
-- Raw learner submissions are graded in memory and intentionally not persisted.
CREATE TABLE IF NOT EXISTS language_attempt_logs (
    id BIGSERIAL PRIMARY KEY,
    review_log_id BIGINT NOT NULL UNIQUE REFERENCES language_review_logs(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    track_id TEXT NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
    lesson_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    item_key TEXT NOT NULL,
    correct BOOLEAN NOT NULL,
    response_ms INT CHECK (response_ms IS NULL OR response_ms BETWEEN 0 AND 86400000),
    grader_version TEXT NOT NULL CHECK (length(trim(grader_version)) > 0),
    confidence DOUBLE PRECISION NOT NULL CHECK (confidence > 0 AND confidence <= 1),
    graded_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    FOREIGN KEY (lesson_id, locale) REFERENCES lessons(id, locale) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_language_attempt_logs_user_graded
    ON language_attempt_logs (user_id, track_id, locale, graded_at DESC);

ALTER TABLE skill_evidence
    ADD COLUMN IF NOT EXISTS attempt_log_id BIGINT REFERENCES language_attempt_logs(id) ON DELETE CASCADE;
ALTER TABLE skill_evidence
    ADD COLUMN IF NOT EXISTS confidence DOUBLE PRECISION NOT NULL DEFAULT 0.5;

ALTER TABLE skill_evidence DROP CONSTRAINT IF EXISTS skill_evidence_source_check;
ALTER TABLE skill_evidence DROP CONSTRAINT IF EXISTS skill_evidence_source_link_check;
ALTER TABLE skill_evidence DROP CONSTRAINT IF EXISTS skill_evidence_confidence_check;
ALTER TABLE skill_evidence
    ADD CONSTRAINT skill_evidence_source_check
    CHECK (source IN ('language_review', 'server_graded_attempt'));
ALTER TABLE skill_evidence
    ADD CONSTRAINT skill_evidence_source_link_check
    CHECK (
        (source = 'language_review' AND attempt_log_id IS NULL)
        OR
        (source = 'server_graded_attempt' AND attempt_log_id IS NOT NULL)
    );
ALTER TABLE skill_evidence
    ADD CONSTRAINT skill_evidence_confidence_check
    CHECK (confidence > 0 AND confidence <= 1);

ALTER TABLE learner_skill_mastery
    ADD COLUMN IF NOT EXISTS evidence_weight DOUBLE PRECISION;
UPDATE learner_skill_mastery
SET evidence_weight = evidence_count * 0.5
WHERE evidence_weight IS NULL;
ALTER TABLE learner_skill_mastery
    ALTER COLUMN evidence_weight SET NOT NULL;
ALTER TABLE learner_skill_mastery DROP CONSTRAINT IF EXISTS learner_skill_mastery_evidence_weight_check;
ALTER TABLE learner_skill_mastery
    ADD CONSTRAINT learner_skill_mastery_evidence_weight_check
    CHECK (evidence_weight > 0);
