/* global self */

function formatArg(value) {
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

function makeConsole(lines) {
  const push = (prefix, args) => {
    const text = args.map(formatArg).join(' ')
    lines.push(prefix ? `${prefix}${text}` : text)
  }
  return {
    log: (...args) => push('', args),
    warn: (...args) => push('[warn] ', args),
    error: (...args) => push('[error] ', args),
  }
}

self.onmessage = async (event) => {
  const data = event.data || {}
  if (data.type !== 'run') return

  const code = String(data.code || '')
  const timeoutMs = Number(data.timeoutMs) || 2500
  const consoleLines = []
  const console = makeConsole(consoleLines)

  let timer
  try {
    const runner = new Function(
      'console',
      `"use strict";\nreturn (async () => {\n${code}\n})();`,
    )
    const resultPromise = runner(console)
    const timed = new Promise((_, reject) => {
      timer = setTimeout(() => reject(new Error('timeout')), timeoutMs)
    })
    const result = await Promise.race([resultPromise, timed])
    clearTimeout(timer)

    let returnValue
    try {
      returnValue = JSON.parse(JSON.stringify(result))
    } catch {
      self.postMessage({
        type: 'result',
        ok: false,
        error: {
          code: 'non_serializable_return',
          message: 'Return value must be JSON-serializable',
        },
      })
      return
    }

    self.postMessage({
      type: 'result',
      ok: true,
      returnValue,
      consoleLines: [...consoleLines],
    })
  } catch (err) {
    clearTimeout(timer)
    const message = err && err.message ? String(err.message) : String(err)
    const code = message === 'timeout' ? 'timeout' : 'syntax'
    self.postMessage({
      type: 'result',
      ok: false,
      error: { code, message },
    })
  }
}
