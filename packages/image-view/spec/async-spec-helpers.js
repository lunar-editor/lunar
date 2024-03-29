/** @babel */

export async function conditionPromise (condition, description = 'anonymous condition') {
  const startTime = Date.now()

  while (true) {
    await timeoutPromise(100)

    if (await condition()) {
      return
    }

    if (Date.now() - startTime > 5000) {
      throw new Error('Timed out waiting on ' + description)
    }
  }
}

export function timeoutPromise (timeout) {
  return new Promise(resolve => {
    global.setTimeout(resolve, timeout)
  })
}

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
