package repository

import (
	"context"
	"os"
	"testing"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
)

// Integration: colliding language slugs (greetings) must resolve by track_id.
func TestGetLessonDisambiguatesByTrack(t *testing.T) {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		dsn = "postgres://syntaxia:syntaxia@127.0.0.1:5432/syntaxia?sslmode=disable"
	}
	ctx, cancel := context.WithTimeout(context.Background(), 8*time.Second)
	defer cancel()
	pool, err := pgxpool.New(ctx, dsn)
	if err != nil {
		t.Skipf("no postgres: %v", err)
	}
	defer pool.Close()
	if err := pool.Ping(ctx); err != nil {
		t.Skipf("postgres unreachable: %v", err)
	}

	repo := New(pool)

	en, err := repo.GetLesson(ctx, "greetings", "en", "english-basics")
	if err != nil {
		t.Fatalf("english-basics greetings: %v", err)
	}
	if en.TrackID != "english-basics" {
		t.Fatalf("want track english-basics, got %q (id=%s)", en.TrackID, en.ID)
	}
	if en.ID != "en-a1-01-greetings" {
		t.Fatalf("want id en-a1-01-greetings, got %q", en.ID)
	}

	zh, err := repo.GetLesson(ctx, "greetings", "en", "chinese-hsk")
	if err != nil {
		t.Fatalf("chinese-hsk greetings: %v", err)
	}
	if zh.TrackID != "chinese-hsk" || zh.ID != "zh-hsk-b1-01-greetings" {
		t.Fatalf("chinese mismatch: track=%s id=%s", zh.TrackID, zh.ID)
	}
}
