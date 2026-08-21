import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const repoRoot = path.resolve(import.meta.dirname, '../../..')
const read = (relative) => fs.readFileSync(path.join(repoRoot, relative), 'utf8')

test('canonical Product CI protects develop and main promotion paths', () => {
  const workflow = read('.github/workflows/product-ci.yml')
  assert.match(workflow, /pull_request:/)
  assert.match(workflow, /push:/)
  assert.match(workflow, /- develop/)
  assert.match(workflow, /- main/)
  assert.match(workflow, /Curriculum · structure and parity/)
  assert.match(workflow, /API · Go verify, test and vet/)
  assert.match(workflow, /Web · build and regression/)
  assert.match(workflow, /DB-backed E2E/)
  assert.match(workflow, /-IncludeSandboxes/)
})

test('release smoke is full-product rather than a partial package subset', () => {
  const smoke = read('scripts/release-smoke.ps1')
  assert.match(smoke, /e2e-all\.ps1.*-IncludeSandboxes/)
  assert.match(smoke, /go test -mod=readonly \.\/\.\.\./)
  assert.match(smoke, /go vet -mod=readonly \.\/\.\.\./)
  assert.match(smoke, /Invoke-Npm "build"/)
  assert.match(smoke, /test:product-flows/)
  assert.match(smoke, /test:ui-system/)
  assert.match(smoke, /test:language-v3/)
  assert.match(smoke, /test:e2e-suite/)
})

test('release documentation locks feature to develop to main discipline', () => {
  const policy = read('docs/processes/branch-release-policy.md')
  const hardening = read('docs/processes/release-hardening.md')
  assert.match(policy, /feature.*develop.*main/s)
  assert.match(policy, /Require pull requests before merging/)
  assert.match(hardening, /develop.*main/s)
  assert.match(hardening, /Product CI/)
})
