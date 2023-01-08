/** @babel */

export function emitterEventPromise (emitter, event, timeout = 15000) {
  return new Promise((resolve, reject) => {
    const timeoutHandle = setTimeout(() => {
      reject(new Error(`Timed out waiting for '${event}' event`))
    }, timeout)
    emitter.once(event, () => {
      clearTimeout(timeoutHandle)
      resolve()
    })
  })
}
