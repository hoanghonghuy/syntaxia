package validate

import "testing"

func TestSafeRedirectPath(t *testing.T) {
	if SafeRedirectPath("/tracks/sql-fundamentals") != "/tracks/sql-fundamentals" {
		t.Fatal("expected relative path")
	}
	if SafeRedirectPath("https://evil.example") != "/" {
		t.Fatal("rejected absolute URL")
	}
	if SafeRedirectPath("//evil.example") != "/" {
		t.Fatal("rejected protocol-relative")
	}
	if SafeRedirectPath("") != "/" {
		t.Fatal("empty defaults to /")
	}
}
