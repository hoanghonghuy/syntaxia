package domain

import (
	"encoding/json"
	"strings"
	"testing"
)

func TestLessonSummarySerializesFoundationUnitOrderZero(t *testing.T) {
	raw, err := json.Marshal(LessonSummary{
		ID:        "zh-hsk-b1-u00-pinyin",
		Locale:    "en",
		TrackID:   "chinese-hsk",
		Slug:      "pinyin-syllables",
		Title:     "Build a Mandarin syllable",
		SortOrder: -5,
		Published: true,
		UnitID:    "zh-hsk-b1-pronunciation-00",
		UnitOrder: 0,
		UnitRole:  "lesson",
	})
	if err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(string(raw), `"unitOrder":0`) {
		t.Fatalf("foundation unit order was omitted from JSON: %s", raw)
	}
}
