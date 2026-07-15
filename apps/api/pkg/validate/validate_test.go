package validate

import (
	"strings"
	"testing"
)

func TestPasswordMinLength(t *testing.T) {
	if err := Password("short"); err == nil {
		t.Fatal("expected error for short password")
	} else if !strings.Contains(err.Error(), "at least 8") {
		t.Fatalf("unexpected message: %v", err)
	}
	if err := Password("12345678"); err != nil {
		t.Fatalf("expected ok for 8 chars: %v", err)
	}
	if err := Password("mậtkhẩu1"); err != nil {
		t.Fatalf("expected ok for unicode 8 runes: %v", err)
	}
}

func TestEmailRequiredAndFormat(t *testing.T) {
	if err := Email(""); err == nil {
		t.Fatal("expected required")
	}
	if err := Email("not-an-email"); err == nil {
		t.Fatal("expected invalid")
	}
	if err := Email("  learner@example.com  "); err != nil {
		t.Fatalf("expected ok: %v", err)
	}
}

func TestDisplayName(t *testing.T) {
	if err := DisplayName(""); err == nil {
		t.Fatal("expected required")
	}
	if err := DisplayName("   "); err == nil {
		t.Fatal("expected required for whitespace")
	}
	long := strings.Repeat("a", 81)
	if err := DisplayName(long); err == nil {
		t.Fatal("expected max length")
	}
	if err := DisplayName("  Learner One  "); err != nil {
		t.Fatalf("expected ok: %v", err)
	}
}

func TestPasswordsDiffer(t *testing.T) {
	if err := PasswordsDiffer("samepass1", "samepass1"); err == nil {
		t.Fatal("expected error when passwords match")
	}
	if err := PasswordsDiffer("oldpass12", "newpass12"); err != nil {
		t.Fatalf("expected ok: %v", err)
	}
}

func TestNoteBodyMaxLength(t *testing.T) {
	if err := NoteBody(strings.Repeat("a", MaxNoteBodyRunes+1)); err == nil {
		t.Fatal("expected too long")
	}
	if err := NoteBody("short note"); err != nil {
		t.Fatalf("expected ok: %v", err)
	}
}
