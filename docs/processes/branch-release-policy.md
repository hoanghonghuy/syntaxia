# Branch and release policy

## Purpose

Keep `develop` as the integrated, continuously releasable development line and `main` as the production release line.

## Branch flow

1. Create work from the latest `develop` using `feature/<scope>`, `fix/<scope>` or `chore/<scope>`.
2. Open a draft pull request to `develop` early so canonical CI runs on every PR update.
3. Merge only when the canonical Product CI is green and review comments are resolved.
4. Promote releases with a dedicated `develop → main` pull request.
5. Never develop directly on `main`.

## Required merge gates

For pull requests to `develop` and `main`:

- Curriculum structure/parity checks.
- Go module graph, tests and `go vet`.
- Nuxt production build and UI/language regression suites.
- PostgreSQL-backed cross-domain E2E and FSRS persistence assertions.
- Deployment provider status when configured.

## Repository settings

GitHub branch protection/rulesets are repository settings and must mirror this policy:

- Protect both `develop` and `main` from deletion and force-push.
- Require pull requests before merging.
- Require the canonical Product CI checks.
- Require branches to be up to date before merge when practical.
- `main` accepts release PRs from `develop`; feature work targets `develop`.

The repository connector used by automation does not expose branch-protection writes, so the settings are verified separately from code changes rather than silently assumed.

## Release discipline

- `develop` should always be deployable.
- `main` is a release snapshot, not a second development branch.
- Do not bypass failed CI by weakening tests or lowering exact inventory/parity expectations.
- If a provider check fails for an external quota/rate-limit reason, record it explicitly and re-run deployment smoke before promotion.

## Related

- [`product-perfection-checklist.md`](./product-perfection-checklist.md)
- [`release-hardening.md`](./release-hardening.md)
- [`production-deploy.md`](./production-deploy.md)
