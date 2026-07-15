package sandbox

import (
	"context"
	"fmt"
	"strings"
	"time"

	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"syntaxia/apps/api/internal/domain"
	"syntaxia/apps/api/pkg/apperrors"
	"syntaxia/apps/api/pkg/constants"
)

type Runner struct {
	pool *pgxpool.Pool
}

func NewRunner(pool *pgxpool.Pool) *Runner {
	return &Runner{pool: pool}
}

func (r *Runner) Run(ctx context.Context, sql string, seed map[string]any, expected map[string]any) (domain.SandboxResult, error) {
	sql = strings.TrimSpace(sql)
	if sql == "" {
		return domain.SandboxResult{}, apperrors.Validation("sql is required")
	}
	if strings.Contains(sql, ";") {
		trimmed := strings.TrimSuffix(sql, ";")
		if strings.Contains(trimmed, ";") {
			return domain.SandboxResult{}, apperrors.BadRequest("only one SQL statement allowed")
		}
		sql = trimmed
	}

	allowMutations := false
	verifySQL := ""
	if seed != nil {
		if v, ok := seed["allow_mutations"].(bool); ok {
			allowMutations = v
		}
		if v, ok := seed["verify_sql"].(string); ok {
			verifySQL = strings.TrimSpace(v)
		}
	}

	if !statementAllowed(sql, allowMutations) {
		return domain.SandboxResult{}, apperrors.BadRequest("statement type is not allowed in this exercise")
	}

	ctx, cancel := context.WithTimeout(ctx, time.Duration(constants.SandboxTimeoutMs)*time.Millisecond)
	defer cancel()

	conn, err := r.pool.Acquire(ctx)
	if err != nil {
		return domain.SandboxResult{}, apperrors.Internal(err)
	}
	defer func() {
		conn.Release()
	}()

	tx, err := conn.Begin(ctx)
	if err != nil {
		return domain.SandboxResult{}, apperrors.Internal(err)
	}
	defer func() { _ = tx.Rollback(ctx) }()

	if _, err := tx.Exec(ctx, "SET LOCAL statement_timeout = '5s'"); err != nil {
		return domain.SandboxResult{}, apperrors.Internal(err)
	}
	if _, err := tx.Exec(ctx, "SET LOCAL search_path TO pg_temp"); err != nil {
		return domain.SandboxResult{}, apperrors.Internal(err)
	}

	if err := applySeed(ctx, tx, seed); err != nil {
		return domain.SandboxResult{}, apperrors.Internal(err)
	}

	gradeSQL := sql
	if verifySQL != "" {
		if _, err := tx.Exec(ctx, sql); err != nil {
			_ = tx.Rollback(ctx)
			fb := HumanizePostgresError(err)
			return domain.SandboxResult{Passed: false, Code: fb.Code, Message: fb.Message}, nil
		}
		gradeSQL = verifySQL
	}

	rows, err := tx.Query(ctx, gradeSQL)
	if err != nil {
		_ = tx.Rollback(ctx)
		fb := HumanizePostgresError(err)
		return domain.SandboxResult{Passed: false, Code: fb.Code, Message: fb.Message}, nil
	}

	cols := rows.FieldDescriptions()
	columns := make([]string, len(cols))
	for i, c := range cols {
		columns[i] = c.Name
	}

	var data [][]any
	for rows.Next() {
		values, err := rows.Values()
		if err != nil {
			rows.Close()
			_ = tx.Rollback(ctx)
			return domain.SandboxResult{}, apperrors.Internal(err)
		}
		data = append(data, values)
		if len(data) >= constants.SandboxMaxRows {
			break
		}
	}
	rowsErr := rows.Err()
	rows.Close()
	if rowsErr != nil {
		_ = tx.Rollback(ctx)
		fb := HumanizePostgresError(rowsErr)
		return domain.SandboxResult{Passed: false, Code: fb.Code, Message: fb.Message}, nil
	}

	passed, msg := grade(columns, data, expected)
	_ = tx.Rollback(ctx)

	result := domain.SandboxResult{
		Columns: columns,
		Rows:    data,
		Passed:  passed,
		Message: msg,
	}
	if !passed {
		fb := WrongResultFeedback(msg)
		result.Code = fb.Code
		result.Message = fb.Message
	}
	return result, nil
}

// statementAllowed reports whether sql may run for this exercise.
// allowMutations unlocks INSERT/UPDATE/DELETE and TEMP-safe DDL (CREATE/ALTER/DROP).
// TRUNCATE/GRANT/REVOKE/COPY/DO/CALL stay blocked. Read-only exercises allow SELECT/WITH only.
func statementAllowed(sql string, allowMutations bool) bool {
	upper := strings.ToUpper(strings.TrimSpace(sql))
	for _, b := range []string{
		"TRUNCATE ", "GRANT ", "REVOKE ", "COPY ", "DO ", "CALL ", "EXECUTE ",
	} {
		if strings.Contains(upper, b) {
			return false
		}
	}
	readPrefixes := []string{"SELECT", "WITH", "EXPLAIN", "TABLE"}
	mutPrefixes := []string{"INSERT", "UPDATE", "DELETE", "CREATE", "ALTER", "DROP"}
	if allowMutations {
		for _, p := range append(readPrefixes, mutPrefixes...) {
			if strings.HasPrefix(upper, p) {
				return true
			}
		}
		return false
	}
	for _, p := range readPrefixes {
		if strings.HasPrefix(upper, p) {
			return true
		}
	}
	return false
}

func applySeed(ctx context.Context, tx pgx.Tx, seed map[string]any) error {
	if seed == nil {
		return nil
	}
	ddl, _ := seed["ddl"].([]any)
	for _, stmt := range ddl {
		s, ok := stmt.(string)
		if !ok || strings.TrimSpace(s) == "" {
			continue
		}
		if _, err := tx.Exec(ctx, s); err != nil {
			return fmt.Errorf("seed ddl: %w", err)
		}
	}
	return nil
}

func grade(columns []string, rows [][]any, expected map[string]any) (bool, string) {
	if expected == nil {
		return false, "no expected result configured"
	}
	expCols, ok := expected["columns"].([]any)
	if !ok || len(expCols) == 0 {
		return false, "invalid expected columns"
	}
	if len(expCols) != len(columns) {
		return false, "column count mismatch"
	}
	for i, c := range expCols {
		if fmt.Sprint(c) != columns[i] {
			return false, fmt.Sprintf("expected column %q at position %d", c, i+1)
		}
	}
	expRows, ok := expected["rows"].([]any)
	if !ok {
		return false, "invalid expected rows"
	}
	if len(expRows) != len(rows) {
		return false, fmt.Sprintf("expected %d rows, got %d", len(expRows), len(rows))
	}
	for i, er := range expRows {
		expRow, ok := er.([]any)
		if !ok {
			continue
		}
		if len(expRow) != len(rows[i]) {
			return false, fmt.Sprintf("row %d column count mismatch", i+1)
		}
		for j, v := range expRow {
			if fmt.Sprint(v) != fmt.Sprint(rows[i][j]) {
				return false, fmt.Sprintf("row %d col %d mismatch", i+1, j+1)
			}
		}
	}
	return true, "correct"
}
