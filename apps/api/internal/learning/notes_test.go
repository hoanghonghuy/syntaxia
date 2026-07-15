package learning

import "testing"

func TestNotePreview(t *testing.T) {
	got := NotePreview("  Hello world\n\nSecond paragraph  ", 20)
	if got != "Hello world Second…" {
		t.Fatalf("got %q", got)
	}
}

func TestNotePreviewShort(t *testing.T) {
	got := NotePreview("short", 40)
	if got != "short" {
		t.Fatalf("got %q", got)
	}
}

func TestNotePreviewEmpty(t *testing.T) {
	if NotePreview("   ", 40) != "" {
		t.Fatal("expected empty")
	}
}
