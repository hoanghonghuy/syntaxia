package service

import (
	"testing"
	"time"

	"github.com/google/uuid"
	fsrs "github.com/open-spaced-repetition/go-fsrs/v4"

	"syntaxia/apps/api/internal/domain"
)

func TestScheduleLanguageReviewNewCard(t *testing.T) {
	now := time.Date(2026, time.August, 20, 8, 0, 0, 0, time.UTC)
	before := domain.LanguageReviewCard{
		UserID:   uuid.MustParse("11111111-1111-1111-1111-111111111111"),
		TrackID:  "english-basics",
		LessonID: "en-a1-01-greetings",
		Locale:   "en",
		ItemKey:  "greet-response",
		DueAt:    now,
	}
	responseMS := 3200

	after, log, err := scheduleLanguageReview(before, fsrs.Good, &responseMS, now)
	if err != nil {
		t.Fatalf("scheduleLanguageReview returned error: %v", err)
	}
	if after.Reps != 1 {
		t.Fatalf("expected reps=1, got %d", after.Reps)
	}
	if after.LastReviewAt == nil || !after.LastReviewAt.Equal(now) {
		t.Fatalf("expected last review %v, got %v", now, after.LastReviewAt)
	}
	if after.DueAt.Before(now) {
		t.Fatalf("next due must not be before review time: %v", after.DueAt)
	}
	if log.Rating != int16(fsrs.Good) {
		t.Fatalf("expected Good log rating, got %d", log.Rating)
	}
	if log.StateBefore != before.State || log.StateAfter != after.State {
		t.Fatalf("log state mismatch: before=%d/%d after=%d/%d", log.StateBefore, before.State, log.StateAfter, after.State)
	}
	if !log.DueBefore.Equal(before.DueAt) || !log.DueAfter.Equal(after.DueAt) {
		t.Fatal("review log must preserve due-before and due-after")
	}
}

func TestScheduleLanguageReviewAgainThenGood(t *testing.T) {
	now := time.Date(2026, time.August, 20, 8, 0, 0, 0, time.UTC)
	card := domain.LanguageReviewCard{
		UserID:   uuid.MustParse("22222222-2222-2222-2222-222222222222"),
		TrackID:  "chinese-hsk",
		LessonID: "zh-hsk-01-greetings",
		Locale:   "vi",
		ItemKey:  "greet-meaning",
		DueAt:    now,
	}

	afterAgain, _, err := scheduleLanguageReview(card, fsrs.Again, nil, now)
	if err != nil {
		t.Fatalf("Again transition failed: %v", err)
	}
	if afterAgain.Reps != 1 {
		t.Fatalf("expected first review to increment reps, got %d", afterAgain.Reps)
	}

	afterGood, _, err := scheduleLanguageReview(afterAgain, fsrs.Good, nil, now.Add(time.Second))
	if err != nil {
		t.Fatalf("Good transition failed: %v", err)
	}
	if afterGood.Reps != 2 {
		t.Fatalf("expected second review to increment reps, got %d", afterGood.Reps)
	}
	if afterGood.LastReviewAt == nil || !afterGood.LastReviewAt.Equal(now.Add(time.Second)) {
		t.Fatalf("unexpected last review: %v", afterGood.LastReviewAt)
	}
}

func TestToFSRSCardRejectsNegativeCounters(t *testing.T) {
	_, err := toFSRSCard(domain.LanguageReviewCard{ScheduledDays: -1})
	if err == nil {
		t.Fatal("expected negative persisted counters to be rejected")
	}
}
