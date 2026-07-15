/**
 * Runs all audit-remediation unit tests (TDD gates).
 */
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const root = path.dirname(fileURLToPath(import.meta.url))
const scripts = [
  'check-sandbox-state.mjs',
  'check-lesson-load.mjs',
  'check-note-save.mjs',
  'check-locale-reload.mjs',
  'check-catalog-load.mjs',
  'check-locale-switch.mjs',
  'check-auth-redirect.mjs',
]

let failed = false
for (const script of scripts) {
  const res = spawnSync(
    process.execPath,
    ['--experimental-strip-types', '--test', path.join(root, script)],
    { stdio: 'inherit', cwd: path.join(root, '..') },
  )
  if (res.status !== 0) failed = true
}
process.exit(failed ? 1 : 0)
