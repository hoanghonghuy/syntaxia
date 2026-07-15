const base = process.env.SYNTAXIA_API || 'http://127.0.0.1:8082'

function cookieFrom(res) {
  const raw = typeof res.headers.getSetCookie === 'function' ? res.headers.getSetCookie() : []
  if (raw.length) return raw.map((c) => c.split(';')[0]).join('; ')
  const single = res.headers.get('set-cookie')
  return single ? single.split(';')[0] : ''
}

async function main() {
  const email = `verify_pg_${Date.now()}@test.local`
  const reg = await fetch(`${base}/api/v1/auth/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password: 'password123', displayName: 'VerifyPG' }),
  })
  if (!reg.ok) throw new Error(`register ${reg.status}`)
  const cookie = cookieFrom(reg)

  const lessons = await (
    await fetch(`${base}/api/v1/lessons?track=postgresql&locale=en`, { headers: { cookie } })
  ).json()
  console.log('PG lessons:', lessons.length)
  const fail = []
  for (const sum of lessons.sort((a, b) => a.sortOrder - b.sortOrder)) {
    const lesson = await (
      await fetch(`${base}/api/v1/lessons/${sum.slug}?locale=en`, { headers: { cookie } })
    ).json()
    const sol = lesson.exercise?.solution
    if (!sol) {
      fail.push(`${sum.slug}: no solution`)
      continue
    }
    const run = await fetch(`${base}/api/v1/sandbox/run`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie },
      body: JSON.stringify({
        sql: sol,
        seed: lesson.sandboxSeed,
        expected: lesson.exercise.expected,
      }),
    })
    const body = await run.json()
    if (!run.ok || !body.passed) {
      fail.push(`${sum.slug}: ${body.message || body.code || run.status}`)
      console.log('FAIL', sum.sortOrder, sum.slug, body.message || body)
    } else {
      console.log('OK  ', sum.sortOrder, sum.slug)
    }
  }
  if (fail.length) {
    console.log('FAILED', fail.length)
    fail.forEach((f) => console.log(f))
    process.exit(1)
  }
  console.log('PASS all', lessons.length, 'PG solutions')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
