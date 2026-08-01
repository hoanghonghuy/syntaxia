# Verification findings — layout-shell-simplify

| ID | Severity | Source | Iteration | Finding | Recommendation |
|----|----------|--------|-----------|---------|----------------|
| W1 | WARNING | static | 1 | MCP `CallMcpTool` Not connected for openspec_verify / diff_impact / search_decisions | Reload MCP; prefer `syn --workspace` at repo root |
| W2 | WARNING | static | 1 | REQ-SHELL-NAV-003 “single” vs design dual hamburger+footer Lessons | Keep as designed; optionally soften delta wording later |
| W3 | WARNING | static | 1 | syn doctor: process workspace ≠ config root | Open IDE at monorepo root |
| S1 | SUGGESTION | static | 1 | No live browser pass this session | Manual smoke on phone width |
