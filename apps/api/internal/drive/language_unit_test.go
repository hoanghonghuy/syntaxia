package drive

import "testing"

func TestParseLessonFileCommunicativeUnitMetadata(t *testing.T) {
	raw := `---
id: en-a1-01-greetings
track: english-basics
locale: en
slug: greetings
title: Meet someone and say hello
order: 1
published: true
unit_id: en-a1-meeting-01
unit_title: Meet someone
unit_order: 1
unit_can_do: Start, sustain, and close a short first meeting
unit_role: lesson
exercise:
  type: mcq
  prompt: Pick the greeting.
  choices: [hello, goodbye]
  answer: hello
---

Body.
`

	lesson, err := ParseLessonFile(FileEntry{
		Path:    "english-basics/en/greetings.md",
		Content: raw,
		FileID:  "unit-meta",
	})
	if err != nil {
		t.Fatal(err)
	}

	want := map[string]any{
		"unitId":    "en-a1-meeting-01",
		"unitTitle": "Meet someone",
		"unitOrder": 1,
		"unitCanDo": "Start, sustain, and close a short first meeting",
		"unitRole":  "lesson",
	}
	for key, expected := range want {
		if got := lesson.Exercise[key]; got != expected {
			t.Fatalf("%s=%v, want %v", key, got, expected)
		}
	}
}
