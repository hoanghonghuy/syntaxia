package content

import "testing"

func TestBuiltinTracksOwnCurrentCatalog(t *testing.T) {
	tracks := BuiltinTracks()
	if len(tracks) != 9 {
		t.Fatalf("expected 9 built-in tracks, got %d", len(tracks))
	}

	seen := map[string]bool{}
	for _, track := range tracks {
		if track.ID == "" || track.Category == "" || track.Level == "" {
			t.Fatalf("incomplete track metadata: %+v", track)
		}
		if track.Title["en"] == "" || track.Title["vi"] == "" {
			t.Fatalf("track %s missing EN/VI titles", track.ID)
		}
		if track.Description["en"] == "" || track.Description["vi"] == "" {
			t.Fatalf("track %s missing EN/VI descriptions", track.ID)
		}
		if seen[track.ID] {
			t.Fatalf("duplicate track id %s", track.ID)
		}
		seen[track.ID] = true
	}

	for _, required := range []string{
		"chinese-hsk",
		"english-basics",
		"japanese-jlpt",
		"chinese-it-vocab",
	} {
		if !seen[required] {
			t.Fatalf("missing language track %s", required)
		}
	}
}
