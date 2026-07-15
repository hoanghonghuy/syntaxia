package sandbox

import (
	"errors"
	"testing"

	"github.com/jackc/pgx/v5/pgconn"
)

func TestHumanizePostgresError_Syntax(t *testing.T) {
	err := &pgconn.PgError{Code: "42601", Message: "syntax error at or near \"SELCT\""}
	got := HumanizePostgresError(err)
	if got.Code != ErrCodeSyntax {
		t.Fatalf("code: got %q want %q", got.Code, ErrCodeSyntax)
	}
	if got.Message == "" || got.Message == err.Message {
		t.Fatalf("expected clearer English message, got %q", got.Message)
	}
}

func TestHumanizePostgresError_UndefinedColumn(t *testing.T) {
	err := &pgconn.PgError{Code: "42703", Message: "column \"titel\" does not exist"}
	got := HumanizePostgresError(err)
	if got.Code != ErrCodeUndefinedColumn {
		t.Fatalf("code: got %q want %q", got.Code, ErrCodeUndefinedColumn)
	}
}

func TestHumanizePostgresError_UndefinedTable(t *testing.T) {
	err := &pgconn.PgError{Code: "42P01", Message: "relation \"movie\" does not exist"}
	got := HumanizePostgresError(err)
	if got.Code != ErrCodeUndefinedTable {
		t.Fatalf("code: got %q want %q", got.Code, ErrCodeUndefinedTable)
	}
}

func TestHumanizePostgresError_Permission(t *testing.T) {
	err := &pgconn.PgError{Code: "42501", Message: "permission denied for table movies"}
	got := HumanizePostgresError(err)
	if got.Code != ErrCodePermission {
		t.Fatalf("code: got %q want %q", got.Code, ErrCodePermission)
	}
}

func TestHumanizePostgresError_GenericFallback(t *testing.T) {
	err := &pgconn.PgError{Code: "22012", Message: "division by zero"}
	got := HumanizePostgresError(err)
	if got.Code != ErrCodeGeneric {
		t.Fatalf("code: got %q want %q", got.Code, ErrCodeGeneric)
	}
	if got.Message == "" {
		t.Fatal("expected non-empty fallback message")
	}
}

func TestHumanizePostgresError_WrappedPgError(t *testing.T) {
	inner := &pgconn.PgError{Code: "42P01", Message: "relation \"x\" does not exist"}
	err := errors.Join(errors.New("query failed"), inner)
	got := HumanizePostgresError(err)
	if got.Code != ErrCodeUndefinedTable {
		t.Fatalf("code: got %q want %q", got.Code, ErrCodeUndefinedTable)
	}
}

func TestHumanizePostgresError_NonPgError(t *testing.T) {
	got := HumanizePostgresError(errors.New("connection reset"))
	if got.Code != ErrCodeGeneric {
		t.Fatalf("code: got %q want %q", got.Code, ErrCodeGeneric)
	}
}

func TestWrongResultFeedback(t *testing.T) {
	got := WrongResultFeedback("column count mismatch")
	if got.Code != ErrCodeWrongResult {
		t.Fatalf("code: got %q want %q", got.Code, ErrCodeWrongResult)
	}
	if got.Message == "" {
		t.Fatal("expected English fallback message")
	}
}
