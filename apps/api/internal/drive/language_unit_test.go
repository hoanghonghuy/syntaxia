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

func TestParseLessonFileFoundationUnitOrderZero(t *testing.T) {
	raw := `---
id: zh-hsk-b1-u00-pinyin
track: chinese-hsk
locale: en
slug: pinyin-syllables
title: Build a Mandarin syllable
order: -5
published: true
unit_id: zh-hsk-b1-pronunciation-00
unit_title: Pronunciation foundation
unit_order: 0
unit_can_do: Hear and reproduce core Mandarin sounds
unit_role: lesson
exercise:
  type: type_answer
  prompt: Type nǐ.
  answer: nǐ
---

Body.
`

	lesson, err := ParseLessonFile(FileEntry{
		Path:    "chinese-hsk/en/pinyin-syllables.md",
		Content: raw,
		FileID:  "foundation-unit-meta",
	})
	if err != nil {
		t.Fatal(err)
	}
	if got, exists := lesson.Exercise["unitOrder"]; !exists || got != 0 {
		t.Fatalf("unitOrder=%v, exists=%v, want authored 0", got, exists)
	}
}
