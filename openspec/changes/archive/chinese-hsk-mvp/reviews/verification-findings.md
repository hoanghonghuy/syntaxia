# Verification findings — chinese-hsk-mvp

## Iteration 1

| ID | Severity | Dimension | source | Finding |
|----|----------|-----------|--------|---------|
| F1 | WARNING | D4 | mcp | `search_decisions` failed / wrong Surreal target during verify |
| F2 | WARNING | D5 | mcp | `diff_impact` returned other workspace (`taskflow-mvp`) via Cursor MCP |
| F3 | WARNING | openspec_verify | mcp | `openspec_verify` Not connected / missing files from wrong root; local files exist |
| F4 | WARNING | smoke | static | Live browser mark-complete not run (API down); replaced by curriculum self-grade + Go parse smoke |
| F5 | SUGGESTION | ops | static | Apply `007` + restart API for DB catalog sync |

No CRITICAL findings in iteration 1.
