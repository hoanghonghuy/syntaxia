package sandbox

import (
	"errors"

	"github.com/jackc/pgx/v5/pgconn"
)

// Stable error codes returned to the web client for i18n mapping.
const (
	ErrCodeSyntax          = "syntax"
	ErrCodeUndefinedColumn = "undefined_column"
	ErrCodeUndefinedTable  = "undefined_table"
	ErrCodePermission      = "permission"
	ErrCodeWrongResult     = "wrong_result"
	ErrCodeGeneric         = "generic"
)

// Feedback is a learner-facing sandbox failure with a stable code and English fallback.
type Feedback struct {
	Code    string
	Message string
}

// HumanizePostgresError maps common Postgres errors to stable codes + clearer English messages.
// Unknown or non-Postgres errors fall back to ErrCodeGeneric.
func HumanizePostgresError(err error) Feedback {
	if err == nil {
		return Feedback{Code: ErrCodeGeneric, Message: "Something went wrong running your query."}
	}

	var pgErr *pgconn.PgError
	if errors.As(err, &pgErr) {
		switch pgErr.Code {
		case "42601":
			return Feedback{
				Code:    ErrCodeSyntax,
				Message: "SQL syntax error. Check keywords, commas, and quotes.",
			}
		case "42703":
			return Feedback{
				Code:    ErrCodeUndefinedColumn,
				Message: "That column name was not found. Check the spelling against the sample table.",
			}
		case "42P01":
			return Feedback{
				Code:    ErrCodeUndefinedTable,
				Message: "That table name was not found. Check the spelling against the sample table.",
			}
		case "42501":
			return Feedback{
				Code:    ErrCodePermission,
				Message: "This statement is not allowed in the sandbox for this exercise.",
			}
		}
	}

	return Feedback{
		Code:    ErrCodeGeneric,
		Message: "Your query could not be run. Check the SQL and try again.",
	}
}

// WrongResultFeedback marks a query that ran but did not match the expected result.
func WrongResultFeedback(detail string) Feedback {
	msg := "Your query ran, but the result does not match the expected answer."
	if detail != "" {
		msg = msg + " (" + detail + ")"
	}
	return Feedback{Code: ErrCodeWrongResult, Message: msg}
}
