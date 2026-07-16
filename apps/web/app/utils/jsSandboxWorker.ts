export interface JsWorkerRunResult {
  ok: boolean
  returnValue?: unknown
  consoleLines?: string[]
  error?: { code: string; message: string }
}

const DEFAULT_TIMEOUT_MS = 2500

export function runJsInWorker(code: string, timeoutMs = DEFAULT_TIMEOUT_MS): Promise<JsWorkerRunResult> {
  return new Promise((resolve) => {
    const worker = new Worker('/workers/js-sandbox.worker.js')
    const cleanup = () => {
      worker.terminate()
    }

    worker.onmessage = (event) => {
      cleanup()
      const data = event.data as JsWorkerRunResult & { type?: string }
      if (data.type === 'result') {
        resolve({
          ok: !!data.ok,
          returnValue: data.returnValue,
          consoleLines: data.consoleLines || [],
          error: data.error,
        })
        return
      }
      resolve({ ok: false, error: { code: 'generic', message: 'Invalid worker response' } })
    }

    worker.onerror = (event) => {
      cleanup()
      resolve({
        ok: false,
        error: { code: 'syntax', message: event.message || 'Worker error' },
      })
    }

    worker.postMessage({ type: 'run', code, timeoutMs })
  })
}
